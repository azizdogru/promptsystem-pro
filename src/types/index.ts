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
  variables: PromptVariable[];
  chainSteps: string[];
  fullPrompt: string;
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

export interface RoleSystemKit {
  slug: string;
  role: string;
  industry: string;
  category: 'Engineering & Tech' | 'Legal & Compliance' | 'Finance & Investment' | 'Real Estate' | 'Healthcare & Clinical' | 'Marketing & Growth' | 'Executive & Strategy' | 'E-Commerce & Retail';
  headline: string;
  subheadline: string;
  badge: string;
  hoursSavedWeekly: number;
  averageHourlyRate: number;
  monthlyValueCreated: number;
  tags: string[];
  overview: string;
  masterSystemPrompt: string;
  promptChains: PromptChain[];
  automationRecipes: AutomationRecipe[];
  knowledgeBaseSnippets: RoleKnowledgeSnippet[];
  faq: RoleFaqItem[];
}
