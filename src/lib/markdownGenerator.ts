import { RoleSystemKit } from '@/types';

export function generateRoleMarkdown(kit: RoleSystemKit): string {
  const timestamp = new Date().toISOString().split('T')[0];

  return `# ${kit.role} — AI Operating System & Master Prompt Playbook
**Version:** 2026.1 • **Accreditation:** ${kit.badge} • **Generated:** ${timestamp}
**Commercial License:** Commercial Operating License Granted to Licensee.

---

## 🎯 Executive Overview
${kit.overview}

- **Target Professional Role:** ${kit.role}
- **Industry Vertical:** ${kit.industry} (${kit.category})
- **Typical Weekly Time Saved:** ${kit.hoursSavedWeekly} Hours
- **Estimated Monthly Value Created:** $${kit.monthlyValueCreated.toLocaleString()} (at $${kit.averageHourlyRate}/hr)

---

## 🏛️ PART I: CLAUDE PROJECT & CUSTOM GPT MASTER SYSTEM PROMPT

Copy and paste the following XML system prompt into the **Custom Instructions** or **System Prompt** field in Claude Projects or ChatGPT Custom GPT.

\`\`\`xml
${kit.masterSystemPrompt}
\`\`\`

---

## ⚡ PART II: PRODUCTION PROMPT CHAINS (MULTI-STEP WORKFLOWS)

${kit.promptChains
  .map(
    (chain, idx) => `### [${chain.id}] ${chain.title}
- **Category:** ${chain.category}
- **Objective:** ${chain.objective}
- **Recommended AI Model:** ${chain.recommendedModel}
- **Complexity:** ${chain.complexity} (Est. ${chain.estimatedTokens} Tokens)

#### 1. Input Variables & Parameters
${chain.variables.map((v) => `- \`{{${v.name}}}\`: ${v.description} *(Default: "${v.defaultValue}")*`).join('\n')}

#### 2. Chain-of-Thought Execution Steps
${chain.chainSteps.map((step, sIdx) => `${sIdx + 1}. ${step}`).join('\n')}

#### 3. Ready-to-Deploy Production Prompt
\`\`\`xml
${chain.fullPrompt}
\`\`\`

#### 4. Verified Sample Work Product Output
> ${chain.sampleOutput.split('\n').join('\n> ')}

*Pro Tip: ${chain.practicalUseNote}*

---`
  )
  .join('\n\n')}

## 🔄 PART III: AUTOMATION & API RECIPES

${kit.automationRecipes
  .map(
    (recipe, rIdx) => `### Workflow ${rIdx + 1}: ${recipe.title}
- **Tooling Stack:** ${recipe.tooling}
- **System Trigger:** ${recipe.trigger}

**Implementation Pipeline:**
${recipe.executionSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

**Expected Automated Deliverable:**
${recipe.expectedOutput}

---`
  )
  .join('\n\n')}

## 📚 PART IV: CLAUDE PROJECT KNOWLEDGE BASE FILES

${kit.knowledgeBaseSnippets
  .map(
    (kb) => `### File: \`${kb.fileName}\`
*Purpose: ${kb.purpose}*

\`\`\`markdown
${kb.content}
\`\`\`

---`
  )
  .join('\n\n')}

## ⚖️ COMMERCIAL LICENSE & USAGE TERMS
This prompt system and its associated intellectual property are licensed for internal commercial business use. The licensee is authorized to utilize, adapt, and deploy these prompts within enterprise AI workspaces (Anthropic Claude, OpenAI ChatGPT, local LLMs). Resale or public redistribution of the raw source files is strictly prohibited.
`;
}
