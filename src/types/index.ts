export interface PromptVariable {
  name: string;
  description: string;
  defaultValue: string;
  required: boolean;
}

export interface PromptChain {
  id: string;
  title: string;
  category: string;
  objective: string;
  recommendedModel: 'Claude 3.5 Sonnet' | 'GPT-4o' | 'Claude 3.5 Haiku' | 'o1-preview';
  complexity: 'Intermediate' | 'Advanced' | 'Enterprise Multi-Step';
  estimatedTokens: number;
  estimatedCostUsd: number;
  variables: PromptVariable[];
  chainSteps: string[];
  fullPrompt: string;
  chatGptPrompt?: string;
  sampleInput: Record<string, string>;
  sampleOutput: string;
  practicalUseNote: string;
}

export interface AutomationRecipe {
  title: string;
  tooling: string;
  trigger: string;
  executionSteps: string[];
  expectedOutput: string;
}

export interface RoleKnowledgeSnippet {
  fileName: string;
  purpose: string;
  content: string;
}

export interface RoleFaqItem {
  question: string;
  answer: string;
}

export interface OnboardingPhase {
  window: string;
  objective: string;
  deliverables: string[];
  evaluationBenchmark: string;
}

export interface RoleSystemKit {
  slug: string;
  role: string;
  industry: string;
  category:
    | 'Engineering & Tech'
    | 'Legal & Compliance'
    | 'Finance & Investment'
    | 'Real Estate'
    | 'Healthcare & Clinical'
    | 'Marketing & Growth'
    | 'Executive & Strategy'
    | 'E-Commerce & Retail'
    | 'Education & Academia'
    | 'Trades & Construction'
    | 'Culinary & Hospitality'
    | 'Fitness & Wellness'
    | 'Creative Arts & Media';
  headline: string;
  subheadline: string;
  badge: string;
  hoursSavedWeekly: number;
  averageHourlyRate: number;
  monthlyValueCreated: number;
  tags: string[];
  overview: string;
  masterSystemPrompt: string;
  chatGptSystemPrompt: string;
  aiGovernanceGuidelines: string[];
  onboardingRoadmap: OnboardingPhase[];
  auditChecklistTasks: string[];
  promptChains: PromptChain[];
  automationRecipes: AutomationRecipe[];
  knowledgeBaseSnippets: RoleKnowledgeSnippet[];
  faq: RoleFaqItem[];
}
