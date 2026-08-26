import type { Locale } from "@/lib/i18n";

type FacilityCard = {
  title: string;
  description: string;
  alt: string;
};

type FacilityShowcaseCopy = {
  eyebrow: string;
  title: string;
  description: string;
  cards: [FacilityCard, FacilityCard, FacilityCard, FacilityCard, FacilityCard];
  roadEyebrow: string;
  roadTitle: string;
  roadDescription: string;
  suvCaption: string;
  suvAlt: string;
  pickupCaption: string;
  pickupAlt: string;
};

export const FACILITY_SHOWCASE_COPY: Record<Locale, FacilityShowcaseCopy> = {
  en: {
    eyebrow: "Production & Quality",
    title: "Inside the Yokohama Motor Oil Facility",
    description:
      "A closer look at the production, filling and laboratory infrastructure behind the Yokohama motor oil range.",
    cards: [
      {
        title: "Production Facility",
        description: "The Yokohama Motor Oil facility and its dedicated production site.",
        alt: "Exterior of the Yokohama Motor Oil production facility",
      },
      {
        title: "Blending & Storage",
        description: "Stainless-steel tanks support controlled lubricant preparation and storage.",
        alt: "Stainless-steel tanks and production line inside the Yokohama facility",
      },
      {
        title: "Production Infrastructure",
        description: "Organized tank and transfer systems support consistent production workflows.",
        alt: "Large storage tanks inside the Yokohama motor oil facility",
      },
      {
        title: "Filling Line",
        description: "Filling and labeling equipment prepares products for market-ready packaging.",
        alt: "Motor oil filling and labeling line at the Yokohama facility",
      },
      {
        title: "Quality Laboratory",
        description: "Laboratory equipment supports product testing and quality-control processes.",
        alt: "Quality-control laboratory at the Yokohama motor oil facility",
      },
    ],
    roadEyebrow: "Yokohama on the Road",
    roadTitle: "A Visible Brand Presence",
    roadDescription:
      "Yokohama-branded vehicles carry the motor oil identity beyond the facility and into the field.",
    suvCaption: "Yokohama-branded SUV",
    suvAlt: "Yokohama Motor Oil branded SUV in front of the production facility",
    pickupCaption: "Yokohama-branded pickup",
    pickupAlt: "Yokohama Motor Oil branded pickup in front of the production facility",
  },
  tr: {
    eyebrow: "Üretim ve Kalite",
    title: "Yokohama Motor Oil Tesisinin İçinden",
    description:
      "Yokohama motor yağı serisinin arkasındaki üretim, dolum ve laboratuvar altyapısına yakından bakın.",
    cards: [
      {
        title: "Üretim Tesisi",
        description: "Yokohama Motor Oil tesisi ve markaya ayrılmış üretim alanı.",
        alt: "Yokohama Motor Oil üretim tesisinin dış görünümü",
      },
      {
        title: "Harmanlama ve Depolama",
        description:
          "Paslanmaz çelik tanklar, kontrollü yağ hazırlama ve depolama süreçlerini destekler.",
        alt: "Yokohama tesisindeki paslanmaz çelik tanklar ve üretim hattı",
      },
      {
        title: "Üretim Altyapısı",
        description: "Düzenli tank ve aktarım sistemleri, tutarlı üretim iş akışlarını destekler.",
        alt: "Yokohama motor yağı tesisindeki büyük depolama tankları",
      },
      {
        title: "Dolum Hattı",
        description: "Dolum ve etiketleme ekipmanları, ürünleri pazara hazır ambalajlara hazırlar.",
        alt: "Yokohama tesisindeki motor yağı dolum ve etiketleme hattı",
      },
      {
        title: "Kalite Laboratuvarı",
        description: "Laboratuvar ekipmanları ürün test ve kalite kontrol süreçlerini destekler.",
        alt: "Yokohama motor yağı tesisindeki kalite kontrol laboratuvarı",
      },
    ],
    roadEyebrow: "Yokohama Yollarda",
    roadTitle: "Sahada Güçlü Marka Görünürlüğü",
    roadDescription:
      "Yokohama giydirmeli araçlar, motor yağı marka kimliğini tesisin dışına ve sahaya taşır.",
    suvCaption: "Yokohama giydirmeli SUV",
    suvAlt: "Üretim tesisi önünde Yokohama Motor Oil giydirmeli SUV",
    pickupCaption: "Yokohama giydirmeli pickup",
    pickupAlt: "Üretim tesisi önünde Yokohama Motor Oil giydirmeli pickup",
  },
  ru: {
    eyebrow: "Производство и качество",
    title: "Внутри предприятия Yokohama Motor Oil",
    description:
      "Ближе познакомьтесь с производственной, фасовочной и лабораторной инфраструктурой линейки моторных масел Yokohama.",
    cards: [
      {
        title: "Производственный объект",
        description:
          "Предприятие Yokohama Motor Oil и специализированная производственная площадка.",
        alt: "Внешний вид предприятия Yokohama Motor Oil",
      },
      {
        title: "Смешивание и хранение",
        description:
          "Резервуары из нержавеющей стали поддерживают контролируемую подготовку и хранение масел.",
        alt: "Резервуары и производственная линия на предприятии Yokohama",
      },
      {
        title: "Производственная инфраструктура",
        description:
          "Организованные системы резервуаров и перекачки поддерживают стабильный рабочий процесс.",
        alt: "Большие резервуары на предприятии моторных масел Yokohama",
      },
      {
        title: "Линия розлива",
        description: "Оборудование для розлива и маркировки готовит продукцию к поставке на рынок.",
        alt: "Линия розлива и маркировки моторных масел Yokohama",
      },
      {
        title: "Лаборатория качества",
        description:
          "Лабораторное оборудование поддерживает испытания и контроль качества продукции.",
        alt: "Лаборатория контроля качества Yokohama Motor Oil",
      },
    ],
    roadEyebrow: "Yokohama в пути",
    roadTitle: "Заметное присутствие бренда",
    roadDescription:
      "Автомобили в фирменном оформлении Yokohama представляют бренд моторных масел за пределами предприятия.",
    suvCaption: "Внедорожник в оформлении Yokohama",
    suvAlt: "Внедорожник Yokohama Motor Oil перед производственным объектом",
    pickupCaption: "Пикап в оформлении Yokohama",
    pickupAlt: "Пикап Yokohama Motor Oil перед производственным объектом",
  },
  fa: {
    eyebrow: "تولید و کیفیت",
    title: "نگاهی به داخل تأسیسات Yokohama Motor Oil",
    description:
      "نگاهی نزدیک به زیرساخت‌های تولید، پرکنی و آزمایشگاه در پشت مجموعه روغن‌موتورهای Yokohama.",
    cards: [
      {
        title: "تأسیسات تولید",
        description: "تأسیسات Yokohama Motor Oil و فضای اختصاصی تولید آن.",
        alt: "نمای بیرونی تأسیسات تولید Yokohama Motor Oil",
      },
      {
        title: "اختلاط و ذخیره‌سازی",
        description: "مخازن استیل از آماده‌سازی و ذخیره‌سازی کنترل‌شده روانکارها پشتیبانی می‌کنند.",
        alt: "مخازن استیل و خط تولید در تأسیسات Yokohama",
      },
      {
        title: "زیرساخت تولید",
        description: "سامانه‌های منظم مخزن و انتقال، روندهای پایدار تولید را پشتیبانی می‌کنند.",
        alt: "مخازن بزرگ ذخیره‌سازی در تأسیسات روغن‌موتور Yokohama",
      },
      {
        title: "خط پرکنی",
        description: "تجهیزات پرکنی و برچسب‌زنی، محصولات را برای عرضه به بازار آماده می‌کنند.",
        alt: "خط پرکنی و برچسب‌زنی روغن‌موتور در تأسیسات Yokohama",
      },
      {
        title: "آزمایشگاه کیفیت",
        description: "تجهیزات آزمایشگاهی از آزمون محصول و فرایندهای کنترل کیفیت پشتیبانی می‌کنند.",
        alt: "آزمایشگاه کنترل کیفیت در تأسیسات Yokohama Motor Oil",
      },
    ],
    roadEyebrow: "Yokohama در جاده",
    roadTitle: "حضوری دیده‌شده برای برند",
    roadDescription:
      "خودروهای دارای هویت بصری Yokohama، برند روغن‌موتور را بیرون از تأسیسات و در میدان معرفی می‌کنند.",
    suvCaption: "شاسی‌بلند با نشان Yokohama",
    suvAlt: "خودروی شاسی‌بلند Yokohama Motor Oil مقابل تأسیسات تولید",
    pickupCaption: "وانت با نشان Yokohama",
    pickupAlt: "خودروی وانت Yokohama Motor Oil مقابل تأسیسات تولید",
  },
  ar: {
    eyebrow: "الإنتاج والجودة",
    title: "من داخل منشأة Yokohama Motor Oil",
    description:
      "نظرة عن قرب على بنية الإنتاج والتعبئة والمختبر التي تقف خلف مجموعة زيوت محركات Yokohama.",
    cards: [
      {
        title: "منشأة الإنتاج",
        description: "منشأة Yokohama Motor Oil ومساحة الإنتاج المخصصة لها.",
        alt: "الواجهة الخارجية لمنشأة إنتاج Yokohama Motor Oil",
      },
      {
        title: "الخلط والتخزين",
        description: "تدعم خزانات الفولاذ المقاوم للصدأ إعداد زيوت التشحيم وتخزينها بصورة منظمة.",
        alt: "خزانات فولاذية وخط إنتاج داخل منشأة Yokohama",
      },
      {
        title: "البنية التحتية للإنتاج",
        description: "تدعم أنظمة الخزانات والنقل المنظمة سير عمل إنتاج متسق.",
        alt: "خزانات تخزين كبيرة داخل منشأة زيوت محركات Yokohama",
      },
      {
        title: "خط التعبئة",
        description: "تُجهّز معدات التعبئة ووضع الملصقات المنتجات في عبوات جاهزة للسوق.",
        alt: "خط تعبئة ووضع ملصقات زيوت المحركات في منشأة Yokohama",
      },
      {
        title: "مختبر الجودة",
        description: "تدعم معدات المختبر عمليات اختبار المنتجات ومراقبة الجودة.",
        alt: "مختبر مراقبة الجودة في منشأة Yokohama Motor Oil",
      },
    ],
    roadEyebrow: "Yokohama على الطريق",
    roadTitle: "حضور واضح للعلامة التجارية",
    roadDescription: "تنقل المركبات بهوية Yokohama علامة زيوت المحركات من المنشأة إلى الميدان.",
    suvCaption: "سيارة دفع رباعي بهوية Yokohama",
    suvAlt: "سيارة دفع رباعي بهوية Yokohama Motor Oil أمام منشأة الإنتاج",
    pickupCaption: "شاحنة بيك أب بهوية Yokohama",
    pickupAlt: "شاحنة بيك أب بهوية Yokohama Motor Oil أمام منشأة الإنتاج",
  },
  de: {
    eyebrow: "Produktion & Qualität",
    title: "Einblick in die Anlage von Yokohama Motor Oil",
    description:
      "Ein näherer Blick auf die Produktions-, Abfüll- und Laborinfrastruktur hinter dem Motoröl-Sortiment von Yokohama.",
    cards: [
      {
        title: "Produktionsanlage",
        description: "Die Anlage von Yokohama Motor Oil mit eigenem Produktionsbereich.",
        alt: "Außenansicht der Produktionsanlage von Yokohama Motor Oil",
      },
      {
        title: "Mischen & Lagern",
        description:
          "Edelstahltanks unterstützen die kontrollierte Aufbereitung und Lagerung von Schmierstoffen.",
        alt: "Edelstahltanks und Produktionslinie in der Yokohama-Anlage",
      },
      {
        title: "Produktionsinfrastruktur",
        description:
          "Geordnete Tank- und Transfersysteme unterstützen gleichmäßige Produktionsabläufe.",
        alt: "Große Lagertanks in der Motoröl-Anlage von Yokohama",
      },
      {
        title: "Abfülllinie",
        description:
          "Abfüll- und Etikettiertechnik bereitet Produkte für marktgerechte Gebinde vor.",
        alt: "Abfüll- und Etikettierlinie für Motoröl in der Yokohama-Anlage",
      },
      {
        title: "Qualitätslabor",
        description: "Laborausrüstung unterstützt Produktprüfungen und Qualitätskontrollprozesse.",
        alt: "Qualitätskontrolllabor in der Anlage von Yokohama Motor Oil",
      },
    ],
    roadEyebrow: "Yokohama unterwegs",
    roadTitle: "Sichtbare Markenpräsenz",
    roadDescription:
      "Fahrzeuge im Yokohama-Design tragen die Motoröl-Markenidentität über die Anlage hinaus ins Einsatzgebiet.",
    suvCaption: "SUV im Yokohama-Design",
    suvAlt: "SUV im Design von Yokohama Motor Oil vor der Produktionsanlage",
    pickupCaption: "Pickup im Yokohama-Design",
    pickupAlt: "Pickup im Design von Yokohama Motor Oil vor der Produktionsanlage",
  },
  fr: {
    eyebrow: "Production et qualité",
    title: "Au cœur du site Yokohama Motor Oil",
    description:
      "Découvrez de plus près les infrastructures de production, de remplissage et de laboratoire qui accompagnent la gamme d’huiles moteur Yokohama.",
    cards: [
      {
        title: "Site de production",
        description: "Le site Yokohama Motor Oil et son espace dédié à la production.",
        alt: "Vue extérieure du site de production Yokohama Motor Oil",
      },
      {
        title: "Mélange et stockage",
        description:
          "Les cuves en acier inoxydable accompagnent la préparation et le stockage contrôlés des lubrifiants.",
        alt: "Cuves en acier inoxydable et ligne de production du site Yokohama",
      },
      {
        title: "Infrastructure de production",
        description:
          "Des systèmes organisés de cuves et de transfert soutiennent des flux de production réguliers.",
        alt: "Grandes cuves de stockage du site d’huile moteur Yokohama",
      },
      {
        title: "Ligne de remplissage",
        description:
          "Les équipements de remplissage et d’étiquetage préparent les produits dans des emballages prêts pour le marché.",
        alt: "Ligne de remplissage et d’étiquetage d’huile moteur du site Yokohama",
      },
      {
        title: "Laboratoire qualité",
        description:
          "Les équipements du laboratoire accompagnent les essais produits et les processus de contrôle qualité.",
        alt: "Laboratoire de contrôle qualité du site Yokohama Motor Oil",
      },
    ],
    roadEyebrow: "Yokohama sur la route",
    roadTitle: "Une présence de marque visible",
    roadDescription:
      "Les véhicules aux couleurs de Yokohama prolongent l’identité de la marque d’huile moteur au-delà du site.",
    suvCaption: "SUV aux couleurs de Yokohama",
    suvAlt: "SUV aux couleurs de Yokohama Motor Oil devant le site de production",
    pickupCaption: "Pick-up aux couleurs de Yokohama",
    pickupAlt: "Pick-up aux couleurs de Yokohama Motor Oil devant le site de production",
  },
};
