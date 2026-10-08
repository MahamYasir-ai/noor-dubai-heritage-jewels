import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { playChime } from '../utils/sound';

interface Scene11Props {
  lang: Language;
}

export const Scene11Generations: React.FC<Scene11Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeGen, setActiveGen] = useState<0 | 1 | 2>(0);

  const generations = [
    {
      eraEn: '1974 · THE MATRIARCH (GRANDMOTHER)',
      eraAr: '١٩٧٤ · الجدة الكريمة',
      textEn: 'Acquired in the historic gold souks of the Trucial Coast. Forged in 21K solid gold to mark the founding era of modern prosperity.',
      textAr: 'اقتُنيت في أسواق الذهب العريقة بالخليج، صُنعت من الذهب الخالص عيار ٢١ لتوثق فجر الازدهار والبدايات المباركة.'
    },
    {
      eraEn: '2001 · THE MOTHER',
      eraAr: '٢٠٠١ · الأم المعاصرة',
      textEn: 'Passed down during a royal wedding celebration in Abu Dhabi, imbued with memories of maternal strength and sovereign grace.',
      textAr: 'أُهديت في ليلة زفاف ملكية في أبوظبي، حاملةً ذكريات الأمومة ووقار المكان والمكانة.'
    },
    {
      eraEn: '2026 · THE DAUGHTER',
      eraAr: '٢٠٢٦ · الابنة الشابة',
      textEn: 'Worn today with modern haute couture, carrying unbroken Emirati heritage into a bold global future.',
      textAr: 'تتألق بها اليوم مع أرقى أزياء الكوتور المعاصرة، لتنقل إرث الأجداد الأصيل إلى المستقبل بثقة وفخر.'
    }
  ];

  return (
    <section className="relative min-h-[90vh] w-full bg-gradient-to-b from-[#FAF4EB] via-[#F6EDE0] to-[#EFE1D0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]">
      
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(251,191,36,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#B48628]" />
            <span>{isAr ? 'حكاية الإرث العائلي' : 'PATRIMONY & HEIRLOOMS'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3 leading-tight">
            {isAr ? 'بعض المجوهرات تُشترى.. وأخرى تصبح جزءاً من العائلة' : 'SOME JEWELS ARE BOUGHT. OTHERS BECOME FAMILY.'}
          </h2>

          <p className="text-sm text-[#8C6418] tracking-[0.25em] uppercase font-bold">
            {isAr ? 'صُنعت لتعبر الأجيال' : 'Created to cross generations.'}
          </p>
        </div>

        {/* Cinematic Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md p-6 sm:p-10 shadow-[0_30px_70px_rgba(180,134,40,0.18)]">
          
          {/* Image of Three Generations Hands Passing Jewelry (Used only once) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-md">
            <img
              src="/src/assets/images/generations_heirloom_hands_1791446552361.jpg"
              alt="Three generations of Middle Eastern women hands holding heirloom jewelry"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white border-t border-white/20 pt-3">
              <span className="font-serif-luxury tracking-widest text-[#FDE68A] font-bold">
                NOOR DUBAI HERITAGE BANGLE
              </span>
              <span className="text-[10px] tracking-wider uppercase font-mono font-bold">
                1974 → 2026
              </span>
            </div>
          </div>

          {/* RIGHT: Three Generations Timeline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3.5">
              {generations.map((gen, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveGen(idx as any);
                    playChime(500 + idx * 100);
                  }}
                  className={`p-5 rounded-md border transition-all cursor-pointer ${
                    activeGen === idx
                      ? 'border-[#B48628] bg-[#FAF1E3] shadow-md'
                      : 'border-[#E8D9C5] bg-[#FFFDF9] hover:border-[#B48628]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-serif-luxury text-base tracking-wider text-[#8C6418] font-bold">
                      {isAr ? gen.eraAr : gen.eraEn}
                    </span>
                    {activeGen === idx && <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />}
                  </div>
                  <p className="text-xs text-[#5C4533] leading-relaxed">
                    {isAr ? gen.textAr : gen.textEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#bespoke"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold text-[#8C6418] hover:text-[#24170D] transition-colors"
              >
                <span>{isAr ? 'ابدأ حكاية إرثك العائلي اليوم' : 'BEGIN YOUR FAMILY HEIRLOOM'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
