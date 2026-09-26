'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { MapPin, Clock, Phone, Navigation, Zap } from 'lucide-react';
import { WHATSAPP_PLACEHOLDER } from '@/data/menu';

export function LocationSection() {
  const { openCart } = useCart();

  return (
    <section
      id="ubicacion"
      className="rounded-3xl p-5 sm:p-6 bg-[#FFF4E2] border border-[#EABA68]/40 shadow-xs space-y-4"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#73802C]/20 text-[#53601F] flex items-center justify-center font-bold">
          <MapPin className="w-4 h-4 stroke-2" />
        </div>
        <div>
          <h3 className="font-artesanal text-base sm:text-lg font-bold text-[#281101]">
            Visítanos y pide a domicilio
          </h3>
          <p className="text-xs text-[#57391A]">Atención cálida y ambiente familiar</p>
        </div>
      </div>

      <div className="space-y-2 text-xs sm:text-sm text-[#57391A] divide-y divide-[#EABA68]/20">
        <div className="flex items-start gap-2 pt-1">
          <span className="font-bold text-[#281101] min-w-[75px] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C7435E] inline" />
            Dirección:
          </span>
          <span className="text-[#4A2C0D] font-medium">DIRECCIÓN_DEL_NEGOCIO</span>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <span className="font-bold text-[#281101] min-w-[75px] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#53601F] inline" />
            Horarios:
          </span>
          <span className="text-[#4A2C0D] font-medium">HORARIOS_DEL_NEGOCIO</span>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <span className="font-bold text-[#281101] min-w-[75px] flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#B87519] inline" />
            Teléfono:
          </span>
          <span className="text-[#4A2C0D] font-medium">{WHATSAPP_PLACEHOLDER}</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-[#EABA68]/60 text-[#4A2C0D] text-xs font-semibold text-center hover:bg-[#F5D18A]/30 transition-colors shadow-xs flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5 text-[#53601F]" />
          <span>🗺️ Cómo llegar</span>
        </a>

        <button
          type="button"
          onClick={openCart}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#C7435E] hover:bg-[#A8324D] text-white text-xs font-semibold text-center transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Pedir para llevar</span>
        </button>
      </div>
    </section>
  );
}
