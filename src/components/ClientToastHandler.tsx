'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export function ClientToastHandler() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalAlert = window.alert;
    window.alert = (message?: any) => {
      const msgStr = typeof message === 'string' ? message : String(message || 'Notification');
      setToast({ message: msgStr, id: Date.now() });
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-[92vw] sm:max-w-md w-full animate-bounce-short pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/60 flex items-start gap-3">
        <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs sm:text-sm font-medium text-slate-100 leading-snug whitespace-pre-line">
          {toast.message}
        </div>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
