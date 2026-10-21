import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, MessageCircle, AlertCircle, MapPin, Send } from 'lucide-react';
import { CartItem, CurrencyCode, Language } from '../types';
import { CURRENCY_RATES, formatCurrencyPrice } from '../data/products';
import { playCelestialChord, playChime } from '../utils/sound';
import { 
  validateOrderData, 
  generateOrderWhatsAppMessage, 
  openWhatsApp, 
  DISPLAY_WHATSAPP_NUMBER 
} from '../utils/whatsapp';

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
  const [clientAddress, setClientAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'wire' | 'courier-cod' | 'card'>('wire');
  
  // Strict Validation and WhatsApp State
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [generatedOrderRef, setGeneratedOrderRef] = useState<string>('');
  const [activeWhatsAppMsg, setActiveWhatsAppMsg] = useState<string>('');

  const totalAED = items.reduce((sum, item) => sum + item.product.priceAED * item.quantity, 0);

  const formatPrice = (priceAED: number) => {
    return formatCurrencyPrice(priceAED, currency, isAr);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: do not open whatsapp or confirm anything until user gives all necessary details
    const validation = validateOrderData({
      clientName,
      clientPhone,
      clientCity,
      clientAddress,
      paymentChoice,
      items,
      currency,
      lang
    }, isAr);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      playChime(320);
      return;
    }

    // Clear validation errors
    setValidationErrors({});

    // Generate formatted WhatsApp message & Order reference
    const { message, orderRef } = generateOrderWhatsAppMessage({
      clientName,
      clientPhone,
      clientCity,
      clientAddress,
      paymentChoice,
      notes: orderNotes,
      items,
      currency,
      lang
    });

    setGeneratedOrderRef(orderRef);
    setActiveWhatsAppMsg(message);
    setOrderConfirmed(true);
    playCelestialChord();

    // Safely dispatch via WhatsApp
    openWhatsApp(message);
  };

  const handleManualReopenWhatsApp = () => {
    if (activeWhatsAppMsg) {
      openWhatsApp(activeWhatsAppMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md h-full bg-[#FAF4EB] border-l-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(180,134,40,0.3)] flex flex-col justify-between p-5 sm:p-6 overflow-y-auto text-[#24170D]">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/35">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C6418]" />
              <h2 className="font-serif-luxury text-lg sm:text-xl text-[#24170D] font-bold">
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
            /* Order Success State with WhatsApp confirmation */
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border-2 border-[#B48628] flex items-center justify-center mx-auto text-[#8C6418]">
                <CheckCircle2 className="w-8 h-8 text-[#B48628]" />
              </div>
              
              <div className="space-y-1">
                <span className="inline-block text-[10px] tracking-[0.25em] font-mono text-[#8C6418] font-bold uppercase bg-[#F5EADB] px-3 py-1 rounded-sm border border-[#D4AF37]/40">
                  REF #{generatedOrderRef}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#24170D] font-bold pt-1">
                  {isAr ? 'تم تأكيد طلب التجهيز والإرسال' : 'Acquisition Manifest Dispatched'}
                </h3>
              </div>

              <p className="text-xs text-[#5C4533] leading-relaxed max-w-sm mx-auto">
                {isAr
                  ? `شكراً لك ${clientName}. تم إرسال تفاصيل طلبك وعنوان التسليم (${clientCity} - ${clientAddress}) مباشرة إلى خط بروتوكول الواتساب الخاص (${DISPLAY_WHATSAPP_NUMBER}).`
                  : `Thank you, ${clientName}. Your acquisition portfolio and delivery manifest for ${clientCity} (${clientAddress}) have been prepared for WhatsApp dispatch (${DISPLAY_WHATSAPP_NUMBER}).`}
              </p>

              {/* Direct WhatsApp Action Button */}
              <button
                type="button"
                onClick={handleManualReopenWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>{isAr ? `فتح المحادثة على الواتساب (${DISPLAY_WHATSAPP_NUMBER})` : `OPEN IN WHATSAPP (${DISPLAY_WHATSAPP_NUMBER})`}</span>
              </button>

              <div className="p-4 bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm text-left rtl:text-right text-xs space-y-1.5 shadow-sm">
                <div className="flex justify-between font-bold text-[#8C6418]">
                  <span>{isAr ? 'المجموع المعتمد:' : 'Total Value:'}</span>
                  <span className="font-mono">{formatPrice(totalAED)}</span>
                </div>
                <div className="flex justify-between text-[#5C4533]">
                  <span>{isAr ? 'جهة التسليم:' : 'Destination:'}</span>
                  <span className="font-semibold">{clientCity}</span>
                </div>
                <div className="flex justify-between text-[#5C4533]">
                  <span>{isAr ? 'العنوان:' : 'Address:'}</span>
                  <span className="truncate max-w-[200px]">{clientAddress}</span>
                </div>
                <div className="flex justify-between text-[#5C4533]">
                  <span>{isAr ? 'طريقة الاستلام:' : 'Transit Method:'}</span>
                  <span>{isAr ? 'حراسة مسلحة مرخصة ومؤمنة' : 'Insured Diplomatic Courier'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="mt-4 w-full py-3.5 bg-[#B48628] hover:bg-[#926B1E] text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer shadow-sm"
              >
                {isAr ? 'إغلاق وإتمام المعاملة' : 'Finish & Close'}
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
                      {isAr ? item.product.goldPurityAr : item.product.goldPurity}
                    </span>
                    <span className="text-[10px] text-[#5C4533] block">
                      {item.packaging === 'royal-mahogany'
                        ? (isAr ? 'خشب الماهوجني' : 'Carved Mahogany')
                        : item.packaging === 'velvet-travel'
                        ? (isAr ? 'حقيبة حريرية' : 'Silk Pouch')
                        : (isAr ? 'مخمل ملكي' : 'Royal Velvet')}
                    </span>
                    <div className="text-xs font-serif-luxury text-[#8C6418] font-bold mt-1">
                      {formatPrice(item.product.priceAED * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-[#D4AF37]/50 rounded-sm bg-[#FFFDF9]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-[#F3E5D2] text-[#5C4533] cursor-pointer"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#24170D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-[#F3E5D2] text-[#5C4533] cursor-pointer"
                        title="Increase"
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
            /* Checkout Form with Strict Details & WhatsApp Dispatch */
            <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 my-3 max-h-[55vh] overflow-y-auto pr-1">
              
              {/* WhatsApp Notice Bar */}
              <div className="bg-[#FAF1E3] border border-[#D4AF37]/50 rounded-sm p-2.5 flex items-start gap-2 text-[11px] text-[#5C4533]">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? `سيتم تحويل بيانات الطلب المكتملة إلى خط الواتساب الرسمي المعتمد (${DISPLAY_WHATSAPP_NUMBER}) لتجهيز الشحن الفوري.`
                    : `Order manifest will be dispatched to official WhatsApp (${DISPLAY_WHATSAPP_NUMBER}) once all details are verified.`}
                </span>
              </div>

              {/* Error Summary Banner if missing details */}
              {Object.keys(validationErrors).length > 0 && (
                <div className="bg-red-50 border border-red-300 rounded-sm p-2.5 flex items-start gap-2 text-xs text-red-800 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {isAr ? 'يرجى إكمال الحقول الإلزامية:' : 'Please provide all necessary details:'}
                    </span>
                    <ul className="list-disc list-inside text-[11px] mt-1 space-y-0.5">
                      {Object.values(validationErrors).map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Client Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'الاسم الكريم بالكامل * :' : 'Client Full Name * :'}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (validationErrors.clientName) {
                      setValidationErrors(prev => ({ ...prev, clientName: '' }));
                    }
                  }}
                  placeholder={isAr ? 'سعادة / سمو...' : 'Sheikha / Excellency...'}
                  className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                    validationErrors.clientName 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                  }`}
                />
                {validationErrors.clientName && (
                  <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                    {validationErrors.clientName}
                  </span>
                )}
              </div>

              {/* Mobile / WhatsApp */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'رقم الهاتف / الواتساب للتواصل * :' : 'Private Mobile / WhatsApp * :'}
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (validationErrors.clientPhone) {
                      setValidationErrors(prev => ({ ...prev, clientPhone: '' }));
                    }
                  }}
                  placeholder="+971 50 000 0000"
                  className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                    validationErrors.clientPhone 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                  }`}
                />
                {validationErrors.clientPhone && (
                  <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                    {validationErrors.clientPhone}
                  </span>
                )}
              </div>

              {/* Destination City */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'مدينة التسليم * :' : 'Destination City * :'}
                </label>
                <select
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                >
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="Abu Dhabi">Abu Dhabi, UAE</option>
                  <option value="Sharjah">Sharjah, UAE</option>
                  <option value="Riyadh">Riyadh, Saudi Arabia</option>
                  <option value="Jeddah">Jeddah, Saudi Arabia</option>
                  <option value="Doha">Doha, Qatar</option>
                  <option value="Kuwait City">Kuwait City, Kuwait</option>
                  <option value="Manama">Manama, Bahrain</option>
                  <option value="Muscat">Muscat, Oman</option>
                </select>
              </div>

              {/* Specific Street / Palace / Villa Address */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'العنوان التفصيلي للتسليم (الفيلا/القصر/الشارع) * :' : 'Handover Address (Palace/Villa/Suite & Street) * :'}
                </label>
                <input
                  type="text"
                  required
                  value={clientAddress}
                  onChange={(e) => {
                    setClientAddress(e.target.value);
                    if (validationErrors.clientAddress) {
                      setValidationErrors(prev => ({ ...prev, clientAddress: '' }));
                    }
                  }}
                  placeholder={isAr ? 'مثال: فيلا رقم ١٢، شارع شاطئ جميرا، دبي' : 'e.g. Villa 12, Jumeirah Beach Road, Dubai'}
                  className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                    validationErrors.clientAddress 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                  }`}
                />
                {validationErrors.clientAddress && (
                  <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                    {validationErrors.clientAddress}
                  </span>
                )}
              </div>

              {/* Payment Choice */}
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

              {/* Optional Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'ملاحظات خاصة (اختياري):' : 'Special Protocol Instructions (Optional):'}
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: تسليم مسائي مصحوب بوثيقة الأصالة' : 'e.g., Evening diplomatic arrival with certificate'}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-1.5 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                />
              </div>

              {/* Submit & Dispatch via WhatsApp */}
              <button
                type="submit"
                className="w-full mt-3 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#1E1208]" />
                <span>{isAr ? 'إرسال الطلب والتسليم عبر الواتساب' : 'CONFIRM & DISPATCH VIA WHATSAPP'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-full py-2 text-xs text-[#8C6418] hover:underline font-bold cursor-pointer"
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

            <div className="flex items-center justify-between text-sm font-bold text-[#24170D]">
              <span>{isAr ? 'إجمالي المقتنيات:' : 'Estimated Portfolio Value:'}</span>
              <span className="font-serif-luxury text-xl text-[#8C6418] font-black">
                {formatPrice(totalAED)}
              </span>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#1E1208]" />
              <span>{isAr ? 'متابعة بيانات التسليم والطلب' : 'PROCEED TO DISPATCH'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
