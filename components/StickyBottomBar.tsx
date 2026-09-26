'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/data/menu';

export function StickyBottomBar() {
  const { totals, openCart } = useCart();

  if (totals.totalCount === 0) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 pointer-events-none p-3 max-w-md md:max-w-lg mx-auto animate-in slide-in-from-bottom-4 duration-300"
      data-purpose="floating-order-bar"
    >
      <div className="pointer-events-auto bg-[#281101] text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between border border-[#EABA68]/40 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#F5D18A] font-semibold uppercase tracking-wider">
            Tu orden actual
          </span>
          <span className="text-sm font-bold text-white tabular-nums">
            {totals.totalCount} {totals.totalCount === 1 ? 'pupusa' : 'pupusas'} |{' '}
            {formatPrice(totals.totalPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="px-4 py-2 rounded-xl bg-[#C7435E] hover:bg-[#A8324D] text-white text-xs font-bold transition-transform active:scale-95 shadow-md flex items-center gap-1.5 focus:outline-none"
        >
          <span>Ver Carrito / Pedir</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
