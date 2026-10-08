import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene2Props {
  lang: Language;
  currency: CurrencyCode;
  featuredProduct: Product;
  onSelectProduct: (p: Product) => void;
}

export const Scene2FloatingJewel: React.FC<Scene2Props> = ({
  lang,
  currency,
  featuredProduct,
  onSelectProduct
}) => {
  const isAr = lang === 'ar';
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const [startX, setStartX] = useState(0);

  // Autonomous gentle movement
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setRotateY((prev) => (prev + 0.3) % 360);
      setLightX((prev) => (prev > 75 ? 25 : prev + 0.25));
    }, 40);
    return () => clearInterval(interval);
  }, [isInteracting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting) return;
    const delta = e.clientX - startX;
    setRotateY((prev) => prev + delta * 0.5);
    setLightX((prev) => Math.min(85, Math.max(15, prev + delta * 0.1)));
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  return (
    <section 
      id="floating-jewel"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#EFE2D2] via-[#F8EFE3] to-[#FAF4EB] py-24 overflow-hidden border-t border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      {/* Dynamic Moving Spotlight that illuminates this Bestseller Set as users scroll/interact */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 500px at ${lightX}% 48%, rgba(254, 240, 138, 0.4), rgba(212, 175, 55, 0.15) 50%, transparent 75%)`
        }}
      />

      {/* Warm Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Bestseller Banner */}
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#7A5410] bg-[#F7EEDA] border border-[#D4AF37]/50 px-5 py-1.5 rounded-full mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B48628] animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold">{isAr ? 'الأكثر طلباً · أساور حب الهيل التراثية' : 'BESTSELLER CREATION · EMIRATI HERITAGE'}</span>
        </div>

        {/* Monumental Headline */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl tracking-wide text-[#22160C] leading-[1.15] max-w-3xl mb-4">
          {isAr ? 'صُنعت للذين يتركون أثراً خالداً' : 'CRAFTED FOR THOSE WHO LEAVE A LEGACY'}
        </h2>

        <p className="text-sm sm:text-base text-[#5C4533] font-medium max-w-xl mb-8 tracking-wider">
          {isAr
            ? 'ذهب أصفر خالص عيار ٢١ قيراطاً، بنقوش حب الهيل التراثية ولآلئ البصرة الطبيعية.'
            : 'Heavy 21K sovereign yellow gold with traditional cardamom filigree and natural Gulf Basra pearls.'}
        </p>

        {/* REAL WORLD PHOTOGRAPHIC JEWEL DISPLAY WITH DYNAMIC ROTATION & SHINE EFFECT */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-80 sm:w-[460px] h-80 sm:h-[420px] flex items-center justify-center my-6 cursor-grab active:cursor-grabbing select-none group"
          title={isAr ? 'اسحب لمعاينة انعكاس الضوء على الذهب' : 'Drag to inspect 360° light shimmer across the gold'}
        >
          {/* Plush Cushion Pedestal */}
          <div className="absolute bottom-4 w-72 h-14 bg-[#B48628]/20 blur-2xl rounded-full" />
          <div className="absolute inset-4 rounded-full border border-[#D4AF37]/30 pointer-events-none" />

          {/* Real Photo with 3D Tilt and Dynamic Highlight */}
          <div
            className="transition-transform duration-100 relative z-10 w-full h-full flex items-center justify-center p-4"
            style={{
              transform: `perspective(1000px) rotateY(${Math.sin(rotateY * 0.05) * 12}deg) rotateX(${Math.cos(rotateY * 0.05) * 6}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              src={featuredProduct.image}
              alt={featuredProduct.name}
              referrerPolicy="no-referrer"
              className="max-h-[320px] w-auto object-contain rounded-sm drop-shadow-[0_20px_45px_rgba(180,134,40,0.35)] group-hover:scale-105 transition-transform duration-500"
            />

            {/* Moving Light Shimmer Sweep across the jewelry */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none rounded-sm opacity-60"
              style={{
                transform: `translateX(${(lightX - 50) * 4}%)`
              }}
            />
          </div>

          {/* Interactive Hint */}
          <div className="absolute bottom-1 text-[10px] tracking-[0.2em] text-[#7A5410] uppercase bg-[#FAF3E8]/95 px-4 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm font-bold">
            {isAr ? 'اسحب لتحريك زاوية الضوء والبريق' : 'DRAG TO ILLUMINATE FACETS'}
          </div>
        </div>

        {/* Specifications & Live Price in Selected Currency */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-wider text-[#5C4533] mb-8 bg-[#FFFDF9] px-7 py-3.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B48628]" />
            <span className="font-bold">21K SOVEREIGN GOLD (875)</span>
          </div>
          <span>·</span>
          <div className="font-bold">124 GRAMS SOLID GOLD</div>
          <span>·</span>
          <div className="font-serif-luxury text-lg text-[#8C6418] font-black">
            {formatCurrencyPrice(featuredProduct.priceAED, currency, isAr)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              playChime(780);
              onSelectProduct(featuredProduct);
            }}
            className="px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1B0F07] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>{isAr ? 'معاينة هذا الطقم الأكثر طلباً' : 'INSPECT BESTSELLER SET'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <a
            href="#collections"
            className="px-6 py-4 text-xs tracking-[0.2em] uppercase font-bold text-[#5C4533] border border-[#B48628]/40 hover:border-[#B48628] rounded-sm transition-all bg-[#FAF1E3]"
          >
            {isAr ? 'تصفح كافة الأساور' : 'EXPLORE ALL BANGLES'}
          </a>
        </div>

      </div>
    </section>
  );
};
