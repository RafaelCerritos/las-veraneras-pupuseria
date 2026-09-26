export type MasaType = 'Maíz' | 'Arroz';

export interface PupusaSpot {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}

export interface PupusaItem {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  isPromo: boolean;
  promoText?: string;
  spots: PupusaSpot[];
}

export interface CartItem {
  id: string; // e.g. "frijol-queso-Maíz"
  pupusaId: string;
  name: string;
  masa: MasaType;
  qty: number;
  basePrice: number;
  isPromo: boolean;
}

export interface CartTotals {
  totalCount: number;
  totalPrice: number;
  frijolPromoSavings: number;
}
