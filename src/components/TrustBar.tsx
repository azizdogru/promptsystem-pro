import React from 'react';
import { ShieldCheck, Cpu, Lock, Star } from 'lucide-react';

export function TrustBar() {
  return (
    <div className="border-y border-slate-800/80 bg-slate-950/60 py-6 my-10 text-xs text-slate-300 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Production AI Role Architectures</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Engineered for Claude 3.7 & GPT-4o with zero-hallucination structured constraints.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Instant ZIP & Markdown Bundle</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Raw system prompts, XML schema rules, few-shot examples & evaluation tests.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Commercial & API Ready</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Full commercial license for direct embedding into production SaaS & AI agents.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Built for AI Engineers & Builders</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Tested across thousands of production API calls and benchmark prompt suites.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
