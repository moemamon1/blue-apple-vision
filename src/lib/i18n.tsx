import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.phones": "Phones",
  "nav.accessories": "Accessories",
  "nav.everyday": "Everyday Essential",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.search": "Search",
  "nav.cart": "Cart",
  "nav.account": "Account",
  "nav.menu": "Menu",
  "nav.langToggle": "العربية",

  // Footer
  "footer.tagline": "Sudan's trusted source for genuine iPhones. Imported, verified, and delivered since 2021.",
  "footer.shop": "Shop",
  "footer.company": "Company",
  "footer.support": "Support",
  "footer.returns": "Returns",
  "footer.warranty": "Warranty",
  "footer.track": "Track Order",
  "footer.rights": "All rights reserved.",
  "footer.imported": "Imported to Sudan. Trusted since 2021.",

  // Home
  "home.eyebrow": "Sudan's Verified Apple Retailer",
  "home.title.a": "The New",
  "home.title.b": "Standard.",
  "home.p1": "Directly imported from verified international channels. Every iPhone includes a 1-year Blue Apple warranty and local technical support in Khartoum.",
  "home.p2": "Blue Apple was founded in 2021 as a phone brokerage. Today we operate as Sudan's premium destination for genuine Apple hardware and everyday tech.",
  "home.p3": "We don't just sell phones — we build trust.",
  "home.cta.shop": "Shop Inventory",
  "home.cta.service": "Service Center",
  "home.phones.eyebrow": "iPhones",
  "home.phones.title": "iPhones",
  "home.phones.highlight": "Series 13–17",
  "home.phones.desc": "Global specifications, fully unlocked for all Sudanese networks. Authorized 12-month protection included.",
  "home.phones.cta": "Browse iPhones",
  "home.acc.eyebrow": "Accessories",
  "home.acc.title": "Accessories",
  "home.acc.tag": "100% Genuine",
  "home.acc.desc": "Original charging kits, audio peripherals, and protection. No loose or OEM units — only factory-boxed stock.",
  "home.acc.cta": "Browse Accessories",
  "home.ess.eyebrow": "Everyday Essential",
  "home.ess.title": "Essentials",
  "home.ess.tag": "Workforce Tools",
  "home.ess.desc": "Laptops, tablets, audio and daily peripherals for professionals and students — verified for local use.",
  "home.ess.cta": "Browse Essentials",
  "home.trust.provenance.title": "Official Provenance",
  "home.trust.provenance.desc": "Directly sourced from official global distribution chains since 2021.",
  "home.trust.warranty.title": "Warranty Terms",
  "home.trust.warranty.desc": "Comprehensive 1-year coverage on all hardware, serviced locally in Khartoum.",
  "home.trust.bilingual.title": "Bilingual Support",
  "home.trust.bilingual.desc": "Dedicated technical assistance available in both English and Arabic.",
  "home.trust.contact.title": "Contact Details",
  "home.trust.contact.desc": "Visit in person or call for availability updates and specification verification.",

  // Phones page
  "phones.eyebrow": "Phones",
  "phones.title.a": "Genuine iPhones.",
  "phones.title.b": "Imported to Sudan.",
  "phones.desc": "Every device is inspected, verified, and delivered with a 1-year warranty.",
  "phones.error": "Error:",
  "phones.none": "No products found.",

  // Accessories page
  "acc.eyebrow": "Accessories",
  "acc.title": "Accessories.",
  "acc.desc": "Chargers, cases, cables, earbuds and more. Genuine everyday tech imported and delivered across Sudan.",

  // Everyday essentials page
  "ess.eyebrow": "Everyday Essential",
  "ess.title.a": "Everyday",
  "ess.title.b": "essentials.",
  "ess.desc": "The essentials that keep your day moving. Genuine everyday tech imported and delivered across Sudan.",

  // Shared list
  "list.loading": "Loading products...",
  "list.empty": "Nothing here yet.",
  "list.emptySub": "Check back soon or browse our phones.",

  // About
  "about.eyebrow": "Our story",
  "about.title.a": "From",
  "about.title.mid": "brokerage",
  "about.title.b": "to brand.",
  "about.p1": "Blue Apple started in 2021 under the name \"Ali Apple\" — a phone brokerage service connecting customers in Sudan with genuine iPhones sourced from abroad. With no warehouse and no physical store, we built trust entirely through social media, one satisfied customer at a time.",
  "about.p2": "As demand grew, we rebranded to Blue Apple — evolving into a premium digital destination for smartphones, with a strong focus on the Apple ecosystem. Instagram became our launchpad, helping us reach customers seeking authentic devices and a safe buying experience in Sudan.",
  "about.p3": "Today, Blue Apple is a trusted e-commerce platform for smartphones and everyday tech, offering delivery services to multiple countries. We import genuine iPhones, thoroughly inspect and verify each device's quality, and deliver it directly to your doorstep — from iPhone 13 Pro Max up to the latest iPhone 17 Pro Max.",
  "about.stat1": "Founded as Ali Apple",
  "about.stat2": "Delivered nationwide",
  "about.stat3": "Genuine Apple devices",
  "about.stat2.value": "Sudan",
  "about.stat3.value": "100%",

  // Contact
  "contact.eyebrow": "Contact",
  "contact.title.a": "Let's",
  "contact.title.b": "talk.",
  "contact.desc": "Have a question, feedback, or just want to say hi? We're here.",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Send message",

  // Cart
  "cart.title": "Your bag",
  "cart.item": "item",
  "cart.items": "items",
  "cart.empty": "Your bag is empty.",
  "cart.continue": "Continue shopping",
  "cart.summary": "Order summary",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Shipping",
  "cart.shipping.calc": "Calculated at checkout",
  "cart.total": "Total",
  "cart.checkout": "Checkout",
  "cart.secure": "Secure checkout powered by Shopify",
  "cart.added": "added to cart",

  // Checkout
  "checkout.back": "Back to bag",
  "checkout.title": "Checkout",
  "checkout.step.info": "Information",
  "checkout.step.ship": "Shipping",
  "checkout.step.pay": "Payment",
  "checkout.contact": "Contact information",
  "checkout.email": "Email",
  "checkout.first": "First name",
  "checkout.last": "Last name",
  "checkout.address": "Address",
  "checkout.city": "City",
  "checkout.state": "State",
  "checkout.zip": "ZIP",
  "checkout.method": "Shipping method",
  "checkout.standard": "Standard",
  "checkout.express": "Express",
  "checkout.nextday": "Next-day",
  "checkout.time.standard": "5–7 days",
  "checkout.time.express": "2–3 days",
  "checkout.time.nextday": "1 day",
  "checkout.free": "Free",
  "checkout.payment": "Payment",
  "checkout.card": "Card number",
  "checkout.expiry": "Expiry",
  "checkout.cvc": "CVC",
  "checkout.nameOnCard": "Name on card",
  "checkout.back.btn": "Back",
  "checkout.continue": "Continue",
  "checkout.pay": "Pay",
  "checkout.qty": "Qty",

  // Product detail
  "pd.overview": "Overview",
  "pd.addToCart": "Add to cart",
  "pd.freeShipping": "Free shipping",
  "pd.returns": "30-day returns",
  "pd.warranty": "1-year warranty",
  "pd.related": "You may also like",
  "pd.notFound": "Product not found",
  "pd.back": "Back to shop",

  // 404 / error
  "err.notFound": "Page not found",
  "err.notFoundDesc": "The page you're looking for doesn't exist or has been moved.",
  "err.goHome": "Go home",
  "err.title": "This page didn't load",
  "err.desc": "Something went wrong on our end. You can try refreshing or head back home.",
  "err.retry": "Try again",

  // Product card
  "card.smartphones": "Smartphones",
};

const ar: Dict = {
  "nav.phones": "الهواتف",
  "nav.accessories": "الإكسسوارات",
  "nav.everyday": "الأساسيات اليومية",
  "nav.about": "من نحن",
  "nav.contact": "تواصل معنا",
  "nav.search": "بحث",
  "nav.cart": "السلة",
  "nav.account": "الحساب",
  "nav.menu": "القائمة",
  "nav.langToggle": "English",

  "footer.tagline": "الوجهة الموثوقة في السودان لأجهزة آيفون الأصلية. مستوردة ومفحوصة ومسلّمة منذ 2021.",
  "footer.shop": "تسوّق",
  "footer.company": "الشركة",
  "footer.support": "الدعم",
  "footer.returns": "الإرجاع",
  "footer.warranty": "الضمان",
  "footer.track": "تتبع الطلب",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.imported": "مستورد إلى السودان. موثوق منذ 2021.",

  "home.eyebrow": "خدمة موثوقة منذ 2021",
  "home.title.a": "هواتف متميزة.",
  "home.title.b": "خدمة موثوقة منذ 2021.",
  "home.p1": "Blue Apple متخصصة في الهواتف الذكية والتقنية اليومية، نقدم منتجات أصلية وتوصيلاً سريعاً وضماناً لمدة سنة كاملة.",
  "home.p2": "استمتع بعروض ترقية حصرية وخصومات مع بطاقة عضوية Blue Apple.",
  "home.p3": "نحن لا نبيع هواتف فقط — بل نبني الثقة.",
  "home.phones.eyebrow": "الهواتف الذكية",
  "home.phones.title": "أحدث أجهزة آيفون.",
  "home.phones.highlight": "تصل إليك في السودان.",
  "home.phones.desc": "من iPhone 13 Pro Max إلى iPhone 17 Pro Max — أصلية، مفحوصة، ومدعومة بضمان سنة كاملة.",
  "home.phones.cta": "تسوق الهواتف",
  "home.acc.eyebrow": "الإكسسوارات",
  "home.acc.title": "الإكسسوارات.",
  "home.acc.desc": "أغلفة، شواحن، كابلات، سماعات وأكثر — الإكسسوارات التي تُبقي يومك في حركة دائمة.",
  "home.acc.cta": "تسوق الإكسسوارات",
  "home.ess.eyebrow": "الأساسيات اليومية",
  "home.ess.title": "أساسيات يومية.",
  "home.ess.desc": "الأساسيات التي تُبقي يومك في حركة دائمة — مستوردة ومسلّمة في جميع أنحاء السودان.",
  "home.ess.cta": "تسوق الأساسيات",

  "phones.eyebrow": "الهواتف",
  "phones.title.a": "أجهزة آيفون أصلية.",
  "phones.title.b": "مستوردة إلى السودان.",
  "phones.desc": "كل جهاز يتم فحصه والتحقق منه وتسليمه مع ضمان لمدة سنة.",
  "phones.error": "خطأ:",
  "phones.none": "لا توجد منتجات.",

  "acc.eyebrow": "الإكسسوارات",
  "acc.title": "الإكسسوارات.",
  "acc.desc": "شواحن، أغلفة، كابلات، سماعات وأكثر. تقنية يومية أصلية مستوردة ومسلّمة في جميع أنحاء السودان.",

  "ess.eyebrow": "الأساسيات اليومية",
  "ess.title.a": "أساسيات",
  "ess.title.b": "يومية.",
  "ess.desc": "الأساسيات التي تُبقي يومك في حركة دائمة. تقنية يومية أصلية مستوردة ومسلّمة في جميع أنحاء السودان.",

  "list.loading": "جارٍ تحميل المنتجات...",
  "list.empty": "لا يوجد شيء هنا بعد.",
  "list.emptySub": "تحقق قريباً أو تصفح هواتفنا.",

  "about.eyebrow": "قصتنا",
  "about.title.a": "من",
  "about.title.mid": "وساطة",
  "about.title.b": "إلى علامة تجارية.",
  "about.p1": "بدأت Blue Apple في عام 2021 تحت اسم \"Ali Apple\" — خدمة وساطة تربط العملاء في السودان بأجهزة آيفون أصلية من الخارج. بدون مستودع أو متجر فعلي، بنينا الثقة بالكامل عبر وسائل التواصل الاجتماعي، عميلاً راضياً في كل مرة.",
  "about.p2": "مع تزايد الطلب، أعدنا تسمية العلامة إلى Blue Apple — لتصبح وجهة رقمية متميزة للهواتف الذكية مع تركيز قوي على منظومة Apple. أصبح Instagram منصة انطلاقنا، وساعدنا في الوصول إلى العملاء الباحثين عن أجهزة أصلية وتجربة شراء آمنة في السودان.",
  "about.p3": "اليوم، Blue Apple منصة تجارة إلكترونية موثوقة للهواتف الذكية والتقنية اليومية، تقدم خدمات توصيل إلى عدة دول. نستورد أجهزة آيفون أصلية، ونفحص كل جهاز بدقة للتحقق من جودته، ونوصله مباشرة إلى بابك — من iPhone 13 Pro Max حتى أحدث iPhone 17 Pro Max.",
  "about.stat1": "تأسست باسم Ali Apple",
  "about.stat2": "توصيل في جميع أنحاء البلد",
  "about.stat3": "أجهزة Apple أصلية",
  "about.stat2.value": "السودان",
  "about.stat3.value": "100%",

  "contact.eyebrow": "تواصل",
  "contact.title.a": "دعنا",
  "contact.title.b": "نتحدث.",
  "contact.desc": "هل لديك سؤال أو ملاحظة أو تريد فقط أن تُلقي التحية؟ نحن هنا.",
  "contact.name": "الاسم",
  "contact.email": "البريد الإلكتروني",
  "contact.message": "الرسالة",
  "contact.send": "إرسال الرسالة",

  "cart.title": "سلتك",
  "cart.item": "عنصر",
  "cart.items": "عناصر",
  "cart.empty": "سلتك فارغة.",
  "cart.continue": "متابعة التسوق",
  "cart.summary": "ملخص الطلب",
  "cart.subtotal": "المجموع الفرعي",
  "cart.shipping": "الشحن",
  "cart.shipping.calc": "يُحتسب عند الدفع",
  "cart.total": "الإجمالي",
  "cart.checkout": "الدفع",
  "cart.secure": "دفع آمن عبر Shopify",
  "cart.added": "أُضيف إلى السلة",

  "checkout.back": "العودة إلى السلة",
  "checkout.title": "الدفع",
  "checkout.step.info": "المعلومات",
  "checkout.step.ship": "الشحن",
  "checkout.step.pay": "الدفع",
  "checkout.contact": "معلومات التواصل",
  "checkout.email": "البريد الإلكتروني",
  "checkout.first": "الاسم الأول",
  "checkout.last": "اسم العائلة",
  "checkout.address": "العنوان",
  "checkout.city": "المدينة",
  "checkout.state": "الولاية",
  "checkout.zip": "الرمز البريدي",
  "checkout.method": "طريقة الشحن",
  "checkout.standard": "قياسي",
  "checkout.express": "سريع",
  "checkout.nextday": "اليوم التالي",
  "checkout.time.standard": "5–7 أيام",
  "checkout.time.express": "2–3 أيام",
  "checkout.time.nextday": "يوم واحد",
  "checkout.free": "مجاني",
  "checkout.payment": "الدفع",
  "checkout.card": "رقم البطاقة",
  "checkout.expiry": "تاريخ الانتهاء",
  "checkout.cvc": "CVC",
  "checkout.nameOnCard": "الاسم على البطاقة",
  "checkout.back.btn": "رجوع",
  "checkout.continue": "متابعة",
  "checkout.pay": "ادفع",
  "checkout.qty": "الكمية",

  "pd.overview": "نظرة عامة",
  "pd.addToCart": "أضف إلى السلة",
  "pd.freeShipping": "شحن مجاني",
  "pd.returns": "إرجاع خلال 30 يوم",
  "pd.warranty": "ضمان سنة",
  "pd.related": "قد يعجبك أيضاً",
  "pd.notFound": "المنتج غير موجود",
  "pd.back": "العودة إلى المتجر",

  "err.notFound": "الصفحة غير موجودة",
  "err.notFoundDesc": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  "err.goHome": "الرجوع للرئيسية",
  "err.title": "تعذّر تحميل هذه الصفحة",
  "err.desc": "حدث خطأ ما لدينا. يمكنك تحديث الصفحة أو العودة إلى الرئيسية.",
  "err.retry": "حاول مجدداً",

  "card.smartphones": "هواتف ذكية",
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en | string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
