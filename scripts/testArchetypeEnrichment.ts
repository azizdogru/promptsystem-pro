import fs from 'fs';
import path from 'path';
import { RoleSystemKit, PromptChain, OnboardingPhase, RoleKnowledgeSnippet, AutomationRecipe, RoleFaqItem } from '../src/types';
import { ALL_ROLES as BASE_ROLES } from '../src/data/roles';

type DomainArchetype = 
  | 'education' 
  | 'trades' 
  | 'hospitality' 
  | 'health_wellness' 
  | 'legal_finance' 
  | 'tech_creative';

function getArchetype(role: RoleSystemKit): DomainArchetype {
  const cat = role.category;
  if (cat === 'Education & Academia') return 'education';
  if (cat === 'Trades & Construction') return 'trades';
  if (cat === 'Culinary & Hospitality') return 'hospitality';
  if (cat === 'Healthcare & Clinical' || cat === 'Fitness & Wellness') return 'health_wellness';
  if (cat === 'Legal & Compliance' || cat === 'Finance & Investment' || cat === 'Real Estate') return 'legal_finance';
  return 'tech_creative';
}

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

console.log('Archetype definitions ready.');
