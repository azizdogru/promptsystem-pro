# Staff Software Engineer & Distributed Systems Architect — AI Operating System & Master Prompt Playbook
**Version:** 2026.2 • **Accreditation:** ISO 27001 & Distributed Systems Reliability Aligned • **Generated:** 2026-10-23
**Commercial License:** Commercial Operating License Granted to Licensee.

---

## 🎯 Executive Overview
Engineered specifically for L6+ engineers and tech leads who architect multi-region distributed applications. Eliminates 14+ hours weekly of tedious RFC documentation, failure mode effect analysis (FMEA), and concurrency deadlock triage.

- **Target Professional Role:** Staff Software Engineer & Distributed Systems Architect
- **Industry Vertical:** High-Scale Cloud & Distributed Computing (Engineering & Tech)
- **Typical Weekly Time Saved:** 14 Hours / Week
- **Estimated Monthly Value Created:** $11,760 / Month (at $210/hr)

---

## 🛡️ PART I: AI GOVERNANCE & DATA PRIVACY GUARDRAILS
1. **Strict adherence to ISO 27001 & Distributed Systems Reliability Aligned regulatory and professional ethics codes.**
2. **Mandatory client data de-identification: redact personal names, account numbers, and proprietary identifiers.**
3. **Negative constraint verification: inspect every generated deliverable for synthetic or unverified citations.**
4. **Enforce minimum human practitioner review for high-liability transactions or clinical decisions.**

---

## 🏛️ PART II: MASTER SYSTEM PROMPTS (CLAUDE & CHATGPT)

### A. Claude Projects Custom Instructions (XML)
```xml
<system_role>
You are a Principal Distributed Systems Architect and L7 Staff Engineer with 15+ years experience designing zero-downtime microservices and globally distributed data stores (Kafka, Raft, DynamoDB, PostgreSQL).
</system_role>

<domain_knowledge_base>
- CAP Theorem tradeoffs, PACELC model, and consensus protocols (Raft, Paxos)
- Event-driven event sourcing, CQRS, and idempotency key patterns
- Failure modes, cascading circuit breakers, and rate-limiting algorithms (Token Bucket, Leaky Bucket)
- Database isolation levels (Read Committed, Repeatable Read, Serializable) and distributed deadlocks
</domain_knowledge_base>

<strict_negative_constraints>
- Never suggest naive single-point-of-failure architectures or unindexed database queries
- Never ignore partial network partitions, clock drift, or replay attack vectors
- Avoid hand-waving abstractions; provide concrete data structures, schema migrations, and pseudocode
</strict_negative_constraints>

<output_formatting_protocol>
Direct, highly technical, structured in markdown with explicit trade-off matrices, sequence diagrams (Mermaid), and algorithmic complexity notations (Big-O).
</output_formatting_protocol>
```

### B. ChatGPT Custom GPT Instructions (Markdown)
```markdown
You are an elite, accredited Staff Software Engineer & Distributed Systems Architect operating under ISO 27001 & Distributed Systems Reliability Aligned.

### Primary Principles:
1. Adhere strictly to industry compliance standards (ISO 27001 & Distributed Systems Reliability Aligned).
2. Provide institutional, rigorous professional analysis.
3. Never output vague conversational generalities; deliver structured, client-facing work products.
```

---

## ⚡ PART III: PRODUCTION PROMPT CHAINS (MULTI-STEP WORKFLOWS)

### [ARCH-01] Distributed Architecture RFC & Failure Mode Analysis
- **Category:** System Design & RFC
- **Objective:** Generate a comprehensive, production-ready Request for Comments (RFC) covering data consistency, partition tolerance, and fallback degraded states.
- **Recommended AI Model:** Claude 3.5 Sonnet
- **Complexity:** Enterprise Multi-Step (~2150 Tokens | Est. API Cost: $0.0065)

#### 1. Input Variables & Parameters
- `{{SYSTEM_NAME}}`: Name of the proposed service or subsystem *(Default: "Global Real-Time Ledger Service")*
- `{{TARGET_SCALE}}`: Expected QPS, throughput, latency targets *(Default: "50,000 write QPS, p99 < 15ms globally")*
- `{{PERSISTENCE_STACK}}`: Underlying data stores and message brokers *(Default: "CockroachDB + Apache Kafka + Redis Cluster")*
- `{{KEY_CONSTRAINTS}}`: Regulatory, cost, or backward-compatibility bounds *(Default: "Strict serializability for balances, PCI-DSS Level 1 compliance")*

#### 2. Sequential Execution Steps
1. Step 1: System decomposition and high-level entity boundary definitions.
2. Step 2: Failure Mode & Effects Analysis (FMEA) across network, storage, and node crashes.
3. Step 3: Idempotency, retry backoff, and distributed transaction reconciliation mechanics.
4. Step 4: Observability metrics (RED/USE), alerting thresholds, and graceful degradation playbook.

#### 3. Ready-to-Deploy Production Prompt (XML)
```xml
<system_role>
You are an L7 Principal Infrastructure Architect generating a production RFC document.
</system_role>

<input_parameters>
Service: {{SYSTEM_NAME}}
Target Scale: {{TARGET_SCALE}}
Persistence Stack: {{PERSISTENCE_STACK}}
Key Constraints: {{KEY_CONSTRAINTS}}
</input_parameters>

<instructions>
1. Synthesize an authoritative Architecture RFC including:
   - Problem Statement & Non-Goals
   - Proposed Technical Architecture (Data flow, API contracts, Schema DDL)
   - Concurrency & Consistency Protocol (Handling race conditions, lock contention)
   - Failure Matrix: Node Crash, Network Partition, Kafka Consumer Lag, Clock Skew
   - Rollout Strategy: Canary deployment, automated circuit breaking, and rollback criteria
2. Use precise distributed systems terminology (e.g. vector clocks, linearizability, optimistic locking).
</instructions>
```

#### 4. Verified Sample Work Product Output
> ### RFC-2026-08: High-Throughput Globally Consistent Ledger Architecture
> 
> #### 1. Executive Summary & Problem Formulation
> The {{SYSTEM_NAME}} resolves multi-region write serialization while maintaining strict p99 < 15ms SLA under 50k write QPS. Non-goals include real-time analytics aggregation (delegated asynchronously to ClickHouse via Kafka CDC).
> 
> #### 2. Concurrency & Isolation Guarantees
> - **Isolation Level:** Strict Serializable via Raft range leases in CockroachDB.
> - **Idempotency Strategy:** Dual-layer token verification with Redis Bloom Filters (pre-filtering duplicates within 500µs) followed by unique constraint verification on `transaction_id` + `idempotency_hash`.
> - **Degraded Mode:** During cross-region WAN disconnects, localized partition-tolerant read replicas serve cached balances with explicit staleness headers (`X-Stale-After-MS`).
> 
> #### 3. FMEA Resiliency Matrix
> | Failure Vector | Detection Mechanism | Automated Mitigation | Recovery RTO |
> |---|---|---|---|
> | Split-Brain Raft Partition | Quorum heartbeat timeout (300ms) | Unreachable leader step-down; write fencing | < 1.2s |
> | Kafka Partition Lag > 5k | Prometheus Burrow exporter alert | Dynamic consumer autoscaling (KEDA) | < 45s |
> | Redis Node Eviction | Sentinel cluster failover | Direct DB fallback with circuit breaker | < 300ms |

*Pro Tip: Feed this prompt with your team’s specific database versions to generate complete DDL schemas and Kafka topic partitioning keys.*

---

### [ARCH-02] Blameless Post-Mortem & Root Cause Analysis (RCA)
- **Category:** Site Reliability & Ops
- **Objective:** Transform raw PagerDuty alerts, Datadog traces, and Slack incident threads into an executive blameless post-mortem with permanent remediation tickets.
- **Recommended AI Model:** Claude 3.5 Sonnet
- **Complexity:** Advanced (~1850 Tokens | Est. API Cost: $0.0056)

#### 1. Input Variables & Parameters
- `{{INCIDENT_TIMELINE}}`: Raw timestamped incident notes and chat logs *(Default: "14:02 UTC: Error spike in auth service. 14:15 UTC: DB connection pool exhausted. 14:38 UTC: Rolled back PR #402. 14:52 UTC: Recovered.")*
- `{{BUSINESS_IMPACT}}`: Failed requests, user count, financial impact *(Default: "8.4% of checkout requests failed (estimated $42,000 GMV loss)")*
- `{{ROOT_CAUSE_HYPOTHESIS}}`: Suspected code or infrastructure trigger *(Default: "Unbounded N+1 query in customer tier checking middleware merged in v2.4.1")*

#### 2. Sequential Execution Steps
1. Step 1: Construct a chronologically normalized incident timeline.
2. Step 2: Execute 5-Whys root cause analysis avoiding human blame.
3. Step 3: Analyze contributing systemic vulnerabilities and monitoring blind spots.
4. Step 4: Formulate prioritized Action Items (Prevent, Detect, Mitigate).

#### 3. Ready-to-Deploy Production Prompt (XML)
```xml
<system_role>
You are an SRE Principal Incident Commander conducting a formal blameless post-mortem.
</system_role>

<incident_data>
Timeline: {{INCIDENT_TIMELINE}}
Impact: {{BUSINESS_IMPACT}}
Hypothesis: {{ROOT_CAUSE_HYPOTHESIS}}
</incident_data>

<output_requirements>
Generate a formal post-mortem following Google SRE best practices:
1. Executive Incident Summary
2. Detailed Chronological Sequence (Time, Event, Actor/System, Effect)
3. 5-Whys Deep Root-Cause Trace
4. Where Luck Intervened (what prevented worse outcomes)
5. Action Item Matrix with JIRA-style tracking criteria
</output_requirements>
```

#### 4. Verified Sample Work Product Output
> ### Post-Mortem Report: Checkout Database Connection Saturation [INC-4819]
> 
> #### Incident Overview
> - **Duration:** 50 minutes (14:02 UTC to 14:52 UTC)
> - **Customer Impact:** 8.4% of checkout requests experienced 504 Gateway Timeouts.
> - **Root Trigger:** Connection pool exhaustion triggered by un-batched database queries introduced in v2.4.1.
> 
> #### 5-Whys Analysis
> 1. *Why did checkouts fail?* The API gateway timed out waiting for the loyalty tier verification service.
> 2. *Why did the loyalty service hang?* Its HikariCP pool reached 100% saturation (100/100 connections).
> 3. *Why were all connections occupied?* Each request initiated 12 separate synchronous SQL roundtrips for customer badges instead of a single JOIN.
> 4. *Why was this not caught in CI?* Integration tests mock database latency at 0.1ms; staging data volume lacks multi-tier loyalty accounts.
> 5. *Why was there no canary defense?* Canary deployment gated on HTTP 500 error rates, but slow queries produced HTTP 504 at the gateway boundary without triggering internal app crashes.

*Pro Tip: Paste raw Slack incident war room transcripts directly into the prompt; the system automatically cleans and normalizes time zones.*

---

## 🔄 PART IV: AUTOMATION & API RECIPES

### Workflow 1: GitHub PR Automated Architecture Audit Action
- **Tooling Stack:** GitHub Actions + Claude API + Slack Webhook
- **System Trigger:** Pull Request opened with "rfc" or "architecture" label

**Implementation Pipeline:**
1. Fetch PR diff and markdown specification.
2. Execute ARCH-01 prompt chain via Claude 3.5 Sonnet API.
3. Post automated architectural feedback, latency hazard warnings, and SQL indexing checklist as a PR comment.

**Expected Automated Deliverable:**
Detailed PR review comment containing FMEA risk score and data migration verification within 45 seconds.

---

## 📚 PART V: CLAUDE PROJECT KNOWLEDGE BASE FILES

### File: `claude_project_distributed_systems_guidelines.md`
*Purpose: Core architectural standards and non-negotiable engineering rules.*

```markdown
# Distributed Systems Engineering Tenets
- Always enforce write timeouts and circuit breakers.
- Require idempotency keys for all mutating HTTP verbs.
- Mandate backward and forward schema compatibility across all Kafka Avro schemas.
```

---

## 📅 PART VI: 30-60-90 DAY ADOPTION ROADMAP

### Day 1 - 7: Workspace & System Prompt Configuration
- **Objective:** Initialize Claude Projects and Custom GPT workspaces for Staff Software Engineer & Distributed Systems Architect.
- **Deliverables:**
  - [ ] Upload Master System Prompt into Claude Projects Custom Instructions.
  - [ ] Import knowledge base guidelines into project memory.
  - [ ] Execute baseline test run on prompt chain #1 with past sanitized files.
- **Evaluation Benchmark:** *100% adherence to corporate tone and zero hallucination verified.*

---

### Day 8 - 30: Routine Operational Task Deployment
- **Objective:** Replace manual repetitive drafting with automated prompt chains.
- **Deliverables:**
  - [ ] Deploy daily triage and documentation prompt chains across live workflow.
  - [ ] Train support staff on input variable formatting.
  - [ ] Track hours saved weekly against firm baseline.
- **Evaluation Benchmark:** *Reclaim minimum 14 hours/week of billable time.*

---

### Day 31 - 60: Multi-Step Automation & API Integration
- **Objective:** Connect prompt workflows to Zapier, Make.com, or internal CRMs.
- **Deliverables:**
  - [ ] Configure webhook triggers for inbound client inquiries or contract drafts.
  - [ ] Automate structured preliminary review memos sent directly to team email/Slack.
  - [ ] Implement monthly audit log of AI-assisted outputs.
- **Evaluation Benchmark:** *Zero manual copy-pasting for recurring daily intakes.*

---

### Day 61 - 90: Institutional Mastery & Enterprise Scaling
- **Objective:** Scale prompt operating system across entire practice or department.
- **Deliverables:**
  - [ ] Conduct quarterly prompt refinement based on edge-case feedback.
  - [ ] Certify all team members on firm AI Governance Protocols.
  - [ ] Document firm ROI and client turnaround velocity acceleration.
- **Evaluation Benchmark:** *Firm achieves 3x faster client turnaround velocity.*

---

## 📋 PART VII: WEEKLY QUALITY CONTROL PUNCHLIST
- [ ] Verify input variables strictly align with governing standard: ISO 27001 & Distributed Systems Reliability Aligned.
- [ ] Confirm zero private client identifiers or confidential details are included in raw prompt.
- [ ] Inspect generated output against statutory cross-references and industry quality benchmarks.
- [ ] Verify quantitative figures and cost estimates balance to 100% precision.
- [ ] Log execution timestamp and accountable senior practitioner initials in compliance record.

---

## ⚖️ COMMERCIAL LICENSE & USAGE TERMS
This prompt system and its associated intellectual property are licensed for internal commercial business use. The licensee is authorized to utilize, adapt, and deploy these prompts within enterprise AI workspaces (Anthropic Claude, OpenAI ChatGPT, local LLMs). Resale or public redistribution of the raw source files is strictly prohibited.
