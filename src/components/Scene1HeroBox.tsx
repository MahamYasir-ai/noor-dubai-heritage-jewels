import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Sun } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playCelestialChord, playChime } from '../utils/sound';

interface Scene1Props {
  lang: Language;
  currency: CurrencyCode;
  featuredProduct: Product;
  onEnterHouse: () => void;
  onSelectProduct: (p: Product) => void;
}

export const Scene1HeroBox: React.FC<Scene1Props> = ({
  lang,
  currency,
  featuredProduct,
  onEnterHouse,
  onSelectProduct
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [beamPosition, setBeamPosition] = useState(30);
  const [sparklePulse, setSparklePulse] = useState(false);

  const isAr = lang === 'ar';

  // Dynamic moving light beam across the jewelry box
  useEffect(() => {
    const interval = setInterval(() => {
      setBeamPosition((prev) => (prev > 80 ? 20 : prev + 0.3));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Diamond sparkle pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePulse((prev) => !prev);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      playCelestialChord();
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF4EB] via-[#F6ECE0] to-[#EFE2D2] overflow-hidden select-none px-4 pt-28 pb-16 text-[#24170D]">
      
      {/* Moving Golden Sunbeam & Lens Flare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-75 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse 520px 380px at ${beamPosition}% 46%, rgba(254, 240, 138, 0.45), rgba(212, 175, 55, 0.22) 40%, transparent 75%)`
        }}
      />

      {/* Warm Peach & Amber Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(251,191,36,0.1)_0%,_rgba(245,158,11,0.06)_45%,_transparent_80%)] pointer-events-none" />

      {/* Main Center Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        {/* Royal Arabic Badge */}
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#8C6418] mb-4 bg-[#F5E8D6] px-5 py-2 rounded-full border border-[#D4AF37]/50 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
          <span className="font-bold">{isAr ? 'دار نور دبي · روائع الذهب التراثي عيار ٢١' : 'NOOR DUBAI · ROYAL 21K HERITAGE GOLD'}</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-wide text-[#22160C] mb-3 leading-[1.12]">
          {isAr ? 'فنّ البريق الخالد والذهب الأصيل' : 'THE ART OF ETERNAL RADIANCE'}
        </h1>
        
        <p className="text-sm sm:text-base text-[#5C4533] font-medium tracking-[0.2em] uppercase mb-8 max-w-xl">
          {isAr ? 'أطقم المرتعشة الملكية، أساور حب الهيل، وعقود الذهب الخالص عيار ٢١' : 'Sovereign 21K Mirtasha Sets, Hab Al Hail Bangles & Imperial Royal Heirlooms'}
        </p>

        {/* 3D LUXURY PEACH CHAMPAGNE VELVET JEWELRY COFFER */}
        <div 
          onClick={handleOpenBox}
          className="relative w-80 sm:w-[480px] h-[340px] sm:h-[400px] cursor-pointer group my-3 perspective-[1200px]"
          title={isOpen ? '' : (isAr ? 'انقر لفتح صندوق الذهب الملكي' : 'Click to open the royal velvet jewelry box')}
        >
          {/* Plush Shadow Beneath Box */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-[#7A5B36]/30 blur-2xl rounded-full" />

          {/* MAIN BOX CONTAINER */}
          <div className="relative w-full h-full rounded-md bg-[#FFFDF9] border-2 border-[#D4AF37]/60 shadow-[0_25px_60px_rgba(180,134,40,0.25)] overflow-hidden transition-all duration-700 flex flex-col items-center justify-center p-4">
            
            {/* Box Velvet Grain */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#F3E5D4]" />
            <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-sm pointer-events-none" />
            
            {/* 4 Gold Corner Filigrees */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#B48628]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#B48628]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#B48628]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#B48628]" />

            {/* BOX CLOSED STATE */}
            <div className={`absolute transition-all duration-700 flex flex-col items-center ${isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <div className="w-20 h-20 rounded-full border-2 border-[#B48628] flex items-center justify-center bg-[#FAF1E3] shadow-[0_0_30px_rgba(212,175,55,0.35)] mb-4">
                <Sun className="w-10 h-10 text-[#B48628] animate-spin" style={{ animationDuration: '45s' }} />
              </div>
              <span className="font-serif-luxury text-xl tracking-[0.25em] text-[#8C6418] uppercase font-bold">
                {isAr ? 'صندوق نور دبي الملكي' : 'NOOR DUBAI COFFER'}
              </span>
              <span className="text-xs text-[#5C4533] mt-2 tracking-widest uppercase bg-[#F3E5D2] px-4 py-1 rounded-full border border-[#D4AF37]/40 font-bold">
                {isAr ? 'انقر لفتح الصندوق والمجوهرات' : 'TAP TO UNVEIL 21K SUITE'}
              </span>
            </div>

            {/* BOX OPEN STATE: REVEALS REAL HIGH JEWELRY BRIDAL SET ON VELVET MANNEQUIN */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
              
              {/* Warm Golden Glow from Inside Box */}
              <div className="absolute w-64 h-64 rounded-full bg-[#F59E0B]/25 blur-3xl animate-pulse" />

              {/* REAL WORLD PHOTOGRAPHIC HIGH JEWELRY SET DISPLAYED ON VELVET BUST */}
              <div className="relative z-30 w-full h-full flex items-center justify-center p-2">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[280px] sm:max-h-[310px] w-auto object-contain rounded-sm drop-shadow-[0_15px_35px_rgba(180,134,40,0.35)] transform hover:scale-105 transition-transform duration-500"
                />

                {/* Shimmer Lens Flare on the Jewels */}
                <div 
                  className={`absolute top-1/4 right-1/4 w-12 h-12 bg-white/90 rounded-full blur-md pointer-events-none transition-opacity duration-500 ${sparklePulse ? 'opacity-100 scale-125' : 'opacity-40 scale-75'}`}
                />
              </div>

              {/* Product Label Badge inside Open Box with live price */}
              <div className="absolute bottom-3 left-4 right-4 z-40 flex items-center justify-between bg-[#FFFDF9]/95 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#D4AF37]/50 text-xs shadow-md">
                <span className="font-serif-luxury text-[#8C6418] font-bold text-sm">
                  {isAr ? featuredProduct.nameAr : featuredProduct.name}
                </span>
                <span className="text-[#24170D] font-bold font-mono">
                  {formatCurrencyPrice(featuredProduct.priceAED, currency, isAr)}
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* CTA ACTIONS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          {!isOpen ? (
            <button
              onClick={handleOpenBox}
              className="px-9 py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 transition-all rounded-sm shadow-[0_10px_30px_rgba(180,134,40,0.35)] flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1E1208]" />
              <span>{isAr ? 'افتح الصندوق الملكي' : 'OPEN THE ROYAL BOX'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="px-9 py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 transition-all rounded-sm shadow-[0_10px_35px_rgba(180,134,40,0.35)] flex items-center gap-2 group cursor-pointer"
              >
                <span>{isAr ? 'معاينة هذا الطقم الملكي بالتفصيل' : 'INSPECT THIS 21K SET'}</span>
              </button>
              <button
                onClick={onEnterHouse}
                className="px-6 py-4 text-xs tracking-[0.2em] uppercase font-bold text-[#8C6418] border border-[#D4AF37]/60 hover:bg-[#F3E5D2] transition-all rounded-sm flex items-center gap-2"
              >
                <span>{isAr ? 'استكشف الدار' : 'DISCOVER THE HOUSE'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          )}

          <a
            href="#collections"
            className="px-6 py-4 text-xs tracking-[0.2em] uppercase font-bold text-[#5C4533] border border-[#B48628]/40 hover:border-[#B48628] transition-all rounded-sm bg-[#FAF1E3]"
          >
            {isAr ? 'أطقم الأعراس والمجموعات' : 'BROWSE ALL COLLECTIONS'}
          </a>
        </div>

      </div>

    </section>
  );
};
