'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export function OrderBumpCard() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="my-8 rounded-2xl border-2 border-dashed border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-5 sm:p-6 text-xs text-slate-300 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <button
            type="button"
            onClick={() => setSelected(!selected)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 border ${
              selected ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-transparent'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-extrabold text-white text-sm">
                Add OpsManual Pro Turnkey SOP Kit
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                SAVE 50%
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-xl">
              Convert AI prompt outputs into certified, ready-to-sign operational standard operating procedures.
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
          <div className="text-right">
            <span className="text-slate-500 line-through text-xs mr-2">$49.00</span>
            <span className="text-lg font-black text-white">$24.00</span>
          </div>
          <a
            href="https://opsmanual-pro.vercel.app"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold text-xs mt-1 transition"
          >
            <span>Preview Tool</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
