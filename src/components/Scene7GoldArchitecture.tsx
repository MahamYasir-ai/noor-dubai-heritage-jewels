import React, { useState } from 'react';
import { Layers, Eye, Sparkles } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene7Props {
  lang: Language;
  currency: CurrencyCode;
  onSelectProduct: (p: Product) => void;
  products: Product[];
}

export const Scene7GoldArchitecture: React.FC<Scene7Props> = ({
  lang,
  currency,
  onSelectProduct,
  products
}) => {
  const isAr = lang === 'ar';
  const [step, setStep] = useState(0);

  const steps = [
    {
      titleEn: 'TRADITIONAL EMIRATI MIRTASHA BIB',
      titleAr: 'طوق المرتعشة الإماراتية التراثية الكبرى',
      descEn: 'Articulated cascading gold coin drops with hand-filigree medallions forging the quintessential royal bride parure.',
      descAr: 'طبقات متتالية من الذهب الخالص عيار ٢١ والليرات واللؤلؤ تعزف ألحان الهيبة في ليلة الزفاف.',
      image: '/images/traditional_mirtasha_necklace_1791449330760.jpg',
      productId: 'vault-mirtasha-bib'
    },
    {
      titleEn: 'TRADITIONAL HAB AL HAIL BANGLES',
      titleAr: 'أساور حب الهيل التراثية الخالصة',
      descEn: 'Carved solid 21K gold with heritage beaded granulation celebrating Emirati generosity.',
      descAr: 'ذهب أصفر عيار ٢١ منحوت بنقش حب الهيل التراثي الذي يرمز للضيافة والعروبة الأصيلة.',
      image: '/images/hab_al_hail_gold_bangles_1791448128996.jpg',
      productId: 'vault-hab-al-hail'
    },
    {
      titleEn: 'THE ROYAL BRIDAL HIZAM BELT',
      titleAr: 'حزام الذهب الملكي التراثي للعروس',
      descEn: 'Monumental ceremonial bridal belt of twenty-four articulated geometric gold plaques with coin fringes.',
      descAr: 'حزام ذهبي احتفالي مهيب من صفائح الذهب عيار ٢١ مع إبزيم ملكي وشراشيب ذهبية رنانة.',
      image: '/images/traditional_gold_bridal_belt_1791449344047.jpg',
      productId: 'vault-bridal-hizam'
    },
    {
      titleEn: 'THE JOMOOR CHANDELIER EARRINGS',
      titleAr: 'أقراط الجمور التراثية المتدلية الكبرى',
      descEn: 'Traditional tiered bell earrings echoing Arabian palace architecture, suspended with micro-seed Basra pearls.',
      descAr: 'أقراط تراثية بتصميم الجمور الخليجي تتهادى بنعومة فائقة حول الوجه مع حبات اللؤلؤ الطبيعي والأجراس المفرغة.',
      image: '/images/heavy_jomoor_gold_earrings_1791449356521.jpg',
      productId: 'vault-jomoor-earrings'
    },
    {
      titleEn: 'THE ROYAL BASRA TABLAH CHOKER',
      titleAr: 'طوق الطبلة بلؤلؤ البصرة الطبيعي',
      descEn: 'Nine lustrous strands of natural saltwater Basra pearls gathered by a heavy hand-chiseled 21K gold Tablah amulet.',
      descAr: 'تسعة صفوف متناسقة من لؤلؤ البصرة الطبيعي النادر تجمعها تميمة الطبلة التراثية المنحوتة من الذهب الخالص.',
      image: '/images/royal_tablah_pearl_choker_1791449378122.jpg',
      productId: 'vault-tablah-choker'
    }
  ];

  const currentStep = steps[step];
  const matchingProduct = products.find((p) => p.id === currentStep.productId) || products[0];

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    playChime(500 + newStep * 80);
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-[#F5ECE0] via-[#FAF4EB] to-[#EFE1D0] py-24 overflow-hidden border-b border-[#D4AF37]/35 flex flex-col justify-center text-[#24170D]">
      
      {/* Warm Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(251,191,36,0.08)_0%,_transparent_75%)] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'روائع الصياغة التراثية' : 'HERITAGE CREATIONS · 21K REAL GOLD'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'عمارة الذهب وأصالة التراث' : 'THE ARCHITECTURE OF 21K GOLD'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-lg mx-auto tracking-wider">
            {isAr
              ? 'شاهدي كل تحفة ذهبية حقيقية بألوانها وتفاصيل صياغتها المتقنة في دار نور دبي.'
              : 'Explore authentic hand-finished gold bridal sets, cuffs, and rings forged from sovereign metals.'}
          </p>
        </div>

        {/* REAL PHOTOGRAPHIC SHOWCASE DISPLAY */}
        <div className="relative max-w-4xl mx-auto h-[460px] sm:h-[500px] bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md overflow-hidden flex flex-col items-center justify-center p-6 shadow-[0_25px_60px_rgba(180,134,40,0.22)]">
          
          {/* Ambient Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.15)_0%,_transparent_70%)] pointer-events-none" />

          {/* Real Photo Display with Smooth Animation */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
            <img
              key={currentStep.image}
              src={currentStep.image}
              alt={currentStep.titleEn}
              referrerPolicy="no-referrer"
              className="max-h-[300px] sm:max-h-[340px] w-auto object-contain rounded-sm drop-shadow-[0_20px_45px_rgba(180,134,40,0.35)] animate-in fade-in zoom-in-95 duration-500"
            />
          </div>

          {/* Step Description Card Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#FFFDF9]/95 backdrop-blur-md p-4 border border-[#D4AF37]/45 rounded-sm shadow-md">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#8C6418] uppercase block font-mono font-bold">
                HERITAGE PIECE 0{step + 1} / 05 · {formatCurrencyPrice(matchingProduct.priceAED, currency, isAr)}
              </span>
              <h4 className="font-serif-luxury text-lg text-[#24170D] font-bold">
                {isAr ? currentStep.titleAr : currentStep.titleEn}
              </h4>
              <p className="text-xs text-[#5C4533] mt-0.5 max-w-xl">
                {isAr ? currentStep.descAr : currentStep.descEn}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => onSelectProduct(matchingProduct)}
                className="px-4 py-2 text-xs bg-[#D4AF37] text-black font-bold hover:bg-[#F8E2A6] rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isAr ? 'فحص القطعة' : 'Inspect Piece'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Step Timeline */}
        <div className="max-w-4xl mx-auto mt-6 flex items-center justify-between gap-2 px-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleStepChange(idx)}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer font-bold ${
                step === idx
                  ? 'border-[#B48628] text-[#8C6418] bg-[#F5EADB]'
                  : 'border-[#E8D9C5] text-[#7C6552] hover:text-black hover:border-[#B48628]'
              }`}
            >
              <span className="text-[11px] tracking-wider uppercase block truncate">
                0{idx + 1}. {isAr ? s.titleAr : s.titleEn}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
