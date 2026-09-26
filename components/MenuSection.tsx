import React from 'react';
import { PUPUSA_CATALOG } from '@/data/menu';
import { PupusaCard } from '@/components/PupusaCard';

export function MenuSection() {
  return (
    <section id="menu" className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-2 border-b border-[#EABA68]/30">
        <div>
          <h2 className="font-artesanal text-xl sm:text-2xl font-bold text-[#281101] flex items-center gap-2">
            <span>Nuestras Pupusas</span>
            <span className="text-xs bg-[#C7435E] text-white font-sans font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              Recién hechas
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#57391A] mt-0.5">
            Acompañadas de salsa de tomate casera y curtido
          </p>
        </div>
      </div>

      {/* Quick Info / Masa selector guidance */}
      <div className="p-3 bg-[#FFF4E2] rounded-2xl border border-[#EABA68]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <span className="font-medium text-[#4A2C0D]">
          Elige la masa por cada pupusa:
        </span>
        <div className="flex items-center gap-2 font-bold text-[#53601F]">
          <span className="bg-[#F5D18A]/60 px-2.5 py-1 rounded-lg border border-[#EABA68]/40 shadow-xs">
            Maíz 🌽
          </span>
          <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#EABA68]/40 shadow-xs">
            Arroz 🍚
          </span>
        </div>
      </div>

      {/* Pupusas Product Grid: 1 col on mobile, 2 cols on tablet/desktop, 3 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3.5 sm:gap-4">
        {PUPUSA_CATALOG.map((pupusa) => (
          <PupusaCard key={pupusa.id} pupusa={pupusa} />
        ))}
      </div>
    </section>
  );
}
