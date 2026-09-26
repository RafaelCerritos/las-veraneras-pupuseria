'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { AboutSection } from '@/components/AboutSection';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { StickyBottomBar } from '@/components/StickyBottomBar';
import { Toast } from '@/components/Toast';

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FEF3E0] text-[#4A2C0D] relative pb-20 md:pb-24 selection:bg-[#C7435E] selection:text-white">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <main className="max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-8 space-y-8 sm:space-y-12 flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Catalog / Menu Section */}
          <MenuSection />

          {/* About & Location Sections (stacked on mobile, 2-col on lg for optimal space utilization) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <AboutSection />
            <LocationSection />
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Shopping Cart Drawer */}
        <CartDrawer />

        {/* Floating Quick Order Sticky Bar */}
        <StickyBottomBar />

        {/* Action Toast Notifications */}
        <Toast />
      </div>
    </CartProvider>
  );
}
