import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, MessageCircle, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { DISPLAY_WHATSAPP_NUMBER, OFFICIAL_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface RoyalReviewsSectionProps {
  lang: Language;
}

interface FullReview {
  id: string;
  nameEn: string;
  nameAr: string;
  cityEn: string;
  cityAr: string;
  titleEn: string;
  titleAr: string;
  category: 'all' | 'bridal' | 'pearls' | 'bespoke' | 'bangles';
  pieceEn: string;
  pieceAr: string;
  quoteEn: string;
  quoteAr: string;
  timeEn: string;
  timeAr: string;
  stars: number;
}

export const RoyalReviewsSection: React.FC<RoyalReviewsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bridal' | 'pearls' | 'bespoke' | 'bangles'>('all');

  const reviewsList: FullReview[] = [
    {
      id: 'rev-1',
      nameEn: 'H.H. Sheikha Maryam Al Nahyan',
      nameAr: 'سمو الشيخة مريم آل ن.',
      cityEn: 'Abu Dhabi, UAE',
      cityAr: 'أبوظبي، الإمارات',
      titleEn: 'Royal Wedding Bridal Sovereign Set',
      titleAr: 'طقم الزفاف الملكي التراثي',
      category: 'bridal',
      pieceEn: 'The Emirati Mirtasha Bib Necklace (280g 21K Pure Gold)',
      pieceAr: 'طوق المرتعشة الإماراتية التراثية (٢٨٠ غرام ذهب عيار ٢١)',
      quoteEn: 'The majestic drape, mirror-polished coin chimes, and sheer weight of the 280g 21K Mirtasha bib turned our wedding zaffe into pure Gulf royalty. The velvet presentation coffer with calligraphy was breathtaking.',
      quoteAr: 'ثقل الذهب الخالص عيار ٢١ ورنة الليرات التراثية في طوق المرتعشة جعلت ليلة زفافي أسطورية لا تُنسى. الصندوق المخملي الملكي المنقوش بالخط العربي تحفة سيادية بحد ذاته.',
      timeEn: 'Verified Acquisition · 3 days ago',
      timeAr: 'اقتناء موثق · منذ ٣ أيام',
      stars: 5
    },
    {
      id: 'rev-2',
      nameEn: 'Noura Al Otaiba',
      nameAr: 'نورة العتيبة',
      cityEn: 'Dubai, UAE',
      cityAr: 'دبي، الإمارات',
      titleEn: 'Exquisite Granulation & Handcraft',
      titleAr: 'دقة الصياغة اليدوية وتفاصيل حب الهيل',
      category: 'bangles',
      pieceEn: 'Hab Al Hail Royal Bangles (Pair, 21K)',
      pieceAr: 'أساور حب الهيل الملكية (زوج عيار ٢١)',
      quoteEn: 'Impeccable Dubai artisan craftsmanship. The cardamom granulation captures candlelight with celestial warmth, and the secret hinge mechanism opens like silk. Truly Noor Dubai is in a class of its own.',
      quoteAr: 'صياغة إماراتية فاخرة بنقش حب الهيل، تلتقط الضوء ببريق ذهبي دافئ ومفصل الإغلاق السري سلس للغاية. دار نور دبي عنوان الفخامة الحقيقية.',
      timeEn: 'Verified Acquisition · 1 week ago',
      timeAr: 'اقتناء موثق · منذ أسبوع',
      stars: 5
    },
    {
      id: 'rev-3',
      nameEn: 'Hassa Al Saud',
      nameAr: 'حصة آل س.',
      cityEn: 'Riyadh, Saudi Arabia',
      cityAr: 'الرياض، المملكة العربية السعودية',
      titleEn: 'Private Residence Diplomatic Handover',
      titleAr: 'تسليم ملكي آمن في قصر الرياض',
      category: 'bridal',
      pieceEn: 'The Royal Bridal Hizam Belt (390g 21K Gold & Rubies)',
      pieceAr: 'حزام الذهب الملكي التراثي للعروس (٣٩٠ غرام وياقوت)',
      quoteEn: 'Discreet, highly secure diplomatic transit directly to our Riyadh palace residence. The certificate of sovereign purity and heavy 21K hand-welded links reflect unmatched Gulf heritage prestige.',
      quoteAr: 'تسليم راقٍ وسري في قصرنا بالرياض عبر حراسة دبلوماسية مؤمنة. نقاء الذهب عيار ٢١ والتوثيق والشهادات المرفقة تفوق الوصف وتجسد عراقة التراث الخليجي.',
      timeEn: 'Verified Royal Client · 2 weeks ago',
      timeAr: 'عميلة ملكية موثقة · منذ أسبوعين',
      stars: 5
    },
    {
      id: 'rev-4',
      nameEn: 'Al Anoud Al Thani',
      nameAr: 'العنود آل ث.',
      cityEn: 'Doha, Qatar',
      cityAr: 'الدوحة، قطر',
      titleEn: 'Natural Basra Saltwater Pearls',
      titleAr: 'لآلئ بحر البصرة الطبيعية الاستثنائية',
      category: 'pearls',
      pieceEn: 'The Royal Basra Tablah Choker & Seed Pearl Sautoir',
      pieceAr: 'طوق الطبلة الملكي بلؤلؤ البصرة الطبيعي النادر',
      quoteEn: 'Finding unheated certified Basra saltwater pearls with this orient and rainbow luster is extraordinarily rare. Noor Dubai sourced perfection and the gold lace filigree is second to none.',
      quoteAr: 'العثور على لآلئ البصرة البحرية الطبيعية الموثقة بهذا البريق والصفاء أمر نادر جداً عالمياً. دار نور دبي جلبت التحفة الأجمل مع صياغة شبكية ذهبية لا مثيل لها.',
      timeEn: 'Verified Acquisition · 5 days ago',
      timeAr: 'اقتناء موثق · منذ ٥ أيام',
      stars: 5
    },
    {
      id: 'rev-5',
      nameEn: 'Sheikha Fatima Al Sabah',
      nameAr: 'الشيخة فاطمة الصباح',
      cityEn: 'Kuwait City, Kuwait',
      cityAr: 'مدينة الكويت، الكويت',
      titleEn: 'Sovereign Bullion & Bespoke Tiara',
      titleAr: 'تاج سيادي ذهبي وسبائك ملكية',
      category: 'bespoke',
      pieceEn: 'Custom 24K Pure Gold Sovereignty Heirlooms',
      pieceAr: 'قطع تذكارية وتيجان سيادية مخصصة عيار ٢٤',
      quoteEn: 'From initial 3D sketch consultation to the final gold weight verification, Noor Dubai treated our commission with supreme confidentiality and master goldsmith precision.',
      quoteAr: 'منذ أول جلسة رسم استشارية حتى تسليم القطعة والتحقق من وزن الذهب النقي، تعاملت دار نور دبي بمنتهى السرية والاحترافية الحرفية العالية.',
      timeEn: 'Verified Acquisition · 1 month ago',
      timeAr: 'اقتناء موثق · منذ شهر',
      stars: 5
    },
    {
      id: 'rev-6',
      nameEn: 'Lady Eleanor Vance',
      nameAr: 'ليدي إليانور فانس',
      cityEn: 'Mayfair, London & Dubai',
      cityAr: 'مايفير، لندن ودبي',
      titleEn: 'Finest 21K Gold in the Middle East',
      titleAr: 'أنقى صياغة ذهب في الشرق الأوسط',
      category: 'all',
      pieceEn: 'Thuraya Celestial Diamond & 21K Gold Ensemble',
      pieceAr: 'طقم الثريا الفلكي بالألماس والذهب عيار ٢١',
      quoteEn: 'I have acquired high jewelry from Place Vendôme and New Bond Street, but Noor Dubai\'s warm 21K yellow gold richness and celestial Arabic geometry possess a soul that European ateliers simply cannot replicate.',
      quoteAr: 'اقتنيت مجوهرات من ساحة فاندوم في باريس وبوند ستريت بلندن، لكن دفء ذهب عيار ٢١ الإماراتي من نور دبي والزخارف الهندسية تحمل روحاً وتاريخاً لا ينافسه أحد.',
      timeEn: 'Verified VIP Acquisition · 3 weeks ago',
      timeAr: 'اقتناء موثق · منذ ٣ أسابيع',
      stars: 5
    }
  ];

  const filteredReviews = selectedFilter === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.category === selectedFilter || r.category === 'all');

  const filters = [
    { id: 'all', labelEn: 'All Royal Acquisitions', labelAr: 'جميع الاقتناءات الملكية' },
    { id: 'bridal', labelEn: 'Bridal & Sovereignty', labelAr: 'أطقم العرائس والسيادة' },
    { id: 'pearls', labelEn: 'Basra Saltwater Pearls', labelAr: 'لؤلؤ البصرة الطبيعي' },
    { id: 'bangles', labelEn: 'Royal Bangles & Cuffs', labelAr: 'الأساور والمعاصم التراثية' },
    { id: 'bespoke', labelEn: 'Bespoke Heirlooms', labelAr: 'القطع المخصصة الخاصة' }
  ];

  return (
    <section 
      id="reviews" 
      className="relative w-full bg-gradient-to-b from-[#FAF4EB] via-[#FFFDF9] to-[#F5ECE0] py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-[#D4AF37]/35 text-[#24170D] overflow-hidden"
    >
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B48628]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'شهادات عملاء كبار الشخصيات' : 'VERIFIED VIP TESTIMONIALS'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#22160C] tracking-wide mb-4">
            {isAr ? 'آراء ورسائل عملاء النخبة' : 'ROYAL CLIENT REVIEWS'}
          </h2>

          <p className="text-sm sm:text-base text-[#8C6418] font-serif-luxury tracking-wide italic mb-6">
            {isAr
              ? '«اقتناءات ملكية موثقة من عائلات ونخبة الخليج العربي والعالم.»'
              : '"Documented acquisitions from royal households and discerning Gulf collectors."'}
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-lg px-6 py-3 shadow-md">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-base font-bold text-[#24170D] font-mono">4.98 / 5.0</span>
            <span className="text-xs text-[#8C7662] border-l border-[#E2D2BE] pl-3">
              {isAr ? '١,٤٢٠+ قطعة تراثية موثقة' : '1,420+ Certified Heirlooms Delivered'}
            </span>
            <span className="text-xs font-semibold text-[#8C6418] bg-[#F7EEDB] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B48628]" />
              <span>{isAr ? 'ضمان نقاء معتمد' : '100% Purity Certified'}</span>
            </span>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer border ${
                selectedFilter === f.id
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3DE9C] to-[#C5942B] text-[#22160C] border-[#B48628] shadow-md scale-105'
                  : 'bg-[#FFFDF9] text-[#6A523D] border-[#D4AF37]/30 hover:border-[#B48628] hover:text-[#22160C]'
              }`}
            >
              {isAr ? f.labelAr : f.labelEn}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFDF9] border-2 border-[#D4AF37]/35 rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-[#B48628] hover:shadow-[0_12px_35px_rgba(180,134,40,0.18)] transition-all duration-300 relative group"
            >
              {/* Top Row: Stars and Verified Shield */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#8C6418] uppercase tracking-wider bg-[#F7EEDB] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B48628]" />
                    <span>{isAr ? 'اقتناء موثق' : 'VERIFIED VIP'}</span>
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="font-serif-luxury font-bold text-base text-[#24170D] mb-2 group-hover:text-[#8C6418] transition-colors">
                  {isAr ? rev.titleAr : rev.titleEn}
                </h3>

                {/* Acquired Piece Badge */}
                <div className="text-[11px] font-semibold text-[#A0721E] uppercase tracking-wider mb-4 pb-3 border-b border-[#EEDFCD] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B48628] shrink-0" />
                  <span className="truncate">{isAr ? rev.pieceAr : rev.pieceEn}</span>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-[#D4AF37]/25 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-[#423122] italic leading-relaxed font-serif-luxury pl-4">
                    "{isAr ? rev.quoteAr : rev.quoteEn}"
                  </p>
                </div>
              </div>

              {/* Bottom Client Info */}
              <div className="pt-4 border-t border-[#EEDFCD] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#22160C]">
                    {isAr ? rev.nameAr : rev.nameEn}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#8C7662]">
                    <MapPin className="w-3 h-3 text-[#B48628]" />
                    <span>{isAr ? rev.cityAr : rev.cityEn}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#A08873] font-mono">
                  {isAr ? rev.timeAr : rev.timeEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Experience Callout Banner */}
        <div className="bg-gradient-to-r from-[#FAF4EB] via-[#F5EADB] to-[#EFE2D2] border-2 border-[#D4AF37]/50 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold text-[#8C6418] uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-1.5 mb-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isAr ? 'شارك تجربتك الملكية أو استفسر مباشرة' : 'SHARE YOUR ACQUISITION OR INQUIRE DIRECTLY'}
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#22160C] mb-2">
              {isAr ? 'تواصل مع مكتب الاستقبال وخدمة العملاء' : 'Speak with Noor Dubai Concierge'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4533]">
              {isAr
                ? 'هل اقتنيت قطعة وترغب في مشاركة تجربتك أو لديك استفسار؟ خط الواتساب الرسمي متاح لخدمتكم على مدار الساعة.'
                : 'Have you acquired a piece and wish to share your testimony, or have a direct inquiry? Our sovereign WhatsApp desk is open 24/7.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                isAr
                  ? 'السلام عليكم، أود التواصل مع خدمة العملاء لدار نور دبي لمشاركة استفسار أو تجربة اقتناء.'
                  : 'Assalamu Alaikum, I would like to connect with Noor Dubai VIP Concierge regarding my acquisition or inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? `واتساب الدعم (${DISPLAY_WHATSAPP_NUMBER})` : `WhatsApp Concierge (${DISPLAY_WHATSAPP_NUMBER})`}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
