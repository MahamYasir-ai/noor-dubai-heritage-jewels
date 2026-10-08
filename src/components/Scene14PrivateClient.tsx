import React from 'react';
import { Sparkles, Calendar, MessageSquare, ShieldCheck, MapPin, Check } from 'lucide-react';
import { Language } from '../types';

interface Scene14Props {
  lang: Language;
  onOpenBooking: () => void;
}

export const Scene14PrivateClient: React.FC<Scene14Props> = ({ lang, onOpenBooking }) => {
  const isAr = lang === 'ar';

  const salons = [
    { cityEn: 'DUBAI', cityAr: 'دبي', locationEn: 'DIFC Gate Village · Penthouse Salon', locationAr: 'قرية البوابة، مركز دبي المالي العالمي' },
    { cityEn: 'ABU DHABI', cityAr: 'أبوظبي', locationEn: 'Al Maryah Island · Private Suite', locationAr: 'جزيرة المارية · الجناح الخاص' },
    { cityEn: 'RIYADH', cityAr: 'الرياض', locationEn: 'Kingdom Center Tower · Presidential Floor', locationAr: 'برج المملكة · الطابق الرئاسي' },
    { cityEn: 'DOHA', cityAr: 'الدوحة', locationEn: 'Lusail Marina · Haute Joaillerie Vault', locationAr: 'مارينا لوسيل · خزينة المجوهرات' },
    { cityEn: 'KUWAIT', cityAr: 'الكويت', locationEn: 'Al Hamra Tower · VIP Salon', locationAr: 'برج الحمراء · صالون كبار الشخصيات' }
  ];

  return (
    <section 
      id="salons" 
      className="relative min-h-[90vh] w-full bg-gradient-to-b from-[#EFE1D0] via-[#FAF4EB] to-[#F5ECE0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'الخدمة الخاصة والسرية التامة' : 'EXCLUSIVE CONCIERGE & SALONS'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'خبير مجوهراتك الخاص' : 'YOUR PRIVATE JEWELER'}
          </h2>

          <p className="text-base text-[#8C6418] font-serif-luxury tracking-wide italic mb-4 font-bold">
            {isAr
              ? '«للقطع الاستثنائية.. بعض التجارب يجب أن تبقى في إطار من الخصوصية التامة.»'
              : '"For extraordinary pieces, some experiences should remain private."'}
          </p>

          <p className="text-xs text-[#5C4533] max-w-md mx-auto">
            {isAr
              ? 'نوفر جلسات استشارية فردية في صالوناتنا المغلقة أو في مقر إقامتكم الخاصة برفقة حراسة مرخصة.'
              : 'Discreet viewings hosted in our private Gulf salon suites or at your royal residence with insured diplomatic courier transit.'}
          </p>
        </div>

        {/* Salons Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {salons.map((s, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FFFDF9] border-2 border-[#D4AF37]/40 rounded-md hover:border-[#B48628] transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <MapPin className="w-4 h-4 text-[#B48628] mb-3" />
                <h3 className="font-display-royal text-lg text-[#24170D] font-bold mb-1">
                  {isAr ? s.cityAr : s.cityEn}
                </h3>
                <p className="text-xs text-[#5C4533]">
                  {isAr ? s.locationAr : s.locationEn}
                </p>
              </div>
              <div className="pt-4 text-[10px] tracking-widest text-[#8C6418] font-bold uppercase border-t border-[#E8D9C5] mt-4">
                {isAr ? 'بالموعد المسبق' : 'BY APPOINTMENT'}
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="max-w-3xl mx-auto bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(180,134,40,0.18)]">
          <div className="text-left rtl:text-right">
            <h4 className="font-serif-luxury text-xl text-[#24170D] font-bold">
              {isAr ? 'احجز استشارتك الخاصة الآن' : 'Reserve Your Private Viewing Session'}
            </h4>
            <p className="text-xs text-[#5C4533] mt-1">
              {isAr ? 'خدمة مخصصة لكبار الشخصيات وهواة جمع التحف' : 'Complimentary private salon reception and personal gemologist presentation'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm transition-all whitespace-nowrap cursor-pointer shadow-md"
            >
              {isAr ? 'حجز موعد في الصالون' : 'BOOK A PRIVATE VIEWING'}
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-[#8C6418] border border-[#D4AF37]/60 hover:bg-[#F3E5D2] rounded-sm transition-all whitespace-nowrap cursor-pointer"
            >
              {isAr ? 'طلب استشارة هاتفية' : 'REQUEST A CONSULTATION'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
