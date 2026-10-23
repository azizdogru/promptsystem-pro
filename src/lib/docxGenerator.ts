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

export async function generateRoleDocx(kit: RoleSystemKit): Promise<Uint8Array> {
  const primaryNavy = '0F172A';
  const secondaryNavy = '1E293B';
  const slate600 = '475569';
  const emerald600 = '059669';
  const amber700 = 'B45309';

  const doc = new Document({
    creator: 'PromptSystem Pro Enterprise AI Suite',
    title: `${kit.role} - AI Operating System & Master Prompt Playbook`,
    description: `Complete production prompt chains and AI operating workflows for ${kit.role}.`,
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
                    text: `${kit.role.toUpperCase()} • AI OPERATING SYSTEM PLAYBOOK`,
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
          // Cover Page
          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: '[ENTERPRISE WORKSPACE / FIRM NAME HERE]',
                bold: true,
                size: 24,
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
                text: `Standard Version 2026.1 • Regulatory Accreditation: ${kit.badge}`,
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
                          new TextRun({ text: 'Weekly Time Saved:', bold: true, size: 20 }),
                          new TextRun({ text: ` ~${kit.hoursSavedWeekly} Hours / Week`, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Estimated Monthly Value:', bold: true, size: 20 }),
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
                text: 'COMMERCIAL LICENSE & CONFIDENTIALITY NOTICE:\nThis AI Operating System, proprietary system prompt architectures, and multi-step prompt chains are licensed exclusively for internal commercial operations. Unauthorized redistribution or public disclosure is prohibited under international copyright laws.',
                italics: true,
                size: 18,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          // PART I: Master System Prompt
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART I: CLAUDE PROJECT & CUSTOM GPT MASTER SYSTEM PROMPT',
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
                text: 'Paste the following XML-structured system instructions into your Claude Project "Custom Instructions" or Custom GPT "Instructions" field to align the AI model with your professional standards.',
                size: 20,
                color: slate600,
                font: 'Calibri',
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 80, after: 240 },
            children: [
              new TextRun({
                text: kit.masterSystemPrompt,
                font: 'Courier New',
                size: 18,
                color: secondaryNavy,
              }),
            ],
          }),

          // PART II: Prompt Chains
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART II: PRODUCTION PROMPT CHAINS & MULTI-STEP WORKFLOWS',
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
              spacing: { before: 300, after: 60 },
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
                  text: `Category: ${chain.category}  |  Recommended Model: ${chain.recommendedModel}  |  Complexity: ${chain.complexity}`,
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
                new TextRun({ text: 'Core Business Objective: ', bold: true, size: 20 }),
                new TextRun({ text: chain.objective, size: 20 }),
              ],
            }),
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [
                new TextRun({ text: 'Execution Chain-of-Thought Steps:', bold: true, size: 20 }),
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
          ]),

          // PART III: Automation
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'PART III: AUTOMATION RECIPES & INTEGRATION ARCHITECTURE',
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

          // PART IV: Commercial License Sign-off
          new Paragraph({
            pageBreakBefore: true,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 180 },
            children: [
              new TextRun({
                text: 'COMMERCIAL ENTERPRISE LICENSE CERTIFICATE',
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
                text: `This document certifies that the purchaser has acquired a perpetual, royalty-free commercial single-seat operating license for the ${kit.role} AI Operating System. The licensee is authorized to utilize all system prompts, prompt chains, and automation workflows across internal commercial operations.`,
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
