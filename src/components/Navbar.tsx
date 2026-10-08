import React, { useState } from 'react';
import { Volume2, VolumeX, Bookmark, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { CurrencyCode, Language } from '../types';
import { CURRENCY_RATES } from '../data/products';
import { isSoundEnabled, toggleGlobalAudio, playChime } from '../utils/sound';
import { GoldRateTicker } from './GoldRateTicker';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  currency,
  setCurrency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBooking
}) => {
  const [audioActive, setAudioActive] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  const handleToggleAudio = () => {
    const nextState = !audioActive;
    toggleGlobalAudio(nextState);
    setAudioActive(nextState);
  };

  const handleCurrencySelect = (c: CurrencyCode) => {
    setCurrency(c);
    playChime(750);
  };

  const navLinks = [
    { label: isAr ? 'الخزانة الملكية' : 'The Vault', href: '#vault' },
    { label: isAr ? 'أطقم العرائس' : 'Bridal & Gold Sets', href: '#collections' },
    { label: isAr ? 'الافتتان' : 'Editorial', href: '#editorial' },
    { label: isAr ? 'المجوهرات الخاصة' : 'Bespoke Heirloom', href: '#bespoke' },
    { label: isAr ? 'الحرفية والتراث' : 'Craft & Heritage', href: '#craftsmanship' },
    { label: isAr ? 'الصالون الخاص' : 'Private Salons', href: '#salons' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF4EB]/95 backdrop-blur-md border-b border-[#D4AF37]/35 transition-all shadow-md">
      
      {/* LIVE DUBAI GOLD RATES & MOVING AD MARQUEE */}
      <GoldRateTicker lang={lang} currency={currency} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* ZONE 1: PURE ARABIC BRAND TITLE: NOOR DUBAI | دار نور دبي */}
        <a 
          href="#" 
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-display-royal text-xl sm:text-2xl tracking-[0.25em] text-[#24170D] group-hover:text-[#B48628] transition-colors font-bold">
            {isAr ? 'دار نور دبي' : 'NOOR DUBAI'}
          </span>
        </a>

        {/* ZONE 2: NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-[0.2em] font-semibold text-[#543E2D]">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:text-[#A0721E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B48628] hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ZONE 3: ACTIONS & CONTROLS */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Royal Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleAudio}
            title={audioActive ? 'Mute royal palace harmonics' : 'Enable royal palace ambient chime'}
            className="p-2 text-[#543E2D] hover:text-[#B48628] transition-colors rounded-full hover:bg-[#F0E4D3]"
            aria-label="Soundscape toggle"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-[#B48628]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Language Switch */}
          <div className="flex items-center text-[11px] font-bold tracking-wider text-[#543E2D] border border-[#D4AF37]/40 rounded-sm px-2 py-1 bg-[#F5EADB]">
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${lang === 'en' ? 'text-[#8C6418] font-black' : 'text-[#8C7662] hover:text-black'}`}
            >
              EN
            </button>
            <span className="text-[#C5A882]">|</span>
            <button
              onClick={() => setLang('ar')}
              className={`px-1.5 py-0.5 transition-colors font-arabic cursor-pointer ${lang === 'ar' ? 'text-[#8C6418] font-black' : 'text-[#8C7662] hover:text-black'}`}
            >
              عربي
            </button>
          </div>

          {/* CURRENCY SELECTOR */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => handleCurrencySelect(e.target.value as CurrencyCode)}
              className="text-[11px] font-bold tracking-wider uppercase bg-[#F5EADB] text-[#8C6418] border-2 border-[#D4AF37]/60 rounded-sm px-2.5 py-1 focus:outline-none focus:border-[#B48628] cursor-pointer shadow-sm"
              title="Change display currency"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c} className="bg-[#FAF4EB] text-[#24170D]">
                  {c} ({CURRENCY_RATES[c].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Private Viewing Booking Action */}
          <button
            onClick={onOpenBooking}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] tracking-[0.18em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 font-bold rounded-sm transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E1208]" />
            <span>{isAr ? 'حجز موعد خاص' : 'Private Viewing'}</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#543E2D] hover:text-[#B48628] transition-colors rounded-sm hover:bg-[#F0E4D3]"
            title={isAr ? 'القطع المحفوظة' : 'Saved Creations'}
            aria-label="Wishlist"
          >
            <Bookmark className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B48628] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#543E2D] hover:text-[#B48628] transition-colors rounded-sm hover:bg-[#F0E4D3]"
            title={isAr ? 'حقيبة المقتنيات' : 'Acquisitions Bag'}
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B48628] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#543E2D] hover:text-[#B48628]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF4EB] border-b border-[#D4AF37]/35 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm tracking-[0.2em] uppercase font-bold text-[#423122]">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B48628] py-1 border-b border-[#E8D9C5] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 flex items-center justify-between border-t border-[#D4AF37]/30">
            <span className="text-xs text-[#543E2D]">{isAr ? 'العملة المعتمدة:' : 'Currency:'}</span>
            <select
              value={currency}
              onChange={(e) => handleCurrencySelect(e.target.value as CurrencyCode)}
              className="text-xs bg-[#F5EADB] text-[#8C6418] border border-[#D4AF37]/60 rounded px-2.5 py-1 font-bold"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-2 py-3 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#B48628] hover:bg-[#926B1E] transition-colors rounded-sm"
          >
            {isAr ? 'حجز موعد استشارة خاصة' : 'Book Private Salon Viewing'}
          </button>
        </div>
      )}
    </header>
  );
};
