import React, { useState } from 'react';
import { Compass, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { CurrencyCode, Language } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene10Props {
  lang: Language;
  currency: CurrencyCode;
  onOpenBooking: () => void;
}

export const Scene10BespokeAtelier: React.FC<Scene10Props> = ({ lang, currency, onOpenBooking }) => {
  const isAr = lang === 'ar';

  const [goldType, setGoldType] = useState<'yellow' | 'white' | 'rose'>('yellow');
  const [gemstone, setGemstone] = useState<'diamond' | 'emerald' | 'ruby' | 'sapphire'>('diamond');
  const [form, setForm] = useState<'necklace' | 'bangle' | 'belt' | 'earrings' | 'rings'>('necklace');
  const [caratWeight, setCaratWeight] = useState<number>(3.5);
  const [engraving, setEngraving] = useState<string>('');
  const [commissionSubmitted, setCommissionSubmitted] = useState(false);

  // Real photographic assets for bespoke previews
  const formImages = {
    necklace: '/images/traditional_mirtasha_necklace_1791449330760.jpg',
    bangle: '/images/hab_al_hail_gold_bangles_1791448128996.jpg',
    belt: '/images/traditional_gold_bridal_belt_1791449344047.jpg',
    earrings: '/images/heavy_jomoor_gold_earrings_1791449356521.jpg',
    rings: '/images/traditional_marami_rings_1791449366768.jpg'
  };

  const basePrices: Record<string, number> = {
    necklace: 120000,
    bangle: 45000,
    belt: 160000,
    earrings: 32000,
    rings: 26000
  };

  const stoneMultipliers: Record<string, number> = {
    diamond: 18000,
    emerald: 22000,
    ruby: 20000,
    sapphire: 16000
  };

  const calculatedAED = basePrices[form] + Math.round(caratWeight * stoneMultipliers[gemstone]);

  const handleCustomizationChange = () => {
    playChime(700);
  };

  return (
    <section 
      id="bespoke" 
      className="relative min-h-screen w-full bg-gradient-to-b from-[#EFE1D0] via-[#FAF4EB] to-[#F5ECE0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'محترف نور دبي للصياغة الخاصة' : 'ATELIER DE SUR-MESURE · NOOR DUBAI'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'صممي إرثكِ العائلي الخالد' : 'CREATE YOUR HEIRLOOM'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-xl mx-auto tracking-wider">
            {isAr
              ? 'اختاري عيار الذهب ونقاء الحجر الكريم وشكل التصميم لابتكار قطعة لا تتكرر، تُصنع بالكامل باسمك.'
              : 'Architect a one-of-a-kind royal piece. Select sovereign metals, natural gemstones, and bespoke Arabic calligraphy inscriptions.'}
          </p>
        </div>

        {/* Bespoke Interactive Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md p-6 sm:p-10 shadow-[0_30px_80px_rgba(180,134,40,0.2)]">
          
          {/* LEFT: Live Real Photographic Preview of the Selected Creation */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[440px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F1E3D1] rounded-md border border-[#D4AF37]/40 p-6 overflow-hidden shadow-inner">
            
            <div className="absolute w-60 h-60 rounded-full bg-[#F59E0B]/20 blur-3xl pointer-events-none" />

            {/* Real Photo representation */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <img
                key={form}
                src={formImages[form]}
                alt="Custom Heirloom Preview"
                referrerPolicy="no-referrer"
                className="max-h-[300px] sm:max-h-[340px] w-auto object-contain rounded-md drop-shadow-[0_20px_45px_rgba(180,134,40,0.35)] transform hover:scale-105 transition-transform duration-500 animate-in fade-in zoom-in-95"
              />
            </div>

            {/* Custom Engraving Ribbon */}
            {engraving && (
              <div className="mt-4 px-5 py-2 bg-[#FAF1E3] border border-[#D4AF37]/50 rounded-sm text-xs font-serif-luxury text-[#8C6418] font-bold tracking-widest text-center shadow-sm">
                <span className="text-[#5C4533] text-[10px] block uppercase font-sans font-bold">{isAr ? 'النقش المحفور بالذهب' : 'Hallmark Inscription:'}</span>
                "{engraving}"
              </div>
            )}

            {/* Dynamic Valuation Pill formatted with selected currency */}
            <div className="mt-6 text-center">
              <span className="text-[10px] text-[#5C4533] tracking-widest uppercase block font-bold">
                {isAr ? 'التقدير الأولي للصياغة' : 'Estimated Bespoke Valuation'}
              </span>
              <span className="font-serif-luxury text-3xl sm:text-4xl text-[#8C6418] font-black tabular-nums">
                {formatCurrencyPrice(calculatedAED, currency, isAr)}
              </span>
            </div>

          </div>

          {/* RIGHT: Customization Controls Matrix */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. SELECT FORM */}
            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase text-[#7A5410] block mb-2 font-bold">
                {isAr ? '١. نوع القطعة والتصميم' : '1. FORM & SILHOUETTE'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'necklace', labelEn: 'Mirtasha', labelAr: 'مرتعشة' },
                  { id: 'bangle', labelEn: 'Hab Al Hail', labelAr: 'أساور هيل' },
                  { id: 'belt', labelEn: 'Hizam Belt', labelAr: 'حزام عروس' },
                  { id: 'earrings', labelEn: 'Jomoor', labelAr: 'أقراط جمور' },
                  { id: 'rings', labelEn: 'Marami', labelAr: 'خواتم مرامي' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setForm(item.id as any); handleCustomizationChange(); }}
                    className={`py-2.5 px-2 text-xs border rounded-sm transition-all text-center cursor-pointer font-bold ${
                      form === item.id
                        ? 'border-[#B48628] bg-[#B48628] text-white shadow-sm'
                        : 'border-[#E8D9C5] text-[#5C4533] bg-[#FFFDF9] hover:bg-[#F3E5D2]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SELECT GOLD ALLOY */}
            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase text-[#7A5410] block mb-2 font-bold">
                {isAr ? '٢. عيار الذهب' : '2. PRECIOUS GOLD PURITY'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yellow', labelEn: '21K Sovereign Gold', labelAr: 'ذهب أصفر عيار ٢١' },
                  { id: 'white', labelEn: '18K White Gold', labelAr: 'ذهب أبيض عيار ١٨' },
                  { id: 'rose', labelEn: '18K Rose Gold', labelAr: 'ذهب وردي عيار ١٨' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setGoldType(item.id as any); handleCustomizationChange(); }}
                    className={`py-2.5 px-2 text-xs border rounded-sm transition-all text-center cursor-pointer font-bold ${
                      goldType === item.id
                        ? 'border-[#B48628] bg-[#B48628] text-white shadow-sm'
                        : 'border-[#E8D9C5] text-[#5C4533] bg-[#FFFDF9] hover:bg-[#F3E5D2]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SELECT GEMSTONE */}
            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase text-[#7A5410] block mb-2 font-bold">
                {isAr ? '٣. الأحجار الكريمة' : '3. GEMSTONE SELECTION'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'diamond', labelEn: 'D-Flawless', labelAr: 'ألماس ناصع' },
                  { id: 'emerald', labelEn: 'Emerald', labelAr: 'زمرد كولومبي' },
                  { id: 'ruby', labelEn: 'Ruby', labelAr: 'ياقوت أحمر' },
                  { id: 'sapphire', labelEn: 'Sapphire', labelAr: 'زفير كشميري' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setGemstone(item.id as any); handleCustomizationChange(); }}
                    className={`py-2.5 px-2 text-xs border rounded-sm transition-all text-center cursor-pointer font-bold ${
                      gemstone === item.id
                        ? 'border-[#B48628] bg-[#B48628] text-white shadow-sm'
                        : 'border-[#E8D9C5] text-[#5C4533] bg-[#FFFDF9] hover:bg-[#F3E5D2]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. CARAT WEIGHT SLIDER */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2 font-bold">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#7A5410]">
                  {isAr ? '٤. وزن الحجر الأساسي' : '4. GEMSTONE WEIGHT'}
                </span>
                <span className="font-mono text-[#8C6418]">{caratWeight.toFixed(2)} Carats</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.25"
                value={caratWeight}
                onChange={(e) => { setCaratWeight(parseFloat(e.target.value)); handleCustomizationChange(); }}
                className="w-full accent-[#B48628] cursor-pointer"
              />
            </div>

            {/* 5. CUSTOM ENGRAVING */}
            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase text-[#7A5410] block mb-2 font-bold">
                {isAr ? '٥. النقش المحفور بالذهب' : '5. BESPOKE CALLIGRAPHY ENGRAVING'}
              </label>
              <input
                type="text"
                maxLength={30}
                placeholder={isAr ? 'مثال: سمو الشيخة مريم · إلى الأبد ٢٠٢٦' : 'e.g. Sheikha Maryam · Royal Grace 2026'}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#D4AF37]/50 rounded-sm px-3 py-2.5 text-xs text-[#24170D] placeholder-[#9E8B7A] focus:outline-none focus:border-[#B48628]"
              />
            </div>

            {/* SUBMIT */}
            <div className="pt-2">
              {commissionSubmitted ? (
                <div className="p-4 bg-[#EAF7EE] border border-[#10B981]/60 rounded-sm text-center text-xs text-[#136136] space-y-1">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-[#10B981]" />
                  <div className="font-bold">{isAr ? 'تم تسجيل طلب الصياغة الخاصة بنجاح' : 'Bespoke Commission Received'}</div>
                  <p className="text-[11px]">
                    {isAr
                      ? 'سيتواصل معك كبير الصاغة في دار نور دبي لتنسيق التصميم.'
                      : 'Our Master Jeweler will contact you discreetly with initial 3D render schematics.'}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCommissionSubmitted(true);
                    playChime(880);
                  }}
                  className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1B0F07] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#1B0F07]" />
                  <span>{isAr ? 'تكليف الدار بصياغة هذا الطقم' : 'COMMISSION THIS HEIRLOOM'}</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
