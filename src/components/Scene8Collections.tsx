import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, Bookmark, ShoppingBag, Search } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { formatCurrencyPrice } from '../data/products';
import { playChime } from '../utils/sound';

interface Scene8Props {
  lang: Language;
  currency: CurrencyCode;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: string[];
}

export const Scene8Collections: React.FC<Scene8Props> = ({
  lang,
  currency,
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelEn: 'All Creations', labelAr: 'كافة القطع' },
    { id: 'high-jewelry', labelEn: 'Royal Bridal Suites & Belts', labelAr: 'أطقم العرائس والأحزمة الملكية' },
    { id: 'necklaces', labelEn: 'Mirtasha & Chokers', labelAr: 'عقود المرتعشة والطبلة' },
    { id: 'bangles', labelEn: 'Hab Al Hail Bangles', labelAr: 'أساور حب الهيل والمعاصم' },
    { id: 'earrings', labelEn: 'Jomoor Chandelier Drops', labelAr: 'أقراط الجمور المتدلية' },
    { id: 'rings', labelEn: 'Marami & Solitaires', labelAr: 'خواتم المرامي والياقوت' },
    { id: 'bracelets', labelEn: 'Hand Chains & Keff', labelAr: 'كفوف اليد والأساور' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchMetal =
        selectedMetal === 'all' ||
        (selectedMetal === 'yellow' && p.metalColor === 'yellow') ||
        (selectedMetal === 'white' && p.metalColor === 'white') ||
        (selectedMetal === 'rose' && p.metalColor === 'rose');
      
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.nameAr.includes(query) ||
        p.gemstone.toLowerCase().includes(query) ||
        p.goldPurity.toLowerCase().includes(query);

      return matchCategory && matchMetal && matchQuery;
    });
  }, [products, selectedCategory, selectedMetal, searchQuery]);

  return (
    <section 
      id="collections" 
      className="relative min-h-screen w-full bg-gradient-to-b from-[#FAF4EB] via-[#F6EDE0] to-[#EFE1D0] py-24 border-b border-[#D4AF37]/35 text-[#24170D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#7A5410] mb-3 bg-[#FAF1E3] px-5 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
            <span className="font-bold">{isAr ? 'روائع دار نور دبي الحصرية' : 'MAISON REPERTOIRE · NOOR DUBAI'}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#22160C] tracking-wide mb-3">
            {isAr ? 'المجموعات الملكية وأطقم العرائس' : 'THE HIGH JEWELRY COLLECTIONS'}
          </h2>

          <p className="text-sm text-[#5C4533] font-medium max-w-xl mx-auto tracking-wider">
            {isAr
              ? 'أكثر من ١٥ طقماً وتحفة تراثية مصوغة من الذهب الخالص عيار ٢١ قيراطاً، ولآلئ البصرة البحرية.'
              : 'Over 15 traditional sovereign creations forged in solid 21K gold, Basra natural pearls, and certified gemstones.'}
          </p>
        </div>

        {/* CONTROLS: Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-[#D4AF37]/30">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#FAF1E3] p-1.5 border border-[#D4AF37]/45 rounded-md">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  playChime(640);
                }}
                className={`px-4 py-2.5 text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer font-bold ${
                  selectedCategory === c.id
                    ? 'bg-[#B48628] text-white shadow-sm'
                    : 'text-[#5C4533] hover:text-[#B48628]'
                }`}
              >
                {isAr ? c.labelAr : c.labelEn}
              </button>
            ))}
          </div>

          {/* Search & Metal Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C6418]" />
              <input
                type="text"
                placeholder={isAr ? 'بحث عن طقم ذهب...' : 'Search creations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm pl-9 pr-3 py-2 text-xs text-[#24170D] placeholder-[#8F7D6B] focus:outline-none focus:border-[#B48628]"
              />
            </div>

            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#5C4533] font-bold focus:outline-none focus:border-[#B48628] cursor-pointer"
            >
              <option value="all">{isAr ? 'كافة الأعيرة' : 'All Karats'}</option>
              <option value="yellow">{isAr ? 'ذهب أصفر ٢١ قيراط' : '21K Yellow Gold'}</option>
              <option value="white">{isAr ? 'ذهب أبيض ١٨ قيراط' : '18K White Gold'}</option>
              <option value="rose">{isAr ? 'ذهب وردي ١٨ قيراط' : '18K Rose Gold'}</option>
            </select>
          </div>

        </div>

        {/* EDITORIAL PRODUCT GRID WITH MOVING SHINE ON HOVER */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-[#5C4533] text-sm">
            {isAr ? 'لم يتم العثور على قطع تطابق البحث المحدد.' : 'No creations matching your current selection.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProducts.map((p) => {
              const isWishlisted = wishlistIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col bg-[#FFFDF9] border-2 border-[#D4AF37]/40 rounded-md overflow-hidden transition-all duration-500 hover:border-[#B48628] hover:shadow-[0_20px_45px_rgba(180,134,40,0.25)]"
                >
                  
                  {/* Card Image Area with Shimmering Light Beam */}
                  <div 
                    onClick={() => onSelectProduct(p)}
                    className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F3E5D4] overflow-hidden cursor-pointer flex items-center justify-center p-4"
                  >
                    {/* Image with zoom on hover */}
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full h-full object-cover rounded-sm transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                    />

                    {/* Light Sweep Shimmer Line across jewelry on hover */}
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-20">
                      {p.isVaultExclusive && (
                        <span className="text-[9px] tracking-widest text-[#1E1208] font-black uppercase bg-[#F8E2A6] border border-[#D4AF37]/60 px-2.5 py-1 rounded-sm shadow-sm">
                          {isAr ? 'حصري للخزانة' : 'VAULT EXCLUSIVE'}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p);
                        playChime(720);
                      }}
                      className="absolute top-3 right-3 z-20 p-2 bg-[#FFFDF9]/90 backdrop-blur-md rounded-sm border border-[#D4AF37]/40 hover:border-[#B48628] transition-colors shadow-sm"
                      title={isWishlisted ? 'Remove from Vault' : 'Save to Vault'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isWishlisted ? 'text-[#B48628] fill-[#B48628]' : 'text-[#5C4533]'}`} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between bg-[#FFFDF9]">
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-[#8C6418] uppercase tracking-wider mb-2 font-bold">
                        <span>{isAr ? p.goldPurityAr : p.goldPurity}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.caratTotal}</span>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onSelectProduct(p)}
                        className="font-serif-luxury text-xl sm:text-2xl text-[#24170D] group-hover:text-[#8C6418] transition-colors cursor-pointer mb-2 line-clamp-1 font-bold"
                      >
                        {isAr ? p.nameAr : p.name}
                      </h3>

                      {/* Snippet */}
                      <p className="text-xs text-[#5C4533] line-clamp-2 leading-relaxed mb-4">
                        {isAr ? p.descriptionAr : p.description}
                      </p>
                    </div>

                    {/* Price & Primary View Action with live currency conversion */}
                    <div className="pt-4 border-t border-[#E8D9C5] flex items-center justify-between">
                      <div className="font-serif-luxury text-xl sm:text-2xl text-[#8C6418] font-black tabular-nums">
                        {formatCurrencyPrice(p.priceAED, currency, isAr)}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToCart(p)}
                          className="p-2.5 border border-[#D4AF37]/50 text-[#8C6418] hover:bg-[#FAF1E3] transition-colors rounded-sm cursor-pointer"
                          title={isAr ? 'إضافة إلى المقتنيات' : 'Add to Collection Bag'}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="px-4 py-2 text-xs tracking-wider uppercase text-white bg-[#B48628] hover:bg-[#926B1E] font-bold transition-colors rounded-sm cursor-pointer shadow-sm"
                        >
                          {isAr ? 'معاينة الطقم' : 'VIEW SET'}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
