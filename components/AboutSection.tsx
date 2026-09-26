import React from 'react';
import { Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#FFF9EE] to-[#F7E7CD] border border-[#EABA68]/40 shadow-xs space-y-4"
    >
      <div className="flex items-center gap-2 text-[#C7435E]">
        <Sparkles className="w-5 h-5 fill-current" />
        <h2 className="font-artesanal text-lg sm:text-xl font-bold text-[#281101]">
          Tradición que se disfruta
        </h2>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-[#57391A]">
        En <strong className="text-[#281101]">Las Veraneras Pupusería</strong> preparamos nuestras pupusas con el auténtico toque salvadoreño, utilizando masa de maíz y harina de arroz fina, con ingredientes frescos seleccionados para brindarte la mejor experiencia de comida casera.
      </p>

      {/* Key Value Pillars */}
      <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
        <div className="p-3 rounded-2xl bg-white/70 border border-[#EABA68]/30 flex flex-col items-center justify-center shadow-xs transition-transform hover:-translate-y-0.5">
          <span className="text-xl">🌿</span>
          <span className="text-[11px] sm:text-xs font-bold text-[#281101] mt-1 leading-tight">
            Ingredientes Frescos
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white/70 border border-[#EABA68]/30 flex flex-col items-center justify-center shadow-xs transition-transform hover:-translate-y-0.5">
          <span className="text-xl">🥣</span>
          <span className="text-[11px] sm:text-xs font-bold text-[#281101] mt-1 leading-tight">
            Curtido y Salsa Artesanal
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white/70 border border-[#EABA68]/30 flex flex-col items-center justify-center shadow-xs transition-transform hover:-translate-y-0.5">
          <span className="text-xl">🔥</span>
          <span className="text-[11px] sm:text-xs font-bold text-[#281101] mt-1 leading-tight">
            Hechas al Momento
          </span>
        </div>
      </div>
    </section>
  );
}
