import { CartItem, CartTotals, PupusaItem } from '@/types/pupusa';

export const WHATSAPP_PHONE_NUMBER = '50363165227';
export const WHATSAPP_DISPLAY_PHONE = '+503 6316 5227';
export const WHATSAPP_PLACEHOLDER = WHATSAPP_PHONE_NUMBER;

export const PUPUSA_CATALOG: PupusaItem[] = [
  {
    id: 'frijol-queso',
    name: 'Frijol con Queso',
    desc: 'La clásica salvadoreña con frijolitos molidos y queso derretido.',
    basePrice: 0.35,
    isPromo: true,
    promoText: '3 x $1.00',
    spots: [
      { cx: 24, cy: 24, r: 3, color: '#B87519' },
      { cx: 33, cy: 29, r: 4, color: '#57391A', opacity: 0.7 },
      { cx: 28, cy: 33, r: 2.5, color: '#B87519' },
    ],
  },
  {
    id: 'revuelta',
    name: 'Revuelta',
    desc: 'Chicharrón, frijol y queso tradicional.',
    basePrice: 0.75,
    isPromo: false,
    spots: [
      { cx: 23, cy: 22, r: 3.5, color: '#B87519' },
      { cx: 32, cy: 25, r: 4, color: '#C7435E', opacity: 0.65 },
      { cx: 27, cy: 32, r: 3, color: '#57391A' },
    ],
  },
  {
    id: 'ayote-queso',
    name: 'Ayote con Queso',
    desc: 'Tierno ayote rallado con queso derretido.',
    basePrice: 0.75,
    isPromo: false,
    spots: [
      { cx: 25, cy: 24, r: 3.5, color: '#73802C', opacity: 0.75 },
      { cx: 32, cy: 28, r: 3, color: '#B87519' },
    ],
  },
  {
    id: 'mora-queso',
    name: 'Mora con Queso',
    desc: 'Hojas frescas de mora silvestre con queso artesanal.',
    basePrice: 0.75,
    isPromo: false,
    spots: [
      { cx: 24, cy: 26, r: 3, color: '#53601F' },
      { cx: 33, cy: 24, r: 3.5, color: '#73802C', opacity: 0.8 },
    ],
  },
  {
    id: 'queso',
    name: 'Queso',
    desc: 'Puro queso artesanal con la textura y estirado ideal.',
    basePrice: 1.00,
    isPromo: false,
    spots: [
      { cx: 26, cy: 25, r: 5, color: '#FFF4E2', opacity: 0.85 },
      { cx: 31, cy: 30, r: 3, color: '#B87519' },
    ],
  },
  {
    id: 'queso-loroco',
    name: 'Queso con Loroco',
    desc: 'Aromático loroco salvadoreño finamente picado con queso fundido.',
    basePrice: 1.00,
    isPromo: false,
    spots: [
      { cx: 24, cy: 24, r: 2.5, color: '#73802C' },
      { cx: 32, cy: 26, r: 3.5, color: '#53601F' },
      { cx: 27, cy: 32, r: 2, color: '#73802C' },
    ],
  },
  {
    id: 'chicharron-queso',
    name: 'Chicharrón con Queso',
    desc: 'Delicioso chicharrón de cerdo sazonado y queso derretido.',
    basePrice: 1.00,
    isPromo: false,
    spots: [
      { cx: 24, cy: 25, r: 4, color: '#57391A' },
      { cx: 33, cy: 28, r: 3, color: '#B87519' },
    ],
  },
  {
    id: 'jalapeno-queso',
    name: 'Jalapeño con Queso',
    desc: 'Toque picante y delicioso con abundante queso derretido.',
    basePrice: 1.00,
    isPromo: false,
    spots: [
      { cx: 25, cy: 25, r: 3.5, color: '#73802C' },
      { cx: 32, cy: 27, r: 3, color: '#C7435E' },
    ],
  },
];

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Calculates subtotal for an individual cart item line.
 * For Frijol con Queso: 3 for $1.00 ($0.35 each remainder).
 */
export function calculateItemSubtotal(item: CartItem): number {
  if (item.pupusaId === 'frijol-queso') {
    const promoGroups = Math.floor(item.qty / 3);
    const remainder = item.qty % 3;
    return Math.round((promoGroups * 1.0 + remainder * 0.35) * 100) / 100;
  }
  return Math.round(item.qty * item.basePrice * 100) / 100;
}

/**
 * Calculates totals for entire cart, correctly aggregating all Frijol con Queso
 * across different masa choices to maximize user promo savings.
 */
export function calculateCartTotals(items: CartItem[]): CartTotals {
  let totalCount = 0;
  let regularSum = 0;
  let totalFrijolQty = 0;

  for (const item of items) {
    totalCount += item.qty;
    if (item.pupusaId === 'frijol-queso') {
      totalFrijolQty += item.qty;
    } else {
      regularSum += item.qty * item.basePrice;
    }
  }

  // Frijol con Queso calculation
  let frijolPrice = 0;
  let frijolPromoSavings = 0;
  if (totalFrijolQty > 0) {
    const promoGroups = Math.floor(totalFrijolQty / 3);
    const remainder = totalFrijolQty % 3;
    frijolPrice = Math.round((promoGroups * 1.0 + remainder * 0.35) * 100) / 100;
    // Each group of 3 saves 3 * 0.35 - 1.00 = $0.05
    frijolPromoSavings = Math.round(promoGroups * 0.05 * 100) / 100;
  }

  const totalPrice = Math.round((regularSum + frijolPrice) * 100) / 100;

  return {
    totalCount,
    totalPrice,
    frijolPromoSavings,
  };
}

/**
 * Builds the WhatsApp order text as specified:
 *
 * Hola, Las Veraneras Pupusería.
 *
 * Quiero realizar el siguiente pedido:
 *
 * 🫓 Frijol/queso (Maíz) x3 — $1.00
 * 🫓 Revuelta (Arroz) x2 — $1.50
 * 🫓 Queso (Maíz) x1 — $1.00
 *
 * Total: $3.50
 */
export function generateWhatsAppOrderUrl(items: CartItem[], customerName?: string): string {
  if (items.length === 0) return '#';

  const { totalPrice } = calculateCartTotals(items);

  const cleanName = customerName?.trim();
  const greeting = cleanName
    ? `Hola, Las Veraneras Pupusería.\n\nMi nombre es ${cleanName} y quiero realizar el siguiente pedido:\n\n`
    : `Hola, Las Veraneras Pupusería.\n\nQuiero realizar el siguiente pedido:\n\n`;

  let message = greeting;

  items.forEach((item) => {
    const subtotal = calculateItemSubtotal(item);
    message += `🫓 ${item.name} (${item.masa}) x${item.qty} — ${formatPrice(subtotal)}\n`;
  });

  message += `\nTotal: ${formatPrice(totalPrice)}\n\n¿Me confirman si recibieron el pedido y el tiempo estimado de entrega? ¡Muchas gracias!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}
