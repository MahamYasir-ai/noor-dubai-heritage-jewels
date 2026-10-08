import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene6Props {
  lang: Language;
  currency: CurrencyCode;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Scene6DubaiAfterDark: React.FC<Scene6Props> = ({
  lang,
  currency,
  products,
  onSelectProduct
}) => {
  const isAr = lang === 'ar';
  const [activeItem, setActiveItem] = useState(0);

  const showcasedPieces = [
    products.find((p) => p.id === 'vault-mirtasha-bib') || products[0],
    products.find((p) => p.id === 'vault-bridal-hizam') || products[1],
    products.find((p) => p.id === 'vault-hab-al-hail') || products[0],
    products.find((p) => p.id === 'vault-tablah-choker') || products[2]
  ];

  const currentPiece = showcasedPieces[activeItem];

  return (
    <section className="relative min-h-[92vh] w-full bg-gradient-to-b from-[#EFE1D0] via-[#FAF4EB] to-[#F5ECE0] py-24 overflow-hidden border-b border-[#D4AF37]/35 flex items-center justify-center text-[#24170D]">
      
      {/* Background with warm overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/dubai_night_palace_vault_1791446538242.jpg"
          alt="Dubai at night luxury palace background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 filter brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFE1D0]/90 via-[#FAF4EB]/70 to-[#F5ECE0]/90" />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-4 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
          <span className="font-bold">{isAr ? 'دار نور دبي · ليالي القصور والأعراس' : 'NOOR DUBAI · ROYAL PALACE PAVILION'}</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3 max-w-3xl leading-tight">
          {isAr ? 'وُلدت في قلب الصحراء.. وصِيغت للعالم' : 'BORN IN THE DESERT. MADE FOR THE WORLD.'}
        </h2>

        <p className="text-sm text-[#5C4533] font-medium max-w-lg mb-10 tracking-widest uppercase">
          {isAr
            ? 'شاهدي بريق الذهب الخالص عيار ٢١ تحت إضاءة القصور وسماء دبي الساحرة.'
            : 'Experience real sovereign gold sets illuminated by nocturnal Dubai palace spotlights.'}
        </p>

        {/* REAL WORLD PHOTOGRAPHIC CENTER STAGE WITH MOVING SHINE */}
        <div className="relative w-80 sm:w-[500px] h-80 sm:h-[420px] flex items-center justify-center my-2 bg-[#FFFDF9] backdrop-blur-md rounded-md border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(180,134,40,0.22)] p-6">
          
          {/* Ambient Center Glow */}
          <div className="absolute w-56 h-56 rounded-full bg-[#F59E0B]/20 blur-3xl animate-pulse" />

          {/* Real Photo */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <img
              src={currentPiece.image}
              alt={currentPiece.name}
              referrerPolicy="no-referrer"
              className="max-h-[290px] w-auto object-contain rounded-sm drop-shadow-[0_20px_45px_rgba(180,134,40,0.35)] transform hover:scale-105 transition-transform duration-500"
            />

            {/* Bottom Info Ribbon */}
            <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between bg-[#FFFDF9]/95 px-3.5 py-2 rounded-sm border border-[#D4AF37]/45 text-xs shadow-md">
              <span className="font-serif-luxury text-[#24170D] font-bold text-sm">
                {isAr ? currentPiece.nameAr : currentPiece.name}
              </span>
              <span className="text-[#8C6418] font-mono font-bold">
                {formatCurrencyPrice(currentPiece.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* Piece Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs tracking-wider uppercase">
          {showcasedPieces.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveItem(idx);
                playChime(640 + idx * 80);
              }}
              className={`px-4 py-2.5 rounded-sm border transition-all cursor-pointer font-bold ${
                activeItem === idx
                  ? 'border-[#D4AF37] text-black bg-[#D4AF37] shadow-sm'
                  : 'border-[#E8D9C5] text-[#5C4533] bg-[#FFFDF9] hover:bg-[#F3E5D2]'
              }`}
            >
              {isAr ? p.nameAr : p.name}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => onSelectProduct(currentPiece)}
            className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold text-[#1B0F07] bg-gradient-to-r from-[#D4AF37] to-[#F8E2A6] hover:brightness-105 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Eye className="w-4 h-4 text-[#1B0F07]" />
            <span>{isAr ? 'معاينة تفاصيل هذا الطقم' : 'INSPECT THIS MASTERPIECE'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
