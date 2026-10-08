import React, { useState } from 'react';
import { X, ZoomIn, RotateCcw, Sparkles, ShoppingBag, Calendar, Sun, Award } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';
import { royalVoice } from '../utils/royalVoice';

interface ModalProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
  currency: CurrencyCode;
  onAddToCart: (p: Product, packaging?: 'signature' | 'royal-mahogany' | 'velvet-travel') => void;
  onOpenBooking: () => void;
}

export const ProductDetailModal: React.FC<ModalProps> = ({
  product,
  onClose,
  lang,
  currency,
  onAddToCart,
  onOpenBooking
}) => {
  if (!product) return null;

  const isAr = lang === 'ar';
  const [rotation, setRotation] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightAngle, setLightAngle] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [selectedPackaging, setSelectedPackaging] = useState<'signature' | 'royal-mahogany' | 'velvet-travel'>('signature');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setRotation((prev) => prev + delta * 0.6);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Outer Chamber Frame in Light Peach Alabaster */}
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-[#FAF4EB] border-2 border-[#D4AF37]/60 rounded-md shadow-[0_30px_90px_rgba(180,134,40,0.3)] text-[#24170D]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 text-[#5C4533] hover:text-[#B48628] bg-[#FFFDF9]/90 rounded-full border border-[#D4AF37]/50 shadow-sm transition-colors cursor-pointer"
          aria-label="Close Inspection Chamber"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* LEFT: 360° INTERACTIVE INSPECTION VIEWPORT */}
          <div 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[400px] lg:min-h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F1E3D1] p-6 overflow-hidden cursor-grab active:cursor-grabbing select-none border-b lg:border-b-0 lg:border-r border-[#D4AF37]/40"
          >
            {/* Dynamic Directional Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{
                background: `radial-gradient(circle 380px at ${50 + Math.cos((lightAngle * Math.PI) / 180) * 35}% ${50 + Math.sin((lightAngle * Math.PI) / 180) * 35}%, rgba(254, 240, 138, 0.45), transparent 70%)`
              }}
            />

            {/* Pedestal Base */}
            <div className="absolute bottom-8 w-80 h-14 rounded-[50%] bg-[#B48628]/15 border border-[#D4AF37]/40 shadow-[0_20px_40px_rgba(180,134,40,0.2)]" />

            {/* Real Photographic Jewel in 3D Perspective */}
            <div
              className="relative z-20 transition-transform duration-75 flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${rotation}deg) scale(${zoomLevel})`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-[360px] w-auto object-contain drop-shadow-[0_25px_50px_rgba(180,134,40,0.4)] pointer-events-none rounded-md"
              />
            </div>

            {/* Interactive Viewport Controls Toolbar */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2.5 border border-[#D4AF37]/50 rounded-md text-xs shadow-md">
              
              <div className="flex items-center gap-2 text-[#5C4533]">
                <button
                  type="button"
                  onClick={() => { setRotation(0); setZoomLevel(1); }}
                  className="hover:text-[#B48628] cursor-pointer"
                  title="Reset Orientation"
                >
                  <RotateCcw className="w-4 h-4 text-[#B48628]" />
                </button>
                <span className="text-[11px] tracking-wider uppercase font-mono font-bold">
                  ANGLE: {Math.round(rotation % 360)}°
                </span>
              </div>

              {/* Zoom Slider */}
              <div className="flex items-center gap-2 text-[#5C4533] font-bold">
                <ZoomIn className="w-4 h-4 text-[#B48628]" />
                <input
                  type="range"
                  min="0.8"
                  max="1.8"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="w-24 accent-[#B48628] cursor-pointer"
                />
              </div>

              {/* Light Angle Slider */}
              <div className="flex items-center gap-2 text-[#5C4533] font-bold">
                <Sun className="w-4 h-4 text-[#B48628]" />
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(parseInt(e.target.value))}
                  className="w-24 accent-[#B48628] cursor-pointer"
                />
              </div>

            </div>

            {/* Drag hint */}
            <div className="absolute top-4 left-4 text-[10px] tracking-widest text-[#7A5410] font-bold uppercase bg-[#FFFDF9]/90 px-3 py-1 border border-[#D4AF37]/50 rounded-full pointer-events-none shadow-sm">
              {isAr ? 'اسحب للتدوير ٣٦٠° · تحكم بالضوء' : 'DRAG TO ROTATE 360° · CONTROL SUNBEAM'}
            </div>
          </div>

          {/* RIGHT: CONTIGUOUS PURCHASE MODULE WITH DYNAMIC LIVE PRICE */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF4EB]">
            
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#7A5410] uppercase mb-1 font-bold">
                <span>{isAr ? product.categoryLabelAr : product.categoryLabelEn}</span>
                <span className="font-mono text-[10px] text-[#5C4533]">21K SOVEREIGN GOLD</span>
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#24170D] font-bold mb-2">
                {isAr ? product.nameAr : product.name}
              </h2>

              {/* Value Price formatted with selected currency & Royal Voice button */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="font-serif-luxury text-3xl sm:text-4xl text-[#8C6418] font-black tabular-nums">
                  {formatCurrencyPrice(product.priceAED, currency, isAr)}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playChime(660);
                    royalVoice.speak({
                      textEn: `${product.name}. ${product.description}. Crafted in ${product.goldPurity}. Certified by ${product.hallmark}.`,
                      textAr: `${product.nameAr}. ${product.descriptionAr}. مصوغ من ${product.goldPurityAr}. معتمد وموثق في دبي.`,
                      isAr
                    });
                  }}
                  className="px-3 py-1.5 text-[11px] font-bold text-[#8C6418] bg-[#FAF1E3] hover:bg-[#F3E5D2] border border-[#D4AF37]/50 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Hear Royal Narration"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
                  <span>{isAr ? 'سرد صوتي ملكي' : 'Royal Voice'}</span>
                </button>
              </div>

              {/* Editorial Description */}
              <p className="text-xs text-[#5C4533] leading-relaxed mb-4">
                {isAr ? product.descriptionAr : product.description}
              </p>

              {/* High Jewelry Pillars */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#E8D9C5] text-center text-[10px] tracking-wider uppercase text-[#5C4533]">
                <div className="border-r border-[#E8D9C5] pr-2">
                  <span className="block text-[#8C6418] font-bold">21K GOLD</span>
                  <span>{isAr ? 'ذهب عيار ٢١' : 'Sovereign 875'}</span>
                </div>
                <div className="border-r border-[#E8D9C5] px-2">
                  <span className="block text-[#8C6418] font-bold">NATURAL GEMS</span>
                  <span>{isAr ? 'أحجار معتمدة' : 'GIA Certified'}</span>
                </div>
                <div className="pl-2">
                  <span className="block text-[#8C6418] font-bold">DUBAI ATELIER</span>
                  <span>{isAr ? 'صياغة يدوية' : 'Hand-Finished'}</span>
                </div>
              </div>

              {/* Packaging Selector */}
              <div className="mt-6">
                <span className="text-[11px] tracking-wider uppercase text-[#5C4533] block mb-2 font-bold">
                  {isAr ? 'صندوق التقديم الفاخر:' : 'Luxury Presentation Coffer:'}
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'signature', labelEn: 'Royal Velvet Coffer', labelAr: 'المخمل الملكي' },
                    { id: 'royal-mahogany', labelEn: 'Carved Mahogany', labelAr: 'خشب الماهوجني' },
                    { id: 'velvet-travel', labelEn: 'Silk Travel Pouch', labelAr: 'الحقيبة الحريرية' }
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackaging(pkg.id as any)}
                      className={`p-2.5 text-[11px] border rounded-sm transition-all text-center cursor-pointer font-bold ${
                        selectedPackaging === pkg.id
                          ? 'border-[#B48628] bg-[#B48628] text-white shadow-sm'
                          : 'border-[#E8D9C5] text-[#5C4533] hover:text-[#B48628] bg-[#FFFDF9]'
                      }`}
                    >
                      {isAr ? pkg.labelAr : pkg.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3 pt-4 border-t border-[#E8D9C5]">
              
              {/* Add to Collection Bag */}
              <button
                onClick={() => {
                  onAddToCart(product, selectedPackaging);
                  playChime(880);
                  onClose();
                }}
                className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1B0F07] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#1B0F07]" />
                <span>{isAr ? 'إضافة إلى حقيبة المقتنيات' : 'ADD TO COLLECTION'}</span>
              </button>

              {/* Book Private Salon Viewing */}
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-xs tracking-[0.2em] uppercase font-bold text-[#8C6418] border border-[#B48628]/60 hover:bg-[#F3E5D2] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#FFFDF9]"
              >
                <Calendar className="w-4 h-4 text-[#B48628]" />
                <span>{isAr ? 'حجز موعد معاينة خاصة' : 'BOOK PRIVATE VIEWING'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
