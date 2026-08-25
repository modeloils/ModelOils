import type { Locale } from "./types";

export type NavKey = "products" | "industries" | "export" | "about" | "contact" | "media" | "blog";

export interface UIStrings {
  nav: {
    products: string;
    catalogs: string;
    industries: string;
    export: string;
    about: string;
    contact: string;
    media: string;
    blog: string;
    brandBadge: string;
    requestQuote: string;
    tagline: string;
    toggleMenu: string;
    whatsappLabel: string;
  };
  lang: {
    switchToEn: string;
    switchToTr: string;
    switchToRu: string;
    switchToFa: string;
    switchToAr: string;
    switchToDe: string;
    switchToFr: string;
    label: string;
  };
  hero: {
    badge: string;
    titlePre: string;
    titleHighlight: string;
    subtitle: string;
    requestQuote: string;
    exploreYokohama: string;
    bulletBulk: string;
    bulletPackaging: string;
    bulletExport: string;
  };
  flagship: {
    badge: string;
    body: string;
    becomeDistributor: string;
    viewRange: string;
    badges: string[];
  };
  exportHome: { eyebrow: string; title: string; description: string };
  industriesHome: { eyebrow: string; title: string };
  whyUs: { eyebrow: string; title: string };
  quoteCta: { title: string; body: string; requestWholesale: string; exportCapabilities: string };
  footer: {
    exportWelcome: string;
    company: string;
    products: string;
    exportMarkets: string;
    rights: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    focusEyebrow: string;
    focusTitle: string;
    focusP1: string;
    focusP2: string;
    partnerCta: string;
    whyEyebrow: string;
    whyTitle: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    legalName: string;
    email: string;
    whatsapp: string;
    exportInquiries: string;
    exportInquiriesValue: string;
    responseTime: string;
    responseTimeValue: string;
    helpText: string;
  };
  exportPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    requestOffer: string;
    capEyebrow: string;
    capTitle: string;
    packagingEyebrow: string;
    packagingTitle: string;
    marketsEyebrow: string;
    marketsTitle: string;
  };
  productDetails: {
    productDescription: string;
    productFeatures: string;
    productStandards: string;
    productNotFound: string;
    downloadCatalog: string;
  };
  industriesPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    discussCta: string;
  };
  form: {
    name: string;
    company: string;
    country: string;
    email: string;
    phone: string;
    productInterest: string;
    selectCategory: string;
    packagingPref: string;
    selectPackaging: string;
    quantity: string;
    quantityPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    toastTitle: string;
    toastBody: string;
    errorTitle: string;
    errorBody: string;
    networkError: string;
  };
  notFound: { title: string; body: string; goHome: string };
  errorPage: { title: string; body: string; tryAgain: string; goHome: string };
  mediaPage: { heroTitle: string; heroSubtitle: string };
  common: {
    backToHome: string;
    backToBrands: string;
    backToProducts: string;
    catalogs: string;
    catalog: string;
    viewProducts: string;
  };
  imgAlt: {
    heroProducts: string;
    flagshipFamily: string;
    exportWarehouse: string;
    productDisplay: string;
  };
  blogPage: {
    heroTitle: string;
    heroSubtitle: string;
    generalInfo: string;
    faq: string;
    backToBlog: string;
    readMore: string;
    ctaTitle: string;
    ctaBody: string;
  };
}

const en: UIStrings = {
  nav: {
    products: "Oil Products",
    catalogs: "Catalogues",
    industries: "Industries",
    export: "Export",
    about: "About",
    contact: "Contact",
    media: "Media",
    blog: "Blog",
    brandBadge: "Brand",
    requestQuote: "Request Quote",
    tagline: "Lubricant Export",
    toggleMenu: "Toggle menu",
    whatsappLabel: "Contact us on WhatsApp",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "Language",
  },
  hero: {
    badge: "International Lubricant Export",
    titlePre: "YOKOHAMA Oil Solutions for",
    titleHighlight: "Distributors & Wholesalers",
    subtitle:
      "Model Oils supplies YOKOHAMA motor oils and complementary automotive fluids for distributors, wholesalers, fleets and international buyers.",
    requestQuote: "Request a Quote",
    exploreYokohama: "Explore YOKOHAMA Products",
    bulletBulk: "Bulk & container supply",
    bulletPackaging: "Flexible packaging",
    bulletExport: "Export ready",
  },
  flagship: {
    badge: "Distributed Brand",
    body: "Yokohama is the lubricant and battery brand distributed by Model Oils for regional and international markets. Its broad portfolio supports passenger vehicles, heavy-duty transport, industry, marine operations and agriculture.",
    becomeDistributor: "Become a Distributor",
    viewRange: "View Yokohama Range",
    badges: [
      "Distributed by Model Oils",
      "Wide Product Range",
      "Export Ready",
      "Technical Support",
      "Long-Term Supply",
    ],
  },
  exportHome: {
    eyebrow: "Export & Wholesale",
    title: "Built for Distributors, Wholesalers and International Buyers",
    description:
      "We support bulk lubricant supply with flexible packaging options, export documentation, container-based ordering, and long-term distributor cooperation.",
  },
  industriesHome: {
    eyebrow: "Industries Served",
    title: "Lubricants for Every Operation",
  },
  whyUs: {
    eyebrow: "Why Model Oils",
    title: "A Serious Partner for Global Lubricant Supply",
  },
  quoteCta: {
    title: "Ready to Discuss Your Wholesale Order?",
    body: "Tell us your target country, product type, packaging, and volume. Our team will prepare a suitable export offer.",
    requestWholesale: "Request Wholesale Quote",
    exportCapabilities: "Export Capabilities",
  },
  footer: {
    exportWelcome: "Export inquiries welcome worldwide",
    company: "Company",
    products: "Products",
    exportMarkets: "Export Markets",
    rights: "All rights reserved.",
  },
  about: {
    heroEyebrow: "About Model Oils",
    heroTitle: "International Lubricant Exporter and Yokohama Distributor",
    heroSubtitle:
      "Model Oils is a B2B lubricant exporter, supplier and Yokohama distributor serving wholesalers, distributors and industrial buyers across international markets.",
    focusEyebrow: "Our Focus",
    focusTitle: "Built for International Supply",
    focusP1:
      "We distribute Yokohama lubricants and batteries while supporting international buyers with container ordering, flexible supply and export documentation.",
    focusP2:
      "Our team works with distributors, wholesalers, fleets and industrial buyers to match products and supply formats to each market.",
    partnerCta: "Partner With Model Oils",
    whyEyebrow: "Why Model Oils",
    whyTitle: "A Reliable Export and Distribution Partner",
  },
  contact: {
    heroEyebrow: "Request a Quote",
    heroTitle: "Let's Build Your Export Offer",
    heroSubtitle:
      "Tell us your target country, product type, packaging, and volume. Our team will prepare a suitable export offer.",
    legalName: "Registered Company Name",
    email: "Email",
    whatsapp: "WhatsApp",
    exportInquiries: "Export Inquiries",
    exportInquiriesValue: "Welcome worldwide",
    responseTime: "Response Time",
    responseTimeValue: "Typically within 1–2 business days",
    helpText:
      "Whether you are a distributor, wholesaler, importer or fleet operator, share your requirements and our team will match the right Yokohama products and packaging for your market.",
  },
  exportPage: {
    heroEyebrow: "Export & Wholesale",
    heroTitle: "Built for Distributors, Wholesalers and International Buyers",
    heroSubtitle:
      "We support bulk lubricant supply with flexible packaging options, export documentation, container-based ordering, and long-term distributor cooperation.",
    requestOffer: "Request Export Offer",
    capEyebrow: "Capabilities",
    capTitle: "How We Supply Global Markets",
    packagingEyebrow: "Packaging",
    packagingTitle: "Flexible Packaging Formats",
    marketsEyebrow: "Export Markets",
    marketsTitle: "Markets We Focus On",
  },
  productDetails: {
    productDescription: "Product Description and Application Areas",
    productFeatures: "Features and Benefits",
    productStandards: "Approvals and Specifications",
    productNotFound: "Product not found.",
    downloadCatalog: "Download Catalogue",
  },
  industriesPage: {
    heroEyebrow: "Industries Served",
    heroTitle: "Lubricants for Every Operation",
    heroSubtitle:
      "From automotive to industry, agriculture to marine — we offer high-performance lubricant solutions tailored to many different sectors. With engine oils, hydraulic oils, gear oils, greases, and specialty industrial lubricants designed for each sector's needs, we improve your equipment's efficiency and provide long-lasting protection.",
    discussCta: "Discuss Your Requirements",
  },
  form: {
    name: "Name",
    company: "Company",
    country: "Country",
    email: "Email",
    phone: "Phone / WhatsApp",
    productInterest: "Product interest",
    selectCategory: "Select category",
    packagingPref: "Packaging preference",
    selectPackaging: "Select packaging",
    quantity: "Estimated order quantity",
    quantityPlaceholder: "e.g. 1 container, 20 pallets",
    message: "Message",
    messagePlaceholder: "Tell us your target country, product type, packaging, and volume.",
    submit: "Request Wholesale Quote",
    submitting: "Sending...",
    toastTitle: "Request received",
    toastBody: "Thank you. Our export team will prepare a suitable offer and get back to you.",
    errorTitle: "Error",
    errorBody: "Could not send your request. Please email us directly.",
    networkError: "Network error. Please email us directly at info@modelgrup.com",
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
  },
  errorPage: {
    title: "This page didn't load",
    body: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  mediaPage: {
    heroTitle: "Media",
    heroSubtitle: "Company news and media updates from Model Oils.",
  },
  common: {
    backToHome: "Back to Home",
    backToBrands: "Back to Brands",
    backToProducts: "Back to Products",
    catalogs: "Catalogs",
    catalog: "catalog",
    viewProducts: "View products",
  },
  imgAlt: {
    heroProducts: "YOKOHAMA motor oils displayed in a warm cream industrial showroom",
    flagshipFamily: "Yokohama flagship lubricant product family display",
    exportWarehouse: "International lubricant export warehouse with oil drums",
    productDisplay: "Yokohama lubricant product display",
  },
  blogPage: {
    heroTitle: "Technical Resources",
    heroSubtitle:
      "Technical articles on lubricants and lubrication for distributors, wholesalers and industrial buyers.",
    generalInfo: "General Information",
    faq: "Frequently Asked Questions",
    backToBlog: "All Articles",
    readMore: "Read",
    ctaTitle: "Looking for a product?",
    ctaBody:
      "Our technical team can determine the right specifications for your equipment and operating conditions.",
  },
};

const tr: UIStrings = {
  nav: {
    products: "Yağ Ürünleri",
    catalogs: "Kataloglar",
    industries: "Sektörler",
    export: "İhracat",
    about: "Hakkımızda",
    contact: "İletişim",
    media: "Medya",
    blog: "Blog",
    brandBadge: "Marka",
    requestQuote: "Teklif Al",
    tagline: "Yağ İhracatı",
    toggleMenu: "Menüyü aç/kapat",
    whatsappLabel: "WhatsApp ile iletişime geçin",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "Dil",
  },
  hero: {
    badge: "Uluslararası Yağ İhracatı",
    titlePre: "Distribütörler ve Toptancılar için",
    titleHighlight: "YOKOHAMA Yağ Çözümleri",
    subtitle:
      "Model Oils; distribütörler, toptancılar, filolar ve uluslararası alıcılar için YOKOHAMA motor yağları ve tamamlayıcı otomotiv sıvıları sunar.",
    requestQuote: "Teklif Al",
    exploreYokohama: "YOKOHAMA Ürünlerini Keşfedin",
    bulletBulk: "Dökme ve konteyner tedariği",
    bulletPackaging: "Esnek ambalaj",
    bulletExport: "İhracata hazır",
  },
  flagship: {
    badge: "Distribütör Markamız",
    body: "Yokohama, Model Oils'in bölgesel ve uluslararası pazarlar için distribütörlüğünü yaptığı yağ ve akü markasıdır. Geniş ürün portföyü; binek araçlardan ağır hizmete, endüstriyel uygulamalardan denizcilik ve tarıma kadar birçok ihtiyaca cevap verir.",
    becomeDistributor: "Distribütörlük İçin İletişime Geçin",
    viewRange: "Yokohama Serisini Görün",
    badges: [
      "Model Oils Distribütörlüğü",
      "Geniş Ürün Yelpazesi",
      "İhracata Hazır",
      "Teknik Destek",
      "Uzun Vadeli Tedarik",
    ],
  },
  exportHome: {
    eyebrow: "İhracat ve Toptan",
    title: "Distribütörler, Toptancılar ve Uluslararası Alıcılar için",
    description:
      "Esnek ambalaj seçenekleri, ihracat dokümantasyonu, konteyner bazlı sipariş ve uzun vadeli distribütör iş birliği ile yağ tedariğini destekliyoruz.",
  },
  industriesHome: {
    eyebrow: "Hizmet Verilen Sektörler",
    title: "Her Operasyon için Yağlar",
  },
  whyUs: {
    eyebrow: "Neden Model Oils",
    title: "Küresel Yağ Tedariği için Ciddi Bir Ortak",
  },
  quoteCta: {
    title: "Toptan Siparişinizi Görüşmeye Hazır mısınız?",
    body: "Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin. Ekibimiz size uygun bir ihracat teklifi hazırlayacaktır.",
    requestWholesale: "Toptan Teklif Al",
    exportCapabilities: "İhracat Kabiliyetleri",
  },
  footer: {
    exportWelcome: "İhracat talepleri dünya genelinde memnuniyetle karşılanır",
    company: "Şirket",
    products: "Ürünler",
    exportMarkets: "İhracat Pazarları",
    rights: "Tüm hakları saklıdır.",
  },
  about: {
    heroEyebrow: "Model Oils Hakkında",
    heroTitle: "Uluslararası Yağ İhracatçısı ve Yokohama Distribütörü",
    heroSubtitle:
      "Model Oils; uluslararası pazarlarda toptancılara, distribütörlere ve endüstriyel alıcılara hizmet veren bir B2B yağ ihracatçısı, tedarikçisi ve Yokohama distribütörüdür.",
    focusEyebrow: "Odağımız",
    focusTitle: "Uluslararası Tedarik İçin Hazır",
    focusP1:
      "Yokohama yağ ve akü ürünlerinin distribütörlüğünü yaparken uluslararası alıcıları konteyner siparişi, esnek tedarik ve ihracat dokümantasyonuyla destekliyoruz.",
    focusP2:
      "Ekibimiz; ürün ve tedarik formatlarını her pazara uygun hale getirmek için distribütörler, toptancılar, filolar ve endüstriyel alıcılarla çalışır.",
    partnerCta: "Model Oils ile İş Ortağı Olun",
    whyEyebrow: "Neden Model Oils",
    whyTitle: "Güvenilir İhracat ve Distribütörlük Ortağı",
  },
  contact: {
    heroEyebrow: "Teklif Al",
    heroTitle: "İhracat Teklifinizi Birlikte Oluşturalım",
    heroSubtitle:
      "Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin. Ekibimiz size uygun bir ihracat teklifi hazırlayacaktır.",
    legalName: "Ticaret Ünvanı",
    email: "E-posta",
    whatsapp: "WhatsApp",
    exportInquiries: "İhracat Talepleri",
    exportInquiriesValue: "Dünya genelinde memnuniyetle karşılanır",
    responseTime: "Yanıt Süresi",
    responseTimeValue: "Genellikle 1–2 iş günü içinde",
    helpText:
      "İster distribütör, ister toptancı, ithalatçı veya filo operatörü olun, ihtiyaçlarınızı paylaşın; ekibimiz pazarınıza uygun Yokohama ürünlerini ve ambalajı eşleştirecektir.",
  },
  exportPage: {
    heroEyebrow: "İhracat ve Toptan",
    heroTitle: "Distribütörler, Toptancılar ve Uluslararası Alıcılar için",
    heroSubtitle:
      "Esnek ambalaj seçenekleri, ihracat dokümantasyonu, konteyner bazlı sipariş ve uzun vadeli distribütör iş birliği ile yağ tedariğini destekliyoruz.",
    requestOffer: "İhracat Teklifi Al",
    capEyebrow: "Kabiliyetler",
    capTitle: "Küresel Pazarlara Nasıl Tedarik Ediyoruz",
    packagingEyebrow: "Ambalaj",
    packagingTitle: "Esnek Ambalaj Formatları",
    marketsEyebrow: "İhracat Pazarları",
    marketsTitle: "Odaklandığımız Pazarlar",
  },
  productDetails: {
    productDescription: "Ürün Tanımı ve Kullanım Alanları",
    productFeatures: "Özellikleri ve Faydaları",
    productStandards: "Karşıladığı Onay ve Şartnameler",
    productNotFound: "Ürün bulunamadı.",
    downloadCatalog: "Kataloğu İndir",
  },
  industriesPage: {
    heroEyebrow: "Hizmet Verilen Sektörler",
    heroTitle: "Her Operasyon için Yağlar",
    heroSubtitle:
      "otomotivden sanayiye, tarımdan denizcilik sektörüne kadar birçok farklı alana özel yüksek performanslı madeni yağ çözümleri sunuyoruz. Her sektörün ihtiyaçlarına uygun motor yağları, hidrolik yağlar, dişli yağları, gresler ve özel endüstriyel yağlarımız ile ekipmanlarınızın verimliliğini artırıyor, uzun ömürlü koruma sağlıyoruz.",
    discussCta: "İhtiyaçlarınızı Görüşün",
  },
  form: {
    name: "Ad Soyad",
    company: "Şirket",
    country: "Ülke",
    email: "E-posta",
    phone: "Telefon / WhatsApp",
    productInterest: "İlgilenilen ürün",
    selectCategory: "Kategori seçin",
    packagingPref: "Ambalaj tercihi",
    selectPackaging: "Ambalaj seçin",
    quantity: "Tahmini sipariş miktarı",
    quantityPlaceholder: "örn. 1 konteyner, 20 palet",
    message: "Mesaj",
    messagePlaceholder: "Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin.",
    submit: "Toptan Teklif Al",
    submitting: "Gönderiliyor...",
    toastTitle: "Talebiniz alındı",
    toastBody: "Teşekkürler. İhracat ekibimiz size uygun bir teklif hazırlayıp geri dönecektir.",
    errorTitle: "Hata",
    errorBody: "Talebiniz gönderilemedi. Lütfen bize doğrudan e-posta gönderin.",
    networkError: "Ağ hatası. Lütfen bize doğrudan info@modelgrup.com adresinden e-posta gönderin.",
  },
  notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığınız sayfa mevcut değil veya taşınmış.",
    goHome: "Ana sayfaya dön",
  },
  errorPage: {
    title: "Bu sayfa yüklenemedi",
    body: "Tarafımızda bir şeyler ters gitti. Yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz.",
    tryAgain: "Tekrar dene",
    goHome: "Ana sayfaya dön",
  },
  mediaPage: {
    heroTitle: "Medya",
    heroSubtitle: "Model Oils'tan şirket haberleri ve medya güncellemeleri.",
  },
  common: {
    backToHome: "Anasayfaya Dön",
    backToBrands: "Markalara Dön",
    backToProducts: "Ürünlere Geri Dön",
    catalogs: "Kataloglar",
    catalog: "kataloğu",
    viewProducts: "Ürünleri görüntüle",
  },
  imgAlt: {
    heroProducts: "Sıcak krem tonlu endüstriyel bir alanda sergilenen YOKOHAMA motor yağları",
    flagshipFamily: "Yokohama amiral ürün ailesi sergisi",
    exportWarehouse: "Varillerle dolu uluslararası madeni yağ ihracat deposu",
    productDisplay: "Yokohama madeni yağ ürün sergisi",
  },
  blogPage: {
    heroTitle: "Teknik Kaynaklar",
    heroSubtitle:
      "Distribütörler, toptancılar ve endüstriyel alıcılar için yağlar ve yağlama üzerine teknik makaleler.",
    generalInfo: "Genel Bilgi",
    faq: "Sıkça Sorulan Sorular",
    backToBlog: "Tüm Makaleler",
    readMore: "Oku",
    ctaTitle: "Ürün mü arıyorsunuz?",
    ctaBody:
      "Teknik ekibimiz ekipmanınıza ve çalışma koşullarınıza uygun teknik özellikleri belirleyebilir.",
  },
};

const ru: UIStrings = {
  nav: {
    products: "Масляная продукция",
    catalogs: "Каталоги",
    industries: "Отрасли",
    export: "Экспорт",
    about: "О нас",
    contact: "Контакты",
    media: "Медиа",
    blog: "Блог",
    brandBadge: "Бренд",
    requestQuote: "Запросить цену",
    tagline: "Экспорт смазочных материалов",
    toggleMenu: "Открыть/закрыть меню",
    whatsappLabel: "Связаться с нами в WhatsApp",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "Язык",
  },
  hero: {
    badge: "Международный экспорт смазочных материалов",
    titlePre: "Масляные решения YOKOHAMA для",
    titleHighlight: "Дистрибьюторов и оптовиков",
    subtitle:
      "Model Oils поставляет моторные масла YOKOHAMA и сопутствующие автомобильные жидкости для дистрибьюторов, оптовиков, автопарков и международных покупателей.",
    requestQuote: "Запросить цену",
    exploreYokohama: "Изучить продукты YOKOHAMA",
    bulletBulk: "Навалом и в контейнерах",
    bulletPackaging: "Гибкая упаковка",
    bulletExport: "Готово к экспорту",
  },
  flagship: {
    badge: "Дистрибьюторский бренд",
    body: "Yokohama — бренд смазочных материалов и аккумуляторов, дистрибьютором которого Model Oils является на региональных и международных рынках. Широкий ассортимент охватывает легковые автомобили, тяжелый транспорт, промышленность, судоходство и сельское хозяйство.",
    becomeDistributor: "Стать дистрибьютором",
    viewRange: "Посмотреть линейку Yokohama",
    badges: [
      "Дистрибуция Model Oils",
      "Широкий ассортимент",
      "Готово к экспорту",
      "Техническая поддержка",
      "Долгосрочные поставки",
    ],
  },
  exportHome: {
    eyebrow: "Экспорт и опт",
    title: "Создано для дистрибьюторов, оптовиков и международных покупателей",
    description:
      "Мы обеспечиваем оптовые поставки смазочных материалов с гибкими опциями упаковки, экспортной документацией, контейнерными заказами и долгосрочным сотрудничеством с дистрибьюторами.",
  },
  industriesHome: {
    eyebrow: "Обслуживаемые отрасли",
    title: "Смазочные материалы для любого производства",
  },
  whyUs: {
    eyebrow: "Почему Model Oils",
    title: "Надёжный партнёр в мировых поставках смазочных материалов",
  },
  quoteCta: {
    title: "Готовы обсудить оптовый заказ?",
    body: "Сообщите нам целевую страну, тип продукта, упаковку и объём. Наша команда подготовит подходящее экспортное предложение.",
    requestWholesale: "Запросить оптовое предложение",
    exportCapabilities: "Экспортные возможности",
  },
  footer: {
    exportWelcome: "Экспортные запросы приветствуются по всему миру",
    company: "Компания",
    products: "Продукты",
    exportMarkets: "Рынки сбыта",
    rights: "Все права защищены.",
  },
  about: {
    heroEyebrow: "О Model Oils",
    heroTitle: "Международный экспортёр смазочных материалов и дистрибьютор Yokohama",
    heroSubtitle:
      "Model Oils — B2B-экспортёр, поставщик смазочных материалов и дистрибьютор Yokohama для оптовиков, дистрибьюторов и промышленных покупателей на международных рынках.",
    focusEyebrow: "Наш фокус",
    focusTitle: "Создано для международных поставок",
    focusP1:
      "Мы дистрибутируем смазочные материалы и аккумуляторы Yokohama и поддерживаем международных покупателей контейнерными заказами, гибкими поставками и экспортной документацией.",
    focusP2: "Наша команда помогает подобрать продукцию и формат поставки для каждого рынка.",
    partnerCta: "Стать партнёром Model Oils",
    whyEyebrow: "Почему Model Oils",
    whyTitle: "Надёжный партнёр по экспорту и дистрибуции",
  },
  contact: {
    heroEyebrow: "Запросить цену",
    heroTitle: "Давайте создадим ваше экспортное предложение",
    heroSubtitle:
      "Сообщите нам целевую страну, тип продукта, упаковку и объём. Наша команда подготовит подходящее экспортное предложение.",
    legalName: "Юридическое наименование",
    email: "Электронная почта",
    whatsapp: "WhatsApp",
    exportInquiries: "Экспортные запросы",
    exportInquiriesValue: "Принимаются по всему миру",
    responseTime: "Время ответа",
    responseTimeValue: "Обычно в течение 1–2 рабочих дней",
    helpText:
      "Являетесь ли вы дистрибьютором, оптовиком, импортёром или оператором автопарка, поделитесь своими требованиями, и наша команда подберёт правильные продукты Yokohama и упаковку для вашего рынка.",
  },
  exportPage: {
    heroEyebrow: "Экспорт и опт",
    heroTitle: "Создано для дистрибьюторов, оптовиков и международных покупателей",
    heroSubtitle:
      "Мы обеспечиваем оптовые поставки смазочных материалов с гибкими опциями упаковки, экспортной документацией, контейнерными заказами и долгосрочным сотрудничеством с дистрибьюторами.",
    requestOffer: "Запросить экспортное предложение",
    capEyebrow: "Возможности",
    capTitle: "Как мы поставляем на глобальные рынки",
    packagingEyebrow: "Упаковка",
    packagingTitle: "Гибкие форматы упаковки",
    marketsEyebrow: "Рынки сбыта",
    marketsTitle: "Рынки, на которые мы ориентируемся",
  },
  productDetails: {
    productDescription: "Описание продукта и области применения",
    productFeatures: "Характеристики и преимущества",
    productStandards: "Допуски и спецификации",
    productNotFound: "Продукт не найден.",
    downloadCatalog: "Скачать каталог",
  },
  industriesPage: {
    heroEyebrow: "Обслуживаемые отрасли",
    heroTitle: "Смазочные материалы для любого производства",
    heroSubtitle:
      "От автомобильной отрасли до промышленности, от сельского хозяйства до судоходства — мы предлагаем высокопроизводительные решения по смазочным материалам для многих различных секторов. Моторные масла, гидравлические масла, трансмиссионные масла, смазки и специальные промышленные масла, разработанные с учётом потребностей каждого сектора, повышают эффективность вашего оборудования и обеспечивают долгосрочную защиту.",
    discussCta: "Обсудить ваши требования",
  },
  form: {
    name: "Имя",
    company: "Компания",
    country: "Страна",
    email: "Электронная почта",
    phone: "Телефон / WhatsApp",
    productInterest: "Интересующий продукт",
    selectCategory: "Выбрать категорию",
    packagingPref: "Предпочтение по упаковке",
    selectPackaging: "Выбрать упаковку",
    quantity: "Ориентировочный объём заказа",
    quantityPlaceholder: "например, 1 контейнер, 20 паллет",
    message: "Сообщение",
    messagePlaceholder: "Сообщите нам целевую страну, тип продукта, упаковку и объём.",
    submit: "Запросить оптовое предложение",
    submitting: "Отправка...",
    toastTitle: "Запрос получен",
    toastBody:
      "Спасибо. Наша экспортная команда подготовит подходящее предложение и свяжется с вами.",
    errorTitle: "Ошибка",
    errorBody:
      "Не удалось отправить запрос. Пожалуйста, напишите нам напрямую по электронной почте.",
    networkError: "Ошибка сети. Пожалуйста, напишите нам на info@modelgrup.com",
  },
  notFound: {
    title: "Страница не найдена",
    body: "Страница, которую вы ищете, не существует или была перемещена.",
    goHome: "На главную",
  },
  errorPage: {
    title: "Страница не загрузилась",
    body: "Что-то пошло не так с нашей стороны. Вы можете попробовать обновить страницу или вернуться на главную.",
    tryAgain: "Попробовать снова",
    goHome: "На главную",
  },
  mediaPage: {
    heroTitle: "Медиа",
    heroSubtitle: "Новости компании и медиа-обновления Model Oils.",
  },
  common: {
    backToHome: "На главную",
    backToBrands: "К брендам",
    backToProducts: "К продуктам",
    catalogs: "Каталоги",
    catalog: "каталог",
    viewProducts: "Смотреть продукты",
  },
  imgAlt: {
    heroProducts: "Моторные масла YOKOHAMA в промышленном шоуруме тёплого кремового оттенка",
    flagshipFamily: "Витрина флагманского семейства смазочных материалов Yokohama",
    exportWarehouse: "Международный склад экспорта смазочных материалов с бочками масла",
    productDisplay: "Витрина смазочных материалов Yokohama",
  },
  blogPage: {
    heroTitle: "Технические ресурсы",
    heroSubtitle:
      "Технические статьи о смазочных материалах для дистрибьюторов, оптовиков и промышленных покупателей.",
    generalInfo: "Общая информация",
    faq: "Часто задаваемые вопросы",
    backToBlog: "Все статьи",
    readMore: "Читать",
    ctaTitle: "Ищете продукт?",
    ctaBody:
      "Наша техническая команда поможет подобрать подходящие характеристики для вашего оборудования и условий эксплуатации.",
  },
};

const fa: UIStrings = {
  nav: {
    products: "محصولات روغن",
    catalogs: "کاتالوگ‌ها",
    industries: "صنایع",
    export: "صادرات",
    about: "درباره ما",
    contact: "تماس",
    media: "رسانه",
    blog: "بلاگ",
    brandBadge: "برند",
    requestQuote: "درخواست قیمت",
    tagline: "صادرات روانکار",
    toggleMenu: "باز/بسته کردن منو",
    whatsappLabel: "تماس با ما از طریق واتساپ",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "زبان",
  },
  hero: {
    badge: "صادرات بین‌المللی روانکار",
    titlePre: "راهکارهای روغن YOKOHAMA برای",
    titleHighlight: "توزیع‌کنندگان و عمده‌فروشان",
    subtitle:
      "Model Oils روغن‌های موتور YOKOHAMA و سیالات تکمیلی خودرو را برای توزیع‌کنندگان، عمده‌فروشان، ناوگان‌ها و خریداران بین‌المللی تأمین می‌کند.",
    requestQuote: "درخواست قیمت",
    exploreYokohama: "مشاهده محصولات YOKOHAMA",
    bulletBulk: "تأمین فله و کانتینری",
    bulletPackaging: "بسته‌بندی انعطاف‌پذیر",
    bulletExport: "آماده صادرات",
  },
  flagship: {
    badge: "برند تحت توزیع",
    body: "Yokohama برند روانکار و باتری تحت توزیع Model Oils برای بازارهای منطقه‌ای و بین‌المللی است. سبد گسترده آن خودروهای سواری، حمل‌ونقل سنگین، صنعت، دریانوردی و کشاورزی را پوشش می‌دهد.",
    becomeDistributor: "درخواست نمایندگی",
    viewRange: "مشاهده محصولات Yokohama",
    badges: [
      "توزیع توسط Model Oils",
      "سبد گسترده محصولات",
      "آماده صادرات",
      "پشتیبانی فنی",
      "تأمین بلندمدت",
    ],
  },
  exportHome: {
    eyebrow: "صادرات و عمده‌فروشی",
    title: "طراحی‌شده برای توزیع‌کنندگان، عمده‌فروشان و خریداران بین‌المللی",
    description:
      "ما تأمین فله روانکار را با گزینه‌های بسته‌بندی انعطاف‌پذیر، مستندات صادراتی، سفارشات کانتینری و همکاری بلندمدت توزیع‌کننده پشتیبانی می‌کنیم.",
  },
  industriesHome: {
    eyebrow: "صنایع تحت پوشش",
    title: "روانکار برای هر عملیات",
  },
  whyUs: {
    eyebrow: "چرا Model Oils",
    title: "شریک جدی برای تأمین جهانی روانکار",
  },
  quoteCta: {
    title: "آماده بحث درباره سفارش عمده خود هستید؟",
    body: "کشور هدف، نوع محصول، بسته‌بندی و حجم خود را به ما بگویید. تیم ما یک پیشنهاد صادراتی مناسب آماده خواهد کرد.",
    requestWholesale: "درخواست قیمت عمده",
    exportCapabilities: "قابلیت‌های صادراتی",
  },
  footer: {
    exportWelcome: "استعلام صادرات در سراسر جهان خوش‌آمد است",
    company: "شرکت",
    products: "محصولات",
    exportMarkets: "بازارهای صادراتی",
    rights: "تمامی حقوق محفوظ است.",
  },
  about: {
    heroEyebrow: "درباره Model Oils",
    heroTitle: "صادرکننده بین‌المللی روانکار و توزیع‌کننده Yokohama",
    heroSubtitle:
      "Model Oils صادرکننده و تأمین‌کننده B2B روانکار و توزیع‌کننده Yokohama برای عمده‌فروشان، توزیع‌کنندگان و خریداران صنعتی در بازارهای بین‌المللی است.",
    focusEyebrow: "تمرکز ما",
    focusTitle: "آماده برای تأمین بین‌المللی",
    focusP1:
      "ما روانکارها و باتری‌های Yokohama را توزیع می‌کنیم و با سفارش کانتینری، تأمین انعطاف‌پذیر و اسناد صادراتی از خریداران بین‌المللی پشتیبانی می‌کنیم.",
    focusP2: "تیم ما برای انتخاب محصول و روش تأمین مناسب هر بازار با شرکای تجاری همکاری می‌کند.",
    partnerCta: "همکاری با Model Oils",
    whyEyebrow: "چرا Model Oils",
    whyTitle: "شریک قابل اعتماد صادرات و توزیع",
  },
  contact: {
    heroEyebrow: "درخواست قیمت",
    heroTitle: "بیایید پیشنهاد صادراتی شما را بسازیم",
    heroSubtitle:
      "کشور هدف، نوع محصول، بسته‌بندی و حجم خود را به ما بگویید. تیم ما یک پیشنهاد صادراتی مناسب آماده خواهد کرد.",
    legalName: "نام رسمی شرکت",
    email: "ایمیل",
    whatsapp: "واتساپ",
    exportInquiries: "استعلام صادرات",
    exportInquiriesValue: "در سراسر جهان خوش‌آمد است",
    responseTime: "زمان پاسخ",
    responseTimeValue: "معمولاً ظرف ۱–۲ روز کاری",
    helpText:
      "چه توزیع‌کننده، عمده‌فروش، واردکننده یا اپراتور ناوگان باشید، نیازهای خود را با ما در میان بگذارید؛ تیم ما محصولات و بسته‌بندی مناسب Yokohama را برای بازار شما تطبیق خواهد داد.",
  },
  exportPage: {
    heroEyebrow: "صادرات و عمده‌فروشی",
    heroTitle: "طراحی‌شده برای توزیع‌کنندگان، عمده‌فروشان و خریداران بین‌المللی",
    heroSubtitle:
      "ما تأمین فله روانکار را با گزینه‌های بسته‌بندی انعطاف‌پذیر، مستندات صادراتی، سفارشات کانتینری و همکاری بلندمدت توزیع‌کننده پشتیبانی می‌کنیم.",
    requestOffer: "درخواست پیشنهاد صادراتی",
    capEyebrow: "قابلیت‌ها",
    capTitle: "چگونه به بازارهای جهانی تأمین می‌کنیم",
    packagingEyebrow: "بسته‌بندی",
    packagingTitle: "فرمت‌های بسته‌بندی انعطاف‌پذیر",
    marketsEyebrow: "بازارهای صادراتی",
    marketsTitle: "بازارهایی که روی آن‌ها تمرکز داریم",
  },
  productDetails: {
    productDescription: "توضیحات محصول و حوزه‌های کاربرد",
    productFeatures: "ویژگی‌ها و مزایا",
    productStandards: "تأییدیه‌ها و مشخصات",
    productNotFound: "محصول یافت نشد.",
    downloadCatalog: "دانلود کاتالوگ",
  },
  industriesPage: {
    heroEyebrow: "صنایع تحت پوشش",
    heroTitle: "روانکار برای هر عملیات",
    heroSubtitle:
      "از خودرو تا صنعت، از کشاورزی تا دریانوردی — ما راه‌حل‌های روانکار با عملکرد بالا را برای بسیاری از بخش‌های مختلف ارائه می‌دهیم. با روغن‌های موتور، روغن‌های هیدرولیک، روغن‌های دنده، گریس‌ها و روغن‌های صنعتی خاص که برای نیازهای هر بخش طراحی شده‌اند، بهره‌وری تجهیزات شما را افزایش می‌دهیم و محافظت طولانی‌مدت فراهم می‌کنیم.",
    discussCta: "نیازهای خود را مطرح کنید",
  },
  form: {
    name: "نام",
    company: "شرکت",
    country: "کشور",
    email: "ایمیل",
    phone: "تلفن / واتساپ",
    productInterest: "محصول مورد علاقه",
    selectCategory: "انتخاب دسته‌بندی",
    packagingPref: "ترجیح بسته‌بندی",
    selectPackaging: "انتخاب بسته‌بندی",
    quantity: "مقدار تخمینی سفارش",
    quantityPlaceholder: "مثلاً ۱ کانتینر، ۲۰ پالت",
    message: "پیام",
    messagePlaceholder: "کشور هدف، نوع محصول، بسته‌بندی و حجم خود را به ما بگویید.",
    submit: "درخواست قیمت عمده",
    submitting: "در حال ارسال...",
    toastTitle: "درخواست دریافت شد",
    toastBody: "متشکریم. تیم صادراتی ما یک پیشنهاد مناسب آماده کرده و با شما تماس خواهد گرفت.",
    errorTitle: "خطا",
    errorBody: "درخواست شما ارسال نشد. لطفاً مستقیماً با ما از طریق ایمیل تماس بگیرید.",
    networkError: "خطای شبکه. لطفاً مستقیماً به آدرس info@modelgrup.com ایمیل بزنید.",
  },
  notFound: {
    title: "صفحه یافت نشد",
    body: "صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.",
    goHome: "بازگشت به خانه",
  },
  errorPage: {
    title: "این صفحه بارگذاری نشد",
    body: "مشکلی از سمت ما رخ داده است. می‌توانید صفحه را بازخوانی کنید یا به خانه برگردید.",
    tryAgain: "دوباره تلاش کنید",
    goHome: "بازگشت به خانه",
  },
  mediaPage: {
    heroTitle: "رسانه",
    heroSubtitle: "اخبار شرکت و به‌روزرسانی‌های رسانه‌ای Model Oils.",
  },
  common: {
    backToHome: "بازگشت به خانه",
    backToBrands: "بازگشت به برندها",
    backToProducts: "بازگشت به محصولات",
    catalogs: "کاتالوگ‌ها",
    catalog: "کاتالوگ",
    viewProducts: "مشاهده محصولات",
  },
  imgAlt: {
    heroProducts: "روغن‌های موتور YOKOHAMA در یک نمایشگاه صنعتی با رنگ کرم گرم",
    flagshipFamily: "نمایش خانواده محصولات پرچم‌دار روان‌کننده Yokohama",
    exportWarehouse: "انبار بین‌المللی صادرات روان‌کننده با بشکه‌های روغن",
    productDisplay: "نمایش محصول روان‌کننده Yokohama",
  },
  blogPage: {
    heroTitle: "منابع فنی",
    heroSubtitle:
      "مقالات فنی درباره روانکارها و روانکاری برای توزیع‌کنندگان، عمده‌فروشان و خریداران صنعتی.",
    generalInfo: "اطلاعات عمومی",
    faq: "سوالات متداول",
    backToBlog: "همه مقالات",
    readMore: "خواندن",
    ctaTitle: "به دنبال محصول هستید؟",
    ctaBody: "تیم فنی ما می‌تواند مشخصات مناسب برای تجهیزات و شرایط کاری شما را تعیین کند.",
  },
};

const ar: UIStrings = {
  nav: {
    products: "منتجات الزيوت",
    catalogs: "الكتالوجات",
    industries: "الصناعات",
    export: "التصدير",
    about: "من نحن",
    contact: "اتصل بنا",
    media: "الوسائط",
    blog: "المدونة",
    brandBadge: "العلامة التجارية",
    requestQuote: "طلب عرض سعر",
    tagline: "تصدير المواد التشحيمية",
    toggleMenu: "فتح/إغلاق القائمة",
    whatsappLabel: "تواصل معنا عبر واتساب",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "اللغة",
  },
  hero: {
    badge: "تصدير دولي للمواد التشحيمية",
    titlePre: "حلول زيوت YOKOHAMA لـ",
    titleHighlight: "الموزعين وتجار الجملة",
    subtitle:
      "تورد Model Oils زيوت محركات YOKOHAMA وسوائل السيارات المكملة للموزعين وتجار الجملة والأساطيل والمشترين الدوليين.",
    requestQuote: "طلب عرض سعر",
    exploreYokohama: "استكشاف منتجات YOKOHAMA",
    bulletBulk: "توريد بالجملة والحاويات",
    bulletPackaging: "تغليف مرن",
    bulletExport: "جاهز للتصدير",
  },
  flagship: {
    badge: "علامتنا الموزعة",
    body: "Yokohama هي علامة الزيوت والبطاريات التي توزعها Model Oils للأسواق الإقليمية والدولية. تغطي مجموعتها الواسعة سيارات الركاب والنقل الثقيل والصناعة والعمليات البحرية والزراعة.",
    becomeDistributor: "كن موزعاً",
    viewRange: "شاهد مجموعة Yokohama",
    badges: ["توزيع Model Oils", "مجموعة واسعة", "جاهز للتصدير", "دعم فني", "توريد طويل الأمد"],
  },
  exportHome: {
    eyebrow: "التصدير والجملة",
    title: "مصمم للموزعين وتجار الجملة والمشترين الدوليين",
    description:
      "ندعم توريد المواد التشحيمية بالجملة بخيارات تغليف مرنة، ووثائق تصدير، وطلبات قائمة على الحاويات، وتعاون طويل الأمد مع الموزعين.",
  },
  industriesHome: {
    eyebrow: "الصناعات المخدومة",
    title: "مواد تشحيمية لكل عملية",
  },
  whyUs: {
    eyebrow: "لماذا Model Oils",
    title: "شريك جاد لتوريد المواد التشحيمية عالمياً",
  },
  quoteCta: {
    title: "هل أنت مستعد لمناقشة طلبك بالجملة؟",
    body: "أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم. سيعدّ فريقنا عرضاً مناسباً للتصدير.",
    requestWholesale: "طلب عرض سعر بالجملة",
    exportCapabilities: "قدرات التصدير",
  },
  footer: {
    exportWelcome: "استفسارات التصدير مرحب بها في جميع أنحاء العالم",
    company: "الشركة",
    products: "المنتجات",
    exportMarkets: "أسواق التصدير",
    rights: "جميع الحقوق محفوظة.",
  },
  about: {
    heroEyebrow: "عن Model Oils",
    heroTitle: "مصدّر دولي للزيوت وموزع Yokohama",
    heroSubtitle:
      "Model Oils هي مصدّر ومورد B2B للزيوت وموزع Yokohama لخدمة تجار الجملة والموزعين والمشترين الصناعيين في الأسواق الدولية.",
    focusEyebrow: "تركيزنا",
    focusTitle: "جاهزون للتوريد الدولي",
    focusP1:
      "نوزع زيوت وبطاريات Yokohama وندعم المشترين الدوليين بطلبات الحاويات والتوريد المرن ووثائق التصدير.",
    focusP2: "يعمل فريقنا مع الشركاء لاختيار المنتجات وصيغ التوريد الملائمة لكل سوق.",
    partnerCta: "كن شريكاً لـ Model Oils",
    whyEyebrow: "لماذا Model Oils",
    whyTitle: "شريك موثوق للتصدير والتوزيع",
  },
  contact: {
    heroEyebrow: "طلب عرض سعر",
    heroTitle: "دعنا نبني عرض التصدير الخاص بك",
    heroSubtitle:
      "أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم. سيعدّ فريقنا عرضاً مناسباً للتصدير.",
    legalName: "الاسم القانوني للشركة",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    exportInquiries: "استفسارات التصدير",
    exportInquiriesValue: "مرحب بها في جميع أنحاء العالم",
    responseTime: "وقت الاستجابة",
    responseTimeValue: "عادةً خلال 1–2 يوم عمل",
    helpText:
      "سواء كنت موزعاً أو تاجر جملة أو مستورداً أو مشغّل أسطول، شاركنا متطلباتك وسيطابق فريقنا منتجات Yokohama والتغليف المناسب لسوقك.",
  },
  exportPage: {
    heroEyebrow: "التصدير والجملة",
    heroTitle: "مصمم للموزعين وتجار الجملة والمشترين الدوليين",
    heroSubtitle:
      "ندعم توريد المواد التشحيمية بالجملة بخيارات تغليف مرنة، ووثائق تصدير، وطلبات قائمة على الحاويات، وتعاون طويل الأمد مع الموزعين.",
    requestOffer: "طلب عرض تصدير",
    capEyebrow: "القدرات",
    capTitle: "كيف نورّد الأسواق العالمية",
    packagingEyebrow: "التغليف",
    packagingTitle: "أشكال التغليف المرنة",
    marketsEyebrow: "أسواق التصدير",
    marketsTitle: "الأسواق التي نركز عليها",
  },
  productDetails: {
    productDescription: "وصف المنتج ومجالات التطبيق",
    productFeatures: "الميزات والفوائد",
    productStandards: "الموافقات والمواصفات",
    productNotFound: "المنتج غير موجود.",
    downloadCatalog: "تحميل الكتالوج",
  },
  industriesPage: {
    heroEyebrow: "الصناعات المخدومة",
    heroTitle: "مواد تشحيمية لكل عملية",
    heroSubtitle:
      "من صناعة السيارات إلى الصناعة، ومن الزراعة إلى الملاحة البحرية — نقدم حلول تشحيم عالية الأداء مصممة لقطاعات متعددة ومختلفة. بفضل زيوت المحركات وزيوت الهيدروليك وزيوت التروس والشحوم والزيوت الصناعية المتخصصة المصممة لتلبية احتياجات كل قطاع، نحسّن كفاءة معداتكم ونوفر حماية طويلة الأمد.",
    discussCta: "ناقش متطلباتك",
  },
  form: {
    name: "الاسم",
    company: "الشركة",
    country: "الدولة",
    email: "البريد الإلكتروني",
    phone: "الهاتف / واتساب",
    productInterest: "المنتج المطلوب",
    selectCategory: "اختر الفئة",
    packagingPref: "تفضيل التغليف",
    selectPackaging: "اختر التغليف",
    quantity: "الكمية التقديرية للطلب",
    quantityPlaceholder: "مثلاً: حاوية واحدة، 20 بليت",
    message: "الرسالة",
    messagePlaceholder: "أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم.",
    submit: "طلب عرض سعر بالجملة",
    submitting: "جارٍ الإرسال...",
    toastTitle: "تم استلام الطلب",
    toastBody: "شكراً لك. سيعدّ فريق التصدير لدينا عرضاً مناسباً ويتواصل معك.",
    errorTitle: "خطأ",
    errorBody: "تعذّر إرسال طلبك. يرجى مراسلتنا مباشرة عبر البريد الإلكتروني.",
    networkError: "خطأ في الشبكة. يرجى مراسلتنا على info@modelgrup.com",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    body: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    goHome: "العودة إلى الرئيسية",
  },
  errorPage: {
    title: "لم يتم تحميل هذه الصفحة",
    body: "حدث خطأ من جانبنا. يمكنك تجربة تحديث الصفحة أو العودة إلى الرئيسية.",
    tryAgain: "حاول مرة أخرى",
    goHome: "العودة إلى الرئيسية",
  },
  mediaPage: {
    heroTitle: "الوسائط",
    heroSubtitle: "أخبار الشركة وتحديثات Model Oils الإعلامية.",
  },
  common: {
    backToHome: "العودة إلى الرئيسية",
    backToBrands: "العودة إلى العلامات التجارية",
    backToProducts: "العودة إلى المنتجات",
    catalogs: "الكتالوجات",
    catalog: "كتالوج",
    viewProducts: "عرض المنتجات",
  },
  imgAlt: {
    heroProducts: "زيوت محركات YOKOHAMA معروضة في صالة صناعية بدرجات كريمية دافئة",
    flagshipFamily: "عرض عائلة منتجات Yokohama الرائدة لمواد التشحيم",
    exportWarehouse: "مستودع دولي لتصدير مواد التشحيم مع براميل الزيت",
    productDisplay: "عرض منتج مواد التشحيم Yokohama",
  },
  blogPage: {
    heroTitle: "الموارد التقنية",
    heroSubtitle:
      "مقالات تقنية حول المواد التشحيمية والتشحيم للموزعين وتجار الجملة والمشترين الصناعيين.",
    generalInfo: "معلومات عامة",
    faq: "الأسئلة الشائعة",
    backToBlog: "جميع المقالات",
    readMore: "اقرأ",
    ctaTitle: "هل تبحث عن منتج؟",
    ctaBody: "يمكن لفريقنا التقني تحديد المواصفات المناسبة لمعداتك وظروف تشغيلك.",
  },
};

const de: UIStrings = {
  nav: {
    products: "Ölprodukte",
    catalogs: "Kataloge",
    industries: "Branchen",
    export: "Export",
    about: "Über uns",
    contact: "Kontakt",
    media: "Medien",
    blog: "Blog",
    brandBadge: "Marke",
    requestQuote: "Angebot anfordern",
    tagline: "Schmierstoff-Export",
    toggleMenu: "Menü öffnen/schließen",
    whatsappLabel: "Kontaktieren Sie uns auf WhatsApp",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "Sprache",
  },
  hero: {
    badge: "Internationaler Schmierstoff-Export",
    titlePre: "YOKOHAMA Öllösungen für",
    titleHighlight: "Distributoren & Großhändler",
    subtitle:
      "Model Oils liefert YOKOHAMA Motoröle und ergänzende Fahrzeugflüssigkeiten für Distributoren, Großhändler, Flotten und internationale Käufer.",
    requestQuote: "Angebot anfordern",
    exploreYokohama: "YOKOHAMA Produkte entdecken",
    bulletBulk: "Bulk- & Containerversorgung",
    bulletPackaging: "Flexible Verpackung",
    bulletExport: "Exportbereit",
  },
  flagship: {
    badge: "Vertriebene Marke",
    body: "Yokohama ist die von Model Oils für regionale und internationale Märkte vertriebene Schmierstoff- und Batteriemarke. Das breite Portfolio bedient Pkw, Schwertransport, Industrie, Schifffahrt und Landwirtschaft.",
    becomeDistributor: "Distributor werden",
    viewRange: "Yokohama Sortiment ansehen",
    badges: [
      "Vertrieb durch Model Oils",
      "Breites Sortiment",
      "Exportbereit",
      "Technischer Support",
      "Langfristige Versorgung",
    ],
  },
  exportHome: {
    eyebrow: "Export & Großhandel",
    title: "Entwickelt für Distributoren, Großhändler und internationale Käufer",
    description:
      "Wir unterstützen die Bulk-Schmierstoffversorgung mit flexiblen Verpackungsoptionen, Exportdokumentation, containerbasierter Bestellung und langfristiger Distributorzusammenarbeit.",
  },
  industriesHome: {
    eyebrow: "Bediente Branchen",
    title: "Schmierstoffe für jeden Betrieb",
  },
  whyUs: {
    eyebrow: "Warum Model Oils",
    title: "Ein seriöser Partner für die globale Schmierstoffversorgung",
  },
  quoteCta: {
    title: "Bereit, Ihre Großbestellung zu besprechen?",
    body: "Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit. Unser Team erstellt ein passendes Exportangebot.",
    requestWholesale: "Großhandelsangebot anfordern",
    exportCapabilities: "Exportmöglichkeiten",
  },
  footer: {
    exportWelcome: "Export-Anfragen willkommen.",
    company: "Unternehmen",
    products: "Produkte",
    exportMarkets: "Exportmärkte",
    rights: "Alle Rechte vorbehalten.",
  },
  about: {
    heroEyebrow: "Über Model Oils",
    heroTitle: "Internationaler Schmierstoffexporteur und Yokohama Distributor",
    heroSubtitle:
      "Model Oils ist B2B-Schmierstoffexporteur, Lieferant und Yokohama Distributor für Großhändler, Distributoren und Industriekunden auf internationalen Märkten.",
    focusEyebrow: "Unser Fokus",
    focusTitle: "Für internationale Versorgung ausgelegt",
    focusP1:
      "Wir vertreiben Yokohama Schmierstoffe und Batterien und unterstützen internationale Käufer mit Containerbestellungen, flexibler Versorgung und Exportdokumentation.",
    focusP2: "Unser Team stimmt Produkte und Lieferformate auf die Anforderungen jedes Marktes ab.",
    partnerCta: "Partner von Model Oils werden",
    whyEyebrow: "Warum Model Oils",
    whyTitle: "Zuverlässiger Export- und Vertriebspartner",
  },
  contact: {
    heroEyebrow: "Kontakt",
    heroTitle: "Großhandelsangebot anfordern",
    heroSubtitle: "Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit.",
    legalName: "Eingetragener Firmenname",
    email: "E-Mail",
    whatsapp: "WhatsApp",
    exportInquiries: "Export-Anfragen",
    exportInquiriesValue: "Bitte nutzen Sie das Formular oder WhatsApp.",
    responseTime: "Antwortzeit",
    responseTimeValue: "Innerhalb von 24–48 Stunden.",
    helpText:
      "Unser Export-Team hilft Ihnen bei Produktauswahl, Preisgestaltung und Lieferdetails.",
  },
  exportPage: {
    heroEyebrow: "Export & Großhandel",
    heroTitle: "Bulk-Schmierstoffversorgung für globale Märkte",
    heroSubtitle:
      "Wir unterstützen Distributoren, Großhändler und internationale Käufer mit containerbasierter Versorgung, flexibler Verpackung und Exportdokumentation.",
    requestOffer: "Angebot anfordern",
    capEyebrow: "Export-Kapazitäten",
    capTitle: "Entwickelt für internationale Versorgung",
    packagingEyebrow: "Verpackung",
    packagingTitle: "Flexible Verpackungsformate",
    marketsEyebrow: "Exportmärkte",
    marketsTitle: "Globale Reichweite",
  },
  productDetails: {
    productDescription: "Produktbeschreibung und Anwendungsbereiche",
    productFeatures: "Eigenschaften und Vorteile",
    productStandards: "Zulassungen und Spezifikationen",
    productNotFound: "Produkt nicht gefunden.",
    downloadCatalog: "Katalog herunterladen",
  },
  industriesPage: {
    heroEyebrow: "Bediente Branchen",
    heroTitle: "Schmierstoffe für jeden Sektor",
    heroSubtitle:
      "Von der Automobilindustrie bis zur Industrie, von der Landwirtschaft bis zur Schifffahrt — wir bieten leistungsstarke Schmierstofflösungen für viele verschiedene Sektoren. Mit Motorölen, Hydraulikölen, Getriebeölen, Schmierfetten und speziellen Industrieölen, die auf die Bedürfnisse jedes Sektors abgestimmt sind, steigern wir die Effizienz Ihrer Anlagen und bieten langanhaltenden Schutz.",
    discussCta: "Anforderungen besprechen",
  },
  form: {
    name: "Name",
    company: "Unternehmen",
    country: "Land",
    email: "E-Mail",
    phone: "Telefon / WhatsApp",
    productInterest: "Produktinteresse",
    selectCategory: "Kategorie wählen",
    packagingPref: "Verpackungspräferenz",
    selectPackaging: "Verpackung wählen",
    quantity: "Geschätzte Bestellmenge",
    quantityPlaceholder: "z. B. 1 Container, 20 Paletten",
    message: "Nachricht",
    messagePlaceholder: "Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit.",
    submit: "Großhandelsangebot anfordern",
    submitting: "Wird gesendet...",
    toastTitle: "Anfrage erhalten",
    toastBody:
      "Danke. Unser Export-Team wird ein passendes Angebot vorbereiten und sich bei Ihnen melden.",
    errorTitle: "Fehler",
    errorBody:
      "Ihre Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt eine E-Mail.",
    networkError: "Netzwerkfehler. Bitte schreiben Sie uns direkt an info@modelgrup.com",
  },
  notFound: {
    title: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    goHome: "Zur Startseite",
  },
  errorPage: {
    title: "Diese Seite konnte nicht geladen werden",
    body: "Auf unserer Seite ist etwas schiefgelaufen. Sie können versuchen, die Seite zu aktualisieren, oder zur Startseite zurückkehren.",
    tryAgain: "Erneut versuchen",
    goHome: "Zur Startseite",
  },
  mediaPage: {
    heroTitle: "Medien",
    heroSubtitle: "Unternehmensnachrichten und Medien-Updates von Model Oils.",
  },
  common: {
    backToHome: "Zur Startseite",
    backToBrands: "Zu den Marken",
    backToProducts: "Zu den Produkten",
    catalogs: "Kataloge",
    catalog: "Katalog",
    viewProducts: "Produkte ansehen",
  },
  imgAlt: {
    heroProducts: "YOKOHAMA Motoröle in einem warmen cremefarbenen Industrie-Showroom",
    flagshipFamily: "Präsentation der Yokohama Flaggschiff-Schmierstoff-Produktfamilie",
    exportWarehouse: "Internationales Schmierstoff-Exportlager mit Ölfässern",
    productDisplay: "Yokohama Schmierstoff-Produktpräsentation",
  },
  blogPage: {
    heroTitle: "Technische Ressourcen",
    heroSubtitle:
      "Technische Artikel über Schmierstoffe und Schmierung für Distributoren, Großhändler und industrielle Käufer.",
    generalInfo: "Allgemeine Informationen",
    faq: "Häufig gestellte Fragen",
    backToBlog: "Alle Artikel",
    readMore: "Lesen",
    ctaTitle: "Suchen Sie ein Produkt?",
    ctaBody:
      "Unser technisches Team kann die geeigneten Spezifikationen für Ihre Ausrüstung und Betriebsbedingungen ermitteln.",
  },
};

const fr: UIStrings = {
  nav: {
    products: "Produits lubrifiants",
    catalogs: "Catalogues",
    industries: "Secteurs",
    export: "Export",
    about: "À propos",
    contact: "Contact",
    media: "Médias",
    blog: "Blog",
    brandBadge: "Marque",
    requestQuote: "Demander un devis",
    tagline: "Export de lubrifiants",
    toggleMenu: "Ouvrir/fermer le menu",
    whatsappLabel: "Contactez-nous sur WhatsApp",
  },
  lang: {
    switchToEn: "English",
    switchToTr: "Türkçe",
    switchToRu: "Русский",
    switchToFa: "فارسی",
    switchToAr: "العربية",
    switchToDe: "Deutsch",
    switchToFr: "Français",
    label: "Langue",
  },
  hero: {
    badge: "Export international de lubrifiants",
    titlePre: "Solutions YOKOHAMA pour",
    titleHighlight: "Distributeurs & Grossistes",
    subtitle:
      "Model Oils fournit des huiles moteur YOKOHAMA et des fluides automobiles complémentaires aux distributeurs, grossistes, flottes et acheteurs internationaux.",
    requestQuote: "Demander un devis",
    exploreYokohama: "Explorer les produits YOKOHAMA",
    bulletBulk: "Fourniture en vrac & container",
    bulletPackaging: "Emballage flexible",
    bulletExport: "Prêt à l'export",
  },
  flagship: {
    badge: "Marque distribuée",
    body: "Yokohama est la marque de lubrifiants et de batteries distribuée par Model Oils sur les marchés régionaux et internationaux. Sa large gamme couvre les véhicules particuliers, le transport lourd, l'industrie, le maritime et l'agriculture.",
    becomeDistributor: "Devenir distributeur",
    viewRange: "Voir la gamme Yokohama",
    badges: [
      "Distribution Model Oils",
      "Large gamme",
      "Prêt à l'export",
      "Support technique",
      "Approvisionnement durable",
    ],
  },
  exportHome: {
    eyebrow: "Export & Gros",
    title: "Conçu pour les distributeurs, grossistes et acheteurs internationaux",
    description:
      "Nous soutenons la fourniture de lubrifiants en vrac avec des options d'emballage flexibles, la documentation d'export, les commandes en container et la coopération distributeur à long terme.",
  },
  industriesHome: {
    eyebrow: "Secteurs desservis",
    title: "Lubrifiants pour toutes les opérations",
  },
  whyUs: {
    eyebrow: "Pourquoi Model Oils",
    title: "Un partenaire sérieux pour l'approvisionnement mondial en lubrifiants",
  },
  quoteCta: {
    title: "Prêt à discuter de votre commande en gros ?",
    body: "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume. Notre équipe préparera une offre d'export adaptée.",
    requestWholesale: "Demander un devis en gros",
    exportCapabilities: "Capacités d'export",
  },
  footer: {
    exportWelcome: "Demandes d'export bienvenues.",
    company: "Entreprise",
    products: "Produits",
    exportMarkets: "Marchés d'export",
    rights: "Tous droits réservés.",
  },
  about: {
    heroEyebrow: "À propos de Model Oils",
    heroTitle: "Exportateur international de lubrifiants et distributeur Yokohama",
    heroSubtitle:
      "Model Oils est un exportateur et fournisseur B2B de lubrifiants ainsi qu'un distributeur Yokohama pour les grossistes, distributeurs et acheteurs industriels internationaux.",
    focusEyebrow: "Notre priorité",
    focusTitle: "Conçu pour l'approvisionnement international",
    focusP1:
      "Nous distribuons les lubrifiants et batteries Yokohama et accompagnons les acheteurs internationaux avec les commandes en conteneur, l'approvisionnement flexible et la documentation d'exportation.",
    focusP2:
      "Notre équipe adapte les produits et formats d'approvisionnement aux besoins de chaque marché.",
    partnerCta: "Devenir partenaire de Model Oils",
    whyEyebrow: "Pourquoi Model Oils",
    whyTitle: "Un partenaire fiable pour l'exportation et la distribution",
  },
  contact: {
    heroEyebrow: "Contact",
    heroTitle: "Demander un devis en gros",
    heroSubtitle: "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume.",
    legalName: "Raison sociale",
    email: "E-mail",
    whatsapp: "WhatsApp",
    exportInquiries: "Demandes d'export",
    exportInquiriesValue: "Veuillez utiliser le formulaire ou WhatsApp.",
    responseTime: "Délai de réponse",
    responseTimeValue: "Sous 24 à 48 heures.",
    helpText:
      "Notre équipe export vous aidera dans la sélection des produits, la tarification et les détails de livraison.",
  },
  exportPage: {
    heroEyebrow: "Export & Gros",
    heroTitle: "Approvisionnement en lubrifiants en vrac pour les marchés mondiaux",
    heroSubtitle:
      "Nous soutenons les distributeurs, grossistes et acheteurs internationaux avec un approvisionnement en container, un emballage flexible et une documentation d'export.",
    requestOffer: "Demander une offre",
    capEyebrow: "Capacités d'export",
    capTitle: "Conçu pour l'approvisionnement international",
    packagingEyebrow: "Emballage",
    packagingTitle: "Formats d'emballage flexibles",
    marketsEyebrow: "Marchés d'export",
    marketsTitle: "Portée mondiale",
  },
  productDetails: {
    productDescription: "Description du produit et domaines d'application",
    productFeatures: "Caractéristiques et avantages",
    productStandards: "Approbations et spécifications",
    productNotFound: "Produit introuvable.",
    downloadCatalog: "Télécharger le catalogue",
  },
  industriesPage: {
    heroEyebrow: "Secteurs desservis",
    heroTitle: "Lubrifiants pour chaque secteur",
    heroSubtitle:
      "De l'automobile à l'industrie, de l'agriculture au maritime — nous proposons des solutions de lubrification haute performance adaptées à de nombreux secteurs. Avec des huiles moteur, des huiles hydrauliques, des huiles pour engrenages, des graisses et des lubrifiants industriels spéciaux conçus pour les besoins de chaque secteur, nous améliorons l'efficacité de vos équipements et assurons une protection durable.",
    discussCta: "Discuter des besoins",
  },
  form: {
    name: "Nom",
    company: "Entreprise",
    country: "Pays",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    productInterest: "Intérêt produit",
    selectCategory: "Choisir une catégorie",
    packagingPref: "Préférence d'emballage",
    selectPackaging: "Choisir un emballage",
    quantity: "Quantité estimée de commande",
    quantityPlaceholder: "ex. 1 container, 20 palettes",
    message: "Message",
    messagePlaceholder:
      "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume.",
    submit: "Demander un devis en gros",
    submitting: "Envoi en cours...",
    toastTitle: "Demande reçue",
    toastBody: "Merci. Notre équipe export préparera une offre adaptée et vous contactera.",
    errorTitle: "Erreur",
    errorBody:
      "Votre demande n'a pas pu être envoyée. Veuillez nous contacter directement par e-mail.",
    networkError: "Erreur réseau. Veuillez nous écrire directement à info@modelgrup.com",
  },
  notFound: {
    title: "Page introuvable",
    body: "La page que vous recherchez n'existe pas ou a été déplacée.",
    goHome: "Retour à l'accueil",
  },
  errorPage: {
    title: "Cette page n'a pas pu être chargée",
    body: "Une erreur s'est produite de notre côté. Vous pouvez essayer de rafraîchir la page ou retourner à l'accueil.",
    tryAgain: "Réessayer",
    goHome: "Retour à l'accueil",
  },
  mediaPage: {
    heroTitle: "Médias",
    heroSubtitle: "Actualités de l'entreprise et mises à jour médias de Model Oils.",
  },
  common: {
    backToHome: "Retour à l'accueil",
    backToBrands: "Retour aux marques",
    backToProducts: "Retour aux produits",
    catalogs: "Catalogues",
    catalog: "catalogue",
    viewProducts: "Voir les produits",
  },
  imgAlt: {
    heroProducts:
      "Huiles moteur YOKOHAMA présentées dans un showroom industriel aux tons crème chauds",
    flagshipFamily: "Présentation de la gamme phare de lubrifiants Yokohama",
    exportWarehouse: "Entrepôt international d'exportation de lubrifiants avec fûts d'huile",
    productDisplay: "Présentation de produits lubrifiants Yokohama",
  },
  blogPage: {
    heroTitle: "Ressources techniques",
    heroSubtitle:
      "Articles techniques sur les lubrifiants et la lubrification pour les distributeurs, grossistes et acheteurs industriels.",
    generalInfo: "Informations générales",
    faq: "Questions fréquentes",
    backToBlog: "Tous les articles",
    readMore: "Lire",
    ctaTitle: "Vous cherchez un produit ?",
    ctaBody:
      "Notre équipe technique peut identifier les spécifications adaptées à votre équipement et vos conditions de fonctionnement.",
  },
};

export const UI: Record<Locale, UIStrings> = { en, tr, ru, fa, ar, de, fr };

export type PageKey =
  | "home"
  | "about"
  | "contact"
  | "export"
  | "industries"
  | "yokohama"
  | "media"
  | "blog";

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

function pageMeta(title: string, description: string): PageMeta {
  return { title, description, ogTitle: title, ogDescription: description };
}

export const PAGE_META: Record<Locale, Record<PageKey, PageMeta>> = {
  en: {
    home: pageMeta(
      "Model Oils | Yokohama Lubricants for Export",
      "Yokohama lubricants and batteries for distributors, wholesalers and international buyers.",
    ),
    about: pageMeta(
      "About Model Oils",
      "International lubricant exporter, supplier and Yokohama distributor.",
    ),
    contact: pageMeta(
      "Request a Quote | Model Oils",
      "Contact Model Oils for Yokohama products and wholesale export supply.",
    ),
    export: pageMeta(
      "Export & Wholesale | Model Oils",
      "Container orders, flexible supply and export support for distributors worldwide.",
    ),
    industries: pageMeta(
      "Industries | Model Oils",
      "Lubricant solutions for automotive, industrial, fleet, agriculture and marine operations.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | Distributed by Model Oils",
      "Explore Yokohama oils and VOLT batteries distributed by Model Oils.",
    ),
    media: pageMeta("Media | Model Oils", "Company news and media updates from Model Oils."),
    blog: pageMeta(
      "Blog | Model Oils",
      "Technical lubricant guides and industry resources from Model Oils.",
    ),
  },
  tr: {
    home: pageMeta(
      "Model Oils | İhracat için Yokohama Yağları",
      "Distribütörler, toptancılar ve uluslararası alıcılar için Yokohama yağları ve aküleri.",
    ),
    about: pageMeta(
      "Model Oils Hakkında",
      "Uluslararası yağ ihracatçısı, tedarikçisi ve Yokohama distribütörü.",
    ),
    contact: pageMeta(
      "Teklif Al | Model Oils",
      "Yokohama ürünleri ve toptan ihracat tedariği için Model Oils ile iletişime geçin.",
    ),
    export: pageMeta(
      "İhracat ve Toptan | Model Oils",
      "Dünya genelindeki distribütörler için konteyner siparişi, esnek tedarik ve ihracat desteği.",
    ),
    industries: pageMeta(
      "Sektörler | Model Oils",
      "Otomotiv, endüstri, filo, tarım ve denizcilik için yağ çözümleri.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | Model Oils Distribütörlüğü",
      "Model Oils distribütörlüğündeki Yokohama yağlarını ve VOLT akülerini keşfedin.",
    ),
    media: pageMeta(
      "Medya | Model Oils",
      "Model Oils'tan şirket haberleri ve medya güncellemeleri.",
    ),
    blog: pageMeta(
      "Blog | Model Oils",
      "Model Oils'tan teknik yağ rehberleri ve sektör kaynakları.",
    ),
  },
  ru: {
    home: pageMeta(
      "Model Oils | Смазочные материалы Yokohama для экспорта",
      "Смазочные материалы и аккумуляторы Yokohama для международных дистрибьюторов и оптовиков.",
    ),
    about: pageMeta(
      "О Model Oils",
      "Международный экспортёр, поставщик смазочных материалов и дистрибьютор Yokohama.",
    ),
    contact: pageMeta(
      "Запросить предложение | Model Oils",
      "Свяжитесь с Model Oils по продукции Yokohama и оптовым экспортным поставкам.",
    ),
    export: pageMeta(
      "Экспорт и оптовые поставки | Model Oils",
      "Контейнерные заказы, гибкие поставки и экспортная поддержка.",
    ),
    industries: pageMeta(
      "Отрасли | Model Oils",
      "Смазочные решения для транспорта, промышленности, сельского хозяйства и флота.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | Дистрибьютор Model Oils",
      "Откройте масла Yokohama и аккумуляторы VOLT от Model Oils.",
    ),
    media: pageMeta("Медиа | Model Oils", "Новости компании и медиа-обновления Model Oils."),
    blog: pageMeta(
      "Блог | Model Oils",
      "Технические руководства и отраслевые материалы Model Oils.",
    ),
  },
  fa: {
    home: pageMeta(
      "Model Oils | روانکارهای Yokohama برای صادرات",
      "روانکارها و باتری‌های Yokohama برای توزیع‌کنندگان و خریداران بین‌المللی.",
    ),
    about: pageMeta(
      "درباره Model Oils",
      "صادرکننده و تأمین‌کننده بین‌المللی روانکار و توزیع‌کننده Yokohama.",
    ),
    contact: pageMeta(
      "درخواست قیمت | Model Oils",
      "برای محصولات Yokohama و تأمین صادراتی با Model Oils تماس بگیرید.",
    ),
    export: pageMeta(
      "صادرات و عمده‌فروشی | Model Oils",
      "سفارش کانتینری، تأمین انعطاف‌پذیر و پشتیبانی صادراتی.",
    ),
    industries: pageMeta(
      "صنایع | Model Oils",
      "راهکارهای روانکاری برای خودرو، صنعت، ناوگان، کشاورزی و دریانوردی.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | توزیع Model Oils",
      "روغن‌های Yokohama و باتری‌های VOLT را مشاهده کنید.",
    ),
    media: pageMeta("رسانه | Model Oils", "اخبار شرکت و به‌روزرسانی‌های رسانه‌ای Model Oils."),
    blog: pageMeta("وبلاگ | Model Oils", "راهنماهای فنی روانکار و منابع صنعتی Model Oils."),
  },
  ar: {
    home: pageMeta(
      "Model Oils | زيوت Yokohama للتصدير",
      "زيوت وبطاريات Yokohama للموزعين وتجار الجملة والمشترين الدوليين.",
    ),
    about: pageMeta("عن Model Oils", "مصدّر ومورد دولي للزيوت وموزع Yokohama."),
    contact: pageMeta(
      "طلب عرض سعر | Model Oils",
      "تواصل مع Model Oils لمنتجات Yokohama والتوريد بالجملة للتصدير.",
    ),
    export: pageMeta(
      "التصدير والجملة | Model Oils",
      "طلبات الحاويات والتوريد المرن ودعم التصدير للموزعين.",
    ),
    industries: pageMeta(
      "القطاعات | Model Oils",
      "حلول زيوت للسيارات والصناعة والأساطيل والزراعة والبحرية.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | توزيع Model Oils",
      "استكشف زيوت Yokohama وبطاريات VOLT من Model Oils.",
    ),
    media: pageMeta("الوسائط | Model Oils", "أخبار الشركة وتحديثات Model Oils الإعلامية."),
    blog: pageMeta("المدونة | Model Oils", "أدلة فنية للزيوت وموارد صناعية من Model Oils."),
  },
  de: {
    home: pageMeta(
      "Model Oils | Yokohama Schmierstoffe für den Export",
      "Yokohama Schmierstoffe und Batterien für Distributoren, Großhändler und internationale Käufer.",
    ),
    about: pageMeta(
      "Über Model Oils",
      "Internationaler Schmierstoffexporteur, Lieferant und Yokohama Distributor.",
    ),
    contact: pageMeta(
      "Angebot anfordern | Model Oils",
      "Kontaktieren Sie Model Oils für Yokohama Produkte und Exportversorgung.",
    ),
    export: pageMeta(
      "Export & Großhandel | Model Oils",
      "Containerbestellungen, flexible Versorgung und Exportunterstützung.",
    ),
    industries: pageMeta(
      "Branchen | Model Oils",
      "Schmierstofflösungen für Automotive, Industrie, Flotten, Landwirtschaft und Marine.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | Vertrieb durch Model Oils",
      "Entdecken Sie Yokohama Öle und VOLT Batterien von Model Oils.",
    ),
    media: pageMeta(
      "Medien | Model Oils",
      "Unternehmensnachrichten und Medien-Updates von Model Oils.",
    ),
    blog: pageMeta(
      "Blog | Model Oils",
      "Technische Schmierstoffratgeber und Branchenressourcen von Model Oils.",
    ),
  },
  fr: {
    home: pageMeta(
      "Model Oils | Lubrifiants Yokohama pour l'export",
      "Lubrifiants et batteries Yokohama pour distributeurs, grossistes et acheteurs internationaux.",
    ),
    about: pageMeta(
      "À propos de Model Oils",
      "Exportateur international de lubrifiants, fournisseur et distributeur Yokohama.",
    ),
    contact: pageMeta(
      "Demander un devis | Model Oils",
      "Contactez Model Oils pour les produits Yokohama et l'approvisionnement export.",
    ),
    export: pageMeta(
      "Export & Gros | Model Oils",
      "Commandes en conteneur, approvisionnement flexible et soutien export.",
    ),
    industries: pageMeta(
      "Secteurs | Model Oils",
      "Solutions lubrifiantes pour l'automobile, l'industrie, les flottes, l'agriculture et le maritime.",
    ),
    yokohama: pageMeta(
      "Yokohama Motor Oil | Distribué par Model Oils",
      "Découvrez les huiles Yokohama et batteries VOLT distribuées par Model Oils.",
    ),
    media: pageMeta(
      "Médias | Model Oils",
      "Actualités de l'entreprise et mises à jour médias de Model Oils.",
    ),
    blog: pageMeta(
      "Blog | Model Oils",
      "Guides techniques et ressources sur les lubrifiants de Model Oils.",
    ),
  },
};
