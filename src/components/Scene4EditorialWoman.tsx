import React, { useState } from 'react';
import { Eye, ZoomIn, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene4Props {
  lang: Language;
  currency: CurrencyCode;
  onSelectProduct: (p: Product) => void;
  products: Product[];
}

export const Scene4EditorialWoman: React.FC<Scene4Props> = ({
  lang,
  currency,
  onSelectProduct,
  products
}) => {
  const isAr = lang === 'ar';
  const [zoomMode, setZoomMode] = useState<'full' | 'necklace' | 'earrings' | 'rings'>('full');

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id) || products[0];
  };

  const mirtashaPiece = getProduct('vault-mirtasha-bib');
  const bridalKeff = getProduct('prod-bridal-keff-flower');

  const zoomStyles = {
    full: { transform: 'scale(1) translate(0%, 0%)', transformOrigin: 'center center' },
    necklace: { transform: 'scale(1.85) translate(0%, -15%)', transformOrigin: 'center 45%' },
    earrings: { transform: 'scale(2.3) translate(-10%, -28%)', transformOrigin: 'right 30%' },
    rings: { transform: 'scale(2.1) translate(8%, 18%)', transformOrigin: 'left 70%' },
  };

  const handleZoom = (mode: 'full' | 'necklace' | 'earrings' | 'rings') => {
    setZoomMode(mode);
    playChime(mode === 'full' ? 520 : 780);
  };

  return (
    <section 
      id="editorial"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#EFE1D0] via-[#FAF4EB] to-[#F5ECE0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'الافتتان والأناقة المعاصرة' : 'HAUTE COUTURE EDITORIAL'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-4 leading-tight">
            {isAr ? 'صُممت لترتديها.. وصُنعت لتخلد في الذاكرة' : 'MADE TO BE WORN. CREATED TO BE REMEMBERED.'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-xl mx-auto tracking-wider">
            {isAr
              ? 'مجوهرات تتناغم مع كبرياء المرأة وأناقتها، من أرقى دور الأزياء في دبي إلى مناسبات القصور الملكية.'
              : 'Captured in the private salons of Dubai. Where modern abaya couture meets sovereign 21K gold craftsmanship.'}
          </p>
        </div>

        {/* Editorial Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Cinematic Photo Frame with Camera Zoom Pan effect (Used only once as requested) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[520px] sm:h-[620px] rounded-md overflow-hidden border-2 border-[#D4AF37]/50 bg-[#FFFDF9] shadow-[0_25px_60px_rgba(180,134,40,0.2)]">
              
              <img
                src="/src/assets/images/editorial_woman_couture_1791446488324.jpg"
                alt="Middle Eastern luxury high jewelry editorial model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                style={zoomStyles[zoomMode]}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

              {/* Floating Camera Mode Indicator */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#FFFDF9]/95 backdrop-blur-md px-3.5 py-1.5 border border-[#D4AF37]/50 rounded-full shadow-md text-[#24170D]">
                <ZoomIn className="w-3.5 h-3.5 text-[#B48628]" />
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold">
                  LENS: {zoomMode.toUpperCase()} VIEW
                </span>
              </div>

              {/* Bottom Scrim Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-white border-t border-white/30 pt-3">
                <span className="font-serif-luxury text-sm tracking-widest text-[#FDE68A] font-bold">
                  VOGUE ARABIA EXCLUSIVE ARCHIVE
                </span>
                <span className="text-[11px] text-white/90">
                  {isAr ? 'التقطت في قصر الجميرا، دبي' : 'Captured in Private Palace Pavilion, Dubai'}
                </span>
              </div>

            </div>

            {/* Lens Switcher Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 bg-[#FFFDF9] p-2.5 border border-[#D4AF37]/40 rounded-md shadow-sm">
              <span className="text-[11px] uppercase tracking-wider text-[#5C4533] px-2 font-bold">
                {isAr ? 'عدسة التقريب:' : 'Macro Camera:'}
              </span>
              <button
                onClick={() => handleZoom('full')}
                className={`px-3.5 py-1.5 text-xs tracking-wider rounded-sm transition-colors cursor-pointer font-bold ${zoomMode === 'full' ? 'bg-[#D4AF37] text-black shadow-sm' : 'text-[#5C4533] hover:text-[#B48628]'}`}
              >
                {isAr ? 'الصورة الكاملة' : 'Full Portrait'}
              </button>
              <button
                onClick={() => handleZoom('necklace')}
                className={`px-3.5 py-1.5 text-xs tracking-wider rounded-sm transition-colors cursor-pointer font-bold ${zoomMode === 'necklace' ? 'bg-[#D4AF37] text-black shadow-sm' : 'text-[#5C4533] hover:text-[#B48628]'}`}
              >
                {isAr ? 'طوق المرتعشة' : 'Mirtasha Bib'}
              </button>
              <button
                onClick={() => handleZoom('earrings')}
                className={`px-3.5 py-1.5 text-xs tracking-wider rounded-sm transition-colors cursor-pointer font-bold ${zoomMode === 'earrings' ? 'bg-[#D4AF37] text-black shadow-sm' : 'text-[#5C4533] hover:text-[#B48628]'}`}
              >
                {isAr ? 'أقراط الجمور' : 'Jomoor Drops'}
              </button>
              <button
                onClick={() => handleZoom('rings')}
                className={`px-3.5 py-1.5 text-xs tracking-wider rounded-sm transition-colors cursor-pointer font-bold ${zoomMode === 'rings' ? 'bg-[#D4AF37] text-black shadow-sm' : 'text-[#5C4533] hover:text-[#B48628]'}`}
              >
                {isAr ? 'خواتم المرامي' : 'Marami Rings'}
              </button>
            </div>

          </div>

          {/* RIGHT: Featured Creations Dossier Transition */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-[#FFFDF9] border-2 border-[#D4AF37]/45 rounded-md shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={mirtashaPiece.image}
                  alt={mirtashaPiece.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded-sm border border-[#D4AF37]/50 shadow-sm"
                />
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-[#8C6418] uppercase font-bold">
                    {isAr ? 'القطعة المركزية التراثية' : 'HERITAGE CENTERPIECE'}
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#24170D] font-bold">
                    {isAr ? mirtashaPiece.nameAr : mirtashaPiece.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#5C4533] leading-relaxed mb-4">
                {isAr ? mirtashaPiece.descriptionAr : mirtashaPiece.description}
              </p>

              <div className="flex items-center justify-between border-t border-[#E8D9C5] pt-3 text-xs">
                <span className="font-mono text-[#8C6418] font-black text-sm">
                  {formatCurrencyPrice(mirtashaPiece.priceAED, currency, isAr)}
                </span>
                <button
                  onClick={() => onSelectProduct(mirtashaPiece)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#24170D] hover:text-[#B48628] font-bold transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B48628]" />
                  <span>{isAr ? 'معاينة الطقم' : 'Inspect Piece'}</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#FFFDF9] border-2 border-[#D4AF37]/45 rounded-md shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={bridalKeff.image}
                  alt={bridalKeff.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded-sm border border-[#D4AF37]/50 shadow-sm"
                />
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-[#8C6418] uppercase font-bold">
                    {isAr ? 'كف الذهب التراثي' : 'TRADITIONAL KEFF HAND FLOWER'}
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#24170D] font-bold">
                    {isAr ? bridalKeff.nameAr : bridalKeff.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#5C4533] leading-relaxed mb-4">
                {isAr ? bridalKeff.descriptionAr : bridalKeff.description}
              </p>

              <div className="flex items-center justify-between border-t border-[#E8D9C5] pt-3 text-xs">
                <span className="font-mono text-[#8C6418] font-black text-sm">
                  {formatCurrencyPrice(bridalKeff.priceAED, currency, isAr)}
                </span>
                <button
                  onClick={() => onSelectProduct(bridalKeff)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#24170D] hover:text-[#B48628] font-bold transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B48628]" />
                  <span>{isAr ? 'معاينة الكف' : 'Inspect Piece'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#bespoke"
                className="w-full inline-flex items-center justify-center gap-2 py-4 text-xs tracking-[0.25em] uppercase font-bold text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm transition-all shadow-md"
              >
                <span>{isAr ? 'طلب تصميم طقم عروس خاص' : 'COMMISSION BRIDAL SUITE'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
