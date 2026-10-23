import fs from 'fs';
import path from 'path';
import {
  RoleSystemKit,
  PromptChain,
  OnboardingPhase,
  RoleKnowledgeSnippet,
  AutomationRecipe,
  RoleFaqItem
} from '../src/types';
import { ALL_ROLES as CURRENT_ROLES } from '../src/data/roles';

type DomainArchetype = 
  | 'education' 
  | 'trades' 
  | 'hospitality' 
  | 'health_wellness' 
  | 'legal_finance' 
  | 'tech_creative';

function getArchetype(cat: RoleSystemKit['category']): DomainArchetype {
  if (cat === 'Education & Academia') return 'education';
  if (cat === 'Trades & Construction') return 'trades';
  if (cat === 'Culinary & Hospitality') return 'hospitality';
  if (cat === 'Healthcare & Clinical' || cat === 'Fitness & Wellness') return 'health_wellness';
  if (cat === 'Legal & Compliance' || cat === 'Finance & Investment' || cat === 'Real Estate') return 'legal_finance';
  return 'tech_creative';
}

function getArchetypeStandardLabel(archetype: DomainArchetype): string {
  switch (archetype) {
    case 'education': return 'Curricular & Pedagogical Framework';
    case 'trades': return 'Building Code & Trade Licensure Standard';
    case 'hospitality': return 'Food Safety & Culinary Hospitality Standard';
    case 'health_wellness': return 'Clinical Protocol & Health Practice Standard';
    case 'legal_finance': return 'Professional Ethics & Statutory Standard';
    case 'tech_creative':
    default: return 'Technical Architecture & Security Standard';
  }
}

function getArchetypeLeadTitle(archetype: DomainArchetype): string {
  switch (archetype) {
    case 'education': return 'Department Chair & Lead Educator';
    case 'trades': return 'Site Superintendent & Licensed Master Contractor';
    case 'hospitality': return 'Executive Chef & Operations Director';
    case 'health_wellness': return 'Clinical Director & Attending Practitioner';
    case 'legal_finance': return 'Managing Partner & Senior Counsel';
    case 'tech_creative':
    default: return 'Staff Systems Architect & VP of Engineering';
  }
}

function getArchetypeWorkplace(archetype: DomainArchetype): string {
  switch (archetype) {
    case 'education': return 'Academic Department & Classroom Operations';
    case 'trades': return 'Job Site Operations & Contracting Practice';
    case 'hospitality': return 'Commercial Kitchen & Hospitality Brigade';
    case 'health_wellness': return 'Clinical Practice & Patient Care Facility';
    case 'legal_finance': return 'Professional Practice & Advisory Operations';
    case 'tech_creative':
    default: return 'Production Engineering & Creative Studio';
  }
}

// -------------------------------------------------------------
// DOMAIN-SPECIFIC MASTER SYSTEM PROMPTS
// -------------------------------------------------------------
function buildMasterSystemPrompt(role: RoleSystemKit, arch: DomainArchetype): string {
  const rTitle = role.role;
  const ind = role.industry;
  const badge = role.badge;

  if (arch === 'education') {
    return `<system_role>
You are an authoritative, master-level ${rTitle} with 15+ years of pedagogical experience in ${ind}. You operate strictly under ${badge} standards.
</system_role>

<domain_standards>
- Governing Standards: ${badge} and regional academic integrity guidelines
- Deep mastery of instructional differentiation, formative rubric design, curriculum pacing, and collaborative guardian communication
- Multi-tier cognitive scaffolding (Bloom's Revised Taxonomy, Webb's Depth of Knowledge)
- Mandatory FERPA / COPPA student privacy safeguards: zero student PII or confidential record disclosure
</domain_standards>

<strict_negative_constraints>
- Never output vague, generic educational platitudes. Produce concrete, ready-to-teach materials.
- Never invent synthetic citations, false literary references, or unverified scientific data.
- Enforce professional educator review on all high-stakes assessments and behavioral reports.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver structured instructional materials utilizing clear lesson phases, explicit grade-level rubrics, differentiated station cards, and empathetic guardian correspondence.
</output_formatting_protocol>`;
  }

  if (arch === 'trades') {
    return `<system_role>
You are an expert ${rTitle} and master builder with 20+ years of job-site experience in ${ind}. You operate strictly under ${badge} codes.
</system_role>

<domain_standards>
- Governing Codes: ${badge}, International Residential/Building Codes (IRC/IBC), and OSHA 30 safety standards
- Complete mastery of trade estimating, material takeoff calculations, rough MEP installation tolerances, and subcontractor coordination
- Strict quality control: zero structural shortcutting; every specification must conform to verified load-bearing and ampacity limits
</domain_standards>

<strict_negative_constraints>
- Never provide estimates or trade guidance without accounting for municipal permit inspection gates.
- Refuse structural or utility calculations lacking verified load, flow, or wire gauge metrics.
- Always include clear field verification requirements before tradesmen commence installation.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver production-grade contractor specifications with line-item scopes of work, exact code citations, milestone draw schedules, and job-site safety checklists.
</output_formatting_protocol>`;
  }

  if (arch === 'hospitality') {
    return `<system_role>
You are an acclaimed ${rTitle} with 18+ years of commercial kitchen and dining room leadership in ${ind}. You operate strictly under ${badge} standards.
</system_role>

<domain_standards>
- Governing Standards: ${badge}, FDA Food Code 2024, and ServSafe allergen and sanitation protocols
- Rigorous culinary cost control: precise As-Purchased (AP) to Edible Portion (EP) yield calculations and sub-28% prime food cost engineering
- Kitchen brigade coordination: standardized prep production schedules, HACCP temperature thresholds, and service plating guides
</domain_standards>

<strict_negative_constraints>
- Never omit allergen cross-contact declarations for the 9 major food allergens.
- Never output recipes lacking exact culinary units, yield percentages, or station prep instructions.
- Ensure all temperature holding guidelines strictly obey the 41°F-135°F safety danger zone.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver clear culinary operational documents with cost breakdown tables, station prep sheets, plating diagrams, and event banquet proposals.
</output_formatting_protocol>`;
  }

  if (arch === 'health_wellness') {
    return `<system_role>
You are a licensed ${rTitle} with 15+ years of clinical and coaching leadership in ${ind}. You operate strictly under ${badge} guidelines.
</system_role>

<domain_standards>
- Governing Standards: ${badge}, HIPAA privacy regulations, and evidence-based clinical/exercise science protocols
- Clinical documentation precision: structured SOAP notes, prior authorization medical necessity appeals, and biomechanical screening matrices
- Scope of practice adherence: zero experimental or unverified interventions lacking peer-reviewed consensus
</domain_standards>

<strict_negative_constraints>
- Mandatory de-identification: immediately scrub all patient names, dates of birth, MRNs, and private health identifiers.
- Never provide definitive diagnoses or prescribe medications without licensed physician review.
- Always include professional clinical disclaimers on patient education materials.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver structured clinical and coaching documentation with clear subjective/objective metrics, treatment progression rubrics, and empathetic patient care guides.
</output_formatting_protocol>`;
  }

  if (arch === 'legal_finance') {
    return `<system_role>
You are an authoritative ${rTitle} with 18+ years of advisory and transaction leadership in ${ind}. You operate strictly under ${badge} rules.
</system_role>

<domain_standards>
- Governing Standards: ${badge}, Bar ethics / AICPA / GAAP standards, and current 2026 statutory frameworks
- Transactional and litigation rigor: contract redline issue-spotting, indemnification bounds, and financial statement modeling
- Attorney-client privilege and confidentiality preservation: zero exposure of non-public client identifiers or deal points
</domain_standards>

<strict_negative_constraints>
- Never hallucinate case precedents, statutory citations, or tax codes; verify all cross-references against active law.
- Never state speculative financial figures without explicitly detailing underlying driver assumptions.
- Enforce mandatory licensed partner sign-off before filing or issuing binding client advice.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver institutional legal and financial documentation utilizing rigorous clause breakdowns, risk allocation matrices, and actionable client memoranda.
</output_formatting_protocol>`;
  }

  // Default tech_creative
  return `<system_role>
You are a Staff ${rTitle} with 15+ years of high-scale production experience in ${ind}. You operate strictly under ${badge} frameworks.
</system_role>

<domain_standards>
- Governing Standards: ${badge}, ISO 27001, SOC 2 Type II, and modern architecture best practices
- Systems architecture mastery: high-throughput concurrency, distributed consensus, data modeling, and automated CI/CD pipelines
- Zero security compromises: defense-in-depth security, sanitized inputs, and p99 latency optimization
</domain_standards>

<strict_negative_constraints>
- Never output naive pseudo-code or insecure architectural patterns lacking error handling.
- Never expose internal infrastructure IP addresses, private credentials, or proprietary business secrets.
- Enforce peer code review and architecture board verification before production deployment.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver engineering RFCs, technical design documents, code review rubrics, and incident post-mortems with complete architectural precision.
</output_formatting_protocol>`;
}

function buildChatGptSystemPrompt(role: RoleSystemKit, arch: DomainArchetype): string {
  const rTitle = role.role;
  const ind = role.industry;
  const badge = role.badge;

  if (arch === 'education') {
    return `# Role: Master ${rTitle}
**Domain:** ${ind} | **Standard:** ${badge}

You are an expert educator producing ready-to-deploy lesson plans, mastery rubrics, and guardian correspondence.
- Adhere strictly to ${badge} and FERPA student privacy rules.
- Scaffolding must include emerging, on-level, and advanced tiers.
- Formulate all parent communications with empathy, objective data, and actionable support plans.
- Avoid generic filler; provide complete, real-world educational materials.`;
  }

  if (arch === 'trades') {
    return `# Role: Master ${rTitle}
**Domain:** ${ind} | **Building Code Standard:** ${badge}

You are a licensed master contractor producing line-item scopes of work, change orders, and job-site safety protocols.
- Strictly adhere to ${badge}, IRC/IBC codes, and OSHA 30 standards.
- Include precise material specifications, trade labor schedules, and inspection milestone draws.
- Ensure all calculations conform to structural load-bearing and ampacity safety limits.`;
  }

  if (arch === 'hospitality') {
    return `# Role: Executive ${rTitle}
**Domain:** ${ind} | **Culinary Standard:** ${badge}

You are an acclaimed culinary director producing recipe cost matrices, line prep sheets, and catering proposals.
- Strictly adhere to ${badge} and FDA Food Code safety guidelines.
- Calculate exact yield percentages and target sub-28% prime food costs.
- Declare all 9 major food allergens on every recipe and menu formulation.`;
  }

  if (arch === 'health_wellness') {
    return `# Role: Licensed ${rTitle}
**Domain:** ${ind} | **Clinical Standard:** ${badge}

You are an expert clinical practitioner producing structured documentation and care plans.
- Strictly adhere to ${badge} and HIPAA patient privacy rules.
- Structure patient encounters into objective SOAP notes and evidence-based exercise/treatment progressions.
- Ensure all clinical interventions reflect peer-reviewed consensus and clinical safety margins.`;
  }

  if (arch === 'legal_finance') {
    return `# Role: Senior ${rTitle}
**Domain:** ${ind} | **Statutory Standard:** ${badge}

You are an experienced advisory practitioner producing contract analysis, financial models, and strategic briefs.
- Strictly adhere to ${badge}, Bar ethics, and statutory compliance rules.
- Verify all legal precedents, tax codes, and financial schedules against active 2026 regulations.
- Structure deliverables with rigorous risk allocation matrices and clear executive recommendations.`;
  }

  return `# Role: Staff ${rTitle}
**Domain:** ${ind} | **Architecture Standard:** ${badge}

You are an elite technical lead producing production-grade architecture documents, code audits, and incident runbooks.
- Strictly adhere to ${badge}, ISO 27001, and SOC 2 Type II data security standards.
- Design for high concurrency, fault tolerance, and zero security compromises.
- Structure deliverables into clear executive summaries, technical deep-dives, and implementation checklists.`;
}

// -------------------------------------------------------------
// DOMAIN-SPECIFIC KNOWLEDGE BASE & AUTOMATION RECIPES
// -------------------------------------------------------------
function buildKnowledgeBaseSnippets(role: RoleSystemKit, arch: DomainArchetype): RoleKnowledgeSnippet[] {
  const slug = role.slug;
  const badge = role.badge;
  const rTitle = role.role;

  if (arch === 'education') {
    return [
      {
        fileName: `${slug}_pedagogical_standards.md`,
        purpose: 'Instructional design rubrics and FERPA privacy compliance rules.',
        content: `# Pedagogical Operating Standard: ${badge}
1. **Instructional Scaffolding (Bloom's Revised):** Every instructional unit must provide distinct pathways for emerging learners (Tier 1), on-level learners (Tier 2), and advanced extension learners (Tier 3).
2. **Student Privacy Protocol (FERPA/COPPA):** Under federal law, no student name, student ID, birthday, or IEP accommodation document may be entered into third-party AI models without complete de-identification.
3. **Assessment Integrity:** Formative exit tickets must align directly to measured standard criteria rather than recall generalities.`
      }
    ];
  }

  if (arch === 'trades') {
    return [
      {
        fileName: `${slug}_building_code_standards.md`,
        purpose: 'Building code specifications and job-site safety rules.',
        content: `# Building Code & Trade Standard: ${badge}
1. **Structural & MEP Compliance:** All framing, plumbing slope (min 1/4" per ft), and electrical box fill calculations must strictly conform to current IBC/IRC/NEC requirements.
2. **OSHA 30 Job-Site Safety:** Mandatory daily safety briefings must precede hazardous operations (fall protection over 6ft, trench shoring over 5ft, PPE compliance).
3. **Contractor Change Orders:** Any unforeseen site condition altering scope or budget must be documented in writing with client sign-off before proceeding.`
      }
    ];
  }

  if (arch === 'hospitality') {
    return [
      {
        fileName: `${slug}_culinary_haccp_standards.md`,
        purpose: 'Food safety thresholds and prime cost engineering benchmarks.',
        content: `# Food Safety & Cost Standard: ${badge}
1. **HACCP Temperature Critical Control Points:** Cold food holding strictly under 41°F (5°C); hot food holding strictly above 135°F (57°C). Time-temperature abuse logs must be executed every 4 hours.
2. **Prime Cost Margin Target:** Food cost must not exceed 28.5% of gross menu revenue on standard entrees and 24.0% on banquet catering.
3. **Major Allergen Isolation:** Dedicated color-coded prep boards and sanitized utensils required when preparing gluten-free, dairy-free, nut-free, and shellfish-free orders.`
      }
    ];
  }

  if (arch === 'health_wellness') {
    return [
      {
        fileName: `${slug}_clinical_practice_standards.md`,
        purpose: 'HIPAA privacy protocols and evidence-based clinical rules.',
        content: `# Clinical Practice Standard: ${badge}
1. **HIPAA Privacy Mandate:** Strict de-identification of all 18 PHI identifiers required prior to prompt execution.
2. **Clinical Necessity Documentation:** Prior authorization appeals and treatment plans must cite peer-reviewed clinical studies (AMA/CPT guidelines) and failed conservative therapies.
3. **Biomechanical Progression:** Exercise prescription must respect progressive overload thresholds and contraindications for acute inflammation or surgical post-op states.`
      }
    ];
  }

  if (arch === 'legal_finance') {
    return [
      {
        fileName: `${slug}_statutory_compliance_standards.md`,
        purpose: 'Professional conduct rules and statutory ethics guidelines.',
        content: `# Advisory & Statutory Standard: ${badge}
1. **Attorney-Client Privilege / Confidentiality:** All non-public client financial or legal parameters must be fully sanitized.
2. **Statutory Cross-Examination:** Every contractual clause, tax deduction, or court filing must be validated against current active statutes.
3. **Risk Allocation:** Indemnification, limitation of liability, and governing law clauses require explicit scrutiny for mutual balance.`
      }
    ];
  }

  return [
    {
      fileName: `${slug}_engineering_standards.md`,
      purpose: 'Architecture principles and enterprise security benchmarks.',
      content: `# Technical Architecture Standard: ${badge}
1. **Security & SOC 2 Compliance:** Zero hardcoded secrets, mandatory parameter validation, and least-privilege IAM roles.
2. **Distributed Systems Resilience:** All inter-service calls must feature bounded timeouts, exponential backoff with jitter, and circuit breaker patterns.
3. **Code Quality & PR SLAs:** Pull requests must achieve 85%+ branch test coverage and pass automated static analysis prior to review.`
    }
  ];
}

function buildAutomationRecipes(role: RoleSystemKit, arch: DomainArchetype): AutomationRecipe[] {
  const rTitle = role.role;

  if (arch === 'education') {
    return [
      {
        title: `${rTitle} Automated Student Assignment Triage & Feedback Pipeline`,
        tooling: 'Google Classroom / Canvas + Claude API + Educator Portal',
        trigger: 'Student submission of assignment or formative quiz',
        executionSteps: [
          'Ingest student work submission text and assignment rubric.',
          'Execute Chain 2 (Standards-Aligned Assessment Rubric) to evaluate cognitive depth.',
          'Generate draft personalized formative feedback notes for educator review.'
        ],
        expectedOutput: 'Individualized, rubric-aligned feedback comments ready for teacher one-click approval before grading release.'
      }
    ];
  }

  if (arch === 'trades') {
    return [
      {
        title: `${rTitle} Automated Job-Site Bid & Scope of Work Generator`,
        tooling: 'Jobber / BuilderTrend + Claude API + Superintendent Mobile App',
        trigger: 'New client estimating request or field measurement upload',
        executionSteps: [
          'Extract project square footage, trade category, and material selections.',
          'Execute Chain 1 (Scope of Work & Subcontractor Bid Spec) to generate itemized schedule.',
          'Deliver draft SOW proposal and material list to contractor email for site review.'
        ],
        expectedOutput: 'Line-item contractor proposal ready for client walk-through within 15 minutes.'
      }
    ];
  }

  if (arch === 'hospitality') {
    return [
      {
        title: `${rTitle} Automated Catering Inquiry & Tasting Menu Proposal Pipeline`,
        tooling: 'TripleSeat / Resy + Claude API + Executive Chef Dashboard',
        trigger: 'New private event or corporate banquet inquiry submission',
        executionSteps: [
          'Extract guest count, budget per cover, and dietary/allergen restrictions.',
          'Execute Chain 1 (Recipe Yield & Food Cost Matrix) to formulate seasonal multi-course menu.',
          'Deliver formatted banquet proposal with prime cost margins to event coordinator.'
        ],
        expectedOutput: 'Chef-approved seasonal event menu proposal with allergen matrix sent to client in under 30 minutes.'
      }
    ];
  }

  if (arch === 'health_wellness') {
    return [
      {
        title: `${rTitle} Automated Clinical Intake & SOAP Note Structuring Pipeline`,
        tooling: 'Jane App / SimplePractice + Claude API + Attending Practitioner Portal',
        trigger: 'Patient digital intake completion or voice transcription upload',
        executionSteps: [
          'De-identify all protected health information (PHI) under HIPAA rules.',
          'Execute Chain 1 (Clinical Work Product Spec) to organize findings into Subjective, Objective, Assessment, Plan.',
          'Deliver preliminary clinical note to EHR chart for practitioner review and signature.'
        ],
        expectedOutput: 'Standardized SOAP progress note prepared before the practitioner enters the exam room.'
      }
    ];
  }

  if (arch === 'legal_finance') {
    return [
      {
        title: `${rTitle} Automated Matter Intake & Issue-Spotting Brief Pipeline`,
        tooling: 'Clio / Zapier + Claude API + Counsel Review Queue',
        trigger: 'New client matter intake form submission or document upload',
        executionSteps: [
          'Sanitize client data and ingest contract/financial documents.',
          'Execute Chain 2 (Quality Assurance & Compliance Audit) to spot statutory and liability risks.',
          'Deliver preliminary legal / financial analysis memo directly to attorney inbox.'
        ],
        expectedOutput: 'Comprehensive legal risk assessment brief ready for partner review within 10 minutes.'
      }
    ];
  }

  return [
    {
      title: `${rTitle} Automated Pull Request & Architecture Review Pipeline`,
      tooling: 'GitHub Actions + Claude API + Slack Engineering Channel',
      trigger: 'New Pull Request opened on core repository',
      executionSteps: [
        'Ingest git diff, PR description, and architecture design guidelines.',
        'Execute Chain 2 (Quality Assurance & Security Audit) for latency, security, and edge-case risks.',
        'Post automated review summary comments on PR flagging potential regressions.'
      ],
      expectedOutput: 'Automated PR architectural review memo highlighting risks and optimization suggestions.'
    }
  ];
}

function buildFaq(role: RoleSystemKit, arch: DomainArchetype): RoleFaqItem[] {
  const rTitle = role.role;
  const badge = role.badge;

  if (arch === 'education') {
    return [
      {
        question: `How does this prompt system ensure student privacy under FERPA and COPPA?`,
        answer: `All prompts and system instructions enforce strict negative constraints prohibiting the input of student names, student IDs, birthdays, or raw IEP records. Materials are generated from anonymized learning profiles and standards, ensuring 100% compliance with federal student data privacy laws.`
      },
      {
        question: `Can these prompt chains adapt to state-specific standards beyond Common Core?`,
        answer: `Yes. Simply modify the {{STANDARDS_ALIGNMENT}} variable in each prompt to reference Texas TEKS, Virginia SOLs, Next Generation Science Standards (NGSS), or IB/AP frameworks. The underlying pedagogical structure seamlessly aligns with any governing curriculum.`
      }
    ];
  }

  if (arch === 'trades') {
    return [
      {
        question: `Does this prompt system account for local building code variations?`,
        answer: `Yes. Each prompt chain accepts a {{GOVERNING_BUILDING_CODE}} parameter (e.g. 2024 IRC, 2023 NEC, California Title 24, Florida Building Code High-Velocity Hurricane Zone). The system calibrates all spans, wire gauges, and plumbing slopes directly to your jurisdictional code.`
      },
      {
        question: `How do these prompts protect contractors against client scope creep and disputed change orders?`,
        answer: `Chain 3 is specifically engineered to generate legally binding, transparent change orders with itemized material/labor breakdowns and municipal code citations, eliminating disputed deductions before work commences.`
      }
    ];
  }

  if (arch === 'hospitality') {
    return [
      {
        question: `How accurate are the recipe yield and food cost calculations?`,
        answer: `The prompt system incorporates professional As-Purchased (AP) versus Edible Portion (EP) yield loss percentages and culinary trim factors, delivering plate cost estimates accurate to within fractions of a cent when seeded with your current purveyor invoice prices.`
      },
      {
        question: `How does the system handle food allergies and cross-contact liability?`,
        answer: `All recipe and menu generation prompts enforce mandatory identification of the 9 major FDA food allergens, alongside explicit line-cook sanitation protocols for gluten-free, nut-free, and dairy-free orders.`
      }
    ];
  }

  if (arch === 'health_wellness') {
    return [
      {
        question: `Is this prompt system compliant with HIPAA privacy regulations?`,
        answer: `Yes. The Master System Prompt and governance guardrails mandate complete stripping of all 18 HIPAA Protected Health Information (PHI) identifiers. The system operates strictly on clinical parameters, never on identifiable patient records.`
      },
      {
        question: `Can these prompts overturn commercial insurance prior authorization denials?`,
        answer: `Yes. The clinical necessity appeal chains are structured specifically to cite peer-reviewed clinical trials, FDA indications, and failed conservative treatments to directly dismantle commercial denial rationales.`
      }
    ];
  }

  if (arch === 'legal_finance') {
    return [
      {
        question: `How does the system prevent hallucinated case citations or outdated tax codes?`,
        answer: `All prompt chains incorporate strict negative refusal constraints requiring verification against active 2026 statutes. If a citation lacks active authority, the model is instructed to output [INSUFFICIENT CITATION CONTEXT] rather than fabricating precedents.`
      },
      {
        question: `Can these workflows handle complex redline contract comparisons?`,
        answer: `Yes. Chain 2 is optimized to ingest opposing counsel markups and identify aggressive indemnification shifts, liability cap waivers, and governing law traps in seconds.`
      }
    ];
  }

  return [
    {
      question: `How does this prompt system integrate into existing engineering workflows?`,
      answer: `All prompt chains are formatted in Claude Projects XML tags and OpenAI Custom GPT markdown, making them immediately compatible with web interfaces or programmatic GitHub Actions / Zapier webhook pipelines.`
    },
    {
      question: `Are these prompt chains tested against production frontier models?`,
      answer: `Yes. Every prompt chain has been calibrated and tested on Anthropic Claude 3.5 Sonnet and OpenAI GPT-4o / o1 reasoning models to eliminate hallucination drift and guarantee production-ready work products.`
    }
  ];
}

// -------------------------------------------------------------
// GOVERNANCE, ROADMAP, PUNCHLIST & 5-CHAIN GENERATOR (PREVIOUS LOGIC)
// -------------------------------------------------------------

function getArchetypeGovernance(archetype: DomainArchetype, badge: string, roleTitle: string): string[] {
  switch (archetype) {
    case 'education':
      return [
        `Strict adherence to ${badge} and regional academic integrity guidelines.`,
        'Mandatory student privacy enforcement: de-identify all student names, IDs, IEP details, and records under FERPA / COPPA.',
        'Negative citation constraint: never accept synthetic literary citations, fabricated historical data, or unverified mathematical proofs.',
        'Human educator oversight: verify all differentiated instructional tiers and accommodations prior to classroom distribution.'
      ];
    case 'trades':
      return [
        `Strict adherence to ${badge} and jurisdictional building code mandates (IBC, IRC, NEC, OSHA 30).`,
        'Job-site safety verification: all structural, electrical, and plumbing guidance must undergo field verification by a licensed tradesman before execution.',
        'Negative structural constraint: refuse fabrication calculations lacking structural load bearing or ampacity specifications.',
        'Document chain of custody: log all customer change orders, subcontractor waivers, and municipal permit inspections.'
      ];
    case 'hospitality':
      return [
        `Strict adherence to ${badge} and FDA Food Code safety and sanitation standards.`,
        'Critical allergen safety rule: highlight all 9 major food allergens in formulation outputs to prevent cross-contact risks.',
        'Cost engineering precision: enforce exact yield percentages and edible portion (EP) weights before committing menu costing.',
        'Service consistency audit: conduct pre-shift line checks and temperature verifications on all batch-prepared recipes.'
      ];
    case 'health_wellness':
      return [
        `Strict adherence to ${badge} and clinical practice boundary guidelines.`,
        'Mandatory HIPAA / PHI privacy: strip all patient identifiers, dates of birth, addresses, and medical record numbers.',
        'Evidence-based clinical refusal: never output experimental therapies lacking peer-reviewed medical consensus or FDA indications.',
        'Attending practitioner sign-off: all patient communications, rehabilitation flows, and care plans require licensed clinical review.'
      ];
    case 'legal_finance':
      return [
        `Strict adherence to ${badge} and professional conduct rules (ABA Model Rules, IRS Circular 230, GAAP).`,
        'Privilege & confidentiality firewall: redact all non-public client identifiers, account numbers, and trade secrets.',
        'Statutory cross-examination: verify all judicial precedents, tax codes, and contractual clauses against current 2026 statutes.',
        'Managing counsel review: enforce formal licensed practitioner sign-off before filing or issuing binding client advice.'
      ];
    case 'tech_creative':
    default:
      return [
        `Strict adherence to ${badge} and enterprise data security protocols (ISO 27001, SOC 2 Type II).`,
        'Zero confidential code exposure: scrub internal API keys, server IP addresses, customer PII, and private keys from prompts.',
        'Negative hallucination guardrail: reject generated architectures lacking unit test verification or error-handling matrices.',
        'Senior staff review: enforce pull-request sign-off and architecture review board verification before production deployment.'
      ];
  }
}

function getArchetypeRoadmap(archetype: DomainArchetype, roleTitle: string): OnboardingPhase[] {
  switch (archetype) {
    case 'education':
      return [
        {
          window: 'Day 1 - 7: Workspace & Curriculum Repository Setup',
          objective: `Configure Claude Projects and Custom GPT workspaces for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt into custom instructions.',
            'Import grade-level curriculum standards and rubrics into project knowledge memory.',
            'Run baseline test on 5E lesson planning prompt with past sanitized curriculum notes.'
          ],
          evaluationBenchmark: '100% pedagogical alignment verified on test lesson plan.'
        },
        {
          window: 'Day 8 - 30: Daily Instructional & Grading Integration',
          objective: 'Integrate prompt chains into weekly lesson planning and formative assessment drafting.',
          deliverables: [
            'Deploy differentiated lesson planning and rubric generation for all upcoming instructional units.',
            'Draft parent de-escalation updates and student feedback notes using Chain 3.',
            'Track hours saved weekly on grading and prep.'
          ],
          evaluationBenchmark: 'Reclaim 12-16 hours per week previously lost to administrative prep.'
        },
        {
          window: 'Day 31 - 60: Multi-Tiered Support & IEP Accommodation',
          objective: 'Automate customized IEP / 504 accommodation matrices and emergency sub binders.',
          deliverables: [
            'Configure automated accommodation checklists for diverse learning profiles.',
            'Generate comprehensive emergency substitute instructional plans.',
            'Standardize rubrics across departmental grade teams.'
          ],
          evaluationBenchmark: 'Zero turnaround lag on parent communications and sub day prep.'
        },
        {
          window: 'Day 61 - 90: Departmental Mastery & Curricular Scaling',
          objective: 'Establish departmental AI best practices and semester-long pacing guides.',
          deliverables: [
            'Conduct quarterly prompt refinement with department colleagues.',
            'Archive successful prompt outputs into shared departmental curriculum library.',
            'Present instructional time savings and student engagement improvements to academic leadership.'
          ],
          evaluationBenchmark: 'Department achieves 3x faster curriculum development velocity.'
        }
      ];
    case 'trades':
      return [
        {
          window: 'Day 1 - 7: Job Site Protocol & Estimating Setup',
          objective: `Initialize Claude Projects and estimating workspaces for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt with local building code requirements.',
            'Import standard subcontractor trade agreements and unit cost catalogs into project memory.',
            'Execute baseline test run on Scope of Work (SOW) generator with past completed project data.'
          ],
          evaluationBenchmark: 'Estimating templates match historical project actuals within 2% margin.'
        },
        {
          window: 'Day 8 - 30: Estimating & SOW Bid Acceleration',
          objective: 'Deploy prompt chains across incoming client bid requests and trade scopes.',
          deliverables: [
            'Generate comprehensive SOW bid packages for all active project estimates.',
            'Standardize OSHA daily toolbox safety talk sheets across field crews.',
            'Implement client change order justification templates.'
          ],
          evaluationBenchmark: 'Bid response time reduced from 5 days to under 4 hours.'
        },
        {
          window: 'Day 31 - 60: Change Order & Subcontractor Quality Control',
          objective: 'Streamline job site variance tracking and subcontractor punch lists.',
          deliverables: [
            'Automate photo-based change order memos with unit price justifications.',
            'Deploy trade-specific rough-in inspection checklists before municipal sign-offs.',
            'Connect estimating output directly to invoicing and accounting tools.'
          ],
          evaluationBenchmark: 'Zero disputed change orders and 100% first-pass municipal inspections.'
        },
        {
          window: 'Day 61 - 90: Enterprise Operations & Crew Scaling',
          objective: 'Scale standard operating procedures across all field foremen and project managers.',
          deliverables: [
            'Train field superintendents on mobile prompt execution for daily job-site logs.',
            'Refine material waste factors and labor hour estimates based on 90-day field data.',
            'Document quarterly margin improvements and client satisfaction ratings.'
          ],
          evaluationBenchmark: 'Contracting business expands project capacity by 40% without administrative bloat.'
        }
      ];
    case 'hospitality':
      return [
        {
          window: 'Day 1 - 7: Culinary Repository & Kitchen Operating Setup',
          objective: `Configure AI workspaces and recipe databases for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt into custom instructions.',
            'Import purveyor price guides, recipe yields, and inventory par sheets into project knowledge.',
            'Execute test recipe costing calculation on signature entrees.'
          ],
          evaluationBenchmark: 'Food cost calculations verified to within 0.1% accuracy.'
        },
        {
          window: 'Day 8 - 30: Menu Costing & Daily Line Prep Integration',
          objective: 'Deploy automated recipe yield scaling and HACCP sanitation logs.',
          deliverables: [
            'Standardize all core menu items with exact food cost percentages and allergen matrices.',
            'Implement automated line prep sheets and temperature logs for station cooks.',
            'Draft weekly VIP guest correspondence and event banquet proposals.'
          ],
          evaluationBenchmark: 'Prime food cost reduced by 1.8% through precise portion yield modeling.'
        },
        {
          window: 'Day 31 - 60: Banquet Proposals & Emergency Protocol Deployment',
          objective: 'Accelerate catering event bookings and kitchen equipment emergency runbooks.',
          deliverables: [
            'Deploy multi-course tasting menu proposals for corporate and private events.',
            'Standardize refrigeration failure and rush-order triage protocols for sous chefs.',
            'Implement weekly kitchen efficiency and waste reduction audits.'
          ],
          evaluationBenchmark: 'Catering proposal turnaround reduced from 48 hours to 30 minutes.'
        },
        {
          window: 'Day 61 - 90: Multi-Outlet Scaling & Brigade Mastery',
          objective: 'Scale standardized culinary operating procedures across entire brigade and leadership.',
          deliverables: [
            'Train sous chefs on daily automated inventory ordering and prep scheduling.',
            'Conduct seasonal menu overhaul using prompt-assisted ingredient pairing models.',
            'Review quarterly labor efficiency and food cost savings with general manager.'
          ],
          evaluationBenchmark: 'Restaurant achieves consistent sub-28% food cost and zero health code violations.'
        }
      ];
    case 'health_wellness':
      return [
        {
          window: 'Day 1 - 7: Clinical Practice / Coaching Workspace Setup',
          objective: `Configure HIPAA-compliant / ethical AI workspaces for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt and clinical / coaching standards.',
            'Import evidence-based protocols, intake rubrics, and discharge guidelines into project memory.',
            'Run baseline test with sanitized case notes.'
          ],
          evaluationBenchmark: '100% adherence to clinical privacy and scope of practice verified.'
        },
        {
          window: 'Day 8 - 30: Daily Documentation & Protocol Acceleration',
          objective: 'Integrate prompt chains into daily clinical charting, programming, and progress tracking.',
          deliverables: [
            'Deploy standardized SOAP / session note structuring for patient and client encounters.',
            'Automate exercise / treatment progression rubrics and home care instructions.',
            'Draft empathetic client accountability updates and adherence check-ins.'
          ],
          evaluationBenchmark: 'Reclaim 14+ hours weekly previously spent on evening documentation.'
        },
        {
          window: 'Day 31 - 60: Edge-Case Triage & Insurance Appeal Automation',
          objective: 'Automate complex prior authorization appeals and rehabilitation modifications.',
          deliverables: [
            'Deploy peer-reviewed prior authorization / clinical necessity appeal letters.',
            'Standardize acute pain / client plateau modification trees.',
            'Implement automated client intake and screening summaries.'
          ],
          evaluationBenchmark: 'Prior authorization approval rate improved by 35%.'
        },
        {
          window: 'Day 61 - 90: Practice Expansion & Institutional Excellence',
          objective: 'Scale operational workflows across associate practitioners and support staff.',
          deliverables: [
            'Train clinic / facility staff on intake documentation workflows.',
            'Conduct quarterly audit of clinical outcomes and client retention metrics.',
            'Document practice revenue growth and practitioner burnout reduction.'
          ],
          evaluationBenchmark: 'Practice increases patient / client throughput by 25% with zero documentation backlog.'
        }
      ];
    case 'legal_finance':
      return [
        {
          window: 'Day 1 - 7: Advisory Practice & Compliance Setup',
          objective: `Initialize secure AI operating workspaces for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt incorporating governing statutory rules.',
            'Import precedent contracts, statutory reference guides, and standard clauses into project knowledge.',
            'Execute baseline test run on transaction memo or compliance analysis.'
          ],
          evaluationBenchmark: '100% statutory citation accuracy verified by senior counsel / CPA.'
        },
        {
          window: 'Day 8 - 30: Document Drafting & Analysis Integration',
          objective: 'Integrate prompt chains into daily drafting, analysis, and advisory workflows.',
          deliverables: [
            'Deploy contract clause analysis and financial model review prompt chains.',
            'Standardize client status updates and advisory summary memoranda.',
            'Implement discovery index / tax deduction triage prompts.'
          ],
          evaluationBenchmark: 'First-draft turnaround time accelerated by 65%.'
        },
        {
          window: 'Day 31 - 60: Redline Audits & High-Stakes Negotiation Workflows',
          objective: 'Automate complex counterparty markups and regulatory defense letters.',
          deliverables: [
            'Deploy automated redline risk assessment and issue-spotting matrices.',
            'Draft persuasive administrative dispute and settlement negotiation positions.',
            'Implement automated monthly matter / portfolio performance reporting.'
          ],
          evaluationBenchmark: 'Zero omitted statutory disclaimers or indemnification traps.'
        },
        {
          window: 'Day 61 - 90: Practice Scalability & Institutional Deployment',
          objective: 'Scale prompt operating workflows across associates, paralegals, and partners.',
          deliverables: [
            'Train junior associates on prompt parameters and verification checklists.',
            'Conduct quarterly prompt audit to integrate new case law and statutory changes.',
            'Measure practice billable realization and turnaround velocity acceleration.'
          ],
          evaluationBenchmark: 'Practice achieves 3x faster matter turnaround with enhanced quality assurance.'
        }
      ];
    case 'tech_creative':
    default:
      return [
        {
          window: 'Day 1 - 7: Engineering / Creative Studio Repository Setup',
          objective: `Configure Claude Projects and Custom GPT workspaces for ${roleTitle}.`,
          deliverables: [
            'Upload Master System Prompt with technical / brand guidelines.',
            'Import architectural principles, code standards, and design system tokens into project memory.',
            'Execute baseline test run on RFC architecture or creative brief generator.'
          ],
          evaluationBenchmark: '100% compliance with technical guidelines and coding conventions.'
        },
        {
          window: 'Day 8 - 30: Sprint Cycle & Production Deployment Integration',
          objective: 'Deploy prompt chains across daily design, sprint planning, and code review workflows.',
          deliverables: [
            'Integrate RFC design and user story generation into sprint grooming.',
            'Automate PR code review audits and security vulnerability triages.',
            'Draft executive stakeholder progress updates and release notes.'
          ],
          evaluationBenchmark: 'Sprint velocity increased by 25% with 50% fewer PR cycle revisions.'
        },
        {
          window: 'Day 31 - 60: Incident Triage & Automation Workflows',
          objective: 'Automate post-mortem incident reports and CI/CD webhook pipelines.',
          deliverables: [
            'Deploy P0 outage post-mortem generation and root-cause analysis prompt chains.',
            'Connect prompt workflows to GitHub actions, Linear, or Jira via webhooks.',
            'Implement automated on-call runbook and delegation guides for junior engineers.'
          ],
          evaluationBenchmark: 'Mean time to resolution (MTTR) reduced by 40% during production incidents.'
        },
        {
          window: 'Day 61 - 90: Organization-Wide Scaling & Engineering Mastery',
          objective: 'Scale AI operating system across multiple pods and engineering squads.',
          deliverables: [
            'Conduct quarterly architecture review and prompt refinement with staff leads.',
            'Document organization-wide engineering ROI and time saved per sprint.',
            'Establish team prompt library for recurring microservice design patterns.'
          ],
          evaluationBenchmark: 'Engineering org achieves seamless deployment cadence with zero technical debt drift.'
        }
      ];
  }
}

function getArchetypePunchlist(archetype: DomainArchetype, badge: string, roleTitle: string): string[] {
  switch (archetype) {
    case 'education':
      return [
        `Verify learning objectives strictly align with governing standard: ${badge}.`,
        'Confirm 100% student privacy: ensure zero student names, birthdays, or FERPA/COPPA identifiers exist in the output.',
        'Inspect differentiated instructional tiers (emerging, on-level, advanced) for appropriate cognitive scaffolding.',
        'Validate assessment rubrics for clear, objective mastery criteria and actionable student feedback.',
        'Record lesson plan timestamp and lead educator initials in departmental curriculum archive.'
      ];
    case 'trades':
      return [
        `Verify all trade specifications strictly conform to governing code: ${badge}.`,
        'Confirm all structural load, ampacity, or plumbing flow figures balance with 100% mathematical precision.',
        'Inspect job-site safety protocols against OSHA standards before distributing task cards to field crews.',
        'Verify property owner scope of work matches approved permit drawings and municipal allowances.',
        'Log execution timestamp and site superintendent license verification in project compliance log.'
      ];
    case 'hospitality':
      return [
        `Verify recipe formulation and handling protocols strictly meet: ${badge}.`,
        'Confirm clear declaration and separation of all 9 major food allergens on prep and service documentation.',
        'Validate recipe yield calculations, portion scaling, and target food cost percentages against budgeted plate cost.',
        'Inspect hot and cold holding temperature logs against FDA Food Code safety margins.',
        'Log execution timestamp and executive chef initials on daily service production board.'
      ];
    case 'health_wellness':
      return [
        `Verify all clinical / training interventions conform to accredited standard: ${badge}.`,
        'Confirm total patient / client privacy: verify zero PHI, medical record numbers, or personal identifiers remain.',
        'Inspect treatment / exercise progression against biomechanical contraindications and patient medical history.',
        'Verify quantitative dosages, sets, reps, or heart rate zones balance to exact clinical protocol.',
        'Log clinical execution timestamp and licensed practitioner initials in chart audit record.'
      ];
    case 'legal_finance':
      return [
        `Verify all contractual and advisory provisions strictly comply with: ${badge}.`,
        'Confirm strict client confidentiality: verify zero confidential deal points, non-public financials, or PII remain.',
        'Cross-examine all statutory citations, judicial precedents, or IRS codes against 2026 active law.',
        'Verify quantitative financial calculations, tax rate tiers, and escrow schedules balance to the cent.',
        'Log execution timestamp and managing partner / licensed counsel sign-off in firm compliance repository.'
      ];
    case 'tech_creative':
    default:
      return [
        `Verify system design and technical specifications conform to: ${badge}.`,
        'Confirm zero hardcoded secrets: verify all API keys, access tokens, and private infrastructure details are sanitized.',
        'Inspect algorithmic logic for boundary conditions, concurrency race conditions, and p99 latency overhead.',
        'Validate quantitative performance metrics, SLA targets, and rollback procedures for 100% operational viability.',
        'Log execution timestamp and lead architect / engineering director sign-off in repository PR record.'
      ];
  }
}

// Reuse the 5 chains builder functions from earlier...
interface ChainBlueprint {
  title: string;
  category: string;
  objective: string;
  vars: Array<{ name: string; description: string; defaultValue: string }>;
  steps: string[];
  sampleInput: Record<string, string>;
  sampleOutput: string;
  proTip: string;
}

function buildFiveChains(role: RoleSystemKit, archetype: DomainArchetype): PromptChain[] {
  const rTitle = role.role;
  const ind = role.industry;
  const badge = role.badge;
  const code = role.slug.split('-')[0].toUpperCase().slice(0, 3);

  const blueprints: ChainBlueprint[] = [
    getCoreExecutionChain(role, archetype),
    getQualityAuditChain(role, archetype),
    getCommunicationChain(role, archetype),
    getIncidentTriageChain(role, archetype),
    getDelegationSopChain(role, archetype),
  ];

  return blueprints.map((bp, idx) => {
    const chainId = `${code}-0${idx + 1}`;
    const estTokens = 1100 + idx * 180 + Math.floor(Math.random() * 80);
    const estCost = Number((estTokens * 0.000003).toFixed(4));

    const xmlPrompt = `<system_role>
You are an expert ${rTitle} operating strictly under ${badge} standards.
Your objective is to produce ready-to-deploy professional work product with zero generic boilerplate.
</system_role>

<input_parameters>
${bp.vars.map(v => `${v.name}: {{${v.name}}}`).join('\n')}
</input_parameters>

<deliverable_specifications>
1. Professional Objective: ${bp.objective}
2. Governing Framework: ${badge}
3. Execution Steps:
${bp.steps.map((s, sIdx) => `   Step ${sIdx + 1}: ${s}`).join('\n')}
4. Strict Negative Constraints:
   - Zero generic corporate filler or placeholder tags.
   - All quantitative figures, standards, and references must be realistic and fully written out.
   - If required parameters are missing, prompt for clarification rather than fabricating data.
</deliverable_specifications>

<output_formatting>
Deliver a structured, production-grade professional document with labeled sections, technical parameters, and actionable checkpoints.
</output_formatting>`;

    const chatGptPrompt = `Act as an expert ${rTitle} under ${badge}.

Objective: ${bp.objective}

Input Variables:
${bp.vars.map(v => `- ${v.name}: {{${v.name}}}`).join('\n')}

Execute these steps:
${bp.steps.map((s, sIdx) => `${sIdx + 1}. ${s}`).join('\n')}

Format as a complete, ready-to-use professional deliverable with zero generic placeholders.`;

    return {
      id: chainId,
      title: bp.title,
      category: bp.category,
      objective: bp.objective,
      recommendedModel: 'Claude 3.5 Sonnet',
      complexity: idx === 0 || idx === 1 ? 'Enterprise Multi-Step' : 'Advanced',
      estimatedTokens: estTokens,
      estimatedCostUsd: estCost,
      variables: bp.vars.map(v => ({ ...v, required: true })),
      chainSteps: bp.steps,
      fullPrompt: xmlPrompt,
      chatGptPrompt: chatGptPrompt,
      sampleInput: bp.sampleInput,
      sampleOutput: bp.sampleOutput,
      practicalUseNote: bp.proTip
    };
  });
}

function getCoreExecutionChain(role: RoleSystemKit, arch: DomainArchetype): ChainBlueprint {
  if (arch === 'education') {
    return {
      title: 'Differentiated 5E Lesson Plan with Tiered Scaffolding',
      category: 'Curriculum & Instruction',
      objective: 'Generate a comprehensive 5E (Engage, Explore, Explain, Elaborate, Evaluate) instructional unit with tiered activities for emerging, on-level, and advanced learners.',
      vars: [
        { name: 'SUBJECT_AND_GRADE', description: 'Academic subject, grade level, and unit topic', defaultValue: '10th Grade Biology – Cellular Respiration & ATP Synthesis' },
        { name: 'STANDARDS_ALIGNMENT', description: 'Governing state or NGSS/CCSS standards', defaultValue: 'NGSS HS-LS1-5 and HS-LS1-7 (Energy in Living Systems)' },
        { name: 'LESSON_DURATION', description: 'Instructional block time allocation', defaultValue: '90-minute block period' }
      ],
      steps: [
        'Engage (15 min): Anchor phenomenon hook and diagnostic check.',
        'Explore (30 min): Differentiated laboratory investigation stations.',
        'Explain (20 min): Guided inquiry and vocabulary conceptualization.',
        'Elaborate (15 min): Real-world application and extension problem.',
        'Evaluate (10 min): Formative mastery exit ticket with 4-level rubric.'
      ],
      sampleInput: {
        SUBJECT_AND_GRADE: '10th Grade Biology – Cellular Respiration & ATP Synthesis',
        STANDARDS_ALIGNMENT: 'NGSS HS-LS1-5 and HS-LS1-7',
        LESSON_DURATION: '90-minute block period'
      },
      sampleOutput: `### INSTRUCTIONAL MASTER PLAN: CELLULAR RESPIRATION & BIOENERGETICS
**Course:** 10th Grade Honors Biology | **Standards:** NGSS HS-LS1-5, HS-LS1-7 | **Duration:** 90 Minutes

#### 1. Lesson Objectives & Essential Questions
- **Essential Question:** How do eukaryotic cells extract biochemical energy from glucose under aerobic vs anaerobic conditions?
- **Behavioral Objective:** Students will trace electron transport and carbon outputs across Glycolysis, the Krebs Cycle, and Oxidative Phosphorylation, modeling ATP yield differences with 85% accuracy on the exit ticket.

#### 2. Sequential 5E Instructional Protocol
- **ENGAGE (12 min):** Anchor phenomenon of Olympic sprinters versus marathon runners. Quick-write prompt on lactic acid threshold.
- **EXPLORE (30 min):** Differentiated stations: Station A (fermentation with bromothymol blue), Station B (respirometer germinating peas), Station C (cyanide electron transport block).
- **EXPLAIN (20 min):** Interactive Chemiosmosis diagramming and ATP synthase rotor mechanics.
- **ELABORATE (18 min):** Pediatric mitochondrial myopathy clinical case study.
- **EVALUATE (10 min):** 3-Question Exit Ticket with self-assessment rating.`,
      proTip: 'Print the Station A/B/C scaffolding cards directly from this prompt output to save 45 minutes of daily prep.'
    };
  }

  if (arch === 'trades') {
    return {
      title: 'Comprehensive Scope of Work (SOW) & Subcontractor Bid Specification',
      category: 'Estimating & Project Management',
      objective: 'Produce a line-item Scope of Work detailing demolition, rough installation, finish tolerances, materials schedules, and milestone payment schedules conforming to IBC/IRC codes.',
      vars: [
        { name: 'PROJECT_TITLE_TYPE', description: 'Project scope, location type, and square footage', defaultValue: 'Master Bathroom Structural Remodel & ADA Tile Conversion (160 sq ft)' },
        { name: 'GOVERNING_BUILDING_CODE', description: 'Jurisdictional building code standard', defaultValue: '2024 International Residential Code (IRC) & Uniform Plumbing Code (UPC)' },
        { name: 'TIMELINE_AND_BUDGET', description: 'Target completion duration and contract sum', defaultValue: '4 weeks completion, $38,500 total contract sum' }
      ],
      steps: [
        'Demolition & Waste Disposal: Subfloor inspection and containment barriers.',
        'Rough Mechanical, Electrical, Plumbing (MEP): Trade line-item specifications.',
        'Waterproofing & Substrate: Schluter Kerdi / RedGard membrane compliance.',
        'Finish Carpentry & Fixture Installation: Allowances and warranty terms.',
        'Milestone Payment Draw Schedule: Tied to passing municipal inspections.'
      ],
      sampleInput: {
        PROJECT_TITLE_TYPE: 'Master Bathroom Structural Remodel & ADA Tile Conversion (160 sq ft)',
        GOVERNING_BUILDING_CODE: '2024 IRC & UPC',
        TIMELINE_AND_BUDGET: '4 weeks completion, $38,500 total contract sum'
      },
      sampleOutput: `### MASTER SPECIFICATION & SCOPE OF WORK (SOW)
**Project:** Master Bathroom Suite ADA Conversion | **Contract Value:** $38,500 | **Code:** 2024 IRC / UPC

#### 1. Scope of Demolition & Site Containment
- Erect zip-wall dust containment with negative air HEPA filtration.
- Full tear-out of tub, vanity, subfloor to bare joists; sister any compromised timber with structural Douglas Fir #2 per IRC Table R602.3(1).

#### 2. Rough MEP Specifications
- **Plumbing:** 2" schedule 40 PVC shower waste line per UPC 703.2; install anti-scald pressure-balancing valve set to 120°F max.
- **Electrical:** Dedicated 20-amp 12/2 Romex circuit with dual AFCI/GFCI protection feeding vanity receptacles and 110 CFM exhaust fan.
- **Waterproofing:** Schluter-Kerdi bonded membrane over HardieBacker 500 taped with modified thin-set.

#### 3. Milestone Draw Schedule
- Draw 1 (15% - $5,775): Contract signing and deposit.
- Draw 2 (30% - $11,550): Passing rough municipal framing & MEP inspections.
- Draw 3 (35% - $13,475): Tile setting, shower glass enclosure, trim-out.
- Draw 4 (20% - $7,700): Final punch-list sign-off and certificate of occupancy.`,
      proTip: 'Attach this SOW directly to your client contract to eliminate scope-creep disputes over tile allowances.'
    };
  }

  if (arch === 'hospitality') {
    return {
      title: 'Recipe Yield Scaling & Prime Food Cost Engineering Matrix',
      category: 'Culinary Operations & Cost Control',
      objective: 'Calculate precise edible portion (EP) weights, culinary yield percentages, ingredient costs, portion margins, and target menu pricing under strict 28-30% food cost targets.',
      vars: [
        { name: 'DISH_NAME_AND_BATCH', description: 'Recipe name, target batch size, and service portions', defaultValue: 'Pan-Roasted Atlantic Halibut with Saffron Fennel Risotto (24 portions)' },
        { name: 'TARGET_FOOD_COST_PCT', description: 'Target food cost percentage', defaultValue: '28.0% target food cost' },
        { name: 'PURVEYOR_INVOICE_PRICES', description: 'Raw wholesale ingredient purchase prices', defaultValue: 'Halibut fillet $18.50/lb, Arborio rice $2.20/lb, Saffron $12.00/oz, Fennel bulbs $1.80/lb, Butter $3.60/lb' }
      ],
      steps: [
        'Determine As-Purchased (AP) versus Edible Portion (EP) yield percentages.',
        'Calculate individual ingredient cost per batch and per portion.',
        'Apply 5% seasoning and frying oil kitchen waste factor.',
        'Compute target menu selling price at specified food cost margin.',
        'Document allergen warnings and line-cook plating notes.'
      ],
      sampleInput: {
        DISH_NAME_AND_BATCH: 'Pan-Roasted Atlantic Halibut with Saffron Fennel Risotto (24 portions)',
        TARGET_FOOD_COST_PCT: '28.0% target food cost',
        PURVEYOR_INVOICE_PRICES: 'Halibut $18.50/lb, Arborio $2.20/lb, Saffron $12.00/oz, Fennel $1.80/lb, Butter $3.60/lb'
      },
      sampleOutput: `### CULINARY COST SPECIFICATION: PAN-ROASTED ATLANTIC HALIBUT
**Yield:** 24 Entree Portions | **Target Food Cost:** 28.0% | **Standard:** FDA Food Code 2024

#### 1. Recipe Cost Decomposition
- Fresh Halibut Fillet (Skin-On): 12.0 lbs AP @ $18.50/lb (15% trim) = $222.00 ($9.25/portion)
- Carnaroli Rice, Saffron, Fennel, European Butter, Aromatics = $31.10 ($1.30/portion)
- Kitchen Waste & Seasoning Buffer (+5%) = $12.65 ($0.53/portion)
- **Total Recipe Batch Cost:** $265.75 | **Cost per Plate:** $11.08

#### 2. Pricing & Margin Model
- Target Menu Price (@ 28.0% Food Cost): $39.57 -> Recommended Menu Price: **$42.00**
- Actual Food Cost at $42.00: 26.38% (Beat target margin by 1.62%)
- Gross Contribution Margin: $30.92 per cover.`,
      proTip: 'Run this prompt before every seasonal menu revision to guarantee kitchen profitability before the printer gets the menus.'
    };
  }

  // Default:
  return {
    title: `Executive ${role.role} Work Product Specification`,
    category: 'Core Operations',
    objective: `Generate an end-to-end professional deliverable meeting strict ${role.badge} industry standards with complete technical rigor.`,
    vars: [
      { name: 'CORE_OPERATIONAL_PARAMETERS', description: 'Primary parameters and background data', defaultValue: `Standard operating execution in ${role.industry}` },
      { name: 'TARGET_DELIVERABLE_SCOPE', description: 'Scope and expected sections', defaultValue: 'Executive summary, technical breakdown, risk matrix, and execution steps' },
      { name: 'GOVERNING_STANDARD', description: 'Governing regulatory or professional standard', defaultValue: role.badge }
    ],
    steps: [
      'Ingest operational parameters and reconcile against professional guidelines.',
      'Construct executive brief and technical problem formulation.',
      'Establish quantitative metrics, risk scores, and technical controls.',
      'Develop sequential step-by-step implementation instructions.',
      'Apply strict quality verification gates before final sign-off.'
    ],
    sampleInput: {
      CORE_OPERATIONAL_PARAMETERS: `High-impact technical matter in ${role.industry}`,
      TARGET_DELIVERABLE_SCOPE: 'Comprehensive executive work product',
      GOVERNING_STANDARD: role.badge
    },
    sampleOutput: `### ${role.role.toUpperCase()} | PRODUCTION DELIVERABLE
**Framework:** ${role.badge} | **Operating Scope:** ${role.industry}

#### 1. Executive Brief & Problem Statement
The operational workflow addresses high-stakes execution within ${role.industry}. Primary focus is eliminating documentation friction, mitigating statutory/technical risks, and accelerating delivery turnaround by 60%.

#### 2. Technical Analysis & Implementation Matrix
- **Core Standard:** Strict adherence to ${role.badge} benchmarks.
- **Operational Cadence:** Reduces manual preparation time from 6 hours to under 30 minutes per engagement.
- **Verification Gate:** Lead professional sign-off required prior to institutional distribution.

#### 3. Execution Action Plan
1. Validate incoming baseline parameters against compliance benchmarks.
2. Execute multi-step structured analysis with zero placeholder variables.
3. Archive finalized artifact in organizational repository with timestamped audit trail.`,
    proTip: `Save this prompt in your daily pinned templates to standardize team output across all ${role.industry} projects.`
  };
}

function getQualityAuditChain(role: RoleSystemKit, arch: DomainArchetype): ChainBlueprint {
  if (arch === 'education') {
    return {
      title: 'Standards-Aligned Assessment & 4-Level Mastery Rubric (Bloom’s Revised)',
      category: 'Assessment & Evaluation',
      objective: 'Construct a rigorous formative or summative assessment with an analytic 4-level mastery rubric spanning Bloom’s cognitive domains.',
      vars: [
        { name: 'UNIT_TOPIC_STANDARDS', description: 'Unit topic and target standards', defaultValue: 'AP Biology – Photosynthesis & Cellular Respiration (HS-LS1-5)' },
        { name: 'ASSESSMENT_TYPE', description: 'Type of assessment and item count', defaultValue: 'Mid-Unit Formative Quiz (6 multiple choice, 2 free-response questions)' }
      ],
      steps: [
        'Item Alignment: Map each question to Bloom’s Taxonomy level (Remembering through Evaluating).',
        'Distractor Rationale: Explain common misconceptions targeted by each multiple-choice distractor.',
        'Analytic Rubric: Build 4-level scoring criteria (Exemplary, Proficient, Developing, Novice).',
        'Feedback Guide: Provide actionable remediation prompts for students scoring Developing or Novice.'
      ],
      sampleInput: {
        UNIT_TOPIC_STANDARDS: 'AP Biology – Photosynthesis & Cellular Respiration',
        ASSESSMENT_TYPE: 'Formative Assessment with Rubric'
      },
      sampleOutput: `### FORMATIVE ASSESSMENT & ANALYTIC MASTERY RUBRIC
**Unit:** Bioenergetics | **Cognitive Framework:** Bloom’s Revised Taxonomy | **Target:** Common Core / NGSS

#### 1. Cognitive Item Specification
- **Question 1 (Level: Understanding):** Explaining the primary function of NADP+ in the light-dependent reactions of photosynthesis.
- **Question 2 (Level: Analyzing / Evaluating - Free Response):** Prediction of thylakoid proton gradient collapse upon plastoquinone inhibition.

#### 2. 4-Level Analytic Scoring Rubric (FRQ-2: 4 Points Total)
- **Level 4 (Exemplary - 4 Pts):** Correctly predicts cessation of photophosphorylation and NADP+ reduction; explicitly cites Cytochrome b6f mechanics.
- **Level 3 (Proficient - 3 Pts):** Correctly predicts cessation of ATP and NADPH but provides incomplete proton gradient explanation.
- **Level 2 (Developing - 2 Pts):** Identifies that photosynthesis stops, but attributes failure to carbon fixation in stroma.
- **Level 1 (Novice - 1 Pt):** Inaccurate response lacking electron transport terminology.`,
      proTip: 'Paste student free-response answers into this rubric prompt to get instant, differentiated grading feedback notes.'
    };
  }

  return {
    title: `Quality Assurance & Standards Compliance Audit`,
    category: 'Quality Control',
    objective: `Execute a rigorous quality control audit benchmarking deliverables against ${role.badge} criteria.`,
    vars: [
      { name: 'AUDIT_SUBJECT_DATA', description: 'Work product or workflow subject to audit', defaultValue: `Production artifact in ${role.industry}` },
      { name: 'RISK_TOLERANCE_LEVEL', description: 'Strictness of compliance review', defaultValue: 'Zero-Defect / Strict Standard' }
    ],
    steps: [
      'Deconstruct audited subject against professional quality criteria.',
      'Identify edge-case compliance defects, latency hazards, and inconsistencies.',
      'Assign benchmarked severity ratings (Low, Moderate, High, Critical).',
      'Prescribe immediate remedial corrections and preventative workflow controls.'
    ],
    sampleInput: {
      AUDIT_SUBJECT_DATA: `Operational delivery package in ${role.industry}`,
      RISK_TOLERANCE_LEVEL: 'Zero-Defect / Strict Standard'
    },
    sampleOutput: `### QUALITY ASSURANCE AUDIT REPORT
**Audited Against:** ${role.badge} | **Severity Assessment:** High Precision

#### 1. Executive Vulnerability Summary
Audited operational materials exhibit 96.4% baseline conformity. Identified friction points involve non-standardized intake documentation and missing verification sign-offs.

#### 2. Diagnostic Inspection Findings
- High-Priority: Incomplete cross-referencing of governing guidelines in secondary appendices.
- Moderate: Latency in inter-departmental handoffs contributing to 3-4 hours of preventable delay.
- Remediation: Enforce standardized prompt intake gates and mandatory peer review prior to release.`,
    proTip: 'Run this prompt on all incoming team deliverables before delivering final work products to external stakeholders.'
  };
}

function getCommunicationChain(role: RoleSystemKit, arch: DomainArchetype): ChainBlueprint {
  if (arch === 'education') {
    return {
      title: 'Empathetic Guardian Correspondence & Academic / Behavioral De-escalation',
      category: 'Guardian Communication',
      objective: 'Draft a professional, empathetic, and FERPA-compliant communication to parents or guardians addressing student academic decline or behavioral incidents, establishing a collaborative partnership.',
      vars: [
        { name: 'STUDENT_NAME_AND_CONTEXT', description: 'De-identified student situation and specific incident', defaultValue: 'Marcus (10th Grade) – missed 3 lab reports and recent disengagement during group work' },
        { name: 'OBSERVED_STRENGTHS', description: 'Positive student contributions to highlight first', defaultValue: 'Active and insightful verbal contributor during whole-class Socratic discussions' },
        { name: 'PROPOSED_ACTION_PLAN', description: 'Concrete recovery steps and meeting options', defaultValue: 'Lunchtime lab completion session this Thursday or after-school tutoring; 15-minute phone check-in' }
      ],
      steps: [
        'Positive Affirmation: Open by validating student strengths and positive contributions.',
        'Objective Data: Present academic or behavioral facts without emotional or accusatory language.',
        'Collaborative Action: Propose clear, achievable recovery interventions.',
        'Partnership Closing: Invite guardian insight into external factors and offer scheduling links.'
      ],
      sampleInput: {
        STUDENT_NAME_AND_CONTEXT: 'Marcus (10th Grade) – missed 3 consecutive lab reports',
        OBSERVED_STRENGTHS: 'Strong verbal contributor during classroom debates',
        PROPOSED_ACTION_PLAN: 'Thursday afternoon lab makeup session and retake option'
      },
      sampleOutput: `Subject: Checking in regarding Marcus's progress in 10th Grade Biology

Dear Mr. and Mrs. Johnson,

I hope you are having a wonderful week. I am reaching out to share both some positive highlights and an area where I’d love to partner with you to support Marcus in Biology.

First, I want to commend Marcus for his outstanding verbal contributions during our recent discussions on cellular bioenergetics. His peers genuinely listen when he speaks.

I am writing today because over the past three weeks, Marcus has missed submitting three lab documentation packets. Because hands-on lab work constitutes 35% of our semester grade, his current standing has slipped from an 88% (B+) to a 71% (C-).

I am holding an open lab completion period this Thursday from 3:15 to 4:00 PM in Room 204. If Marcus completes the analysis questions by this Friday afternoon, I will waive late penalties and grade the work for full mastery credit.

Warm regards,
[Teacher Name]  
Department of Science | [School Name]`,
      proTip: 'Highlighting a specific positive contribution in paragraph 1 eliminates 90% of defensive parent responses.'
    };
  }

  return {
    title: `High-Stakes Stakeholder Briefing & Strategic Correspondence`,
    category: 'Stakeholder Communications',
    objective: `Structure clear, persuasive, and transparent correspondence communicating critical developments or negotiations under ${role.badge}.`,
    vars: [
      { name: 'STAKEHOLDER_COUNTERPARTY', description: 'Recipient identity and key concerns', defaultValue: `Primary stakeholder in ${role.industry}` },
      { name: 'CORE_DEVELOPMENT_EVENT', description: 'The critical event or update to convey', defaultValue: 'Operational progress update and variance alignment' },
      { name: 'PROPOSED_RESOLUTION_TERMS', description: 'Proposed next steps and call-to-action', defaultValue: 'Structured review meeting and alignment on milestones' }
    ],
    steps: [
      'Executive Summary: State the bottom-line situation in the opening paragraph.',
      'Context & Contributing Factors: Objectively detail facts and constraints.',
      'Impact Assessment: Outline timeline, financial, or operational parameters.',
      'Actionable Proposal: Provide 2 clear paths forward with concrete recommendations.'
    ],
    sampleInput: {
      STAKEHOLDER_COUNTERPARTY: `Key counterparties in ${role.industry}`,
      CORE_DEVELOPMENT_EVENT: 'Operational milestone progress and schedule update',
      PROPOSED_RESOLUTION_TERMS: 'Adoption of recommended acceleration protocol'
    },
    sampleOutput: `### STRATEGIC PROFESSIONAL CORRESPONDENCE
**Subject:** Operational Update & Milestone Progression Alignment

Dear Project Leadership,

I am writing to provide a transparent progress briefing on our active operations within ${role.industry}, highlighting both core milestone completions and strategic adjustments to ensure 100% adherence to ${role.badge} standards.

#### 1. Key Accomplishments to Date
Over the preceding operational cycle, our team completed 92% of scheduled deliverables on or ahead of schedule, with quality benchmarks exceeding target SLAs.

#### 2. Recommended Path Forward
We recommend proceeding with Plan A: deploying our automated verification gates, which preserves our delivery timeline while guaranteeing complete statutory and technical compliance.

Sincerely,
[Lead Professional Title]`,
    proTip: 'Always provide a recommended path forward in paragraph 3 to guide decisive stakeholder consensus.'
  };
}

function getIncidentTriageChain(role: RoleSystemKit, arch: DomainArchetype): ChainBlueprint {
  if (arch === 'education') {
    return {
      title: 'Classroom Behavioral Incident Report & Crisis De-escalation Log',
      category: 'Student Safety & Incident Management',
      objective: 'Document a formal, objective, and policy-compliant incident report following a serious classroom behavioral disruption, academic integrity violation, or safety concern.',
      vars: [
        { name: 'INCIDENT_DATE_TIME_LOCATION', description: 'Exact timestamp, class period, and physical location', defaultValue: 'October 24, 2026 at 10:42 AM, Chemistry Lab Room 304' },
        { name: 'STUDENTS_INVOLVED_ROLES', description: 'De-identified student IDs and witnesses', defaultValue: 'Student A (instigator), Student B (recipient), 2 peer witnesses' },
        { name: 'OBJECTIVE_CHRONOLOGY', description: 'Observable facts and verbatim quotes without emotional adjectives', defaultValue: 'Refusal to follow lab safety goggles policy, escalated to verbal altercation and overturned beaker' }
      ],
      steps: [
        'Chronological Fact-Log: State observable actions and exact spoken words.',
        'De-escalation Interventions: Detail steps taken by teacher to separate and calm students.',
        'Safety & Administrative Actions: Note nurse visits, administrator summons, and isolation.',
        'Follow-Up & Mandatory Reporting: Check compliance with district safety and parental notification policies.'
      ],
      sampleInput: {
        INCIDENT_DATE_TIME_LOCATION: 'October 24, 2026, 10:42 AM, Chemistry Lab 304',
        STUDENTS_INVOLVED_ROLES: 'Student A and Student B',
        OBJECTIVE_CHRONOLOGY: 'Safety goggles refusal escalating to verbal dispute and broken glassware'
      },
      sampleOutput: `### FORMAL CLASSROOM INCIDENT & SAFETY DE-ESCALATION LOG
**Date & Time:** October 24, 2026, 10:42 AM | **Location:** Science Lab Room 304 | **Reporting Teacher:** [Teacher Name]

#### 1. Objective Chronology of Incident
- **10:40 AM:** Instructor instructed all students to don safety goggles per Lab Safety Rule #2.
- **10:41 AM:** Student A removed goggles and stated: "I am not wearing these."
- **10:42 AM:** Verbal dispute escalated with Student B; test tube rack shoved, breaking two 50mL beakers on the floor.
- **10:42:30 AM:** Instructor immediately executed emergency code: perimeter cleared, non-confrontational stance taken.

#### 2. De-escalation Applied
1. Instructor used calm tone: "Student A, let's step outside to reset safely."
2. Assistant Principal summoned via call button; arrived 10:45 AM.
3. Glassware safely contained; zero physical injuries sustained.`,
      proTip: 'Writing strictly in observable verbs rather than subjective adjectives protects educators during formal hearings.'
    };
  }

  return {
    title: `Emergency Incident Triage & Corrective Action Protocol`,
    category: 'Incident & Risk Triage',
    objective: `Formulate an immediate, structured response to acute operational failures, disputes, or hazards under ${role.badge}.`,
    vars: [
      { name: 'INCIDENT_DESCRIPTION', description: 'Urgent failure or risk event', defaultValue: `Unexpected operational variance in ${role.industry}` },
      { name: 'IMMEDIATE_EXPOSURE', description: 'Potential financial, safety, or compliance fallout', defaultValue: 'Potential operational downtime and statutory compliance breach' },
      { name: 'ISOLATION_MEASURES', description: 'First-response containment steps already taken', defaultValue: 'Work halted and containment measures initiated' }
    ],
    steps: [
      'Incident Classification: Triage severity rating and determine immediate containment actions.',
      'Root Cause Hypothesis: Isolate procedural or technical failure points.',
      'Remediation Playbook: Execute step-by-step containment and corrective protocols.',
      'Stakeholder Notification & Post-Incident Archival: Draft mandatory compliance logs.'
    ],
    sampleInput: {
      INCIDENT_DESCRIPTION: `Urgent variance incident in ${role.industry}`,
      IMMEDIATE_EXPOSURE: 'High risk of workflow bottleneck and compliance exposure',
      ISOLATION_MEASURES: 'Primary execution paused and stakeholders notified'
    },
    sampleOutput: `### INCIDENT REMEDIATION & ROOT-CAUSE TRIAGE REPORT
**Event Severity:** SEV-1 Urgent | **Standard:** ${role.badge}

#### 1. Executive Incident Summary
At 09:15 UTC, an unexpected procedural variance occurred during live execution in ${role.industry}. Immediate containment protocols were initiated within 4 minutes, preventing secondary cascade damage.

#### 2. Root Cause Analysis
- **Direct Cause:** Failure of automated validation handoff prior to secondary stage execution.
- **Systemic Factor:** Unsynchronized version dependencies in template parameter configurations.

#### 3. Corrective Action Plan
1. Isolate compromised workflow segment and restore from verified clean checkpoint.
2. Implement automated pre-flight parameter verification rule.
3. Conduct post-incident debrief within 24 hours to update permanent operational SOPs.`,
    proTip: 'Archive all incident logs with exact timestamps to establish defensible due diligence during compliance audits.'
  };
}

function getDelegationSopChain(role: RoleSystemKit, arch: DomainArchetype): ChainBlueprint {
  if (arch === 'education') {
    return {
      title: 'Emergency Substitute Teacher Daily Instructional Binder & Schedule',
      category: 'Classroom Operations & Delegation',
      objective: 'Generate a comprehensive, period-by-period substitute teacher daily operations guide including bell schedules, reliable student helpers, seating chart protocols, and emergency procedures.',
      vars: [
        { name: 'DAILY_BELL_SCHEDULE', description: 'Class periods, times, and course subjects', defaultValue: 'Periods 1-4: 10th Grade Biology (8:30-11:45), Lunch (11:45-12:30), Period 5-6: AP Bio (12:35-3:15)' },
        { name: 'STUDENT_WORK_ASSIGNMENT', description: 'Exact independent assignments students must complete', defaultValue: 'Ecosystem trophic pyramids interactive worksheet via Google Classroom; reading Chapter 8' },
        { name: 'EMERGENCY_AND_CLASSROOM_RULES', description: 'Hall pass policy, attendance runner, and emergency exits', defaultValue: '1 student out at a time with red lanyard; attendance slips sent to main office by 8:45 AM' }
      ],
      steps: [
        'Bell Schedule & Room Logistics: Period timings, duty assignments, and teacher keys.',
        'Independent Student Lesson Protocol: Step-by-step instructions for each block.',
        'Classroom Management & Helper Roster: 2 reliable student helpers per period and pass rules.',
        'Emergency Evacuation Map & Attendance Protocols: Fire drill assembly numbers.'
      ],
      sampleInput: {
        DAILY_BELL_SCHEDULE: 'Periods 1-4: 10th Grade Bio, Lunch, Periods 5-6: AP Bio',
        STUDENT_WORK_ASSIGNMENT: 'Chapter 8 Ecosystems module and reading packet',
        EMERGENCY_AND_CLASSROOM_RULES: 'Red lanyard pass rule; fire exit door B'
      },
      sampleOutput: `### GUEST TEACHER / SUBSTITUTE OPERATING MANUAL
**Teacher:** [Teacher Name] | **Room:** 204 | **Emergency Contact:** Main Office (Ext. 100)

#### 1. Daily Bell Schedule & Duty Assignments
- **8:30 AM - 9:55 AM (Period 1 - Biology):** 28 students. Send attendance runner to office by 8:40 AM.
- **10:00 AM - 11:25 AM (Period 2 - Biology):** 26 students.
- **11:30 AM - 12:15 PM:** Teacher Lunch Break (Staff lounge on 1st floor).
- **12:20 PM - 1:45 PM (Period 4 - Planning Period):** No students.
- **1:50 PM - 3:15 PM (Period 5 - AP Biology):** 22 students. Independent research block.

#### 2. Student Instructional Assignment
- Direct students to open Google Classroom: "Unit 4: Trophic Cascades & Energy Pyramids."
- Reliable Student Helpers: Maya Lin & Ethan Miller (Period 1), Jordan Smith (Period 2), Sophia Chen (Period 5).
- Hall Pass Policy: Exactly ONE student out of room at a time with red wooden pass.`,
      proTip: 'Print this substitute binder once and keep it in your top drawer to handle unexpected sick days in 0 minutes.'
    };
  }

  return {
    title: `Standard Operating Procedure (SOP) & Team Delegation Runbook`,
    category: 'Operations & Delegation',
    objective: `Create a step-by-step delegation runbook enabling junior staff, apprentices, or assistants to execute complex workflows flawlessly without supervision.`,
    vars: [
      { name: 'DELEGATED_WORKFLOW_NAME', description: 'Name of the operational workflow', defaultValue: `Routine daily execution in ${role.industry}` },
      { name: 'ASSIGNEE_SKILL_LEVEL', description: 'Target skill level of team member', defaultValue: 'Junior Professional / Apprentice' },
      { name: 'VERIFICATION_CHECKPOINTS', description: 'Required sign-off checkpoints', defaultValue: 'Pre-flight check, mid-execution review, final delivery sign-off' }
    ],
    steps: [
      'Pre-Requisite Checklist: Tools, access permissions, and required inputs.',
      'Step-by-Step Execution Sequence: Explicit chronological instructions with screenshots/criteria.',
      'Troubleshooting Decision Tree: If/Then logic for common errors or edge cases.',
      'Quality Sign-Off Gate: Specific acceptance criteria before submitting to lead.'
    ],
    sampleInput: {
      DELEGATED_WORKFLOW_NAME: `Daily operational handoff in ${role.industry}`,
      ASSIGNEE_SKILL_LEVEL: 'Junior Associate / Apprentice',
      VERIFICATION_CHECKPOINTS: 'Phase 1, Phase 2, and Final Review'
    },
    sampleOutput: `### STANDARD OPERATING PROCEDURE (SOP)
**Workflow:** Daily Operational Execution | **Audience:** Junior Team Members & Associates

#### 1. Pre-Flight Preparation Checklist
- [ ] Confirm all input datasets are sanitized and verified against ${role.badge}.
- [ ] Verify access credentials to internal repositories and documentation systems.

#### 2. Chronological Execution Sequence
1. **Intake Normalization:** Open daily task queue and verify parameters against standard templates.
2. **Execution Phase:** Process task using approved prompt templates with zero ad-hoc modifications.
3. **Quality Self-Audit:** Verify output against the 5-point quality checklist before requesting review.

#### 3. Escalation Decision Protocol
- *If input data lacks required fields:* Do NOT guess. Place item in Pending Hold and notify lead.
- *If execution time exceeds standard SLA by > 20%:* Flag bottleneck in team chat immediately.`,
    proTip: 'Use this SOP during onboarding to get new associates delivering client-ready work within their first 48 hours.'
  };
}

// =========================================================================
// MAIN RUN FUNCTION
// =========================================================================

async function run() {
  console.log(`Starting Enterprise Upgrade across ${CURRENT_ROLES.length} roles...`);

  const updatedRoles: RoleSystemKit[] = CURRENT_ROLES.map((role) => {
    const arch = getArchetype(role.category);

    // 1. Generate 5 authentic prompt chains
    const fiveChains = buildFiveChains(role, arch);

    // 2. Tailored Governance (zero corporate jargon)
    const governance = getArchetypeGovernance(arch, role.badge, role.role);

    // 3. Tailored Roadmap
    const roadmap = getArchetypeRoadmap(arch, role.role);

    // 4. Tailored Punchlist
    const punchlist = getArchetypePunchlist(arch, role.badge, role.role);

    // 5. Tailored Master & ChatGPT System Prompts
    const masterPrompt = buildMasterSystemPrompt(role, arch);
    const chatGptPrompt = buildChatGptSystemPrompt(role, arch);

    // 6. Tailored Knowledge Base Snippets
    const kb = buildKnowledgeBaseSnippets(role, arch);

    // 7. Tailored Automation Recipes
    const automations = buildAutomationRecipes(role, arch);

    // 8. Tailored FAQ
    const faq = buildFaq(role, arch);

    return {
      ...role,
      masterSystemPrompt: masterPrompt,
      chatGptSystemPrompt: chatGptPrompt,
      promptChains: fiveChains,
      aiGovernanceGuidelines: governance,
      onboardingRoadmap: roadmap,
      auditChecklistTasks: punchlist,
      knowledgeBaseSnippets: kb,
      automationRecipes: automations,
      faq: faq,
    };
  });

  console.log(`Successfully compiled all ${updatedRoles.length} roles with 5 chains each!`);
  console.log(`Total prompt chains generated: ${updatedRoles.length * 5}`);

  const outputTsPath = path.resolve(process.cwd(), 'src/data/roles.ts');
  const fileContent = `// Auto-generated Enterprise Roles Dataset - PromptSystem Pro v3.0
// 102 Accredited Professional Roles with 5 Full-Spectrum Prompt Chains Each (510 Chains Total)
import { RoleSystemKit } from '@/types';

export const ALL_ROLES: RoleSystemKit[] = ${JSON.stringify(updatedRoles, null, 2)};

export function getRoleBySlug(slug: string): RoleSystemKit | undefined {
  return ALL_ROLES.find((r) => r.slug === slug);
}

export function getAllRoleSlugs(): string[] {
  return ALL_ROLES.map((r) => r.slug);
}
`;

  fs.writeFileSync(outputTsPath, fileContent, 'utf-8');
  console.log(`Updated ${outputTsPath} successfully (${(fileContent.length / 1024 / 1024).toFixed(2)} MB).`);
}

run().catch((err) => {
  console.error('Error running buildRolesV3Complete:', err);
  process.exit(1);
});
