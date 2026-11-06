import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw08-l05",
  title: "Privacy, IP and on-prem deployment: why hardware companies refuse the cloud and what Enclave must guarantee",
  summary:
    "Bench data is a map of a company's product: efficiency, limits, failure modes and the next generation's design. Hardware companies protect it for legal, contractual and competitive reasons, and many will not let it leave their network. This lesson explains those reasons, compares deployment models from multi-tenant SaaS to air-gapped, introduces confidential computing, and lists the guarantees Afterwave Enclave has to make, and prove, in a security review.",
  minutes: 80,
  objectives: [
    "Explain why test data is treated as crown-jewel IP, including the trade secret 'reasonable steps' requirement and export controls",
    "Compare multi-tenant SaaS, isolated tenant, on-prem connected and air-gapped deployment for security, operations and cost",
    "Describe confidential computing (trusted execution environments and remote attestation) and what it does and does not protect",
    "List the guarantees Enclave must make on residency, isolation, keys, access, audit, model ownership, LLM endpoints, vendor access and updates",
    "Price the operational cost of each deployment model per customer",
  ],
  concepts: [
    {
      id: "aw08.why-no-cloud",
      name: "Why hardware companies keep test data in-house",
      description:
        "Test data reveals product performance, limits and failure modes; trade secret protection requires reasonable secrecy measures; export controls and customer contracts restrict transfer; and a leak cannot be undone.",
      competency: "aw-ml",
      related: ["m14.data-classification", "aw08.trade-secret-steps"],
    },
    {
      id: "aw08.trade-secret-steps",
      name: "Trade secrets and reasonable steps",
      description:
        "Under EU Directive 2016/943, information is protected as a trade secret only if it is secret, valuable because secret, and subject to reasonable steps to keep it secret; uncontrolled sharing with vendors can weaken that protection.",
      competency: "aw-ml",
    },
    {
      id: "aw08.deployment-models",
      name: "Deployment models",
      description:
        "Multi-tenant SaaS, isolated (single-tenant) cloud, on-prem with controlled connectivity, and air-gapped; isolation and customer control rise down the list, and so do vendor operating cost and release friction.",
      competency: "aw-ml",
      related: ["fc04.on-prem-deployment"],
    },
    {
      id: "aw08.confidential-computing",
      name: "Confidential computing",
      description:
        "Protection of data in use by running computation in a hardware-based, attested trusted execution environment (for example AMD SEV-SNP, Intel TDX, NVIDIA confidential GPU modes), so even the infrastructure operator cannot read memory.",
      competency: "aw-ml",
    },
    {
      id: "aw08.enclave-guarantees",
      name: "Enclave security guarantees",
      description:
        "The commitments a security reviewer will test: data residency and no default egress, tenant isolation, customer-managed keys, SSO and least privilege, complete audit logs, customer ownership of models, approved LLM endpoints only, no standing vendor access, signed updates and verifiable deletion.",
      competency: "aw-ml",
      related: ["fc04.security-review", "aw08.deployment-models"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What is being protected, from whom, and how",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Enclave exists because the customers Afterwave targets (robotics, humanoids, drives, batteries, powertrains) will not send bench data to a startup's cloud. The security review is where pilots stall for months, and you will be in it. If you can explain the threat model, the deployment options and exactly what Enclave guarantees, in the reviewer's vocabulary and without overclaiming, the review becomes a competitive advantage instead of a delay.`,
        },
        {
          kind: "md",
          md: md`### Why test data is crown-jewel IP

A year of bench memory for a drive unit contains its efficiency map, thermal limits, torque and speed envelope, failure modes and their precursors, the firmware history that fixed them, and test plans that reveal the next product before launch. A competitor with that data skips years of development. Five separate reasons push hardware companies to keep it in-house:

1. **Competitive value.** The data is the result of expensive prototypes and rig time. It cannot be "un-leaked".
2. **Trade secret law.** EU Directive 2016/943, Art. 2(1): information is a trade secret only if it is secret, has commercial value because it is secret, and **has been subject to reasonable steps to keep it secret**. Legal teams therefore resist any tool that copies the data to places they do not control: the protection itself depends on demonstrable control.
3. **Export controls.** Technology for dual-use or military items is controlled (EU Regulation 2021/821 for dual-use; US ITAR and EAR for defence and dual-use items), and transfer of technical data, including electronic transfer or access from another country, can be an export. Test data for some drives, batteries, autonomous systems and robots falls under these regimes.
4. **Customer and supplier contracts.** A tier-1 supplier testing an OEM's component is usually bound by NDAs and quality agreements that restrict where data goes and who processes it.
5. **Personal data.** Screen captures and app logs can contain operator names, faces or IDs. Then GDPR applies, with its rules on processors, purpose and transfers outside the EU.

Track 0 covers data classification and confidentiality rules for using AI tools in general; the difference here is that the data is the customer's and Afterwave's product must enforce the rules for them.

### Deployment models

| Model | Where it runs | Who operates | Isolation | Vendor release effort per customer | Typical fit |
|---|---|---|---|---|---|
| Multi-tenant SaaS | Vendor cloud, shared infrastructure | Vendor | Logical (per-tenant keys and access) | Near zero (one deploy for all) | Startups, non-sensitive data |
| Isolated tenant | Vendor-operated, dedicated account, network and keys per customer, chosen region | Vendor | Dedicated infrastructure; no shared compute or storage | Low | Mid-sensitivity; customers without server capacity |
| On-prem, controlled connectivity | Customer servers or customer's own cloud account | Customer IT, vendor supports | Customer network; outbound only for updates if allowed | Medium | Most industrial test labs |
| Air-gapped | Customer servers with no route to the internet | Customer | Physical and network separation | High: offline signed bundles, on-site or escorted support | Defence, export-controlled, pre-launch flagship programmes |

Enclave as described covers the middle two and must be able to run in the fourth: "on customer servers or an isolated tenant". The research brief notes that Nominal's bench app works in air-gapped facilities and syncs later, and Sift offers fully on-prem deployment for classified work (secondary sources), so the bar for this market is set.`,
        },
        {
          kind: "flow",
          title: "Data path inside Enclave (no default egress)",
          steps: [
            { label: "Lockstep at the bench", detail: "Captures rig signals and app actions on one clock; writes to Enclave storage on the customer network." },
            { label: "Enclave storage", detail: "Encrypted with customer-managed keys; open formats; access by customer SSO roles." },
            { label: "Compute", detail: "Feature pipelines, Ripple, model training and serving on customer or isolated-tenant hardware." },
            { label: "Models and agents", detail: "Local open-weight models or a customer-approved endpoint; tool allowlist; approval gates (Lesson 4)." },
            { label: "Outputs", detail: "Reports, alarms, plans inside Enclave; exports only by a permitted user, logged." },
            { label: "Updates in", detail: "Signed release bundles pulled or carried in; nothing pushed out except opt-in, documented telemetry." },
          ],
        },
        {
          kind: "md",
          md: md`### Confidential computing in one page

Encryption at rest and in transit is standard. The gap is **data in use**: while a model trains, the data sits decrypted in memory, readable by anyone controlling the host (a cloud operator, a compromised hypervisor, a vendor administrator). The Confidential Computing Consortium defines confidential computing as protecting data in use by computing in a **hardware-based, attested trusted execution environment (TEE)**.

- **TEEs.** CPU features that encrypt a VM's or process's memory with keys the host cannot access: AMD SEV-SNP and Intel TDX (whole virtual machines), Intel SGX (process-level enclaves), Arm CCA. Recent data-centre GPUs, such as NVIDIA's H100 generation, add a confidential mode so models and data on the GPU are protected as well.
- **Remote attestation.** The hardware signs a measurement of exactly what software booted in the TEE. A key service releases decryption keys only if the measurement matches an approved build. This is what turns "trust us" into "verify the running code".
- **What it protects.** The isolated-tenant case: the customer can verify that Afterwave's operators and the cloud provider cannot read data in memory.
- **What it does not.** Bugs or malicious logic inside the attested code itself, data the code is allowed to export, and some side-channel attacks. It also does not replace access control or audit. Performance cost depends on workload and hardware; measure rather than quote.

**Naming trap.** "Enclave" is also the technical term for an Intel SGX TEE. A reviewer may assume Afterwave Enclave is an SGX enclave. Be precise: Enclave is the private environment where data, models and agents run; confidential computing is an optional hardening layer for the isolated-tenant model.

### Threat model: who are we protecting against?

| Threat | Example | Main controls |
|---|---|---|
| External attacker | Compromises an exposed service | No inbound exposure, patching, pen tests, network segmentation |
| Vendor insider or compromised vendor account | Afterwave engineer reads customer data | No standing vendor access, customer-approved sessions, attestation in isolated tenant |
| Cross-customer leakage | Bug or shared model mixes two customers' data | Separate infrastructure and keys per customer, no cross-customer training |
| Supply chain | Malicious or vulnerable update | Signed releases, SBOM, reproducible builds, staged rollout, customer approval of updates |
| Agent exfiltration | Prompt injection in a log steers an agent to send data out | No outbound tools or network for agents, egress deny by default (fc10's trifecta) |
| Customer insider | Over-broad roles let anyone export a programme's data | Least-privilege roles per programme, export logging, alerts |
| Third-party model provider | Prompts with test data sent to an external LLM API | Local models or customer-approved endpoints only; configurable, logged, off by default |`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative annual release-delivery cost per customer by deployment model",
          xKey: "model",
          xLabel: "Deployment model",
          yLabel: "EUR per customer per year",
          series: [
            { key: "monthly", label: "12 releases a year" },
            { key: "quarterly", label: "4 releases a year" },
          ],
          data: [
            { model: "Multi-tenant SaaS", monthly: 0, quarterly: 0 },
            { model: "Isolated tenant", monthly: 2400, quarterly: 800 },
            { model: "On-prem connected", monthly: 9600, quarterly: 3200 },
            { model: "Air-gapped", monthly: 34800, quarterly: 15600 },
          ],
          caption: "Computed with C_rel = n_r h_r w + n_v c_v, w = EUR 100/h; hours per release 0, 2, 8 and 24; air-gapped adds 2 site visits at EUR 3,000. Illustrative assumptions, not Afterwave data. Isolation multiplies operating cost; price and release cadence must follow.",
        },
        { kind: "equation", formula: "aw08-release-cost" },
      ],
    },
    {
      layer: "applied",
      title: "What each deployment option costs Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Pricing an air-gapped deployment",
          given: md`Illustrative. A defence-adjacent drive manufacturer wants Enclave air-gapped. Afterwave ships monthly releases. Each air-gapped update takes 24 engineering hours (build the signed offline bundle, verify, customer-escorted install and checks) at EUR 100/h loaded, plus 2 site visits a year at EUR 3,000. The planned annual contract value is EUR 120,000 (illustrative).`,
          steps: [
            { md: md`**Monthly releases:** $C_{rel} = 12 \times 24 \times 100 + 2 \times 3{,}000 = 28{,}800 + 6{,}000 =$ EUR 34,800 a year.` },
            { md: md`**Share of contract value:** $34{,}800/120{,}000 = 29\%$, before any support, hardware or customer-specific work.` },
            { md: md`**Quarterly releases instead:** $4 \times 24 \times 100 + 6{,}000 =$ EUR 15,600, or 13 % of contract value. Security fixes still need an out-of-band path.` },
            { md: md`**Options:** (1) an air-gapped price uplift that covers the delivery cost; (2) a slower, supported release train (quarterly plus critical fixes); (3) invest in tooling that cuts hours per bundle (one-command offline bundle, automated verification), which pays back across every air-gapped customer.` },
          ],
          result: md`Air-gapped is sellable but must be priced as a separate deployment tier with its own release cadence. Treating it as "the same product, installed differently" quietly destroys gross margin.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "On-prem connected deployment",
          given: md`Illustrative. A battery module lab runs Enclave on its own servers with an outbound-only update channel. 12 releases a year at 8 engineering hours each, EUR 100/h, no site visits. Contract value EUR 80,000.`,
          steps: [
            { md: md`$C_{rel} = 12 \times 8 \times 100$.` },
            {
              md: md`$=$ **EUR 9,600** a year.`,
              hidden: true,
              check: { prompt: "Annual release-delivery cost (EUR)", answer: 9600, unit: "EUR", tolerance: { abs: 1 } },
            },
            { md: md`Share of contract value: $9{,}600/80{,}000$.` },
            {
              md: md`$=$ **12 %**. Halving hours per release to 4 with better installer tooling saves EUR 4,800 a year per customer of this type.`,
              hidden: true,
              check: { prompt: "Share of contract value (%)", answer: 12, unit: "%", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`On-prem connected is the likely default for Afterwave's market. Hours per release per customer is the metric to drive down; it is set by engineering choices (packaging, upgrade automation, health checks) that you should ask your cofounders about early.`,
        },
        {
          kind: "question",
          question: {
            id: "aw08-l05-p1",
            type: "numeric",
            prompt: md`A lab produces 46 GB of raw bench data per day and has a 50 Mbit/s uplink available for it. How many hours a day would uploading it to a cloud service take? (1 decimal)`,
            answer: 2.0,
            tolerance: { abs: 0.1 },
            unit: "h",
            explanation: md`$46 \times 10^9 \times 8 = 3.68 \times 10^{11}$ bit; $/5 \times 10^7 = 7{,}360$ s $= 2.0$ h. Bandwidth is rarely the deciding reason, but for high-rate labs it adds to the case for computing next to the data.`,
            concepts: ["aw08.deployment-models"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "The security review, and what Enclave must guarantee",
      blocks: [
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core covers the security review process inside a pilot (questionnaires such as SIG and CAIQ, evidence, timing, starting it early). This lesson supplies the technical content of Afterwave's answers.",
        },
        {
          kind: "md",
          md: md`### The guarantees (requirements for the product, not claims about today)

Each line is something Enclave must do and be able to demonstrate. Which of these exist today is for your engineering partners to confirm before any of it goes into a questionnaire.

| # | Guarantee | How it is shown |
|---|---|---|
| 1 | **Residency:** captured data, features, models, agent context and outputs stay in customer-controlled infrastructure | Architecture and data-flow diagram; network policy |
| 2 | **No default egress:** nothing leaves unless the customer configures it; telemetry off or minimal and documented | Firewall rules; egress allowlist; telemetry spec |
| 3 | **Isolation:** in isolated tenant, dedicated compute, storage, network and keys per customer | Infrastructure description; pen test of tenant boundary |
| 4 | **Keys:** encryption at rest with customer-managed keys; TLS internally | Key management design; key rotation procedure |
| 5 | **Identity and access:** customer SSO (SAML or OIDC), MFA, roles per programme, least privilege | Role matrix; access review export |
| 6 | **Audit:** append-only logs of data access, exports, training jobs, model versions and every agent tool call, readable by the customer | Sample logs; retention settings |
| 7 | **Model ownership:** models trained on a customer's data are that customer's assets and are never used for anyone else without written agreement | Contract clause; technical separation |
| 8 | **LLM endpoints:** local open-weight models or a customer-approved endpoint only; no third-party API calls unless configured | Configuration; egress rules |
| 9 | **Vendor access:** no standing access; support through customer-controlled sessions; break-glass access time-limited and logged | Support policy; session logs |
| 10 | **Updates and supply chain:** signed releases, SBOM, vulnerability disclosure, offline bundles for air-gapped | Signing keys and verification steps; SBOM sample |
| 11 | **Retention and deletion:** customer-set retention; verifiable deletion or full export in open formats at contract end | Deletion procedure; export format list |
| 12 | **Agent controls:** tool allowlist, approval gates, no outbound tools (Lesson 4) | Agent charter; tool specs |

### Frameworks reviewers may ask about

ISO/IEC 27001 (certified security management, common with European industrials), SOC 2 Type II (more common with US buyers), TISAX (assessment used across the German automotive supply chain), IEC 62443 (security for industrial automation and control systems, relevant when Lockstep connects to rigs on the OT network) and the NIST AI RMF vocabulary for AI risk. A startup usually holds none at first; a credible roadmap, a clear architecture and honest answers carry early reviews. Never state a certification you do not hold.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Overclaiming.** "Military-grade", "fully secure", "certified" (when it is not). One false answer in a questionnaire ends the deal and travels.
- **The hidden egress.** An analytics SDK, crash reporter, licence check or a model call to a public API that nobody listed. Reviewers find it with a packet capture.
- **"Enclave" confusion.** The reviewer assumes SGX; say what it is.
- **Vendor access by habit.** A standing VPN for "support" is the first thing a reviewer will remove; design support without it from day one.
- **Model ownership left vague.** If the contract is silent, legal will assume Afterwave trains on their data for others. Put it in writing.
- **Air-gapped as an afterthought.** Licensing, updates, model downloads and documentation that need the internet. Test an install on a machine with no route out.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on it",
          md: md`Competitor deployment claims (Nominal Connect working air-gapped and syncing later; Sift fully on-prem for classified work) come from the research brief's search summaries, not primary pages. Whether specific test data falls under export controls depends on the item's classification; that is the customer's export control officer's determination, not Afterwave's.`,
        },
        { kind: "scenario", scenario: "aw08-s2" },
        {
          kind: "question",
          question: {
            id: "aw08-l05-p2",
            type: "short",
            prompt: md`**Produce it.** Write the two-page "Enclave security architecture" note Afterwave sends at the start of a security review with a robotics or battery customer. Stay within the product as described (Lockstep, Enclave on customer servers or an isolated tenant, Ripple, local models and agents). Include: what Enclave is (and is not, including the SGX naming point); deployment options offered; data flow with the no-egress default; the guarantees as requirements with how each is evidenced; the threat model in brief; how LLMs and agents are constrained; support and update model; and an explicit statement of which certifications are held (none claimed, roadmap only, if that is the case).`,
            rubric: [
              "Defines Enclave accurately within the brief and distinguishes it from an SGX enclave",
              "Data flow shows residency and no default egress, including telemetry and LLM endpoints",
              "Covers keys, identity and access, audit logging (including agent tool calls) and model ownership",
              "Support and update model avoids standing vendor access and includes signed and offline updates",
              "Threat model names at least four threats with matching controls",
              "No overclaiming: certifications stated honestly, guarantees framed as verifiable commitments",
            ],
            modelAnswer: md`**Afterwave Enclave: security architecture note (draft for review).**

**What Enclave is.** The private environment where data captured by Lockstep, the models trained on it, Ripple and agents run. It runs on your servers (on-prem) or in an isolated tenant operated for you alone. It is not an Intel SGX enclave; confidential computing can be added as a hardening layer in the isolated-tenant option.

**Deployment options.** (a) On-prem with outbound-only update channel; (b) on-prem air-gapped with signed offline bundles; (c) isolated tenant in a region you choose, with dedicated compute, storage, network and keys.

**Data flow.** Lockstep at the bench writes to Enclave storage on your network. Feature pipelines, Ripple, training and serving run on the same infrastructure. Outputs (reports, alarms, plans) stay in Enclave; exports are permitted per role and logged. Default egress: none. Telemetry: off by default; if enabled, a documented list of operational metrics with no test data. LLMs: local open-weight models or an endpoint you approve; no third-party API calls unless you configure them.

**Commitments and evidence.** Residency and no default egress (network policy, data-flow diagram); customer-managed encryption keys at rest, TLS internally (key design); SSO with your identity provider, MFA, roles per programme (role matrix); append-only audit logs of data access, exports, training jobs, model versions and every agent tool call, readable by you (sample logs); models trained on your data are yours and never used for others (contract clause); deletion or full export in open formats at contract end (procedure).

**Threats and controls.** External attacker: no inbound exposure, patching, pen test. Afterwave insider: no standing access, customer-controlled support sessions, attested environment in isolated tenant. Cross-customer leakage: separate infrastructure and keys, no pooled training. Supply chain: signed releases, SBOM, staged updates you approve. Agent exfiltration: agents have no outbound tools or network; tool allowlist and approval gates; rig safety functions outside the agent's reach.

**Support and updates.** Monthly releases (quarterly for air-gapped plus critical fixes), signed and verifiable; installed by your IT or with us on a session you control; break-glass access time-limited and logged.

**Certifications.** None held today. We will share our security roadmap (ISO/IEC 27001 is the planned first target, subject to engineering confirmation) and answer your questionnaire against the architecture above.`,
            explanation: md`The grader rewards precision and honesty: accurate product definition, a real no-egress data flow, verifiable commitments and no claimed certifications.`,
            concepts: ["aw08.enclave-guarantees", "aw08.deployment-models", "aw08.confidential-computing"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "A head of engineering at a humanoid company asks: 'Why should we trust a startup with our test data at all?' Explain why Enclave changes the question, in plain words.",
          keyPoints: [
            "The data never leaves your infrastructure; Afterwave's software comes to the data, not the reverse",
            "Nothing goes out by default, including telemetry and model calls; you can verify this with your own network monitoring",
            "Keys, access and audit logs are yours; we have no standing access",
            "Models trained on your data are yours and are not used for anyone else",
            "This also helps you keep your trade secret protection, which depends on showing you controlled access",
          ],
        },
        { kind: "sources", refs: ["aw08-r17", "aw08-r18", "aw08-r19", "aw08-r20", "aw08-r21", "aw08-r26", "aw08-r23"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw08-l05-q1",
      type: "mcq",
      prompt: "Under EU Directive 2016/943, which condition explains why legal teams resist copying test data into vendor systems they do not control?",
      options: [
        "Trade secrets must be registered with a national office",
        "Information is protected only if it has been subject to reasonable steps to keep it secret",
        "Trade secrets expire after ten years",
        "Only patented information is protected",
      ],
      answer: 1,
      explanation: md`Art. 2(1)(c) makes protection depend on reasonable secrecy measures. Uncontrolled sharing undermines the claim.`,
      concepts: ["aw08.trade-secret-steps"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw08-l05-q2",
      type: "mcq",
      prompt: "What does remote attestation add to a trusted execution environment?",
      options: [
        "Faster model training",
        "A hardware-signed measurement of the software running inside, so keys are released only to an approved build",
        "Encryption of data at rest",
        "Automatic compliance with ISO/IEC 27001",
      ],
      answer: 1,
      explanation: md`Attestation lets the data owner verify what code is running before trusting it with keys.`,
      concepts: ["aw08.confidential-computing"],
      difficulty: 2,
    },
    {
      id: "aw08-l05-q3",
      type: "multi",
      prompt: "Which of these are hidden-egress risks a reviewer will look for in an on-prem product? (Select all that apply.)",
      options: [
        "A crash reporter sending stack traces to the vendor",
        "A licence check calling a vendor server",
        "An agent calling a public LLM API with test data in the prompt",
        "An internal TLS connection between Enclave services",
        "An analytics SDK in the web interface",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Internal TLS stays inside the customer network. The others send data out unless explicitly disabled and documented.`,
      concepts: ["aw08.enclave-guarantees"],
      difficulty: 2,
    },
    {
      id: "aw08-l05-q4",
      type: "numeric",
      prompt: md`An isolated-tenant customer gets 12 releases a year at 2 engineering hours each, EUR 110/h. What is the annual release-delivery cost, in EUR?`,
      answer: 2640,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$12 \times 2 \times 110 = 2{,}640$.`,
      concepts: ["aw08.deployment-models"],
      difficulty: 1,
    },
    {
      id: "aw08-l05-q5",
      type: "decision",
      prompt: md`A security questionnaire asks "Is your product ISO/IEC 27001 certified?" Afterwave is not certified but has started policies. How do you answer?`,
      options: [
        { text: "Yes: our policies follow ISO/IEC 27001.", score: 0, feedback: "Implies certification you do not hold. Discovered later, it ends the deal and your credibility." },
        { text: "No. Describe the controls in place, the architecture that keeps data on their infrastructure, and the certification roadmap with a target date only if engineering has committed to it.", score: 1, feedback: "Honest and still persuasive: the architecture does much of the work certification would." },
        { text: "Leave the question blank.", score: 0.2, feedback: "Reviewers treat blanks as no, and as evasive." },
      ],
      explanation: md`Never state a certification you do not hold. Answer the risk the question is about.`,
      concepts: ["aw08.enclave-guarantees"],
      difficulty: 1,
    },
    {
      id: "aw08-l05-q6",
      type: "order",
      prompt: "Order the deployment models from least to most vendor operating effort per customer.",
      items: ["Multi-tenant SaaS", "Isolated tenant", "On-prem with controlled connectivity", "Air-gapped"],
      explanation: md`Each step adds per-customer release, support and verification work.`,
      concepts: ["aw08.deployment-models"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw08-l05-f1", front: "Trade secret condition that matters for vendors", back: "Reasonable steps to keep it secret (Directive 2016/943, Art. 2(1)(c)).", concepts: ["aw08.trade-secret-steps"] },
    { id: "aw08-l05-f2", front: "Confidential computing", back: "Protecting data in use by computing in a hardware-based, attested trusted execution environment.", concepts: ["aw08.confidential-computing"] },
    { id: "aw08-l05-f3", front: "Four deployment models", back: "Multi-tenant SaaS, isolated tenant, on-prem with controlled connectivity, air-gapped.", concepts: ["aw08.deployment-models"] },
    { id: "aw08-l05-f4", front: "Enclave naming trap", back: "Afterwave Enclave is a private environment, not an Intel SGX enclave; confidential computing is optional hardening.", concepts: ["aw08.confidential-computing"] },
    { id: "aw08-l05-f5", front: "Top Enclave guarantees", back: "Residency, no default egress, isolation, customer keys, SSO and least privilege, audit of every agent call, customer owns models, approved LLM endpoints, no standing vendor access, signed updates, deletion.", concepts: ["aw08.enclave-guarantees"] },
    { id: "aw08-l05-f6", front: "Why export controls reach test data", back: "Controlled technology includes technical data; electronic transfer or foreign access can count as an export.", concepts: ["aw08.why-no-cloud"] },
  ],
  scenarios: [
    {
      id: "aw08-s2",
      title: "The security reviewer's packet capture",
      dayInLife: true,
      context: md`An Enclave on-prem pilot at a battery module lab (illustrative) is in security review. The customer's security engineer installed the pilot build on a test server and captured its network traffic for 24 hours. She sends you the summary: three outbound destinations nobody listed.`,
      start: "a",
      concepts: ["aw08.enclave-guarantees", "aw08.deployment-models"],
      nodes: {
        a: {
          md: md`The destinations: a crash-reporting service, a package mirror used by the model server at start-up, and a time server. She asks for an explanation by Friday. What do you do?`,
          choices: [
            { text: "Ask your engineers for the cause of each, then reply in writing: what each sends, how it is disabled or redirected to a customer-provided service, a fixed build, and an updated data-flow diagram. Offer to repeat the capture.", score: 10, feedback: "Treats the finding as valid, fixes it in the product and invites verification.", next: "b" },
            { text: "Reply that the traffic is harmless and contains no test data.", score: 2, feedback: "Probably true for two of them and still the wrong answer: the guarantee was no unlisted egress.", next: "c" },
          ],
        },
        b: {
          md: md`The fixed build passes a new capture. She now asks whether agents could ever send data out.`,
          choices: [
            { text: "Explain that agents have no outbound tools or network route, list their allowlisted tools, show the egress deny rule, and point to the tool-call audit log she can inspect.", score: 10, feedback: "Architectural answer with evidence she can check." },
            { text: "Say the system prompt forbids agents from sending data.", score: 2, feedback: "Prompt wording is not a control. She will mark it as a finding." },
          ],
        },
        c: {
          md: md`She replies that the crash reports include file paths with programme code names. The review is escalated to the customer's CISO.`,
          choices: [
            { text: "Acknowledge, fix the build, provide the updated data flow and ask for a joint call to restore confidence.", score: 5, feedback: "Recovers what it can; the delay and doubt are the cost of the first answer." },
          ],
        },
      },
    },
  ],
};

export default lesson;
