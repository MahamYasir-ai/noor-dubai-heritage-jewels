import React from 'react';
import { X, Bookmark, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { CurrencyCode, Language, Product } from '../types';
import { CURRENCY_RATES, formatCurrencyPrice } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemove: (id: string) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  lang: Language;
  currency: CurrencyCode;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemove,
  onSelectProduct,
  onAddToCart,
  lang,
  currency
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const formatPrice = (priceAED: number) => {
    return formatCurrencyPrice(priceAED, currency, isAr);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md h-full bg-[#FAF4EB] border-l-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(180,134,40,0.3)] flex flex-col justify-between p-6 overflow-y-auto text-[#24170D]">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/35">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#8C6418] fill-[#8C6418]" />
              <h2 className="font-serif-luxury text-xl text-[#24170D] font-bold">
                {isAr ? 'القطع المحفوظة في خزانتك' : 'SAVED VAULT CREATIONS'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5C4533] hover:text-[#B48628] transition-colors rounded-full hover:bg-[#F3E5D2] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {savedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#8C6418]">
                <Bookmark className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-sm font-serif-luxury text-[#5C4533]">
                {isAr ? 'لم تحفظ أي قطع بعد.' : 'No creations saved to your vault yet.'}
              </p>
              <p className="text-xs text-[#8C7662]">
                {isAr ? 'انقر على رمز الإشارة المرجعية بجانب أي طقم لحفظه هنا.' : 'Click the bookmark icon on any piece to save it for consultation.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8D9C5] max-h-[65vh] overflow-y-auto my-4 pr-1">
              {savedProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-sm border border-[#D4AF37]/50 bg-[#FFFDF9]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-sm text-[#24170D] font-bold truncate">
                      {isAr ? p.nameAr : p.name}
                    </h4>
                    <span className="text-[10px] text-[#8C6418] font-bold block uppercase">
                      {p.goldPurity}
                    </span>
                    <span className="text-xs font-mono text-[#8C6418] font-bold block mt-1">
                      {formatPrice(p.priceAED)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onAddToCart(p);
                        onClose();
                      }}
                      className="p-2 border border-[#D4AF37]/50 rounded-sm text-[#8C6418] hover:bg-[#FAF1E3] cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="p-2 border border-[#D4AF37]/50 rounded-sm text-[#8C6418] hover:bg-[#FAF1E3] cursor-pointer"
                      title="View Piece"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(p.id)}
                      className="p-2 text-[#8C7662] hover:text-red-700 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D4AF37]/35">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#FAF1E3] border border-[#D4AF37]/50 text-[#8C6418] text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#F3E5D2] transition-colors cursor-pointer"
          >
            {isAr ? 'العودة للاستكشاف' : 'Return to Collections'}
          </button>
        </div>

      </div>
    </div>
  );
};
