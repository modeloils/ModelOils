import type { Locale } from "./i18n/types";

export type LegalPageKind = "privacy" | "kvkk";

interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

interface LegalPageCopy {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

interface LegalLocaleCopy {
  labels: {
    office: string;
    factory: string;
    privacy: string;
    kvkk: string;
    updated: string;
    contact: string;
  };
  formNotice: string;
  pages: Record<LegalPageKind, LegalPageCopy>;
}

export const LEGAL_CONTENT: Record<Locale, LegalLocaleCopy> = {
  en: {
    labels: {
      office: "Office",
      factory: "Factory",
      privacy: "Privacy Policy",
      kvkk: "Personal Data Notice (KVKK)",
      updated: "Last updated: 26 August 2026",
      contact: "Contact",
    },
    formNotice:
      "We use the information you provide to understand your request, contact you and prepare a suitable offer.",
    pages: {
      privacy: {
        eyebrow: "Legal Information",
        title: "Privacy Policy",
        description:
          "This policy explains how MODEL GRUP handles information submitted through this website.",
        sections: [
          {
            title: "Information we collect",
            paragraphs: [
              "When you request a quote, we may collect your name, company, country, email address, phone number, product and packaging interests, estimated quantity and message.",
              "The website may also process essential technical information such as your language preference, browser request and server security logs.",
            ],
          },
          {
            title: "Why we use it",
            paragraphs: [
              "We use this information to understand what customers need, contact them, prepare product and supply offers, answer questions, maintain business relationships and protect the website.",
            ],
          },
          {
            title: "Service providers and retention",
            paragraphs: [
              "Quote forms are transmitted through Web3Forms and may be processed by the service provider outside your country. Access is limited to MODEL GRUP personnel and providers that need the information to operate the inquiry service.",
              "We retain inquiry information only for as long as reasonably necessary for the request, the resulting business relationship and applicable legal obligations.",
            ],
          },
          {
            title: "Your choices and rights",
            paragraphs: [
              "You may ask MODEL GRUP to provide information about your data, correct it, delete it or restrict its use where applicable. You may also object to certain processing or withdraw consent where processing is based on consent.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "Personal Data",
        title: "KVKK Information Notice",
        description:
          "This notice explains the processing of inquiry data under Türkiye's Personal Data Protection Law No. 6698.",
        sections: [
          {
            title: "Data controller",
            paragraphs: [
              "MODEL GRUP acts as the data controller for personal data submitted through this website and its business communication channels.",
            ],
          },
          {
            title: "Data and processing purposes",
            paragraphs: [
              "Identity, contact, company, country, request, product, packaging, quantity and message information may be processed to understand your request, contact you, prepare an offer and manage the related commercial communication.",
            ],
          },
          {
            title: "Collection method and legal basis",
            paragraphs: [
              "Data is collected electronically when you submit a form or contact us. Depending on the request, processing may rely on steps necessary for a contract, compliance with legal obligations, legitimate interests that do not override your fundamental rights, or explicit consent where required.",
            ],
          },
          {
            title: "Recipients and transfers",
            paragraphs: [
              "Data may be shared, only where necessary, with authorized MODEL GRUP staff, infrastructure and form service providers, legal advisers and public authorities. Web3Forms may involve an international transfer; applicable transfer safeguards must be maintained by MODEL GRUP.",
            ],
          },
          {
            title: "Your rights under Article 11",
            paragraphs: [
              "You may contact MODEL GRUP to learn whether your data is processed, request information, correction or deletion, learn recipients, object to certain automated outcomes and request compensation where the legal conditions are met.",
            ],
          },
        ],
      },
    },
  },
  tr: {
    labels: {
      office: "Merkez",
      factory: "Fabrika",
      privacy: "Gizlilik Politikası",
      kvkk: "KVKK Aydınlatma Metni",
      updated: "Son güncelleme: 26 Ağustos 2026",
      contact: "İletişim",
    },
    formNotice:
      "Verdiğiniz bilgileri talebinizi anlamak, sizinle iletişime geçmek ve uygun bir teklif hazırlamak için kullanıyoruz.",
    pages: {
      privacy: {
        eyebrow: "Yasal Bilgilendirme",
        title: "Gizlilik Politikası",
        description:
          "Bu politika, MODEL GRUP'un internet sitesi üzerinden iletilen bilgileri nasıl kullandığını açıklar.",
        sections: [
          {
            title: "Topladığımız bilgiler",
            paragraphs: [
              "Teklif talebi gönderdiğinizde adınız, şirketiniz, ülkeniz, e-posta adresiniz, telefon numaranız, ürün ve ambalaj tercihleriniz, tahmini miktarınız ve mesajınız alınabilir.",
              "Dil tercihiniz, tarayıcı isteğiniz ve sunucu güvenlik kayıtları gibi zorunlu teknik bilgiler de işlenebilir.",
            ],
          },
          {
            title: "Bilgileri neden kullanıyoruz?",
            paragraphs: [
              "Bu bilgileri müşterilerin ne istediğini anlamak, müşterilerle iletişime geçmek, ürün ve tedarik teklifi hazırlamak, soruları yanıtlamak, ticari ilişkiyi yürütmek ve internet sitesini korumak için kullanıyoruz.",
            ],
          },
          {
            title: "Hizmet sağlayıcılar ve saklama",
            paragraphs: [
              "Teklif formları Web3Forms üzerinden iletilir ve hizmet sağlayıcı tarafından yurt dışında işlenebilir. Bilgilere yalnızca talep süreci için ihtiyaç duyan MODEL GRUP çalışanları ve hizmet sağlayıcıları erişebilir.",
              "Talep bilgileri yalnızca başvurunun, oluşabilecek ticari ilişkinin ve yasal yükümlülüklerin gerektirdiği süre boyunca saklanır.",
            ],
          },
          {
            title: "Tercihleriniz ve haklarınız",
            paragraphs: [
              "Uygulanabildiği ölçüde verileriniz hakkında bilgi, düzeltme, silme veya işlemenin sınırlandırılmasını isteyebilirsiniz. Açık rızaya dayanan işlemlerde rızanızı geri çekebilirsiniz.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "Kişisel Veriler",
        title: "KVKK Aydınlatma Metni",
        description:
          "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında talep bilgilerinin işlenmesini açıklar.",
        sections: [
          {
            title: "Veri sorumlusu",
            paragraphs: [
              "Bu internet sitesi ve ticari iletişim kanalları üzerinden iletilen kişisel veriler bakımından veri sorumlusu MODEL GRUP'tur.",
            ],
          },
          {
            title: "İşlenen veriler ve amaçlar",
            paragraphs: [
              "Kimlik, iletişim, şirket, ülke, talep, ürün, ambalaj, miktar ve mesaj bilgileriniz; talebinizi anlamak, sizinle iletişime geçmek, teklif hazırlamak ve ilgili ticari iletişimi yürütmek amacıyla işlenebilir.",
            ],
          },
          {
            title: "Toplama yöntemi ve hukuki sebep",
            paragraphs: [
              "Veriler form gönderdiğinizde veya bizimle iletişime geçtiğinizde elektronik olarak toplanır. Talebin niteliğine göre sözleşmenin kurulması veya ifası, hukuki yükümlülükler, temel haklarınıza zarar vermeyen meşru menfaat ya da gerekli durumlarda açık rıza hukuki sebeplerine dayanılabilir.",
            ],
          },
          {
            title: "Aktarım yapılan taraflar",
            paragraphs: [
              "Veriler yalnızca gerekli olduğu ölçüde yetkili MODEL GRUP çalışanları, altyapı ve form hizmeti sağlayıcıları, hukuk danışmanları ve yetkili kamu kurumlarıyla paylaşılabilir. Web3Forms kullanımı yurt dışına aktarım içerebilir; ilgili aktarım güvencelerinin sağlanması MODEL GRUP tarafından yönetilir.",
            ],
          },
          {
            title: "KVKK'nın 11. maddesindeki haklarınız",
            paragraphs: [
              "Verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme veya silme isteme, aktarılan kişileri öğrenme, belirli otomatik sonuçlara itiraz etme ve kanuni şartlarda zararınızın giderilmesini isteme haklarınız için MODEL GRUP ile iletişime geçebilirsiniz.",
            ],
          },
        ],
      },
    },
  },
  ru: {
    labels: {
      office: "Офис",
      factory: "Завод",
      privacy: "Политика конфиденциальности",
      kvkk: "Уведомление о персональных данных (KVKK)",
      updated: "Обновлено: 26 августа 2026 г.",
      contact: "Контакты",
    },
    formNotice:
      "Мы используем предоставленные данные, чтобы понять ваш запрос, связаться с вами и подготовить подходящее предложение.",
    pages: {
      privacy: {
        eyebrow: "Правовая информация",
        title: "Политика конфиденциальности",
        description:
          "Политика объясняет, как MODEL GRUP обрабатывает информацию, отправленную через сайт.",
        sections: [
          {
            title: "Какие данные мы собираем",
            paragraphs: [
              "При запросе предложения мы можем получить имя, компанию, страну, email, телефон, интересующие продукты и упаковку, количество и сообщение.",
              "Также могут обрабатываться необходимые технические данные: язык, запрос браузера и журналы безопасности.",
            ],
          },
          {
            title: "Цели использования",
            paragraphs: [
              "Данные используются, чтобы понять потребности клиента, связаться с ним, подготовить предложение, ответить на вопросы, вести деловые отношения и защищать сайт.",
            ],
          },
          {
            title: "Поставщики услуг и хранение",
            paragraphs: [
              "Формы передаются через Web3Forms и могут обрабатываться за пределами вашей страны. Доступ имеют только уполномоченные сотрудники MODEL GRUP и необходимые поставщики услуг.",
              "Информация хранится только столько, сколько нужно для запроса, деловых отношений и выполнения закона.",
            ],
          },
          {
            title: "Ваши права",
            paragraphs: [
              "В применимых случаях вы можете запросить доступ, исправление, удаление или ограничение обработки и отозвать согласие, если обработка основана на согласии.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "Персональные данные",
        title: "Уведомление KVKK",
        description: "Уведомление описывает обработку данных обращений по турецкому Закону № 6698.",
        sections: [
          {
            title: "Оператор данных",
            paragraphs: ["MODEL GRUP является оператором данных, отправленных через этот сайт."],
          },
          {
            title: "Данные и цели",
            paragraphs: [
              "Контактные и деловые данные обрабатываются для понимания запроса, связи, подготовки предложения и ведения коммерческой переписки.",
            ],
          },
          {
            title: "Метод и правовое основание",
            paragraphs: [
              "Данные собираются электронно. Основанием может быть подготовка или исполнение договора, законная обязанность, законный интерес либо согласие, когда оно требуется.",
            ],
          },
          {
            title: "Получатели и передача",
            paragraphs: [
              "При необходимости данные могут передаваться сотрудникам MODEL GRUP, поставщикам инфраструктуры и форм, консультантам и органам власти. Web3Forms может включать международную передачу.",
            ],
          },
          {
            title: "Права по статье 11",
            paragraphs: [
              "Для доступа, исправления, удаления и иных предусмотренных законом запросов свяжитесь с MODEL GRUP.",
            ],
          },
        ],
      },
    },
  },
  fa: {
    labels: {
      office: "دفتر",
      factory: "کارخانه",
      privacy: "سیاست حریم خصوصی",
      kvkk: "اطلاعیه داده‌های شخصی (KVKK)",
      updated: "آخرین به‌روزرسانی: ۲۶ اوت ۲۰۲۶",
      contact: "تماس",
    },
    formNotice:
      "از اطلاعات شما برای درک درخواست، تماس با شما و تهیه پیشنهاد مناسب استفاده می‌کنیم.",
    pages: {
      privacy: {
        eyebrow: "اطلاعات حقوقی",
        title: "سیاست حریم خصوصی",
        description:
          "این سیاست نحوه استفاده MODEL GRUP از اطلاعات ارسال‌شده در وب‌سایت را توضیح می‌دهد.",
        sections: [
          {
            title: "اطلاعاتی که جمع‌آوری می‌کنیم",
            paragraphs: [
              "هنگام درخواست قیمت، ممکن است نام، شرکت، کشور، ایمیل، تلفن، محصول، بسته‌بندی، مقدار و پیام شما دریافت شود.",
              "اطلاعات فنی ضروری مانند زبان، درخواست مرورگر و گزارش‌های امنیتی نیز ممکن است پردازش شوند.",
            ],
          },
          {
            title: "هدف استفاده",
            paragraphs: [
              "اطلاعات برای درک نیاز مشتری، تماس، تهیه پیشنهاد، پاسخ به پرسش‌ها، مدیریت ارتباط تجاری و حفاظت از سایت استفاده می‌شود.",
            ],
          },
          {
            title: "ارائه‌دهندگان خدمات و نگهداری",
            paragraphs: [
              "فرم‌ها از طریق Web3Forms ارسال می‌شوند و ممکن است خارج از کشور شما پردازش شوند. دسترسی به کارکنان مجاز MODEL GRUP و ارائه‌دهندگان ضروری محدود است.",
              "اطلاعات فقط تا زمانی نگهداری می‌شود که برای درخواست، رابطه تجاری و الزامات قانونی لازم باشد.",
            ],
          },
          {
            title: "حقوق شما",
            paragraphs: [
              "در موارد قابل اجرا می‌توانید دسترسی، اصلاح، حذف یا محدودسازی داده‌ها را درخواست کرده و رضایت خود را پس بگیرید.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "داده‌های شخصی",
        title: "اطلاعیه KVKK",
        description:
          "این اطلاعیه پردازش داده‌های درخواست را طبق قانون شماره ۶۶۹۸ ترکیه توضیح می‌دهد.",
        sections: [
          {
            title: "مسئول داده",
            paragraphs: ["MODEL GRUP مسئول داده‌های ارسال‌شده از طریق این وب‌سایت است."],
          },
          {
            title: "داده‌ها و اهداف",
            paragraphs: [
              "داده‌های تماس و تجاری برای درک درخواست، تماس با شما، تهیه پیشنهاد و مدیریت ارتباط تجاری پردازش می‌شوند.",
            ],
          },
          {
            title: "روش و مبنای قانونی",
            paragraphs: [
              "داده‌ها به‌صورت الکترونیکی جمع‌آوری می‌شوند و حسب مورد بر قرارداد، تکلیف قانونی، منفعت مشروع یا رضایت لازم تکیه دارند.",
            ],
          },
          {
            title: "دریافت‌کنندگان و انتقال",
            paragraphs: [
              "در صورت ضرورت، داده‌ها با کارکنان MODEL GRUP، ارائه‌دهندگان زیرساخت و فرم، مشاوران و مراجع قانونی به اشتراک گذاشته می‌شوند. Web3Forms ممکن است شامل انتقال بین‌المللی باشد.",
            ],
          },
          {
            title: "حقوق ماده ۱۱",
            paragraphs: [
              "برای دسترسی، اصلاح، حذف و سایر درخواست‌های قانونی با MODEL GRUP تماس بگیرید.",
            ],
          },
        ],
      },
    },
  },
  ar: {
    labels: {
      office: "المكتب",
      factory: "المصنع",
      privacy: "سياسة الخصوصية",
      kvkk: "إشعار البيانات الشخصية (KVKK)",
      updated: "آخر تحديث: 26 أغسطس 2026",
      contact: "اتصال",
    },
    formNotice: "نستخدم المعلومات التي تقدمها لفهم طلبك والتواصل معك وإعداد عرض مناسب.",
    pages: {
      privacy: {
        eyebrow: "معلومات قانونية",
        title: "سياسة الخصوصية",
        description: "توضح هذه السياسة كيفية تعامل MODEL GRUP مع المعلومات المرسلة عبر الموقع.",
        sections: [
          {
            title: "المعلومات التي نجمعها",
            paragraphs: [
              "عند طلب عرض سعر قد نجمع الاسم والشركة والدولة والبريد والهاتف واهتمامات المنتج والتعبئة والكمية والرسالة.",
              "قد تتم معالجة معلومات تقنية ضرورية مثل اللغة وطلب المتصفح وسجلات الأمان.",
            ],
          },
          {
            title: "أسباب الاستخدام",
            paragraphs: [
              "نستخدم المعلومات لفهم احتياجات العميل والتواصل معه وإعداد العرض والإجابة عن الأسئلة وإدارة العلاقة التجارية وحماية الموقع.",
            ],
          },
          {
            title: "مقدمو الخدمة والاحتفاظ",
            paragraphs: [
              "تُنقل النماذج عبر Web3Forms وقد تُعالج خارج بلدك. يقتصر الوصول على موظفي MODEL GRUP ومقدمي الخدمة الضروريين.",
              "نحتفظ بالمعلومات فقط طوال المدة اللازمة للطلب والعلاقة التجارية والالتزامات القانونية.",
            ],
          },
          {
            title: "حقوقك",
            paragraphs: [
              "يمكنك، حيث ينطبق، طلب الوصول أو التصحيح أو الحذف أو تقييد المعالجة وسحب الموافقة عندما تكون أساس المعالجة.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "البيانات الشخصية",
        title: "إشعار KVKK",
        description: "يشرح هذا الإشعار معالجة بيانات الطلب وفق القانون التركي رقم 6698.",
        sections: [
          {
            title: "مسؤول البيانات",
            paragraphs: ["MODEL GRUP هو مسؤول البيانات المرسلة عبر هذا الموقع."],
          },
          {
            title: "البيانات والأغراض",
            paragraphs: [
              "تُعالج بيانات الاتصال والأعمال لفهم الطلب والتواصل وإعداد العرض وإدارة المراسلات التجارية.",
            ],
          },
          {
            title: "الطريقة والأساس القانوني",
            paragraphs: [
              "تُجمع البيانات إلكترونياً وقد يستند استخدامها إلى العقد أو الالتزام القانوني أو المصلحة المشروعة أو الموافقة عند لزومها.",
            ],
          },
          {
            title: "المستلمون والنقل",
            paragraphs: [
              "عند الضرورة يمكن مشاركة البيانات مع موظفي MODEL GRUP ومقدمي البنية التحتية والنماذج والمستشارين والجهات المختصة. قد يتضمن Web3Forms نقلاً دولياً.",
            ],
          },
          {
            title: "حقوق المادة 11",
            paragraphs: [
              "تواصل مع MODEL GRUP لطلبات الوصول والتصحيح والحذف والحقوق القانونية الأخرى.",
            ],
          },
        ],
      },
    },
  },
  de: {
    labels: {
      office: "Büro",
      factory: "Werk",
      privacy: "Datenschutzerklärung",
      kvkk: "Datenschutzhinweis (KVKK)",
      updated: "Letzte Aktualisierung: 26. August 2026",
      contact: "Kontakt",
    },
    formNotice:
      "Wir verwenden Ihre Angaben, um Ihre Anfrage zu verstehen, Sie zu kontaktieren und ein passendes Angebot zu erstellen.",
    pages: {
      privacy: {
        eyebrow: "Rechtliche Informationen",
        title: "Datenschutzerklärung",
        description:
          "Diese Erklärung beschreibt den Umgang von MODEL GRUP mit Angaben, die über die Website gesendet werden.",
        sections: [
          {
            title: "Erhobene Angaben",
            paragraphs: [
              "Bei einer Angebotsanfrage können Name, Unternehmen, Land, E-Mail, Telefon, Produkt- und Verpackungsinteressen, Menge und Nachricht erhoben werden.",
              "Notwendige technische Daten wie Spracheinstellung, Browseranfrage und Sicherheitsprotokolle können ebenfalls verarbeitet werden.",
            ],
          },
          {
            title: "Verwendungszwecke",
            paragraphs: [
              "Die Angaben dienen dazu, Kundenwünsche zu verstehen, Kontakt aufzunehmen, Angebote zu erstellen, Fragen zu beantworten, Geschäftsbeziehungen zu verwalten und die Website zu schützen.",
            ],
          },
          {
            title: "Dienstleister und Aufbewahrung",
            paragraphs: [
              "Formulare werden über Web3Forms übermittelt und können außerhalb Ihres Landes verarbeitet werden. Zugriff erhalten nur befugte MODEL GRUP-Mitarbeiter und erforderliche Dienstleister.",
              "Angaben werden nur so lange aufbewahrt, wie dies für Anfrage, Geschäftsbeziehung und gesetzliche Pflichten erforderlich ist.",
            ],
          },
          {
            title: "Ihre Rechte",
            paragraphs: [
              "Soweit anwendbar können Sie Auskunft, Berichtigung, Löschung oder Einschränkung verlangen und eine erteilte Einwilligung widerrufen.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "Personenbezogene Daten",
        title: "KVKK-Informationshinweis",
        description:
          "Dieser Hinweis beschreibt die Verarbeitung von Anfragedaten nach dem türkischen Gesetz Nr. 6698.",
        sections: [
          {
            title: "Verantwortlicher",
            paragraphs: [
              "MODEL GRUP ist für die über diese Website übermittelten Daten verantwortlich.",
            ],
          },
          {
            title: "Daten und Zwecke",
            paragraphs: [
              "Kontakt- und Geschäftsdaten werden zur Bearbeitung der Anfrage, Kontaktaufnahme, Angebotserstellung und Geschäfts-kommunikation verarbeitet.",
            ],
          },
          {
            title: "Methode und Rechtsgrundlage",
            paragraphs: [
              "Daten werden elektronisch erhoben. Rechtsgrundlage können Vertragsschritte, gesetzliche Pflichten, berechtigte Interessen oder erforderliche Einwilligung sein.",
            ],
          },
          {
            title: "Empfänger und Übermittlung",
            paragraphs: [
              "Soweit erforderlich können Daten an MODEL GRUP-Mitarbeiter, Infrastruktur- und Formulardienstleister, Berater und Behörden gehen. Web3Forms kann eine internationale Übermittlung beinhalten.",
            ],
          },
          {
            title: "Rechte nach Artikel 11",
            paragraphs: [
              "Wenden Sie sich für Auskunft, Berichtigung, Löschung und weitere gesetzliche Anträge an MODEL GRUP.",
            ],
          },
        ],
      },
    },
  },
  fr: {
    labels: {
      office: "Bureau",
      factory: "Usine",
      privacy: "Politique de confidentialité",
      kvkk: "Notice sur les données personnelles (KVKK)",
      updated: "Dernière mise à jour : 26 août 2026",
      contact: "Contact",
    },
    formNotice:
      "Nous utilisons vos informations pour comprendre votre demande, vous contacter et préparer une offre adaptée.",
    pages: {
      privacy: {
        eyebrow: "Informations légales",
        title: "Politique de confidentialité",
        description:
          "Cette politique explique comment MODEL GRUP traite les informations transmises sur le site.",
        sections: [
          {
            title: "Informations collectées",
            paragraphs: [
              "Lors d'une demande de devis, nous pouvons recueillir le nom, la société, le pays, l'e-mail, le téléphone, les produits, l'emballage, la quantité et le message.",
              "Des données techniques nécessaires, telles que la langue, la requête du navigateur et les journaux de sécurité, peuvent aussi être traitées.",
            ],
          },
          {
            title: "Finalités",
            paragraphs: [
              "Nous utilisons ces informations pour comprendre le besoin du client, le contacter, préparer une offre, répondre aux questions, gérer la relation commerciale et protéger le site.",
            ],
          },
          {
            title: "Prestataires et conservation",
            paragraphs: [
              "Les formulaires sont transmis par Web3Forms et peuvent être traités hors de votre pays. L'accès est limité au personnel autorisé de MODEL GRUP et aux prestataires nécessaires.",
              "Les informations sont conservées uniquement pendant la durée nécessaire à la demande, à la relation commerciale et aux obligations légales.",
            ],
          },
          {
            title: "Vos droits",
            paragraphs: [
              "Lorsque la loi le permet, vous pouvez demander l'accès, la rectification, l'effacement ou la limitation et retirer votre consentement si le traitement repose sur celui-ci.",
            ],
          },
        ],
      },
      kvkk: {
        eyebrow: "Données personnelles",
        title: "Notice d'information KVKK",
        description: "Cette notice décrit le traitement des demandes selon la loi turque n° 6698.",
        sections: [
          {
            title: "Responsable du traitement",
            paragraphs: ["MODEL GRUP est responsable des données transmises via ce site."],
          },
          {
            title: "Données et finalités",
            paragraphs: [
              "Les données de contact et professionnelles servent à comprendre la demande, vous contacter, préparer une offre et gérer les échanges commerciaux.",
            ],
          },
          {
            title: "Méthode et base juridique",
            paragraphs: [
              "Les données sont collectées électroniquement. Le traitement peut reposer sur le contrat, une obligation légale, un intérêt légitime ou le consentement lorsqu'il est requis.",
            ],
          },
          {
            title: "Destinataires et transferts",
            paragraphs: [
              "Si nécessaire, les données peuvent être partagées avec le personnel de MODEL GRUP, les prestataires d'infrastructure et de formulaires, les conseillers et les autorités. Web3Forms peut impliquer un transfert international.",
            ],
          },
          {
            title: "Droits de l'article 11",
            paragraphs: [
              "Contactez MODEL GRUP pour les demandes d'accès, de rectification, d'effacement et les autres droits prévus par la loi.",
            ],
          },
        ],
      },
    },
  },
};

export function getLegalContent(locale: Locale): LegalLocaleCopy {
  return LEGAL_CONTENT[locale];
}
