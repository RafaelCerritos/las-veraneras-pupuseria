import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Las Veraneras Pupusería | El sabor de nuestras pupusas, hecho con tradición',
  description: 'Disfruta pupusas hechas con masa de maíz y arroz, preparadas con ingredientes tradicionales y mucho sabor salvadoreño. Pide en línea por WhatsApp.',
  openGraph: {
    title: 'Las Veraneras Pupusería',
    description: 'El sabor de nuestras pupusas, hecho con tradición salvadoreña. Haz tu pedido por WhatsApp.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Veraneras Pupusería',
    description: 'El sabor de nuestras pupusas, hecho con tradición salvadoreña.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FEF3E0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FEF3E0] text-[#4A2C0D] antialiased selection:bg-[#C7435E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
