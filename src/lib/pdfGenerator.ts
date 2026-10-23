import { jsPDF } from 'jspdf';
import { RoleSystemKit } from '@/types';

export function generateRolePdf(kit: RoleSystemKit): Uint8Array {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 32;
  const contentWidth = pageWidth - margin * 2;

  // ==========================================
  // PAGE 1: EXECUTIVE AI PROTOCOL & PROMPT MATRIX
  // ==========================================
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 75, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('EXECUTIVE AI SYSTEM PROTOCOL & CHEAT SHEET', margin, 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Accredited Standard: ${kit.badge} | System Release #AI-${kit.slug.substring(0, 4).toUpperCase()}-2026`,
    margin,
    44
  );
  doc.text(
    `Professional Role: ${kit.role} (${kit.category})`,
    margin,
    58
  );

  let y = 88;

  // Meta Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 42, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Primary Recommended Model: Claude 3.5 Sonnet / GPT-4o', margin + 12, y + 16);
  doc.text(`Estimated Weekly Time Saved: ${kit.hoursSavedWeekly} Hours / Week`, margin + 260, y + 16);
  doc.text(`Monthly Economic Value: $${kit.monthlyValueCreated.toLocaleString()} / Month`, margin + 12, y + 32);
  doc.text('Commercial Status: Authorized Single-Seat License Key Active', margin + 260, y + 32);

  y += 54;

  // Section 1: System Prompt Box
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('CORE CLAUDE PROJECT / CUSTOM GPT SYSTEM PROMPT (EXCERPT)', margin + 8, y + 12);
  y += 24;

  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 90, 'FD');

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  const promptLines = doc.splitTextToSize(kit.masterSystemPrompt, contentWidth - 16);
  doc.text(promptLines.slice(0, 8), margin + 8, y + 14);

  y += 100;

  // Section 2: Prompt Chain Inventory Matrix Table
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PRODUCTION PROMPT CHAINS INVENTORY & VARIABLE DIRECTORY', margin + 8, y + 12);
  y += 22;

  // Table Headers
  const tableHeaders = ['ID', 'Prompt Chain Title', 'Category', 'Recommended Model', 'Complexity'];
  const colWidths = [45, 200, 110, 105, 71];

  let startX = margin;
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);

  tableHeaders.forEach((h, i) => {
    doc.text(h, startX + 4, y + 12);
    startX += colWidths[i];
  });

  y += 18;

  kit.promptChains.slice(0, 6).forEach((chain, rIdx) => {
    const rowHeight = 32;
    doc.setFillColor(rIdx % 2 === 1 ? 248 : 255, rIdx % 2 === 1 ? 250 : 255, rIdx % 2 === 1 ? 252 : 255);
    doc.rect(margin, y, contentWidth, rowHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, rowHeight, 'D');

    // ID
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(chain.id, margin + 4, y + 14);

    // Title
    const titleLines = doc.splitTextToSize(chain.title, colWidths[1] - 8);
    doc.text(titleLines.slice(0, 2), margin + colWidths[0] + 4, y + 12);

    // Category
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(chain.category, margin + colWidths[0] + colWidths[1] + 4, y + 14);

    // Model
    doc.text(chain.recommendedModel, margin + colWidths[0] + colWidths[1] + colWidths[2] + 4, y + 14);

    // Complexity
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(chain.complexity, margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 4, y + 14);

    // Column dividers
    let divX = margin + colWidths[0];
    colWidths.slice(1).forEach((w) => {
      doc.setDrawColor(226, 232, 240);
      doc.line(divX, y, divX, y + rowHeight);
      divX += w;
    });

    y += rowHeight;
  });

  y += 12;

  // Best Practice Box
  doc.setFillColor(254, 243, 199); // Amber 100
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, contentWidth, 42, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14);
  doc.text('PROMPT EXECUTION BEST PRACTICE FOR MAXIMUM ACCURACY:', margin + 10, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text(
    'Always provide full source context inside <source_text> XML tags. Use Claude 3.5 Sonnet for analytical reasoning,',
    margin + 10,
    y + 27
  );
  doc.text(
    'and never execute multiple un-batched tasks in a single prompt turn. Let the model follow sequential steps.',
    margin + 10,
    y + 37
  );

  // Footer Page 1
  y = 770;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, margin + contentWidth, y);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`PromptSystem Pro Enterprise AI Suite | Page 1 of 2 | Governing Standard: ${kit.badge}`, margin, y + 14);
  doc.text('Confidential - Licensed For Enterprise Operating Use Only', margin + 300, y + 14);

  // ==========================================
  // PAGE 2: AUTOMATION & INTEGRATION PLAYBOOK
  // ==========================================
  doc.addPage();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 60, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SECTION II: AUTOMATION WORKFLOWS & API INTEGRATION RECIPES', margin, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Deployment Playbook for ${kit.role} • Zero-Code & API Orchestration Architecture`,
    margin,
    42
  );

  y = 76;

  // Render Automation Recipes
  kit.automationRecipes.forEach((recipe, rIdx) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 80, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Automation ${rIdx + 1}: ${recipe.title}`, margin + 10, y + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Tooling Stack: ${recipe.tooling}`, margin + 10, y + 28);
    doc.text(`Trigger Event: ${recipe.trigger}`, margin + 260, y + 28);

    doc.setFont('helvetica', 'bold');
    doc.text('Execution Steps:', margin + 10, y + 42);

    doc.setFont('helvetica', 'normal');
    recipe.executionSteps.slice(0, 3).forEach((step, sIdx) => {
      doc.text(`• ${step}`, margin + 20, y + 54 + sIdx * 10);
    });

    y += 92;
  });

  // Strict Negative Constraints Box (Anti-Hallucination)
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(248, 113, 113);
  doc.roundedRect(margin, y, contentWidth, 75, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(153, 27, 27);
  doc.text('MANDATORY NEGATIVE CONSTRAINTS & HALLUCINATION DEFENSES:', margin + 10, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(185, 28, 28);
  doc.text('1. Never accept un-cited quantitative claims or synthetic citations in legal, medical, or financial prompts.', margin + 10, y + 30);
  doc.text('2. Enforce explicit refusal protocols: if source documents lack necessary data, model must output [INSUFFICIENT DATA].', margin + 10, y + 42);
  doc.text('3. Always specify target audience, role perspective, and explicit negative constraints before executing queries.', margin + 10, y + 54);
  doc.text('4. Never share confidential company identifiers without de-identification tokens (e.g. [COMPANY_X]).', margin + 10, y + 66);

  y += 88;

  // Commercial License Sign-off
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 70, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('COMMERCIAL LICENSE KEY VERIFICATION & ENTERPRISE SIGN-OFF', margin + 10, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `This operational prompt kit is officially authorized for commercial deployment across internal firm operations.`,
    margin + 10,
    y + 28
  );

  doc.setDrawColor(148, 163, 184);
  doc.line(margin + 10, y + 54, margin + 220, y + 54);
  doc.line(margin + 260, y + 54, margin + 480, y + 54);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Lead Practitioner Verification Signature', margin + 10, y + 64);
  doc.text('License Registration Code: #LIC-PROMPT-2026-OK', margin + 260, y + 64);

  // Footer Page 2
  y = 770;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, margin + contentWidth, y);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`PromptSystem Pro Quality Assurance | Page 2 of 2 | Governing Standard: ${kit.badge}`, margin, y + 14);

  const arrayBuffer = doc.output('arraybuffer');
  return new Uint8Array(arrayBuffer);
}
