'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export function OrderBumpCard() {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`my-8 rounded-2xl border-2 transition-all duration-200 p-5 sm:p-6 text-xs text-slate-300 shadow-xl ${
        selected
          ? 'border-emerald-500/60 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 shadow-emerald-950/20'
          : 'border-dashed border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/80 hover:border-slate-600'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          className="flex items-start gap-3.5 cursor-pointer select-none"
          onClick={() => setSelected(!selected)}
        >
          <button
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(!selected);
            }}
            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 border ${
              selected
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                : 'bg-slate-800/80 border-slate-600 text-transparent hover:border-slate-500'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-extrabold text-white text-sm">
                Add OpsManual Pro Turnkey SOP Kit
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                  selected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {selected ? '✓ ADD-ON SELECTED' : 'OPTIONAL ADD-ON (SAVE 50%)'}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-xl">
              Standard operating procedures library, operational runbooks, and workflow automation blueprints.
            </p>
            {selected && (
              <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1 mt-1.5 animate-fadeIn">
                <span>✓ Companion document added to toolkit. Click the button to configure:</span>
              </p>
            )}
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
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 font-semibold text-xs mt-1.5 transition rounded-lg px-3 py-1.5 ${
              selected
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                : 'text-blue-400 hover:text-blue-300 hover:underline'
            }`}
          >
            <span>{selected ? 'Open & Create Document' : 'Preview Companion Tool'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
