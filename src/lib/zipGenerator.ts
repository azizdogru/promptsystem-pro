import JSZip from 'jszip';
import { RoleSystemKit } from '@/types';
import { generateRoleDocx } from './docxGenerator';
import { generateRolePdf } from './pdfGenerator';
import { generateRoleMarkdown } from './markdownGenerator';

export async function generateRoleZip(kit: RoleSystemKit): Promise<Uint8Array> {
  const zip = new JSZip();
  const folderName = `${kit.role.replace(/[^a-zA-Z0-9_-]/g, '_')}_AI_Operating_System`;
  const folder = zip.folder(folderName) || zip;

  // 1. Claude System Prompt
  folder.file('01_Claude_Project_System_Prompt.txt', kit.masterSystemPrompt);

  // 2. ChatGPT System Prompt
  folder.file('01_ChatGPT_Custom_GPT_Instructions.txt', kit.chatGptSystemPrompt);

  // 3. Knowledge Base Snippets
  kit.knowledgeBaseSnippets.forEach((kb, idx) => {
    folder.file(`02_Knowledge_Base_${idx + 1}_${kb.fileName}`, kb.content);
  });

  // 4. Markdown Master Playbook
  const mdContent = generateRoleMarkdown(kit);
  folder.file('03_Master_Prompt_Chains_Playbook.md', mdContent);

  // 5. Formatted Microsoft Word Manual
  const docxBytes = await generateRoleDocx(kit);
  folder.file('04_Operations_Manual.docx', docxBytes);

  // 6. Vector PDF Executive Cheat Sheet
  const pdfBytes = generateRolePdf(kit);
  folder.file('05_Executive_Protocol_Cheatsheet.pdf', pdfBytes);

  // 7. Commercial License Agreement
  const licenseText = `========================================================================
COMMERCIAL OPERATING LICENSE CERTIFICATE & USAGE TERMS
PromptSystem Pro Enterprise AI Systems
========================================================================
License ID: #LIC-PROMPT-ENTERPRISE-2026-ACTIVE
Licensed Entity: Single-Seat Commercial Operating Licensee
Role System: ${kit.role} (${kit.industry})
Accredited Standard: ${kit.badge}

1. Grant of License:
Subject to the terms of this Agreement, PromptSystem Pro grants the licensee
a non-exclusive, perpetual, royalty-free commercial operating license to deploy,
execute, and integrate all prompt chains, XML directives, and automation recipes
within the licensee's internal business operations.

2. Permitted Use:
- Private professional, institutional, or enterprise AI workspaces (Anthropic Claude, OpenAI, Local LLMs).
- Professional client or organizational work product deliverables generated using these prompt systems.
- Internal API and automated Zapier / Make pipelines.

3. Restrictions:
- Public redistribution, resale, or sublicensing of the raw prompt templates,
  system prompts, or manual files is strictly prohibited under federal trade secret
  and international copyright statutes.

PromptSystem Pro Systems • All Rights Reserved.
`;
  folder.file('06_Commercial_License_Certificate.txt', licenseText);

  const zipContent = await zip.generateAsync({ type: 'uint8array' });
  return zipContent;
}
