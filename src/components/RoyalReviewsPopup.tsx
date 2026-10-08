import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, X, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language } from '../types';

interface ReviewsProps {
  lang: Language;
}

interface ReviewItem {
  id: string;
  nameEn: string;
  nameAr: string;
  cityEn: string;
  cityAr: string;
  pieceEn: string;
  pieceAr: string;
  quoteEn: string;
  quoteAr: string;
  timeEn: string;
  timeAr: string;
}

export const RoyalReviewsPopup: React.FC<ReviewsProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      nameEn: 'Sheikha Maryam A.',
      nameAr: 'الشيخة مريم آل ن.',
      cityEn: 'Abu Dhabi, UAE',
      cityAr: 'أبوظبي، الإمارات',
      pieceEn: 'The Emirati Mirtasha Bib Necklace (280g 21K)',
      pieceAr: 'طوق المرتعشة الإماراتية التراثية (٢٨٠ غرام)',
      quoteEn: 'The weight, majestic drape, and authentic 21K golden chime of the Mirtasha made my bridal zaffe truly unforgettable.',
      quoteAr: 'ثقل الذهب الخالص عيار ٢١ ورنة الليرات التراثية في طوق المرتعشة جعلت ليلة زفافي أسطورية لا تُنسى.',
      timeEn: 'Verified Acquisition · 3 days ago',
      timeAr: 'اقتناء موثق · منذ ٣ أيام'
    },
    {
      id: 'rev-2',
      nameEn: 'Noura Al Otaiba',
      nameAr: 'نورة العتيبة',
      cityEn: 'Dubai, UAE',
      cityAr: 'دبي، الإمارات',
      pieceEn: 'Hab Al Hail Royal Bangles (Pair)',
      pieceAr: 'أساور حب الهيل التراثية (زوج)',
      quoteEn: 'Impeccable Dubai craftsmanship. The cardamom granulation and velvet coffer with gold calligraphy are pure royal luxury.',
      quoteAr: 'صياغة إماراتية فاخرة بنقش حب الهيل، والصندوق المخملي المنقوش بالخط العربي تحفة بحد ذاته.',
      timeEn: 'Verified Acquisition · 1 week ago',
      timeAr: 'اقتناء موثق · منذ أسبوع'
    },
    {
      id: 'rev-3',
      nameEn: 'Hassa Al Saud',
      nameAr: 'حصة آل س.',
      cityEn: 'Riyadh, Saudi Arabia',
      cityAr: 'الرياض، المملكة العربية السعودية',
      pieceEn: 'The Royal Bridal Hizam Belt (390g 21K)',
      pieceAr: 'حزام الذهب الملكي التراثي للعروس',
      quoteEn: 'Discreet armed courier handover directly to our Riyadh palace residence. The gold purity and finish are extraordinary.',
      quoteAr: 'تسليم راقٍ وسري في قصرنا بالرياض عبر حراسة دبلوماسية. نقاء الذهب عيار ٢١ يفوق الوصف.',
      timeEn: 'Verified Royal Client · 2 weeks ago',
      timeAr: 'عميلة ملكية موثقة · منذ أسبوعين'
    },
    {
      id: 'rev-4',
      nameEn: 'Al Anoud Al Thani',
      nameAr: 'العنود آل ث.',
      cityEn: 'Doha, Qatar',
      cityAr: 'الدوحة، قطر',
      pieceEn: 'The Royal Basra Tablah Choker',
      pieceAr: 'طوق الطبلة بلؤلؤ البصرة الطبيعي',
      quoteEn: 'The certified Basra saltwater pearls have an angelic luster. Noor Dubai is truly the crown of Gulf high jewelry.',
      quoteAr: 'لآلئ البصرة البحرية الطبيعية لها بريق ملائكي ساحر. دار نور دبي هي بحق تاج المجوهرات الخليجية.',
      timeEn: 'Verified Acquisition · 5 days ago',
      timeAr: 'اقتناء موثق · منذ ٥ أيام'
    }
  ];

  // Show popup only after scrolling down 350px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350 && !isDismissed) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Auto cycle reviews gently every 11 seconds
  useEffect(() => {
    if (!isVisible || isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 11000);
    return () => clearInterval(interval);
  }, [isVisible, isDismissed, reviews.length]);

  if (!isVisible || isDismissed) return null;

  const current = reviews[currentIndex];

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-[90vw] sm:w-[360px] animate-in slide-in-from-bottom-6 duration-500 shadow-[0_15px_40px_rgba(180,134,40,0.2)]">
      <div className="relative bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#D4AF37]/50 rounded-md p-4 text-[#2D1B0F] shadow-2xl">
        
        {/* Close / Dismiss */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2.5 right-2.5 text-[#8C7662] hover:text-[#B48628] p-1 transition-colors"
          title="Dismiss"
          aria-label="Close review"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header: Rating & Verified Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
            ))}
          </div>
          <span className="text-[10px] font-bold text-[#8C6418] uppercase tracking-wider bg-[#F7EEDB] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#B48628]" />
            <span>{isAr ? 'اقتناء موثق' : 'VERIFIED VIP ACQUISITION'}</span>
          </span>
        </div>

        {/* Client Quote */}
        <p className="text-xs text-[#3E2917] italic leading-relaxed mb-3 font-serif-luxury text-balance">
          "{isAr ? current.quoteAr : current.quoteEn}"
        </p>

        {/* Piece Reference */}
        <div className="text-[10px] text-[#A0721E] font-semibold tracking-wider uppercase mb-2 border-b border-[#EEDFCD] pb-2">
          {isAr ? current.pieceAr : current.pieceEn}
        </div>

        {/* Client Name & City */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div>
            <span className="font-bold text-[#2D1B0F] block">
              {isAr ? current.nameAr : current.nameEn}
            </span>
            <span className="text-[10px] text-[#8C7662]">
              {isAr ? current.cityAr : current.cityEn}
            </span>
          </div>

          {/* Mini navigation controls */}
          <div className="flex items-center gap-1 text-[#8C7662]">
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1))}
              className="p-1 hover:text-[#B48628]"
              title="Previous"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[9px] font-mono">
              {currentIndex + 1}/{reviews.length}
            </span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
              className="p-1 hover:text-[#B48628]"
              title="Next"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
