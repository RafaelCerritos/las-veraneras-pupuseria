import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#EABA68]/40 bg-[#F8ECDA] py-8 px-6 text-center space-y-4 text-xs text-[#57391A]">
      <div className="flex items-center justify-center gap-1.5">
        <span className="font-artesanal text-base sm:text-lg font-bold text-[#281101]">
          LAS VERANERAS PUPUSERÍA
        </span>
      </div>

      <p className="italic text-[#A8324D] font-medium text-xs sm:text-sm">
        &ldquo;El sabor de nuestras pupusas, hecho con tradición.&rdquo;
      </p>

      <nav aria-label="Enlaces de pie de página" className="flex justify-center items-center gap-3 sm:gap-4 text-[#4A2C0D] font-semibold text-xs pt-1">
        <a href="#hero" className="hover:text-[#C7435E] transition-colors">
          Inicio
        </a>
        <span className="text-[#EABA68]">•</span>
        <a href="#menu" className="hover:text-[#C7435E] transition-colors">
          Menú
        </a>
        <span className="text-[#EABA68]">•</span>
        <a href="#nosotros" className="hover:text-[#C7435E] transition-colors">
          Nosotros
        </a>
        <span className="text-[#EABA68]">•</span>
        <a href="#ubicacion" className="hover:text-[#C7435E] transition-colors">
          Contacto
        </a>
      </nav>

      <div className="pt-2 text-[10px] sm:text-[11px] text-[#B87519]">
        © {currentYear} Las Veraneras Pupusería. Hecho con amor salvadoreño 🇸🇻.
      </div>
    </footer>
  );
}
