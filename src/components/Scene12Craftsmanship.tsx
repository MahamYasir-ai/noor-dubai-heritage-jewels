import React, { useState } from 'react';
import { Hammer, Sparkles, Microscope } from 'lucide-react';
import { Language } from '../types';
import { playChime } from '../utils/sound';

interface Scene12Props {
  lang: Language;
}

export const Scene12Craftsmanship: React.FC<Scene12Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      titleEn: '1. SMELTING 21K SOVEREIGN GOLD',
      titleAr: '١. صهر وتطويع الذهب الخالص عيار ٢١',
      descEn: 'Raw gold alloyed at 1,064°C to achieve our signature warm Gulf luster.',
      descAr: 'يُصهر الذهب النقي عند درجة حرارة دقيقة لإنتاج لون الذهب الدافئ الذي تشتهر به مجوهرات الخليج الأصيلة.'
    },
    {
      titleEn: '2. MICROSCOPIC PAVÉ & BASRA SETTING',
      titleAr: '٢. ترصيع لآلئ البصرة والألماس',
      descEn: 'Master setters secure calibrated Basra natural pearls and brilliant facets under optical magnification.',
      descAr: 'ترصيف يدوي فائق الدقة لتثبيت لآلئ البصرة الطبيعية والألماس دون أي شوائب معدنية.'
    },
    {
      titleEn: '3. TRADITIONAL CHISEL & GRANULATION',
      titleAr: '٣. نقش حب الهيل والزخرفة اليدوية',
      descEn: 'Ancestral Hab Al Hail granulation and geometric chiseling executed with hardened tempered steel tools.',
      descAr: 'نقوش حب الهيل والزخارف التراثية تُحفر يدوياً بأزاميل فولاذية لتعكس خبرة الصاغة المهرة.'
    },
    {
      titleEn: '4. PARISIAN ROUGE MIRROR POLISHING',
      titleAr: '٤. الصقل المرآتي فائق اللمعان',
      descEn: 'Sequential walnut shell and Parisian rouge buffing wheels yield an authentic liquid-gold reflection.',
      descAr: 'مراحل تلميع متعددة باستخدام صوف ناعم تمنح الذهب بريقاً عاكساً كسطح المرآة الصافية.'
    }
  ];

  return (
    <section 
      id="craftsmanship" 
      className="relative min-h-[90vh] w-full bg-gradient-to-b from-[#EFE1D0] via-[#FAF4EB] to-[#F5ECE0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Hammer className="w-3.5 h-3.5 text-[#B48628]" />
            <span>{isAr ? 'حرفية الصياغة الراقية' : 'HAUTE JOAILLERIE ATELIER'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'حرفية تتحدى الزمن' : 'THE ARTISAN ATELIER'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-lg mx-auto tracking-wider">
            {isAr
              ? 'كل قطعة تمر بمئات الساعات من الصياغة اليدوية الخالصة في ورش دار نور دبي.'
              : 'Every creation requires hundreds of hours of precision hand craftsmanship in our Dubai atelier.'}
          </p>
        </div>

        {/* Atelier Macro Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md p-6 sm:p-10 shadow-[0_30px_70px_rgba(180,134,40,0.18)]">
          
          {/* Macro Image */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-md">
            <img
              src="/src/assets/images/craftsmanship_atelier_macro_1791446524112.jpg"
              alt="Artisan jeweler setting diamonds in gold ring"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white border-t border-white/20 pt-3">
              <span className="font-serif-luxury tracking-widest text-[#FDE68A] font-bold">
                NOOR DUBAI GOLD ATELIER · EST. 1974
              </span>
              <span className="text-[10px] tracking-wider uppercase font-mono flex items-center gap-1.5 font-bold">
                <Microscope className="w-3 h-3 text-[#FDE68A]" />
                <span>40X OPTICAL PRECISION</span>
              </span>
            </div>
          </div>

          {/* Pillars Selector */}
          <div className="lg:col-span-5 space-y-3.5">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedPillar(idx);
                  playChime(620 + idx * 80);
                }}
                className={`p-5 rounded-md border transition-all cursor-pointer ${
                  selectedPillar === idx
                    ? 'border-[#B48628] bg-[#FAF1E3] shadow-md'
                    : 'border-[#E8D9C5] bg-[#FFFDF9] hover:border-[#B48628]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <h4 className="font-serif-luxury text-base text-[#24170D] font-bold tracking-wide">
                    {isAr ? p.titleAr : p.titleEn}
                  </h4>
                  {selectedPillar === idx && <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />}
                </div>
                <p className="text-xs text-[#5C4533] leading-relaxed mt-1">
                  {isAr ? p.descAr : p.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
