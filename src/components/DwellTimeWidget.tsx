'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function DwellTimeWidget() {
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(65);

  const annualHoursSaved = weeklyHours * 48;
  const annualDollarValue = annualHoursSaved * hourlyRate;

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-cyan-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 my-10 shadow-2xl text-xs text-zinc-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow Automation &amp; ROI Multiplier</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Calculate Annual Time &amp; Cost Savings
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Estimate efficiency gains from standardized professional playbooks and verified data.
          </p>
        </div>

        <div className="bg-zinc-800/80 px-4 py-2.5 rounded-xl border border-zinc-700/60 text-right">
          <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Annual Time Value</p>
          <p className="text-2xl font-black text-emerald-400">${annualDollarValue.toLocaleString()}/yr</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between font-bold text-white mb-2">
            <span>Hours Spent on Manual Admin per Week</span>
            <span className="text-cyan-400 font-mono">{weeklyHours} hrs/week</span>
          </div>
          <input
            type="range"
            min={4}
            max={30}
            step={1}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>4 hrs</span>
            <span>15 hrs</span>
            <span>30 hrs</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-bold text-white mb-2">
            <span>Your Effective Hourly Value</span>
            <span className="text-emerald-400 font-mono">${hourlyRate}/hr</span>
          </div>
          <input
            type="range"
            min={25}
            max={250}
            step={5}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>$25/hr</span>
            <span>$125/hr</span>
            <span>$250/hr</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between">
        <p className="text-zinc-400">
          Reclaim an estimated <strong>{annualHoursSaved} hours</strong> of productive billable time every year.
        </p>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition"
        >
          <span>Unlock Workflows &amp; Data</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
