'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { calculateItemSubtotal, formatPrice, generateWhatsAppOrderUrl } from '@/data/menu';

type CartStep = 'cart' | 'customer_info' | 'confirmation';

export function CartDrawer() {
  const {
    items,
    totals,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<CartStep>('cart');
  const [customerName, setCustomerName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // If cart becomes empty, return to 'cart' step
  useEffect(() => {
    if (items.length === 0 && step !== 'cart') {
      setStep('cart');
    }
  }, [items.length, step]);

  if (!isCartOpen) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(items, customerName);

  const handleProceedToConfirmation = () => {
    if (!customerName.trim()) {
      setNameError('Por favor, ingresa tu nombre para continuar con el pedido.');
      return;
    }
    setNameError('');
    setStep('confirmation');
  };

  const getHeaderTitle = () => {
    switch (step) {
      case 'customer_info':
        return 'Datos del Cliente';
      case 'confirmation':
        return 'Confirmar Pedido';
      default:
        return 'Tu Pedido';
    }
  };

  const getHeaderSubtitle = () => {
    switch (step) {
      case 'customer_info':
        return 'Paso 2 de 3';
      case 'confirmation':
        return 'Paso 3 de 3';
      default:
        return 'Recién salidas del comal';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#281101]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container: bottom slide-up on mobile, right slide-in on md+ */}
      <div className="fixed inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:left-auto md:w-full md:max-w-md z-50 flex flex-col pointer-events-none">
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
          className="pointer-events-auto bg-[#FEF3E0] rounded-t-3xl md:rounded-t-none md:rounded-l-3xl max-h-[90vh] md:max-h-full h-full flex flex-col shadow-drawer border-t-2 md:border-t-0 md:border-l-2 border-[#EABA68] animate-in slide-in-from-bottom md:slide-in-from-right duration-300 ease-out"
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-[#EABA68]/30 flex items-center justify-between bg-[#FFF4E2]/60">
            <div className="flex items-center gap-2.5">
              {step !== 'cart' ? (
                <button
                  type="button"
                  onClick={() => {
                    setNameError('');
                    if (step === 'confirmation') setStep('customer_info');
                    else setStep('cart');
                  }}
                  aria-label="Volver al paso anterior"
                  className="p-1.5 -ml-1 rounded-full text-[#57391A] hover:text-[#281101] hover:bg-[#F5D18A]/40 transition-colors focus:outline-none"
                >
                  <ArrowLeft className="w-5 h-5 stroke-2" />
                </button>
              ) : (
                <span className="text-2xl" role="img" aria-label="Pupusa">
                  🫓
                </span>
              )}
              <div>
                <h3 className="font-artesanal text-lg font-bold text-[#281101] leading-tight">
                  {getHeaderTitle()}
                </h3>
                <p className="text-[11px] text-[#57391A]">{getHeaderSubtitle()}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="p-2 rounded-full text-[#57391A] hover:text-[#281101] hover:bg-[#F5D18A]/40 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5 stroke-2" />
            </button>
          </div>

          {/* Special Promo Notice inside cart (only on cart step) */}
          {step === 'cart' && (
            <div className="bg-[#EABA68]/20 px-4 py-2 border-b border-[#EABA68]/30 flex items-center justify-between text-[11px] text-[#57391A]">
              <span className="font-semibold text-[#281101]">
                ✨ Promo Frijol c/ Queso: 3 por $1.00
              </span>
              <span className="text-[#53601F] font-bold">Auto-aplicada</span>
            </div>
          )}

          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {/* Scrollable Item List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#EABA68]/20">
                {items.length === 0 ? (
                  <div className="py-14 px-4 text-center space-y-3">
                    <span className="text-5xl block animate-bounce duration-1000">🫓</span>
                    <p className="font-artesanal text-lg font-bold text-[#281101]">
                      Tu carrito está vacío
                    </p>
                    <p className="text-xs text-[#57391A] max-w-xs mx-auto leading-relaxed">
                      ¡Elige tus pupusas favoritas recién salidas del comal y agrégalas para armar tu pedido!
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-3 px-5 py-2.5 rounded-xl bg-[#EABA68] text-[#281101] text-xs font-bold shadow-xs hover:bg-[#F5D18A] transition-colors"
                    >
                      Ir a elegir pupusas
                    </button>
                  </div>
                ) : (
                  items.map((item) => {
                    const subtotal = calculateItemSubtotal(item);
                    return (
                      <div
                        key={item.id}
                        className="pt-3 first:pt-0 flex items-center justify-between gap-3 animate-in fade-in duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-artesanal font-bold text-sm text-[#281101] truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F5D18A]/50 border border-[#EABA68]/40 text-[#53601F]">
                              {item.masa}
                            </span>
                          </div>
                          <div className="text-xs text-[#57391A] flex items-center gap-2 mt-0.5">
                            <span>
                              {item.qty} ×{' '}
                              {item.isPromo && item.qty >= 3 ? 'promo 3x$1' : formatPrice(item.basePrice)}
                            </span>
                            <span className="font-bold text-[#281101]">
                              = {formatPrice(subtotal)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center rounded-lg bg-white border border-[#EABA68]/50 h-7 px-1 shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label={`Disminuir ${item.name}`}
                              className="w-6 h-full flex items-center justify-center text-[#4A2C0D] hover:text-[#C7435E] font-bold text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-[#281101] tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label={`Aumentar ${item.name}`}
                              className="w-6 h-full flex items-center justify-center text-[#4A2C0D] hover:text-[#C7435E] font-bold text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Eliminar ${item.name}`}
                            className="p-1.5 text-[#57391A] hover:text-[#C7435E] hover:bg-[#F5D18A]/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer & Totals */}
              {items.length > 0 && (
                <div className="p-4 border-t border-[#EABA68]/30 bg-[#FFF4E2] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#57391A]">
                    <div className="flex justify-between items-center">
                      <span>Total de pupusas:</span>
                      <span className="font-bold text-[#281101] text-sm tabular-nums">
                        {totals.totalCount}
                      </span>
                    </div>
                    {totals.frijolPromoSavings > 0 && (
                      <div className="flex justify-between items-center text-[#53601F] text-[11px] font-semibold">
                        <span>Ahorro promoción 3x$1:</span>
                        <span>-{formatPrice(totals.frijolPromoSavings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-bold text-[#281101] pt-1 border-t border-[#EABA68]/20">
                      <span>Total a Pagar:</span>
                      <span className="text-xl text-[#C7435E] font-artesanal tabular-nums">
                        {formatPrice(totals.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    {/* Button to proceed to Customer Info */}
                    <button
                      type="button"
                      onClick={() => setStep('customer_info')}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                    >
                      <svg
                        className="w-5 h-5 fill-current flex-shrink-0"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Pedir por WhatsApp</span>
                    </button>

                    {/* Clear Cart Button */}
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full py-2 text-center text-xs font-semibold text-[#A8324D] hover:text-[#C7435E] transition-colors"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CUSTOMER INFO */}
          {step === 'customer_info' && (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-in fade-in duration-200">
                {/* Order quick overview */}
                <div className="bg-[#FFF4E2] border border-[#EABA68]/40 rounded-2xl p-4 text-xs text-[#57391A] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#281101] block text-sm">Resumen de tu orden</span>
                    <span>{totals.totalCount} {totals.totalCount === 1 ? 'pupusa' : 'pupusas'} seleccionadas</span>
                  </div>
                  <span className="font-artesanal text-base font-bold text-[#C7435E] tabular-nums">
                    {formatPrice(totals.totalPrice)}
                  </span>
                </div>

                {/* Form Field */}
                <div className="bg-white rounded-2xl p-4 border border-[#EABA68]/50 shadow-xs space-y-2">
                  <label htmlFor="customer-name" className="block text-xs font-bold text-[#281101] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B87519]" />
                    <span>Nombre del cliente</span>
                    <span className="text-[#C7435E] font-bold">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleProceedToConfirmation();
                      }
                    }}
                    placeholder="Ingresa tu nombre"
                    autoFocus
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border ${
                      nameError ? 'border-[#C7435E] ring-1 ring-[#C7435E]' : 'border-[#EABA68]/60 focus:border-[#C7435E]'
                    } text-sm text-[#281101] placeholder:text-[#57391A]/50 focus:outline-none focus:ring-1 focus:ring-[#C7435E] transition-all shadow-xs`}
                  />
                  {nameError && (
                    <p className="text-xs text-[#C7435E] font-medium flex items-center gap-1 mt-1.5 animate-in fade-in">
                      <span>⚠️</span>
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-[#57391A] leading-relaxed px-1">
                  Tu nombre será incluido en el pedido para que podamos identificarlo fácilmente al prepararlo y entregártelo.
                </p>
              </div>

              {/* Customer Info Footer */}
              <div className="p-4 border-t border-[#EABA68]/30 bg-[#FFF4E2] space-y-2.5">
                <button
                  type="button"
                  onClick={handleProceedToConfirmation}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#C7435E] hover:bg-[#A8324D] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <span>Continuar a confirmación</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNameError('');
                    setStep('cart');
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-[#57391A] hover:text-[#281101] transition-colors"
                >
                  Volver al carrito
                </button>
              </div>
            </>
          )}

          {/* STEP 3: ORDER CONFIRMATION */}
          {step === 'confirmation' && (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-in fade-in duration-200">
                {/* Header Banner */}
                <div className="text-center pb-2 border-b border-[#EABA68]/30">
                  <h4 className="font-artesanal text-base sm:text-lg font-bold text-[#281101] tracking-wide">
                    CONFIRMAR PEDIDO
                  </h4>
                  <p className="text-xs text-[#57391A] mt-0.5">
                    Revisa los datos antes de enviar a WhatsApp
                  </p>
                </div>

                {/* Cliente */}
                <div className="bg-white rounded-2xl p-3.5 border border-[#EABA68]/50 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#57391A] uppercase tracking-wider block">
                      Nombre:
                    </span>
                    <span className="font-artesanal text-base font-bold text-[#281101]">
                      {customerName.trim()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('customer_info')}
                    className="text-xs font-semibold text-[#C7435E] hover:underline px-2 py-1 rounded-lg hover:bg-[#F5D18A]/20"
                  >
                    Editar
                  </button>
                </div>

                {/* Lista de productos */}
                <div className="bg-white rounded-2xl p-4 border border-[#EABA68]/50 shadow-xs space-y-3">
                  <span className="text-[11px] font-bold text-[#57391A] uppercase tracking-wider block border-b border-[#EABA68]/20 pb-1.5">
                    Tu pedido:
                  </span>

                  <div className="space-y-2 divide-y divide-[#EABA68]/20">
                    {items.map((item) => {
                      const subtotal = calculateItemSubtotal(item);
                      return (
                        <div
                          key={item.id}
                          className="pt-2 first:pt-0 flex items-center justify-between text-xs gap-2"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-sm">🫓</span>
                            <span className="font-bold text-[#281101] truncate">
                              {item.name}{' '}
                              <span className="text-[#57391A] font-normal">
                                ({item.masa})
                              </span>{' '}
                              × {item.qty}
                            </span>
                          </div>
                          <span className="font-bold text-[#281101] tabular-nums flex-shrink-0">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {totals.frijolPromoSavings > 0 && (
                    <div className="pt-2 border-t border-[#EABA68]/20 flex justify-between items-center text-[#53601F] text-[11px] font-semibold">
                      <span>Ahorro promoción 3x$1:</span>
                      <span>-{formatPrice(totals.frijolPromoSavings)}</span>
                    </div>
                  )}

                  {/* TOTAL */}
                  <div className="pt-3 border-t border-[#EABA68]/30 flex justify-between items-center">
                    <span className="font-artesanal text-sm font-bold text-[#281101] uppercase tracking-wider">
                      TOTAL
                    </span>
                    <span className="font-artesanal text-xl font-bold text-[#C7435E] tabular-nums">
                      {formatPrice(totals.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Nota de horario y confirmación */}
                <div className="bg-[#FFF4E2] border border-[#EABA68]/50 rounded-2xl p-3.5 text-xs text-[#57391A] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#281101]">
                    <span className="text-base" role="img" aria-label="Horario">🗓️</span>
                    <span>Atención: Solo Sábados</span>
                  </div>
                  <div className="space-y-1 pl-6 text-[11px] leading-relaxed text-[#4A2C0D]">
                    <p>
                      📝 <strong className="text-[#281101]">Recepción de pedidos:</strong> 6:00 AM – 7:00 PM
                    </p>
                    <p>
                      🛵 <strong className="text-[#281101]">Repartos a domicilio:</strong> 5:00 PM – 8:00 PM (<span className="font-semibold text-[#281101]">El Sitio Cenícero</span>)
                    </p>
                    <p className="pt-1 text-[#53601F] font-medium border-t border-[#EABA68]/30">
                      📲 Al enviar tu pedido, el restaurante te responderá confirmando la recepción y tiempo estimado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirmation Footer */}
              <div className="p-4 border-t border-[#EABA68]/30 bg-[#FFF4E2] space-y-2.5">
                {/* Confirm and send via WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <svg
                    className="w-5 h-5 fill-current flex-shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Confirmar y pedir por WhatsApp</span>
                </a>

                {/* Back to Cart Button */}
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-full py-2 text-center text-xs font-semibold text-[#57391A] hover:text-[#281101] transition-colors"
                >
                  Volver al carrito
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
