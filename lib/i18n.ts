export type Language = 'en' | 'ur' | 'hi' | 'tl' | 'bn' | 'ar';

export const languages: { code: Language; name: string; nativeName: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];

export const translations: Record<Language, {
  from: string;
  to: string;
  send: string;
  receive: string;
  aiPrediction: string;
  aiPredictionTitle: string;
  sponsored: string;
  selectCurrency: string;
  enterAmount: string;
  rate: string;
  rateUpdated: string;
  rateUnavailable: string;
}> = {
  en: {
    from: 'From',
    to: 'To',
    send: 'You Send',
    receive: 'They Receive',
    aiPrediction: 'Live exchange rates are refreshed from ExchangeRate-API with provider timestamps.',
    aiPredictionTitle: 'Live Rate Snapshot',
    sponsored: 'Sponsored',
    selectCurrency: 'Select Currency',
    enterAmount: 'Enter amount',
    rate: 'Rate',
    rateUpdated: 'Updated',
    rateUnavailable: 'Live rates are temporarily unavailable.',
  },
  ur: {
    from: 'سے',
    to: 'تک',
    send: 'آپ بھیجیں',
    receive: 'وہ وصول کریں',
    aiPrediction: 'لائیو ایکسچینج ریٹس فراہم کنندہ کے اوقات کے ساتھ ExchangeRate-API سے تازہ کیے جاتے ہیں۔',
    aiPredictionTitle: 'لائیو ریٹ اسنیپ شاٹ',
    sponsored: 'اشتہار',
    selectCurrency: 'کرنسی منتخب کریں',
    enterAmount: 'رقم درج کریں',
    rate: 'شرح',
    rateUpdated: 'اپ ڈیٹ',
    rateUnavailable: 'لائیو ریٹس عارضی طور پر دستیاب نہیں ہیں۔',
  },
  hi: {
    from: 'से',
    to: 'को',
    send: 'आप भेजें',
    receive: 'वे प्राप्त करें',
    aiPrediction: 'लाइव विनिमय दरें प्रदाता टाइमस्टैम्प के साथ ExchangeRate-API से ताज़ा की जाती हैं।',
    aiPredictionTitle: 'लाइव रेट स्नैपशॉट',
    sponsored: 'प्रायोजित',
    selectCurrency: 'मुद्रा चुनें',
    enterAmount: 'राशि दर्ज करें',
    rate: 'दर',
    rateUpdated: 'अपडेट किया गया',
    rateUnavailable: 'लाइव दरें अस्थायी रूप से उपलब्ध नहीं हैं।',
  },
  tl: {
    from: 'Mula sa',
    to: 'Patungo sa',
    send: 'Ipadala Mo',
    receive: 'Matatanggap Nila',
    aiPrediction: 'Ang live exchange rates ay nire-refresh mula sa ExchangeRate-API kasama ang provider timestamps.',
    aiPredictionTitle: 'Live Rate Snapshot',
    sponsored: 'Naka-sponsor',
    selectCurrency: 'Pumili ng Pera',
    enterAmount: 'Ilagay ang halaga',
    rate: 'Rate',
    rateUpdated: 'Na-update',
    rateUnavailable: 'Pansamantalang hindi available ang live rates.',
  },
  bn: {
    from: 'থেকে',
    to: 'তে',
    send: 'আপনি পাঠান',
    receive: 'তারা পাবেন',
    aiPrediction: 'লাইভ এক্সচেঞ্জ রেট প্রদানকারীর টাইমস্ট্যাম্পসহ ExchangeRate-API থেকে রিফ্রেশ করা হয়।',
    aiPredictionTitle: 'লাইভ রেট স্ন্যাপশট',
    sponsored: 'স্পনসরড',
    selectCurrency: 'মুদ্রা নির্বাচন করুন',
    enterAmount: 'পরিমাণ লিখুন',
    rate: 'রেট',
    rateUpdated: 'আপডেট হয়েছে',
    rateUnavailable: 'লাইভ রেট সাময়িকভাবে পাওয়া যাচ্ছে না।',
  },
  ar: {
    from: 'من',
    to: 'إلى',
    send: 'أنت ترسل',
    receive: 'يستلمون',
    aiPrediction: 'يتم تحديث أسعار الصرف المباشرة من ExchangeRate-API مع الطوابع الزمنية للمزود.',
    aiPredictionTitle: 'لقطة السعر المباشر',
    sponsored: 'إعلان',
    selectCurrency: 'اختر العملة',
    enterAmount: 'أدخل المبلغ',
    rate: 'السعر',
    rateUpdated: 'تم التحديث',
    rateUnavailable: 'الأسعار المباشرة غير متاحة مؤقتاً.',
  },
};
