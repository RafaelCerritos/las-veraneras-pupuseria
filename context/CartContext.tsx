'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CartItem, CartTotals, MasaType } from '@/types/pupusa';
import { calculateCartTotals, PUPUSA_CATALOG } from '@/data/menu';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (pupusaId: string, masa: MasaType, qty?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  activeToast: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Lazy state initializer to load cart on client without setState in effect
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('las_veraneras_cart');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Ignore JSON error
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('las_veraneras_cart', JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast((current) => (current === msg ? null : current));
    }, 2200);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (pupusaId: string, masa: MasaType, qty = 1) => {
    const product = PUPUSA_CATALOG.find((p) => p.id === pupusaId);
    if (!product || qty <= 0) return;

    const itemId = `${pupusaId}-${masa}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: itemId,
        pupusaId: product.id,
        name: product.name,
        masa,
        qty,
        basePrice: product.basePrice,
        isPromo: product.isPromo,
      };
      return [...prevItems, newItem];
    });

    showToast(`¡${qty} ${product.name} (${masa}) agregada${qty > 1 ? 's' : ''}!`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems
        .map((it) => {
          if (it.id === itemId) {
            const nextQty = it.qty + delta;
            return nextQty > 0 ? { ...it, qty: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((it) => it.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        activeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
