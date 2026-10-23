import fs from 'fs';
import path from 'path';
import { RoleSystemKit } from '../src/types';

interface RoleRawConfig {
  slugKey: string;
  role: string;
  industry: string;
  category: RoleSystemKit['category'];
  headline: string;
  subheadline: string;
  badge: string;
  hoursSavedWeekly: number;
  averageHourlyRate: number;
  tags: string[];
  overview: string;
  systemPromptDetails: {
    roleIdentity: string;
    domainKnowledge: string[];
    negativeConstraints: string[];
    outputStyle: string;
  };
  chains: Array<{
    id: string;
    title: string;
    category: string;
    objective: string;
    recommendedModel: RoleSystemKit['promptChains'][0]['recommendedModel'];
    complexity: RoleSystemKit['promptChains'][0]['complexity'];
    estimatedTokens: number;
    variables: Array<{ name: string; description: string; defaultValue: string }>;
    chainSteps: string[];
    promptCore: string;
    sampleInput: Record<string, string>;
    sampleOutput: string;
    practicalUseNote: string;
  }>;
  automations: Array<{
    title: string;
    tooling: string;
    trigger: string;
    executionSteps: string[];
    expectedOutput: string;
  }>;
  knowledgeBaseSnippets: Array<{
    fileName: string;
    purpose: string;
    content: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const ROLES_RAW: RoleRawConfig[] = [
  // ==========================================
  // 1. ENGINEERING & TECH
  // ==========================================
  {
    slugKey: 'staff-software-engineer',
    role: 'Staff Software Engineer & Distributed Systems Architect',
    industry: 'High-Scale Cloud & Distributed Computing',
    category: 'Engineering & Tech',
    headline: 'Production-Grade AI Prompt Chains & Architecture RFC Systems for Staff Engineers',
    subheadline: 'Automate distributed systems design reviews, RFC proposal synthesis, blameless post-mortems, and complex concurrency refactoring.',
    badge: 'ISO 27001 & Distributed Systems Reliability Aligned',
    hoursSavedWeekly: 14,
    averageHourlyRate: 210,
    tags: ['Staff Engineer', 'Distributed Systems', 'Architecture RFC', 'System Design', 'Postmortem', 'Kubernetes', 'Concurrency'],
    overview: 'Engineered specifically for L6+ engineers and tech leads who architect multi-region distributed applications. Eliminates 14+ hours weekly of tedious RFC documentation, failure mode effect analysis (FMEA), and concurrency deadlock triage.',
    systemPromptDetails: {
      roleIdentity: 'You are a Principal Distributed Systems Architect and L7 Staff Engineer with 15+ years experience designing zero-downtime microservices and globally distributed data stores (Kafka, Raft, DynamoDB, PostgreSQL).',
      domainKnowledge: [
        'CAP Theorem tradeoffs, PACELC model, and consensus protocols (Raft, Paxos)',
        'Event-driven event sourcing, CQRS, and idempotency key patterns',
        'Failure modes, cascading circuit breakers, and rate-limiting algorithms (Token Bucket, Leaky Bucket)',
        'Database isolation levels (Read Committed, Repeatable Read, Serializable) and distributed deadlocks'
      ],
      negativeConstraints: [
        'Never suggest naive single-point-of-failure architectures or unindexed database queries',
        'Never ignore partial network partitions, clock drift, or replay attack vectors',
        'Avoid hand-waving abstractions; provide concrete data structures, schema migrations, and pseudocode'
      ],
      outputStyle: 'Direct, highly technical, structured in markdown with explicit trade-off matrices, sequence diagrams (Mermaid), and algorithmic complexity notations (Big-O).'
    },
    chains: [
      {
        id: 'ARCH-01',
        title: 'Distributed Architecture RFC & Failure Mode Analysis',
        category: 'System Design & RFC',
        objective: 'Generate a comprehensive, production-ready Request for Comments (RFC) covering data consistency, partition tolerance, and fallback degraded states.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Enterprise Multi-Step',
        estimatedTokens: 2150,
        variables: [
          { name: 'SYSTEM_NAME', description: 'Name of the proposed service or subsystem', defaultValue: 'Global Real-Time Ledger Service' },
          { name: 'TARGET_SCALE', description: 'Expected QPS, throughput, latency targets', defaultValue: '50,000 write QPS, p99 < 15ms globally' },
          { name: 'PERSISTENCE_STACK', description: 'Underlying data stores and message brokers', defaultValue: 'CockroachDB + Apache Kafka + Redis Cluster' },
          { name: 'KEY_CONSTRAINTS', description: 'Regulatory, cost, or backward-compatibility bounds', defaultValue: 'Strict serializability for balances, PCI-DSS Level 1 compliance' }
        ],
        chainSteps: [
          'Step 1: System decomposition and high-level entity boundary definitions.',
          'Step 2: Failure Mode & Effects Analysis (FMEA) across network, storage, and node crashes.',
          'Step 3: Idempotency, retry backoff, and distributed transaction reconciliation mechanics.',
          'Step 4: Observability metrics (RED/USE), alerting thresholds, and graceful degradation playbook.'
        ],
        promptCore: `<system_role>
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
</instructions>`,
        sampleInput: {
          SYSTEM_NAME: 'Global Real-Time Ledger Service',
          TARGET_SCALE: '50,000 write QPS, p99 < 15ms globally',
          PERSISTENCE_STACK: 'CockroachDB + Apache Kafka + Redis Cluster',
          KEY_CONSTRAINTS: 'Strict serializability for balances, PCI-DSS Level 1 compliance'
        },
        sampleOutput: `### RFC-2026-08: High-Throughput Globally Consistent Ledger Architecture

#### 1. Executive Summary & Problem Formulation
The {{SYSTEM_NAME}} resolves multi-region write serialization while maintaining strict p99 < 15ms SLA under 50k write QPS. Non-goals include real-time analytics aggregation (delegated asynchronously to ClickHouse via Kafka CDC).

#### 2. Concurrency & Isolation Guarantees
- **Isolation Level:** Strict Serializable via Raft range leases in CockroachDB.
- **Idempotency Strategy:** Dual-layer token verification with Redis Bloom Filters (pre-filtering duplicates within 500µs) followed by unique constraint verification on \`transaction_id\` + \`idempotency_hash\`.
- **Degraded Mode:** During cross-region WAN disconnects, localized partition-tolerant read replicas serve cached balances with explicit staleness headers (\`X-Stale-After-MS\`).

#### 3. FMEA Resiliency Matrix
| Failure Vector | Detection Mechanism | Automated Mitigation | Recovery RTO |
|---|---|---|---|
| Split-Brain Raft Partition | Quorum heartbeat timeout (300ms) | Unreachable leader step-down; write fencing | < 1.2s |
| Kafka Partition Lag > 5k | Prometheus Burrow exporter alert | Dynamic consumer autoscaling (KEDA) | < 45s |
| Redis Node Eviction | Sentinel cluster failover | Direct DB fallback with circuit breaker | < 300ms |`,
        practicalUseNote: 'Feed this prompt with your team’s specific database versions to generate complete DDL schemas and Kafka topic partitioning keys.'
      },
      {
        id: 'ARCH-02',
        title: 'Blameless Post-Mortem & Root Cause Analysis (RCA)',
        category: 'Site Reliability & Ops',
        objective: 'Transform raw PagerDuty alerts, Datadog traces, and Slack incident threads into an executive blameless post-mortem with permanent remediation tickets.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 1850,
        variables: [
          { name: 'INCIDENT_TIMELINE', description: 'Raw timestamped incident notes and chat logs', defaultValue: '14:02 UTC: Error spike in auth service. 14:15 UTC: DB connection pool exhausted. 14:38 UTC: Rolled back PR #402. 14:52 UTC: Recovered.' },
          { name: 'BUSINESS_IMPACT', description: 'Failed requests, user count, financial impact', defaultValue: '8.4% of checkout requests failed (estimated $42,000 GMV loss)' },
          { name: 'ROOT_CAUSE_HYPOTHESIS', description: 'Suspected code or infrastructure trigger', defaultValue: 'Unbounded N+1 query in customer tier checking middleware merged in v2.4.1' }
        ],
        chainSteps: [
          'Step 1: Construct a chronologically normalized incident timeline.',
          'Step 2: Execute 5-Whys root cause analysis avoiding human blame.',
          'Step 3: Analyze contributing systemic vulnerabilities and monitoring blind spots.',
          'Step 4: Formulate prioritized Action Items (Prevent, Detect, Mitigate).'
        ],
        promptCore: `<system_role>
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
</output_requirements>`,
        sampleInput: {
          INCIDENT_TIMELINE: '14:02 UTC: Error spike. 14:15 UTC: DB pool exhausted. 14:38 UTC: Rollback. 14:52 UTC: Green.',
          BUSINESS_IMPACT: '8.4% checkout failures ($42k loss)',
          ROOT_CAUSE_HYPOTHESIS: 'N+1 query in loyalty middleware'
        },
        sampleOutput: `### Post-Mortem Report: Checkout Database Connection Saturation [INC-4819]

#### Incident Overview
- **Duration:** 50 minutes (14:02 UTC to 14:52 UTC)
- **Customer Impact:** 8.4% of checkout requests experienced 504 Gateway Timeouts.
- **Root Trigger:** Connection pool exhaustion triggered by un-batched database queries introduced in v2.4.1.

#### 5-Whys Analysis
1. *Why did checkouts fail?* The API gateway timed out waiting for the loyalty tier verification service.
2. *Why did the loyalty service hang?* Its HikariCP pool reached 100% saturation (100/100 connections).
3. *Why were all connections occupied?* Each request initiated 12 separate synchronous SQL roundtrips for customer badges instead of a single JOIN.
4. *Why was this not caught in CI?* Integration tests mock database latency at 0.1ms; staging data volume lacks multi-tier loyalty accounts.
5. *Why was there no canary defense?* Canary deployment gated on HTTP 500 error rates, but slow queries produced HTTP 504 at the gateway boundary without triggering internal app crashes.`,
        practicalUseNote: 'Paste raw Slack incident war room transcripts directly into the prompt; the system automatically cleans and normalizes time zones.'
      }
    ],
    automations: [
      {
        title: 'GitHub PR Automated Architecture Audit Action',
        tooling: 'GitHub Actions + Claude API + Slack Webhook',
        trigger: 'Pull Request opened with "rfc" or "architecture" label',
        executionSteps: [
          'Fetch PR diff and markdown specification.',
          'Execute ARCH-01 prompt chain via Claude 3.5 Sonnet API.',
          'Post automated architectural feedback, latency hazard warnings, and SQL indexing checklist as a PR comment.'
        ],
        expectedOutput: 'Detailed PR review comment containing FMEA risk score and data migration verification within 45 seconds.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'claude_project_distributed_systems_guidelines.md',
        purpose: 'Core architectural standards and non-negotiable engineering rules.',
        content: '# Distributed Systems Engineering Tenets\n- Always enforce write timeouts and circuit breakers.\n- Require idempotency keys for all mutating HTTP verbs.\n- Mandate backward and forward schema compatibility across all Kafka Avro schemas.'
      }
    ],
    faq: [
      {
        question: 'How is this different from asking standard ChatGPT to write an RFC?',
        answer: 'Standard ChatGPT produces vague generalities like "use a cache". These prompt chains enforce explicit distributed systems concepts (PACELC, consensus quorums, connection pool sizing, dead letter queues, and exact failure matrix bounds) calibrated for L6/L7 staff engineer review.'
      },
      {
        question: 'Can I use this with private proprietary source code safely?',
        answer: 'Yes. The prompt systems are designed to operate on abstracted architectural schemas and pseudocode. You can strip internal IP or utilize private enterprise API endpoints (Anthropic Claude on AWS Bedrock or OpenAI Enterprise) with zero data retention.'
      }
    ]
  },

  // ==========================================
  // 2. FRONTEND NEXT.JS ENGINEER
  // ==========================================
  {
    slugKey: 'frontend-nextjs-engineer',
    role: 'Senior Frontend & Next.js App Router Engineer',
    industry: 'Modern Web Applications & Fullstack TypeScript',
    category: 'Engineering & Tech',
    headline: 'Production AI Workflows & Component Systems for Senior Next.js Engineers',
    subheadline: 'Master React Server Components (RSC), complex client state architecture, optimistic mutations, and sub-second Core Web Vitals.',
    badge: 'Next.js 14/15 App Router & Core Web Vitals Certified',
    hoursSavedWeekly: 13,
    averageHourlyRate: 145,
    tags: ['Next.js', 'React Server Components', 'TypeScript', 'Tailwind CSS', 'Web Performance', 'Shadcn UI', 'Zustand'],
    overview: 'Built for frontend engineers building high-performance modern web apps. Eliminates hours of boilerplate React state setup, server action validation, edge-case accessibility auditing, and Core Web Vitals layout shift debugging.',
    systemPromptDetails: {
      roleIdentity: 'You are a Senior Frontend Architect and React Core specialist with extensive mastery over Next.js App Router, React Server Components, TypeScript 5, Tailwind CSS, and Web Vitals.',
      domainKnowledge: [
        'RSC vs Client Component boundary optimization and serialization limits',
        'Server Actions with safe validation (Zod) and optimistic UI updates (useOptimistic)',
        'Next.js caching tiers: Request Memoization, Data Cache, Full Route Cache, Router Cache',
        'Web Vitals optimization: LCP image priority, CLS layout reserve, INP event delegation'
      ],
      negativeConstraints: [
        'Never use "use client" unnecessarily at page roots',
        'Never write untyped "any" TypeScript code or unhandled promise states',
        'Avoid layout shifts; always specify intrinsic image dimensions and font display swap'
      ],
      outputStyle: 'Clean, modular, enterprise-grade TypeScript code adhering to modern React best practices with explicit accessibility (ARIA) and loading skeletons.'
    },
    chains: [
      {
        id: 'FE-01',
        title: 'Fullstack Next.js Server Action with Optimistic UI & Zod Validation',
        category: 'Fullstack Component Engineering',
        objective: 'Generate a production-grade React Server Action with end-to-end type safety, Zod schema validation, optimistic UI updates, and error boundary fallbacks.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 1750,
        variables: [
          { name: 'FEATURE_NAME', description: 'Name of the interactive feature', defaultValue: 'Team Member Invite & Role Allocation' },
          { name: 'MUTATION_TARGET', description: 'Database or API update operation', defaultValue: 'Insert invitation record into Supabase PostgreSQL' },
          { name: 'VALIDATION_RULES', description: 'Required fields and constraints', defaultValue: 'Valid business email, role in [admin, member, viewer], max 10 invites' }
        ],
        chainSteps: [
          'Step 1: Define strict Zod validation schema and inferred TypeScript types.',
          'Step 2: Construct the secure Server Action with auth session verification.',
          'Step 3: Build the client form component utilizing useActionState and useOptimistic.',
          'Step 4: Implement accessible loading skeleton, error toast, and zero-CLS states.'
        ],
        promptCore: `<system_role>
You are an expert Next.js 14/15 App Router engineer generating enterprise TypeScript code.
</system_role>

<feature_spec>
Feature: {{FEATURE_NAME}}
Mutation: {{MUTATION_TARGET}}
Rules: {{VALIDATION_RULES}}
</feature_spec>

<code_requirements>
1. Produce 100% production-ready TypeScript code:
   - 'actions.ts': Server action with 'use server', Zod safeParse, revalidatePath, and safe serializable return shapes.
   - 'Component.tsx': Client component with 'use client', useOptimistic for instant user feedback, and accessible ARIA attributes.
2. Include error boundaries and toast notifications.
</code_requirements>`,
        sampleInput: {
          FEATURE_NAME: 'Team Member Invite & Role Allocation',
          MUTATION_TARGET: 'Insert invitation into database',
          VALIDATION_RULES: 'Business email, role in [admin, member], rate limited'
        },
        sampleOutput: `// src/app/team/actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const InviteSchema = z.object({
  email: z.string().email('Invalid work email address').refine(e => !e.endsWith('@gmail.com'), 'Must be a corporate domain'),
  role: z.enum(['admin', 'member', 'viewer']),
});

export type InviteFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function inviteTeamMemberAction(prevState: InviteFormState, formData: FormData): Promise<InviteFormState> {
  const parsed = InviteSchema.safeParse({
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    // Database insert and email dispatch logic
    revalidatePath('/team');
    return { success: true, message: 'Invitation dispatched successfully.' };
  } catch (err) {
    return { success: false, message: 'Database transaction failed. Please retry.' };
  }
}`,
        practicalUseNote: 'Drop this code directly into your Next.js App Router codebase; it handles all modern React 18/19 server action mechanics out of the box.'
      }
    ],
    automations: [
      {
        title: 'Automated Accessibility & Web Vitals Audit',
        tooling: 'Playwright + Lighthouse CI + Claude API',
        trigger: 'On PR deploy preview ready',
        executionSteps: [
          'Run automated Lighthouse accessibility and CLS audit on preview URL.',
          'Pass audit JSON report to Claude 3.5 Haiku to extract immediate CSS and DOM layout fixes.',
          'Comment exact code diff directly on the PR.'
        ],
        expectedOutput: 'Actionable CSS patches for any layout shifts or contrast issues.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'nextjs_app_router_rules.md',
        purpose: 'Architecture rules for React Server Components.',
        content: '# Next.js App Router Core Standards\n- Keep Server Components default; push client boundaries to terminal leaves.\n- Never pass non-serializable objects (functions, classes) across the server/client boundary.'
      }
    ],
    faq: [
      {
        question: 'Does this support Next.js 14 and 15?',
        answer: 'Yes. All prompt chains and code patterns are engineered specifically for Next.js App Router, React Server Actions, and modern TypeScript standards.'
      }
    ]
  },

  // ==========================================
  // 3. CORPORATE ATTORNEY (M&A / TECH)
  // ==========================================
  {
    slugKey: 'corporate-attorney-mna',
    role: 'Corporate Attorney & M&A Transaction Specialist',
    industry: 'Corporate Law, M&A & Private Equity',
    category: 'Legal & Compliance',
    headline: 'Production AI Prompt Chains & Contract Risk Review Systems for Corporate Counsel',
    subheadline: 'Accelerate M&A purchase agreement (SPA) redlines, indemnity cap audits, disclosure schedules, and board resolution drafting.',
    badge: 'Delaware General Corporation Law (DGCL) Aligned',
    hoursSavedWeekly: 16,
    averageHourlyRate: 485,
    tags: ['Corporate Law', 'M&A', 'Purchase Agreement', 'Indemnification', 'Due Diligence', 'Delaware Law', 'Contract Redline'],
    overview: 'Engineered specifically for corporate attorneys and deal counsel managing acquisitions, financings, and complex commercial agreements. Cuts contract review cycles by 65% while preventing missed liabilities, uncapped indemnities, and unfavorable representations.',
    systemPromptDetails: {
      roleIdentity: 'You are a Senior Corporate & M&A Partner with 20+ years of experience structuring mid-market and cross-border transactions under Delaware and New York corporate law.',
      domainKnowledge: [
        'Stock Purchase Agreements (SPA), Asset Purchase Agreements (APA), and Merger Agreements',
        'Indemnification mechanics: baskets (tipping vs deductible), caps, mini-baskets, and carve-outs (Fundamental Reps, Fraud)',
        'Material Adverse Effect (MAE) definitions and Delaware Chancery Court standards (Akorn v. Fresenius, AB Stable)',
        'Reps & Warranties Insurance (RWI) alignment and survival period statutory limitations'
      ],
      negativeConstraints: [
        'Never make ambiguous redline suggestions; always provide exact verbatim strike-through and insert language',
        'Never overlook definitions of "Knowledge" (constructive vs actual) or temporal qualifiers',
        'Include formal attorney work-product disclaimers and client risk categorization'
      ],
      outputStyle: 'Formal legal memorandum style with exact contractual redlines, risk level classifications (High/Medium/Low), and strategic negotiation leverage notes.'
    },
    chains: [
      {
        id: 'MNA-01',
        title: 'M&A Stock Purchase Agreement (SPA) Indemnity & Cap Analysis',
        category: 'M&A Contract Triage',
        objective: 'Conduct an exhaustive review of target indemnification provisions to identify uncapped liabilities, weak baskets, and unfavorable survival horizons.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Enterprise Multi-Step',
        estimatedTokens: 2400,
        variables: [
          { name: 'CONTRACT_EXCERPT', description: 'Raw text of the Indemnification / Limitation of Liability section', defaultValue: 'Section 8.02 Indemnification by Seller. Seller shall indemnify Buyer for any losses...' },
          { name: 'CLIENT_POSITION', description: 'Are you representing Buyer or Seller?', defaultValue: 'Buyer (Aggressive Protection)' },
          { name: 'DEAL_SIZE_VALUATION', description: 'Enterprise transaction valuation', defaultValue: '$25,000,000 Private Company Acquisition' }
        ],
        chainSteps: [
          'Step 1: Extract and classify every limitation of liability (Basket, Cap, Survival, Carve-outs).',
          'Step 2: Benchmark against American Bar Association (ABA) Private Target M&A Deal Points Study.',
          'Step 3: Generate verbatim strike-through redline markup favoring client position.',
          'Step 4: Draft accompanying negotiation cover commentary for opposing counsel.'
        ],
        promptCore: `<system_role>
You are Senior Corporate M&A Counsel executing an aggressive redline audit.
</system_role>

<deal_context>
Client Position: {{CLIENT_POSITION}}
Transaction Size: {{DEAL_SIZE_VALUATION}}
Contract Language:
{{CONTRACT_EXCERPT}}
</deal_context>

<audit_instructions>
1. Analyze the excerpt against modern Delaware market standards:
   - Basket structure (Tipping basket vs True Deductible)
   - General Cap vs Fundamental Reps Cap (Is it equal to Enterprise Value or 10-15% escrow?)
   - Survival periods (General reps: 12-18 mos; Tax/Environmental: Statute of Limitations + 60 days)
   - Sandbagging posture (Pro-sandbagging vs Anti-sandbagging clause)
2. Provide verbatim contractual redline markup using standard legal bracket notation: [DELETE: ...] and [INSERT: ...].
3. Detail strategic negotiation counter-arguments.
</audit_instructions>`,
        sampleInput: {
          CONTRACT_EXCERPT: 'Seller liability shall not exceed $1,000,000 and expires 6 months following closing.',
          CLIENT_POSITION: 'Buyer (Aggressive Protection)',
          DEAL_SIZE_VALUATION: '$25,000,000 Private Company Acquisition'
        },
        sampleOutput: `### LEGAL MEMORANDUM & CONTRACTUAL REDLINE AUDIT

**CONFIDENTIAL ATTORNEY-CLIENT PRIVILEGED WORK PRODUCT**

#### 1. Strategic Exposure Analysis (Buyer Perspective)
- **Extreme Cap Deficiency:** A $1,000,000 aggregate cap represents only 4.0% of the $25M Enterprise Value. Standard ABA Deal Points Study benchmarks place general indemnity escrows between 7.5% - 10.0% ($1.87M - $2.5M).
- **Severe Survival Hazard:** A 6-month survival period precludes discovery of unrecorded liabilities through a full annual fiscal audit cycle. Market standard is 12 to 18 months.
- **Missing Fundamental Rep Exceptions:** Organization, Authority, Capitalization, and Tax reps must strictly survive until the expiration of the applicable statutory limitation period plus 60 days.

#### 2. Proposed Contractual Redline Markup
> "Section 8.04 Limitation on Indemnification. The aggregate liability of Seller under Section 8.02(a) shall not exceed [DELETE: $1,000,000] [INSERT: fifteen percent (15%) of the Purchase Price ($3,750,000)]; *provided, however*, that the foregoing limitation shall not apply to breaches of Fundamental Representations, intentional fraud, or willful misconduct, which shall be capped solely by [INSERT: the total Purchase Price actually received by Seller]. All representations and warranties shall survive for a period of [DELETE: six (6) months] [INSERT: eighteen (18) months] following the Closing Date."`,
        practicalUseNote: 'Paste dense 40-page purchase agreement sections directly into Claude 3.5 Sonnet; the system categorizes every clause into an immediate negotiation matrix.'
      }
    ],
    automations: [
      {
        title: 'Automated NDA & Vendor Agreement Triage Pipeline',
        tooling: 'Zapier / Make + Claude 3.5 API + DocuSign / Outlook',
        trigger: 'Inbound email with attached counterparty NDA or MSA',
        executionSteps: [
          'Extract PDF text and run automated clause deviation analysis.',
          'Flag non-standard non-solicitation, uncapped indemnities, or unilateral IP assignments.',
          'Generate clean redlined DOCX and brief email summary back to the managing attorney.'
        ],
        expectedOutput: 'Pre-redlined draft returned to attorney inbox within 2 minutes of email receipt.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'mna_negotiation_playbook.md',
        purpose: 'Firm standard negotiation positions and fallbacks.',
        content: '# Firm Standard Deal Terms\n- Never accept anti-sandbagging clauses without executive managing partner approval.\n- Insist on Delaware governing law and exclusive Chancery Court venue for Delaware entities.'
      }
    ],
    faq: [
      {
        question: 'Does this replace formal legal counsel?',
        answer: 'No. This prompt system is an advanced force multiplier for licensed attorneys, paralegals, and legal departments to accelerate document review, spot market outliers, and draft initial redlines in minutes rather than hours.'
      }
    ]
  },

  // ==========================================
  // 4. COMMERCIAL REAL ESTATE BROKER
  // ==========================================
  {
    slugKey: 'commercial-real-estate-broker',
    role: 'Commercial Real Estate Broker & Investment Sales Lead',
    industry: 'Commercial Real Estate, NNN & Multifamily Assets',
    category: 'Real Estate',
    headline: 'AI Deal Memorandums & Investment Underwriting Systems for CRE Brokers',
    subheadline: 'Generate institutional Offering Memorandums (OM), Cap Rate sensitivity analyses, tenant lease abstracts, and high-converting investor pitch letters.',
    badge: 'CCIM Commercial Investment Analysis Aligned',
    hoursSavedWeekly: 15,
    averageHourlyRate: 195,
    tags: ['Commercial Real Estate', 'Offering Memorandum', 'Cap Rate', 'Triple Net NNN', 'Multifamily', 'Underwriting', 'CRE Broker'],
    overview: 'Built for investment sales brokers and commercial advisors selling $2M–$50M retail, industrial, and multifamily properties. Turns complex rent rolls and P&L statements into institutional-grade pitch books and investor memos in minutes.',
    systemPromptDetails: {
      roleIdentity: 'You are an institutional Commercial Real Estate Investment Sales Managing Director and CCIM designee with 18+ years executing high-profile NNN retail, industrial warehouse, and Class-A multifamily transactions.',
      domainKnowledge: [
        'Net Operating Income (NOI) calculation, expense reimbursements (CAM, Tax, Insurance), and capital reserves',
        'Cap Rate compression/expansion modeling, Internal Rate of Return (IRR), and Cash-on-Cash yield metrics',
        'Lease structures: Absolute NNN, Modified Gross, Full Service Gross, and percentage rent clauses',
        'Demographic trade area analysis (1-3-5 mile radius rings, traffic counts, median household income)'
      ],
      negativeConstraints: [
        'Never state speculative Cap Rates without market comps or interest rate context',
        'Never confuse Gross Potential Rent (GPR) with Effective Gross Income (EGI)',
        'Always include standard commercial brokerage disclaimers and non-endorsement language'
      ],
      outputStyle: 'Institutional real estate investment presentation style with crisp financial summaries, demographic bullet points, and investment highlight matrices.'
    },
    chains: [
      {
        id: 'CRE-01',
        title: 'Institutional Offering Memorandum (OM) Executive Summary & Deal Narrative',
        category: 'Investment Sales Packaging',
        objective: 'Convert property financial metrics, tenant credit profile, and location data into an institutional-grade investment narrative for 1031 exchange and private equity buyers.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 2100,
        variables: [
          { name: 'PROPERTY_NAME_TYPE', description: 'Asset name and property type', defaultValue: 'Oakridge Logistics Center (145,000 SF Industrial Warehouse)' },
          { name: 'TENANT_PROFILE', description: 'Credit rating, lease term, corporate guaranty', defaultValue: 'Single tenant: FedEx Ground (BBB Corporate Guarantee), 9.5 Years Remaining' },
          { name: 'FINANCIAL_METRICS', description: 'Price, NOI, Cap Rate, Rental escalations', defaultValue: 'List: $18,500,000 | Current NOI: $1,110,000 | Cap Rate: 6.00% | 2.5% Annual Escalations' },
          { name: 'LOCATION_DRIVERS', description: 'Logistics access, MSA population growth', defaultValue: 'Adjacent to I-85 interstate junction, 15 min to international cargo airport, zero state income tax' }
        ],
        chainSteps: [
          'Step 1: Frame the core investment thesis (credit quality, inflation-hedging rent steps, replacement cost).',
          'Step 2: Synthesize a financial underwriting summary table (Year 1 to Year 10 cash flow projection).',
          'Step 3: Articulate property and location highlights formatted for institutional investment committees.',
          'Step 4: Draft 1031 exchange urgency call-to-action.'
        ],
        promptCore: `<system_role>
You are an institutional CRE Investment Sales Managing Director crafting an Offering Memorandum.
</system_role>

<property_data>
Asset: {{PROPERTY_NAME_TYPE}}
Tenant: {{TENANT_PROFILE}}
Financials: {{FINANCIAL_METRICS}}
Location: {{LOCATION_DRIVERS}}
</property_data>

<deliverable_structure>
Generate an institutional Offering Memorandum Executive Summary:
1. Executive Deal Highlights (4 bullet points with bold metrics)
2. Investment Thesis: Why this asset out-performs peers in current macro-rate environment
3. Tenant Credit & Lease Overview (Lease type, guarantor strength, renewal options)
4. Financial Snapshot & 10-Year Escalation Trajectory
5. 1031 Exchange Suitability Assessment
</deliverable_structure>`,
        sampleInput: {
          PROPERTY_NAME_TYPE: 'Oakridge Logistics Center (145,000 SF Industrial)',
          TENANT_PROFILE: 'FedEx Ground (BBB Guaranty), 9.5 Yrs Remaining',
          FINANCIAL_METRICS: '$18.5M List, $1.11M NOI, 6.00% Cap Rate, 2.5% Annual Bumps',
          LOCATION_DRIVERS: 'I-85 corridor, 15 min to airport'
        },
        sampleOutput: `### INVESTMENT OFFERING MEMORANDUM | EXECUTIVE SUMMARY
**OAKRIDGE LOGISTICS CENTER • 145,000 SF CLASS-A DISTRIBUTION FACILITY**

#### 1. Investment Highlights
- **Mission-Critical Credit Tenancy:** 100% leased to FedEx Ground on a long-term corporate commitment with 9.5 years of firm remaining term.
- **Compounding Inflation Shield:** Features 2.50% annual contractual rental escalations, elevating yield through the hold horizon.
- **Prime Southeastern Freight Hub:** Direct frontage along the I-85 logistics artery with immediate proximity to intermodal cargo terminals.
- **Offered at $18,500,000 (6.00% Going-In Cap Rate):** Superior risk-adjusted yield compared to primary gateway industrial benchmarks.

#### 2. Tenancy & Lease Abstract
- **Guarantor:** FedEx Corporation (NYSE: FDX, S&P: BBB Investment Grade).
- **Lease Structure:** Absolute NNN with zero landlord capital responsibilities (Tenant responsible for roof, structure, HVAC, and tax escrow).
- **Renewal Options:** Four (4) consecutive 5-year renewal periods at fair market value with minimum 10% rent adjustments.`,
        practicalUseNote: 'Use this output as the foundational text for your designer or marketing team to build high-end printed glossy OMs.'
      }
    ],
    automations: [
      {
        title: 'Crexi / LoopNet Inbound Lead Auto-Underwriting Response',
        tooling: 'Zapier + Claude API + Gmail / HubSpot',
        trigger: 'New broker inquiry submitted on listing portal',
        executionSteps: [
          'Parse investor buyer profile and stated 1031 timeline.',
          'Run automated matching against listing financial model.',
          'Draft personalized executive email with attached CA (Confidentiality Agreement) and custom OM teaser.'
        ],
        expectedOutput: 'Personalized investor reply sent within 90 seconds of lead capture.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'cre_underwriting_standards.md',
        purpose: 'Standard brokerage valuation templates.',
        content: '# Commercial Underwriting Baseline\n- Always deduct 2.0% structural reserve for industrial assets unless Absolute NNN.\n- Benchmark local replacement cost per square foot.'
      }
    ],
    faq: [
      {
        question: 'Can this underwrite multi-tenant retail shopping centers with CAM reconciliations?',
        answer: 'Yes. The prompt chains include specialized modules for multi-tenant rent rolls, NNN common area maintenance allocations, and lease rollover risk profiling.'
      }
    ]
  },

  // ==========================================
  // 5. FRACTIONAL CFO & FINANCIAL STRATEGIST
  // ==========================================
  {
    slugKey: 'fractional-cfo-financial-strategist',
    role: 'Fractional CFO & Corporate Financial Strategist',
    industry: 'High-Growth Tech, B2B Services & Private Equity',
    category: 'Finance & Investment',
    headline: 'AI Executive Financial Systems & Board Reporting Chains for Fractional CFOs',
    subheadline: 'Automate 13-week cash flow modeling, SaaS unit economics audits (CAC, LTV, Magic Number), and board deck financial commentary.',
    badge: 'GAAP & AICPA Financial Management Aligned',
    hoursSavedWeekly: 17,
    averageHourlyRate: 275,
    tags: ['Fractional CFO', 'Cash Flow Forecast', 'Unit Economics', 'SaaS Metrics', 'Board Deck', 'Financial Modeling', 'Burn Multiple'],
    overview: 'Engineered specifically for Fractional CFOs and finance leaders managing multiple venture-backed or bootstrapped companies. Eliminates manual narrative writing for monthly board packs and delivers deep cash runway scenario analyses.',
    systemPromptDetails: {
      roleIdentity: 'You are an elite Fractional CFO and former Tier-1 Investment Banking VP with 20+ years steering high-growth startups and mid-market firms through Series A-C rounds and strategic exits.',
      domainKnowledge: [
        '13-Week Cash Flow Direct Forecast modeling (receipts, disbursements, payroll, vendor terms)',
        'SaaS Unit Economics: Net Revenue Retention (NRR), Gross Retention (GRR), CAC Payback, LTV:CAC, Magic Number',
        'Burn Multiple (Net Burn / Net New ARR) efficiency benchmarks across macro funding climates',
        'ASC 606 revenue recognition, deferred revenue amortization, and GAAP-to-Adjusted EBITDA bridges'
      ],
      negativeConstraints: [
        'Never present financial metrics without benchmarking against industry quartile standards (e.g. Bessemer Cloud Index)',
        'Never treat bookings or billings as recognized revenue',
        'Always identify runway cliff dates and scenario stress-test sensitivities (Bull, Base, Bear)'
      ],
      outputStyle: 'Executive CFO advisory style with clean variance tables, strategic capital allocation commentary, and decisive recommendations for Founders and Boards.'
    },
    chains: [
      {
        id: 'CFO-01',
        title: 'Monthly Board Pack Financial Commentary & Unit Economics Diagnostic',
        category: 'Board & Investor Reporting',
        objective: 'Transform raw accounting P&L numbers and Stripe/Billing metrics into an institutional Board of Directors financial presentation narrative.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Enterprise Multi-Step',
        estimatedTokens: 2300,
        variables: [
          { name: 'FINANCIAL_RAW_DATA', description: 'Monthly revenue, gross margin, OPEX, ending cash balance', defaultValue: 'ARR: $4.2M (up 18% YoY), Gross Margin: 78%, Monthly Burn: $120k, Cash: $2.1M (17.5 mos runway)' },
          { name: 'UNIT_ECONOMICS', description: 'CAC, NRR, churn, customer counts', defaultValue: 'CAC: $8,400, CAC Payback: 11 mos, NRR: 114%, Logo Churn: 0.8%/mo, Blended Magic Number: 0.95' },
          { name: 'KEY_VARIANCE_ISSUES', description: 'Budget vs actual unexpected deviations', defaultValue: 'Cloud hosting AWS costs jumped 32% due to unindexed vector search experiment' }
        ],
        chainSteps: [
          'Step 1: Calculate core efficiency ratios (Burn Multiple, Rule of 40, Runway Horizon).',
          'Step 2: Generate an Executive CFO Commentary narrative for board review.',
          'Step 3: Perform variance analysis on operational budget deviations with corrective action plans.',
          'Step 4: Draft forward 12-month capital allocation and hiring milestones.'
        ],
        promptCore: `<system_role>
You are a Fractional CFO presenting the monthly financial performance to the Board of Directors.
</system_role>

<input_data>
Financial Performance: {{FINANCIAL_RAW_DATA}}
Unit Economics: {{UNIT_ECONOMICS}}
Variances: {{KEY_VARIANCE_ISSUES}}
</input_data>

<deliverable_format>
Draft an authoritative Board Financial Section:
1. Executive CFO Dashboard (Key metrics, status color, commentary)
2. Unit Economics Health Check (Benchmarked against top-quartile B2B SaaS)
3. P&L Variance Decomposition & Corrective Action
4. Runway Sensitivity Analysis (Base Case vs Bear Case hiring freeze)
5. Strategic Capital Recommendations
</deliverable_format>`,
        sampleInput: {
          FINANCIAL_RAW_DATA: 'ARR: $4.2M (+18% YoY), GM: 78%, Monthly Burn: $120k, Cash: $2.1M (17.5 mos runway)',
          UNIT_ECONOMICS: 'CAC: $8.4k, Payback: 11 mos, NRR: 114%, Logo Churn: 0.8%/mo',
          KEY_VARIANCE_ISSUES: 'AWS hosting jumped 32% due to vector search experiment'
        },
        sampleOutput: `### MONTHLY FINANCIAL PACK | EXECUTIVE CFO COMMENTARY

#### 1. Executive Financial Dashboard
- **Annual Recurring Revenue (ARR):** $4,200,000 (+18.2% YoY | +2.8% MoM).
- **Net Burn & Efficiency:** $120,000 net monthly burn | **Burn Multiple: 1.15** (Strong top-quartile efficiency for $1M-$5M ARR cohort).
- **Cash Position & Runway:** $2,100,000 ending cash | **17.5 Months Runway** (Base case runway extends to Q3 next fiscal year).
- **Rule of 40 Score:** 18.2% ARR Growth + 15.5% Free Cash Flow Margin = **33.7%** (Targeting 40% milestone by Q4).

#### 2. Unit Economics Diagnostics & Cohort Retention
- **Net Revenue Retention (NRR):** At **114.2%**, enterprise expansion within the mid-market cohort remains healthy, driven by seat additions and tiered feature tier upgrades.
- **CAC Payback Horizon:** Current payback velocity of **11.2 months** comfortably beats the 12-month industry benchmark.

#### 3. Budget Variance & Corrective Interventions
- **Cloud Infrastructure Overrun (+32% vs Budget):** Investigated $14,200 unplanned compute spike. Un-sharded vector similarity queries deployed during the RAG feature beta caused memory bloat on AWS instances.
- *Remediation:* Deployed query rate-limiting and transitioned search indices to serverless Pinecone instance, projecting an immediate $9,500 monthly reduction effective next cycle.`,
        practicalUseNote: 'Connect this prompt directly to your QuickBooks Online or Xero monthly report exports for instant executive slide synthesis.'
      }
    ],
    automations: [
      {
        title: 'Automated 13-Week Cash Flow Scenario Alerts',
        tooling: 'Google Sheets / Excel + Claude API + Slack Executive Channel',
        trigger: 'Weekly bank balance and AR/AP aging update',
        executionSteps: [
          'Calculate forward 13-week net cash position.',
          'Execute stress-test for 30-day payment delays from top 3 enterprise debtors.',
          'Post automated executive brief flagging runway cliff dates and vendor payment schedules.'
        ],
        expectedOutput: 'Actionable weekly cash alert posted to CEO & CFO Slack every Monday morning.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'saas_cfo_benchmarks.md',
        purpose: 'Venture capital benchmarks for SaaS metrics.',
        content: '# SaaS Efficiency Rules\n- Burn multiple under 1.2 is excellent.\n- Target CAC payback under 12 months for self-serve, under 18 months for enterprise.'
      }
    ],
    faq: [
      {
        question: 'Can this generate financial projections from messy QuickBooks raw exports?',
        answer: 'Yes. The prompt instructions include raw data normalization rules that categorize messy chart-of-accounts entries into standard GAAP EBITDA and cash flow categories.'
      }
    ]
  },

  // ==========================================
  // 6. PRIVATE PRACTICE PHYSICIAN
  // ==========================================
  {
    slugKey: 'private-practice-physician',
    role: 'Private Practice Physician & Clinical Director',
    industry: 'Outpatient Clinical Practice & Direct Care',
    category: 'Healthcare & Clinical',
    headline: 'Clinical AI Prompt Workflows & Insurance Appeal Systems for Physicians',
    subheadline: 'Accelerate comprehensive SOAP notes, complex peer-to-peer insurance prior authorization appeals, and patient education handbooks.',
    badge: 'AMA CPT/ICD-10 & HIPAA Privacy Protocol Aligned',
    hoursSavedWeekly: 15,
    averageHourlyRate: 240,
    tags: ['Physician', 'SOAP Notes', 'Prior Authorization', 'Insurance Appeal', 'Clinical Director', 'CPT Coding', 'Medical Practice'],
    overview: 'Engineered specifically for outpatient physicians, medical directors, and private clinics. Slashes documentation burden by 70%, generates bulletproof prior authorization denial appeals, and drafts empathetic patient discharge summaries.',
    systemPromptDetails: {
      roleIdentity: 'You are a Board-Certified Internal Medicine Physician and Medical Practice Director with 20+ years of clinical outpatient experience.',
      domainKnowledge: [
        'Structured SOAP note architecture (Subjective, Objective, Assessment, Plan)',
        'Insurance Medical Necessity Criteria: Milliman Care Guidelines (MCG), InterQual, CMS Local Coverage Determinations (LCD)',
        'Prior Authorization Appeal Letters (citing peer-reviewed clinical trials, FDA indications, and failed conservative therapy)',
        'CPT Evaluation & Management (E/M) coding guidelines (99213 vs 99214 vs 99215 complexity matrices)'
      ],
      negativeConstraints: [
        'Never diagnose or provide medical care without explicit de-identification of Protected Health Information (PHI)',
        'Never hallucinate clinical trial evidence; reference real landmark medical literature (NEJM, JAMA, Lancet)',
        'Include standard statutory medical disclaimers on all clinical drafts'
      ],
      outputStyle: 'Authoritative, medically rigorous clinical documentation matching AMA standards and CMS billing criteria.'
    },
    chains: [
      {
        id: 'MED-01',
        title: 'Prior Authorization Insurance Denial Appeal & Medical Necessity Brief',
        category: 'Insurance & Revenue Cycle',
        objective: 'Draft a medically authoritative, peer-reviewed insurance appeal overturning commercial prior authorization denials for specialized treatments or medications.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 2050,
        variables: [
          { name: 'PATIENT_CLINICAL_HISTORY', description: 'De-identified clinical background, symptoms, failed therapies', defaultValue: '54M with severe uncontrolled plaque psoriasis (PASI 18, BSA 16%). Failed 6-month trial of high-potency topical clobetasol and oral methotrexate (discontinued due to elevated ALT/AST hepatotoxicity).' },
          { name: 'REQUESTED_TREATMENT', description: 'Drug/procedure and dosage', defaultValue: 'Skyrizi (risankizumab-rzaa) 150 mg subcutaneous injection' },
          { name: 'DENIAL_REASON_CODE', description: 'Insurer denial rationale from letter', defaultValue: 'Denied by commercial insurer citing failure to trial a second oral systemic agent (cyclosporine)' }
        ],
        chainSteps: [
          'Step 1: Deconstruct insurer denial rationale against CMS and clinical society guidelines (AAD/EADV).',
          'Step 2: Synthesize patient treatment timeline establishing failed conservative therapies and contraindications.',
          'Step 3: Cite peer-reviewed landmark phase III clinical trials demonstrating superior efficacy and safety.',
          'Step 4: Draft formal Peer-to-Peer Medical Director appeal letter demanding immediate re-adjudication.'
        ],
        promptCore: `<system_role>
You are a Board-Certified Medical Specialist drafting a formal Prior Authorization Appeal.
</system_role>

<case_data>
Clinical History: {{PATIENT_CLINICAL_HISTORY}}
Requested Therapy: {{REQUESTED_TREATMENT}}
Denial Rationale: {{DENIAL_REASON_CODE}}
</case_data>

<letter_structure>
Draft an authoritative Peer-to-Peer Appeal Letter to the Medical Director:
1. Re-Adjudication Demand Header (ICD-10, CPT, National Drug Code)
2. Patient Clinical Summary & Documented Failure of Step-Therapy
3. Contraindication Evidence against Insurer-Preferred Alternative (e.g. why cyclosporine is clinically inappropriate)
4. Landmark Evidence-Based Literature Citations (Phase III Trial data)
5. Formal Medical Necessity Certification & Legal Escalation Clause (ERISA / State Insurance Commissioner notice)
</letter_structure>`,
        sampleInput: {
          PATIENT_CLINICAL_HISTORY: '54M severe plaque psoriasis (PASI 18). Failed topical clobetasol and methotrexate (ALT/AST toxicity).',
          REQUESTED_TREATMENT: 'Skyrizi 150mg SQ',
          DENIAL_REASON_CODE: 'Denied citing failure to trial oral cyclosporine'
        },
        sampleOutput: `### FORMAL RE-ADJUDICATION DEMAND & CLINICAL APPEAL

**TO:** Office of the Medical Director | Utilization Management & Pharmacy Appeals  
**RE:** Urgent Appeal for Prior Authorization Denial | Skyrizi (risankizumab-rzaa)  
**DIAGNOSIS:** Severe Chronic Plaque Psoriasis (ICD-10: L40.0) | BSA: 16%, PASI: 18  

Dear Medical Director,

I am writing to formally contest your recent adverse determination denying coverage for **Skyrizi (risankizumab-rzaa)** for the above-referenced patient. Your denial letter mandates a trial of oral cyclosporine. This step-therapy requirement is **clinically contraindicated, medically inappropriate**, and creates severe liability for patient harm.

#### 1. Documented Step-Therapy Failure & Contraindications
As detailed in clinical records:
- The patient underwent a rigorous 6-month trial of optimized oral methotrexate.
- Methotrexate was discontinued due to documented drug-induced hepatotoxicity with serum transaminases rising to 3.2x upper limit of normal (ALT 142 U/L, AST 118 U/L).
- Mandating a trial of **cyclosporine** in a patient with baseline hypertension and borderline renal clearance (eGFR 64 mL/min) carries an unacceptably high risk of nephrotoxicity, severe hypertension, and accelerated organ dysfunction per American Academy of Dermatology (AAD) Guidelines.

#### 2. Evidence-Based Medical Necessity
Targeted IL-23 inhibition with risankizumab is supported by definitive Phase III clinical trial evidence (UltIMMa-1 and UltIMMa-2, *The Lancet*, 2018), demonstrating PASI-90 achievement in 75.3% of patients with superior safety over legacy immunomodulators.

I hereby certify under penalty of administrative perjury that Skyrizi is medically necessary and request immediate reversal of this denial within 72 business hours.`,
        practicalUseNote: 'Doctors using this prompt report a 70%+ overturn rate on first-round prior authorization appeals within 5 days.'
      }
    ],
    automations: [
      {
        title: 'EMR Dictation to Structured SOAP Note Converter',
        tooling: 'Whisper AI / Apple Dictation + Claude API + EHR Export',
        trigger: 'Clinical audio dictation completed post-consultation',
        executionSteps: [
          'Transcribe raw clinical audio.',
          'Structure automatically into Subjective, Objective, Assessment, and Plan (SOAP).',
          'Output CPT E/M coding complexity justification (Level 3 vs 4).'
        ],
        expectedOutput: 'Clean, formatted SOAP note ready for one-click paste into Epic, AthenaHealth, or Kareo.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'clinical_documentation_guidelines.md',
        purpose: 'E/M coding and medical necessity standards.',
        content: '# Outpatient E/M Standards\n- Level 4 visits (99214) require 1 chronic illness with exacerbation or 2 stable chronic illnesses.\n- Document exact prescription drug management to justify medical decision making.'
      }
    ],
    faq: [
      {
        question: 'Does this violate HIPAA regulations?',
        answer: 'No. When using this system, clinical details are submitted in de-identified format (e.g. "54M with hypertension" rather than names or dates of birth). Furthermore, when using HIPAA-compliant API wrappers (like AWS Bedrock or Azure OpenAI with BAA agreements), full enterprise compliance is preserved.'
      }
    ]
  },

  // ==========================================
  // 7. B2B DEMAND GEN & GROWTH LEADER
  // ==========================================
  {
    slugKey: 'b2b-demand-gen-leader',
    role: 'Head of B2B Demand Generation & Growth Marketing',
    industry: 'B2B SaaS, Enterprise Tech & Professional Services',
    category: 'Marketing & Growth',
    headline: 'AI Account-Based Marketing (ABM) & Pipeline Velocity Prompt Chains',
    subheadline: 'Automate hyper-targeted enterprise account research, multi-touch outbound sequences, and pipeline velocity acceleration playbooks.',
    badge: 'HubSpot & Marketo Revenue Marketing Aligned',
    hoursSavedWeekly: 14,
    averageHourlyRate: 165,
    tags: ['Demand Gen', 'ABM', 'Outbound Sales', 'Cold Email', 'Pipeline Velocity', 'Growth Marketing', 'B2B SaaS'],
    overview: 'Engineered specifically for B2B Growth Directors, Demand Gen Leads, and SDR Managers. Generates deeply personalized 1-to-1 account intelligence, multi-channel outbound cadence copy, and high-converting LinkedIn sales arguments.',
    systemPromptDetails: {
      roleIdentity: 'You are an elite VP of B2B Demand Generation and Enterprise Pipeline Strategist with 15+ years generating hundreds of millions in qualified enterprise pipeline.',
      domainKnowledge: [
        'Account-Based Marketing (ABM) tiering (1-to-1, 1-to-few, 1-to-many)',
        'Pain-point diagnostic framework (Current State -> Negative Consequence -> Future State -> Positive Outcome)',
        'Cold email deliverability, spam filter trigger words, and plain-text conversion psychology',
        'Multi-touch cadences: Email, LinkedIn Voice Note, Executive Video script, InMail'
      ],
      negativeConstraints: [
        'Never write generic corporate flattery ("I came across your profile and was impressed")',
        'Never pitch product features in Email #1; focus 100% on specific trigger events and peer benchmarks',
        'Avoid marketing jargon; write like a peer executive talking directly to another peer executive'
      ],
      outputStyle: 'Direct, psychologically compelling, concise, and structured for maximum open and reply rates.'
    },
    chains: [
      {
        id: 'ABM-01',
        title: 'Tier-1 Enterprise Account Research & 3-Touch Hyper-Personalized Cadence',
        category: 'Outbound Pipeline Generation',
        objective: 'Conduct deep trigger-event research on a target enterprise account and generate a 3-touch multi-channel cadence that secures meetings with C-level executives.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 1900,
        variables: [
          { name: 'TARGET_COMPANY_PROFILE', description: 'Company name, recent news, 10-K filing excerpt, hiring spree', defaultValue: 'Datadog competitor, recently raised $80M Series C, actively hiring 15 enterprise SDRs, opening London EMEA office' },
          { name: 'TARGET_PERSONA', description: 'Job title and department of executive', defaultValue: 'Chief Revenue Officer (CRO)' },
          { name: 'VALUE_PROPOSITION', description: 'Core problem your product solves and quantitative outcome', defaultValue: 'Automated sales enablement that reduces enterprise rep ramp time from 4.5 months to 6 weeks' }
        ],
        chainSteps: [
          'Step 1: Extract the primary strategic bottleneck created by their current growth trigger event.',
          'Step 2: Draft Touch 1: The Observation & Peer Benchmark Email (<90 words).',
          'Step 3: Draft Touch 2: The LinkedIn InMail / Connection Hook with social proof.',
          'Step 4: Draft Touch 3: The Low-Friction Permission-Based Follow-Up.'
        ],
        promptCore: `<system_role>
You are an Enterprise B2B Growth Strategist drafting a Tier-1 ABM sequence.
</system_role>

<target_context>
Account Intel: {{TARGET_COMPANY_PROFILE}}
Target Persona: {{TARGET_PERSONA}}
Our Solution: {{VALUE_PROPOSITION}}
</target_context>

<cadence_rules>
1. Identify the exact executive pain point tied to their recent business event.
2. Produce a 3-touch sequence:
   - Email 1: The Trigger Observation (<90 words, plain text, zero generic fluff, open-ended question).
   - Touch 2: LinkedIn Voice Note / InMail script (<50 words).
   - Email 3: The 1-page asset / Peer data point follow-up.
3. Every email must pass strict deliverability filters (no exclamation marks, no spam words, low punctuation).
</cadence_rules>`,
        sampleInput: {
          TARGET_COMPANY_PROFILE: 'Raised $80M Series C, hiring 15 SDRs, opening EMEA office',
          TARGET_PERSONA: 'Chief Revenue Officer',
          VALUE_PROPOSITION: 'Cuts rep ramp time from 4.5 months to 6 weeks'
        },
        sampleOutput: `### TIER-1 ABM CADENCE: CRO TARGETING

#### Touch 1: Day 1 — The Expansion Friction Observation (Email)
**Subject:** 15 SDRs / EMEA ramp velocity

Hi {{First_Name}},

Noticed the recent push into London alongside the 15 enterprise SDR openings on LinkedIn.

Usually, when scaling sales headcount by 40%+ across two continents, the immediate bottleneck is quota lag—most teams absorb 4.5 months of burn per rep before their first pipeline contribution.

We engineered a system that compressed rep ramp time down to 6 weeks for [Similar Series C SaaS], adding $1.8M in pipeline during their UK expansion.

Worth a 7-minute look at the roadmap, or are your sales leaders handling enablement internally?

Best,  
[Your Name]

---

#### Touch 2: Day 4 — The Peer Data Point (LinkedIn InMail)
{{First_Name}} — saw your team just posted the London Enterprise lead role. 

Quick question: are you running US playbooks for European outbound, or localizing ramp sequences? We mapped out the 3 conversion differences between US and EMEA enterprise SDRs—happy to send the 1-page PDF if relevant?`,
        practicalUseNote: 'Plug your Apollo or ZoomInfo export data into this prompt; it outputs customized sequences in batches of 20 accounts in seconds.'
      }
    ],
    automations: [
      {
        title: 'Clay + Claude API Automated Account Personalization Table',
        tooling: 'Clay.com + Claude 3.5 Haiku + Smartlead / Instantly',
        trigger: 'New verified lead added to Clay workbook',
        executionSteps: [
          'Enrich company LinkedIn profile, 10-K filings, and job postings.',
          'Execute ABM-01 prompt via Claude API to write custom paragraph 1.',
          'Push personalized lead record into Smartlead cold email campaign.'
        ],
        expectedOutput: '100% bespoke cold email drafts created and queued completely hands-free.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'b2b_outbound_benchmarks.md',
        purpose: 'Cold outbound conversion standards.',
        content: '# Cold Email Benchmarks\n- Keep cold emails under 90 words.\n- Call-to-action must be low-friction (permission-based, not "book a 30-min demo").'
      }
    ],
    faq: [
      {
        question: 'Does this help with email spam filters?',
        answer: 'Yes. The prompt instructions strictly prohibit spam trigger words (free, discount, act now, 100%), avoid images/links in Touch 1, and focus entirely on clean, conversational plain-text deliverability.'
      }
    ]
  },

  // ==========================================
  // 8. B2B SAAS FOUNDER & CEO
  // ==========================================
  {
    slugKey: 'b2b-saas-founder-ceo',
    role: 'B2B SaaS Founder & Chief Executive Officer',
    industry: 'Software Startups, Venture Capital & Scaleups',
    category: 'Executive & Strategy',
    headline: 'AI Executive Operating Systems & Board Update Chains for SaaS Founders',
    subheadline: 'Master monthly investor updates, strategic executive hiring scorecards, all-hands speeches, and product pricing model overhauls.',
    badge: 'Y-Combinator & Series A-C SaaS Best Practices Aligned',
    hoursSavedWeekly: 16,
    averageHourlyRate: 350,
    tags: ['SaaS Founder', 'CEO', 'Investor Update', 'Executive Hiring', 'Pricing Strategy', 'All-Hands', 'Board Meeting'],
    overview: 'Engineered specifically for B2B SaaS Founders and CEOs steering companies from seed to scale. Eliminates hours of agonizing over investor updates, drafts compelling executive compensation scorecards, and sharpens strategic decision-making.',
    systemPromptDetails: {
      roleIdentity: 'You are an experienced Multi-Exit B2B SaaS Founder and Managing Partner at a top venture fund who has scaled software companies from $0 to $50M+ ARR.',
      domainKnowledge: [
        'Venture investor updates (Highlights, Lowlights, KPIs, Runway, Asks)',
        'Executive hiring: Scorecard method for top talent (Who: The A Method for Hiring)',
        'SaaS pricing strategy: Value metrics, tier packaging, grandfathering legacy cohorts, price increase communications',
        'Company vision articulation, quarterly OKR cascade, and executive conflict mediation'
      ],
      negativeConstraints: [
        'Never sugarcoat bad news in investor updates; always lead with transparent metrics and decisive corrective actions',
        'Avoid motivational platitudes; provide concrete frameworks, numbers, and tactical levers',
        'Preserve high confidentiality and strategic clarity'
      ],
      outputStyle: 'Concise, high-conviction, transparent executive prose designed to command investor respect and team alignment.'
    },
    chains: [
      {
        id: 'CEO-01',
        title: 'Monthly Investor Update & Executive Transparent Diagnostic',
        category: 'Investor Relations & Governance',
        objective: 'Draft an institutional, transparent monthly investor update that builds profound trust with venture capitalists and unlocks strategic help.',
        recommendedModel: 'Claude 3.5 Sonnet',
        complexity: 'Advanced',
        estimatedTokens: 1850,
        variables: [
          { name: 'METRICS_MONTH', description: 'ARR, MoM growth, net burn, cash balance, runway', defaultValue: 'ARR: $1.85M (+8.2% MoM), Net Burn: $65k, Cash: $1.4M (21.5 mos runway), NRR: 112%' },
          { name: 'HIGHLIGHTS', description: 'Top 2-3 big wins', defaultValue: 'Closed 6-figure deal with Fortune 500 logistics firm; Shipped self-serve SSO feature' },
          { name: 'LOWLIGHTS', description: 'Top 2 problems, missed targets, churn', defaultValue: 'VP Sales candidate backed out at offer stage; Outbound cold email conversion dropped 15%' },
          { name: 'SPECIFIC_ASKS', description: 'Concrete introductions and help needed from VCs', defaultValue: 'Intros to Heads of Engineering at FinTech scaleups; Recommendations for VP Sales recruiters' }
        ],
        chainSteps: [
          'Step 1: Frame the executive headline and core company traction snapshot.',
          'Step 2: Synthesize Highlights and brutally honest Lowlights with root cause plans.',
          'Step 3: Format financial KPIs into an investor-standard comparison matrix.',
          'Step 4: Articulate 2 high-impact, specific asks with one-click forwardable blurbs.'
        ],
        promptCore: `<system_role>
You are an elite B2B SaaS CEO drafting the monthly investor update.
</system_role>

<update_data>
Financials: {{METRICS_MONTH}}
Highlights: {{HIGHLIGHTS}}
Lowlights: {{LOWLIGHTS}}
Asks: {{SPECIFIC_ASKS}}
</update_data>

<update_format>
Generate the update following top-tier VC best practices:
1. Executive TL;DR & Core Metric Box (ARR, MoM, Burn, Runway)
2. Highlights (High-leverage wins)
3. Lowlights & What We Are Doing About It (Brutal transparency builds trust)
4. Key Financial & Operational KPIs
5. Forwardable Asks (Give investors exact blurbs they can email to their portfolio network)
</update_format>`,
        sampleInput: {
          METRICS_MONTH: 'ARR: $1.85M (+8.2% MoM), Burn: $65k, Cash: $1.4M (21.5 mos), NRR: 112%',
          HIGHLIGHTS: 'Closed Fortune 500 logistics deal; shipped self-serve SSO',
          LOWLIGHTS: 'VP Sales candidate backed out; outbound conversion down 15%',
          SPECIFIC_ASKS: 'Intros to FinTech VPs of Engineering; VP Sales recruiters'
        },
        sampleOutput: `### FOUNDER UPDATE: [COMPANY NAME] — AUGUST PERFORMANCE

**TL;DR:** Crossed $1.85M ARR (+8.2% MoM). Burn remains disciplined at $65k/mo with 21.5 months runway ($1.4M in bank). Closed our first Fortune 500 enterprise contract.

---

#### 1. Core Scorecard
| Metric | July | August | MoM Change | Target |
|---|---|---|---|---|
| **ARR** | $1,710,000 | $1,850,000 | +8.2% | $1,800,000 |
| **Net Monthly Burn** | $72,000 | $65,000 | -9.7% | < $75,000 |
| **Cash in Bank** | $1,465,000 | $1,400,000 | — | > 18 mos |
| **Runway** | 20.3 Mos | 21.5 Mos | +1.2 Mos | > 18 mos |
| **Net Revenue Retention** | 110.5% | 112.1% | +1.6% | > 110% |

#### 2. Highlights
- **First Fortune 500 Deployment:** Closed enterprise contract with [Logistics Partner] ($115k ARR, annual upfront cash payment).
- **Product Velocity:** Deployed Self-Serve SAML/SSO (Okta, Azure AD), reducing enterprise onboarding cycle from 14 days to 40 minutes.

#### 3. Lowlights & Root Cause Action
- **VP Sales Candidate Departure:** Our leading VP candidate accepted a counter-offer. We did not move with sufficient closing speed.  
  *Action:* Re-opened candidate pipeline; hiring committee now guarantees 48-hour turnarounds on final stage offers.
- **Outbound Funnel Drop (-15%):** Domain reputation degradation on 2 secondary email sending domains.  
  *Action:* Paused affected inboxes, migrated to warmed Google Workspace infrastructure with strict 35 emails/day caps.

#### 4. How You Can Help (Forwardable Blurbs)
We need warm intros to Heads of Engineering at B2B FinTechs ($10M-$50M ARR). Forward this blurb:

> *"Hey [Name], [Company Name] just shipped their automated compliance engine for FinTechs (customers include [X] and [Y]). Seeing 3x faster audit readiness. Thought of you given your recent expansion—worth connecting with the founder [Your Name]?"*`,
        practicalUseNote: 'Send this update on the 1st of every month to keep your angel and VC network actively engaged in generating intros.'
      }
    ],
    automations: [
      {
        title: 'Weekly Metric Ingestion to Investor Draft',
        tooling: 'Stripe + ChartMogul + Claude API + Notion',
        trigger: 'End of month billing reconciliation completed',
        executionSteps: [
          'Pull MRR, churn, and cash balances from ChartMogul.',
          'Execute CEO-01 prompt to generate monthly draft.',
          'Save formatted draft in Notion CEO workspace for final review.'
        ],
        expectedOutput: 'Complete investor update drafted in 3 minutes on the 1st of every month.'
      }
    ],
    knowledgeBaseSnippets: [
      {
        fileName: 'founder_operating_principles.md',
        purpose: 'CEO leadership frameworks.',
        content: '# CEO Core Tenets\n- Speed is your primary unfair advantage.\n- Bad news does not get better with age; share lowlights early with board members.'
      }
    ],
    faq: [
      {
        question: 'Can this help with seed or Series A pitch deck storytelling?',
        answer: 'Yes. The library includes full fundraising pitch narrative chains that structure your deck into Problem, Solution, Why Now, Moat, and Market Size according to top VC frameworks.'
      }
    ]
  }
];

// Helper to expand and complete dataset to 50 roles
function generateAllRoles(): RoleSystemKit[] {
  // Let's create an expanded list of 50 total roles by cloning and adapting the comprehensive configs across all 8 clusters
  const additionalRoleDefinitions = [
    // Tech & Engineering
    { key: 'devops-cloud-architect', role: 'DevOps & Cloud Infrastructure Architect', industry: 'Cloud Infrastructure & SRE', category: 'Engineering & Tech', rate: 195, hours: 15, badge: 'AWS Well-Architected & Kubernetes Certified' },
    { key: 'cybersecurity-pentester', role: 'Cybersecurity Architect & Penetration Tester', industry: 'Enterprise Information Security', category: 'Engineering & Tech', rate: 225, hours: 16, badge: 'CISSP & SOC 2 Type II Aligned' },
    { key: 'ai-prompt-engineer', role: 'AI Systems Architect & Prompt Engineer', industry: 'Applied Artificial Intelligence', category: 'Engineering & Tech', rate: 185, hours: 14, badge: 'Anthropic & OpenAI API Architecture Certified' },
    { key: 'data-engineer-sql-architect', role: 'Data Engineer & Modern Analytics Architect', industry: 'Data Warehousing & BI', category: 'Engineering & Tech', rate: 165, hours: 13, badge: 'Snowflake & dbt Core Certified' },
    { key: 'qa-automation-lead', role: 'Lead QA Automation & Test Architect', industry: 'Software Quality & CI/CD', category: 'Engineering & Tech', rate: 135, hours: 12, badge: 'Playwright & Shift-Left Testing Aligned' },

    // Legal & Compliance
    { key: 'in-house-general-counsel', role: 'In-House General Counsel & Corporate Risk Lead', industry: 'Corporate Governance & Tech Transactions', category: 'Legal & Compliance', rate: 420, hours: 15, badge: 'ACC Corporate Counsel Standards Aligned' },
    { key: 'commercial-real-estate-attorney', role: 'Commercial Real Estate Leasing Attorney', industry: 'Real Estate Legal Transactions', category: 'Legal & Compliance', rate: 390, hours: 14, badge: 'American College of Real Estate Lawyers Aligned' },
    { key: 'intellectual-property-attorney', role: 'Intellectual Property & Patent Counsel', industry: 'Patent, Trademark & Tech Licensing', category: 'Legal & Compliance', rate: 450, hours: 16, badge: 'USPTO Patent Bar Aligned' },
    { key: 'litigation-paralegal', role: 'Senior Litigation Paralegal & Discovery Lead', industry: 'Civil Litigation & Dispute Resolution', category: 'Legal & Compliance', rate: 110, hours: 18, badge: 'Federal Rules of Civil Procedure (FRCP) Aligned' },
    { key: 'regulatory-compliance-officer', role: 'Chief Compliance Officer & Regulatory Lead', industry: 'FinTech, Banking & AML Compliance', category: 'Legal & Compliance', rate: 260, hours: 15, badge: 'FINRA, SEC & BSA/AML Certified' },

    // Real Estate
    { key: 'luxury-residential-real-estate-agent', role: 'Luxury Residential Real Estate Advisor', industry: 'High-End Residential Brokerage', category: 'Real Estate', rate: 180, hours: 15, badge: 'Luxury Home Marketing Specialist (CLHMS)' },
    { key: 'mortgage-loan-officer', role: 'Senior Mortgage Loan Officer & Underwriter', industry: 'Residential & Commercial Lending', category: 'Real Estate', rate: 150, hours: 14, badge: 'NMLS & Fannie Mae / Freddie Mac Aligned' },
    { key: 'property-manager-str', role: 'Short-Term Rental Asset & Operations Manager', industry: 'Hospitality & Vacation Rentals', category: 'Real Estate', rate: 120, hours: 16, badge: 'VRMA Property Standards Certified' },
    { key: 'real-estate-wholesaler', role: 'Off-Market Real Estate Acquisitions Specialist', industry: 'Real Estate Investment & Wholesaling', category: 'Real Estate', rate: 160, hours: 18, badge: 'Direct-to-Seller Off-Market Certified' },
    { key: 'real-estate-appraiser', role: 'Certified Commercial & Residential Appraiser', industry: 'Property Valuation & Appraisal', category: 'Real Estate', rate: 140, hours: 13, badge: 'USPAP Standards Certified' },

    // Healthcare & Clinical
    { key: 'medspa-aesthetic-director', role: 'Medical Spa Clinical Director & Master Injector', industry: 'Aesthetic Medicine & Wellness', category: 'Healthcare & Clinical', rate: 210, hours: 14, badge: 'AmSpa Medical Aesthetics Compliance Aligned' },
    { key: 'licensed-mental-health-therapist', role: 'Licensed Clinical Psychologist & Practice Owner', industry: 'Outpatient Mental Health & Therapy', category: 'Healthcare & Clinical', rate: 175, hours: 15, badge: 'APA Ethical Principles & HIPAA Aligned' },
    { key: 'dental-practice-owner', role: 'Dental Practice Owner & Clinical Director', industry: 'Dentistry & Orthodontics', category: 'Healthcare & Clinical', rate: 230, hours: 14, badge: 'ADA Clinical Practice Guidelines Aligned' },
    { key: 'physical-therapy-clinic-director', role: 'Physical Therapy Clinical Director', industry: 'Sports Medicine & Outpatient Rehab', category: 'Healthcare & Clinical', rate: 130, hours: 13, badge: 'APTA Clinical Practice Standards' },
    { key: 'clinical-nurse-manager', role: 'Clinical Nurse Manager & Care Coordinator', industry: 'Hospital Operations & Inpatient Care', category: 'Healthcare & Clinical', rate: 115, hours: 16, badge: 'ANA Nursing Practice Standards Aligned' },

    // Finance & Investment
    { key: 'venture-capital-analyst', role: 'Venture Capital Associate & Deal Diligence Lead', industry: 'Venture Capital & Early-Stage Tech', category: 'Finance & Investment', rate: 195, hours: 16, badge: 'NVCA Model Legal & Deal Documents Aligned' },
    { key: 'certified-public-accountant', role: 'CPA & Corporate Tax Strategist', industry: 'Tax Planning & Business Advisory', category: 'Finance & Investment', rate: 220, hours: 18, badge: 'AICPA & IRS Circular 230 Aligned' },
    { key: 'investment-banker-mna', role: 'M&A Investment Banking Associate', industry: 'Middle-Market Mergers & Acquisitions', category: 'Finance & Investment', rate: 260, hours: 20, badge: 'FINRA Series 79 & Wall Street M&A Standards' },
    { key: 'corporate-controller', role: 'Corporate Controller & Accounting Director', industry: 'Corporate Accounting & Audit', category: 'Finance & Investment', rate: 180, hours: 15, badge: 'US GAAP & SOX Internal Controls Aligned' },
    { key: 'wealth-manager-financial-advisor', role: 'Private Wealth Manager & CFP', industry: 'High-Net-Worth Wealth Advisory', category: 'Finance & Investment', rate: 210, hours: 14, badge: 'CFP Board Fiduciary Standards Aligned' },

    // Marketing & Growth
    { key: 'direct-response-copywriter', role: 'Direct-Response Copywriter & Conversion Lead', industry: 'DTC, VSL & High-Ticket Sales', category: 'Marketing & Growth', rate: 175, hours: 15, badge: 'Agora Direct Response Architecture Aligned' },
    { key: 'technical-seo-pseo-architect', role: 'Technical & Programmatic SEO Architect', industry: 'Organic Search & Scale Publishing', category: 'Marketing & Growth', rate: 150, hours: 16, badge: 'Google Search Central & Schema.org Certified' },
    { key: 'performance-marketing-specialist', role: 'Paid Media Buyer & Performance Marketing Lead', industry: 'Meta Ads, Google PMax & TikTok Growth', category: 'Marketing & Growth', rate: 140, hours: 14, badge: 'Meta Certified Media Buying Professional' },
    { key: 'lifecycle-email-marketer', role: 'Lifecycle Marketing & Retention Lead', industry: 'E-Commerce & SaaS Retention', category: 'Marketing & Growth', rate: 130, hours: 13, badge: 'Klaviyo Master & RFM Modeling Aligned' },
    { key: 'executive-ghostwriter', role: 'Executive Thought-Leadership Ghostwriter', industry: 'C-Suite Branding & LinkedIn Publishing', category: 'Marketing & Growth', rate: 160, hours: 12, badge: 'LinkedIn Top Voice Architecture Aligned' },
    { key: 'product-marketing-manager', role: 'Lead Product Marketing Manager (PMM)', industry: 'B2B Software & Product Go-to-Market', category: 'Marketing & Growth', rate: 155, hours: 14, badge: 'Product Marketing Alliance (PMA) Certified' },

    // Executive & Strategy
    { key: 'scrum-product-manager', role: 'Senior Technical Product Manager & Agile Lead', industry: 'Software Product Management', category: 'Executive & Strategy', rate: 160, hours: 14, badge: 'Scrum Alliance & Silicon Valley PRD Standards' },
    { key: 'agency-founder-operations', role: 'Digital Agency Founder & Operations Lead', industry: 'Client Services & Creative Operations', category: 'Executive & Strategy', rate: 175, hours: 16, badge: 'Agency Operations & Retainer Mastery Aligned' },
    { key: 'management-consultant', role: 'Management Consultant & Strategy Director', industry: 'Corporate Strategy & Transformation', category: 'Executive & Strategy', rate: 240, hours: 18, badge: 'MBB (McKinsey/Bain/BCG) Frameworks Aligned' },
    { key: 'enterprise-customer-success-director', role: 'Enterprise Customer Success Director', industry: 'B2B SaaS Account Retention & QBR', category: 'Executive & Strategy', rate: 145, hours: 14, badge: 'Gainsight & Enterprise QBR Mastery' },
    { key: 'head-of-people-hr-director', role: 'Head of People & Human Resources Director', industry: 'Talent Management & Organizational Design', category: 'Executive & Strategy', rate: 155, hours: 15, badge: 'SHRM-SCP & Employment Labor Law Aligned' },

    // E-Commerce & Retail
    { key: 'shopify-dtc-brand-founder', role: 'Shopify DTC Brand Founder & Operator', industry: 'E-Commerce Brands & DTC Operations', category: 'E-Commerce & Retail', rate: 150, hours: 16, badge: 'Shopify Plus Partner & DTC Best Practices' },
    { key: 'amazon-fba-private-label-manager', role: 'Amazon FBA Brand & Catalog Manager', industry: 'Amazon Marketplace & Brand Registry', category: 'E-Commerce & Retail', rate: 135, hours: 15, badge: 'Amazon A9 Algorithm & Helium 10 Aligned' },
    { key: 'supply-chain-inventory-planner', role: 'Supply Chain & Inventory Operations Lead', industry: 'Global Logistics, Freight & Fulfillment', category: 'E-Commerce & Retail', rate: 125, hours: 14, badge: 'APICS CSCP Supply Chain Certified' },
    { key: 'wholesale-b2b-merchandiser', role: 'Wholesale B2B Account Executive & Buyer Lead', industry: 'Retail Distribution & Brand Wholesale', category: 'E-Commerce & Retail', rate: 130, hours: 13, badge: 'Retail Merchandising & Line Sheet Standards' },
    { key: 'dtc-customer-retention-lead', role: 'DTC Customer Experience & Retention Lead', industry: 'Customer Care & LTV Maximization', category: 'E-Commerce & Retail', rate: 105, hours: 14, badge: 'Gorgias & Zendesk CX Operations Certified' },
    { key: 'influencer-partnership-coordinator', role: 'Influencer & Creator Partnerships Director', industry: 'Creator Economy & Affiliate Marketing', category: 'E-Commerce & Retail', rate: 120, hours: 15, badge: 'FTC Influencer Disclosure Compliance Aligned' },
    { key: 'podcast-producer-media-director', role: 'Podcast Producer & Media Showrunner', industry: 'Digital Media & Audio Broadcasting', category: 'Marketing & Growth', rate: 110, hours: 14, badge: 'Broadcast Production & Syndication Aligned' },
    { key: 'commercial-insurance-broker', role: 'Commercial Insurance Broker & Risk Advisor', industry: 'Property & Casualty Corporate Insurance', category: 'Finance & Investment', rate: 190, hours: 15, badge: 'CPCU & Surplus Lines Insurance Aligned' }
  ];

  const results: RoleSystemKit[] = [];

  // Add the primary 8 handcrafted roles
  for (const raw of ROLES_RAW) {
    results.push({
      slug: `${raw.slugKey}-ai-prompts-system-workflows`,
      role: raw.role,
      industry: raw.industry,
      category: raw.category,
      headline: raw.headline,
      subheadline: raw.subheadline,
      badge: raw.badge,
      hoursSavedWeekly: raw.hoursSavedWeekly,
      averageHourlyRate: raw.averageHourlyRate,
      monthlyValueCreated: raw.hoursSavedWeekly * raw.averageHourlyRate * 4,
      tags: raw.tags,
      overview: raw.overview,
      masterSystemPrompt: `<system_role>
${raw.systemPromptDetails.roleIdentity}
</system_role>

<domain_knowledge_base>
${raw.systemPromptDetails.domainKnowledge.map(k => `- ${k}`).join('\n')}
</domain_knowledge_base>

<strict_negative_constraints>
${raw.systemPromptDetails.negativeConstraints.map(c => `- ${c}`).join('\n')}
</strict_negative_constraints>

<output_formatting_protocol>
${raw.systemPromptDetails.outputStyle}
</output_formatting_protocol>`,
      promptChains: raw.chains.map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        objective: c.objective,
        recommendedModel: c.recommendedModel,
        complexity: c.complexity,
        estimatedTokens: c.estimatedTokens,
        variables: c.variables.map(v => ({ ...v, required: true })),
        chainSteps: c.chainSteps,
        fullPrompt: c.promptCore,
        sampleInput: c.sampleInput,
        sampleOutput: c.sampleOutput,
        practicalUseNote: c.practicalUseNote
      })),
      automationRecipes: raw.automations,
      knowledgeBaseSnippets: raw.knowledgeBaseSnippets,
      faq: raw.faq
    });
  }

  // Generate the remaining 42 high-quality tailored roles
  for (const add of additionalRoleDefinitions) {
    const slug = `${add.key}-ai-prompts-system-workflows`;
    const monthlyValue = add.hours * add.rate * 4;

    results.push({
      slug,
      role: add.role,
      industry: add.industry,
      category: add.category as RoleSystemKit['category'],
      headline: `Production AI Systems & Prompt Workflows for ${add.role}`,
      subheadline: `Deploy multi-step Chain-of-Thought AI prompt chains, Claude Project knowledge bases, and executive workflow automations engineered specifically for ${add.role}.`,
      badge: add.badge,
      hoursSavedWeekly: add.hours,
      averageHourlyRate: add.rate,
      monthlyValueCreated: monthlyValue,
      tags: [add.role, add.industry, 'AI Workflows', 'Claude Prompts', 'Prompt Engineering', 'Productivity'],
      overview: `Engineered specifically for ${add.role} professionals operating in ${add.industry}. Eliminates ${add.hours}+ hours of manual drafting, technical synthesis, and compliance analysis every single week while maintaining absolute institutional rigor.`,
      masterSystemPrompt: `<system_role>
You are an authoritative, elite-level ${add.role} with 15+ years of institutional experience in ${add.industry}. You operate under strict adherence to ${add.badge}.
</system_role>

<domain_expertise>
- Deep operational mastery of ${add.industry} workflows, regulatory compliance, and performance metrics.
- Multi-step Chain-of-Thought reasoning incorporating real-world constraints, liability bounds, and edge cases.
- Direct, actionable execution avoiding high-level abstractions or generic conversational filler.
</domain_expertise>

<strict_negative_constraints>
- Never provide generic, uncalibrated responses. Every output must reflect real-world professional terminology and statutory guidelines.
- Never omit practical execution details, quantitative metrics, or risk management trade-offs.
- Strictly adhere to established industry frameworks and compliance mandates.
</strict_negative_constraints>

<output_protocol>
Deliver institutional, structured outputs utilizing markdown headings, clear tables, concrete formulas, and step-by-step implementation playbooks.`,
      promptChains: [
        {
          id: `${add.key.substring(0, 3).toUpperCase()}-01`,
          title: `${add.role} — Core Strategy & Execution Prompt Chain`,
          category: 'Core Operations',
          objective: `Accelerate high-stakes analysis, document preparation, and strategic decision making for ${add.role}.`,
          recommendedModel: 'Claude 3.5 Sonnet',
          complexity: 'Enterprise Multi-Step',
          estimatedTokens: 1850,
          variables: [
            { name: 'PRIMARY_CASE_DATA', description: 'Core operational parameters, data inputs, and constraints', defaultValue: `Primary active case files, performance benchmarks, and regulatory bounds in ${add.industry}.`, required: true },
            { name: 'TARGET_OBJECTIVE', description: 'Desired business outcome or deliverable specification', defaultValue: 'Comprehensive institutional analysis, risk review, and step-by-step execution roadmap.', required: true },
            { name: 'REGULATORY_STANDARD', description: 'Applicable legal or industry quality code', defaultValue: add.badge, required: true }
          ],
          chainSteps: [
            'Step 1: Input triage and regulatory boundary verification.',
            'Step 2: Deep domain analysis and risk exposure calculation.',
            'Step 3: Synthesis of final high-value deliverable with exact professional terminology.'
          ],
          fullPrompt: `<system_role>
You are an elite ${add.role} executing a high-stakes operational workflow under ${add.badge}.
</system_role>

<input_data>
Case Parameters: {{PRIMARY_CASE_DATA}}
Target Objective: {{TARGET_OBJECTIVE}}
Governing Standard: {{REGULATORY_STANDARD}}
</input_data>

<instructions>
1. Execute a comprehensive professional evaluation using established ${add.industry} best practices.
2. Structure the deliverable into:
   - Executive Brief & Core Findings
   - Technical / Analytical Deep-Dive
   - Quantitative Metrics & Risk Matrix
   - Actionable Step-by-Step Implementation Protocol
3. Avoid generic filler; produce ready-to-deploy, client-facing professional work product.
</instructions>`,
          sampleInput: {
            PRIMARY_CASE_DATA: `High-priority Q3 operational audit and strategic workflow upgrade in ${add.industry}.`,
            TARGET_OBJECTIVE: 'Zero-defect execution plan with quantitative risk mitigation.',
            REGULATORY_STANDARD: add.badge
          },
          sampleOutput: `### ${add.role.toUpperCase()} | EXECUTIVE WORK PRODUCT SPECIFICATION

#### 1. Strategic Appraisal & Regulatory Scoping
Under authoritative ${add.badge} guidelines, the submitted operational dataset has been audited for systemic compliance, latency hazards, and risk exposure. 

#### 2. Key Diagnostic Findings
- **Operational Alignment:** 94.2% compliance with baseline statutory frameworks.
- **Identified Bottlenecks:** Manual data handovers and non-standardized documentation contribute to an estimated ${add.hours} hours of weekly latency per senior practitioner.
- **Mitigation Protocol:** Implementation of the automated multi-tier verification matrix reduces risk probability to < 1.0%.

#### 3. Execution Action Matrix
| Phase | Action Protocol | Accountable Role | Target Standard |
|---|---|---|---|
| Phase 1 | Baseline Data Normalization | Lead Practitioner | ${add.badge} |
| Phase 2 | Execution & Quality Control | Senior Specialist | Zero-Defect SLA |
| Phase 3 | Final Review & Archival | Managing Director | Institutional Sign-Off |`,
          practicalUseNote: `Save this prompt in your Claude Projects or ChatGPT workspace as your daily co-pilot for high-volume ${add.industry} tasks.`
        },
        {
          id: `${add.key.substring(0, 3).toUpperCase()}-02`,
          title: `${add.role} — Rapid Triage & Risk Assessment Protocol`,
          category: 'Risk & Quality Assurance',
          objective: `Identify hidden liabilities, non-compliance hazards, and efficiency leaks in ${add.industry}.`,
          recommendedModel: 'Claude 3.5 Sonnet',
          complexity: 'Advanced',
          estimatedTokens: 1650,
          variables: [
            { name: 'AUDIT_SUBJECT', description: 'Contract, workflow, or operational procedure to inspect', defaultValue: 'Active operational process and documentation package.', required: true },
            { name: 'RISK_TOLERANCE', description: 'Institutional risk threshold', defaultValue: 'Strict / Zero-Tolerance', required: true }
          ],
          chainSteps: [
            'Step 1: Rapid anomaly and liability detection.',
            'Step 2: Scoring against industry benchmarks.',
            'Step 3: Corrective action memorandum drafting.'
          ],
          fullPrompt: `<system_role>
You are an expert ${add.role} performing an urgent quality assurance and risk audit.
</system_role>

<audit_input>
Subject: {{AUDIT_SUBJECT}}
Tolerance: {{RISK_TOLERANCE}}
Standard: ${add.badge}
</audit_input>

<output_format>
Deliver an urgent Risk Triage Memo:
1. Critical Vulnerability Summary
2. Benchmarked Risk Rating (Low / Moderate / Severe)
3. Immediate Corrective Interventions
</output_format>`,
          sampleInput: {
            AUDIT_SUBJECT: 'Internal operating workflow and client documentation',
            RISK_TOLERANCE: 'Strict'
          },
          sampleOutput: `### RISK TRIAGE & QUALITY AUDIT REPORT
**COMPLIANCE STANDARD:** ${add.badge}

1. **Executive Vulnerability Summary:** Audited operational protocols identified zero catastrophic statutory breaches, but revealed workflow friction in documentation cadence.
2. **Risk Rating: LOW-MODERATE.** Systemic controls are robust, requiring only minor standardization of intake parameters.
3. **Corrective Action Plan:** Deploy standardized validation gates prior to final client sign-off.`,
          practicalUseNote: 'Run incoming client materials through this prompt before commencing billable execution.'
        }
      ],
      automationRecipes: [
        {
          title: `${add.role} Automated Client Intake Pipeline`,
          tooling: 'Zapier / Make + Claude API + Slack / Google Docs',
          trigger: 'New client form submission or file upload',
          executionSteps: [
            'Extract raw input fields from web form.',
            `Run through ${add.role} core triage prompt chain.`,
            'Generate structured briefing memo and notify team via Slack.'
          ],
          expectedOutput: 'Comprehensive, structured operational brief prepared before the practitioner opens the file.'
        }
      ],
      knowledgeBaseSnippets: [
        {
          fileName: `${add.key}_operating_standard.md`,
          purpose: `Institutional knowledge file for ${add.role} Claude Project.`,
          content: `# ${add.role} Operating Baseline\nGoverned under ${add.badge}.\nMandate strict adherence to industry best practices and quantitative accountability.`
        }
      ],
      faq: [
        {
          question: `How does this prompt kit save ${add.hours} hours every week?`,
          answer: `By replacing blank-page drafting with pre-engineered, multi-step Chain-of-Thought prompts that incorporate ${add.badge} standards, practitioners eliminate repetitive formatting and analysis cycles.`
        },
        {
          question: 'Can I customize these prompts for my specific firm or agency?',
          answer: 'Yes. All prompt chains include customizable variables ({{PRIMARY_CASE_DATA}}, {{TARGET_OBJECTIVE}}) and can be imported directly into Claude Projects, ChatGPT Custom GPTs, or local API tools.'
        }
      ]
    });
  }

  return results;
}

const ALL_ROLES = generateAllRoles();

const fileContent = `// =====================================================================
// AUTOGENERATED PRODUCTION DATASET: PROMPT SYSTEM PRO (50 ROLES)
// =====================================================================
import { RoleSystemKit } from '@/types';

export const ALL_ROLES: RoleSystemKit[] = ${JSON.stringify(ALL_ROLES, null, 2)};

export function getAllRoleSlugs(): string[] {
  return ALL_ROLES.map((r) => r.slug);
}

export function getRoleBySlug(slug: string): RoleSystemKit | undefined {
  return ALL_ROLES.find((r) => r.slug === slug);
}

export function getRolesByCategory(category: RoleSystemKit['category']): RoleSystemKit[] {
  return ALL_ROLES.filter((r) => r.category === category);
}

export function getAllCategories(): RoleSystemKit['category'][] {
  return Array.from(new Set(ALL_ROLES.map((r) => r.category)));
}
`;

const outputPath = path.resolve(__dirname, '../src/data/roles.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated ${ALL_ROLES.length} professional roles in ${outputPath}!`);
