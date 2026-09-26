'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingBag } from 'lucide-react';

const LOGO_THUMB_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDskRTI-L1aluCNe5DX3XdqvQBc9FIXUX5k1pCmu0NvA1mPE78XXKbGd-x2IS9c3QgL9SPVvYtsMqvPY8ZU9LFQtYPCtvWkEYuNIkm2FJIq0_5aEMAOrqjuAgz5HJF8bmxtkatkyZ_PsmHI9HgPBfA6mLPtn7jlzcTCcbsMs_e8oi-yuZ7ot-FXkmIyIJEBOlvOhYMD_1T3Pj7rfq9MY3et6Y1GI1mWrMNgHFJULt25N94ppK6bCrk6kH-MFcVcE7GcKw';

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { totals, openCart } = useCart();

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const closeNav = () => setIsNavOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FEF3E0]/95 backdrop-blur-md border-b border-[#EABA68]/30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Mobile Hamburger & Desktop Navigation */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={toggleNav}
            aria-label="Abrir menú de navegación"
            className="md:hidden p-2 rounded-xl text-[#4A2C0D] hover:bg-[#F5D18A]/40 transition-colors focus:outline-none"
          >
            {isNavOpen ? <X className="w-6 h-6 stroke-2" /> : <Menu className="w-6 h-6 stroke-2" />}
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#4A2C0D]">
            <a href="#hero" className="hover:text-[#C7435E] transition-colors">
              Inicio
            </a>
            <a href="#menu" className="hover:text-[#C7435E] transition-colors">
              Nuestro Menú
            </a>
            <a href="#nosotros" className="hover:text-[#C7435E] transition-colors">
              Tradición
            </a>
            <a href="#ubicacion" className="hover:text-[#C7435E] transition-colors">
              Ubicación
            </a>
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group text-center select-none">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#EABA68]/60 shadow-xs flex-shrink-0 bg-[#FFF4E2]">
            <Image
              src={LOGO_THUMB_URL}
              alt="Las Veraneras Pupusería"
              fill
              sizes="32px"
              className="object-cover"
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="font-artesanal text-base sm:text-lg font-bold tracking-tight text-[#281101]">
              LAS VERANERAS
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase font-bold letter-spacing-wide text-[#B87519] mt-0.5">
              PUPUSERÍA
            </span>
          </div>
        </a>

        {/* Right: Cart Button with Dynamic Badge */}
        <button
          type="button"
          onClick={openCart}
          aria-label="Ver carrito de compras"
          className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFF4E2] border border-[#EABA68]/50 text-[#4A2C0D] shadow-xs hover:border-[#C7435E] hover:bg-white active:scale-95 transition-all focus:outline-none"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2 text-[#4A2C0D]" />
            {totals.totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C7435E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200">
                {totals.totalCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline-block text-xs font-bold text-[#281101]">
            {totals.totalCount > 0 ? `$${totals.totalPrice.toFixed(2)}` : 'Mi Pedido'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isNavOpen && (
        <nav className="md:hidden border-t border-[#EABA68]/20 bg-[#FEF3E0] px-6 py-4 space-y-3 shadow-md animate-in slide-in-from-top-2 duration-200">
          <a
            href="#hero"
            onClick={closeNav}
            className="block text-[#4A2C0D] font-semibold text-sm hover:text-[#C7435E]"
          >
            Inicio
          </a>
          <a
            href="#menu"
            onClick={closeNav}
            className="block text-[#4A2C0D] font-semibold text-sm hover:text-[#C7435E]"
          >
            Nuestro Menú
          </a>
          <a
            href="#nosotros"
            onClick={closeNav}
            className="block text-[#4A2C0D] font-semibold text-sm hover:text-[#C7435E]"
          >
            Tradición y Calidad
          </a>
          <a
            href="#ubicacion"
            onClick={closeNav}
            className="block text-[#4A2C0D] font-semibold text-sm hover:text-[#C7435E]"
          >
            Horarios & Ubicación
          </a>

          <div className="pt-2 border-t border-[#EABA68]/30 flex items-center justify-between">
            <span className="text-xs text-[#53601F] font-medium">
              🌽 Maíz y 🍚 Arroz calientitas
            </span>
            <button
              type="button"
              onClick={() => {
                closeNav();
                openCart();
              }}
              className="text-xs font-bold text-[#C7435E] underline"
            >
              Ver mi pedido ({totals.totalCount})
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
