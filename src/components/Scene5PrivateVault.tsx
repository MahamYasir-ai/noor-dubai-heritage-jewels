import React, { useState } from 'react';
import { Lock, Unlock, Eye, Award } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playCelestialChord, playVaultClick, playChime } from '../utils/sound';

interface Scene5Props {
  lang: Language;
  currency: CurrencyCode;
  vaultProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Scene5PrivateVault: React.FC<Scene5Props> = ({
  lang,
  currency,
  vaultProducts,
  onSelectProduct
}) => {
  const isAr = lang === 'ar';
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);

  const handleUnlock = () => {
    playVaultClick();
    setTimeout(() => {
      setIsUnlocked(true);
      playCelestialChord();
    }, 400);
  };

  const currentPiece = vaultProducts[selectedVaultIndex] || vaultProducts[0];

  return (
    <section 
      id="vault" 
      className="relative min-h-screen w-full bg-gradient-to-b from-[#F5ECE0] via-[#FAF4EB] to-[#EFE1D0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      {/* Warm Ambient Peach & Gold Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VAULT TITLE & ENTRANCE BADGE */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#B48628]" />
            <span>{isAr ? 'خزينة دار نور دبي للذهب التراثي' : 'SANCTUM SANCTORUM · THE NOOR DUBAI GOLD VAULT'}</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'الخزانة الملكية الخاصة' : 'THE PRIVATE ROYAL VAULT'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-lg mx-auto tracking-wider">
            {isAr
              ? 'خمس تحف ذهبية استثنائية صِيغت لأفراح وأعراس العائلات الكريمة في الخليج العربي.'
              : 'Five sovereign creations accessible exclusively for bespoke private viewing and royal bridal commissions.'}
          </p>

          {/* VAULT DOOR UNLOCK BUTTON */}
          {!isUnlocked && (
            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={handleUnlock}
                className="group relative px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-[0_15px_40px_rgba(180,134,40,0.3)] transition-all flex items-center gap-3 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-[#1E1208] group-hover:scale-110 transition-transform" />
                <span>{isAr ? 'افتح الخزانة الملكية' : 'OPEN THE VAULT'}</span>
              </button>
              <span className="text-[10px] tracking-widest text-[#7C6552] uppercase mt-3 font-semibold">
                {isAr ? 'مشفرة بأعلى معايير الخصوصية والأمان' : 'SOVEREIGN APPOINTMENT ACCESS'}
              </span>
            </div>
          )}
        </div>

        {/* VAULT INTERIOR (REVEALED WHEN UNLOCKED) */}
        {isUnlocked && (
          <div className="transition-opacity duration-1000 opacity-100">
            
            {/* Top Vault Tab Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-[#D4AF37]/30 pb-4">
              {vaultProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedVaultIndex(idx);
                    playChime(600 + idx * 60);
                  }}
                  className={`px-4 py-2.5 text-xs tracking-[0.2em] uppercase rounded-sm transition-all cursor-pointer font-bold ${
                    selectedVaultIndex === idx
                      ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/30'
                      : 'text-[#5C4533] hover:text-[#8C6418] bg-[#FFFDF9] border border-[#E8D9C5]'
                  }`}
                >
                  {isAr ? p.nameAr : p.name}
                </button>
              ))}
            </div>

            {/* FOCUSED PIECE CINEMATIC SPOTLIGHT STAGE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] border-2 border-[#D4AF37]/50 rounded-md p-6 sm:p-10 shadow-[0_30px_70px_rgba(180,134,40,0.2)]">
              
              {/* LEFT: Real Photographic Piece on Soft Peach Pedestal */}
              <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[460px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F3E5D4] rounded-md border border-[#D4AF37]/40 overflow-hidden p-6 shadow-inner">
                
                {/* Spotlight cone */}
                <div className="absolute top-0 w-80 h-full bg-gradient-to-b from-[#FEF08A]/35 via-[#D4AF37]/15 to-transparent blur-2xl pointer-events-none" />

                {/* Real Photographic Image with dramatic shadow */}
                <div className="relative z-20 flex items-center justify-center w-full h-full">
                  <img
                    src={currentPiece.image}
                    alt={currentPiece.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[340px] sm:max-h-[380px] w-auto object-contain rounded-md drop-shadow-[0_25px_50px_rgba(180,134,40,0.35)] transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Accession label */}
                <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[#7A5410] font-bold uppercase bg-[#FFFDF9]/95 px-3.5 py-1 border border-[#D4AF37]/45 rounded-full font-mono shadow-sm">
                  VAULT ACCESSION #0{selectedVaultIndex + 1}
                </div>
              </div>

              {/* RIGHT: Detailed Specifications & Acquisition Actions */}
              <div className="lg:col-span-5 space-y-6">
                
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-[#7A5410] mb-1 font-bold">
                    {isAr ? currentPiece.categoryLabelAr : currentPiece.categoryLabelEn}
                  </div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#24170D] font-bold mb-2">
                    {isAr ? currentPiece.nameAr : currentPiece.name}
                  </h3>
                  <p className="text-xs text-[#5C4533] leading-relaxed mb-4">
                    {isAr ? currentPiece.descriptionAr : currentPiece.description}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-[#E8D9C5] py-4 text-xs">
                  <div>
                    <span className="block text-[#7C6552] text-[10px] uppercase tracking-wider font-semibold">{isAr ? 'الذهب الخالص' : 'Gold Purity'}</span>
                    <span className="font-bold text-[#24170D]">{isAr ? currentPiece.goldPurityAr : currentPiece.goldPurity}</span>
                  </div>
                  <div>
                    <span className="block text-[#7C6552] text-[10px] uppercase tracking-wider font-semibold">{isAr ? 'الأحجار والتطعيم' : 'Gems & Pearls'}</span>
                    <span className="font-bold text-[#24170D]">{isAr ? currentPiece.gemstoneAr : currentPiece.gemstone}</span>
                  </div>
                  <div>
                    <span className="block text-[#7C6552] text-[10px] uppercase tracking-wider font-semibold">{isAr ? 'الوزن والعيار' : 'Total Weight'}</span>
                    <span className="font-bold text-[#24170D]">{currentPiece.caratTotal}</span>
                  </div>
                  <div>
                    <span className="block text-[#7C6552] text-[10px] uppercase tracking-wider font-semibold">{isAr ? 'دمغة فحص دبي' : 'Assay Hallmark'}</span>
                    <span className="font-bold text-[#24170D]">{currentPiece.hallmark}</span>
                  </div>
                </div>

                {/* Price in Selected Currency & Actions */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#7C6552] block font-semibold">{isAr ? 'القيمة التقديرية' : 'Acquisition Value'}</span>
                    <span className="font-serif-luxury text-2xl sm:text-3xl text-[#8C6418] font-black">
                      {formatCurrencyPrice(currentPiece.priceAED, currency, isAr)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5C4533] flex items-center gap-1 font-semibold">
                    <Award className="w-4 h-4 text-[#B48628]" />
                    <span>{isAr ? 'قطعة وحيدة فريدة' : 'One-of-a-Kind'}</span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onSelectProduct(currentPiece)}
                    className="flex-1 py-4 px-4 text-xs font-bold tracking-[0.2em] uppercase text-[#1B0F07] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4 text-[#1B0F07]" />
                    <span>{isAr ? 'معاينة في حجرة الفحص' : 'INSPECT IN 3D CHAMBER'}</span>
                  </button>

                  <a
                    href="#salons"
                    className="py-4 px-4 text-xs font-bold tracking-[0.2em] uppercase text-[#7A5410] border border-[#B48628]/60 hover:bg-[#F3E5D2] rounded-sm transition-all text-center"
                  >
                    {isAr ? 'حجز موعد للمعاينة' : 'REQUEST VIEWING'}
                  </a>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
