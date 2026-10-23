import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Clock,
  DollarSign,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Copy,
  Terminal,
  FileText,
  Workflow,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ALL_ROLES, getRoleBySlug, getAllRoleSlugs } from '@/data/roles';
import PromptSimulator from '@/components/PromptSimulator';
import RoiCalculator from '@/components/RoiCalculator';
import CheckoutButton from '@/components/CheckoutButton';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllRoleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const kit = getRoleBySlug(params.slug);
  if (!kit) return { title: 'Role System Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app';
  const canonicalUrl = `${baseUrl}/${kit.slug}`;

  return {
    title: `${kit.role} — Production AI Prompt Chains & Operating System`,
    description: `Deploy multi-step Chain-of-Thought AI prompt chains, Claude Project knowledge bases, and executive workflow automations for ${kit.role}. Accredited under ${kit.badge}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${kit.role} — Production AI Operating System`,
      description: `Production AI prompt chains, XML Claude instructions, and workflow automations for ${kit.role}. Reclaims ~${kit.hoursSavedWeekly} hours/week.`,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default function RoleDetailPage({ params }: PageProps) {
  const kit = getRoleBySlug(params.slug);
  if (!kit) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app';

  // Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `${kit.role} AI Operating System & Master Prompt Playbook`,
        description: kit.overview,
        offers: {
          '@type': 'Offer',
          price: '19.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/${kit.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: kit.category,
            item: `${baseUrl}/#roles`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: kit.role,
            item: `${baseUrl}/${kit.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: kit.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-3 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/#roles" className="hover:text-emerald-400 transition">
            {kit.category}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium truncate">{kit.role}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_40rem_at_top,theme(colors.emerald.900/15),transparent)]" />
        <div className="mx-auto max-w-5xl">
          {/* Badge & Category */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700">
              {kit.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{kit.badge}</span>
            </span>
          </div>

          {/* Title & Headline */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
            {kit.headline}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {kit.subheadline}
          </p>

          {/* Value Metrics Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Weekly Time Saved</span>
              </span>
              <p className="text-xl font-bold text-white">~{kit.hoursSavedWeekly} Hours / Wk</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                <span>Monthly Value</span>
              </span>
              <p className="text-xl font-bold text-emerald-400">+${kit.monthlyValueCreated.toLocaleString()}/mo</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5 text-purple-400" />
                <span>Recommended Model</span>
              </span>
              <p className="text-base font-bold text-white">Claude 3.5 / GPT-4o</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>License</span>
              </span>
              <p className="text-base font-bold text-white">Commercial Rights</p>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <CheckoutButton
              roleSlug={kit.slug}
              plan="single"
              priceDisplay="$19.00"
              label={`Download ${kit.role} System — $19`}
              sublabel="Instant access to Word (.docx), Markdown (.md), JSON & PDF cheat sheet"
              variant="primary"
              className="w-full sm:w-auto"
            />
            <CheckoutButton
              plan="bundle"
              priceDisplay="$39.00"
              label="Unlock All 50+ Roles Bundle ($39)"
              sublabel="Best value: full library access across all 8 industry verticals"
              variant="secondary"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <PromptSimulator chains={kit.promptChains} roleTitle={kit.role} />
      </section>

      {/* Master System Prompt Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Terminal className="h-4 w-4" />
                <span>System Directive Architecture</span>
              </span>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Master System Prompt for Claude Projects & Custom GPTs
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Paste this into the Custom Instructions field of Claude Projects or ChatGPT to anchor the AI model in your exact professional scope.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-[380px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{kit.masterSystemPrompt}</pre>
          </div>
        </div>
      </section>

      {/* Detailed Prompt Chains Breakdown */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Engineered Workflows
          </span>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-white">
            Included Production Prompt Chains ({kit.promptChains.length} Modules)
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Each chain incorporates real-world variables, sequential reasoning checkpoints, and verified output benchmarks.
          </p>
        </div>

        <div className="space-y-6">
          {kit.promptChains.map((chain, cIdx) => (
            <div
              key={chain.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30">
                      {chain.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {chain.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white">{chain.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-slate-300">
                    Model: {chain.recommendedModel}
                  </span>
                  <span className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-emerald-400 font-semibold">
                    {chain.complexity}
                  </span>
                </div>
              </div>

              {/* Objective */}
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Core Objective:</strong> {chain.objective}
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-200">Execution Chain Steps:</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {chain.chainSteps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Variables */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Dynamic Input Variables</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {chain.variables.map((v) => (
                    <div key={v.name} className="text-xs bg-slate-900 p-2.5 rounded border border-slate-800">
                      <code className="text-emerald-400 font-bold">&#123;&#123;{v.name}&#125;&#125;</code>
                      <p className="text-slate-400 mt-0.5 text-[11px]">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Output Excerpt */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Verified Output Sample</span>
                </span>
                <div className="font-sans text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                  {chain.sampleOutput}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Automation Recipes Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Workflow className="h-4 w-4" />
              <span>API & No-Code Automation Architecture</span>
            </span>
            <h2 className="mt-1 text-2xl font-bold text-white">
              End-to-End Automation Recipes for {kit.role}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Integrate your prompt chains with Zapier, Make.com, Slack, and your internal firm databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kit.automationRecipes.map((recipe, rIdx) => (
              <div
                key={rIdx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3"
              >
                <h4 className="text-base font-bold text-white">{recipe.title}</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 border border-slate-700">
                    Stack: {recipe.tooling}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-cyan-400 border border-slate-700">
                    Trigger: {recipe.trigger}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-200">Execution Pipeline:</span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {recipe.executionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold shrink-0">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-900 text-xs text-slate-400">
                  <strong className="text-slate-300">Expected Outcome:</strong> {recipe.expectedOutput}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role ROI Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RoiCalculator
          initialRate={kit.averageHourlyRate}
          initialHours={kit.hoursSavedWeekly}
          roleTitle={kit.role}
        />
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Specific questions regarding the {kit.role} prompt kit.</p>
        </div>

        <div className="space-y-4">
          {kit.faq.map((f, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <h4 className="text-sm font-bold text-white">{f.question}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile / Conversion */}
      <div className="sticky bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 py-3.5 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-white line-clamp-1">{kit.role}</div>
            <div className="text-[11px] text-emerald-400 font-semibold">$19.00 One-Time</div>
          </div>
          <CheckoutButton
            roleSlug={kit.slug}
            plan="single"
            priceDisplay="$19.00"
            label="Download — $19"
            className="w-auto"
          />
        </div>
      </div>
    </div>
  );
}
