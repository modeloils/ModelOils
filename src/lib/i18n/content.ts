import type { Locale } from "./types";

export interface CardItem {
  title: string;
  text: string;
}

export interface IndustryItem {
  name: string;
  detail: string;
}

export interface SiteContent {
  exportCards: CardItem[];
  trustPoints: CardItem[];
  industries: IndustryItem[];
  exportMarkets: string[];
}

const en: SiteContent = {
  exportCards: [
    {
      title: "Container Orders",
      text: "Full and mixed container loads prepared for sea and land freight to your market.",
    },
    {
      title: "Wholesale Supply",
      text: "Distributor-focused supply programs with repeatable product availability.",
    },
    {
      title: "Export Documentation",
      text: "Commercial documents prepared to support smoother customs clearance.",
    },
    {
      title: "Flexible Packaging",
      text: "From 1L bottles to 205L barrels and IBC totes to match your demand.",
    },
    {
      title: "Technical Product Matching",
      text: "Guidance on matching lubricant grades and product families to your application.",
    },
    {
      title: "Long-Term Cooperation",
      text: "Supply relationships built for importers, wholesalers, fleets, and service networks.",
    },
  ],
  trustPoints: [
    {
      title: "International Supply Focus",
      text: "MODEL GRUP is oriented around B2B lubricant export and wholesale supply.",
    },
    {
      title: "Wide Lubricant Range",
      text: "Passenger car oils, heavy-duty motor oils, industrial oils, gear and transmission oils, antifreeze, greases, marine oils, and motorcycle oils.",
    },
    {
      title: "Distributor Support",
      text: "Cooperation programs designed for importers, wholesalers, and service networks.",
    },
    {
      title: "Flexible Packaging",
      text: "Packaging options support retail, workshop, fleet, industrial, and bulk export demand.",
    },
  ],
  industries: [
    {
      name: "Automotive",
      detail: "Engine and driveline lubricants for passenger and commercial vehicles.",
    },
    {
      name: "Heavy Duty Transport",
      detail: "Durable diesel oils for trucks, buses and long-haul fleets.",
    },
    {
      name: "Fleet Operations",
      detail: "Consistent supply programs to keep large fleets running.",
    },
    {
      name: "Industrial Facilities",
      detail: "Hydraulic, compressor and circulating oils for plants and machinery.",
    },
    {
      name: "Construction Equipment",
      detail: "Robust lubricants for excavators, loaders and heavy machinery.",
    },
    {
      name: "Agriculture",
      detail: "Tractor and equipment oils built for demanding field conditions.",
    },
    {
      name: "Marine / Logistics",
      detail: "Lubricant supply supporting marine and logistics operations.",
    },
    {
      name: "Service Networks",
      detail: "Workshop and aftermarket supply for service and repair networks.",
    },
  ],
  exportMarkets: [
    "Russia",
    "Iraq",
    "Syria",
    "Iran",
    "Azerbaijan",
    "UAE / Dubai",
    "Qatar",
    "Central Asia",
    "Africa",
    "40+ countries",
  ],
};

const tr: SiteContent = {
  exportCards: [
    {
      title: "Konteyner Siparişleri",
      text: "Pazarınıza deniz ve kara taşımacılığı için hazırlanan tam ve karışık konteyner yükleri.",
    },
    {
      title: "Toptan Tedarik",
      text: "Tekrarlanabilir ürün bulunabilirliği ile distribütör odaklı tedarik programları.",
    },
    {
      title: "İhracat Dokümantasyonu",
      text: "Daha sorunsuz gümrük işlemlerini desteklemek için hazırlanan ticari belgeler.",
    },
    { title: "Esnek Ambalaj", text: "Talebinize uygun 1L şişelerden 200L varillere kadar." },
    {
      title: "Teknik Ürün Eşleştirme",
      text: "Yağ kademelerini ve ürün ailelerini uygulamanıza uyarlama konusunda rehberlik.",
    },
    {
      title: "Uzun Vadeli İş Birliği",
      text: "İthalatçılar, toptancılar, filolar ve servis ağları için kurulan tedarik ilişkileri.",
    },
  ],
  trustPoints: [
    {
      title: "Uluslararası Tedarik Odağı",
      text: "MODEL GRUP, B2B yağ ihracatı ve toptan tedarik etrafında konumlanmıştır.",
    },
    {
      title: "Geniş Yağ Yelpazesi",
      text: "Binek araç yağları, ağır hizmet motor yağları, endüstriyel yağlar, dişli ve transmisyon yağları, antifriz, gresler, deniz yağları ve motosiklet yağları.",
    },
    {
      title: "Distribütör Desteği",
      text: "İthalatçılar, toptancılar ve servis ağları için tasarlanmış iş birliği programları.",
    },
    {
      title: "Esnek Ambalaj",
      text: "Ambalaj seçenekleri perakende, atölye, filo, endüstri ve dökme ihracat talebini destekler.",
    },
  ],
  industries: [
    { name: "Otomotiv", detail: "Binek ve ticari araçlar için motor ve aktarma organı yağları." },
    {
      name: "Ağır Hizmet Taşımacılığı",
      detail: "Kamyon, otobüs ve uzun yol filoları için dayanıklı dizel yağları.",
    },
    {
      name: "Filo Operasyonları",
      detail: "Büyük filoları çalışır tutmak için istikrarlı tedarik programları.",
    },
    {
      name: "Endüstriyel Tesisler",
      detail: "Tesisler ve makineler için hidrolik, kompresör ve sirkülasyon yağları.",
    },
    {
      name: "İş Makineleri",
      detail: "Ekskavatör, yükleyici ve ağır makineler için sağlam yağlar.",
    },
    { name: "Tarım", detail: "Zorlu saha koşulları için üretilen traktör ve ekipman yağları." },
    {
      name: "Denizcilik / Lojistik",
      detail: "Denizcilik ve lojistik operasyonlarını destekleyen yağ tedariği.",
    },
    {
      name: "Servis Ağları",
      detail: "Servis ve onarım ağları için atölye ve yedek parça tedariği.",
    },
  ],
  exportMarkets: [
    "Rusya",
    "Irak",
    "Suriye",
    "İran",
    "Azerbaycan",
    "BAE / Dubai",
    "Katar",
    "Orta Asya",
    "Afrika",
    "40+ ülke",
  ],
};

const ru: SiteContent = {
  exportCards: [
    {
      title: "Контейнерные заказы",
      text: "Полные и смешанные контейнеры, подготовленные для морских и сухопутных перевозок на ваш рынок.",
    },
    {
      title: "Оптовые поставки",
      text: "Дистрибьюторские программы поставок с постоянной доступностью продукции.",
    },
    {
      title: "Экспортная документация",
      text: "Торговые документы, подготовленные для упрощения таможенного оформления.",
    },
    {
      title: "Гибкая упаковка",
      text: "От 1L флаконов до 205L бочек и IBC-контейнеров в соответствии с вашим спросом.",
    },
    {
      title: "Техническое сопоставление продуктов",
      text: "Помощь в подборе классов вязкости и линеек продуктов для ваших задач.",
    },
    {
      title: "Долгосрочное сотрудничество",
      text: "Партнёрские отношения по поставкам, выстроенные для импортёров, оптовиков, автопарков и сервисных сетей.",
    },
  ],
  trustPoints: [
    {
      title: "Фокус на международные поставки",
      text: "MODEL GRUP ориентирован на B2B экспорт и оптовые поставки смазочных материалов.",
    },
    {
      title: "Широкий ассортимент смазочных материалов",
      text: "Масла для легковых автомобилей, моторные масла для тяжёлых условий, промышленные масла, редукторные и трансмиссионные масла, антифриз, смазки, морские масла и масла для мотоциклов.",
    },
    {
      title: "Поддержка дистрибьюторов",
      text: "Программы сотрудничества, разработанные для импортёров, оптовиков и сервисных сетей.",
    },
    {
      title: "Гибкая упаковка",
      text: "Опции упаковки поддерживают розничный, мастерской, автопарковый, промышленный и оптовый экспортный спрос.",
    },
  ],
  industries: [
    {
      name: "Автомобильная промышленность",
      detail: "Масла для двигателей и трансмиссий легковых и коммерческих автомобилей.",
    },
    {
      name: "Тяжёлый транспорт",
      detail: "Надёжные дизельные масла для грузовиков, автобусов и дальних перевозок.",
    },
    {
      name: "Эксплуатация автопарков",
      detail: "Стабильные программы поставок для поддержания работы крупных автопарков.",
    },
    {
      name: "Промышленные объекты",
      detail: "Гидравлические, компрессорные и циркуляционные масла для заводов и машин.",
    },
    {
      name: "Строительная техника",
      detail: "Надёжные смазочные материалы для экскаваторов, погрузчиков и тяжёлой техники.",
    },
    {
      name: "Сельское хозяйство",
      detail: "Масла для тракторов и оборудования, разработанные для суровых полевых условий.",
    },
    {
      name: "Морской транспорт / Логистика",
      detail: "Поставки смазочных материалов, поддерживающие морские и логистические операции.",
    },
    {
      name: "Сервисные сети",
      detail: "Мастерские и вторичные поставки для сервисных и ремонтных сетей.",
    },
  ],
  exportMarkets: [
    "Россия",
    "Ирак",
    "Сирия",
    "Иран",
    "Азербайджан",
    "ОАЭ / Дубай",
    "Катар",
    "Центральная Азия",
    "Африка",
    "40+ стран",
  ],
};

const fa: SiteContent = {
  exportCards: [
    {
      title: "سفارشات کانتینری",
      text: "بارهای کانتینری کامل و مختلط آماده‌شده برای حمل دریایی و زمینی به بازار شما.",
    },
    { title: "تأمین عمده", text: "برنامه‌های تأمین توزیع‌کننده‌محور با موجودی محصول تکرارپذیر." },
    {
      title: "مستندات صادراتی",
      text: "اسناد تجاری آماده‌شده برای پشتیبانی از ترخیص راحت‌تر گمرک.",
    },
    {
      title: "بسته‌بندی انعطاف‌پذیر",
      text: "از بطری‌های ۱ لیتری تا بشکه‌های ۲۰۵ لیتری و مخازن IBC برای تطبیق با تقاضای شما.",
    },
    {
      title: "تطبیق فنی محصول",
      text: "راهنمایی برای تطبیق درجات روانکار و خانواده‌های محصول با کاربرد شما.",
    },
    {
      title: "همکاری بلندمدت",
      text: "روابط تأمین ساخته‌شده برای واردکنندگان، عمده‌فروشان، ناوگان‌ها و شبکه‌های خدمات.",
    },
  ],
  trustPoints: [
    {
      title: "تمرکز بر تأمین بین‌المللی",
      text: "MODEL GRUP حول صادرات B2B روانکار و تأمین عمده محور است.",
    },
    {
      title: "محدوده گسترده روانکار",
      text: "روغن‌های خودروهای سواری، روغن‌های موتور خدمت سنگین، روغن‌های صنعتی، روغن‌های دنده و گیربکس، ضدیخ، گریس‌ها، روغن‌های دریایی و روغن‌های موتورسیکلت.",
    },
    {
      title: "پشتیبانی توزیع‌کننده",
      text: "برنامه‌های همکاری طراحی‌شده برای واردکنندگان، عمده‌فروشان و شبکه‌های خدمات.",
    },
    {
      title: "بسته‌بندی انعطاف‌پذیر",
      text: "گزینه‌های بسته‌بندی از تقاضای خرده‌فروشی، کارگاه، ناوگان، صنعتی و صادرات فله پشتیبانی می‌کند.",
    },
  ],
  industries: [
    { name: "خودرو", detail: "روانکارهای موتور و انتقال قدرت برای خودروهای سواری و تجاری." },
    {
      name: "حمل‌ونقل سنگین",
      detail: "روغن‌های دیزل بادوام برای کامیون‌ها، اتوبوس‌ها و ناوگان‌های حمل‌ونقل دوربرد.",
    },
    {
      name: "عملیات ناوگان",
      detail: "برنامه‌های تأمین ثابت برای نگه‌داشتن ناوگان‌های بزرگ در حال اجرا.",
    },
    {
      name: "تأسیسات صنعتی",
      detail: "روغن‌های هیدرولیک، کمپرسور و گردشی برای کارخانه‌ها و ماشین‌آلات.",
    },
    {
      name: "تجهیزات ساختمانی",
      detail: "روانکارهای مقاوم برای بیل‌مکانیکی‌ها، لودرها و ماشین‌آلات سنگین.",
    },
    { name: "کشاورزی", detail: "روغن‌های تراکتور و تجهیزات ساخته‌شده برای شرایط سخت مزرعه." },
    { name: "دریایی / لجستیک", detail: "تأمین روانکار پشتیبانی‌کننده از عملیات دریایی و لجستیک." },
    { name: "شبکه‌های خدمات", detail: "تأمین کارگاه و بازار ثانوی برای شبکه‌های خدمات و تعمیر." },
  ],
  exportMarkets: [
    "روسیه",
    "عراق",
    "سوریه",
    "ایران",
    "آذربایجان",
    "امارات / دبی",
    "قطر",
    "آسیای مرکزی",
    "آفریقا",
    "۴۰+ کشور",
  ],
};

const ar: SiteContent = {
  exportCards: [
    {
      title: "طلبات الحاويات",
      text: "حمولات حاويات كاملة ومختلطة مُعدَّة للشحن البحري والبري إلى سوقك.",
    },
    { title: "التوريد بالجملة", text: "برامج توريد موجهة للموزعين مع توفر منتجات متكرر." },
    { title: "وثائق التصدير", text: "وثائق تجارية مُعدَّة لدعم التخليص الجمركي الأكثر سلاسة." },
    { title: "التغليف المرن", text: "من زجاجات 1 لتر إلى براميل 205 لتر وخزانات IBC لتلبية طلبك." },
    {
      title: "مطابقة المنتج التقنية",
      text: "إرشادات لمطابقة درجات المواد التشحيمية وعائلات المنتجات مع تطبيقك.",
    },
    {
      title: "التعاون طويل الأمد",
      text: "علاقات توريد مبنية للمستوردين وتجار الجملة والأساطيل وشبكات الخدمات.",
    },
  ],
  trustPoints: [
    {
      title: "تركيز على التوريد الدولي",
      text: "MODEL GRUP موجهة حول تصدير B2B للمواد التشحيمية والتوريد بالجملة.",
    },
    {
      title: "مجموعة واسعة من المواد التشحيمية",
      text: "زيوت سيارات الركاب، زيوت محركات الخدمة الشاقة، الزيوت الصناعية، زيوت التروس وناقل الحركة، مضادات التجمد، الشحوم، الزيوت البحرية وزيوت الدراجات النارية.",
    },
    { title: "دعم الموزعين", text: "برامج تعاون مصممة للمستوردين وتجار الجملة وشبكات الخدمات." },
    {
      title: "التغليف المرن",
      text: "خيارات التغليف تدعم طلب التجزئة والورش والأسطول والصناعي والتصدير بالجملة.",
    },
  ],
  industries: [
    { name: "السيارات", detail: "مواد تشحيمية للمحركات والمحركات لسيارات الركاب والتجارية." },
    {
      name: "النقل الثقيل",
      detail: "زيوت ديزل متينة للشاحنات والحافلات وأساطيل النقل بعيد المدى.",
    },
    { name: "عمليات الأسطول", detail: "برامج توريد ثابتة للحفاظ على سير الأساطيل الكبيرة." },
    { name: "المنشآت الصناعية", detail: "زيوت هيدروليكية وضاغط ودوراني للمصانع والآلات." },
    { name: "معدات البناء", detail: "مواد تشحيمية متينة للحفارات والرافعات والآلات الثقيلة." },
    { name: "الزراعة", detail: "زيوت الجرارات والمعدات المُصنَّعة لظروف الحقل القاسية." },
    {
      name: "البحرية / اللوجستيات",
      detail: "توريد مواد تشحيمية يدعم العمليات البحرية واللوجستية.",
    },
    { name: "شبكات الخدمات", detail: "توريد الورش وما بعد البيع لشبكات الخدمة والإصلاح." },
  ],
  exportMarkets: [
    "روسيا",
    "العراق",
    "سوريا",
    "إيران",
    "أذربيجان",
    "الإمارات / دبي",
    "قطر",
    "آسيا الوسطى",
    "أفريقيا",
    "40+ دولة",
  ],
};

const de: SiteContent = {
  exportCards: [
    {
      title: "Containerbestellungen",
      text: "Voll- und Mischcontainerladungen für See- und Landtransport in Ihren Markt.",
    },
    {
      title: "Großhandelsversorgung",
      text: "Distributor-orientierte Versorgungsprogramme mit wiederholbarer Produktverfügbarkeit.",
    },
    {
      title: "Exportdokumentation",
      text: "Handelsdokumente zur Unterstützung einer reibungsloseren Zollabwicklung.",
    },
    {
      title: "Flexible Verpackung",
      text: "Von 1-L-Flaschen bis 205-L-Fässern und IBC je nach Bedarf.",
    },
    {
      title: "Technische Produktanpassung",
      text: "Beratung zur Anpassung von Schmierstoffklassen und Produktfamilien an Ihre Anwendung.",
    },
    {
      title: "Langfristige Zusammenarbeit",
      text: "Versorgungsbeziehungen für Importeure, Großhändler, Flotten und Servicenetze.",
    },
  ],
  trustPoints: [
    {
      title: "Internationaler Versorgungsfokus",
      text: "MODEL GRUP ist auf B2B-Schmierstoffexport und Großhandelsversorgung ausgerichtet.",
    },
    {
      title: "Breites Schmierstoffsortiment",
      text: "Pkw-Öle, Hochleistungs-Motorenöle, Industrieöle, Getriebe- und Transmissionsöle, Frostschutz, Fette, Schiffsöle und Motorradöle.",
    },
    {
      title: "Distributor-Support",
      text: "Kooperationsprogramme für Importeure, Großhändler und Servicenetze.",
    },
    {
      title: "Flexible Verpackung",
      text: "Verpackungsoptionen unterstützen Einzelhandel, Werkstatt, Flotte, Industrie und Bulk-Export.",
    },
  ],
  industries: [
    {
      name: "Automobil",
      detail: "Motor- und Antriebsstrangschmierstoffe für Pkw und Nutzfahrzeuge.",
    },
    {
      name: "Schwertransport",
      detail: "Langlebige Dieselöle für Lkw, Busse und Fernverkehrsflotten.",
    },
    { name: "Flottenbetrieb", detail: "Konsistente Versorgungsprogramme für große Flotten." },
    {
      name: "Industrieanlagen",
      detail: "Hydraulik-, Kompressor- und Umlauföle für Fabriken und Maschinen.",
    },
    {
      name: "Baumaschinen",
      detail: "Robuste Schmierstoffe für Bagger, Radlader und schwere Maschinen.",
    },
    { name: "Landwirtschaft", detail: "Traktor- und Gerätöle für anspruchsvolle Feldbedingungen." },
    {
      name: "Maritime / Logistik",
      detail: "Schmierstoffversorgung für maritime und Logistikoperationen.",
    },
    {
      name: "Servicenetze",
      detail: "Werkstatt- und Aftermarket-Versorgung für Service- und Reparaturnetzwerke.",
    },
  ],
  exportMarkets: [
    "Russland",
    "Irak",
    "Syrien",
    "Iran",
    "Aserbaidschan",
    "VAE / Dubai",
    "Katar",
    "Zentralasien",
    "Afrika",
    "40+ Länder",
  ],
};

const fr: SiteContent = {
  exportCards: [
    {
      title: "Commandes en container",
      text: "Chargements de containers complets et mixtes préparés pour le fret maritime et terrestre vers votre marché.",
    },
    {
      title: "Approvisionnement en gros",
      text: "Programmes d'approvisionnement axés distributeur avec disponibilité produit répétable.",
    },
    {
      title: "Documentation d'export",
      text: "Documents commerciaux préparés pour faciliter le dédouanement.",
    },
    {
      title: "Emballage flexible",
      text: "De bouteilles 1L aux fûts 205L et cuves IBC selon votre demande.",
    },
    {
      title: "Adaptation technique des produits",
      text: "Conseils pour adapter les grades de lubrifiants et familles de produits à votre application.",
    },
    {
      title: "Coopération à long terme",
      text: "Relations d'approvisionnement conçues pour les importateurs, grossistes, flottes et réseaux de services.",
    },
  ],
  trustPoints: [
    {
      title: "Focus approvisionnement international",
      text: "MODEL GRUP est orienté autour de l'export B2B de lubrifiants et de l'approvisionnement en gros.",
    },
    {
      title: "Large gamme de lubrifiants",
      text: "Huiles VP, huiles moteur poids lourd, huiles industrielles, huiles d'engrenage et de transmission, antigel, graisses, huiles marines et huiles moto.",
    },
    {
      title: "Support distributeur",
      text: "Programmes de coopération conçus pour les importateurs, grossistes et réseaux de services.",
    },
    {
      title: "Emballage flexible",
      text: "Les options d'emballage soutiennent la demande en détail, atelier, flotte, industrielle et export en vrac.",
    },
  ],
  industries: [
    {
      name: "Automobile",
      detail: "Lubrifiants moteur et transmission pour véhicules particuliers et commerciaux.",
    },
    {
      name: "Transport lourd",
      detail: "Huiles diesel durables pour camions, bus et flottes longue distance.",
    },
    {
      name: "Opérations de flottes",
      detail:
        "Programmes d'approvisionnement réguliers pour maintenir les grandes flottes opérationnelles.",
    },
    {
      name: "Installations industrielles",
      detail: "Huiles hydrauliques, compresseur et circulantes pour usines et machines.",
    },
    {
      name: "Équipements de construction",
      detail: "Lubrifiants robustes pour pelleteuses, chargeuses et machines lourdes.",
    },
    {
      name: "Agriculture",
      detail: "Huiles pour tracteurs et équipements adaptées aux conditions de terrain exigeantes.",
    },
    {
      name: "Maritime / Logistique",
      detail: "Approvisionnement en lubrifiants soutenant les opérations maritimes et logistiques.",
    },
    {
      name: "Réseaux de services",
      detail: "Approvisionnement atelier et après-vente pour réseaux de service et de réparation.",
    },
  ],
  exportMarkets: [
    "Russie",
    "Irak",
    "Syrie",
    "Iran",
    "Azerbaïdjan",
    "Émirats / Dubaï",
    "Qatar",
    "Asie centrale",
    "Afrique",
    "40+ pays",
  ],
};

export const SITE_CONTENT: Record<Locale, SiteContent> = { en, tr, ru, fa, ar, de, fr };
