'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export function Toast() {
  const { activeToast } = useCart();

  if (!activeToast) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-16 inset-x-0 mx-auto max-w-xs z-50 flex items-center justify-center pointer-events-none px-4 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="bg-[#281101] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-[#EABA68] flex items-center gap-2">
        <span className="text-sm">🫓</span>
        <span>{activeToast}</span>
      </div>
    </div>
  );
}
