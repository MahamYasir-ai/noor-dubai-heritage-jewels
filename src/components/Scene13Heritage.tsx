import React from 'react';
import { Compass, Sparkles, Gem, Landmark, Shield } from 'lucide-react';
import { Language } from '../types';

interface Scene13Props {
  lang: Language;
}

export const Scene13Heritage: React.FC<Scene13Props> = ({ lang }) => {
  const isAr = lang === 'ar';

  const heritagePillars = [
    {
      icon: <Gem className="w-5 h-5 text-[#D4AF37]" />,
      titleEn: 'NATURAL BASRA PEARLS',
      titleAr: 'لآلئ الخليج الطبيعية',
      textEn: 'Untreated saltwater pearls sustainably harvested from historic Gulf oyster beds that sustained civilizations before oil.',
      textAr: 'لآلئ بحرية طبيعية نادرة من أعماق الخليج العربي تعكس تاريخ الأجداد وأصالة التجارة البحرية الأولى.'
    },
    {
      icon: <Landmark className="w-5 h-5 text-[#D4AF37]" />,
      titleEn: 'GULF ARCHITECTURAL GEOMETRY',
      titleAr: 'العمارة الخليجية المعاصرة',
      textEn: 'Modernist arches and mashrabiya cantilevers inspired by the skyline of Dubai and Abu Dhabi cultural districts.',
      textAr: 'خطوط معمارية هندسية معاصرة مستوحاة من صروح دبي وأبوظبي ومتاحفها العالمية.'
    },
    {
      icon: <Compass className="w-5 h-5 text-[#D4AF37]" />,
      titleEn: 'CELESTIAL ASTRONOMY (THURAYA)',
      titleAr: 'عنقود الثريا ونيازك الصحراء',
      textEn: 'The Pleiades constellation guided Arabian desert voyagers and pearl divers across centuries of nocturnal voyages.',
      textAr: 'نجوم الثريا التي اهتدى بها البحارة وقوافل الصحراء عبر قرون من السفر في سكون الليل.'
    },
    {
      icon: <Shield className="w-5 h-5 text-[#D4AF37]" />,
      titleEn: 'SOVEREIGN 21K PURITY',
      titleAr: 'نقاء الذهب عيار ٢١ قيراط',
      textEn: 'The treasured alloy of the Middle East, offering a deep honey-rich radiance prized by noble families.',
      textAr: 'العيار الملكي المفضل في الخليج بلونه الذهبي العسلي الدافئ ووزنه الثري الأصيل.'
    }
  ];

  return (
    <section className="relative min-h-[85vh] w-full bg-gradient-to-b from-[#FAF4EB] via-[#F6EDE0] to-[#EFE1D0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'الهوية والروح الشرقية' : 'HERITAGE & SOVEREIGN ROOTS'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'أصالة الماضي برؤية المستقبل' : 'MIDDLE EASTERN HERITAGE'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-lg mx-auto tracking-wider">
            {isAr
              ? 'توليفة ساحرة تمزج هيبة التراث الخليجي بالبساطة الهندسية المعاصرة.'
              : 'Contemporary Gulf sophistication harmonizing timeless Arabian poetry with architectural precision.'}
          </p>
        </div>

        {/* 4 Pillars Grid (Architectural Editorial Cards in light peach/cream) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heritagePillars.map((p, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#FFFDF9] border-2 border-[#D4AF37]/40 rounded-md hover:border-[#B48628] transition-all duration-300 shadow-md flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div>
                <div className="p-3 w-fit bg-[#FAF1E3] border border-[#D4AF37]/40 rounded-sm mb-6 group-hover:bg-[#F3E5D2] transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-serif-luxury text-xl text-[#24170D] font-bold mb-3 group-hover:text-[#8C6418] transition-colors">
                  {isAr ? p.titleAr : p.titleEn}
                </h3>
                <p className="text-xs text-[#5C4533] leading-relaxed">
                  {isAr ? p.textAr : p.textEn}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8D9C5] text-[10px] tracking-[0.25em] text-[#8C6418] uppercase font-mono font-bold">
                PATRIMONY 0{idx + 1} · NOOR DUBAI
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
