import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Packer,
  Header,
  Footer,
  PageNumber,
} from 'docx';
import { RoleSystemKit } from '@/types';

function getDomainStandardLabel(category: RoleSystemKit['category']): string {
  switch (category) {
    case 'Education & Academia':
      return 'Curricular & Pedagogical Framework';
    case 'Trades & Construction':
      return 'Building Code & Trade Licensure Standard';
    case 'Culinary & Hospitality':
      return 'Food Safety & Culinary Hospitality Standard';
    case 'Healthcare & Clinical':
    case 'Fitness & Wellness':
      return 'Clinical Protocol & Health Practice Standard';
    case 'Legal & Compliance':
      return 'Professional Ethics & Bar Standards';
    case 'Finance & Investment':
      return 'Financial Accounting & Statutory Standard';
    case 'Real Estate':
      return 'Real Estate Standards & Licensure Framework';
    case 'Engineering & Tech':
    case 'Marketing & Growth':
    case 'Creative Arts & Media':
    case 'E-Commerce & Retail':
    case 'Executive & Strategy':
    default:
      return 'Accredited Professional Operating Standard';
  }
}

function getAccountableLeadTitle(category: RoleSystemKit['category']): string {
  switch (category) {
    case 'Education & Academia':
      return 'Department Chair & Lead Educator';
    case 'Trades & Construction':
      return 'Site Superintendent & Licensed Master Contractor';
    case 'Culinary & Hospitality':
      return 'Executive Chef & Operations Director';
    case 'Healthcare & Clinical':
      return 'Clinical Director & Attending Practitioner';
    case 'Fitness & Wellness':
      return 'Head Strength Coach & Studio Director';
    case 'Legal & Compliance':
      return 'Managing Partner & Senior Counsel';
    case 'Finance & Investment':
      return 'Managing Director & Senior Controller';
    case 'Real Estate':
      return 'Principal Broker & Managing Director';
    case 'Engineering & Tech':
      return 'Staff Systems Architect & VP of Engineering';
    case 'Marketing & Growth':
      return 'Growth Director & Head of Marketing';
    case 'Creative Arts & Media':
      return 'Executive Creative Director';
    case 'Executive & Strategy':
      return 'Chief Executive Officer & Board Director';
    default:
      return 'Lead Professional & Practice Director';
  }
}

function getWorkplaceContextName(category: RoleSystemKit['category']): string {
  switch (category) {
    case 'Education & Academia':
      return 'ACADEMIC DEPARTMENT & CLASSROOM OPERATIONS';
    case 'Trades & Construction':
      return 'JOB SITE OPERATIONS & CONTRACTING PRACTICE';
    case 'Culinary & Hospitality':
      return 'COMMERCIAL KITCHEN & HOSPITALITY BRIGADE';
    case 'Healthcare & Clinical':
      return 'CLINICAL PRACTICE & PATIENT CARE FACILITY';
    case 'Fitness & Wellness':
      return 'TRAINING FACILITY & ATHLETIC COACHING PRACTICE';
    case 'Legal & Compliance':
      return 'LEGAL PRACTICE & MATTER MANAGEMENT';
    case 'Finance & Investment':
      return 'CORPORATE FINANCE & ADVISORY PRACTICE';
    case 'Real Estate':
      return 'COMMERCIAL BROKERAGE & ASSET OPERATIONS';
    case 'Engineering & Tech':
      return 'PRODUCTION ENGINEERING & INFRASTRUCTURE ORG';
    case 'Creative Arts & Media':
      return 'CREATIVE STUDIO & PRODUCTION PRACTICE';
    default:
      return 'PROFESSIONAL OPERATING PRACTICE';
  }
}

export async function generateRoleDocx(kit: RoleSystemKit): Promise<Uint8Array> {
  const primaryNavy = '0F172A'; // Slate 900
  const secondaryNavy = '1E293B'; // Slate 800
  const slate600 = '475569';
  const emerald600 = '059669';
  const amber700 = 'B45309';

  const doc = new Document({
    creator: 'PromptSystem Pro Enterprise AI Systems',
    title: `${kit.role} - AI Operating System & Master Prompt Playbook`,
    description: `Complete enterprise production prompt chains and AI operating workflows for ${kit.role}.`,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${kit.role.toUpperCase()} • ENTERPRISE AI OPERATING MANUAL`,
                    size: 16,
                    color: slate600,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `Confidential - Licensed For Enterprise Operating Use Only • `,
                    size: 16,
                    color: slate600,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: slate600,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // ==========================================
          // COVER PAGE
          // ==========================================
          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: `PROMPTSYSTEM PRO ENTERPRISE AI • ${getWorkplaceContextName(kit.category)}`,
                bold: true,
                size: 20,
                color: emerald600,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.TITLE,
            spacing: { before: 180, after: 240 },
            children: [
              new TextRun({
                text: `${kit.role}\nAI Operating System & Master Prompt Playbook`,
                bold: true,
                size: 38,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 120, after: 360 },
            children: [
              new TextRun({
                text: `Operational Version 2026.2 • ${getDomainStandardLabel(kit.category)}: ${kit.badge}`,
                italics: true,
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          // Overview Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Professional Role:', bold: true, size: 20 }),
                          new TextRun({ text: ` ${kit.role}`, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Industry Sector:', bold: true, size: 20 }),
                          new TextRun({ text: ` ${kit.industry}`, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Weekly Time Reclaimed:', bold: true, size: 20 }),
                          new TextRun({ text: ` ~${kit.hoursSavedWeekly} Hours / Week`, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Monthly Economic Value:', bold: true, size: 20 }),
                          new TextRun({ text: ` $${kit.monthlyValueCreated.toLocaleString()} / Month`, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 360, after: 240 },
            children: [
              new TextRun({
                text: 'COMMERCIAL LICENSE & CONFIDENTIALITY NOTICE:\nThis AI Operating System, proprietary system prompt architectures, and multi-step prompt chains are licensed exclusively for internal commercial operations. Unauthorized redistribution or public disclosure is strictly prohibited under international copyright laws.',
                italics: true,
                size: 18,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          // ==========================================
          // PART I: EXECUTIVE OVERVIEW & ARCHITECTURE
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART I: EXECUTIVE OVERVIEW & OPERATIONAL ARCHITECTURE',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({
                text: kit.overview,
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: 'Primary AI Model Architecture: ', bold: true, size: 20 }),
              new TextRun({ text: 'Optimized for Frontier LLMs with Advanced Reasoning (tested across Anthropic Claude 3.5 Sonnet / Claude Opus XML project environments, OpenAI GPT-4o / o1-series Custom GPTs, and Enterprise Private LLMs).', size: 20 }),
            ],
          }),

          // ==========================================
          // PART II: AI GOVERNANCE & PRIVACY GUARDRAILS
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART II: ENTERPRISE AI GOVERNANCE & DATA PRIVACY GUARDRAILS',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({
                text: 'Before deploying generative AI in professional practice, all staff and practitioners must strictly observe the following mandatory governance rules to eliminate data exfiltration and liability exposure.',
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.aiGovernanceGuidelines.map(
            (rule, rIdx) =>
              new Paragraph({
                spacing: { before: 40, after: 40 },
                indent: { left: 360 },
                children: [
                  new TextRun({ text: `RULE ${rIdx + 1}: `, bold: true, size: 20, color: amber700 }),
                  new TextRun({ text: rule, size: 20 }),
                ],
              })
          ),

          new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({ text: 'Anti-Hallucination Protocol: ', bold: true, size: 20, color: primaryNavy }),
              new TextRun({
                text: 'All prompt chains in this manual enforce negative refusal constraints: if source inputs lack required context, the model must output [INSUFFICIENT CONTEXT] rather than fabricating statutory citations or quantitative metrics.',
                size: 20,
              }),
            ],
          }),

          // ==========================================
          // PART III: MASTER SYSTEM PROMPTS (CLAUDE & CHATGPT)
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART III: MASTER SYSTEM PROMPTS (CLAUDE & CHATGPT)',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({
                text: 'A. Anthropic Claude Projects System Directive (XML Architecture)',
                bold: true,
                size: 22,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 40, after: 120 },
            children: [
              new TextRun({
                text: kit.masterSystemPrompt,
                font: 'Courier New',
                size: 17,
                color: secondaryNavy,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 60 },
            children: [
              new TextRun({
                text: 'B. OpenAI ChatGPT Custom GPT Instructions (Markdown Format)',
                bold: true,
                size: 22,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 40, after: 180 },
            children: [
              new TextRun({
                text: kit.chatGptSystemPrompt,
                font: 'Courier New',
                size: 17,
                color: secondaryNavy,
              }),
            ],
          }),

          // ==========================================
          // PART IV: PRODUCTION PROMPT CHAINS
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART IV: PRODUCTION PROMPT CHAINS & MULTI-STEP WORKFLOWS',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.promptChains.flatMap((chain) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 280, after: 60 },
              children: [
                new TextRun({
                  text: `[${chain.id}] ${chain.title}`,
                  bold: true,
                  size: 22,
                  color: primaryNavy,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 80 },
              children: [
                new TextRun({
                  text: `Category: ${chain.category}  |  Recommended Model: ${chain.recommendedModel}  |  Complexity: ${chain.complexity}  |  Tokens: ~${chain.estimatedTokens}`,
                  bold: true,
                  size: 18,
                  color: emerald600,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 40, after: 40 },
              children: [
                new TextRun({ text: 'Core Professional Objective: ', bold: true, size: 20 }),
                new TextRun({ text: chain.objective, size: 20 }),
              ],
            }),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [
                new TextRun({ text: 'Sequential Execution Steps:', bold: true, size: 20 }),
              ],
            }),
            ...chain.chainSteps.map(
              (step) =>
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  indent: { left: 360 },
                  children: [
                    new TextRun({ text: '• ', bold: true, size: 20, color: emerald600 }),
                    new TextRun({ text: step, size: 20 }),
                  ],
                })
            ),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [
                new TextRun({ text: 'Input Variables & Parameters:', bold: true, size: 20 }),
              ],
            }),
            ...chain.variables.map(
              (v) =>
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  indent: { left: 360 },
                  children: [
                    new TextRun({ text: `{{${v.name}}}: `, bold: true, size: 19, color: amber700 }),
                    new TextRun({ text: `${v.description} (Default: "${v.defaultValue}")`, size: 19 }),
                  ],
                })
            ),
            new Paragraph({
              spacing: { before: 80, after: 40 },
              children: [
                new TextRun({ text: 'Production Prompt Template (XML):', bold: true, size: 20 }),
              ],
            }),
            new Paragraph({
              spacing: { before: 20, after: 80 },
              children: [
                new TextRun({
                  text: chain.fullPrompt,
                  font: 'Courier New',
                  size: 17,
                  color: secondaryNavy,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [
                new TextRun({ text: 'Verified Work Product Sample Output: ', bold: true, size: 19 }),
              ],
            }),
            new Paragraph({
              spacing: { before: 20, after: 120 },
              children: [
                new TextRun({
                  text: chain.sampleOutput,
                  italics: true,
                  size: 18,
                  color: slate600,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 40, after: 200 },
              children: [
                new TextRun({ text: 'Implementation Pro Tip: ', bold: true, size: 18, color: emerald600 }),
                new TextRun({ text: chain.practicalUseNote, size: 18 }),
              ],
            }),
          ]),

          // ==========================================
          // PART V: CLAUDE PROJECT KNOWLEDGE BASE FILES
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART V: CLAUDE PROJECT KNOWLEDGE BASE TRANSCRIPTS',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({
                text: 'Upload these institutional knowledge files into the "Project Knowledge" section of Claude Projects to equip the model with domain reference standards.',
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.knowledgeBaseSnippets.flatMap((kb) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 60 },
              children: [
                new TextRun({
                  text: `File: ${kb.fileName}`,
                  bold: true,
                  size: 22,
                  color: primaryNavy,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 60 },
              children: [
                new TextRun({ text: `Purpose: ${kb.purpose}`, italics: true, size: 18, color: emerald600 }),
              ],
            }),
            new Paragraph({
              spacing: { before: 20, after: 160 },
              children: [
                new TextRun({
                  text: kb.content,
                  font: 'Courier New',
                  size: 17,
                  color: secondaryNavy,
                }),
              ],
            }),
          ]),

          // ==========================================
          // PART VI: AUTOMATION & INTEGRATION RECIPES
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART VI: AUTOMATION & API INTEGRATION RECIPES',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.automationRecipes.flatMap((recipe) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 60 },
              children: [
                new TextRun({
                  text: recipe.title,
                  bold: true,
                  size: 22,
                  color: primaryNavy,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 60 },
              children: [
                new TextRun({
                  text: `Tooling Stack: ${recipe.tooling}  |  Trigger: ${recipe.trigger}`,
                  bold: true,
                  size: 18,
                  color: emerald600,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 40, after: 40 },
              children: [
                new TextRun({ text: 'Pipeline Execution Sequence:', bold: true, size: 20 }),
              ],
            }),
            ...recipe.executionSteps.map(
              (s) =>
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  indent: { left: 360 },
                  children: [
                    new TextRun({ text: '→ ', bold: true, size: 20, color: amber700 }),
                    new TextRun({ text: s, size: 20 }),
                  ],
                })
            ),
            new Paragraph({
              spacing: { before: 60, after: 160 },
              children: [
                new TextRun({ text: 'Expected Automated Outcome: ', bold: true, size: 20 }),
                new TextRun({ text: recipe.expectedOutput, size: 20 }),
              ],
            }),
          ]),

          // ==========================================
          // PART VII: 30-60-90 DAY ADOPTION ROADMAP
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART VII: 30-60-90 DAY PROFESSIONAL AI ADOPTION ROADMAP',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.onboardingRoadmap.flatMap((phase) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 60 },
              children: [
                new TextRun({
                  text: phase.window,
                  bold: true,
                  size: 22,
                  color: primaryNavy,
                  font: 'Calibri',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 60 },
              children: [
                new TextRun({ text: 'Phase Objective: ', bold: true, size: 20 }),
                new TextRun({ text: phase.objective, size: 20 }),
              ],
            }),
            ...phase.deliverables.map(
              (del) =>
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  indent: { left: 360 },
                  children: [
                    new TextRun({ text: '[  ]  ', bold: true, size: 20, color: emerald600 }),
                    new TextRun({ text: del, size: 20 }),
                  ],
                })
            ),
            new Paragraph({
              spacing: { before: 40, after: 160 },
              children: [
                new TextRun({ text: 'Evaluation Benchmark: ', bold: true, size: 19, color: secondaryNavy }),
                new TextRun({ text: phase.evaluationBenchmark, italics: true, size: 19 }),
              ],
            }),
          ]),

          // ==========================================
          // PART VIII: WEEKLY PROMPT AUDIT PUNCHLIST
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART VIII: WEEKLY PROMPT AUDIT & QUALITY CONTROL PUNCHLIST',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({
                text: `To ensure rigorous professional execution, quality consistency, and zero hallucination drift, the ${getAccountableLeadTitle(kit.category)} must execute this verification checklist on all AI-assisted deliverables.`,
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          ...kit.auditChecklistTasks.map(
            (task) =>
              new Paragraph({
                spacing: { before: 30, after: 30 },
                indent: { left: 360 },
                children: [
                  new TextRun({ text: '[  ]  ', bold: true, size: 20, color: emerald600 }),
                  new TextRun({ text: task, size: 20 }),
                ],
              })
          ),

          // ==========================================
          // PART IX: COMMERCIAL LICENSE CERTIFICATE
          // ==========================================
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART IX: COMMERCIAL ENTERPRISE LICENSE CERTIFICATE',
                bold: true,
                size: 26,
                color: primaryNavy,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: `This document certifies that the purchaser has acquired a perpetual, royalty-free commercial single-seat operating license for the ${kit.role} AI Operating System. The licensee is authorized to utilize all system prompts, prompt chains, knowledge base templates, and automation workflows across internal professional operations.`,
                size: 20,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({
                text: 'Authorized License Key: #LIC-PROMPT-ENTERPRISE-2026-ACTIVE',
                bold: true,
                size: 20,
                color: emerald600,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer);
}
