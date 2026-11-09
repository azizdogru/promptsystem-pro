import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | PromptSystem Pro',
  description: 'PromptSystem Pro terms of service, document license, and legal disclaimers.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
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
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Service</h1>
              <p className="text-xs text-slate-400 mt-0.5">Effective & Last Updated: 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6 pt-6 border-t border-slate-800 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or purchasing services through PromptSystem Pro (&ldquo;the Service&rdquo;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and our Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              2. Non-Law Firm & Educational Self-Help Disclaimer
            </h2>
            <p>
              PromptSystem Pro is a provider of self-help software, customizable document preparation templates, and automated workflows. <strong>PromptSystem Pro IS NOT A LAW FIRM, ATTORNEY, OR LAWYER REFERRAL SERVICE.</strong> The software, legal statutory references, templates, and guidance materials provided are for educational and self-representation purposes only and do not constitute legal advice, representation, or an attorney-client relationship. If you require tailored legal counsel, please consult an attorney licensed in your jurisdiction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3. Digital Product License & Fulfillment
            </h2>
            <p>
              Upon successful payment, you are granted a non-exclusive, perpetual, single-user license to download, customize, edit, and utilize the generated AI System Prompts & Few-Shot Evaluation Kits (.ZIP) for your personal or commercial business operations. Reselling, sublicensing, or publicly redistributing our raw templates or database compilations is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">4. Limitation of Liability & Warranty Disclaimer</h2>
            <p>
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. Under no circumstances shall PromptSystem Pro, its operators, or affiliates be liable for any indirect, incidental, punitive, or consequential damages resulting from the use or inability to use the documents or data provided.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-white">5. Customer Support & Inquiries</h2>
            <p>
              For technical support, billing inquiries, or document questions, please contact our support team at: <a href="mailto:support@promptsystem-pro.vercel.app" className="text-blue-400 underline hover:text-blue-300">support@promptsystem-pro.vercel.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
