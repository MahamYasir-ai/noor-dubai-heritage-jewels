import React, { useState, useEffect } from 'react';
import { CurrencyCode, Language, Product, CartItem } from './types';
import { ALL_PRODUCTS, VAULT_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { AtmosphericParticles } from './components/AtmosphericParticles';
import { Scene1HeroBox } from './components/Scene1HeroBox';
import { Scene2FloatingJewel } from './components/Scene2FloatingJewel';
import { Scene3FallingJewelry } from './components/Scene3FallingJewelry';
import { Scene4EditorialWoman } from './components/Scene4EditorialWoman';
import { Scene5PrivateVault } from './components/Scene5PrivateVault';
import { Scene6DubaiAfterDark } from './components/Scene6DubaiAfterDark';
import { Scene7GoldArchitecture } from './components/Scene7GoldArchitecture';
import { Scene8Collections } from './components/Scene8Collections';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Scene10BespokeAtelier } from './components/Scene10BespokeAtelier';
import { Scene11Generations } from './components/Scene11Generations';
import { Scene12Craftsmanship } from './components/Scene12Craftsmanship';
import { Scene13Heritage } from './components/Scene13Heritage';
import { Scene14PrivateClient } from './components/Scene14PrivateClient';
import { Scene15FinalScreen } from './components/Scene15FinalScreen';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PrivateViewingModal } from './components/PrivateViewingModal';
import { RoyalReviewsPopup } from './components/RoyalReviewsPopup';
import { RoyalVoiceConcierge } from './components/RoyalVoiceConcierge';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('noordubai_lang') as Language) || (localStorage.getItem('thuraya_lang') as Language) || 'en';
  });

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    return (localStorage.getItem('noordubai_currency') as CurrencyCode) || (localStorage.getItem('thuraya_currency') as CurrencyCode) || 'AED';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('noordubai_cart') || localStorage.getItem('thuraya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('noordubai_wishlist') || localStorage.getItem('thuraya_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Sync Language and Direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('noordubai_lang', lang);
  }, [lang]);

  // Sync Currency
  useEffect(() => {
    localStorage.setItem('noordubai_currency', currency);
  }, [currency]);

  // Sync Cart
  useEffect(() => {
    localStorage.setItem('noordubai_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist
  useEffect(() => {
    localStorage.setItem('noordubai_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const handleAddToCart = (product: Product, packaging: 'signature' | 'royal-mahogany' | 'velvet-travel' = 'signature') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.packaging === packaging);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${packaging}-${Date.now()}`,
          productId: product.id,
          product,
          quantity: 1,
          packaging
        }
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF4EB] text-[#24170D] relative ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Subtle Floating Atmospheric Gold Dust Particles */}
      <AtmosphericParticles density={28} />

      {/* TOP NAVIGATION BAR WITH LIVE DUBAI GOLD RATES & CURRENCY SWITCHER */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* SCENE 1 — THE JEWELRY BOX (Real 21K Bridal Set inside opening velvet box) */}
      <Scene1HeroBox
        lang={lang}
        currency={currency}
        featuredProduct={VAULT_PRODUCTS[0]} // The Sovereign 280g Mirtasha Bib Necklace
        onEnterHouse={() => scrollToSection('floating-jewel')}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 2 — THE FLOATING JEWEL (Real Bestseller Hab Al Hail Bangles with dynamic spotlight) */}
      <Scene2FloatingJewel
        lang={lang}
        currency={currency}
        featuredProduct={VAULT_PRODUCTS[1]} // Hab Al Hail Royal Bangles
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 3 — JEWELRY FALLING FROM THE SKY (Real photographic 21K pieces) */}
      <Scene3FallingJewelry
        lang={lang}
        currency={currency}
        products={ALL_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 4 — THE WOMAN WEARING THE JEWEL (Editorial with macro zoom - used only once) */}
      <Scene4EditorialWoman
        lang={lang}
        currency={currency}
        products={ALL_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 5 — THE PRIVATE VAULT (5 unique real gold treasures with live currency pricing) */}
      <Scene5PrivateVault
        lang={lang}
        currency={currency}
        vaultProducts={VAULT_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 6 — DUBAI AFTER DARK (Real nighttime pavilion with real gold sets) */}
      <Scene6DubaiAfterDark
        lang={lang}
        currency={currency}
        products={ALL_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 7 — THE ARCHITECTURE OF 21K GOLD (Real craft to heirloom parure) */}
      <Scene7GoldArchitecture
        lang={lang}
        currency={currency}
        products={ALL_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* SCENE 8 — THE COLLECTION (21+ Real gold sets & jewels with dynamic currency conversion) */}
      <Scene8Collections
        lang={lang}
        currency={currency}
        products={ALL_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* SCENE 10 — BESPOKE JEWELRY (CREATE YOUR HEIRLOOM with real photo previews) */}
      <Scene10BespokeAtelier
        lang={lang}
        currency={currency}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* SCENE 11 — GENERATIONS (Grandmother, Mother, Daughter passing heirloom) */}
      <Scene11Generations
        lang={lang}
      />

      {/* SCENE 12 — CRAFTSMANSHIP (Artisan atelier macro) */}
      <Scene12Craftsmanship
        lang={lang}
      />

      {/* SCENE 13 — MIDDLE EASTERN HERITAGE */}
      <Scene13Heritage
        lang={lang}
      />

      {/* SCENE 14 — PRIVATE CLIENT EXPERIENCE & SALONS */}
      <Scene14PrivateClient
        lang={lang}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* SCENE 15 — FINAL SCREEN & BRAND FOOTER */}
      <Scene15FinalScreen
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* SCENE 9 — INTERACTIVE 360° PRODUCT INSPECTION CHAMBER MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        lang={lang}
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenBooking={() => {
          setSelectedProduct(null);
          setBookingOpen(true);
        }}
      />

      {/* CART ACQUISITIONS DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        lang={lang}
        currency={currency}
      />

      {/* WISHLIST VAULT DRAWER */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        products={ALL_PRODUCTS}
        wishlistIds={wishlistIds}
        onRemove={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        lang={lang}
        currency={currency}
      />

      {/* PRIVATE VIEWING & SALON RESERVATION MODAL */}
      <PrivateViewingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        lang={lang}
      />

      {/* ROYAL VIP CLIENT REVIEWS POPUP (Pops up automatically as user scrolls down) */}
      <RoyalReviewsPopup
        lang={lang}
      />

      {/* ROYAL VOICE CONCIERGE (Aristocratic voice narrator with majestic court tone) */}
      <RoyalVoiceConcierge
        lang={lang}
      />

    </div>
  );
}
