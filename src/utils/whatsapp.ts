import { CartItem, CurrencyCode, Language } from '../types';
import { formatCurrencyPrice } from '../data/products';

export const OFFICIAL_WHATSAPP_NUMBER = '923366551688';
export const DISPLAY_WHATSAPP_NUMBER = '+92 336 6551688';

export interface OrderDispatchData {
  clientName: string;
  clientPhone: string;
  clientCity: string;
  clientAddress: string;
  paymentChoice: 'wire' | 'courier-cod' | 'card';
  notes?: string;
  items: CartItem[];
  currency: CurrencyCode;
  lang: Language;
}

export interface ConsultationData {
  name: string;
  phone: string;
  salon: string;
  date: string;
  time: string;
  guests: string;
  interest: string;
  lang: Language;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateOrderData = (data: Partial<OrderDispatchData>, isAr: boolean): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.clientName || data.clientName.trim().length < 2) {
    errors.clientName = isAr
      ? 'يرجى إدخال الاسم الكريم بالكامل'
      : 'Please enter your full client name';
  }

  const phoneClean = (data.clientPhone || '').replace(/\D/g, '');
  if (!data.clientPhone || phoneClean.length < 7) {
    errors.clientPhone = isAr
      ? 'يرجى إدخال رقم هاتف / واتساب صالح للتواصل'
      : 'Please provide a valid contact / WhatsApp mobile number';
  }

  if (!data.clientCity || data.clientCity.trim().length < 2) {
    errors.clientCity = isAr
      ? 'يرجى تحديد مدينة التسليم'
      : 'Please select destination city';
  }

  if (!data.clientAddress || data.clientAddress.trim().length < 5) {
    errors.clientAddress = isAr
      ? 'يرجى إدخال العنوان التفصيلي للتسليم (الفيلا/القصر والشارع)'
      : 'Please enter complete delivery address (Villa/Palace/Suite & street)';
  }

  if (!data.items || data.items.length === 0) {
    errors.items = isAr
      ? 'الحقيبة فارغة، يرجى إضافة قطعة ذهبية'
      : 'Bag is empty, please add a jewelry piece';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateConsultationData = (data: Partial<ConsultationData>, isAr: boolean): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = isAr
      ? 'يرجى إدخال الاسم الكريم'
      : 'Please enter your full name';
  }

  const phoneClean = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || phoneClean.length < 7) {
    errors.phone = isAr
      ? 'يرجى إدخال رقم هاتف / واتساب للتواصل'
      : 'Please enter a valid mobile / WhatsApp number';
  }

  if (!data.salon || data.salon.trim().length < 2) {
    errors.salon = isAr
      ? 'يرجى اختيار صالون الدار'
      : 'Please select a private salon';
  }

  if (!data.date || data.date.trim().length < 4) {
    errors.date = isAr
      ? 'يرجى اختيار تاريخ الموعد'
      : 'Please select appointment date';
  }

  if (!data.interest || data.interest.trim().length < 2) {
    errors.interest = isAr
      ? 'يرجى تحديد المجموعة أو القطعة المرغوبة'
      : 'Please mention the collection or piece of interest';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const generateOrderWhatsAppMessage = (data: OrderDispatchData): { message: string; orderRef: string } => {
  const orderRef = `ND-${Math.floor(100000 + Math.random() * 900000)}`;
  const isAr = data.lang === 'ar';
  
  const paymentLabels: Record<string, { en: string; ar: string }> = {
    wire: { en: 'Sovereign Bank Wire', ar: 'تحويل مصرفي معتمد' },
    'courier-cod': { en: 'Cash/Cheque on Diplomatic Handover', ar: 'السداد عند التسليم الدبلوماسي' },
    card: { en: 'Private Black Card', ar: 'بطاقة مصرفية خاصة' }
  };

  const totalAED = data.items.reduce((sum, item) => sum + item.product.priceAED * item.quantity, 0);
  const formattedTotal = formatCurrencyPrice(totalAED, data.currency, isAr);

  let itemsSummary = '';
  data.items.forEach((item, index) => {
    const pkgLabel = item.packaging === 'royal-mahogany' 
      ? (isAr ? 'خشب الماهوجني المنقوش' : 'Carved Mahogany Coffer')
      : item.packaging === 'velvet-travel'
      ? (isAr ? 'الحقيبة الحريرية الملكية' : 'Silk Travel Pouch')
      : (isAr ? 'صندوق المخمل الملكي الفاخر' : 'Royal Velvet Coffer');

    const itemPrice = formatCurrencyPrice(item.product.priceAED * item.quantity, data.currency, isAr);
    itemsSummary += `${index + 1}. *${isAr ? item.product.nameAr : item.product.name}*\n` +
      `   • ${isAr ? 'العيار:' : 'Purity:'} ${isAr ? item.product.goldPurityAr : item.product.goldPurity}\n` +
      `   • ${isAr ? 'الكمية:' : 'Qty:'} ${item.quantity}\n` +
      `   • ${isAr ? 'الصندوق:' : 'Presentation:'} ${pkgLabel}\n` +
      `   • ${isAr ? 'القيمة:' : 'Subtotal:'} ${itemPrice}\n\n`;
  });

  const message = isAr
    ? `👑 *دار نور دبي للمجوهرات الراقية* 👑\n` +
      `*طلب اقتناء وتسليم مجوهرات ملكية*\n` +
      `----------------------------------------\n` +
      `*رقم الطلب:* #${orderRef}\n` +
      `*الاسم الكريم:* ${data.clientName}\n` +
      `*رقم التواصل:* ${data.clientPhone}\n` +
      `*مدينة التسليم:* ${data.clientCity}\n` +
      `*العنوان التفصيلي:* ${data.clientAddress}\n` +
      `*طريقة السداد:* ${paymentLabels[data.paymentChoice]?.ar || data.paymentChoice}\n` +
      (data.notes ? `*ملاحظات خاصة:* ${data.notes}\n` : '') +
      `----------------------------------------\n` +
      `*المقتنيات المطلوبة:*\n${itemsSummary}` +
      `----------------------------------------\n` +
      `*إجمالي القيمة المعتمدة:* ${formattedTotal}\n` +
      `*بروتوكول النقل:* شحن دبلوماسي مؤمن ومسلح بالكامل (مجاني)\n\n` +
      `يرجى تأكيد جدول التجهيز والتسليم وإرفاق شهادات التوثيق الرسمية.`
    : `👑 *NOOR DUBAI HAUTE JOAILLERIE* 👑\n` +
      `*ACQUISITION ORDER & DISPATCH DISPATCH*\n` +
      `----------------------------------------\n` +
      `*Order Ref:* #${orderRef}\n` +
      `*Client Name:* ${data.clientName}\n` +
      `*Client Contact:* ${data.clientPhone}\n` +
      `*Delivery City:* ${data.clientCity}\n` +
      `*Handover Address:* ${data.clientAddress}\n` +
      `*Payment Preference:* ${paymentLabels[data.paymentChoice]?.en || data.paymentChoice}\n` +
      (data.notes ? `*VIP Instructions:* ${data.notes}\n` : '') +
      `----------------------------------------\n` +
      `*Masterpieces Ordered:*\n${itemsSummary}` +
      `----------------------------------------\n` +
      `*Total Portfolio Value:* ${formattedTotal}\n` +
      `*Transit Method:* Insured Diplomatic Courier Handover\n\n` +
      `Kindly confirm order dispatch schedule, authenticity seal, and handover protocol.`;

  return { message, orderRef };
};

export const generateConsultationWhatsAppMessage = (data: ConsultationData): { message: string; bookingRef: string } => {
  const bookingRef = `PV-${Math.floor(100000 + Math.random() * 900000)}`;
  const isAr = data.lang === 'ar';

  const message = isAr
    ? `👑 *دار نور دبي للمجوهرات الراقية* 👑\n` +
      `*طلب حجز موعد استشارة ومعاينة خاصة*\n` +
      `----------------------------------------\n` +
      `*رقم الحجز:* #${bookingRef}\n` +
      `*الاسم الكريم:* ${data.name}\n` +
      `*رقم التواصل:* ${data.phone}\n` +
      `*الصالون المختار:* ${data.salon}\n` +
      `*تاريخ الجلسة:* ${data.date}\n` +
      `*الوقت:* ${data.time}\n` +
      `*عدد الضيوف:* ${data.guests}\n` +
      `*المجموعة / الاهتمام:* ${data.interest}\n` +
      `----------------------------------------\n` +
      `يرجى تأكيد حجز الجناح الخاص وتجهيز خبير المجوهرات والضيافة الملكية.`
    : `👑 *NOOR DUBAI HAUTE JOAILLERIE* 👑\n` +
      `*PRIVATE SALON VIEWING & CONSULTATION REQUEST*\n` +
      `----------------------------------------\n` +
      `*Booking Ref:* #${bookingRef}\n` +
      `*Client Name:* ${data.name}\n` +
      `*Client Contact:* ${data.phone}\n` +
      `*Preferred Salon:* ${data.salon}\n` +
      `*Date:* ${data.date}\n` +
      `*Time:* ${data.time}\n` +
      `*Private Guests:* ${data.guests}\n` +
      `*Curated Interest:* ${data.interest}\n` +
      `----------------------------------------\n` +
      `Kindly reserve the private viewing salon and assign senior gemologist protocol.`;

  return { message, bookingRef };
};

export interface SupportInquiryData {
  category: 'orders' | 'consultation' | 'custom' | 'complaints' | 'general';
  name?: string;
  phone?: string;
  orderNumber?: string;
  messageText: string;
  lang: Language;
}

export const generateSupportWhatsAppMessage = (data: SupportInquiryData): string => {
  const isAr = data.lang === 'ar';
  const categoryLabelsEn: Record<SupportInquiryData['category'], string> = {
    orders: 'Order Tracking & Dispatch Query',
    consultation: 'Private Salon Viewing Request',
    custom: 'Bespoke Jewelry / Custom Heirloom',
    complaints: 'Client Care & Inquiries / Complaints',
    general: 'VIP Concierge Assistance'
  };

  const categoryLabelsAr: Record<SupportInquiryData['category'], string> = {
    orders: 'استفسار عن طلب وتوصيل المقتنيات',
    consultation: 'حجز جلسة معاينة وصالون خاص',
    custom: 'تصميم قطعة مجوهرات خاصة وتراثية',
    complaints: 'العناية بالعملاء والاستفسارات / الملاحظات',
    general: 'المساعدة العامة من المساعد الملكي'
  };

  const categoryLabel = isAr ? categoryLabelsAr[data.category] : categoryLabelsEn[data.category];

  let msg = isAr
    ? `👑 *دار نور دبي للمجوهرات الراقية* 👑\n` +
      `*خدمة كبار الشخصيات والدعم الفوري*\n` +
      `----------------------------------------\n` +
      `*نوع الاستفسار:* ${categoryLabel}\n`
    : `👑 *NOOR DUBAI HAUTE JOAILLERIE* 👑\n` +
      `*VIP CLIENT CONCIERGE & CHAT SUPPORT*\n` +
      `----------------------------------------\n` +
      `*Category:* ${categoryLabel}\n`;

  if (data.name && data.name.trim()) {
    msg += isAr ? `*الاسم الكريم:* ${data.name.trim()}\n` : `*Client Name:* ${data.name.trim()}\n`;
  }

  if (data.phone && data.phone.trim()) {
    msg += isAr ? `*رقم التواصل:* ${data.phone.trim()}\n` : `*Contact:* ${data.phone.trim()}\n`;
  }

  if (data.orderNumber && data.orderNumber.trim()) {
    msg += isAr ? `*رقم الطلب:* #${data.orderNumber.trim()}\n` : `*Order Ref:* #${data.orderNumber.trim()}\n`;
  }

  msg += `----------------------------------------\n`;
  msg += isAr ? `*تفاصيل الرسالة:*\n${data.messageText.trim()}\n` : `*Message Details:*\n${data.messageText.trim()}\n`;
  msg += `----------------------------------------\n`;
  msg += isAr ? `يرجى التكرم بالرد عبر المساعد المباشر لدار نور دبي.` : `Kindly assist with this VIP inquiry.`;

  return msg;
};

export const openWhatsApp = (message: string): boolean => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encoded}`;
  
  try {
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
    return true;
  } catch (err) {
    window.location.href = url;
    return true;
  }
};

