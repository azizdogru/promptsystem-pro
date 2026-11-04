'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

export function OrderBumpCard() {
  return (
    <div className="my-8 rounded-2xl border border-slate-700/70 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/80 hover:border-blue-500/40 p-5 sm:p-6 text-xs text-slate-300 shadow-xl transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-extrabold text-white text-sm">
                Recommended Companion: OpsManual Pro Turnkey SOP Kit
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                VERIFIED PARTNER TOOL
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-xl">
              Standard operating procedures library, operational runbooks, and workflow automation blueprints.
            </p>
          </div>
        </div>

        <div className="shrink-0 pt-2 sm:pt-0">
          <a
            href="https://opsmanual-pro.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 font-semibold text-xs text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            <span>Open Sister Tool</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
