import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { ALL_ROLES } from '@/data/roles';

export default function Footer() {
  const topRoles = ALL_ROLES.slice(0, 12);

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">PromptSystem Pro</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Stop deploying generic $5 prompts. PromptSystem Pro engineers production-grade, multi-step Chain-of-Thought AI operating systems, Claude Project setups, and executive workflows for 50+ high-impact professional roles.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Shield className="h-4 w-4" />
                <span>Zero Hallucination Protocols</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Claude 3.5 & GPT-4o Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Role Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Featured Roles</p>
            <ul className="space-y-2 text-sm">
              {topRoles.slice(0, 6).map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}`} className="transition hover:text-emerald-400 line-clamp-1">
                    {r.role}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">More Roles</p>
            <ul className="space-y-2 text-sm">
              {topRoles.slice(6, 12).map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}`} className="transition hover:text-emerald-400 line-clamp-1">
                    {r.role}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Accreditations */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Legal & Governance</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Commercial Single-Seat License</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Zero Private IP Exfiltration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Stripe & LemonSqueezy Verified</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Instant .docx, .md & PDF Delivery</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PromptSystem Pro Enterprise Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Claude 3.5 Sonnet & OpenAI GPT-4o</span>
            <Link href="/sitemap.xml" className="hover:text-slate-400 underline">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-400 underline">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
