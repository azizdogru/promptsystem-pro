'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Download,
  FileText,
  FileCode,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { ALL_ROLES, getRoleBySlug } from '@/data/roles';

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || searchParams.get('role');
  const plan = searchParams.get('plan') || 'single';

  const isBundle = plan === 'bundle' || !slug;
  const roleKit = slug ? getRoleBySlug(slug) : ALL_ROLES[0];
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#F59E0B', '#3B82F6'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyPrompt = () => {
    if (roleKit?.masterSystemPrompt) {
      navigator.clipboard.writeText(roleKit.masterSystemPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const safeSlug = roleKit?.slug || 'staff-software-engineer-ai-prompts-system-workflows';

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
          <CheckCircle className="h-9 w-9" />
        </div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Order Confirmed • Commercial License Issued
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          {isBundle ? 'All-Access Master Library Unlocked!' : `Your ${roleKit?.role} AI System is Ready`}
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Thank you for your purchase. Your files have been compiled and your commercial enterprise operating license has been activated.
        </p>
      </div>

      {/* Commercial License Key Banner */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>Commercial License ID: #LIC-PROMPT-2026-ACTIVE</span>
        </div>
        <div className="text-slate-400">
          Authorized Single-Seat & Internal Enterprise Deployment
        </div>
      </div>

      {/* Download Deliverables Hub */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-emerald-400" />
            <span>Instant Download Deliverables</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Select your preferred format below. All files are fully editable and cloud ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DOCX Download */}
          <a
            href={`/api/download?slug=${safeSlug}&format=docx`}
            className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-500 hover:bg-slate-900/80 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition">
              <FileText className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                Microsoft Word (.docx) Operations Manual
              </div>
              <p className="text-xs text-slate-400">
                14-page formatted operational playbook with cover page, system prompts, prompt chains, and commercial license.
              </p>
            </div>
          </a>

          {/* Printable PDF Cheat Sheet */}
          <a
            href={`/api/download-guide?slug=${safeSlug}`}
            className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-500 hover:bg-slate-900/80 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition">
              <FileCode className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                Executive AI Protocol Guide (.pdf)
              </div>
              <p className="text-xs text-slate-400">
                2-page high-resolution vector PDF cheat sheet ready for printing or dual-monitor reference.
              </p>
            </div>
          </a>

          {/* Markdown Playbook */}
          <a
            href={`/api/download?slug=${safeSlug}&format=md`}
            className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-500 hover:bg-slate-900/80 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition">
              <Terminal className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                Markdown (.md) Master Playbook
              </div>
              <p className="text-xs text-slate-400">
                Obsidian and Notion ready markdown file containing raw XML prompt code blocks and input parameters.
              </p>
            </div>
          </a>

          {/* Claude/GPT JSON Config */}
          <a
            href={`/api/download?slug=${safeSlug}&format=json`}
            className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-500 hover:bg-slate-900/80 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition">
              <FileCode className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                Claude Project & GPT Config (.json)
              </div>
              <p className="text-xs text-slate-400">
                Structured JSON package formatted for automated API ingestion or Claude Projects knowledge upload.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* 1-Click System Prompt Copy Box */}
      {roleKit && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>One-Click System Prompt Copy</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Paste directly into Claude Projects &gt; Custom Instructions or ChatGPT &gt; Instructions.
              </p>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20"
            >
              {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedPrompt ? 'Copied to Clipboard' : 'Copy System Prompt'}</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 max-h-[240px] overflow-y-auto leading-relaxed">
            <pre className="whitespace-pre-wrap">{roleKit.masterSystemPrompt}</pre>
          </div>
        </div>
      )}

      {/* Quick Start Setup Guide */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8 space-y-4">
        <h3 className="text-base font-bold text-white">3-Minute Quick Start Instructions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="font-bold text-emerald-400">Step 1: Open AI Platform</div>
            <p className="text-slate-400">
              Log into Claude (claude.ai) or ChatGPT (chatgpt.com) and create a new dedicated <strong>Project</strong> or <strong>Custom GPT</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="font-bold text-emerald-400">Step 2: Paste Instructions</div>
            <p className="text-slate-400">
              Click the Copy button above and paste the XML Master System Prompt into the project instructions field.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="font-bold text-emerald-400">Step 3: Run Prompt Chains</div>
            <p className="text-slate-400">
              Open your Word (.docx) or Markdown (.md) guide and deploy your first multi-step prompt chain with client variables.
            </p>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
        >
          <span>Return to PromptSystem Pro Catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="py-20 text-center text-sm text-slate-400">
            Loading your licensed prompt kit...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
