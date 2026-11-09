import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, FileText, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | PromptSystem Pro',
  description: 'PromptSystem Pro official privacy policy, client-side data protection, and zero-storage architecture.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-12 shadow-2xl space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 mb-6 transition gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-0.5">Effective & Last Updated: 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6 pt-6 border-t border-slate-800 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400" />
              1. Zero-Knowledge & Local-First Architecture
            </h2>
            <p>
              PromptSystem Pro is engineered with a strict local-first, privacy-by-design architecture. When you draft, customize, or generate AI System Prompts & Few-Shot Evaluation Kits (.ZIP), your sensitive information is processed locally in your client device browser (memory &amp; localStorage). We do not collect, serialize, harvest, or monetize your private documents, trade secrets, personal identifiers, or party names on our backend databases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              2. Payment & Transaction Security
            </h2>
            <p>
              All payment transactions are handled through PCI-DSS Level 1 compliant merchant processors (Stripe / LemonSqueezy). We never receive, process, or store raw credit card numbers, CVV codes, or bank account credentials. All billing sessions are encrypted via bank-grade TLS/SSL 256-bit encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              3. Anonymous Analytics & Telemetry
            </h2>
            <p>
              We collect minimal, privacy-preserving website traffic metrics (such as Vercel Web Analytics) strictly to monitor uptime, page latency, and system stability. These metrics contain no Personally Identifiable Information (PII) and are never cross-referenced with your drafted document contents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              4. U.S. State Privacy Rights (CCPA / CPRA & VCDPA)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California Privacy Rights Act (CPRA), and related U.S. consumer privacy frameworks:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>We do NOT sell, rent, or trade your personal information.</li>
              <li>You have the right to request immediate deletion of any associated transaction records.</li>
              <li>You will never experience reduced service quality or discrimination for exercising statutory privacy rights.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">5. Contact & Privacy Inquiries</h2>
            <p>
              For legal compliance inquiries, privacy questions, or data deletion requests regarding PromptSystem Pro, contact our privacy operations team at: <a href="mailto:support@promptsystem-pro.vercel.app" className="text-blue-400 underline hover:text-blue-300">support@promptsystem-pro.vercel.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
