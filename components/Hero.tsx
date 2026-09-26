'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ChevronDown, Sparkles, MapPin } from 'lucide-react';

const HERO_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC1R_gsfxsiBA32hpcdXJ76354SYyZsAVE6vg4-NLV8sXwUqhw7D7M9AL3vGFFTzVH5alvy-wcIZ5UqDi3aiU-j7qxLNXTdv1NtII_rvOF8ujDeHCx6BHnT6ZuDqQfoee7mDAoJ9mU0wlpZxrR4uO74MvvUTsxSAuK2xxVx0hkK1Iqkt1cmK4vPGTkuixbv5nPDfOyMwNGdRu1rtnK9s7nU1vJpdJp_m13NlV1uB9tFvmX2ghtL1X7ReGwDLpbfl9iGSA';

export function Hero() {
  const { openCart } = useCart();

  return (
    <section
      id="hero"
      className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#FFF9EE] via-[#FEF3E0] to-[#FDF0D5] border border-[#EABA68]/40 shadow-sm text-center overflow-hidden"
    >
      {/* Comal Illustration with Veranera Flowers & Steam */}
      <div className="relative mx-auto mb-3 flex items-center justify-center">
        {/* Animated Steam Whisps */}
        <div className="absolute -top-4 flex justify-center gap-2 pointer-events-none opacity-60">
          <span className="w-1.5 h-4 bg-[#B87519]/40 rounded-full steam-line-1 blur-[0.5px]" />
          <span className="w-2 h-5 bg-[#B87519]/50 rounded-full steam-line-2 blur-[0.5px]" />
          <span className="w-1.5 h-4 bg-[#B87519]/40 rounded-full steam-line-3 blur-[0.5px]" />
        </div>

        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-[#EABA68]/50 shadow-md bg-[#FFF4E2] flex items-center justify-center p-1">
          <Image
            src={HERO_LOGO_URL}
            alt="Logo oficial Las Veraneras Pupusería con arco de flores veraneras"
            fill
            sizes="(max-width: 640px) 160px, 192px"
            className="object-contain p-1"
            priority
            referrerPolicy="no-referrer"
            unoptimized
          />
        </div>
      </div>

      {/* Badge: Masa info */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#73802C]/15 border border-[#73802C]/30 text-[#53601F] text-xs font-semibold uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>MASA: MAÍZ Y ARROZ DISPONIBLE</span>
      </div>

      {/* Titles */}
      <h1 className="font-artesanal text-2xl sm:text-3xl font-bold text-[#281101] leading-tight tracking-tight mt-1">
        LAS VERANERAS PUPUSERÍA
      </h1>

      <p className="font-artesanal italic text-[#A8324D] font-semibold text-base sm:text-lg mt-1">
        &ldquo;El sabor de nuestras pupusas, hecho con tradición&rdquo;
      </p>

      <p className="text-[#57391A] text-xs sm:text-sm leading-relaxed mt-2.5 max-w-sm sm:max-w-md mx-auto">
        Disfruta pupusas hechas con masa de maíz y arroz, preparadas con ingredientes tradicionales y mucho sabor salvadoreño.
      </p>

      {/* Zona de pedidos a domicilio */}
      <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF4E2] border border-[#EABA68] shadow-xs text-xs text-[#4A2C0D] max-w-md mx-auto">
        <span className="text-sm flex-shrink-0" role="img" aria-label="Reparto a domicilio">🛵</span>
        <span className="leading-snug">
          Pedidos a domicilio disponibles únicamente en la <strong className="text-[#281101] font-bold">comunidad El Sitio Cenícero</strong>
        </span>
      </div>

      {/* Action Buttons CTA */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <a
          href="#menu"
          className="px-5 py-2.5 rounded-full bg-[#C7435E] hover:bg-[#A8324D] text-white text-sm font-semibold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Ver menú</span>
          <ChevronDown className="w-4 h-4 stroke-2" />
        </a>

        <button
          type="button"
          onClick={openCart}
          className="px-5 py-2.5 rounded-full bg-[#FFF4E2] border-2 border-[#EABA68] text-[#281101] hover:bg-[#EABA68]/20 text-sm font-semibold active:scale-95 transition-all shadow-xs"
        >
          Ordenar ahora
        </button>
      </div>
    </section>
  );
}
