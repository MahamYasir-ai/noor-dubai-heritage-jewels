import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { playCelestialChord } from '../utils/sound';

interface Scene15Props {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Scene15FinalScreen: React.FC<Scene15Props> = ({
  lang,
  setLang,
  onOpenBooking
}) => {
  const isAr = lang === 'ar';
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRot((prev) => (prev + 0.3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative min-h-screen w-full bg-gradient-to-b from-[#F5ECE0] via-[#FAF4EB] to-[#EFE1D0] flex flex-col justify-between items-center text-center px-4 pt-24 pb-12 overflow-hidden border-t-2 border-[#D4AF37]/40 text-[#24170D]">
      
      {/* Background Soft Peach Ambient Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_75%)] pointer-events-none" />

      {/* Single Beam of Warm Golden Light Sweeping Gently */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-[480px] bg-gradient-to-b from-[#FEF08A]/30 via-[#D4AF37]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Main Final Hero Message */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center my-auto">
        
        {/* REAL PHOTOGRAPHIC SIGNATURE GOLD BRACELET ROTATING GENTLY */}
        <div 
          className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4"
          style={{
            transform: `perspective(1000px) rotateY(${Math.sin(rot * 0.05) * 12}deg) rotateX(8deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <img
            src="/images/hab_al_hail_gold_bangles_1791448128996.jpg"
            alt="Signature 21K Gold Bangle"
            referrerPolicy="no-referrer"
            className="max-h-[260px] w-auto object-contain rounded-sm drop-shadow-[0_20px_50px_rgba(180,134,40,0.4)]"
          />
        </div>

        {/* Climax Headline */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-4 leading-tight max-w-2xl font-bold">
          {isAr ? 'قصتكِ تستحق بريقاً لا يمحوه الزمان' : 'YOUR STORY DESERVES SOMETHING TIMELESS.'}
        </h2>

        <p className="text-sm text-[#8C6418] font-bold max-w-md mb-8 tracking-[0.25em] uppercase">
          {isAr ? 'دار نور دبي للمجوهرات الراقية · دبي · أبوظبي · الرياض · الدوحة' : 'NOOR DUBAI HAUTE JOAILLERIE · DUBAI · ABU DHABI · RIYADH · DOHA'}
        </p>

        {/* Climax CTA */}
        <button
          onClick={() => {
            playCelestialChord();
            onOpenBooking();
          }}
          className="px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-[0_15px_40px_rgba(180,134,40,0.35)] transition-all flex items-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#1E1208]" />
          <span>{isAr ? 'انضم إلى عالم الخصوصية الملكية' : 'ENTER THE PRIVATE WORLD'}</span>
        </button>

      </div>

      {/* FOOTER BOTTOM ARCHITECTURE */}
      <div className="relative z-20 w-full max-w-7xl mx-auto border-t border-[#D4AF37]/30 pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5C4533]">
        
        {/* Cities */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] tracking-[0.25em] uppercase text-[#8C6418] font-bold">
          <span>DUBAI</span>
          <span className="text-[#D4AF37]">·</span>
          <span>ABU DHABI</span>
          <span className="text-[#D4AF37]">·</span>
          <span>RIYADH</span>
          <span className="text-[#D4AF37]">·</span>
          <span>DOHA</span>
          <span className="text-[#D4AF37]">·</span>
          <span>KUWAIT</span>
        </div>

        {/* Language switch & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold">
            <button
              onClick={() => setLang('en')}
              className={`hover:text-[#B48628] transition-colors ${lang === 'en' ? 'text-[#8C6418]' : 'text-[#8C7662]'}`}
            >
              EN
            </button>
            <span>|</span>
            <button
              onClick={() => setLang('ar')}
              className={`hover:text-[#B48628] transition-colors font-arabic ${lang === 'ar' ? 'text-[#8C6418]' : 'text-[#8C7662]'}`}
            >
              العربية
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#B48628] transition-colors text-[11px] tracking-wider uppercase font-bold text-[#8C6418] cursor-pointer"
          >
            <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Disclaimer & Copyright */}
      <div className="relative z-20 max-w-4xl mx-auto mt-6 text-[10px] text-[#786655] tracking-wider leading-relaxed">
        <p>
          © 2026 NOOR DUBAI HAUTE JOAILLERIE FZ-LLC. ALL RIGHTS RESERVED. REGISTERED IN DUBAI DESIGN DISTRICT (D3) & DUBAI GOLD SOUK EXTENSION.
        </p>
        <p className="mt-1 opacity-75">
          {isAr
            ? 'دار نور دبي للمجوهرات الراقية · صياغة الذهب التراثي عيار ٢١ قيراطاً، ولآلئ البصرة البحرية الطبيعية في دولة الإمارات العربية المتحدة.'
            : 'NOOR DUBAI Haute Joaillerie · Sovereign 21K Gold and Natural Basra Saltwater Pearls. Registered in the United Arab Emirates.'}
        </p>
      </div>

    </footer>
  );
};
