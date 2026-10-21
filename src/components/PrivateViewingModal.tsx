import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Sparkles, Clock, Users, ShieldCheck, MessageCircle, AlertCircle, Send } from 'lucide-react';
import { Language } from '../types';
import { playCelestialChord, playChime } from '../utils/sound';
import { 
  validateConsultationData, 
  generateConsultationWhatsAppMessage, 
  openWhatsApp, 
  DISPLAY_WHATSAPP_NUMBER 
} from '../utils/whatsapp';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PrivateViewingModal: React.FC<ViewingModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [salon, setSalon] = useState('Dubai — DIFC Gate Village Penthouse');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-10-25');
  const [time, setTime] = useState('16:00');
  const [guests, setGuests] = useState('2 Persons');
  const [interest, setInterest] = useState('High Jewelry & Bridal Parures (21K)');
  
  // Validation and WhatsApp state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState<string>('');
  const [activeWhatsAppMsg, setActiveWhatsAppMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: do not open whatsapp or confirm anything until user gives all necessary details
    const validation = validateConsultationData({
      name,
      phone,
      salon,
      date,
      time,
      guests,
      interest,
      lang
    }, isAr);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      playChime(320);
      return;
    }

    // All necessary details present
    setValidationErrors({});

    const { message, bookingRef: ref } = generateConsultationWhatsAppMessage({
      name,
      phone,
      salon,
      date,
      time,
      guests,
      interest,
      lang
    });

    setBookingRef(ref);
    setActiveWhatsAppMsg(message);
    setSubmitted(true);
    playCelestialChord();

    // Open WhatsApp with complete structured consultation booking
    openWhatsApp(message);
  };

  const handleManualReopenWhatsApp = () => {
    if (activeWhatsAppMsg) {
      openWhatsApp(activeWhatsAppMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF4EB] border-2 border-[#D4AF37]/50 rounded-md p-5 sm:p-8 shadow-[0_25px_70px_rgba(180,134,40,0.3)] text-[#24170D]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5C4533] hover:text-[#B48628] p-1.5 transition-colors rounded-full hover:bg-[#F3E5D2] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border-2 border-[#B48628] flex items-center justify-center mx-auto text-[#8C6418]">
              <CheckCircle2 className="w-8 h-8 text-[#B48628]" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-[10px] tracking-[0.25em] font-mono text-[#8C6418] font-bold uppercase bg-[#F5EADB] px-3 py-1 rounded-sm border border-[#D4AF37]/40">
                BOOKING REF #{bookingRef}
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#24170D] font-bold pt-1">
                {isAr ? 'تم تأكيد طلب الموعد والاستشارة' : 'Salon Appointment Manifest Dispatched'}
              </h3>
            </div>

            <p className="text-xs text-[#5C4533] leading-relaxed max-w-sm mx-auto">
              {isAr
                ? `شكراً لك ${name}. تم إرسال تفاصيل حجزك في (${salon}) بتاريخ ${date} في تمام الساعة ${time} إلى خط الواتساب الرسمي المعتمد (${DISPLAY_WHATSAPP_NUMBER}).`
                : `Thank you, ${name}. Your appointment for ${salon} on ${date} at ${time} has been prepared and dispatched via official WhatsApp (${DISPLAY_WHATSAPP_NUMBER}).`}
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

            <div className="p-4 bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-sm text-xs text-left rtl:text-right space-y-1.5 text-[#5C4533] shadow-sm">
              <div className="flex justify-between font-bold text-[#8C6418]">
                <span>{isAr ? 'الدار:' : 'Maison:'}</span>
                <span>{isAr ? 'دار نور دبي للمجوهرات الراقية' : 'NOOR DUBAI Haute Joaillerie'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'الصالون:' : 'Salon:'}</span>
                <span className="font-bold text-[#24170D]">{salon}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'الموعد المحدد:' : 'Date & Time:'}</span>
                <span className="font-bold text-[#24170D]">{date} · {time}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'عدد الضيوف:' : 'Guests:'}</span>
                <span>{guests}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'الاهتمام:' : 'Collection:'}</span>
                <span className="truncate max-w-[200px]">{interest}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-8 py-3 bg-[#B48628] hover:bg-[#926B1E] text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer shadow-sm w-full"
            >
              {isAr ? 'إغلاق والعودة' : 'Close and Return'}
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase text-[#7A5410] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
                <span>{isAr ? 'جلسة خاصة ومغلقة' : 'PRIVATE SALON CONSULTATION'}</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#24170D] font-bold">
                {isAr ? 'حجز موعد في صالونات دار نور دبي' : 'RESERVE A PRIVATE SALON'}
              </h3>
              <p className="text-xs text-[#5C4533] mt-1">
                {isAr
                  ? `سيتم تحويل الموعد مباشرة إلى خط الواتساب الخاص بالدار (${DISPLAY_WHATSAPP_NUMBER}) لتجهيز البروتوكول.`
                  : `Dispatched directly to Maison WhatsApp protocol (${DISPLAY_WHATSAPP_NUMBER}) with exclusive hospitality.`}
              </p>
            </div>

            {/* Error Summary Banner */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="bg-red-50 border border-red-300 rounded-sm p-2.5 mb-4 flex items-start gap-2 text-xs text-red-800 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    {isAr ? 'يرجى إكمال الحقول الإلزامية قبل المتابعة:' : 'Please provide all necessary details:'}
                  </span>
                  <ul className="list-disc list-inside text-[11px] mt-1 space-y-0.5">
                    {Object.values(validationErrors).map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'الاسم الكريم بالكامل * :' : 'Client Full Name * :'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    placeholder={isAr ? 'سعادة / سمو...' : 'Full Name'}
                    className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                      validationErrors.name 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'رقم الهاتف / الواتساب للتواصل * :' : 'Private Mobile / WhatsApp * :'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (validationErrors.phone) {
                        setValidationErrors(prev => ({ ...prev, phone: '' }));
                      }
                    }}
                    placeholder="+971 50 000 0000"
                    className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                      validationErrors.phone 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                    }`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'اختيار صالون الدار * :' : 'Select Private Salon * :'}
                </label>
                <select
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                >
                  <option value="Dubai — DIFC Gate Village Penthouse">Dubai — DIFC Gate Village Private Penthouse</option>
                  <option value="Abu Dhabi — Al Maryah Island VIP Suite">Abu Dhabi — Al Maryah Island VIP Suite</option>
                  <option value="Riyadh — Kingdom Tower Presidential Salon">Riyadh — Kingdom Tower Presidential Salon</option>
                  <option value="Doha — Lusail Marina Haute Vault">Doha — Lusail Marina Haute Vault</option>
                  <option value="Kuwait — Al Hamra Tower Royal Salon">Kuwait — Al Hamra Tower Royal Salon</option>
                  <option value="Private Palace / Royal Residence Handover">Private Palace / Residence (Armed Diplomatic Transit)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'التاريخ المفضل * :' : 'Preferred Date * :'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (validationErrors.date) {
                        setValidationErrors(prev => ({ ...prev, date: '' }));
                      }
                    }}
                    className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                      validationErrors.date 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                    }`}
                  />
                  {validationErrors.date && (
                    <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                      {validationErrors.date}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'الوقت المفضل:' : 'Preferred Time:'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                  >
                    <option value="11:00 AM (Morning)">11:00 AM (Morning)</option>
                    <option value="02:00 PM (Afternoon)">02:00 PM (Afternoon)</option>
                    <option value="04:00 PM (Late Afternoon)">04:00 PM (Late Afternoon)</option>
                    <option value="07:00 PM (Evening Soirée)">07:00 PM (Evening Soirée)</option>
                    <option value="09:00 PM (Nocturnal Salon)">09:00 PM (Nocturnal Salon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'عدد الضيوف:' : 'Number of Guests:'}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                  >
                    <option value="1 Person (Private)">1 Person (Private)</option>
                    <option value="2 Persons">2 Persons</option>
                    <option value="3-4 Family Members">3 to 4 Family Members</option>
                    <option value="Bridal Entourage (5+)">Bridal Entourage (5+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'المجموعة أو القطعة محل الاهتمام * :' : 'Collection / Piece of Interest * :'}
                </label>
                <input
                  type="text"
                  required
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                    if (validationErrors.interest) {
                      setValidationErrors(prev => ({ ...prev, interest: '' }));
                    }
                  }}
                  placeholder="e.g. 21K Mirtasha Bib, Hab Al Hail Bangles, Bespoke Bridal Set"
                  className={`w-full bg-[#FFFDF9] border rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none ${
                    validationErrors.interest 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-[#D4AF37]/50 focus:border-[#B48628]'
                  }`}
                />
                {validationErrors.interest && (
                  <span className="text-[10px] text-red-600 font-medium block mt-0.5">
                    {validationErrors.interest}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#1E1208]" />
                  <span>{isAr ? 'إرسال حجز الموعد عبر الواتساب' : 'CONFIRM & BOOK VIA WHATSAPP'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
