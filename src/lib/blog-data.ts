export type BlogCategory = "general" | "faq";
export type BlogLocale = "en" | "tr" | "ru" | "fa" | "ar" | "de" | "fr";

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  title: string;
  body: string[];
}

interface LocalizedContent { title: string; body: string[] }
interface LocalizedBlogArticle {
  slug: string;
  category: BlogCategory;
  localizations: Record<BlogLocale, LocalizedContent>;
}

const LOCALIZED_BLOG_ARTICLES: LocalizedBlogArticle[] = [
  // ── Genel Bilgi / General ────────────────────────────────────────────────
  {
    slug: "madeni-yag-nedir",
    category: "general",
    localizations: {
      tr: { title: "Madeni Yağ Nedir?", body: ["Madeni yağlar; baz yağların, yağlama özelliklerini geliştirmek amacıyla çeşitli katkı maddeleriyle birleştirilmesinden elde edilen ürünlerdir. İstenilen fiziksel ve kimyasal özelliklere ulaşmak için farklı oranlarda katkı maddeleri kullanılır."] },
      en: { title: "What is Lubricating Oil?", body: ["Lubricating oils are products formed by combining base oils with various additives to improve their lubricating properties. Different proportions of additives are used to achieve the desired physical and chemical characteristics."] },
      ru: { title: "Что такое смазочное масло?", body: ["Смазочные масла — это продукты, получаемые путём смешивания базовых масел с различными присадками для улучшения смазывающих свойств. Для достижения необходимых физических и химических характеристик используются присадки в различных соотношениях."] },
      fa: { title: "روغن روانکار چیست؟", body: ["روغن‌های روانکار محصولاتی هستند که از ترکیب روغن‌های پایه با افزودنی‌های مختلف برای بهبود خواص روانکاری به دست می‌آیند. برای دستیابی به ویژگی‌های فیزیکی و شیمیایی مطلوب، نسبت‌های متفاوتی از افزودنی‌ها استفاده می‌شود."] },
      ar: { title: "ما هو زيت التشحيم؟", body: ["زيوت التشحيم هي منتجات تُصنع بخلط الزيوت الأساسية مع مواد مضافة متنوعة لتحسين خصائص التشحيم. تُستخدم نسب مختلفة من المضافات لتحقيق الخصائص الفيزيائية والكيميائية المطلوبة."] },
      de: { title: "Was ist Schmieröl?", body: ["Schmieröle sind Produkte, die durch die Kombination von Grundölen mit verschiedenen Additiven zur Verbesserung der Schmiereigenschaften hergestellt werden. Unterschiedliche Additivanteile werden eingesetzt, um die gewünschten physikalischen und chemischen Eigenschaften zu erzielen."] },
      fr: { title: "Qu'est-ce que l'huile lubrifiante ?", body: ["Les huiles lubrifiantes sont des produits obtenus en combinant des huiles de base avec divers additifs pour améliorer leurs propriétés lubrifiantes. Différentes proportions d'additifs sont utilisées pour atteindre les caractéristiques physiques et chimiques souhaitées."] },
    },
  },
  {
    slug: "yaglamanin-amaci-nedir",
    category: "general",
    localizations: {
      tr: { title: "Yağlamanın Amacı Nedir?", body: ["Yağlamanın temel amacı, birbiriyle temas eden katı yüzeyleri birbirinden ayırmak ve aralarındaki sürtünmeyi en aza indirmektir. Bu sayede mekanik parçaların pürüzsüz çalışması sağlanır, aşınma azaltılır ve ekipman ömrü uzatılır."] },
      en: { title: "What is the Purpose of Lubrication?", body: ["The primary purpose of lubrication is to separate solid surfaces that come into contact with each other and to minimise the friction between them. This ensures smooth operation of mechanical parts, reduces wear, and extends equipment service life."] },
      ru: { title: "Какова цель смазки?", body: ["Основная цель смазки — разделить соприкасающиеся твёрдые поверхности и свести к минимуму трение между ними. Это обеспечивает плавную работу механических деталей, снижает износ и продлевает срок службы оборудования."] },
      fa: { title: "هدف از روانکاری چیست؟", body: ["هدف اصلی روانکاری، جداسازی سطوح جامد در تماس با یکدیگر و کاهش اصطکاک بین آن‌هاست. این امر باعث عملکرد روان قطعات مکانیکی، کاهش سایش و افزایش عمر تجهیزات می‌شود."] },
      ar: { title: "ما هو الغرض من التشحيم؟", body: ["الغرض الأساسي من التشحيم هو فصل الأسطح الصلبة المتلامسة وتقليل الاحتكاك بينها إلى أدنى حد ممكن. يضمن ذلك التشغيل السلس للأجزاء الميكانيكية، ويقلل من التآكل، ويطيل العمر التشغيلي للمعدات."] },
      de: { title: "Was ist der Zweck der Schmierung?", body: ["Der Hauptzweck der Schmierung besteht darin, in Kontakt stehende Festkörperoberflächen voneinander zu trennen und die Reibung zwischen ihnen zu minimieren. Dadurch wird ein reibungsloser Betrieb mechanischer Teile gewährleistet, Verschleiß reduziert und die Lebensdauer von Maschinen verlängert."] },
      fr: { title: "Quel est le but de la lubrification ?", body: ["Le but principal de la lubrification est de séparer les surfaces solides en contact et de minimiser la friction entre elles. Cela garantit un fonctionnement fluide des pièces mécaniques, réduit l'usure et prolonge la durée de vie des équipements."] },
    },
  },
  {
    slug: "mineral-yag-nedir",
    category: "general",
    localizations: {
      tr: { title: "Mineral Yağ Nedir?", body: ["Mineral yağlar, ham petrolün rafinerilerde damıtılması (destilasyon) işlemi sonucunda elde edilen yağlardır. Doğal kökenli baz yağlar olarak sınıflandırılır ve çeşitli endüstriyel uygulamalarda yaygın biçimde kullanılır."] },
      en: { title: "What is Mineral Oil?", body: ["Mineral oils are oils obtained as a result of the distillation of crude oil in refineries. They are classified as naturally-derived base oils and are widely used in various industrial applications."] },
      ru: { title: "Что такое минеральное масло?", body: ["Минеральные масла — это масла, получаемые в результате перегонки сырой нефти на нефтеперерабатывающих заводах. Они классифицируются как базовые масла природного происхождения и широко применяются в различных отраслях промышленности."] },
      fa: { title: "روغن معدنی چیست؟", body: ["روغن‌های معدنی روغن‌هایی هستند که از طریق تقطیر نفت خام در پالایشگاه‌ها به دست می‌آیند. آن‌ها به عنوان روغن‌های پایه با منشأ طبیعی طبقه‌بندی می‌شوند و در کاربردهای صنعتی مختلف به طور گسترده مورد استفاده قرار می‌گیرند."] },
      ar: { title: "ما هو الزيت المعدني؟", body: ["الزيوت المعدنية هي زيوت تُستخلص من عملية تقطير النفط الخام في المصافي. وتُصنَّف ضمن الزيوت الأساسية ذات المصدر الطبيعي وتُستخدم على نطاق واسع في مختلف التطبيقات الصناعية."] },
      de: { title: "Was ist Mineralöl?", body: ["Mineralöle sind Öle, die durch Destillation von Rohöl in Raffinerien gewonnen werden. Sie werden als natürlich gewonnene Grundöle eingestuft und in verschiedenen industriellen Anwendungen weit verbreitet eingesetzt."] },
      fr: { title: "Qu'est-ce que l'huile minérale ?", body: ["Les huiles minérales sont des huiles obtenues par distillation du pétrole brut dans les raffineries. Elles sont classées comme huiles de base d'origine naturelle et sont largement utilisées dans diverses applications industrielles."] },
    },
  },
  {
    slug: "sentetik-yag-nedir",
    category: "general",
    localizations: {
      tr: { title: "Sentetik Yağ Nedir?", body: ["Sentetik yağlar, laboratuvarlarda çeşitli kimyasal işlemler sonucunda kimyagerler tarafından üretilen yağlardır. Mineral yağlara kıyasla daha geniş sıcaklık aralığında kararlılık, daha düşük sürtünme katsayısı ve daha uzun yağ değişim aralığı gibi üstün performans özellikleri sunarlar."] },
      en: { title: "What is Synthetic Oil?", body: ["Synthetic oils are oils produced by chemists through various chemical processes in laboratories. Compared to mineral oils, they offer superior performance characteristics such as stability across a wider temperature range, a lower coefficient of friction, and longer oil change intervals."] },
      ru: { title: "Что такое синтетическое масло?", body: ["Синтетические масла — это масла, производимые химиками с помощью различных химических процессов в лабораторных условиях. По сравнению с минеральными маслами они обладают превосходными эксплуатационными характеристиками: стабильностью в более широком диапазоне температур, более низким коэффициентом трения и увеличенным интервалом замены масла."] },
      fa: { title: "روغن سنتتیک چیست؟", body: ["روغن‌های سنتتیک روغن‌هایی هستند که توسط شیمیدانان از طریق فرآیندهای شیمیایی مختلف در آزمایشگاه‌ها تولید می‌شوند. در مقایسه با روغن‌های معدنی، این روغن‌ها ویژگی‌های عملکردی برتری مانند پایداری در دامنه دمایی وسیع‌تر، ضریب اصطکاک پایین‌تر و فواصل تعویض روغن طولانی‌تر را ارائه می‌دهند."] },
      ar: { title: "ما هو الزيت الاصطناعي؟", body: ["الزيوت الاصطناعية هي زيوت يُنتجها علماء الكيمياء من خلال عمليات كيميائية متعددة في المختبرات. مقارنةً بالزيوت المعدنية، تتميز بخصائص أداء فائقة مثل الاستقرار في نطاق أوسع من درجات الحرارة، ومعامل احتكاك أقل، وفترات أطول بين تغييرات الزيت."] },
      de: { title: "Was ist Syntheseöl?", body: ["Synthetische Öle sind Öle, die von Chemikern durch verschiedene chemische Prozesse in Labors hergestellt werden. Im Vergleich zu Mineralölen bieten sie überlegene Leistungsmerkmale wie Stabilität über einen breiteren Temperaturbereich, einen niedrigeren Reibungskoeffizienten und längere Ölwechselintervalle."] },
      fr: { title: "Qu'est-ce que l'huile synthétique ?", body: ["Les huiles synthétiques sont des huiles produites par des chimistes à travers divers processus chimiques en laboratoire. Comparées aux huiles minérales, elles offrent des performances supérieures : stabilité sur une plus large plage de températures, coefficient de frottement plus faible et intervalles de vidange plus longs."] },
    },
  },
  {
    slug: "motor-yaglari-siniflandirmasi",
    category: "general",
    localizations: {
      tr: { title: "Motor Yağları Sınıflandırması", body: ["Motor yağlarının performans sınıflandırmaları uluslararası kuruluşlar tarafından belirlenmektedir. Bu kuruluşlar arasında SAE (Society of Automotive Engineers), API (American Petroleum Institute), ILSAC (International Lubricant Standardization and Approval Committee), ACEA (Association des Constructeurs Européens d'Automobiles), MIL (Military Specifications) ve JASO (Japanese Automotive Standards Organization) yer almaktadır."] },
      en: { title: "Motor Oil Classifications", body: ["Motor oil performance classifications are determined by international organisations. These include SAE (Society of Automotive Engineers), API (American Petroleum Institute), ILSAC (International Lubricant Standardization and Approval Committee), ACEA (Association des Constructeurs Européens d'Automobiles), MIL (Military Specifications) and JASO (Japanese Automotive Standards Organization)."] },
      ru: { title: "Классификация моторных масел", body: ["Классификация эксплуатационных характеристик моторных масел устанавливается международными организациями: SAE (Общество автомобильных инженеров), API (Американский институт нефти), ILSAC (Международный комитет по стандартизации и допуску смазочных материалов), ACEA (Ассоциация европейских производителей автомобилей), MIL (военные спецификации) и JASO (Японская организация по автомобильным стандартам)."] },
      fa: { title: "طبقه‌بندی روغن‌های موتور", body: ["طبقه‌بندی عملکرد روغن‌های موتور توسط سازمان‌های بین‌المللی تعیین می‌شود. این سازمان‌ها شامل SAE (انجمن مهندسان خودرو)، API (مؤسسه نفت آمریکا)، ILSAC (کمیته بین‌المللی استانداردسازی و تأیید روانکارها)، ACEA (انجمن سازندگان اروپایی خودرو)، MIL (مشخصات نظامی) و JASO (سازمان استانداردهای خودرویی ژاپن) هستند."] },
      ar: { title: "تصنيف زيوت المحركات", body: ["تتولى منظمات دولية تحديد تصنيفات أداء زيوت المحركات، ومن أبرزها: SAE (جمعية مهندسي السيارات)، وAPI (معهد البترول الأمريكي)، وILSAC (اللجنة الدولية لتوحيد معايير المواد التشحيمية والموافقة عليها)، وACEA (رابطة مصنّعي السيارات الأوروبيين)، وMIL (المواصفات العسكرية)، وJASO (منظمة معايير السيارات اليابانية)."] },
      de: { title: "Klassifizierung von Motorölen", body: ["Die Leistungsklassifizierungen von Motorölen werden von internationalen Organisationen festgelegt. Dazu gehören SAE (Society of Automotive Engineers), API (American Petroleum Institute), ILSAC (International Lubricant Standardization and Approval Committee), ACEA (Association des Constructeurs Européens d'Automobiles), MIL (Military Specifications) und JASO (Japanese Automotive Standards Organization)."] },
      fr: { title: "Classification des huiles moteur", body: ["Les classifications de performance des huiles moteur sont établies par des organisations internationales, notamment : SAE (Society of Automotive Engineers), API (American Petroleum Institute), ILSAC (International Lubricant Standardization and Approval Committee), ACEA (Association des Constructeurs Européens d'Automobiles), MIL (Military Specifications) et JASO (Japanese Automotive Standards Organization)."] },
    },
  },
  {
    slug: "motor-yaglari-sae-viskozite-sinifi",
    category: "general",
    localizations: {
      tr: { title: "Motor Yağları SAE Viskozite Sınıfı", body: ["SAE viskozite sınıflandırması, yağları düşük ve yüksek çalışma sıcaklıklarındaki akışkanlık değerlerine göre gruplandırır. Örneğin \"15W-40\" ifadesinde \"W\" düşük sıcaklıklardaki kış performansını, \"40\" ise yüksek çalışma sıcaklığındaki viskozite değerini gösterir.", "Motor yağları iki ana kategoriye ayrılır: SAE 30, SAE 40 gibi tek kademeli yağlar ve 5W-30, 10W-40 gibi çok kademeli yağlar."] },
      en: { title: "SAE Viscosity Grade for Motor Oils", body: ["SAE viscosity classification groups oils according to their flow characteristics at low and high operating temperatures. For example, in \"15W-40\", the \"W\" indicates winter performance at low temperatures, while \"40\" indicates the viscosity value at high operating temperature.", "Motor oils are divided into two main categories: single-grade oils such as SAE 30 and SAE 40, and multi-grade oils such as 5W-30 and 10W-40."] },
      ru: { title: "Класс вязкости SAE для моторных масел", body: ["Классификация вязкости SAE группирует масла по показателям текучести при низких и высоких рабочих температурах. Например, в обозначении «15W-40» буква «W» указывает на зимние характеристики при низких температурах, а «40» — на значение вязкости при высокой рабочей температуре.", "Моторные масла подразделяются на два основных вида: одновязкостные масла (SAE 30, SAE 40) и всесезонные многовязкостные масла (5W-30, 10W-40)."] },
      fa: { title: "گرید ویسکوزیته SAE برای روغن‌های موتور", body: ["طبقه‌بندی ویسکوزیته SAE روغن‌ها را بر اساس خواص جریان‌پذیری در دماهای پایین و بالای عملکرد گروه‌بندی می‌کند. به عنوان مثال، در «15W-40»، «W» نشان‌دهنده عملکرد زمستانی در دماهای پایین و «40» نشان‌دهنده مقدار ویسکوزیته در دمای عملکرد بالاست.", "روغن‌های موتور به دو دسته اصلی تقسیم می‌شوند: روغن‌های تک‌گرید مانند SAE 30 و SAE 40، و روغن‌های چندگرید مانند 5W-30 و 10W-40."] },
      ar: { title: "درجة اللزوجة SAE لزيوت المحركات", body: ["تُصنّف درجات لزوجة SAE الزيوتَ وفقاً لخصائص تدفقها عند درجات الحرارة المنخفضة والمرتفعة. فمثلاً في «15W-40»، تشير «W» إلى أداء الشتاء عند درجات الحرارة المنخفضة، بينما يشير «40» إلى قيمة اللزوجة عند درجة الحرارة العالية للتشغيل.", "تنقسم زيوت المحركات إلى فئتين رئيسيتين: الزيوت أحادية الدرجة مثل SAE 30 و SAE 40، والزيوت متعددة الدرجات مثل 5W-30 و 10W-40."] },
      de: { title: "SAE-Viskositätsklasse für Motoröle", body: ["Die SAE-Viskositätsklassifizierung gruppiert Öle nach ihren Fließeigenschaften bei niedrigen und hohen Betriebstemperaturen. Bei \"15W-40\" zum Beispiel gibt \"W\" die Winterleistung bei tiefen Temperaturen an, während \"40\" den Viskositätswert bei hoher Betriebstemperatur bezeichnet.", "Motoröle werden in zwei Hauptkategorien unterteilt: einbereichige Öle wie SAE 30 und SAE 40 sowie mehrbereichige Öle wie 5W-30 und 10W-40."] },
      fr: { title: "Classe de viscosité SAE des huiles moteur", body: ["La classification de viscosité SAE regroupe les huiles selon leurs propriétés d'écoulement à des températures de fonctionnement basses et élevées. Par exemple, dans «15W-40», le «W» indique les performances hivernales à basse température, tandis que «40» indique la valeur de viscosité à haute température.", "Les huiles moteur se divisent en deux grandes catégories : les huiles monograde comme SAE 30 et SAE 40, et les huiles multigrade comme 5W-30 et 10W-40."] },
    },
  },
  {
    slug: "motor-yaglari-api-performans-sinifi",
    category: "general",
    localizations: {
      tr: { title: "Motor Yağları API Performans Sınıfı", body: ["API sınıflandırması iki harfli bir sistem kullanır. İlk harf yağın hangi motor türüne uygun olduğunu gösterir: S harfi benzinli (Spark ignition) motorları, C harfi dizel (Compression ignition) motorları ifade eder.", "İkinci harf ise performans seviyesini gösterir; benzinli motorlar için A'dan J'ye, dizel motorlar için C'den F'ye kadar uzanır. Alfabede ilerledikçe performans gereksinimleri de artar."] },
      en: { title: "API Performance Class for Motor Oils", body: ["API classification uses a two-letter system. The first letter indicates which engine type the oil is suited for: \"S\" stands for spark-ignition (petrol) engines, while \"C\" stands for compression-ignition (diesel) engines.", "The second letter denotes the performance level, ranging from A to J for petrol engines and from C to F for diesel engines. The further along the alphabet, the higher the performance requirements."] },
      ru: { title: "Эксплуатационный класс API моторных масел", body: ["Классификация API использует двухбуквенную систему. Первая буква указывает, для какого типа двигателя предназначено масло: «S» — для бензиновых двигателей с искровым зажиганием, «C» — для дизельных двигателей с воспламенением от сжатия.", "Вторая буква обозначает уровень эксплуатационных характеристик: от A до J для бензиновых двигателей и от C до F для дизельных. Чем дальше буква по алфавиту, тем выше требования к характеристикам."] },
      fa: { title: "کلاس عملکرد API روغن‌های موتور", body: ["طبقه‌بندی API از یک سیستم دو حرفی استفاده می‌کند. حرف اول نوع موتوری را که روغن برای آن مناسب است مشخص می‌کند: «S» برای موتورهای جرقه‌ای (بنزینی) و «C» برای موتورهای دیزلی (احتراق تراکمی).", "حرف دوم سطح عملکرد را نشان می‌دهد؛ از A تا J برای موتورهای بنزینی و از C تا F برای موتورهای دیزلی. هرچه حرف در الفبا پیشتر باشد، الزامات عملکردی بالاتر است."] },
      ar: { title: "فئة أداء API لزيوت المحركات", body: ["يستخدم تصنيف API نظاماً مكوناً من حرفين، إذ يشير الحرف الأول إلى نوع المحرك المناسب للزيت: «S» يمثّل محركات الاشتعال الشرارية (البنزين)، فيما يمثّل «C» محركات الاشتعال بالضغط (الديزل).", "أما الحرف الثاني فيدل على مستوى الأداء، ويتراوح من A إلى J لمحركات البنزين، ومن C إلى F لمحركات الديزل. وكلما تقدّم الحرف في الأبجدية، ارتفعت متطلبات الأداء."] },
      de: { title: "API-Leistungsklasse für Motoröle", body: ["Die API-Klassifizierung verwendet ein zweiteiliges Buchstabensystem. Der erste Buchstabe gibt an, für welchen Motortyp das Öl geeignet ist: \"S\" steht für funkengezündete Ottomotoren (Benzin), \"C\" für kompressionsgezündete Dieselmotoren.", "Der zweite Buchstabe kennzeichnet das Leistungsniveau: für Ottomotoren von A bis J, für Dieselmotoren von C bis F. Je weiter hinten der Buchstabe im Alphabet steht, desto höher sind die Anforderungen."] },
      fr: { title: "Classe de performance API des huiles moteur", body: ["La classification API utilise un système à deux lettres. La première lettre indique le type de moteur pour lequel l'huile est adaptée : «S» désigne les moteurs à allumage commandé (essence), tandis que «C» désigne les moteurs à allumage par compression (diesel).", "La deuxième lettre indique le niveau de performance, allant de A à J pour les moteurs à essence et de C à F pour les moteurs diesel. Plus la lettre est avancée dans l'alphabet, plus les exigences de performance sont élevées."] },
    },
  },
  {
    slug: "motor-yaglari-acea-performans-sinifi",
    category: "general",
    localizations: {
      tr: { title: "Motor Yağları ACEA Performans Sınıfı", body: ["ACEA sınıflandırması bir harf ve ardından gelen bir rakamdan oluşur. Harfler motor tipini belirtir: A benzinli otomobil motorları, B hafif dizel otomobil motorları, C katalitik konvertör ve partikül filtreli motorlar (düşük sülfatlı kül yağları), E ise ağır hizmet dizel motorlarını ifade eder.", "Rakamlar performans seviyesini gösterir: 1 yakıt ekonomisi, 2 standart kullanım, 3 yüksek performans ve uzun ömür uygulamaları anlamına gelir."] },
      en: { title: "ACEA Performance Class for Motor Oils", body: ["ACEA classification consists of a letter followed by a number. The letters indicate engine type: A for petrol car engines, B for light diesel car engines, C for engines with catalytic converters and particulate filters (low-SAPS oils), and E for heavy-duty diesel engines.", "The numbers indicate the performance level: 1 means fuel economy, 2 means standard use, and 3 means high-performance and long-drain applications."] },
      ru: { title: "Эксплуатационный класс ACEA для моторных масел", body: ["Классификация ACEA состоит из буквы и следующей за ней цифры. Буквы обозначают тип двигателя: A — бензиновые автомобильные двигатели, B — лёгкие дизельные автомобильные двигатели, C — двигатели с каталитическими нейтрализаторами и сажевыми фильтрами (низкозольные масла), E — тяжёлые дизельные двигатели.", "Цифры указывают уровень характеристик: 1 — экономия топлива, 2 — стандартное применение, 3 — высокопроизводительные и длинноинтервальные применения."] },
      fa: { title: "کلاس عملکرد ACEA برای روغن‌های موتور", body: ["طبقه‌بندی ACEA از یک حرف به دنبال آن یک عدد تشکیل شده است. حروف نوع موتور را مشخص می‌کنند: A برای موتورهای بنزینی اتومبیل، B برای موتورهای دیزلی سبک اتومبیل، C برای موتورهای دارای مبدل کاتالیستی و فیلتر ذرات (روغن‌های کم‌خاکستر)، و E برای موتورهای دیزلی سنگین.", "اعداد سطح عملکرد را نشان می‌دهند: 1 به معنای صرفه‌جویی در سوخت، 2 به معنای استفاده استاندارد، و 3 به معنای کاربردهای با عملکرد بالا و تعویض طولانی‌مدت است."] },
      ar: { title: "فئة أداء ACEA لزيوت المحركات", body: ["يتكون تصنيف ACEA من حرف يتبعه رقم. وتشير الحروف إلى نوع المحرك: A لمحركات السيارات التي تعمل بالبنزين، وB لمحركات السيارات الديزل الخفيفة، وC للمحركات المزودة بمحولات حفازة وفلاتر جسيمات (زيوت منخفضة الرماد الكبريتي)، وE لمحركات الديزل الثقيلة.", "تشير الأرقام إلى مستوى الأداء: 1 يعني توفير الوقود، و2 يعني الاستخدام القياسي، و3 يعني تطبيقات الأداء العالي وطول فترة التصريف."] },
      de: { title: "ACEA-Leistungsklasse für Motoröle", body: ["Die ACEA-Klassifizierung besteht aus einem Buchstaben gefolgt von einer Zahl. Die Buchstaben kennzeichnen den Motortyp: A für Ottomotoren, B für leichte PKW-Dieselmotoren, C für Motoren mit Katalysatoren und Partikelfiltern (Low-SAPS-Öle) und E für schwere Nutzfahrzeug-Dieselmotoren.", "Die Zahlen geben das Leistungsniveau an: 1 steht für Kraftstoffwirtschaftlichkeit, 2 für Standardanwendungen, 3 für Hochleistungs- und Langdrainsanwendungen."] },
      fr: { title: "Classe de performance ACEA des huiles moteur", body: ["La classification ACEA est composée d'une lettre suivie d'un chiffre. Les lettres indiquent le type de moteur : A pour les moteurs à essence de voiture particulière, B pour les moteurs diesel légers, C pour les moteurs équipés de catalyseurs et de filtres à particules (huiles low-SAPS), et E pour les moteurs diesel lourds.", "Les chiffres indiquent le niveau de performance : 1 signifie économie de carburant, 2 signifie utilisation standard, et 3 signifie applications haute performance et longue durée."] },
    },
  },
  {
    slug: "otomotiv-disli-yaglari-api-performans-sinifi",
    category: "general",
    localizations: {
      tr: { title: "Otomotiv Dişli Yağları API Performans Sınıfı", body: ["GL-1: Orta servis şartlarında çalışan spiral-bevel ve worm dişli aksları ile bazı düz şanzumanlarda kullanılır.", "GL-2: Worm dişli akslarında GL-1'in yetersiz kaldığı durumlarda kullanılır.", "GL-3: Orta servis şartlarındaki düz şanzuman ve spiral bevel dişli akslarında kullanılır.", "GL-4: Şok yüklemesi olmaksızın, ağır servis şartlarındaki hipoid dişlilerde kullanılır.", "GL-5: Şok yüklemesi bulunan, çok ağır servis şartlarındaki hipoid dişlilerde kullanılır.", "GL-6: Yüksek basınca maruz kalan, ağır hizmet şartlarındaki dişliler için tasarlanmıştır."] },
      en: { title: "API Performance Class for Automotive Gear Oils", body: ["GL-1: Used in spiral-bevel and worm gear axles operating under moderate service conditions, as well as some manual transmissions.", "GL-2: Used in worm gear axles where GL-1 performance is insufficient.", "GL-3: Used in manual transmissions and spiral-bevel gear axles under moderate service conditions.", "GL-4: Used in hypoid gears under heavy service conditions without shock loading.", "GL-5: Used in hypoid gears under severe service conditions with shock loading.", "GL-6: Designed for gears under heavy-duty service conditions with high pressure."] },
      ru: { title: "Эксплуатационный класс API для автомобильных трансмиссионных масел", body: ["GL-1: Применяется для спирально-конических и червячных редукторов в умеренных условиях эксплуатации, а также для некоторых механических коробок передач.", "GL-2: Применяется для червячных редукторов в случаях, когда характеристик GL-1 недостаточно.", "GL-3: Применяется для механических коробок передач и спирально-конических редукторов в умеренных условиях эксплуатации.", "GL-4: Применяется для гипоидных передач в тяжёлых условиях эксплуатации без ударных нагрузок.", "GL-5: Применяется для гипоидных передач в очень тяжёлых условиях эксплуатации с ударными нагрузками.", "GL-6: Предназначено для шестерён в условиях тяжёлой эксплуатации при высоком давлении."] },
      fa: { title: "کلاس عملکرد API برای روغن‌های دنده خودرویی", body: ["GL-1: در اکسل‌های دنده مارپیچ-مخروطی و حلزونی در شرایط کار متوسط، همچنین برخی گیربکس‌های دستی استفاده می‌شود.", "GL-2: در اکسل‌های دنده حلزونی در مواردی که عملکرد GL-1 کافی نیست استفاده می‌شود.", "GL-3: در گیربکس‌های دستی و اکسل‌های دنده مارپیچ-مخروطی در شرایط کار متوسط استفاده می‌شود.", "GL-4: در چرخ‌دنده‌های هیپوئید در شرایط سنگین بدون بار ضربه‌ای استفاده می‌شود.", "GL-5: در چرخ‌دنده‌های هیپوئید در شرایط بسیار سنگین با بار ضربه‌ای استفاده می‌شود.", "GL-6: برای چرخ‌دنده‌های تحت فشار بالا در شرایط کار سنگین طراحی شده است."] },
      ar: { title: "فئة أداء API لزيوت ناقل الحركة في السيارات", body: ["GL-1: يُستخدم في محاور التروس الحلزونية المخروطية ودودة القوقعة في ظروف الخدمة المتوسطة، فضلاً عن بعض ناقلات الحركة اليدوية.", "GL-2: يُستخدم في محاور دودة القوقعة عند عدم كفاية أداء GL-1.", "GL-3: يُستخدم في ناقلات الحركة اليدوية ومحاور التروس الحلزونية المخروطية في ظروف الخدمة المتوسطة.", "GL-4: يُستخدم في التروس الهيبوئيدية في ظروف الخدمة الشاقة دون تحميل صدمي.", "GL-5: يُستخدم في التروس الهيبوئيدية في ظروف الخدمة البالغة الشدة مع تحميل صدمي.", "GL-6: مصمّم للتروس التي تعمل تحت ظروف خدمة شاقة مع ضغط مرتفع."] },
      de: { title: "API-Leistungsklasse für Fahrzeuggetriebeöle", body: ["GL-1: Verwendung in Spiralkegel- und Schneckengetriebebrücken unter mittleren Betriebsbedingungen sowie in einigen Schaltgetrieben.", "GL-2: Verwendung in Schneckengetriebebrücken, wenn die Leistung von GL-1 nicht ausreicht.", "GL-3: Verwendung in Schaltgetrieben und Spiralkegelgetriebebrücken unter mittleren Betriebsbedingungen.", "GL-4: Verwendung in Hypoidgetrieben unter schweren Betriebsbedingungen ohne Stoßbelastung.", "GL-5: Verwendung in Hypoidgetrieben unter sehr schweren Betriebsbedingungen mit Stoßbelastung.", "GL-6: Konzipiert für Getriebe unter Hochlastbedingungen mit hohem Druck."] },
      fr: { title: "Classe de performance API des huiles pour engrenages automobiles", body: ["GL-1 : Utilisé dans les ponts à engrenages spiraux-coniques et en spirale dans des conditions de service modérées, ainsi que dans certaines boîtes de vitesses manuelles.", "GL-2 : Utilisé dans les ponts à vis sans fin lorsque les performances du GL-1 sont insuffisantes.", "GL-3 : Utilisé dans les boîtes de vitesses manuelles et les ponts à engrenages spiraux dans des conditions de service modérées.", "GL-4 : Utilisé dans les engrenages hypoïdes dans des conditions de service sévères sans choc.", "GL-5 : Utilisé dans les engrenages hypoïdes dans des conditions de service très sévères avec choc.", "GL-6 : Conçu pour les engrenages sous conditions de service intensives avec des pressions élevées."] },
    },
  },
  // ── Sıkça Sorulan Sorular / FAQ ────────────────────────────────────────────
  {
    slug: "mineral-ve-sentetik-gres-uyumu",
    category: "faq",
    localizations: {
      tr: { title: "Mineral esaslı gresler ile sentetik gresler aynı yerde uygulanabilir mi?", body: ["Mineral esaslı gresler ile sentetik gresler karıştırılmadan evvel uyumu hakkında bilgi edinilmelidir. Uyumlu olsa bile, mineral esaslı gresler sentetik greslerin performansını negatif yönde etkileyebilir."] },
      en: { title: "Can mineral-based and synthetic greases be used in the same application?", body: ["Before mixing mineral-based greases with synthetic greases, their compatibility must be verified. Even if they are compatible, mineral-based greases may negatively affect the performance of synthetic greases."] },
      ru: { title: "Можно ли применять минеральные и синтетические смазки в одних и тех же узлах?", body: ["Перед смешиванием смазок на минеральной и синтетической основе необходимо проверить их совместимость. Даже при наличии совместимости минеральные смазки могут негативно влиять на эксплуатационные характеристики синтетических."] },
      fa: { title: "آیا گریس‌های معدنی و سنتتیک را می‌توان در یک جا استفاده کرد؟", body: ["قبل از مخلوط کردن گریس‌های معدنی با گریس‌های سنتتیک، باید سازگاری آن‌ها بررسی شود. حتی اگر سازگار باشند، گریس‌های معدنی ممکن است عملکرد گریس‌های سنتتیک را تحت تأثیر منفی قرار دهند."] },
      ar: { title: "هل يمكن استخدام الشحوم المعدنية والاصطناعية في نفس المكان؟", body: ["قبل خلط الشحوم المعدنية مع الشحوم الاصطناعية، يجب التحقق من توافقهما. وحتى في حال التوافق، قد تؤثر الشحوم المعدنية سلباً على أداء الشحوم الاصطناعية."] },
      de: { title: "Können mineralölbasierte und synthetische Schmierfette gemeinsam verwendet werden?", body: ["Vor dem Mischen von mineralölbasiertem und synthetischem Schmierfett sollte deren Verträglichkeit geprüft werden. Selbst wenn sie verträglich sind, können mineralölbasierte Fette die Leistung synthetischer Fette negativ beeinflussen."] },
      fr: { title: "Les graisses minérales et synthétiques peuvent-elles être utilisées au même endroit ?", body: ["Avant de mélanger des graisses à base minérale avec des graisses synthétiques, leur compatibilité doit être vérifiée. Même si elles sont compatibles, les graisses minérales peuvent affecter négativement les performances des graisses synthétiques."] },
    },
  },
  {
    slug: "farkli-kalinlastirici-gresler",
    category: "faq",
    localizations: {
      tr: { title: "Farklı kalınlaştırıcı içeren gresler karıştırılabilir mi?", body: ["Farklı tipte kalınlaştırıcı içeren gresler bir biri ile uyumsuz olabilir; sonucunda kıvamında bozulma gibi sorunlar yaşanabilir."] },
      en: { title: "Can greases with different thickeners be mixed?", body: ["Greases containing different types of thickeners may be incompatible with each other, which can result in problems such as changes in consistency."] },
      ru: { title: "Можно ли смешивать смазки с разными загустителями?", body: ["Смазки с разными типами загустителей могут оказаться несовместимыми, что приводит к таким проблемам, как изменение консистенции."] },
      fa: { title: "آیا می‌توان گریس‌هایی با غلیظ‌کننده‌های متفاوت را مخلوط کرد؟", body: ["گریس‌های حاوی انواع مختلف غلیظ‌کننده ممکن است با یکدیگر ناسازگار باشند که می‌تواند منجر به مشکلاتی مانند تغییر در قوام شود."] },
      ar: { title: "هل يمكن خلط الشحوم ذات المكثفات المختلفة؟", body: ["قد تكون الشحوم التي تحتوي على أنواع مختلفة من المكثفات غير متوافقة مع بعضها، مما قد يؤدي إلى مشكلات كتغيّر القوام."] },
      de: { title: "Können Schmierfette mit unterschiedlichen Verdickungsmitteln gemischt werden?", body: ["Schmierfette mit unterschiedlichen Verdickungsmitteltypen können miteinander unverträglich sein, was zu Problemen wie Konsistenzveränderungen führen kann."] },
      fr: { title: "Les graisses avec différents épaississants peuvent-elles être mélangées ?", body: ["Les graisses contenant différents types d'épaississants peuvent être incompatibles entre elles, ce qui peut entraîner des problèmes tels que des changements de consistance."] },
    },
  },
  {
    slug: "motor-yagi-bozuldu-mu-nasil-anlarim",
    category: "faq",
    localizations: {
      tr: { title: "Motor yağının bozulduğunu nasıl anlarız?", body: ["Yağın bozulup bozulmadığını kesin olarak anlamanın yolu, yağın laboratuvar şartlarında fiziksel ve kimyasal olarak test edilmesidir."] },
      en: { title: "How can we tell if motor oil has degraded?", body: ["The definitive way to determine whether an oil has deteriorated is to test it physically and chemically under laboratory conditions."] },
      ru: { title: "Как определить, что моторное масло деградировало?", body: ["Единственный верный способ определить, деградировало ли масло, — это провести его физическое и химическое испытание в лабораторных условиях."] },
      fa: { title: "چگونه می‌توان فهمید که روغن موتور خراب شده است؟", body: ["قطعی‌ترین راه برای تعیین اینکه آیا روغن خراب شده است، آزمایش فیزیکی و شیمیایی آن در شرایط آزمایشگاهی است."] },
      ar: { title: "كيف يمكننا معرفة ما إذا كان زيت المحرك قد تدهور؟", body: ["الطريقة القاطعة لتحديد ما إذا كان الزيت قد تدهور هي اختباره فيزيائياً وكيميائياً في ظروف معملية."] },
      de: { title: "Woran erkennen wir, ob Motoröl degradiert ist?", body: ["Die einzig zuverlässige Methode, um festzustellen, ob ein Öl abgebaut ist, ist seine physikalische und chemische Prüfung unter Laborbedingungen."] },
      fr: { title: "Comment savoir si l'huile moteur s'est dégradée ?", body: ["La seule méthode fiable pour déterminer si une huile s'est dégradée est de la soumettre à des tests physiques et chimiques en conditions de laboratoire."] },
    },
  },
  {
    slug: "motor-yagina-katki-gerekli-mi",
    category: "faq",
    localizations: {
      tr: { title: "Motor yağına katık ilave edilmesine gerek var mıdır?", body: ["Motor yağları herhangi bir ekstra yağ katkısına gerek duyulmayacak şekilde dizayn edilmiştir. Bu nedenle yağ katkısı kullanılması, sanılanın aksine motora zarar bile verebilir. Şanzıman, diferansiyel ve direksiyon hidrolik sistemlerinde de kullanılan yağlara fazladan herhangi bir katkı ilave edilmesine gerek yoktur."] },
      en: { title: "Is it necessary to add additives to motor oil?", body: ["Motor oils are designed so that no extra oil additives are required. Therefore, adding oil additives can actually harm the engine, contrary to popular belief. No additional additives need to be added to oils used in transmission, differential, and power steering hydraulic systems either."] },
      ru: { title: "Нужно ли добавлять присадки в моторное масло?", body: ["Моторные масла созданы таким образом, что не требуют дополнительных присадок. Поэтому применение масляных присадок, вопреки распространённому мнению, может даже причинить вред двигателю. Не нужно добавлять никаких дополнительных присадок и в масла, используемые в трансмиссии, дифференциале и гидравлической системе рулевого управления."] },
      fa: { title: "آیا افزودن ادیتیو به روغن موتور ضروری است؟", body: ["روغن‌های موتور به گونه‌ای طراحی شده‌اند که نیاز به هیچ افزودنی اضافه‌ای ندارند. بنابراین، خلاف تصور عموم، اضافه کردن ادیتیو روغن می‌تواند به موتور آسیب برساند. روغن‌های مورد استفاده در گیربکس، دیفرانسیل و سیستم‌های هیدرولیک فرمان نیز نیازی به ادیتیو اضافه ندارند."] },
      ar: { title: "هل من الضروري إضافة مواد مضافة إلى زيت المحرك؟", body: ["صُمِّمت زيوت المحركات بحيث لا تحتاج إلى أي مواد مضافة إضافية. لذا، فإن استخدام مضافات الزيت قد يؤدي إلى الإضرار بالمحرك على عكس ما يُشاع. كما لا حاجة إلى إضافة أي مواد مضافة إلى الزيوت المستخدمة في ناقل الحركة والتفاضلي وأنظمة التوجيه الهيدروليكي."] },
      de: { title: "Müssen Motorölen zusätzliche Additive zugesetzt werden?", body: ["Motoröle sind so konzipiert, dass keine zusätzlichen Öladditive erforderlich sind. Entgegen der weit verbreiteten Meinung kann die Verwendung von Öladditiven dem Motor sogar schaden. Auch den Ölen, die in Getrieben, Differentialen und hydraulischen Lenksystemen eingesetzt werden, müssen keine zusätzlichen Additive hinzugefügt werden."] },
      fr: { title: "Est-il nécessaire d'ajouter des additifs à l'huile moteur ?", body: ["Les huiles moteur sont conçues pour ne nécessiter aucun additif supplémentaire. Par conséquent, l'ajout d'additifs d'huile peut en réalité endommager le moteur, contrairement aux idées reçues. Il n'est pas non plus nécessaire d'ajouter des additifs supplémentaires aux huiles utilisées dans les boîtes de vitesses, les différentiels et les systèmes hydrauliques de direction."] },
    },
  },
  {
    slug: "motor-toleransi-nedir",
    category: "faq",
    localizations: {
      tr: { title: "Motorlarda toleransların daraltıldığı söyleniyor, tolerans nedir?", body: ["Tolerans, birbirine çok yakın, hatta birbirine değen iki metal arasındaki boşluğa verilen isimdir. Günümüz mühendislik ilerlemeleriyle üreticiler, daha yüksek performanslı ve daha kompakt motorlar üretmek amacıyla bu boşlukları en aza indirmektedir.", "Toleranslar daraltıldığında, yeni motor tasarımlarında optimum çalışma için daha ince sentetik yağlar tercih edilen seçenek haline gelir."] },
      en: { title: "What is tolerance, and why are engine tolerances getting tighter?", body: ["Tolerance refers to the gap between two metal components that are very close together, even touching. With advances in modern engineering, manufacturers are minimising these gaps to produce higher-performance, more compact engines.", "As tolerances tighten, thinner synthetic oils become the preferred choice for optimal operation in new engine designs."] },
      ru: { title: "Что такое допуск и почему допуски в двигателях становятся всё меньше?", body: ["Допуск — это зазор между двумя металлическими деталями, которые находятся очень близко друг к другу или даже соприкасаются. Благодаря достижениям современной инженерии производители сводят эти зазоры к минимуму, создавая более мощные и компактные двигатели.", "По мере уменьшения допусков более жидкие синтетические масла становятся предпочтительным выбором для оптимальной работы новых конструкций двигателей."] },
      fa: { title: "تلرانس چیست و چرا تلرانس‌های موتور در حال کاهش است؟", body: ["تلرانس به فاصله‌ای اطلاق می‌شود که بین دو قطعه فلزی بسیار نزدیک به هم یا حتی در تماس با هم وجود دارد. با پیشرفت‌های مهندسی مدرن، تولیدکنندگان این فاصله‌ها را به حداقل می‌رسانند تا موتورهایی با عملکرد بالاتر و فشرده‌تر تولید کنند.", "با کاهش تلرانس‌ها، روغن‌های سنتتیک رقیق‌تر به انتخاب ترجیحی برای عملکرد بهینه در طرح‌های جدید موتور تبدیل می‌شوند."] },
      ar: { title: "ما هو التفاوت؟ ولماذا تتضيّق تفاوتات المحركات؟", body: ["التفاوت هو الفجوة بين قطعتين معدنيتين متقاربتين جداً أو متلامستين. ومع التقدم الهندسي الحديث، يعمل المصنّعون على تقليص هذه الفجوات إلى أدنى حد لإنتاج محركات ذات أداء أعلى وحجم أصغر.", "كلما ضاقت التفاوتات، أصبحت الزيوت الاصطناعية الأخف لزوجةً الخياراتِ المفضلة لتحقيق الأداء الأمثل في تصاميم المحركات الحديثة."] },
      de: { title: "Was ist Toleranz, und warum werden die Motortoleranzen enger?", body: ["Als Toleranz bezeichnet man den Spalt zwischen zwei sehr nahe beieinanderliegenden oder sich berührenden Metallteilen. Mit dem Fortschritt der modernen Ingenieurtechnik minimieren die Hersteller diese Spalte, um leistungsstärkere und kompaktere Motoren zu produzieren.", "Je enger die Toleranzen werden, desto mehr werden dünnflüssigere Syntheseöle zur bevorzugten Wahl für den optimalen Betrieb neuer Motorkonstruktionen."] },
      fr: { title: "Qu'est-ce que la tolérance et pourquoi les tolérances des moteurs se resserrent-elles ?", body: ["La tolérance désigne le jeu entre deux pièces métalliques très proches, voire en contact. Grâce aux avancées de l'ingénierie moderne, les fabricants réduisent ces jeux au minimum pour produire des moteurs plus performants et plus compacts.", "À mesure que les tolérances se resserrent, les huiles synthétiques plus fluides deviennent le choix privilégié pour un fonctionnement optimal dans les nouvelles conceptions de moteurs."] },
    },
  },
  {
    slug: "motor-yagi-neden-koyulasir",
    category: "faq",
    localizations: {
      tr: { title: "Motor yağı neden koyulaşarak kirli gibi görünür?", body: ["Yağın bozulup bozulmadığını kesin olarak anlamanın yolu, yağın laboratuvar şartlarında fiziksel ve kimyasal olarak test edilmesidir. Kaliteli bir motor yağı, içeriğindeki dağıtıcı ve deterjan katıkları sayesinde motorda oluşan kurum parçalarını dağıtarak bünyesine alır ve metal yüzeylere yapışmasını engeller.", "Metal yüzeylere yapışanları da deterjanla temizler. Bu nedenle motor yağı zamanla kirlenmiş görünür. Dolayısıyla kirli görünen motor yağı, görevini iyi yerine getiriyor demektir."] },
      en: { title: "Why does motor oil darken and appear dirty?", body: ["One of the functions of motor oil is cleaning. A quality motor oil uses its dispersant and detergent additives to disperse and absorb soot particles that form in the engine, preventing them from adhering to metal surfaces.", "It also cleans deposits from metal surfaces using its detergent properties. This is why motor oil appears dirty over time. Therefore, motor oil that looks dirty is actually doing its job well."] },
      ru: { title: "Почему моторное масло темнеет и выглядит загрязнённым?", body: ["Одна из функций моторного масла — очищение. Качественное моторное масло использует диспергирующие и моющие присадки для рассеивания и поглощения частиц сажи, образующихся в двигателе, предотвращая их прилипание к металлическим поверхностям.", "Кроме того, оно очищает металлические поверхности от отложений с помощью своих моющих свойств. Вот почему моторное масло со временем становится тёмным. Таким образом, потемневшее масло — это признак того, что оно выполняет свою работу хорошо."] },
      fa: { title: "چرا روغن موتور تیره می‌شود و کثیف به نظر می‌رسد؟", body: ["یکی از وظایف روغن موتور، تمیزکاری است. روغن موتور باکیفیت از افزودنی‌های پراکنده‌کننده و پاک‌کننده خود برای پخش و جذب ذرات دوده تشکیل‌شده در موتور استفاده می‌کند و از چسبیدن آن‌ها به سطوح فلزی جلوگیری می‌کند.", "همچنین با استفاده از خواص پاک‌کنندگی خود، رسوبات را از سطوح فلزی پاک می‌کند. به همین دلیل است که روغن موتور با گذشت زمان کثیف به نظر می‌رسد. بنابراین روغن موتوری که کثیف به نظر می‌رسد، در واقع کار خود را به خوبی انجام می‌دهد."] },
      ar: { title: "لماذا يتحول زيت المحرك إلى اللون الداكن ويبدو متسخاً؟", body: ["أحد أدوار زيت المحرك هو التنظيف. يستخدم الزيت عالي الجودة مضافاته الموزّعة والمنظّفة لتفتيت جزيئات السخام المتشكّلة في المحرك وامتصاصها، مما يمنع التصاقها بالأسطح المعدنية.", "كما يزيل الترسبات عن الأسطح المعدنية بفضل خصائصه المنظِّفة. لهذا السبب يبدو زيت المحرك متسخاً مع مرور الوقت. لذا، فإن الزيت الذي يبدو داكناً هو في الحقيقة زيت يؤدي مهمته على أكمل وجه."] },
      de: { title: "Warum wird Motoröl dunkler und sieht schmutzig aus?", body: ["Eine der Aufgaben des Motoröls ist die Reinigung. Ein qualitativ hochwertiges Motoröl nutzt seine Dispergier- und Detergensadditive, um im Motor entstehende Rußpartikel zu verteilen und aufzunehmen und so ihr Haften an Metalloberflächen zu verhindern.", "Es reinigt auch Ablagerungen von Metalloberflächen mit seinen Detergenseigenschaften. Deshalb sieht Motoröl mit der Zeit schmutzig aus. Ein dunkel aussehendes Motoröl macht also eigentlich seinen Job gut."] },
      fr: { title: "Pourquoi l'huile moteur s'assombrit-elle et paraît-elle sale ?", body: ["L'une des fonctions de l'huile moteur est le nettoyage. Une huile de qualité utilise ses additifs dispersants et détergents pour disperser et absorber les particules de suie qui se forment dans le moteur, empêchant leur adhérence aux surfaces métalliques.", "Elle nettoie également les dépôts des surfaces métalliques grâce à ses propriétés détergentes. C'est pourquoi l'huile moteur paraît sale avec le temps. Ainsi, une huile d'aspect sale accomplit en réalité parfaitement son rôle."] },
    },
  },
  {
    slug: "motorlar-neden-yag-eksiltir",
    category: "faq",
    localizations: {
      tr: { title: "Motorlar neden yağ eksiltir?", body: ["Yeni teknolojilerle üretilen modern motorlarda yüksek performans sağlamak amacıyla metaller (silindirler, pistonlar) birbirine daha yakın tasarlanmıştır. Bu tasarım yaklaşımı, yağın bozulmasına ve tükenmesine yol açmaktadır.", "Araç üreticileri, belirli kilometre aralıkları için kabul edilebilir yağ kayıp oranlarını kılavuzlarında belirtmektedir. Sentetik yağlar mineral yağlara oranla daha az eksiltme yapmaktadır."] },
      en: { title: "Why do engines consume oil?", body: ["In modern engines manufactured with new technologies, metals (cylinders, pistons) are designed closer together to achieve high performance. This design approach leads to oil degradation and consumption.", "Vehicle manufacturers specify acceptable oil loss rates for certain mileage intervals in their manuals. Synthetic oils consume less oil compared to mineral oils."] },
      ru: { title: "Почему двигатели расходуют масло?", body: ["В современных двигателях, создаваемых с применением новых технологий, металлические детали (цилиндры, поршни) конструируются с меньшими зазорами для достижения высокой производительности. Такой подход к конструированию приводит к деградации и расходу масла.", "Производители транспортных средств указывают допустимые нормы расхода масла для определённых пробеговых интервалов в своих руководствах. Синтетические масла потребляются меньше по сравнению с минеральными."] },
      fa: { title: "چرا موتورها روغن مصرف می‌کنند؟", body: ["در موتورهای مدرن ساخته‌شده با فناوری‌های جدید، فلزات (سیلندرها، پیستون‌ها) برای دستیابی به عملکرد بالا به یکدیگر نزدیک‌تر طراحی شده‌اند. این رویکرد طراحی منجر به تخریب و مصرف روغن می‌شود.", "سازندگان خودرو نرخ‌های قابل قبول اتلاف روغن برای فواصل کیلومتری مشخص را در دفترچه‌های راهنما تعیین می‌کنند. روغن‌های سنتتیک در مقایسه با روغن‌های معدنی، مصرف روغن کمتری دارند."] },
      ar: { title: "لماذا تستهلك المحركات الزيت؟", body: ["في المحركات الحديثة المصنّعة بالتقنيات الجديدة، تُصمَّم المعادن (الأسطوانات والمكابس) بتقارب أكبر لتحقيق أداء عالٍ. يؤدي هذا الأسلوب التصميمي إلى تدهور الزيت واستهلاكه.", "تحدد الشركات المصنّعة للمركبات معدلات الفقد المقبولة للزيت لفترات معينة من الكيلومترات في أدلة المستخدم. تستهلك الزيوت الاصطناعية كميات أقل مقارنةً بالزيوت المعدنية."] },
      de: { title: "Warum verbrauchen Motoren Öl?", body: ["In modernen, mit neuen Technologien gefertigten Motoren werden Metallteile (Zylinder, Kolben) enger zusammengebaut, um hohe Leistung zu erzielen. Dieser Konstruktionsansatz führt zur Degradation und zum Verbrauch von Öl.", "Fahrzeughersteller geben in ihren Handbüchern akzeptable Ölverlustraten für bestimmte Kilometerintervalle an. Synthetische Öle verbrauchen im Vergleich zu Mineralölen weniger Öl."] },
      fr: { title: "Pourquoi les moteurs consomment-ils de l'huile ?", body: ["Dans les moteurs modernes fabriqués avec de nouvelles technologies, les métaux (cylindres, pistons) sont conçus plus proches les uns des autres pour atteindre de hautes performances. Cette approche de conception conduit à la dégradation et à la consommation d'huile.", "Les constructeurs de véhicules indiquent les taux de perte d'huile acceptables pour certains intervalles de kilométrage dans leurs manuels. Les huiles synthétiques consomment moins d'huile que les huiles minérales."] },
    },
  },
  {
    slug: "sentetik-ve-mineral-yag-farki",
    category: "faq",
    localizations: {
      tr: { title: "Sentetik yağ ile mineral yağ arasında ne fark vardır?", body: ["Mineral yağlar, petrolün işlenmesiyle elde edilen baz yağa gerekli katıkların eklenmesiyle üretilir. Sentetik yağlar ise laboratuvar koşullarında çeşitli kimyasal işlemlerden geçtikten sonra gerekli katıkların eklenmesiyle elde edilir.", "Laboratuvar ortamında farklı bir teknoloji ile üretilen sentetik yağlar, mineral yağlara oranla daha yüksek ve daha düşük sıcaklıklar ile yüksek basınca karşı daha dayanıklıdır."] },
      en: { title: "What is the difference between synthetic and mineral oil?", body: ["Mineral oils are produced by adding the necessary additives to base oil obtained from processing petroleum. Synthetic oils, on the other hand, are obtained by adding the necessary additives after undergoing various chemical processes in laboratory conditions.", "Synthetic oils, produced through a different technology in a laboratory environment, are more resistant to higher and lower temperatures as well as high pressure compared to mineral oils."] },
      ru: { title: "В чём разница между синтетическим и минеральным маслом?", body: ["Минеральные масла получают путём добавления необходимых присадок в базовое масло, полученное из переработанной нефти. Синтетические масла, напротив, получают путём добавления необходимых присадок после проведения различных химических процессов в лабораторных условиях.", "Синтетические масла, производимые по другой технологии в лабораторных условиях, более устойчивы к высоким и низким температурам, а также к высокому давлению по сравнению с минеральными маслами."] },
      fa: { title: "تفاوت روغن سنتتیک و معدنی چیست؟", body: ["روغن‌های معدنی با افزودن افزودنی‌های لازم به روغن پایه حاصل از پردازش نفت تولید می‌شوند. روغن‌های سنتتیک، از طرف دیگر، پس از طی فرآیندهای شیمیایی مختلف در شرایط آزمایشگاهی و با افزودن افزودنی‌های لازم به دست می‌آیند.", "روغن‌های سنتتیک که با فناوری متفاوتی در محیط آزمایشگاه تولید می‌شوند، در مقایسه با روغن‌های معدنی، مقاومت بیشتری در برابر دماهای بالاتر و پایین‌تر و همچنین فشار بالا دارند."] },
      ar: { title: "ما الفرق بين الزيت الاصطناعي والزيت المعدني؟", body: ["تُنتَج الزيوت المعدنية بإضافة المضافات اللازمة إلى الزيت الأساسي المستخرج من معالجة النفط الخام. أما الزيوت الاصطناعية، فتُنتَج بإضافة المضافات اللازمة بعد إخضاعها لعمليات كيميائية متعددة في ظروف معملية.", "إن الزيوت الاصطناعية المُنتَجة بتقنية مختلفة في البيئة المختبرية أكثر مقاومةً لدرجات الحرارة العالية والمنخفضة والضغط العالي مقارنةً بالزيوت المعدنية."] },
      de: { title: "Was ist der Unterschied zwischen synthetischem und Mineralöl?", body: ["Mineralöle werden hergestellt, indem dem aus der Erdölverarbeitung gewonnenen Grundöl die notwendigen Additive zugesetzt werden. Synthetische Öle hingegen entstehen durch das Hinzufügen notwendiger Additive nach verschiedenen chemischen Prozessen unter Laborbedingungen.", "Synthetische Öle, die durch eine andere Technologie im Laborumfeld hergestellt werden, sind gegenüber höheren und niedrigeren Temperaturen sowie hohem Druck widerstandsfähiger als Mineralöle."] },
      fr: { title: "Quelle est la différence entre l'huile synthétique et l'huile minérale ?", body: ["Les huiles minérales sont produites en ajoutant les additifs nécessaires à l'huile de base obtenue par traitement du pétrole. Les huiles synthétiques, quant à elles, sont obtenues en ajoutant les additifs nécessaires après avoir subi divers processus chimiques dans des conditions de laboratoire.", "Les huiles synthétiques, produites par une technologie différente en environnement de laboratoire, sont plus résistantes aux températures élevées et basses ainsi qu'aux pressions élevées par rapport aux huiles minérales."] },
    },
  },
];

function resolveArticle(article: LocalizedBlogArticle, locale: BlogLocale): BlogArticle {
  const content = article.localizations[locale] ?? article.localizations["tr"];
  return { slug: article.slug, category: article.category, title: content.title, body: content.body };
}

export function getBlogArticles(locale: BlogLocale, category: BlogCategory): BlogArticle[] {
  return LOCALIZED_BLOG_ARTICLES
    .filter((a) => a.category === category)
    .map((a) => resolveArticle(a, locale));
}

export function getBlogArticle(slug: string, locale: BlogLocale = "tr"): BlogArticle | undefined {
  const article = LOCALIZED_BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return undefined;
  return resolveArticle(article, locale);
}

// Legacy exports for backward compat (Turkish)
export const GENERAL_ARTICLES = LOCALIZED_BLOG_ARTICLES.filter((a) => a.category === "general").map((a) => resolveArticle(a, "tr"));
export const FAQ_ARTICLES = LOCALIZED_BLOG_ARTICLES.filter((a) => a.category === "faq").map((a) => resolveArticle(a, "tr"));
