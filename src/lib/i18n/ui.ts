import type { Locale } from "./types";

export type NavKey = "hiTech" | "products" | "industries" | "export" | "about" | "contact" | "media" | "blog";

export interface UIStrings {
  nav: {
    hiTech: string;
    products: string;
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
    exploreHiTech: string;
    bulletBulk: string;
    bulletPackaging: string;
    bulletExport: string;
  };
  flagship: {
    badge: string;
    body: string;
    becomeDistributor: string;
    viewRange: string;
  };
  categoriesSection: { eyebrow: string; title: string; description: string };
  exportHome: { eyebrow: string; title: string; description: string };
  industriesHome: { eyebrow: string; title: string };
  whyUs: { eyebrow: string; title: string };
  catalog: { eyebrow: string; title: string; description: string; disclaimer: string };
  quoteCta: { title: string; body: string; requestWholesale: string; exportCapabilities: string };
  footer: {
    taglinePre: string;
    taglinePost: string;
    exportWelcome: string;
    company: string;
    products: string;
    exportMarkets: string;
    rights: string;
  };
  card: { requestQuote: string; spec: string; packaging: string };
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
  hitech: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    becomeDistributor: string;
    whyEyebrow: string;
    whyTitle: string;
    bullets: string[];
    rangeEyebrow: string;
    rangeTitle: string;
    rangeDescription: string;
    lightCommercial: string;
    productDescription: string;
    productFeatures: string;
    productStandards: string;
    productPackaging: string;
    productNotFound: string;
    zoomImage: string;
  };
  industriesPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    discussCta: string;
  };
  productsPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    catEyebrow: string;
    catTitle: string;
    prodEyebrow: string;
    prodTitle: string;
    prodDescription: string;
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
  mediaPage: { heroTitle: string; heroSubtitle: string; galleryEyebrow: string };
  common: { backToHome: string; backToBrands: string; backToProducts: string; catalogs: string; catalog: string; viewProducts: string };
  imgAlt: { heroProducts: string; flagshipFamily: string; exportWarehouse: string; productDisplay: string };
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
    hiTech: "HI-TECH Lubricants",
    products: "Products",
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
    titlePre: "HI-TECH Oil Solutions for",
    titleHighlight: "Distributors & Wholesalers",
    subtitle:
      "Model Oils supplies HI-TECH motor oils, diesel oils, hydraulic oils, gear oils, antifreeze, greases and industrial lubricants for distributors, wholesalers, fleets and international buyers.",
    requestQuote: "Request a Quote",
    exploreHiTech: "Explore HI-TECH Products",
    bulletBulk: "Bulk & container supply",
    bulletPackaging: "Flexible packaging",
    bulletExport: "Export ready",
  },
  flagship: {
    badge: "Flagship Brand",
    body: "HI-TECH is Model Oils' flagship lubricant product line, created for international wholesale, distributor, fleet, service, and industrial markets. It is the heart of our export program — engineered for performance and built for global supply.",
    becomeDistributor: "Become a Distributor",
    viewRange: "View HI-TECH Range",
  },
  categoriesSection: {
    eyebrow: "Product Range",
    title: "A Complete Lubricant Portfolio",
    description:
      "From passenger car motor oils to industrial lubricants and specialty fluids — supplied in packaging built for retail, workshop and bulk export demand.",
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
  catalog: {
    eyebrow: "Catalog & Supply Brands",
    title: "HI-TECH Leads, Catalog Brands Support",
    description:
      "HI-TECH is our owned flagship brand. Alongside it, we can supply selected catalog and represented lubricant brands as secondary options to complete your sourcing needs.",
    disclaimer: "Brand names shown are placeholders. Catalog brands are secondary to the HI-TECH flagship range.",
  },
  quoteCta: {
    title: "Ready to Discuss Your Wholesale Order?",
    body: "Tell us your target country, product type, packaging, and volume. Our team will prepare a suitable export offer.",
    requestWholesale: "Request Wholesale Quote",
    exportCapabilities: "Export Capabilities",
  },
  footer: {
    taglinePre: "International B2B lubricant exporter and supplier. Home of the",
    taglinePost: "lubricant brand for distributors, wholesalers and industrial buyers worldwide.",
    exportWelcome: "Export inquiries welcome worldwide",
    company: "Company",
    products: "Products",
    exportMarkets: "Export Markets",
    rights: "All rights reserved.",
  },
  card: {
    requestQuote: "Request Quote",
    spec: "Spec",
    packaging: "Packaging",
  },
  about: {
    heroEyebrow: "About Model Oils",
    heroTitle: "An International Lubricant Exporter With Its Own Brand",
    heroSubtitle:
      "Model Oils is a B2B lubricant exporter and supplier, home of the HI-TECH lubricant brand. We focus on serving distributors, wholesalers and industrial buyers across global export markets.",
    focusEyebrow: "Our Focus",
    focusTitle: "Export-Oriented, Distributor-Driven",
    focusP1:
      "Our operations are built around international supply — container ordering, flexible packaging and cross-border shipping. With HI-TECH as our flagship brand and a wide supporting product range, we help partners build sustainable lubricant businesses in their markets.",
    focusP2:
      "We work with distributors, wholesalers, importers, fleet companies, service networks, industrial buyers, auto spare parts companies and oil resellers.",
    partnerCta: "Partner With Us",
    whyEyebrow: "Why Partner With Us",
    whyTitle: "What We Bring to Distributors",
  },
  contact: {
    heroEyebrow: "Request a Quote",
    heroTitle: "Let's Build Your Export Offer",
    heroSubtitle:
      "Tell us your target country, product type, packaging, and volume. Our team will prepare a suitable export offer.",
    email: "Email",
    whatsapp: "WhatsApp",
    exportInquiries: "Export Inquiries",
    exportInquiriesValue: "Welcome worldwide",
    responseTime: "Response Time",
    responseTimeValue: "Typically within 1–2 business days",
    helpText:
      "Whether you are a distributor, wholesaler, importer or fleet operator, share your requirements and our team will match the right HI-TECH products and packaging for your market.",
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
  hitech: {
    heroEyebrow: "Flagship Brand",
    heroTitle: "HI-TECH — The Heart of Model Oils",
    heroSubtitle:
      "HI-TECH is Model Oils' flagship lubricant product line, created for international wholesale, distributor, fleet, service, and industrial markets.",
    becomeDistributor: "Become a HI-TECH Distributor",
    whyEyebrow: "Why HI-TECH",
    whyTitle: "One Brand. Built for Global Supply.",
    bullets: [
      "Engineered as a complete lubricant family across automotive and industrial needs.",
      "Designed for export with flexible packaging from 1L bottles to 208L barrels and IBC.",
      "Backed by technical support to match the right product to your market.",
      "Distributor-friendly cooperation for long-term, repeatable supply.",
    ],
    rangeEyebrow: "HI-TECH Range",
    rangeTitle: "Featured HI-TECH Products",
    rangeDescription:
      "Specifications shown are editable placeholders. We do not claim API, ACEA, OEM or ISO approvals unless documentation is provided.",
    lightCommercial: "Light Commercial Vehicles",
    productDescription: "Product Description and Application Areas",
    productFeatures: "Features and Benefits",
    productStandards: "Approvals and Specifications",
    productPackaging: "Packaging Options",
    productNotFound: "Product not found.",
    zoomImage: "Enlarge image",
  },
  industriesPage: {
    heroEyebrow: "Industries Served",
    heroTitle: "Lubricants for Every Operation",
    heroSubtitle:
      "From passenger vehicles to heavy industry, Model Oils supports a wide range of sectors with the right products and packaging.",
    discussCta: "Discuss Your Requirements",
  },
  productsPage: {
    heroEyebrow: "Product Range",
    heroTitle: "Lubricant Categories & HI-TECH Products",
    heroSubtitle:
      "A complete portfolio of automotive and industrial lubricants, supplied in flexible packaging from 1L bottles to 208L barrels and IBC totes.",
    catEyebrow: "Categories",
    catTitle: "Browse by Category",
    prodEyebrow: "HI-TECH Products",
    prodTitle: "Featured Product List",
    prodDescription:
      "Viscosity grades and specifications are editable placeholders. We do not claim API, ACEA, OEM approval, ISO certification or lab results unless documentation is provided.",
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
    heroTitle: "Media & Events",
    heroSubtitle: "Fairs, motorsport sponsorships, and off-road activities",
    galleryEyebrow: "Gallery",
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
    heroProducts: "HI-TECH premium motor oils displayed in a dark industrial export environment",
    flagshipFamily: "HI-TECH flagship lubricant product family display",
    exportWarehouse: "International lubricant export warehouse with oil drums",
    productDisplay: "HI-TECH lubricant product display",
  },
  blogPage: {
    heroTitle: "Technical Resources",
    heroSubtitle: "Technical articles on lubricants and lubrication for distributors, wholesalers and industrial buyers.",
    generalInfo: "General Information",
    faq: "Frequently Asked Questions",
    backToBlog: "All Articles",
    readMore: "Read",
    ctaTitle: "Looking for a product?",
    ctaBody: "Our technical team can determine the right specifications for your equipment and operating conditions.",
  },
};

const tr: UIStrings = {
  nav: {
    hiTech: "HI-TECH Yağlayıcılar",
    products: "Markalarımız",
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
    titleHighlight: "HI-TECH Yağ Çözümleri",
    subtitle:
      "Model Oils; distribütörler, toptancılar, filolar ve uluslararası alıcılar için HI-TECH ürünleriyle tüm sektörlere cevap vermektedir.",
    requestQuote: "Teklif Al",
    exploreHiTech: "HI-TECH Ürünlerini Keşfedin",
    bulletBulk: "Dökme ve konteyner tedariği",
    bulletPackaging: "Esnek ambalaj",
    bulletExport: "İhracata hazır",
  },
    flagship: {
      badge: "Kendi Markamız",
    body: "HI-TECH, Model Oils'in uluslararası toptan, distribütör, filo, servis ve endüstriyel pazarlar için oluşturduğu amiral yağ ürün serisidir. İhracat programımızın kalbidir — performans için tasarlanmış ve küresel tedarik için üretilmiştir.",
    becomeDistributor: "Distribütör Olun",
    viewRange: "HI-TECH Serisini Görün",
  },
  categoriesSection: {
    eyebrow: "Ürün Yelpazesi",
    title: "Eksiksiz Bir Yağ Portföyü",
    description:
      "Binek araç motor yağlarından endüstriyel yağlara ve özel akışkanlara kadar — perakende, atölye ve dökme ihracat talebine uygun ambalajlarla tedarik edilir.",
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
  catalog: {
    eyebrow: "Katalog ve Tedarik Markaları",
    title: "HI-TECH Önderlik Eder, Katalog Markaları Destekler",
    description:
      "HI-TECH bizim sahibi olduğumuz amiral markadır. Onun yanında, tedarik ihtiyaçlarınızı tamamlamak için seçili katalog ve temsil edilen yağ markalarını ikincil seçenek olarak sağlayabiliriz.",
    disclaimer: "Gösterilen marka adları örnektir. Katalog markaları, HI-TECH amiral serisine göre ikincildir.",
  },
  quoteCta: {
    title: "Toptan Siparişinizi Görüşmeye Hazır mısınız?",
    body: "Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin. Ekibimiz size uygun bir ihracat teklifi hazırlayacaktır.",
    requestWholesale: "Toptan Teklif Al",
    exportCapabilities: "İhracat Kabiliyetleri",
  },
  footer: {
    taglinePre: "Uluslararası B2B yağ ihracatçısı ve tedarikçisi. Dünya genelinde distribütörler, toptancılar ve endüstriyel alıcılar için",
    taglinePost: "yağ markasının evi.",
    exportWelcome: "İhracat talepleri dünya genelinde memnuniyetle karşılanır",
    company: "Şirket",
    products: "Ürünler",
    exportMarkets: "İhracat Pazarları",
    rights: "Tüm hakları saklıdır.",
  },
  card: {
    requestQuote: "Teklif Al",
    spec: "Özellik",
    packaging: "Ambalaj",
  },
  about: {
    heroEyebrow: "Model Oils Hakkında",
    heroTitle: "Kendi Markasına Sahip Uluslararası Bir Yağ İhracatçısı",
    heroSubtitle:
      "Model Oils, HI-TECH yağ markasının evi olan bir B2B yağ ihracatçısı ve tedarikçisidir. Küresel ihracat pazarlarında distribütörlere, toptancılara ve endüstriyel alıcılara hizmet vermeye odaklanıyoruz.",
    focusEyebrow: "Odağımız",
    focusTitle: "İhracat Odaklı, Distribütör Yönlü",
    focusP1:
      "Operasyonlarımız uluslararası tedarik etrafında kuruludur — konteyner siparişi, esnek ambalaj ve sınır ötesi sevkiyat. Amiral markamız HI-TECH ve geniş bir destekleyici ürün yelpazesiyle, ortaklarımızın kendi pazarlarında sürdürülebilir yağ işleri kurmasına yardımcı oluyoruz.",
    focusP2:
      "Distribütörler, toptancılar, ithalatçılar, filo şirketleri, servis ağları, endüstriyel alıcılar, oto yedek parça firmaları ve yağ satıcılarıyla çalışıyoruz.",
    partnerCta: "Bizimle Ortak Olun",
    whyEyebrow: "Neden Bizimle Ortak Olmalısınız",
    whyTitle: "Distribütörlere Sunduklarımız",
  },
  contact: {
    heroEyebrow: "Teklif Al",
    heroTitle: "İhracat Teklifinizi Birlikte Oluşturalım",
    heroSubtitle:
      "Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin. Ekibimiz size uygun bir ihracat teklifi hazırlayacaktır.",
    email: "E-posta",
    whatsapp: "WhatsApp",
    exportInquiries: "İhracat Talepleri",
    exportInquiriesValue: "Dünya genelinde memnuniyetle karşılanır",
    responseTime: "Yanıt Süresi",
    responseTimeValue: "Genellikle 1–2 iş günü içinde",
    helpText:
      "İster distribütör, ister toptancı, ithalatçı veya filo operatörü olun, ihtiyaçlarınızı paylaşın; ekibimiz pazarınıza uygun HI-TECH ürünlerini ve ambalajı eşleştirecektir.",
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
    hitech: {
      heroEyebrow: "Kendi Markamız",
    heroTitle: "HI-TECH-Model Oils'in Güvenilir Yağ Markası",
    heroSubtitle:
      "HI-TECH, Model Oils'in uluslararası toptan, distribütör, filo, servis ve endüstriyel pazarlar için oluşturduğu amiral yağ ürün serisidir.",
    becomeDistributor: "HI-TECH Distribütörü Olun",
    whyEyebrow: "Neden HI-TECH",
    whyTitle: "Tek Marka. Küresel Tedarik için Üretildi.",
    bullets: [
      "Otomotiv ve endüstriyel ihtiyaçlar genelinde eksiksiz bir yağ ailesi olarak tasarlandı.",
      "1L şişelerden 200L varillere kadar esnek ambalajla ihracat için tasarlandı.",
      "Pazarınıza doğru ürünü eşleştirmek için teknik destekle desteklenir.",
      "Uzun vadeli, tekrarlanabilir tedarik için distribütör dostu iş birliği.",
    ],
    rangeEyebrow: "HI-TECH Serisi",
    rangeTitle: "Kategorilerimiz",
    rangeDescription: "Gösterilen spesifikasyonlar düzenlenebilir örneklerdir. Belgelenmediği sürece API, ACEA, OEM veya ISO onayı talep edilmemektedir.",
    lightCommercial: "Hafif Ticari Araçlar",
    productDescription: "Ürün Tanımı ve Kullanım Alanları",
    productFeatures: "Özellikleri ve Faydaları",
    productStandards: "Karşıladığı Onay ve Şartnameler",
    productPackaging: "Ambalaj Çeşitleri",
    productNotFound: "Ürün bulunamadı.",
    zoomImage: "Resmi büyüt",
  },
  industriesPage: {
    heroEyebrow: "Hizmet Verilen Sektörler",
    heroTitle: "Her Operasyon için Yağlar",
    heroSubtitle:
      "Binek araçlardan ağır sanayiye kadar Model Oils, doğru ürünler ve ambalajla geniş bir sektör yelpazesini destekler.",
    discussCta: "İhtiyaçlarınızı Görüşün",
  },
  productsPage: {
    heroEyebrow: "Ürün Yelpazesi",
    heroTitle: "Yağ Kategorileri & HI-TECH Ürünleri",
    heroSubtitle: "1L şişelerden 200L varillere kadar esnek ambalajlarda tedarik edilen eksiksiz otomotiv ve endüstriyel yağ portföyü.",
    catEyebrow: "Kategoriler",
    catTitle: "Kategoriye Göre İnceleyin",
    prodEyebrow: "HI-TECH Ürünleri",
    prodTitle: "Öne Çıkan Ürün Listesi",
    prodDescription:
      "Viskozite kademeleri ve özellikler düzenlenebilir örneklerdir. Belgelenmediği sürece API, ACEA, OEM onayı, ISO sertifikası veya laboratuvar sonucu iddia etmiyoruz.",
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
    heroTitle: "Medya & Etkinlikler",
    heroSubtitle: "Fuarlar, motor sporları sponsorlukları ve off-road aktiviteleri",
    galleryEyebrow: "Galeri",
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
    heroProducts: "Koyu, endüstriyel bir ihracat ortamında sergilenen HI-TECH premium motor yağları",
    flagshipFamily: "HI-TECH amiral ürün ailesi sergisi",
    exportWarehouse: "Varillerle dolu uluslararası madeni yağ ihracat deposu",
    productDisplay: "HI-TECH madeni yağ ürün sergisi",
  },
  blogPage: {
    heroTitle: "Teknik Kaynaklar",
    heroSubtitle: "Distribütörler, toptancılar ve endüstriyel alıcılar için yağlar ve yağlama üzerine teknik makaleler.",
    generalInfo: "Genel Bilgi",
    faq: "Sıkça Sorulan Sorular",
    backToBlog: "Tüm Makaleler",
    readMore: "Oku",
    ctaTitle: "Ürün mü arıyorsunuz?",
    ctaBody: "Teknik ekibimiz ekipmanınıza ve çalışma koşullarınıza uygun teknik özellikleri belirleyebilir.",
  },
};

const ru: UIStrings = {
  nav: {
    hiTech: "HI-TECH Смазочные",
    products: "Продукты",
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
    titlePre: "HI-TECH смазочные решения для",
    titleHighlight: "Дистрибьюторов и оптовиков",
    subtitle:
      "Model Oils поставляет HI-TECH моторные масла, дизельные масла, гидравлические масла, трансмиссионные масла, антифриз, смазки и промышленные смазочные материалы для дистрибьюторов, оптовиков, автопарков и международных покупателей.",
    requestQuote: "Запросить цену",
    exploreHiTech: "Изучить продукты HI-TECH",
    bulletBulk: "Навалом и в контейнерах",
    bulletPackaging: "Гибкая упаковка",
    bulletExport: "Готово к экспорту",
  },
  flagship: {
    badge: "Флагманский бренд",
    body: "HI-TECH — флагманская линейка смазочных материалов Model Oils, созданная для международного оптового, дистрибьюторского, автопаркового, сервисного и промышленного рынков. Это сердце нашей экспортной программы — разработана для высокой производительности и глобальных поставок.",
    becomeDistributor: "Стать дистрибьютором",
    viewRange: "Посмотреть линейку HI-TECH",
  },
  categoriesSection: {
    eyebrow: "Ассортимент продукции",
    title: "Полный портфель смазочных материалов",
    description:
      "От моторных масел для легковых автомобилей до промышленных смазок и специальных жидкостей — в упаковке для розничных, мастерских и оптовых экспортных нужд.",
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
  catalog: {
    eyebrow: "Каталог и торговые марки",
    title: "HI-TECH ведёт, каталог поддерживает",
    description:
      "HI-TECH — наш собственный флагманский бренд. Наряду с ним мы можем поставлять выбранные каталожные и представленные марки смазочных материалов как дополнительные варианты для ваших потребностей в поставках.",
    disclaimer: "Показанные названия брендов являются примерами. Каталожные бренды второстепенны относительно флагманской линейки HI-TECH.",
  },
  quoteCta: {
    title: "Готовы обсудить оптовый заказ?",
    body: "Сообщите нам целевую страну, тип продукта, упаковку и объём. Наша команда подготовит подходящее экспортное предложение.",
    requestWholesale: "Запросить оптовое предложение",
    exportCapabilities: "Экспортные возможности",
  },
  footer: {
    taglinePre: "Международный B2B экспортёр и поставщик смазочных материалов. Дом бренда",
    taglinePost: "для дистрибьюторов, оптовиков и промышленных покупателей по всему миру.",
    exportWelcome: "Экспортные запросы приветствуются по всему миру",
    company: "Компания",
    products: "Продукты",
    exportMarkets: "Рынки сбыта",
    rights: "Все права защищены.",
  },
  card: {
    requestQuote: "Запросить цену",
    spec: "Характеристики",
    packaging: "Упаковка",
  },
  about: {
    heroEyebrow: "О компании Model Oils",
    heroTitle: "Международный экспортёр смазочных материалов со своим брендом",
    heroSubtitle:
      "Model Oils — B2B экспортёр и поставщик смазочных материалов, дом бренда HI-TECH. Мы сосредоточены на обслуживании дистрибьюторов, оптовиков и промышленных покупателей на глобальных экспортных рынках.",
    focusEyebrow: "Наш фокус",
    focusTitle: "Ориентировано на экспорт, управляемо дистрибьюторами",
    focusP1:
      "Наша деятельность выстроена вокруг международных поставок — контейнерные заказы, гибкая упаковка и трансграничная доставка. С HI-TECH в качестве нашего флагманского бренда и широким ассортиментом сопутствующей продукции мы помогаем партнёрам строить устойчивый бизнес по продаже смазочных материалов на их рынках.",
    focusP2:
      "Мы работаем с дистрибьюторами, оптовиками, импортёрами, автопарковыми компаниями, сервисными сетями, промышленными покупателями, компаниями по продаже автозапчастей и реселлерами масел.",
    partnerCta: "Стать партнёром",
    whyEyebrow: "Почему стоит стать нашим партнёром",
    whyTitle: "Что мы предлагаем дистрибьюторам",
  },
  contact: {
    heroEyebrow: "Запросить цену",
    heroTitle: "Давайте создадим ваше экспортное предложение",
    heroSubtitle:
      "Сообщите нам целевую страну, тип продукта, упаковку и объём. Наша команда подготовит подходящее экспортное предложение.",
    email: "Электронная почта",
    whatsapp: "WhatsApp",
    exportInquiries: "Экспортные запросы",
    exportInquiriesValue: "Принимаются по всему миру",
    responseTime: "Время ответа",
    responseTimeValue: "Обычно в течение 1–2 рабочих дней",
    helpText:
      "Являетесь ли вы дистрибьютором, оптовиком, импортёром или оператором автопарка, поделитесь своими требованиями, и наша команда подберёт правильные продукты HI-TECH и упаковку для вашего рынка.",
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
  hitech: {
    heroEyebrow: "Флагманский бренд",
    heroTitle: "HI-TECH — сердце Model Oils",
    heroSubtitle:
      "HI-TECH — флагманская линейка смазочных материалов Model Oils, созданная для международного оптового, дистрибьюторского, автопаркового, сервисного и промышленного рынков.",
    becomeDistributor: "Стать дистрибьютором HI-TECH",
    whyEyebrow: "Почему HI-TECH",
    whyTitle: "Один бренд. Создан для глобальных поставок.",
    bullets: [
      "Разработана как полная линейка смазочных материалов для автомобильных и промышленных нужд.",
      "Создана для экспорта с гибкой упаковкой от 1L флаконов до 208L бочек и IBC.",
      "Поддерживается технической помощью для подбора нужного продукта для вашего рынка.",
      "Дистрибьюторское сотрудничество для долгосрочных и повторяющихся поставок.",
    ],
    rangeEyebrow: "Линейка HI-TECH",
    rangeTitle: "Избранные продукты HI-TECH",
    rangeDescription:
      "Показанные характеристики являются редактируемыми примерами. Мы не заявляем об одобрениях API, ACEA, OEM или ISO, если документация не предоставлена.",
    lightCommercial: "Лёгкие коммерческие автомобили",
    productDescription: "Описание продукта и области применения",
    productFeatures: "Характеристики и преимущества",
    productStandards: "Допуски и спецификации",
    productPackaging: "Варианты упаковки",
    productNotFound: "Продукт не найден.",
    zoomImage: "Увеличить изображение",
  },
  industriesPage: {
    heroEyebrow: "Обслуживаемые отрасли",
    heroTitle: "Смазочные материалы для любого производства",
    heroSubtitle:
      "От легковых автомобилей до тяжёлой промышленности, Model Oils поддерживает широкий спектр секторов с правильными продуктами и упаковкой.",
    discussCta: "Обсудить ваши требования",
  },
  productsPage: {
    heroEyebrow: "Ассортимент продукции",
    heroTitle: "Категории смазочных материалов и продукты HI-TECH",
    heroSubtitle:
      "Полный портфель автомобильных и промышленных смазочных материалов, поставляемых в гибкой упаковке от 1L флаконов до 208L бочек и IBC.",
    catEyebrow: "Категории",
    catTitle: "Выбрать по категории",
    prodEyebrow: "Продукты HI-TECH",
    prodTitle: "Список избранных продуктов",
    prodDescription:
      "Классы вязкости и характеристики являются редактируемыми примерами. Мы не заявляем об одобрениях API, ACEA, OEM, сертификации ISO или лабораторных результатах, если документация не предоставлена.",
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
    toastBody: "Спасибо. Наша экспортная команда подготовит подходящее предложение и свяжется с вами.",
    errorTitle: "Ошибка",
    errorBody: "Не удалось отправить запрос. Пожалуйста, напишите нам напрямую по электронной почте.",
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
    heroTitle: "Медиа и события",
    heroSubtitle: "Выставки, спонсорство в автоспорте и внедорожные мероприятия",
    galleryEyebrow: "Галерея",
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
    heroProducts: "Премиальные моторные масла HI-TECH в тёмной промышленной экспортной среде",
    flagshipFamily: "Витрина флагманского семейства смазочных материалов HI-TECH",
    exportWarehouse: "Международный склад экспорта смазочных материалов с бочками масла",
    productDisplay: "Витрина смазочных материалов HI-TECH",
  },
  blogPage: {
    heroTitle: "Технические ресурсы",
    heroSubtitle: "Технические статьи о смазочных материалах для дистрибьюторов, оптовиков и промышленных покупателей.",
    generalInfo: "Общая информация",
    faq: "Часто задаваемые вопросы",
    backToBlog: "Все статьи",
    readMore: "Читать",
    ctaTitle: "Ищете продукт?",
    ctaBody: "Наша техническая команда поможет подобрать подходящие характеристики для вашего оборудования и условий эксплуатации.",
  },
};

const fa: UIStrings = {
  nav: {
    hiTech: "HI-TECH روانکارها",
    products: "محصولات",
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
    titlePre: "راهکارهای روانکار HI-TECH برای",
    titleHighlight: "توزیع‌کنندگان و عمده‌فروشان",
    subtitle:
      "Model Oils روغن موتور، روغن دیزل، روغن هیدرولیک، روغن گیربکس، ضدیخ، گریس و روانکارهای صنعتی HI-TECH را برای توزیع‌کنندگان، عمده‌فروشان، ناوگان‌ها و خریداران بین‌المللی تأمین می‌کند.",
    requestQuote: "درخواست قیمت",
    exploreHiTech: "مشاهده محصولات HI-TECH",
    bulletBulk: "تأمین فله و کانتینری",
    bulletPackaging: "بسته‌بندی انعطاف‌پذیر",
    bulletExport: "آماده صادرات",
  },
  flagship: {
    badge: "برند پرچمدار",
    body: "HI-TECH خط تولید روانکار پرچمدار Model Oils است که برای بازارهای بین‌المللی عمده‌فروشی، توزیع‌کننده، ناوگان، خدمات و صنعتی ایجاد شده است. این قلب برنامه صادراتی ماست — طراحی‌شده برای عملکرد و ساخته‌شده برای تأمین جهانی.",
    becomeDistributor: "توزیع‌کننده شوید",
    viewRange: "مشاهده محدوده HI-TECH",
  },
  categoriesSection: {
    eyebrow: "محدوده محصولات",
    title: "پرتفوی کامل روانکار",
    description:
      "از روغن موتور خودروهای سواری تا روانکارهای صنعتی و مایعات ویژه — در بسته‌بندی مناسب برای تقاضای خرده‌فروشی، کارگاه و صادرات فله.",
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
  catalog: {
    eyebrow: "کاتالوگ و برندهای تأمین",
    title: "HI-TECH پیشرو، کاتالوگ پشتیبان",
    description:
      "HI-TECH برند پرچمدار مالکیتی ماست. در کنار آن، می‌توانیم برندهای کاتالوگ و نمایندگی‌شده منتخب روانکار را به عنوان گزینه‌های ثانویه برای تکمیل نیازهای تأمین شما ارائه دهیم.",
    disclaimer: "نام برندهای نشان‌داده‌شده نمونه هستند. برندهای کاتالوگ نسبت به محدوده پرچمدار HI-TECH ثانویه‌اند.",
  },
  quoteCta: {
    title: "آماده بحث درباره سفارش عمده خود هستید؟",
    body: "کشور هدف، نوع محصول، بسته‌بندی و حجم خود را به ما بگویید. تیم ما یک پیشنهاد صادراتی مناسب آماده خواهد کرد.",
    requestWholesale: "درخواست قیمت عمده",
    exportCapabilities: "قابلیت‌های صادراتی",
  },
  footer: {
    taglinePre: "صادرکننده و تأمین‌کننده بین‌المللی B2B روانکار. خانه برند",
    taglinePost: "برای توزیع‌کنندگان، عمده‌فروشان و خریداران صنعتی در سراسر جهان.",
    exportWelcome: "استعلام صادرات در سراسر جهان خوش‌آمد است",
    company: "شرکت",
    products: "محصولات",
    exportMarkets: "بازارهای صادراتی",
    rights: "تمامی حقوق محفوظ است.",
  },
  card: {
    requestQuote: "درخواست قیمت",
    spec: "مشخصات",
    packaging: "بسته‌بندی",
  },
  about: {
    heroEyebrow: "درباره Model Oils",
    heroTitle: "صادرکننده بین‌المللی روانکار با برند خود",
    heroSubtitle:
      "Model Oils یک صادرکننده و تأمین‌کننده B2B روانکار، خانه برند روانکار HI-TECH است. ما بر خدمت‌رسانی به توزیع‌کنندگان، عمده‌فروشان و خریداران صنعتی در بازارهای صادراتی جهانی تمرکز داریم.",
    focusEyebrow: "تمرکز ما",
    focusTitle: "صادرات‌محور، توزیع‌کننده‌گرا",
    focusP1:
      "عملیات ما حول تأمین بین‌المللی ساخته شده است — سفارش کانتینری، بسته‌بندی انعطاف‌پذیر و حمل‌ونقل بین‌المرزی. با HI-TECH به عنوان برند پرچمدار و محدوده محصولات پشتیبان گسترده، به شرکا کمک می‌کنیم تا کسب‌وکارهای روانکار پایدار در بازارهای خود بسازند.",
    focusP2:
      "ما با توزیع‌کنندگان، عمده‌فروشان، واردکنندگان، شرکت‌های ناوگان، شبکه‌های خدمات، خریداران صنعتی، شرکت‌های قطعات یدکی خودرو و فروشندگان روغن کار می‌کنیم.",
    partnerCta: "شریک ما شوید",
    whyEyebrow: "چرا با ما شریک شوید",
    whyTitle: "آنچه برای توزیع‌کنندگان می‌آوریم",
  },
  contact: {
    heroEyebrow: "درخواست قیمت",
    heroTitle: "بیایید پیشنهاد صادراتی شما را بسازیم",
    heroSubtitle:
      "کشور هدف، نوع محصول، بسته‌بندی و حجم خود را به ما بگویید. تیم ما یک پیشنهاد صادراتی مناسب آماده خواهد کرد.",
    email: "ایمیل",
    whatsapp: "واتساپ",
    exportInquiries: "استعلام صادرات",
    exportInquiriesValue: "در سراسر جهان خوش‌آمد است",
    responseTime: "زمان پاسخ",
    responseTimeValue: "معمولاً ظرف ۱–۲ روز کاری",
    helpText:
      "چه توزیع‌کننده، عمده‌فروش، واردکننده یا اپراتور ناوگان باشید، نیازهای خود را با ما در میان بگذارید؛ تیم ما محصولات و بسته‌بندی مناسب HI-TECH را برای بازار شما تطبیق خواهد داد.",
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
  hitech: {
    heroEyebrow: "برند پرچمدار",
    heroTitle: "HI-TECH — قلب Model Oils",
    heroSubtitle:
      "HI-TECH خط تولید روانکار پرچمدار Model Oils است که برای بازارهای بین‌المللی عمده‌فروشی، توزیع‌کننده، ناوگان، خدمات و صنعتی ایجاد شده است.",
    becomeDistributor: "توزیع‌کننده HI-TECH شوید",
    whyEyebrow: "چرا HI-TECH",
    whyTitle: "یک برند. ساخته‌شده برای تأمین جهانی.",
    bullets: [
      "به عنوان یک خانواده کامل روانکار برای نیازهای خودرویی و صنعتی طراحی شده است.",
      "برای صادرات با بسته‌بندی انعطاف‌پذیر از بطری‌های ۱ لیتری تا بشکه‌های ۲۰۸ لیتری و IBC طراحی شده است.",
      "با پشتیبانی فنی برای تطبیق محصول مناسب با بازار شما پشتیبانی می‌شود.",
      "همکاری دوستانه با توزیع‌کننده برای تأمین بلندمدت و تکرارشونده.",
    ],
    rangeEyebrow: "محدوده HI-TECH",
    rangeTitle: "محصولات برجسته HI-TECH",
    rangeDescription:
      "مشخصات نشان‌داده‌شده نمونه‌های قابل ویرایش هستند. ما تأییدیه‌های API، ACEA، OEM یا ISO را ادعا نمی‌کنیم مگر اینکه مستندات ارائه شده باشد.",
    lightCommercial: "خودروهای تجاری سبک",
    productDescription: "توضیحات محصول و حوزه‌های کاربرد",
    productFeatures: "ویژگی‌ها و مزایا",
    productStandards: "تأییدیه‌ها و مشخصات",
    productPackaging: "گزینه‌های بسته‌بندی",
    productNotFound: "محصول یافت نشد.",
    zoomImage: "بزرگ‌نمایی تصویر",
  },
  industriesPage: {
    heroEyebrow: "صنایع تحت پوشش",
    heroTitle: "روانکار برای هر عملیات",
    heroSubtitle:
      "از خودروهای سواری تا صنایع سنگین، Model Oils طیف گسترده‌ای از بخش‌ها را با محصولات و بسته‌بندی مناسب پشتیبانی می‌کند.",
    discussCta: "نیازهای خود را مطرح کنید",
  },
  productsPage: {
    heroEyebrow: "محدوده محصولات",
    heroTitle: "دسته‌بندی‌های روانکار و محصولات HI-TECH",
    heroSubtitle:
      "پرتفوی کامل روانکارهای خودرویی و صنعتی، تأمین‌شده در بسته‌بندی انعطاف‌پذیر از بطری‌های ۱ لیتری تا بشکه‌های ۲۰۸ لیتری و مخازن IBC.",
    catEyebrow: "دسته‌بندی‌ها",
    catTitle: "مرور بر اساس دسته‌بندی",
    prodEyebrow: "محصولات HI-TECH",
    prodTitle: "لیست محصولات برجسته",
    prodDescription:
      "درجات ویسکوزیته و مشخصات نمونه‌های قابل ویرایش هستند. ما تأیید API، ACEA، OEM، گواهینامه ISO یا نتایج آزمایشگاهی را ادعا نمی‌کنیم مگر اینکه مستندات ارائه شده باشد.",
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
    heroTitle: "رسانه و رویدادها",
    heroSubtitle: "نمایشگاه‌ها، حمایت از ورزش موتوری و فعالیت‌های آفرود",
    galleryEyebrow: "گالری",
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
    heroProducts: "روغن‌های موتور پریمیوم HI-TECH در یک محیط صنعتی تیره برای صادرات",
    flagshipFamily: "نمایش خانواده محصولات پرچم‌دار روان‌کننده HI-TECH",
    exportWarehouse: "انبار بین‌المللی صادرات روان‌کننده با بشکه‌های روغن",
    productDisplay: "نمایش محصول روان‌کننده HI-TECH",
  },
  blogPage: {
    heroTitle: "منابع فنی",
    heroSubtitle: "مقالات فنی درباره روانکارها و روانکاری برای توزیع‌کنندگان، عمده‌فروشان و خریداران صنعتی.",
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
    hiTech: "HI-TECH للزيوت",
    products: "المنتجات",
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
    titlePre: "حلول زيوت HI-TECH لـ",
    titleHighlight: "الموزعين وتجار الجملة",
    subtitle:
      "تورد Model Oils زيوت المحركات والديزل والهيدروليك وناقل الحركة ومضادات التجمد والشحوم والمواد التشحيمية الصناعية HI-TECH للموزعين وتجار الجملة والأساطيل والمشترين الدوليين.",
    requestQuote: "طلب عرض سعر",
    exploreHiTech: "استكشاف منتجات HI-TECH",
    bulletBulk: "توريد بالجملة والحاويات",
    bulletPackaging: "تغليف مرن",
    bulletExport: "جاهز للتصدير",
  },
  flagship: {
    badge: "العلامة التجارية الرائدة",
    body: "HI-TECH هي خط المنتجات التشحيمية الرائد لـ Model Oils، تم إنشاؤه للأسواق الدولية بالجملة والموزعين والأساطيل والخدمات والصناعية. إنه قلب برنامج التصدير لدينا — مصمم للأداء وبُني للتوريد العالمي.",
    becomeDistributor: "كن موزعاً",
    viewRange: "عرض مجموعة HI-TECH",
  },
  categoriesSection: {
    eyebrow: "مجموعة المنتجات",
    title: "محفظة مواد تشحيمية متكاملة",
    description:
      "من زيوت محركات سيارات الركاب إلى المواد التشحيمية الصناعية والسوائل الخاصة — تُورَّد في تغليف مصمم لطلب التجزئة والورش والتصدير بالجملة.",
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
  catalog: {
    eyebrow: "الكتالوج وعلامات التوريد",
    title: "HI-TECH تقود، الكتالوج يدعم",
    description:
      "HI-TECH هي علامتنا التجارية الرائدة المملوكة. إلى جانبها، يمكننا توريد علامات الكتالوج والممثّلة المختارة من المواد التشحيمية كخيارات ثانوية لإتمام احتياجات التوريد لديك.",
    disclaimer: "أسماء العلامات التجارية الظاهرة هي أمثلة. علامات الكتالوج ثانوية بالنسبة لمجموعة HI-TECH الرائدة.",
  },
  quoteCta: {
    title: "هل أنت مستعد لمناقشة طلبك بالجملة؟",
    body: "أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم. سيعدّ فريقنا عرضاً مناسباً للتصدير.",
    requestWholesale: "طلب عرض سعر بالجملة",
    exportCapabilities: "قدرات التصدير",
  },
  footer: {
    taglinePre: "مصدّر ومورّد B2B دولي للمواد التشحيمية. موطن علامة",
    taglinePost: "التجارية للموزعين وتجار الجملة والمشترين الصناعيين حول العالم.",
    exportWelcome: "استفسارات التصدير مرحب بها في جميع أنحاء العالم",
    company: "الشركة",
    products: "المنتجات",
    exportMarkets: "أسواق التصدير",
    rights: "جميع الحقوق محفوظة.",
  },
  card: {
    requestQuote: "طلب عرض سعر",
    spec: "المواصفات",
    packaging: "التغليف",
  },
  about: {
    heroEyebrow: "عن Model Oils",
    heroTitle: "مصدّر دولي للمواد التشحيمية بعلامته التجارية الخاصة",
    heroSubtitle:
      "Model Oils هي مصدّر ومورّد B2B للمواد التشحيمية، موطن علامة HI-TECH التجارية. نركز على خدمة الموزعين وتجار الجملة والمشترين الصناعيين عبر أسواق التصدير العالمية.",
    focusEyebrow: "تركيزنا",
    focusTitle: "موجّه للتصدير، مدفوع بالموزعين",
    focusP1:
      "عملياتنا مبنية حول التوريد الدولي — طلبات الحاويات والتغليف المرن والشحن عبر الحدود. مع HI-TECH كعلامتنا الرائدة ومجموعة المنتجات الداعمة الواسعة، نساعد الشركاء على بناء أعمال مواد تشحيمية مستدامة في أسواقهم.",
    focusP2:
      "نعمل مع الموزعين وتجار الجملة والمستوردين وشركات الأساطيل وشبكات الخدمات والمشترين الصناعيين وشركات قطع غيار السيارات وبائعي الزيوت.",
    partnerCta: "كن شريكاً لنا",
    whyEyebrow: "لماذا تشاركنا",
    whyTitle: "ما نقدمه للموزعين",
  },
  contact: {
    heroEyebrow: "طلب عرض سعر",
    heroTitle: "دعنا نبني عرض التصدير الخاص بك",
    heroSubtitle:
      "أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم. سيعدّ فريقنا عرضاً مناسباً للتصدير.",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    exportInquiries: "استفسارات التصدير",
    exportInquiriesValue: "مرحب بها في جميع أنحاء العالم",
    responseTime: "وقت الاستجابة",
    responseTimeValue: "عادةً خلال 1–2 يوم عمل",
    helpText:
      "سواء كنت موزعاً أو تاجر جملة أو مستورداً أو مشغّل أسطول، شاركنا متطلباتك وسيطابق فريقنا منتجات HI-TECH والتغليف المناسب لسوقك.",
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
  hitech: {
    heroEyebrow: "العلامة التجارية الرائدة",
    heroTitle: "HI-TECH — قلب Model Oils",
    heroSubtitle:
      "HI-TECH هي خط المنتجات التشحيمية الرائد لـ Model Oils، تم إنشاؤه للأسواق الدولية بالجملة والموزعين والأساطيل والخدمات والصناعية.",
    becomeDistributor: "كن موزع HI-TECH",
    whyEyebrow: "لماذا HI-TECH",
    whyTitle: "علامة واحدة. بُنيت للتوريد العالمي.",
    bullets: [
      "مصممة كعائلة مواد تشحيمية متكاملة عبر الاحتياجات الصناعية والسيارات.",
      "مصممة للتصدير بتغليف مرن من زجاجات 1 لتر إلى براميل 208 لتر وIBC.",
      "مدعومة بالدعم الفني لمطابقة المنتج المناسب لسوقك.",
      "تعاون صديق للموزع للتوريد طويل الأمد والمتكرر.",
    ],
    rangeEyebrow: "مجموعة HI-TECH",
    rangeTitle: "منتجات HI-TECH المميزة",
    rangeDescription:
      "المواصفات الظاهرة هي أمثلة قابلة للتحرير. لا ندّعي موافقات API أو ACEA أو OEM أو ISO إلا إذا تم تقديم الوثائق.",
    lightCommercial: "السيارات التجارية الخفيفة",
    productDescription: "وصف المنتج ومجالات التطبيق",
    productFeatures: "الميزات والفوائد",
    productStandards: "الموافقات والمواصفات",
    productPackaging: "خيارات التعبئة",
    productNotFound: "المنتج غير موجود.",
    zoomImage: "تكبير الصورة",
  },
  industriesPage: {
    heroEyebrow: "الصناعات المخدومة",
    heroTitle: "مواد تشحيمية لكل عملية",
    heroSubtitle:
      "من سيارات الركاب إلى الصناعة الثقيلة، تدعم Model Oils مجموعة واسعة من القطاعات بالمنتجات والتغليف المناسبين.",
    discussCta: "ناقش متطلباتك",
  },
  productsPage: {
    heroEyebrow: "مجموعة المنتجات",
    heroTitle: "فئات المواد التشحيمية ومنتجات HI-TECH",
    heroSubtitle:
      "محفظة متكاملة من المواد التشحيمية للسيارات والصناعة، تُورَّد في تغليف مرن من زجاجات 1 لتر إلى براميل 208 لتر وخزانات IBC.",
    catEyebrow: "الفئات",
    catTitle: "تصفح حسب الفئة",
    prodEyebrow: "منتجات HI-TECH",
    prodTitle: "قائمة المنتجات المميزة",
    prodDescription:
      "درجات اللزوجة والمواصفات هي أمثلة قابلة للتحرير. لا ندّعي موافقة API أو ACEA أو OEM أو شهادة ISO أو نتائج مختبرية إلا إذا تم تقديم الوثائق.",
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
    heroTitle: "الإعلام والفعاليات",
    heroSubtitle: "المعارض ورعاية رياضة السيارات وأنشطة الطرق الوعرة",
    galleryEyebrow: "معرض الصور",
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
    heroProducts: "زيوت محركات HI-TECH الممتازة معروضة في بيئة تصدير صناعية داكنة",
    flagshipFamily: "عرض عائلة منتجات HI-TECH الرائدة لمواد التشحيم",
    exportWarehouse: "مستودع دولي لتصدير مواد التشحيم مع براميل الزيت",
    productDisplay: "عرض منتج مواد التشحيم HI-TECH",
  },
  blogPage: {
    heroTitle: "الموارد التقنية",
    heroSubtitle: "مقالات تقنية حول المواد التشحيمية والتشحيم للموزعين وتجار الجملة والمشترين الصناعيين.",
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
    hiTech: "HI-TECH Schmierstoffe",
    products: "Marken",
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
    titlePre: "HI-TECH Öllösungen für",
    titleHighlight: "Distributoren & Großhändler",
    subtitle:
      "Model Oils liefert HI-TECH Motoröle, Dieselöle, Hydrauliköle, Getriebeöle, Frostschutzmittel, Fette und Industrieschmierstoffe für Distributoren, Großhändler, Flotten und internationale Käufer.",
    requestQuote: "Angebot anfordern",
    exploreHiTech: "HI-TECH Produkte entdecken",
    bulletBulk: "Bulk- & Containerversorgung",
    bulletPackaging: "Flexible Verpackung",
    bulletExport: "Exportbereit",
  },
  flagship: {
    badge: "Flaggschiff-Marke",
    body: "HI-TECH ist die Flaggschiff-Schmierstoffproduktlinie von Model Oils, entwickelt für internationale Groß-, Distributor-, Flotten-, Service- und Industriemärkte. Sie ist das Herzstück unseres Exportprogramms — leistungstechnisch konzipiert und für die globale Versorgung entwickelt.",
    becomeDistributor: "Distributor werden",
    viewRange: "HI-TECH Sortiment ansehen",
  },
  categoriesSection: {
    eyebrow: "Produktpalette",
    title: "Ein vollständiges Schmierstoffportfolio",
    description:
      "Von Motorölen für Pkw bis hin zu Industrieschmierstoffen und Spezialflüssigkeiten — in Verpackungsgrößen für Einzelhandel, Werkstatt und Bulk-Exportbedarf.",
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
  catalog: {
    eyebrow: "Katalog & Versorgungsmarken",
    title: "HI-TECH führt, Katalogmarken unterstützen",
    description:
      "HI-TECH ist unsere eigene Flaggschiffmarke. Daneben können wir ausgewählte Katalog- und vertretene Schmierstoffmarken als sekundäre Optionen liefern.",
    disclaimer: "Gezeigte Markennamen sind Platzhalter. Katalogmarken sind der HI-TECH-Flaggschiff-Serie untergeordnet.",
  },
  quoteCta: {
    title: "Bereit, Ihre Großbestellung zu besprechen?",
    body: "Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit. Unser Team erstellt ein passendes Exportangebot.",
    requestWholesale: "Großhandelsangebot anfordern",
    exportCapabilities: "Exportmöglichkeiten",
  },
  footer: {
    taglinePre: "Internationaler B2B-Schmierstoffexporteur und -lieferant. Heimat der",
    taglinePost: "Schmierstoffmarke für Distributoren, Großhändler und Industriekunden weltweit.",
    exportWelcome: "Export-Anfragen willkommen.",
    company: "Unternehmen",
    products: "Produkte",
    exportMarkets: "Exportmärkte",
    rights: "Alle Rechte vorbehalten.",
  },
  card: { requestQuote: "Angebot anfordern", spec: "Spezifikation", packaging: "Verpackung" },
  about: {
    heroEyebrow: "Über Model Oils",
    heroTitle: "Ein internationaler Schmierstoffexporteur mit eigener Marke",
    heroSubtitle:
      "Model Oils ist ein B2B-Schmierstoffexporteur und -lieferant, Heimat der Marke HI-TECH. Wir fokussieren uns auf die Versorgung von Distributoren, Großhändlern und industriellen Käufern in globalen Exportmärkten.",
    focusEyebrow: "Unser Fokus",
    focusTitle: "Exportorientiert, distributor-gesteuert",
    focusP1:
      "Unsere Abläufe sind auf internationale Versorgung ausgerichtet — Containerbestellungen, flexible Verpackung und grenzüberschreitende Lieferung. Mit HI-TECH als unserer Flaggschiffmarke und einem breiten Produktsortiment helfen wir Partnern, nachhaltige Schmierstoffgeschäfte auf ihren Märkten aufzubauen.",
    focusP2:
      "Wir arbeiten mit Distributoren, Großhändlern, Importeuren, Flottenunternehmen, Servicenetzwerken, industriellen Käufern, Kfz-Ersatzteilhändlern und Ölhändlern zusammen.",
    partnerCta: "Partner werden",
    whyEyebrow: "Warum mit uns zusammenarbeiten",
    whyTitle: "Was wir Distributoren bieten",
  },
  contact: {
    heroEyebrow: "Kontakt",
    heroTitle: "Großhandelsangebot anfordern",
    heroSubtitle: "Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit.",
    email: "E-Mail",
    whatsapp: "WhatsApp",
    exportInquiries: "Export-Anfragen",
    exportInquiriesValue: "Bitte nutzen Sie das Formular oder WhatsApp.",
    responseTime: "Antwortzeit",
    responseTimeValue: "Innerhalb von 24–48 Stunden.",
    helpText: "Unser Export-Team hilft Ihnen bei Produktauswahl, Preisgestaltung und Lieferdetails.",
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
  hitech: {
    heroEyebrow: "Flaggschiff-Marke",
    heroTitle: "HI-TECH — Das Herz von Model Oils",
    heroSubtitle:
      "HI-TECH ist die Flaggschiff-Schmierstoffproduktlinie von Model Oils, entwickelt für internationale Groß-, Distributor-, Flotten-, Service- und Industriemärkte.",
    becomeDistributor: "HI-TECH Distributor werden",
    whyEyebrow: "Warum HI-TECH",
    whyTitle: "Eine Marke. Für globale Versorgung entwickelt.",
    bullets: [
      "Als vollständige Schmierstofffamilie für Automobil- und Industriebedarf konzipiert.",
      "Für den Export mit flexibler Verpackung von 1-L-Flaschen bis 208-L-Fässern und IBC entwickelt.",
      "Unterstützt durch technischen Support zur Produktanpassung an Ihren Markt.",
      "Distributorfreundliche Zusammenarbeit für langfristige, wiederholbare Versorgung.",
    ],
    rangeEyebrow: "HI-TECH Sortiment",
    rangeTitle: "Ausgewählte HI-TECH Produkte",
    rangeDescription:
      "Angezeigte Viskositätsgrades und Spezifikationen sind bearbeitbare Platzhalter. Wir erheben keine Ansprüche auf API-, ACEA-, OEM- oder ISO-Zulassungen, sofern keine Dokumentation vorliegt.",
    lightCommercial: "Leichte Nutzfahrzeuge",
    productDescription: "Produktbeschreibung und Anwendungsbereiche",
    productFeatures: "Eigenschaften und Vorteile",
    productStandards: "Zulassungen und Spezifikationen",
    productPackaging: "Verpackungsoptionen",
    productNotFound: "Produkt nicht gefunden.",
    zoomImage: "Bild vergrößern",
  },
  industriesPage: {
    heroEyebrow: "Bediente Branchen",
    heroTitle: "Schmierstoffe für jeden Sektor",
    heroSubtitle:
      "Von Pkw bis zur Schwerindustrie unterstützt Model Oils eine breite Palette von Branchen mit den richtigen Produkten und Verpackungen.",
    discussCta: "Anforderungen besprechen",
  },
  productsPage: {
    heroEyebrow: "Produktpalette",
    heroTitle: "Schmierstoffkategorien & HI-TECH Produkte",
    heroSubtitle:
      "Ein vollständiges Portfolio aus Automobil- und Industrieschmierstoffen, geliefert in flexibler Verpackung von 1-L-Flaschen bis 208-L-Fässern und IBC.",
    catEyebrow: "Kategorien",
    catTitle: "Nach Kategorie durchsuchen",
    prodEyebrow: "HI-TECH Produkte",
    prodTitle: "Ausgewählte Produktliste",
    prodDescription:
      "Viskositätsgrades und Spezifikationen sind bearbeitbare Platzhalter. Wir erheben keine Ansprüche auf API-, ACEA-, OEM-Zulassung, ISO-Zertifizierung oder Laborergebnisse, sofern keine Dokumentation vorliegt.",
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
    toastBody: "Danke. Unser Export-Team wird ein passendes Angebot vorbereiten und sich bei Ihnen melden.",
    errorTitle: "Fehler",
    errorBody: "Ihre Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt eine E-Mail.",
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
    heroTitle: "Medien & Veranstaltungen",
    heroSubtitle: "Messen, Motorsport-Sponsoring und Offroad-Aktivitäten",
    galleryEyebrow: "Galerie",
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
    heroProducts: "HI-TECH Premium-Motoröle in einer dunklen industriellen Exportumgebung",
    flagshipFamily: "Präsentation der HI-TECH Flaggschiff-Schmierstoff-Produktfamilie",
    exportWarehouse: "Internationales Schmierstoff-Exportlager mit Ölfässern",
    productDisplay: "HI-TECH Schmierstoff-Produktpräsentation",
  },
  blogPage: {
    heroTitle: "Technische Ressourcen",
    heroSubtitle: "Technische Artikel über Schmierstoffe und Schmierung für Distributoren, Großhändler und industrielle Käufer.",
    generalInfo: "Allgemeine Informationen",
    faq: "Häufig gestellte Fragen",
    backToBlog: "Alle Artikel",
    readMore: "Lesen",
    ctaTitle: "Suchen Sie ein Produkt?",
    ctaBody: "Unser technisches Team kann die geeigneten Spezifikationen für Ihre Ausrüstung und Betriebsbedingungen ermitteln.",
  },
};

const fr: UIStrings = {
  nav: {
    hiTech: "HI-TECH Lubrifiants",
    products: "Marques",
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
    titlePre: "Solutions HI-TECH pour",
    titleHighlight: "Distributeurs & Grossistes",
    subtitle:
      "Model Oils fournit des huiles moteur, huiles diesel, huiles hydrauliques, huiles de transmission, antigel, graisses et lubrifiants industriels HI-TECH pour les distributeurs, grossistes, flottes et acheteurs internationaux.",
    requestQuote: "Demander un devis",
    exploreHiTech: "Explorer les produits HI-TECH",
    bulletBulk: "Fourniture en vrac & container",
    bulletPackaging: "Emballage flexible",
    bulletExport: "Prêt à l'export",
  },
  flagship: {
    badge: "Marque phare",
    body: "HI-TECH est la gamme de produits lubrifiants phare de Model Oils, créée pour les marchés internationaux de gros, de distribution, de flotte, de service et industriels. C'est le cœur de notre programme d'exportation — conçu pour la performance et développé pour l'approvisionnement mondial.",
    becomeDistributor: "Devenir distributeur",
    viewRange: "Voir la gamme HI-TECH",
  },
  categoriesSection: {
    eyebrow: "Gamme de produits",
    title: "Un portfolio de lubrifiants complet",
    description:
      "Des huiles moteur pour véhicules particuliers aux lubrifiants industriels et fluides spéciaux — fournis dans des emballages adaptés à la demande en détail, en atelier et en export en vrac.",
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
  catalog: {
    eyebrow: "Catalogue & Marques d'approvisionnement",
    title: "HI-TECH en tête, marques catalogue en soutien",
    description:
      "HI-TECH est notre marque phare propriétaire. À ses côtés, nous pouvons fournir des marques de catalogue et représentées sélectionnées comme options secondaires.",
    disclaimer: "Les noms de marques affichés sont des exemples. Les marques catalogue sont secondaires à la gamme phare HI-TECH.",
  },
  quoteCta: {
    title: "Prêt à discuter de votre commande en gros ?",
    body: "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume. Notre équipe préparera une offre d'export adaptée.",
    requestWholesale: "Demander un devis en gros",
    exportCapabilities: "Capacités d'export",
  },
  footer: {
    taglinePre: "Exportateur et fournisseur international B2B de lubrifiants. Maison de la marque",
    taglinePost: "pour les distributeurs, grossistes et acheteurs industriels dans le monde entier.",
    exportWelcome: "Demandes d'export bienvenues.",
    company: "Entreprise",
    products: "Produits",
    exportMarkets: "Marchés d'export",
    rights: "Tous droits réservés.",
  },
  card: { requestQuote: "Demander un devis", spec: "Spécification", packaging: "Emballage" },
  about: {
    heroEyebrow: "À propos de Model Oils",
    heroTitle: "Un exportateur international de lubrifiants avec sa propre marque",
    heroSubtitle:
      "Model Oils est un exportateur et fournisseur B2B de lubrifiants, maison de la marque HI-TECH. Nous nous concentrons sur la fourniture aux distributeurs, grossistes et acheteurs industriels sur les marchés d'exportation mondiaux.",
    focusEyebrow: "Notre focus",
    focusTitle: "Orienté export, piloté par les distributeurs",
    focusP1:
      "Nos opérations sont construites autour de l'approvisionnement international — commandes en container, emballage flexible et expédition transfrontalière. Avec HI-TECH comme marque phare et une large gamme de produits complémentaires, nous aidons nos partenaires à développer des activités lubrifiantes durables sur leurs marchés.",
    focusP2:
      "Nous travaillons avec des distributeurs, des grossistes, des importateurs, des sociétés de flotte, des réseaux de services, des acheteurs industriels, des sociétés de pièces détachées automobiles et des revendeurs d'huile.",
    partnerCta: "Devenir partenaire",
    whyEyebrow: "Pourquoi nous choisir",
    whyTitle: "Ce que nous apportons aux distributeurs",
  },
  contact: {
    heroEyebrow: "Contact",
    heroTitle: "Demander un devis en gros",
    heroSubtitle: "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume.",
    email: "E-mail",
    whatsapp: "WhatsApp",
    exportInquiries: "Demandes d'export",
    exportInquiriesValue: "Veuillez utiliser le formulaire ou WhatsApp.",
    responseTime: "Délai de réponse",
    responseTimeValue: "Sous 24 à 48 heures.",
    helpText: "Notre équipe export vous aidera dans la sélection des produits, la tarification et les détails de livraison.",
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
  hitech: {
    heroEyebrow: "Marque phare",
    heroTitle: "HI-TECH — Le cœur de Model Oils",
    heroSubtitle:
      "HI-TECH est la gamme de produits lubrifiants phare de Model Oils, créée pour les marchés internationaux de gros, de distribution, de flotte, de service et industriels.",
    becomeDistributor: "Devenir distributeur HI-TECH",
    whyEyebrow: "Pourquoi HI-TECH",
    whyTitle: "Une marque. Développée pour l'approvisionnement mondial.",
    bullets: [
      "Conçu comme une famille complète de lubrifiants pour les besoins automobiles et industriels.",
      "Développé pour l'export avec un emballage flexible allant de bouteilles 1L aux fûts 208L et IBC.",
      "Appuyé par un support technique pour adapter le bon produit à votre marché.",
      "Coopération adaptée aux distributeurs pour un approvisionnement durable et répétable.",
    ],
    rangeEyebrow: "Gamme HI-TECH",
    rangeTitle: "Produits HI-TECH sélectionnés",
    rangeDescription:
      "Les grades de viscosité et spécifications affichés sont des exemples modifiables. Nous ne revendiquons pas d'approbations API, ACEA, OEM ou ISO sauf si une documentation est fournie.",
    lightCommercial: "Véhicules utilitaires légers",
    productDescription: "Description du produit et domaines d'application",
    productFeatures: "Caractéristiques et avantages",
    productStandards: "Approbations et spécifications",
    productPackaging: "Options d'emballage",
    productNotFound: "Produit introuvable.",
    zoomImage: "Agrandir l'image",
  },
  industriesPage: {
    heroEyebrow: "Secteurs desservis",
    heroTitle: "Lubrifiants pour chaque secteur",
    heroSubtitle:
      "Des véhicules particuliers à l'industrie lourde, Model Oils soutient une large gamme de secteurs avec les bons produits et emballages.",
    discussCta: "Discuter des besoins",
  },
  productsPage: {
    heroEyebrow: "Gamme de produits",
    heroTitle: "Catégories de lubrifiants & Produits HI-TECH",
    heroSubtitle:
      "Un portfolio complet de lubrifiants automobiles et industriels, fournis dans un emballage flexible allant de bouteilles 1L aux fûts 208L et IBC.",
    catEyebrow: "Catégories",
    catTitle: "Parcourir par catégorie",
    prodEyebrow: "Produits HI-TECH",
    prodTitle: "Liste de produits sélectionnés",
    prodDescription:
      "Les grades de viscosité et spécifications sont des exemples modifiables. Nous ne revendiquons pas d'approbation API, ACEA, OEM, de certification ISO ou de résultats de laboratoire sauf si une documentation est fournie.",
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
    messagePlaceholder: "Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume.",
    submit: "Demander un devis en gros",
    submitting: "Envoi en cours...",
    toastTitle: "Demande reçue",
    toastBody: "Merci. Notre équipe export préparera une offre adaptée et vous contactera.",
    errorTitle: "Erreur",
    errorBody: "Votre demande n'a pas pu être envoyée. Veuillez nous contacter directement par e-mail.",
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
    heroTitle: "Médias & Événements",
    heroSubtitle: "Salons, sponsorisations de sports mécaniques et activités tout-terrain",
    galleryEyebrow: "Galerie",
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
    heroProducts: "Huiles moteur premium HI-TECH présentées dans un environnement d'exportation industriel sombre",
    flagshipFamily: "Présentation de la gamme phare de lubrifiants HI-TECH",
    exportWarehouse: "Entrepôt international d'exportation de lubrifiants avec fûts d'huile",
    productDisplay: "Présentation de produits lubrifiants HI-TECH",
  },
  blogPage: {
    heroTitle: "Ressources techniques",
    heroSubtitle: "Articles techniques sur les lubrifiants et la lubrification pour les distributeurs, grossistes et acheteurs industriels.",
    generalInfo: "Informations générales",
    faq: "Questions fréquentes",
    backToBlog: "Tous les articles",
    readMore: "Lire",
    ctaTitle: "Vous cherchez un produit ?",
    ctaBody: "Notre équipe technique peut identifier les spécifications adaptées à votre équipement et vos conditions de fonctionnement.",
  },
};

export const UI: Record<Locale, UIStrings> = { en, tr, ru, fa, ar, de, fr };

export type PageKey = "home" | "about" | "contact" | "export" | "hitech" | "industries" | "products" | "media" | "blog";

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export const PAGE_META: Record<Locale, Record<PageKey, PageMeta>> = {
  de: {
    home: {
      title: "Model Oils | HI-TECH Schmierstoffe & Motoröle für den Export",
      description:
        "Model Oils liefert HI-TECH Motoröle, Dieselöle, Hydrauliköle, Getriebeöle, Frostschutzmittel, Fette und Industrieschmierstoffe für Distributoren, Großhändler und internationale Käufer.",
      ogTitle: "Model Oils | HI-TECH Schmierstoffe für globale Märkte",
      ogDescription:
        "Premium-Schmierstofflösungen für Distributoren und Großhändler. Bulk-Versorgung, flexible Verpackung, exportbereit.",
    },
    about: {
      title: "Über uns | Model Oils Schmierstoff-Exporteur",
      description:
        "Model Oils ist ein internationaler B2B-Schmierstoffexporteur und -lieferant, Heimat der HI-TECH-Marke, mit Fokus auf Distributoren und Großhändler in Exportmärkten.",
      ogTitle: "Über Model Oils",
      ogDescription: "Internationaler Schmierstoffexporteur und Heimat der HI-TECH-Marke.",
    },
    contact: {
      title: "Angebot anfordern | Model Oils Großhandels-Schmierstoffversorgung",
      description:
        "Fordern Sie ein Großhandels-Schmierstoffangebot von Model Oils an. Teilen Sie uns Ihr Zielland, Produkttyp, Verpackung und Volumen mit.",
      ogTitle: "Großhandelsangebot anfordern | Model Oils",
      ogDescription: "Kontaktieren Sie Model Oils für HI-TECH Schmierstoff-Export und Großhandelsversorgung.",
    },
    export: {
      title: "Export & Großhandel | Model Oils Schmierstoffversorgung",
      description:
        "Model Oils unterstützt die Bulk-Schmierstoffversorgung mit flexibler Verpackung, Exportdokumentation, containerbasierter Bestellung und langfristiger Distributorzusammenarbeit.",
      ogTitle: "Export & Großhandelsversorgung | Model Oils",
      ogDescription: "Containerbestellungen, flexible Verpackung und Exportdokumentation für Distributoren weltweit.",
    },
    hitech: {
      title: "HI-TECH | Model Oils Flaggschiff-Schmierstoffmarke",
      description:
        "HI-TECH ist die Flaggschiff-Schmierstoffmarke von Model Oils für internationale Groß-, Distributor-, Flotten- und Industriemärkte.",
      ogTitle: "HI-TECH | Flaggschiff-Schmierstoffmarke von Model Oils",
      ogDescription: "Entdecken Sie die HI-TECH Schmierstofflinie für globale Distributoren und Großhändler.",
    },
    industries: {
      title: "Branchen | Schmierstofflösungen von Model Oils",
      description:
        "Model Oils liefert Schmierstoffe für Automobil, Schwertransport, Flottenbetrieb, Industrieanlagen, Bau, Landwirtschaft, Maritime und Servicenetze.",
      ogTitle: "Bediente Branchen | Model Oils",
      ogDescription: "Schmierstofflösungen für Automobil-, Industrie-, Flotten- und Schifffahrtsbetriebe.",
    },
    products: {
      title: "Produkte | Model Oils Schmierstoffkategorien & HI-TECH Sortiment",
      description:
        "Entdecken Sie Model Oils Schmierstoffkategorien — Motoröle, Dieselöle, Getriebeöle, Hydrauliköle, Fette, Frostschutzmittel und Spezialflüssigkeiten — plus die HI-TECH Produktlinie.",
      ogTitle: "Produkte | Model Oils Schmierstoffsortiment",
      ogDescription: "Vollständiges Schmierstoffportfolio mit flexibler Verpackung für Großhandel und Export.",
    },
    media: {
      title: "Medien | Model Oils",
      description: "Fotos von Model Oils Messen, Motocross-Sponsoring, Rallye-Events und Offroad-Aktivitäten.",
      ogTitle: "Medien | Model Oils",
      ogDescription: "Galerie von Model Oils Veranstaltungen, Sponsoring und Aktivitäten.",
    },
    blog: {
      title: "Blog | Technische Schmierstoffressourcen | Model Oils",
      description: "Technische Artikel über Schmierstoffe, Ölklassifizierung, SAE-Viskositätsstufen und API-Leistungsklassen für Distributoren, Großhändler und industrielle Käufer.",
      ogTitle: "Blog | Technische Ressourcen von Model Oils",
      ogDescription: "Technische Schmierstoffratgeber zu Öltypen, Viskositätsstufen und Leistungsklassifizierungen.",
    },
  },
  fr: {
    home: {
      title: "Model Oils | Lubrifiants HI-TECH & Huiles moteur pour l'export",
      description:
        "Model Oils fournit des huiles moteur, huiles diesel, huiles hydrauliques, huiles de transmission, antigel, graisses et lubrifiants industriels HI-TECH pour les distributeurs, grossistes et acheteurs internationaux.",
      ogTitle: "Model Oils | Lubrifiants HI-TECH pour les marchés mondiaux",
      ogDescription:
        "Solutions lubrifiantes premium pour distributeurs et grossistes. Fourniture en vrac, emballage flexible, prêt à l'export.",
    },
    about: {
      title: "À propos | Model Oils Exportateur de lubrifiants",
      description:
        "Model Oils est un exportateur et fournisseur B2B international de lubrifiants, maison de la marque HI-TECH, axé sur la fourniture aux distributeurs et grossistes sur les marchés d'export.",
      ogTitle: "À propos de Model Oils",
      ogDescription: "Exportateur international de lubrifiants et maison de la marque HI-TECH.",
    },
    contact: {
      title: "Demander un devis | Approvisionnement en lubrifiants en gros Model Oils",
      description:
        "Demandez un devis lubrifiant en gros à Model Oils. Indiquez-nous votre pays cible, le type de produit, l'emballage et le volume.",
      ogTitle: "Demander un devis en gros | Model Oils",
      ogDescription: "Contactez Model Oils pour l'export et l'approvisionnement en gros de lubrifiants HI-TECH.",
    },
    export: {
      title: "Export & Gros | Approvisionnement en lubrifiants Model Oils",
      description:
        "Model Oils soutient la fourniture de lubrifiants en vrac avec un emballage flexible, la documentation d'export, les commandes en container et la coopération distributeur à long terme.",
      ogTitle: "Export & Approvisionnement en gros | Model Oils",
      ogDescription: "Commandes en container, emballage flexible et documentation d'export pour les distributeurs du monde entier.",
    },
    hitech: {
      title: "HI-TECH | Marque phare de lubrifiants Model Oils",
      description:
        "HI-TECH est la marque phare de lubrifiants Model Oils pour les marchés internationaux de gros, de distribution, de flotte et industriels.",
      ogTitle: "HI-TECH | Marque phare de lubrifiants par Model Oils",
      ogDescription: "Explorez la gamme HI-TECH conçue pour les distributeurs et grossistes mondiaux.",
    },
    industries: {
      title: "Secteurs | Solutions lubrifiantes par Model Oils",
      description:
        "Model Oils fournit des lubrifiants pour l'automobile, le transport lourd, les flottes, les installations industrielles, la construction, l'agriculture, le maritime et les réseaux de services.",
      ogTitle: "Secteurs desservis | Model Oils",
      ogDescription: "Solutions lubrifiantes pour les opérations automobiles, industrielles, de flotte et maritimes.",
    },
    products: {
      title: "Produits | Catégories de lubrifiants Model Oils & Gamme HI-TECH",
      description:
        "Découvrez les catégories de lubrifiants Model Oils — huiles moteur, huiles diesel, huiles de transmission, huiles hydrauliques, graisses, antigel et fluides spéciaux — plus la gamme HI-TECH.",
      ogTitle: "Produits | Gamme de lubrifiants Model Oils",
      ogDescription: "Portfolio complet de lubrifiants avec emballage flexible pour le gros et l'export.",
    },
    media: {
      title: "Médias | Model Oils",
      description: "Photos des salons, sponsorisations moto-cross, événements rallye et activités tout-terrain de Model Oils.",
      ogTitle: "Médias | Model Oils",
      ogDescription: "Galerie des événements, sponsorisations et activités de Model Oils.",
    },
    blog: {
      title: "Blog | Ressources techniques lubrifiants | Model Oils",
      description: "Articles techniques sur les lubrifiants, la classification des huiles, les grades de viscosité SAE et les indices de performance API pour les distributeurs, grossistes et acheteurs industriels.",
      ogTitle: "Blog | Ressources techniques Model Oils",
      ogDescription: "Guides techniques lubrifiants couvrant les types d'huiles, grades de viscosité et classifications de performance.",
    },
  },
  en: {
    home: {
      title: "Model Oils | HI-TECH Lubricants & Motor Oils for Export",
      description:
        "Model Oils supplies HI-TECH motor oils, diesel oils, hydraulic oils, gear oils, antifreeze, greases and industrial lubricants for distributors, wholesalers and international buyers.",
      ogTitle: "Model Oils | HI-TECH Lubricants for Global Markets",
      ogDescription:
        "Premium lubricant solutions for distributors and wholesalers. Bulk supply, flexible packaging, export ready.",
    },
    about: {
      title: "About | Model Oils Lubricant Exporter",
      description:
        "Model Oils is an international B2B lubricant exporter and supplier, home of the HI-TECH lubricant brand, focused on serving distributors and wholesalers across export markets.",
      ogTitle: "About Model Oils",
      ogDescription: "International lubricant exporter and home of the HI-TECH brand.",
    },
    contact: {
      title: "Request a Quote | Model Oils Wholesale Lubricant Supply",
      description:
        "Request a wholesale lubricant quote from Model Oils. Tell us your target country, product type, packaging and volume, and our export team will prepare a suitable offer.",
      ogTitle: "Request a Wholesale Quote | Model Oils",
      ogDescription: "Contact Model Oils for HI-TECH lubricant export and wholesale supply.",
    },
    export: {
      title: "Export & Wholesale | Model Oils Lubricant Supply",
      description:
        "Model Oils supports bulk lubricant supply with flexible packaging, export documentation, container-based ordering and long-term distributor cooperation across global markets.",
      ogTitle: "Export & Wholesale Supply | Model Oils",
      ogDescription: "Container orders, flexible packaging and export documentation for distributors worldwide.",
    },
    hitech: {
      title: "HI-TECH | Model Oils Flagship Lubricant Brand",
      description:
        "HI-TECH is Model Oils' flagship lubricant brand for international wholesale, distributor, fleet and industrial markets — bulk supply, export ready, distributor friendly.",
      ogTitle: "HI-TECH | Flagship Lubricant Brand by Model Oils",
      ogDescription: "Explore the HI-TECH lubricant range built for global distributors and wholesalers.",
    },
    industries: {
      title: "Industries | Lubricant Solutions by Model Oils",
      description:
        "Model Oils supplies lubricants for automotive, heavy duty transport, fleet operations, industrial facilities, construction, agriculture, marine and service networks.",
      ogTitle: "Industries Served | Model Oils",
      ogDescription: "Lubricant solutions for automotive, industrial, fleet and marine operations.",
    },
    products: {
      title: "Products | Model Oils Lubricant Categories & HI-TECH Range",
      description:
        "Explore Model Oils lubricant categories — motor oils, diesel oils, gear oils, hydraulic oils, greases, antifreeze and specialty fluids — plus the featured HI-TECH product range.",
      ogTitle: "Products | Model Oils Lubricant Range",
      ogDescription: "Full lubricant portfolio with flexible packaging for wholesale and export.",
    },
    media: {
      title: "Media | Model Oils",
      description: "Photos from Model Oils trade fairs, moto-cross sponsorships, rally events and off-road activities.",
      ogTitle: "Media | Model Oils",
      ogDescription: "Gallery of Model Oils events, sponsorships and activities.",
    },
    blog: {
      title: "Blog | Lubricant Technical Resources | Model Oils",
      description: "Technical articles on lubricants, oil classification, SAE viscosity grades and API performance ratings for distributors, wholesalers and industrial buyers.",
      ogTitle: "Blog | Model Oils Technical Resources",
      ogDescription: "Technical lubricant guides covering oil types, viscosity grades and performance classifications.",
    },
  },
  tr: {
    home: {
      title: "Model Oils | İhracat için HI-TECH Yağlar ve Motor Yağları",
      description:
        "Model Oils; distribütörler, toptancılar ve uluslararası alıcılar için HI-TECH motor yağları, dizel yağları, hidrolik yağlar, şanzıman yağları, antifriz, gresler ve endüstriyel yağlar tedarik eder.",
      ogTitle: "Model Oils | Küresel Pazarlar için HI-TECH Yağlar",
      ogDescription:
        "Distribütörler ve toptancılar için premium yağ çözümleri. Dökme tedarik, esnek ambalaj, ihracata hazır.",
    },
    about: {
      title: "Hakkımızda | Model Oils Yağ İhracatçısı",
      description:
        "Model Oils, HI-TECH yağ markasının evi olan, ihracat pazarlarında distribütörlere ve toptancılara hizmet vermeye odaklanmış uluslararası bir B2B yağ ihracatçısı ve tedarikçisidir.",
      ogTitle: "Model Oils Hakkında",
      ogDescription: "Uluslararası yağ ihracatçısı ve HI-TECH markasının evi.",
    },
    contact: {
      title: "Teklif Al | Model Oils Toptan Yağ Tedariği",
      description:
        "Model Oils'tan toptan yağ teklifi alın. Hedef ülkenizi, ürün tipini, ambalajı ve hacmi bize bildirin; ihracat ekibimiz size uygun bir teklif hazırlasın.",
      ogTitle: "Toptan Teklif Al | Model Oils",
      ogDescription: "HI-TECH yağ ihracatı ve toptan tedariği için Model Oils ile iletişime geçin.",
    },
    export: {
      title: "İhracat ve Toptan | Model Oils Yağ Tedariği",
      description:
        "Model Oils; küresel pazarlarda esnek ambalaj, ihracat dokümantasyonu, konteyner bazlı sipariş ve uzun vadeli distribütör iş birliği ile dökme yağ tedariğini destekler.",
      ogTitle: "İhracat ve Toptan Tedarik | Model Oils",
      ogDescription: "Dünya genelinde distribütörler için konteyner siparişleri, esnek ambalaj ve ihracat dokümantasyonu.",
    },
    hitech: {
      title: "HI-TECH | Model Oils Amiral Yağ Markası",
      description:
        "HI-TECH, Model Oils'un uluslararası toptan, distribütör, filo ve endüstriyel pazarlar için amiral yağ markasıdır — dökme tedarik, ihracata hazır, distribütör dostu.",
      ogTitle: "HI-TECH | Model Oils Amiral Yağ Markası",
      ogDescription: "Küresel distribütörler ve toptancılar için tasarlanan HI-TECH yağ serisini keşfedin.",
    },
    industries: {
      title: "Sektörler | Model Oils Yağ Çözümleri",
      description:
        "Model Oils; otomotiv, ağır hizmet taşımacılığı, filo operasyonları, endüstriyel tesisler, inşaat, tarım, denizcilik ve servis ağları için yağ tedarik eder.",
      ogTitle: "Hizmet Verilen Sektörler | Model Oils",
      ogDescription: "Otomotiv, endüstri, filo ve denizcilik operasyonları için yağ çözümleri.",
    },
    products: {
      title: "Ürünler | Model Oils Yağ Kategorileri ve HI-TECH Serisi",
      description:
        "Model Oils yağ kategorilerini keşfedin — motor yağları, dizel yağları, şanzıman yağları, hidrolik yağlar, gresler, antifriz ve özel akışkanlar — ve öne çıkan HI-TECH ürün serisi.",
      ogTitle: "Ürünler | Model Oils Yağ Yelpazesi",
      ogDescription: "Toptan ve ihracat için esnek ambalajlı eksiksiz yağ portföyü.",
    },
    media: {
      title: "Medya | Model Oils",
      description: "Model Oils'un fuar, moto-cross, ralli ve off-road etkinliklerinden fotoğraflar.",
      ogTitle: "Medya | Model Oils",
      ogDescription: "Model Oils etkinlikler, sponsorluklar ve faaliyetler galerisi.",
    },
    blog: {
      title: "Blog | Yağlayıcı Teknik Kaynaklar | Model Oils",
      description: "Distribütörler, toptancılar ve endüstriyel alıcılar için yağlar, yağ sınıflandırması, SAE viskozite kademeleri ve API performans sınıfları hakkında teknik makaleler.",
      ogTitle: "Blog | Model Oils Teknik Kaynaklar",
      ogDescription: "Yağ türleri, viskozite kademeleri ve performans sınıflandırmalarını kapsayan teknik yağ rehberleri.",
    },
  },
  ru: {
    home: {
      title: "Model Oils | HI-TECH смазочные материалы и моторные масла для экспорта",
      description:
        "Model Oils поставляет HI-TECH моторные масла, дизельные масла, гидравлические масла, трансмиссионные масла, антифриз, смазки и промышленные смазочные материалы для дистрибьюторов, оптовиков и международных покупателей.",
      ogTitle: "Model Oils | HI-TECH смазочные материалы для глобальных рынков",
      ogDescription:
        "Премиальные смазочные решения для дистрибьюторов и оптовиков. Оптовые поставки, гибкая упаковка, готово к экспорту.",
    },
    about: {
      title: "О нас | Model Oils — экспортёр смазочных материалов",
      description:
        "Model Oils — международный B2B экспортёр и поставщик смазочных материалов, дом бренда HI-TECH, ориентированный на обслуживание дистрибьюторов и оптовиков на экспортных рынках.",
      ogTitle: "О компании Model Oils",
      ogDescription: "Международный экспортёр смазочных материалов и дом бренда HI-TECH.",
    },
    contact: {
      title: "Запросить цену | Model Oils — оптовые поставки смазочных материалов",
      description:
        "Запросите оптовое предложение на смазочные материалы от Model Oils. Сообщите нам целевую страну, тип продукта, упаковку и объём.",
      ogTitle: "Запросить оптовое предложение | Model Oils",
      ogDescription: "Свяжитесь с Model Oils для HI-TECH экспорта и оптовых поставок смазочных материалов.",
    },
    export: {
      title: "Экспорт и опт | Model Oils — поставки смазочных материалов",
      description:
        "Model Oils обеспечивает оптовые поставки смазочных материалов с гибкой упаковкой, экспортной документацией, контейнерными заказами и долгосрочным сотрудничеством с дистрибьюторами.",
      ogTitle: "Экспорт и оптовые поставки | Model Oils",
      ogDescription: "Контейнерные заказы, гибкая упаковка и экспортная документация для дистрибьюторов по всему миру.",
    },
    hitech: {
      title: "HI-TECH | Флагманский бренд смазочных материалов Model Oils",
      description:
        "HI-TECH — флагманский бренд смазочных материалов Model Oils для международного оптового, дистрибьюторского, автопаркового и промышленного рынков.",
      ogTitle: "HI-TECH | Флагманский бренд смазочных материалов от Model Oils",
      ogDescription: "Изучите линейку смазочных материалов HI-TECH, созданную для глобальных дистрибьюторов и оптовиков.",
    },
    industries: {
      title: "Отрасли | Смазочные решения от Model Oils",
      description:
        "Model Oils поставляет смазочные материалы для автомобильной промышленности, тяжёлого транспорта, автопарков, промышленных объектов, строительства, сельского хозяйства, морского транспорта и сервисных сетей.",
      ogTitle: "Обслуживаемые отрасли | Model Oils",
      ogDescription: "Смазочные решения для автомобильной, промышленной, автопарковой и морской отраслей.",
    },
    products: {
      title: "Продукты | Категории смазочных материалов Model Oils и линейка HI-TECH",
      description:
        "Изучите категории смазочных материалов Model Oils — моторные масла, дизельные масла, трансмиссионные масла, гидравлические масла, смазки, антифриз и специальные жидкости — плюс избранная линейка продуктов HI-TECH.",
      ogTitle: "Продукты | Ассортимент смазочных материалов Model Oils",
      ogDescription: "Полный портфель смазочных материалов с гибкой упаковкой для оптовой торговли и экспорта.",
    },
    media: {
      title: "Медиа | Model Oils",
      description: "Фотографии с выставок, мотокросса, ралли и внедорожных мероприятий Model Oils.",
      ogTitle: "Медиа | Model Oils",
      ogDescription: "Галерея мероприятий, спонсорств и активностей Model Oils.",
    },
    blog: {
      title: "Блог | Технические ресурсы по смазочным материалам | Model Oils",
      description: "Технические статьи о смазочных материалах, классификации масел, классах вязкости SAE и показателях производительности API для дистрибьюторов, оптовиков и промышленных покупателей.",
      ogTitle: "Блог | Технические ресурсы Model Oils",
      ogDescription: "Технические руководства по смазочным материалам, охватывающие типы масел, классы вязкости и классификации производительности.",
    },
  },
  fa: {
    home: {
      title: "Model Oils | روانکارهای HI-TECH و روغن موتور برای صادرات",
      description:
        "Model Oils روغن موتور، روغن دیزل، روغن هیدرولیک، روغن گیربکس، ضدیخ، گریس و روانکارهای صنعتی HI-TECH را برای توزیع‌کنندگان، عمده‌فروشان و خریداران بین‌المللی تأمین می‌کند.",
      ogTitle: "Model Oils | روانکارهای HI-TECH برای بازارهای جهانی",
      ogDescription:
        "راهکارهای روانکار ممتاز برای توزیع‌کنندگان و عمده‌فروشان. تأمین فله، بسته‌بندی انعطاف‌پذیر، آماده صادرات.",
    },
    about: {
      title: "درباره ما | Model Oils صادرکننده روانکار",
      description:
        "Model Oils یک صادرکننده و تأمین‌کننده B2B بین‌المللی روانکار، خانه برند روانکار HI-TECH است که بر خدمت‌رسانی به توزیع‌کنندگان و عمده‌فروشان در بازارهای صادراتی تمرکز دارد.",
      ogTitle: "درباره Model Oils",
      ogDescription: "صادرکننده بین‌المللی روانکار و خانه برند HI-TECH.",
    },
    contact: {
      title: "درخواست قیمت | تأمین عمده روانکار Model Oils",
      description:
        "از Model Oils قیمت عمده روانکار بخواهید. کشور هدف، نوع محصول، بسته‌بندی و حجم را به ما بگویید.",
      ogTitle: "درخواست قیمت عمده | Model Oils",
      ogDescription: "با Model Oils برای صادرات و تأمین عمده روانکار HI-TECH تماس بگیرید.",
    },
    export: {
      title: "صادرات و عمده‌فروشی | تأمین روانکار Model Oils",
      description:
        "Model Oils تأمین فله روانکار را با بسته‌بندی انعطاف‌پذیر، مستندات صادراتی، سفارشات کانتینری و همکاری بلندمدت توزیع‌کننده در بازارهای جهانی پشتیبانی می‌کند.",
      ogTitle: "صادرات و تأمین عمده | Model Oils",
      ogDescription: "سفارشات کانتینری، بسته‌بندی انعطاف‌پذیر و مستندات صادراتی برای توزیع‌کنندگان در سراسر جهان.",
    },
    hitech: {
      title: "HI-TECH | برند روانکار پرچمدار Model Oils",
      description:
        "HI-TECH برند روانکار پرچمدار Model Oils برای بازارهای بین‌المللی عمده‌فروشی، توزیع‌کننده، ناوگان و صنعتی است — تأمین فله، آماده صادرات، دوستانه با توزیع‌کننده.",
      ogTitle: "HI-TECH | برند روانکار پرچمدار توسط Model Oils",
      ogDescription: "محدوده روانکار HI-TECH ساخته‌شده برای توزیع‌کنندگان و عمده‌فروشان جهانی را کشف کنید.",
    },
    industries: {
      title: "صنایع | راهکارهای روانکار توسط Model Oils",
      description:
        "Model Oils روانکار برای خودرو، حمل‌ونقل سنگین، عملیات ناوگان، تأسیسات صنعتی، ساخت‌وساز، کشاورزی، دریایی و شبکه‌های خدمات تأمین می‌کند.",
      ogTitle: "صنایع تحت پوشش | Model Oils",
      ogDescription: "راهکارهای روانکار برای عملیات خودرویی، صنعتی، ناوگان و دریایی.",
    },
    products: {
      title: "محصولات | دسته‌بندی‌های روانکار Model Oils و محدوده HI-TECH",
      description:
        "دسته‌بندی‌های روانکار Model Oils را کشف کنید — روغن موتور، روغن دیزل، روغن گیربکس، روغن هیدرولیک، گریس، ضدیخ و مایعات ویژه — به علاوه محدوده محصولات برجسته HI-TECH.",
      ogTitle: "محصولات | محدوده روانکار Model Oils",
      ogDescription: "پرتفوی کامل روانکار با بسته‌بندی انعطاف‌پذیر برای عمده‌فروشی و صادرات.",
    },
    media: {
      title: "رسانه | Model Oils",
      description: "تصاویر از نمایشگاه‌ها، موتوکراس، رالی و رویدادهای آفرود Model Oils.",
      ogTitle: "رسانه | Model Oils",
      ogDescription: "گالری رویدادها، حمایت‌ها و فعالیت‌های Model Oils.",
    },
    blog: {
      title: "وبلاگ | منابع فنی روانکار | Model Oils",
      description: "مقالات فنی درباره روانکارها، طبقه‌بندی روغن، درجات ویسکوزیته SAE و رتبه‌بندی عملکرد API برای توزیع‌کنندگان، عمده‌فروشان و خریداران صنعتی.",
      ogTitle: "وبلاگ | منابع فنی Model Oils",
      ogDescription: "راهنماهای فنی روانکار شامل انواع روغن، درجات ویسکوزیته و طبقه‌بندی عملکرد.",
    },
  },
  ar: {
    home: {
      title: "Model Oils | مواد تشحيمية HI-TECH وزيوت محركات للتصدير",
      description:
        "تورد Model Oils زيوت المحركات والديزل والهيدروليك وناقل الحركة ومضادات التجمد والشحوم والمواد التشحيمية الصناعية HI-TECH للموزعين وتجار الجملة والمشترين الدوليين.",
      ogTitle: "Model Oils | مواد تشحيمية HI-TECH للأسواق العالمية",
      ogDescription:
        "حلول تشحيمية متميزة للموزعين وتجار الجملة. توريد بالجملة، تغليف مرن، جاهز للتصدير.",
    },
    about: {
      title: "من نحن | Model Oils مصدّر المواد التشحيمية",
      description:
        "Model Oils هي مصدّر ومورّد B2B دولي للمواد التشحيمية، موطن علامة HI-TECH التجارية، تركز على خدمة الموزعين وتجار الجملة في أسواق التصدير.",
      ogTitle: "عن Model Oils",
      ogDescription: "مصدّر دولي للمواد التشحيمية وموطن علامة HI-TECH.",
    },
    contact: {
      title: "طلب عرض سعر | توريد مواد تشحيمية بالجملة من Model Oils",
      description:
        "اطلب عرض سعر للمواد التشحيمية بالجملة من Model Oils. أخبرنا بالدولة المستهدفة ونوع المنتج والتغليف والحجم.",
      ogTitle: "طلب عرض سعر بالجملة | Model Oils",
      ogDescription: "تواصل مع Model Oils لتصدير وتوريد مواد تشحيمية HI-TECH بالجملة.",
    },
    export: {
      title: "التصدير والجملة | توريد مواد تشحيمية Model Oils",
      description:
        "تدعم Model Oils توريد المواد التشحيمية بالجملة بتغليف مرن ووثائق تصدير وطلبات قائمة على الحاويات وتعاون طويل الأمد مع الموزعين في الأسواق العالمية.",
      ogTitle: "التصدير والتوريد بالجملة | Model Oils",
      ogDescription: "طلبات الحاويات والتغليف المرن ووثائق التصدير للموزعين حول العالم.",
    },
    hitech: {
      title: "HI-TECH | العلامة التجارية الرائدة للمواد التشحيمية من Model Oils",
      description:
        "HI-TECH هي العلامة التجارية الرائدة للمواد التشحيمية من Model Oils للأسواق الدولية بالجملة والموزعين والأساطيل والصناعية — توريد بالجملة، جاهز للتصدير، صديق للموزعين.",
      ogTitle: "HI-TECH | العلامة التجارية الرائدة للمواد التشحيمية من Model Oils",
      ogDescription: "استكشف مجموعة مواد تشحيمية HI-TECH المبنية للموزعين وتجار الجملة العالميين.",
    },
    industries: {
      title: "الصناعات | حلول تشحيمية من Model Oils",
      description:
        "تورد Model Oils مواد تشحيمية للسيارات والنقل الثقيل وعمليات الأساطيل والمنشآت الصناعية والإنشاءات والزراعة والبحرية وشبكات الخدمات.",
      ogTitle: "الصناعات المخدومة | Model Oils",
      ogDescription: "حلول تشحيمية للعمليات الصناعية والسيارات والأساطيل والبحرية.",
    },
    products: {
      title: "المنتجات | فئات المواد التشحيمية ومجموعة HI-TECH من Model Oils",
      description:
        "استكشف فئات المواد التشحيمية من Model Oils — زيوت المحركات وزيوت الديزل وزيوت ناقل الحركة والهيدروليك والشحوم ومضادات التجمد والسوائل الخاصة — بالإضافة إلى مجموعة منتجات HI-TECH المميزة.",
      ogTitle: "المنتجات | مجموعة المواد التشحيمية من Model Oils",
      ogDescription: "محفظة مواد تشحيمية متكاملة بتغليف مرن للجملة والتصدير.",
    },
    media: {
      title: "الوسائط | Model Oils",
      description: "صور من المعارض التجارية وموتوكروس والرالي وفعاليات الطرق الوعرة لـ Model Oils.",
      ogTitle: "الوسائط | Model Oils",
      ogDescription: "معرض صور فعاليات ورعايات وأنشطة Model Oils.",
    },
    blog: {
      title: "المدونة | موارد تقنية للمواد التشحيمية | Model Oils",
      description: "مقالات تقنية حول المواد التشحيمية وتصنيف الزيوت ودرجات اللزوجة SAE وتقييمات الأداء API للموزعين وتجار الجملة والمشترين الصناعيين.",
      ogTitle: "المدونة | الموارد التقنية لـ Model Oils",
      ogDescription: "أدلة تقنية للمواد التشحيمية تغطي أنواع الزيوت ودرجات اللزوجة وتصنيفات الأداء.",
    },
  },
};
