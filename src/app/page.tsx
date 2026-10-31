import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Zap,
  FolderArchive,
  Download,
  HelpCircle,
} from 'lucide-react';
import { ALL_ROLES } from '@/data/roles';
import RoleSearch from '@/components/RoleSearch';
import PromptSimulator from '@/components/PromptSimulator';
import RoiCalculator from '@/components/RoiCalculator';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata = {
  title: 'PromptSystem Pro — Production AI Operating Systems for 102 Professional Roles',
  description:
    'Stop using generic $5 prompts. Deploy multi-step Chain-of-Thought AI operating systems, Claude Project setups, and executive workflows across 102 professional roles.',
};

export default function HomePage() {
  const featuredRole = ALL_ROLES[0]; // Staff Software Engineer
  const legalRole = ALL_ROLES.find((r) => r.slug.includes('corporate-attorney')) || ALL_ROLES[2];

  // FAQ Items for JSON-LD & UI
  const faqs = [
    {
      q: 'How are these different from generic ChatGPT prompt packs on the internet?',
      a: 'Generic prompt packs are single-sentence fluff ("write me an email") that produce shallow, uncalibrated AI answers. PromptSystem Pro delivers production-grade multi-step Chain-of-Thought systems with XML parameter tags, negative constraints, few-shot domain examples, and statutory citations (e.g. DGCL corporate law, GAAP accounting, HIPAA privacy, OSHA 1926, NEC electrical code, Common Core education). Each role kit is designed for senior practitioners.',
    },
    {
      q: 'Which AI models are supported?',
      a: 'All prompt systems are optimized primarily for Anthropic Claude 3.5 Sonnet (using its 200k context window and XML formatting strengths) and OpenAI GPT-4o / o1-preview. They also run seamlessly in local LLM enterprise environments (Ollama, vLLM, AWS Bedrock, Azure OpenAI).',
    },
    {
      q: 'What files do I receive upon purchase?',
      a: 'You receive instant access to download the Complete Role Pack (.ZIP archive) which includes: (1) An 18+ page Microsoft Word (.docx) Operations Manual, (2) A formatted Markdown (.md) Playbook, (3) Claude Project & Custom GPT Configuration files (.json & .txt), and (4) A 2-page printable vector PDF executive protocol guide.',
    },
    {
      q: 'Can I use these prompts across my company, firm, or agency?',
      a: 'Yes. Every purchase includes an official Commercial Operating License authorizing your team to deploy, adapt, and run these prompts in private client workflows, internal automation pipelines, and commercial business operations.',
    },
    {
      q: 'Is there a money-back guarantee?',
      a: 'Yes. If a prompt system does not save you at least 5 hours in your first week of deployment, simply contact us within 14 days for a full, no-questions-asked refund.',
    },
  ];

  // Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'PromptSystem Pro Enterprise AI Suite',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '19.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        description:
          'Production-grade multi-step Chain-of-Thought AI prompt chains, Claude Project knowledge bases, and executive workflow automations across 102 professional roles.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      {/* JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.900/20),transparent)]" />
        <div className="mx-auto max-w-5xl text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Updated for Claude 3.5 Sonnet & GPT-4o • 102 Accredited Roles</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            Production AI Operating Systems Engineered for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              102 High-Impact Roles
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto sm:text-xl">
            Stop pasting amateur $5 prompt lists. Deploy multi-step Chain-of-Thought AI systems, Claude Project setups, and executive workflows across tech, legal, medical, trades, education, culinary, and finance.
          </p>

          {/* Social Proof Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>102 Specialized Professional Roles</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>~14.5 Hours Reclaimed Weekly</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Zero-Hallucination Guardrails</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Commercial Single-Seat License</span>
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110 active:scale-98"
            >
              <span>Unlock Master Bundle ($39)</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#playground"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-base font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              <Cpu className="h-5 w-5 text-cyan-400" />
              <span>Test Live Playground</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="border-y border-slate-800 bg-slate-900/30 px-4 py-16 sm:px-6 lg:px-8 scroll-mt-12">
        <div id="compliance" className="scroll-mt-24"></div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Step Chain-of-Thought</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sequential prompts with explicit intermediate reasoning steps, input validation gates, and output formatting schemas.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileCode className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Turnkey Claude & GPT Configs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Copy-paste ready XML instructions and knowledge base text files formatted specifically for Claude Projects and Custom GPTs.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Negative Constraints & Rules</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict boundaries against hallucinations and vague disclaimers. Incorporates DGCL, HIPAA, OSHA 1926, and GAAP standards.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FolderArchive className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Instant 1-Click .ZIP Package</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download your system in Word (.docx), Markdown (.md), JSON, 2-page printable vector PDF, and complete .ZIP archive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prompt Simulator Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Real Working Workflows
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Test the System in Action
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            See how our production prompt chains turn raw business inputs into rigorous, institutional deliverables.
          </p>
        </div>

        <PromptSimulator
          chains={[...featuredRole.promptChains, ...legalRole.promptChains]}
          roleTitle="Featured Systems"
        />
      </section>

      {/* ROI Calculator Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RoiCalculator />
      </section>

      {/* 102 Roles Directory Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Comprehensive Role Catalog
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Explore 102 Role-Specific AI Operating Systems
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Covering Engineering, Legal, Healthcare, Trades, Education, Culinary, Real Estate, Fitness, and Finance.
          </p>
        </div>

        <RoleSearch roles={ALL_ROLES} />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-slate-800 bg-slate-900/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Transparent Pricing
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Invest Once, Reclaim Hundreds of Billable Hours
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              One-time payment with instant lifetime access and commercial operating license. Zero recurring subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Single Role Kit */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                    Single Professional Kit
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Target Role AI System</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Ideal for solo practitioners and focused professionals needing deep automation for a single role.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">$19</span>
                  <span className="text-sm font-medium text-slate-400">.00 / one-time</span>
                </div>

                <ul className="mt-8 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Complete Role Master System Prompt (Claude XML & ChatGPT format)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>All Multi-Step Chain-of-Thought Prompt Chains</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Heavyweight 18+ Page Word (.docx) & Markdown (.md) Playbook</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Printable 2-Page Vector Executive PDF Cheat Sheet</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>1-Click Complete Package (.ZIP) Download</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Commercial Single-Seat Operating License</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-900">
                <CheckoutButton
                  plan="single"
                  roleSlug="staff-software-engineer-ai-prompts-system-workflows"
                  priceDisplay="$19.00"
                  label="Download Single Role Kit — $19"
                  variant="secondary"
                />
              </div>
            </div>

            {/* All-Access Master Bundle */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-0.5 text-xs font-bold text-slate-950 shadow-md">
                MOST POPULAR • BEST VALUE
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                    All-Access Master Bundle
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">All 102 Professional AI Systems</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Full library access across all 13 industry verticals (Tech, Legal, Trades, Education, Medical, Culinary, Finance, Creative, and more).
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">$39</span>
                  <span className="text-sm font-medium text-slate-400">.00 / one-time</span>
                  <span className="ml-2 text-xs line-through text-slate-500">$1,950 Value</span>
                </div>

                <ul className="mt-8 space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">All 102 Professional Role Operating Systems</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>500+ Multi-Step Production Prompt Chains</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Complete Claude Projects & Custom GPT Knowledge Bases</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>All Editable Word (.docx), Vector PDFs, and .ZIP Archives</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Enterprise Unlimited Commercial Operating Rights</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Free Lifetime Updates (All 2026 releases included)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <CheckoutButton
                  plan="bundle"
                  priceDisplay="$39.00"
                  label="Unlock All 102 Roles Bundle — $39"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-700"
            >
              <h4 className="text-base font-bold text-white">{faq.q}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

