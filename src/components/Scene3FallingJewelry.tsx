import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Eye } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene3Props {
  lang: Language;
  currency: CurrencyCode;
  onSelectProduct: (p: Product) => void;
  products: Product[];
}

export const Scene3FallingJewelry: React.FC<Scene3Props> = ({
  lang,
  currency,
  onSelectProduct,
  products
}) => {
  const isAr = lang === 'ar';
  const [hasEntered, setHasEntered] = useState(false);
  const [bangleY, setBangleY] = useState(-300);
  const [braceletX, setBraceletX] = useState(-450);
  const [necklaceY, setNecklaceY] = useState(-400);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    const t1 = setTimeout(() => {
      setBangleY(0);
      playChime(520);
    }, 200);

    const t2 = setTimeout(() => {
      setBraceletX(0);
      playChime(660);
    }, 600);

    const t3 = setTimeout(() => {
      setNecklaceY(0);
      playChime(880);
    }, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [hasEntered]);

  const handleReset = () => {
    setHasEntered(false);
    setBangleY(-300);
    setBraceletX(-450);
    setNecklaceY(-400);
    setTimeout(() => {
      setHasEntered(true);
    }, 300);
  };

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id) || products[0];
  };

  const mirtasha = getProduct('vault-mirtasha-bib');
  const bangles = getProduct('vault-hab-al-hail');
  const hizam = getProduct('vault-bridal-hizam');
  const jomoor = getProduct('vault-jomoor-earrings');
  const tablah = getProduct('vault-tablah-choker');

  return (
    <section className="relative min-h-[95vh] w-full bg-gradient-to-b from-[#FAF4EB] via-[#F5ECE0] to-[#EFE1D0] py-24 overflow-hidden border-b border-[#D4AF37]/35 text-[#24170D]">
      
      {/* Warm Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(251,191,36,0.08)_0%,_transparent_75%)] pointer-events-none" />

      {/* Floating Header */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
          <span className="font-bold">{isAr ? 'حركية الجواهر وانعدام الوزن' : 'KINETIC GOLD & PHYSICAL PRESENCE'}</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3">
          {isAr ? 'جواهر تهبط من سماء البهاء والخلود' : 'JEWELS DESCENDING INTO THE SANCTUM'}
        </h2>

        <p className="text-sm text-[#5C4533] font-medium max-w-xl mx-auto tracking-wider">
          {isAr
            ? 'قطع ذهبية تراثية حقيقية تتأرجح وتتحرك في الفضاء لتشاهد بريق الذهب ووزنه الفعلي.'
            : 'Observe real gold bridal parures and engraved cuffs descending with authentic weight, sheen, and presence.'}
        </p>

        {/* Reset Trigger Button */}
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase font-bold text-[#8C6418] bg-[#FFFDF9] border border-[#D4AF37]/60 hover:bg-[#F3E5D2] rounded-full transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isAr ? 'إعادة إطلاق حركة القطع' : 'Release Kinetic Jewels'}</span>
          </button>
        </div>
      </div>

      {/* KINETIC STAGE CONTAINER WITH REAL PHOTOGRAPHIC PIECES */}
      <div className="relative z-20 max-w-6xl mx-auto h-[560px] sm:h-[620px] border-2 border-[#D4AF37]/45 rounded-md bg-[#FFFDF9]/85 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-[0_25px_60px_rgba(180,134,40,0.18)]">
        
        {/* Soft Golden Center Spotlight */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none" />

        {/* PIECE 1: FALLING 21K HAB AL HAIL BANGLES */}
        <div
          onClick={() => onSelectProduct(bangles)}
          className="absolute z-30 cursor-pointer group transition-all duration-1000 ease-out"
          style={{
            transform: `translate3d(0, ${bangleY}px, 0) scale(${hasEntered ? 1 : 0.8})`,
            top: '38%',
            left: '42%'
          }}
          title={bangles.name}
        >
          <div className="relative p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-md shadow-xl group-hover:scale-110 transition-transform">
            <img
              src={bangles.image}
              alt={bangles.name}
              referrerPolicy="no-referrer"
              className="w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-sm"
            />
            <div className="mt-2 text-center">
              <span className="block text-[11px] tracking-wider uppercase text-[#24170D] font-bold">
                {isAr ? bangles.nameAr : bangles.name}
              </span>
              <span className="text-xs text-[#8C6418] font-bold font-mono">
                {formatCurrencyPrice(bangles.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* PIECE 2: SULTANA BRIDAL MIRTASHA */}
        <div
          onClick={() => onSelectProduct(mirtasha)}
          className="absolute z-20 cursor-pointer group transition-all duration-1000 ease-out"
          style={{
            transform: `translate3d(${braceletX}px, 0, 0)`,
            top: '18%',
            left: '8%'
          }}
          title={mirtasha.name}
        >
          <div className="relative p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-md shadow-xl group-hover:scale-110 transition-transform">
            <img
              src={mirtasha.image}
              alt={mirtasha.name}
              referrerPolicy="no-referrer"
              className="w-32 h-36 sm:w-40 sm:h-44 object-cover rounded-sm"
            />
            <div className="mt-2 text-center">
              <span className="block text-[11px] tracking-wider uppercase text-[#24170D] font-bold truncate max-w-[140px]">
                {isAr ? mirtasha.nameAr : mirtasha.name}
              </span>
              <span className="text-xs text-[#8C6418] font-bold font-mono">
                {formatCurrencyPrice(mirtasha.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* PIECE 3: TRADITIONAL BRIDAL HIZAM BELT */}
        <div
          onClick={() => onSelectProduct(hizam)}
          className="absolute z-25 cursor-pointer group"
          style={{
            top: '46%',
            right: '10%'
          }}
          title={hizam.name}
        >
          <div className="relative p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-md shadow-xl group-hover:scale-110 transition-transform animate-float-slow">
            <img
              src={hizam.image}
              alt={hizam.name}
              referrerPolicy="no-referrer"
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-sm"
            />
            <div className="mt-2 text-center">
              <span className="block text-[11px] tracking-wider uppercase text-[#24170D] font-bold truncate max-w-[140px]">
                {isAr ? hizam.nameAr : hizam.name}
              </span>
              <span className="text-xs text-[#8C6418] font-bold font-mono">
                {formatCurrencyPrice(hizam.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* PIECE 4: JOMOOR CHANDELIER EARRINGS */}
        <div
          onClick={() => onSelectProduct(jomoor)}
          className="absolute z-20 cursor-pointer group"
          style={{
            top: '12%',
            right: '28%'
          }}
          title={jomoor.name}
        >
          <div className="relative p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-md shadow-xl group-hover:scale-110 transition-transform">
            <img
              src={jomoor.image}
              alt={jomoor.name}
              referrerPolicy="no-referrer"
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-sm"
            />
            <div className="mt-2 text-center">
              <span className="block text-[11px] tracking-wider uppercase text-[#24170D] font-bold truncate max-w-[140px]">
                {isAr ? jomoor.nameAr : jomoor.name}
              </span>
              <span className="text-xs text-[#8C6418] font-bold font-mono">
                {formatCurrencyPrice(jomoor.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* PIECE 5: BASRA TABLAH CHOKER */}
        <div
          onClick={() => onSelectProduct(tablah)}
          className="absolute z-15 cursor-pointer group transition-all duration-1000 ease-out"
          style={{
            transform: `translate3d(0, ${necklaceY}px, 0)`,
            top: '8%',
            left: '32%'
          }}
          title={tablah.name}
        >
          <div className="relative p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-md shadow-xl group-hover:scale-110 transition-transform">
            <img
              src={tablah.image}
              alt={tablah.name}
              referrerPolicy="no-referrer"
              className="w-32 h-36 sm:w-40 sm:h-44 object-cover rounded-sm"
            />
            <div className="mt-2 text-center">
              <span className="block text-[11px] tracking-wider uppercase text-[#24170D] font-bold truncate max-w-[140px]">
                {isAr ? tablah.nameAr : tablah.name}
              </span>
              <span className="text-xs text-[#8C6418] font-bold font-mono">
                {formatCurrencyPrice(tablah.priceAED, currency, isAr)}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Bottom Bar */}
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#5C4533] border-t border-[#D4AF37]/35 pt-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#B48628]" />
            <span className="font-medium">{isAr ? 'انقر على أي طقم للمعاينة التفصيلية وحجز الموعد' : 'Click any creation to view authentic high-jewelry dossier'}</span>
          </div>
          <span className="text-[11px] text-[#8C6418] font-black uppercase">
            {isAr ? 'ذهب عيار ٢١ مضمون' : '21K ASSAYED GOLD'}
          </span>
        </div>

      </div>

    </section>
  );
};
