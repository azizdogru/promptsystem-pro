'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, BookOpen, Calculator, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-md shadow-emerald-500/20">
            <Terminal className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">PromptSystem</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold uppercase text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Enterprise AI Operating Systems</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/#roles" className="transition hover:text-emerald-400 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>50+ Role Systems</span>
          </Link>
          <Link href="/#playground" className="transition hover:text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Live Playground</span>
          </Link>
          <Link href="/#roi" className="transition hover:text-emerald-400 flex items-center gap-1.5">
            <Calculator className="h-4 w-4 text-amber-400" />
            <span>ROI Calculator</span>
          </Link>
          <Link href="/#compliance" className="transition hover:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Enterprise Standards</span>
          </Link>
          <Link href="/#pricing" className="transition hover:text-emerald-400">
            Pricing
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95"
          >
            <span>Get All-Access Bundle</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#roles"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            50+ Role Systems
          </Link>
          <Link
            href="/#playground"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            Live Playground
          </Link>
          <Link
            href="/#roi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            ROI Calculator
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            Pricing & Bundles
          </Link>
          <div className="pt-2">
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950"
            >
              <span>Unlock Master Bundle ($39)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
