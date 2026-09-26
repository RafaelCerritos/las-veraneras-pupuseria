'use client';

import React, { useState } from 'react';
import { PupusaItem, MasaType } from '@/types/pupusa';
import { PupusaSvg } from '@/components/PupusaSvg';
import { useCart } from '@/context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface PupusaCardProps {
  pupusa: PupusaItem;
}

export function PupusaCard({ pupusa }: PupusaCardProps) {
  const [selectedMasa, setSelectedMasa] = useState<MasaType>('Maíz');
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();

  const handleDecrement = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQty((prev) => Math.min(prev + 1, 99));
  };

  const handleAdd = () => {
    addToCart(pupusa.id, selectedMasa, qty);
    setQty(1); // Reset back to 1 after adding
  };

  return (
    <article className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#EABA68]/40 shadow-xs relative transition-all duration-200 hover:shadow-md hover:border-[#EABA68]/70 flex flex-col justify-between">
      <div className="flex gap-3.5 items-start">
        {/* Vector Pupusa Art */}
        <div className="w-14 h-14 rounded-2xl bg-[#FFF4E2] border border-[#EABA68]/40 flex-shrink-0 flex items-center justify-center shadow-inner">
          <PupusaSvg spots={pupusa.spots} isArroz={selectedMasa === 'Arroz'} className="w-12 h-12" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-artesanal text-base font-bold text-[#281101] leading-snug">
              {pupusa.name}
            </h3>
          </div>
          <p className="text-xs text-[#57391A] mt-0.5 leading-normal">
            {pupusa.desc}
          </p>

          <div className="mt-1.5">
            {pupusa.isPromo ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-[#EABA68] text-[#281101] font-bold px-2 py-0.5 rounded-full border border-[#F5D18A] shadow-xs">
                  {pupusa.promoText || '3 x $1.00'}
                </span>
                <span className="text-[11px] text-[#57391A]">(${pupusa.basePrice.toFixed(2)} c/u)</span>
              </div>
            ) : (
              <span className="font-artesanal text-base font-bold text-[#281101]">
                ${pupusa.basePrice.toFixed(2)}{' '}
                <span className="text-xs font-sans text-[#57391A] font-normal">c/u</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls: Masa selector & Quantity + Add */}
      <div className="mt-3 pt-3 border-t border-[#EABA68]/20 flex flex-wrap items-center justify-between gap-2">
        {/* Masa Selector Segmented Control */}
        <div
          className="flex items-center rounded-xl bg-[#FFF4E2] p-0.5 border border-[#EABA68]/40 text-xs font-medium"
          role="radiogroup"
          aria-label="Selección de masa"
        >
          <button
            type="button"
            role="radio"
            aria-checked={selectedMasa === 'Maíz'}
            onClick={() => setSelectedMasa('Maíz')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedMasa === 'Maíz'
                ? 'bg-[#EABA68] text-[#281101] font-bold shadow-xs'
                : 'text-[#57391A] hover:text-[#281101]'
            }`}
          >
            🌽 Maíz
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={selectedMasa === 'Arroz'}
            onClick={() => setSelectedMasa('Arroz')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedMasa === 'Arroz'
                ? 'bg-[#EABA68] text-[#281101] font-bold shadow-xs'
                : 'text-[#57391A] hover:text-[#281101]'
            }`}
          >
            🍚 Arroz
          </button>
        </div>

        {/* Quantity Counter & Add CTA */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-white border border-[#EABA68]/60 h-8 px-1 shadow-xs">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Disminuir cantidad de ${pupusa.name}`}
              className="w-7 h-full flex items-center justify-center text-[#4A2C0D] hover:text-[#C7435E] font-bold text-sm transition-colors focus:outline-none"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-[#281101] select-none tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Aumentar cantidad de ${pupusa.name}`}
              className="w-7 h-full flex items-center justify-center text-[#4A2C0D] hover:text-[#C7435E] font-bold text-sm transition-colors focus:outline-none"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Agregar ${qty} ${pupusa.name} de masa ${selectedMasa} al carrito`}
            className="h-8 px-3 rounded-xl bg-[#C7435E] hover:bg-[#A8324D] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-xs focus:outline-none"
          >
            <span>Agregar</span>
            <Plus className="w-3.5 h-3.5 stroke-2" />
          </button>
        </div>
      </div>
    </article>
  );
}
