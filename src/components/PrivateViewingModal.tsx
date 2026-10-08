import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Sparkles, Clock, Users, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { playCelestialChord } from '../utils/sound';

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
  const [salon, setSalon] = useState('dubai-difc');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('16:00');
  const [guests, setGuests] = useState('2');
  const [interest, setInterest] = useState('High Jewelry & Vault');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    playCelestialChord();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF4EB] border-2 border-[#D4AF37]/50 rounded-md p-6 sm:p-8 shadow-[0_25px_70px_rgba(180,134,40,0.3)] text-[#24170D]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5C4533] hover:text-[#B48628] p-1.5 transition-colors rounded-full hover:bg-[#F3E5D2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF1E3] border-2 border-[#B48628] flex items-center justify-center mx-auto text-[#8C6418]">
              <CheckCircle2 className="w-8 h-8 text-[#B48628]" />
            </div>

            <h3 className="font-serif-luxury text-2xl text-[#24170D] font-bold">
              {isAr ? 'تم تأكيد طلب الموعد الخاص' : 'Salon Appointment Confirmed'}
            </h3>

            <p className="text-xs text-[#5C4533] leading-relaxed max-w-sm mx-auto">
              {isAr
                ? `شكراً لك ${name}. تم حجز الجناح الخاص في صالون دار نور دبي (${salon.toUpperCase()}) بتاريخ ${date} في تمام الساعة ${time}. سيتصل بك مدير المراسم لتأكيد الضيافة.`
                : `Thank you, ${name}. The private suite at Noor Dubai (${salon.toUpperCase()}) has been reserved on ${date} at ${time}. Our VIP protocol officer will contact you with security access and hospitality preferences.`}
            </p>

            <div className="p-4 bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-sm text-xs text-left rtl:text-right space-y-1 text-[#5C4533] shadow-sm">
              <div className="flex justify-between font-bold text-[#8C6418]">
                <span>{isAr ? 'الدار:' : 'Maison:'}</span>
                <span>{isAr ? 'دار نور دبي للمجوهرات الراقية' : 'NOOR DUBAI Haute Joaillerie'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'الصالون:' : 'Salon:'}</span>
                <span className="font-bold">{salon.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'الموعد:' : 'Date & Time:'}</span>
                <span className="font-bold">{date} · {time}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'عدد الضيوف:' : 'Guests:'}</span>
                <span>{guests} {isAr ? 'أشخاص' : 'Private Guests'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-8 py-3 bg-[#B48628] hover:bg-[#926B1E] text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer shadow-sm"
            >
              {isAr ? 'إغلاق والعودة' : 'Close and Return'}
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase text-[#7A5410] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
                <span>{isAr ? 'جلسة خاصة ومغلقة' : 'PRIVATE SALON CONSULTATION'}</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#24170D] font-bold">
                {isAr ? 'حجز موعد في صالونات دار نور دبي' : 'RESERVE A PRIVATE SALON'}
              </h3>
              <p className="text-xs text-[#5C4533] mt-1">
                {isAr
                  ? 'جلسة مغلقة لعرض أطقم العرائس والقطع الملكية في سرية وأمان تام.'
                  : 'Exclusive viewing session with personal gemologist and champagne hospitality.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'الاسم الكريم:' : 'Client Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'سعادة / سمو...' : 'Full Name'}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'رقم الهاتف:' : 'Private Mobile / WhatsApp:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 000 0000"
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'اختيار صالون الدار:' : 'Select Private Salon:'}
                </label>
                <select
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                >
                  <option value="dubai-difc">Dubai — DIFC Gate Village Private Penthouse</option>
                  <option value="abu-dhabi">Abu Dhabi — Al Maryah Island VIP Suite</option>
                  <option value="riyadh">Riyadh — Kingdom Tower Presidential Salon</option>
                  <option value="doha">Doha — Lusail Marina Haute Vault</option>
                  <option value="kuwait">Kuwait — Al Hamra Tower Royal Salon</option>
                  <option value="residence">Private Residence / Palace (Armed Courier Transit)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                    {isAr ? 'التاريخ المفضل:' : 'Preferred Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                  />
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
                    <option value="11:00">11:00 AM (Morning)</option>
                    <option value="14:00">02:00 PM (Afternoon)</option>
                    <option value="16:00">04:00 PM (Late Afternoon)</option>
                    <option value="19:00">07:00 PM (Evening Soirée)</option>
                    <option value="21:00">09:00 PM (Nocturnal Salon)</option>
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
                    <option value="1">1 Person (Private)</option>
                    <option value="2">2 Persons</option>
                    <option value="3-4">3 to 4 Family Members</option>
                    <option value="5+">Bridal Entourage (5+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5C4533] font-bold mb-1">
                  {isAr ? 'المجموعة محل الاهتمام:' : 'Collection of Interest:'}
                </label>
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="e.g. 21K Mirtasha Bib, Hab Al Hail Bangles, Bespoke Bridal Parure"
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-sm px-3 py-2 text-xs text-[#24170D] focus:outline-none focus:border-[#B48628]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase text-[#1E1208] bg-gradient-to-r from-[#D4AF37] via-[#F8E2A6] to-[#C5942B] hover:brightness-105 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#1E1208]" />
                  <span>{isAr ? 'تأكيد حجز الجناح الخاص' : 'CONFIRM PRIVATE APPOINTMENT'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
