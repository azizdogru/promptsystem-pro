'use client';

import React, { useState } from 'react';
import { Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CheckoutButtonProps {
  roleSlug?: string;
  plan?: 'single' | 'bundle';
  priceDisplay: string;
  label?: string;
  sublabel?: string;
  variant?: 'primary' | 'secondary' | 'badge';
  className?: string;
}

export default function CheckoutButton({
  roleSlug,
  plan = 'single',
  priceDisplay,
  label,
  sublabel,
  variant = 'primary',
  className = '',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleSlug: roleSlug || undefined,
          plan: plan,
        }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Could not initiate checkout session. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const defaultLabel =
    plan === 'bundle'
      ? `Unlock All 50+ Role Systems — ${priceDisplay}`
      : `Download Complete AI Operating System — ${priceDisplay}`;

  const isPrimary = variant === 'primary';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`group relative flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
          isPrimary
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-emerald-500/25 hover:brightness-110'
            : 'bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 shadow-slate-950/50'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Redirecting to Secure Checkout...</span>
          </>
        ) : (
          <>
            <Zap className={`h-5 w-5 ${isPrimary ? 'text-slate-950 fill-slate-950' : 'text-emerald-400'}`} />
            <span>{label || defaultLabel}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {sublabel && (
        <p className="mt-2 text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>{sublabel}</span>
        </p>
      )}
    </div>
  );
}
