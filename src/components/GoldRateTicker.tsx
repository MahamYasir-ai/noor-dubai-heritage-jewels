import React from 'react';
import { Sparkles, TrendingUp, Award, Flame } from 'lucide-react';
import { CurrencyCode, Language } from '../types';
import { formatCurrencyPrice } from '../data/products';

interface GoldRateTickerProps {
  lang: Language;
  currency: CurrencyCode;
}

export const GoldRateTicker: React.FC<GoldRateTickerProps> = ({ lang, currency }) => {
  const isAr = lang === 'ar';

  // Live UAE Gold Rates per gram in AED
  const goldRates = [
    { karat: '24K', aedPrice: 318.5, change: '+0.4%' },
    { karat: '22K', aedPrice: 295.25, change: '+0.3%' },
    { karat: '21K (ROYAL HERITAGE)', aedPrice: 281.75, change: '+0.5%' },
    { karat: '18K', aedPrice: 241.5, change: '+0.2%' }
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-[#FAF2E6] via-[#F3E5D2] via-[#FAF2E6] to-[#F3E5D2] border-b border-[#D4AF37]/35 text-[#352516] py-2 overflow-hidden select-none z-40">
      
      {/* Subtle moving gold shimmer background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12)_0%,_transparent_75%)] pointer-events-none" />

      {/* Infinite Scrolling Marquee Track */}
      <div className="flex w-max animate-marquee space-x-12 rtl:space-x-reverse text-[11px] font-bold tracking-wider uppercase items-center">
        
        {/* Item 1: Live Rates Indicator */}
        <div className="flex items-center gap-2 text-[#8C6418] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
          <span>{isAr ? 'أسعار الذهب المباشرة في دبي والخليج' : 'DUBAI & GCC LIVE GOLD TICKER'}</span>
        </div>

        {/* Dynamic Rates with selected currency conversion */}
        {goldRates.map((rate, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[#8C6418] font-black">{rate.karat}:</span>
            <span className="text-[#1E1208] font-mono font-bold">{formatCurrencyPrice(rate.aedPrice, currency, isAr)}/g</span>
            <span className="text-emerald-700 text-[10px] flex items-center font-bold">
              <TrendingUp className="w-3 h-3 inline mr-0.5" />
              {rate.change}
            </span>
          </div>
        ))}

        {/* Item 2: Special Royal Bridal Offer */}
        <div className="flex items-center gap-2 text-[#7A500F] bg-[#EFE0CB] px-3 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
          <span className="font-bold">
            {isAr
              ? 'مهرجان أعراس دبي الملكي: ٠٪ مصنعية على أطقم الذهب التراثية عيار ٢١ هذا الأسبوع'
              : 'ROYAL BRIDAL FESTIVAL: 0% MAKING CHARGES ON 21K HERITAGE SETS THIS WEEK'}
          </span>
        </div>

        {/* Item 3: Luxury Complimentary Coffer */}
        <div className="flex items-center gap-2 text-[#5A402A]">
          <Award className="w-3.5 h-3.5 text-[#B48628]" />
          <span>
            {isAr
              ? 'صندوق ملكي مخملي منقوش بالخط العربي مجاناً مع كل طقم'
              : 'COMPLIMENTARY ROYAL VELVET COFFER WITH HAND-CALLIGRAPHY WITH EVERY SUITE'}
          </span>
        </div>

        {/* Repeat once for seamless infinite loop */}
        <div className="flex items-center gap-2 text-[#8C6418] font-bold">
          <Sparkles className="w-3 h-3 text-[#B48628]" />
          <span>{isAr ? 'ضمان نقاء الذهب عيار ٢١ ومصادقة دبي' : 'CERTIFIED 21K PURITY · DUBAI CENTRAL ASSAY'}</span>
        </div>

        {goldRates.map((rate, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-2">
            <span className="text-[#8C6418] font-black">{rate.karat}:</span>
            <span className="text-[#1E1208] font-mono font-bold">{formatCurrencyPrice(rate.aedPrice, currency, isAr)}/g</span>
            <span className="text-emerald-700 text-[10px] flex items-center font-bold">
              <TrendingUp className="w-3 h-3 inline mr-0.5" />
              {rate.change}
            </span>
          </div>
        ))}

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
