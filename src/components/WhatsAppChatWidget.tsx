import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ShieldCheck, ChevronRight, Package, Calendar, Crown, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { playCelestialChord, playChime } from '../utils/sound';
import {
  DISPLAY_WHATSAPP_NUMBER,
  OFFICIAL_WHATSAPP_NUMBER,
  generateSupportWhatsAppMessage,
  openWhatsApp,
  SupportInquiryData
} from '../utils/whatsapp';

interface WhatsAppChatWidgetProps {
  lang: Language;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<SupportInquiryData['category']>('orders');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const categories: {
    id: SupportInquiryData['category'];
    labelEn: string;
    labelAr: string;
    icon: React.ReactNode;
    defaultPromptEn: string;
    defaultPromptAr: string;
  }[] = [
    {
      id: 'orders',
      labelEn: 'Orders & Dispatch',
      labelAr: 'الطلبات والتوصيل',
      icon: <Package className="w-3.5 h-3.5" />,
      defaultPromptEn: 'Assalamu Alaikum, I would like to inquire regarding my order status and courier dispatch.',
      defaultPromptAr: 'السلام عليكم، أود الاستفسار عن حالة طلبي وموعد التسليم بالبريد الدبلوماسي.'
    },
    {
      id: 'consultation',
      labelEn: 'Private Salon',
      labelAr: 'حجز صالون خاص',
      icon: <Calendar className="w-3.5 h-3.5" />,
      defaultPromptEn: 'Assalamu Alaikum, I wish to inquire about booking a private viewing consultation at the salon.',
      defaultPromptAr: 'السلام عليكم، أود الاستفسار عن حجز موعد خاص في صالون كبار الشخصيات.'
    },
    {
      id: 'custom',
      labelEn: 'Bespoke Jewelry',
      labelAr: 'تصميم خاص وهدية',
      icon: <Crown className="w-3.5 h-3.5" />,
      defaultPromptEn: 'Assalamu Alaikum, I am interested in creating a custom heirloom / bespoke jewelry piece.',
      defaultPromptAr: 'السلام عليكم، أرغب في استشارة الصائغ لتصميم قطعة مجوهرات تراثية خاصة.'
    },
    {
      id: 'complaints',
      labelEn: 'Care & Complaints',
      labelAr: 'ملاحظات وشكاوى',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      defaultPromptEn: 'Assalamu Alaikum, I have an inquiry / feedback regarding client care and need assistance.',
      defaultPromptAr: 'السلام عليكم، لدي ملاحظة أو استفسار بخصوص خدمة العملاء وأحتاج إلى المساعدة.'
    }
  ];

  const handleSelectCategory = (catId: SupportInquiryData['category']) => {
    setCategory(catId);
    setError(null);
    const selected = categories.find((c) => c.id === catId);
    if (selected && (!messageText || categories.some((c) => c.defaultPromptEn === messageText || c.defaultPromptAr === messageText))) {
      setMessageText(isAr ? selected.defaultPromptAr : selected.defaultPromptEn);
    }
  };

  const handleOpenWidget = () => {
    playChime(650);
    setIsOpen(true);
    if (!messageText) {
      const selected = categories.find((c) => c.id === category);
      if (selected) {
        setMessageText(isAr ? selected.defaultPromptAr : selected.defaultPromptEn);
      }
    }
  };

  const handleCloseWidget = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText || messageText.trim().length < 5) {
      setError(
        isAr
          ? 'يرجى كتابة تفاصيل استفسارك أو طلبك قبل المتابعة عبر الواتساب'
          : 'Please enter your inquiry or order details before connecting to WhatsApp'
      );
      return;
    }

    setError(null);
    playCelestialChord();

    const formattedMessage = generateSupportWhatsAppMessage({
      category,
      name: clientName,
      phone: clientPhone,
      orderNumber,
      messageText,
      lang
    });

    openWhatsApp(formattedMessage);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={handleOpenWidget}
          className={`relative group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#0F5A38] via-[#128C7E] to-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(18,140,126,0.35)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.45)] border-2 border-[#D4AF37]/70 transition-all duration-300 hover:scale-105 cursor-pointer ${
            isOpen ? 'hidden' : 'flex'
          }`}
          title={isAr ? 'واتساب خدمة العملاء والطلبات' : 'VIP WhatsApp Support & Orders'}
          aria-label="Open WhatsApp Chat Support"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-white"></span>
          </span>

          <MessageCircle className="w-5 h-5 fill-white text-[#128C7E]" />
          
          <div className="text-left">
            <span className="block text-[11px] font-bold tracking-wider leading-tight">
              {isAr ? 'مساعد واتساب الفوري' : 'WhatsApp Concierge'}
            </span>
            <span className="block text-[9px] text-[#E0F8EC] font-mono leading-tight">
              {DISPLAY_WHATSAPP_NUMBER}
            </span>
          </div>
        </button>
      </div>

      {/* CHAT SUPPORT DRAWER / CARD */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[410px] max-h-[85vh] bg-[#FFFDF9] border-2 border-[#D4AF37] rounded-xl shadow-[0_20px_60px_rgba(36,23,13,0.35)] overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300 text-[#24170D]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E1208] via-[#2F1F12] to-[#1E1208] text-[#FAF4EB] p-4 border-b border-[#D4AF37]/50 relative">
            <button
              onClick={handleCloseWidget}
              className="absolute top-3.5 right-3.5 text-[#C5A882] hover:text-white transition-colors p-1"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#128C7E] to-[#25D366] p-0.5 flex items-center justify-center border border-[#D4AF37]">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#1E1208]"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-luxury font-bold text-sm tracking-wide text-[#F3DE9C]">
                    {isAr ? 'خدمة عملاء نور دبي' : 'Noor Dubai Concierge'}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <p className="text-[10px] text-[#D8C7B5] flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>{isAr ? 'متصل الآن · خط الدعم الرسمي' : 'Online · Official WhatsApp Line'}</span>
                </p>
                <p className="text-[10px] text-[#D4AF37] font-mono mt-0.5 font-bold">
                  {DISPLAY_WHATSAPP_NUMBER}
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(85vh-160px)]">
            
            {/* Introductory Bubble */}
            <div className="bg-[#FAF4EB] border border-[#D4AF37]/35 rounded-lg p-3 text-xs text-[#423122] leading-relaxed font-serif-luxury">
              <span className="font-bold text-[#8C6418] block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B48628]" />
                {isAr ? 'أهلاً بكم في دار نور دبي' : 'Welcome to Noor Dubai Royal Concierge'}
              </span>
              {isAr
                ? 'يسعدنا خدمتكم مباشرة في تتبع الطلبات، حجز المعاينات الخاصة، تفصيل المجوهرات، أو معالجة أي استفسار وشكوى بأعلى معايير السرية.'
                : 'Direct assistance for order tracking, private salon bookings, custom bespoke heirlooms, and client care inquiries.'}
            </div>

            {/* Category Selection Tabs */}
            <div>
              <label className="block text-[10px] font-bold text-[#8C6418] uppercase tracking-wider mb-1.5">
                {isAr ? 'اختر مجال الاستفسار' : 'Select Inquiry Topic'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCategory(c.id)}
                    className={`flex items-center gap-1.5 p-2 rounded text-[11px] font-bold tracking-wide transition-all border cursor-pointer ${
                      category === c.id
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5942B] text-[#1E1208] border-[#B48628] shadow-sm'
                        : 'bg-[#F9F4EC] text-[#543E2D] border-[#D4AF37]/30 hover:border-[#B48628]'
                    }`}
                  >
                    {c.icon}
                    <span className="truncate">{isAr ? c.labelAr : c.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Form Fields */}
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#6B533E] uppercase tracking-wider mb-1">
                    {isAr ? 'الاسم الكريم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isAr ? 'مثال: نورة الشامسي' : 'e.g. Noura Al Shamsi'}
                    className="w-full text-xs p-2 bg-[#FFFDF9] border border-[#D4AF37]/40 rounded focus:outline-none focus:border-[#B48628]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#6B533E] uppercase tracking-wider mb-1">
                    {category === 'orders' ? (isAr ? 'رقم الطلب (اختياري)' : 'Order Ref (Optional)') : (isAr ? 'رقم الهاتف' : 'Contact Phone')}
                  </label>
                  <input
                    type="text"
                    value={category === 'orders' ? orderNumber : clientPhone}
                    onChange={(e) =>
                      category === 'orders' ? setOrderNumber(e.target.value) : setClientPhone(e.target.value)
                    }
                    placeholder={category === 'orders' ? '#ND-123456' : '+971 50 ...'}
                    className="w-full text-xs p-2 bg-[#FFFDF9] border border-[#D4AF37]/40 rounded focus:outline-none focus:border-[#B48628]"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-[10px] font-bold text-[#6B533E] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{isAr ? 'تفاصيل الرسالة أو الشكوى / الاستفسار *' : 'Message Details / Query *'}</span>
                  <span className="text-[9px] text-[#A0721E]">{isAr ? 'مطلوب' : 'Required'}</span>
                </label>
                <textarea
                  rows={3}
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={
                    isAr
                      ? 'اكتب تفاصيل طلبك أو استفسارك هنا...'
                      : 'Type your question, order details, or feedback here...'
                  }
                  className="w-full text-xs p-2.5 bg-[#FFFDF9] border border-[#D4AF37]/50 rounded focus:outline-none focus:border-[#B48628] leading-relaxed resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-300 rounded text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit to WhatsApp Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'فتح المحادثة عبر واتساب' : 'Open WhatsApp Conversation'}</span>
              </button>
            </form>

            {/* Direct Fallback Button */}
            <div className="pt-2 border-t border-[#EEDFCD] flex items-center justify-between text-[11px] text-[#8C7662]">
              <span>{isAr ? 'الخط المباشر:' : 'Direct Helpline:'}</span>
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-[#128C7E] hover:underline flex items-center gap-1"
              >
                <span>{DISPLAY_WHATSAPP_NUMBER}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
