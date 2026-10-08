export type CurrencyCode = 'AED' | 'SAR' | 'QAR' | 'KWD' | 'OMR' | 'BHD' | 'USD' | 'EUR' | 'GBP';
export type Language = 'en' | 'ar';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: 'bangles' | 'bracelets' | 'necklaces' | 'rings' | 'earrings' | 'high-jewelry';
  categoryLabelEn: string;
  categoryLabelAr: string;
  goldPurity: string;
  goldPurityAr: string;
  metalColor: 'yellow' | 'white' | 'rose' | 'two-tone';
  gemstone: string;
  gemstoneAr: string;
  caratTotal: string;
  priceAED: number;
  image: string;
  secondaryImage?: string;
  description: string;
  descriptionAr: string;
  story: string;
  storyAr: string;
  hallmark: string;
  isVaultExclusive?: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedMetal?: string;
  engraving?: string;
  packaging: 'signature' | 'royal-mahogany' | 'velvet-travel';
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface BespokeState {
  goldType: '21k-yellow' | '18k-white' | '18k-rose';
  stone: 'diamond' | 'emerald' | 'ruby' | 'sapphire';
  form: 'ring' | 'bangle' | 'bracelet' | 'necklace' | 'earrings';
  caratSize: number;
  engravingText: string;
  script: 'arabic' | 'latin';
}

export interface ViewingBooking {
  clientName: string;
  phone: string;
  email: string;
  salonLocation: 'dubai-difc' | 'abu-dhabi' | 'riyadh' | 'doha' | 'private-residence';
  preferredDate: string;
  preferredTime: string;
  pieceOfInterest: string;
  conciergeNotes?: string;
}
