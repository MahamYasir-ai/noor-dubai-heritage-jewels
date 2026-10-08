import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem, CurrencyCode, Language } from '../types';
import { CURRENCY_RATES, formatCurrencyPrice } from '../data/products';
import { playCelestialChord, playChime } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  lang: Language;
  currency: CurrencyCode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  currency
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('Dubai');
  const [paymentChoice, setPaymentChoice] = useState<'wire' | 'courier-cod' | 'card'>('wire');

  const totalAED = items.reduce((sum, item) => sum + item.product.priceAED * item.quantity, 0);

  const formatPrice = (priceAED: number) => {
    return formatCurrencyPrice(priceAED, currency, isAr);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    playCelestialChord();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md h-full bg-[#FAF4EB] border-l-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(180,134,40,0.3)] flex flex-col justify-between p-6 overflow-y-auto text-[#24170D]">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/35">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C6418]" />
              <h2 className="font-serif-luxury text-xl text-[#24170D] font-bold">
                {isAr ? 'حقيبة المقتنيات الملكية' : 'ACQUISITIONS BAG'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5C4533] hover:text-[#B48628] transition-colors rounded-full hover:bg-[#F3E5D2] cursor-pointer"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items List or Empty State */}
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#8C6418]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-sm font-serif-luxury text-[#5C4533]">
                {isAr ? 'حقيبة مقتنياتك فارغة حالياً.' : 'Your acquisition portfolio is presently empty.'}
              </p>
              <p className="text-xs text-[#8C7662]">
                {isAr ? 'استكشف أطقم الذهب التراثية عيار ٢١ وأضفها إلى حقيبتك.' : 'Explore sovereign 21K creations to commission an acquisition.'}
              </p>
            </div>
          ) : orderConfirmed ? (
            /* Order Success State */
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border-2 border-[#B48628] flex items-center justify-center mx-auto text-[#8C6418]">
                <CheckCircle2 className="w-8 h-8 text-[#B48628]" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#24170D] font-bold">
                {isAr ? 'تم استلام طلب الاقتناء الملكي' : 'Acquisition Commission Confirmed'}
              </h3>
              <p className="text-xs text-[#5C4533] leading-relaxed">
                {isAr
                  ? `شكراً لك ${clientName}. تم تأكيد طلبك لتسليمه في ${clientCity}. سيتواصل معك مدير البروتوكول الخاص خلال ساعة لترتيب التسليم المصحوب بحراسة رسمية.`
                  : `Thank you, ${clientName}. Your acquisition portfolio has been registered for VIP white-glove handover in ${clientCity}. Our Head of Private Clients will contact you shortly.`}
              </p>
              <div className="p-4 bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm text-left rtl:text-right text-xs space-y-1.5 shadow-sm">
                <div className="flex justify-between font-bold text-[#8C6418]">
                  <span>{isAr ? 'المجموع المعتمد:' : 'Total Value:'}</span>
                  <span className="font-mono">{formatPrice(totalAED)}</span>
                </div>
                <div className="flex justify-between text-[#5C4533]">
                  <span>{isAr ? 'طريقة الاستلام:' : 'Transit Method:'}</span>
                  <span>{isAr ? 'حراسة مسلحة مرخصة' : 'Insured Diplomatic Courier'}</span>
                </div>
                <div className="flex justify-between text-[#5C4533]">
                  <span>{isAr ? 'الدار:' : 'House:'}</span>
                  <span className="font-bold">{isAr ? 'دار نور دبي' : 'Noor Dubai Haute Joaillerie'}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="mt-6 w-full py-3.5 bg-[#B48628] hover:bg-[#926B1E] text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer shadow-sm"
              >
                {isAr ? 'إغلاق ومتابعة الاستكشاف' : 'Close and Return'}
              </button>
            </div>
          ) : !isCheckingOut ? (
            /* Items List */
            <div className="divide-y divide-[#E8D9C5] max-h-[50vh] overflow-y-auto my-4 pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-sm border border-[#D4AF37]/50 bg-[#FFFDF9]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-sm text-[#24170D] font-bold truncate">
                      {isAr ? item.product.nameAr : item.product.name}
                    </h4>
                    <span className="text-[10px] text-[#8C6418] font-bold block uppercase">
                      {item.product.goldPurity}
                    </span>
                    <span className="text-xs font-mono text-[#8C6418] font-bold block mt-1">
                      {formatPrice(item.product.priceAED)}
                    </span>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-[#5C4533] hover:text-[#B48628] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-[#24170D] px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-[#5C4533] hover:text-[#B48628] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8C7662] hover:text-red-700 text-xs p-1 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 my-4 max-h-[50vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'الاسم الكريم:' : 'Client Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'سعادة / سمو...' : 'Sheikha / Excellency...'}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'رقم الهاتف الخاص (للتواصل السري):' : 'Private Mobile / WhatsApp:'}
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+971 50 000 0000"
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'مدينة التسليم:' : 'Destination City:'}
                </label>
                <select
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                >
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="Abu Dhabi">Abu Dhabi, UAE</option>
                  <option value="Riyadh">Riyadh, Saudi Arabia</option>
                  <option value="Jeddah">Jeddah, Saudi Arabia</option>
                  <option value="Doha">Doha, Qatar</option>
                  <option value="Kuwait City">Kuwait City, Kuwait</option>
                  <option value="Manama">Manama, Bahrain</option>
                  <option value="Muscat">Muscat, Oman</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'طريقة السداد المعتمدة:' : 'Payment Preference:'}
                </label>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  {[
                    { id: 'wire', labelEn: 'Bank Wire', labelAr: 'تحويل بنكي' },
                    { id: 'courier-cod', labelEn: 'On Handover', labelAr: 'عند التسليم' },
                    { id: 'card', labelEn: 'Black Card', labelAr: 'بطاقة مصرفية' }
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPaymentChoice(p.id as any)}
                      className={`p-2 border rounded-sm transition-all font-bold cursor-pointer ${
                        paymentChoice === p.id
                          ? 'border-[#B48628] bg-[#B48628] text-white shadow-sm'
                          : 'border-[#E8D9C5] bg-[#FFFDF9] text-[#5C4533]'
                      }`}
                    >
                      {isAr ? p.labelAr : p.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all cursor-pointer"
              >
                {isAr ? 'تأكيد أمر الاقتناء والتسليم' : 'CONFIRM ACQUISITION ORDER'}
              </button>

              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-full py-2 text-xs text-[#8C6418] hover:underline font-bold"
              >
                {isAr ? 'العودة إلى الحقيبة' : 'Back to Cart'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {items.length > 0 && !orderConfirmed && !isCheckingOut && (
          <div className="pt-4 border-t border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#5C4533]">
              <span>{isAr ? 'رسوم التأمين والنقل الدبلوماسي:' : 'Insured Sovereign Transit:'}</span>
              <span className="text-[#8C6418] font-bold">{isAr ? 'مجاني ومؤمن بالكامل' : 'Complimentary'}</span>
            </div>

            <div className="flex items-center justify-between font-serif-luxury text-xl sm:text-2xl text-[#24170D] font-bold">
              <span>{isAr ? 'المجموع الإجمالي:' : 'Total Portfolio:'}</span>
              <span className="text-[#8C6418] font-black">{formatPrice(totalAED)}</span>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#1E1208]" />
              <span>{isAr ? 'المتابعة لتأكيد الاقتناء' : 'PROCEED TO ACQUISITION'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
