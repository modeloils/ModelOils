"""
Adds the 'fd' (full description) field to all 62 Shell industrial pd entries
in messages/en.json, messages/ru.json, messages/fa.json.
Turkish already falls back to spec.fullDescription correctly.
"""
import json, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MSG  = os.path.join(BASE, "messages")

# ── Shared full-description text by product family ───────────────────────────

FD = {

# ── Tellus S2 M / S3 M / S4 ME / S4 VX (Hydraulic) ─────────────────────────

"hydraulic_en": (
    "High-performance hydraulic oil manufactured using high viscosity index mineral oils and a superior additive package.\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Thermal stability: Clean operation at high temperatures without forming sludgy deposits in modern hydraulic systems.\n"
    "• Oxidation resistance: High resistance to oxidation in the presence of air, water and copper. Excellent TOST test results.\n"
    "• Water resistance: Chemical stability in high humidity; minimises rust and corrosion risk.\n"
    "• Outstanding anti-wear protection: Additive package qualified against Denison T6C and Vickers 35VQ25 tests.\n"
    "• Excellent filterability: Suitable for ultra-fine filters; retains properties in the presence of water or calcium contamination.\n"
    "• Air release and foam inhibition: Prevents cavitation and slows oxidation.\n"
    "• Water separation: Resists emulsion formation; protects the system and pumps.\n"
    "• Seal and paint compatibility: Compatible with all components used with mineral oils.\n\n"
    "STANDARDS AND SPECIFICATIONS\n"
    "CINCINNATI P-68 / P-70 / P-69 | DENISON HF-0, HF-1, HF-2 | Eaton (Vickers) M-2950 S | DIN 51524 PART 2 | ISO 11158"
),
"hydraulic_ru": (
    "Высокоэффективное гидравлическое масло, произведённое с использованием минеральных базовых масел с высоким ВИ и улучшенного пакета присадок.\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Термическая стабильность: Чистая работа при высоких температурах без образования шламистых отложений.\n"
    "• Стойкость к окислению: Высокая стойкость в присутствии воздуха, воды и меди. Отличные результаты теста TOST.\n"
    "• Водостойкость: Химическая стабильность при высокой влажности; минимизирует риск коррозии.\n"
    "• Выдающаяся противоизносная защита: Пакет присадок, прошедший квалификацию по тестам Denison T6C и Vickers 35VQ25.\n"
    "• Отличная фильтруемость: Подходит для ультратонких фильтров.\n"
    "• Деаэрация и пеногашение: Предотвращает кавитацию и замедляет окисление.\n"
    "• Водоотделение: Устойчивость к образованию эмульсии; защищает систему и насосы.\n"
    "• Совместимость с уплотнениями и лакокрасочными покрытиями: Совместимо со всеми компонентами для минеральных масел.\n\n"
    "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\n"
    "CINCINNATI P-68 / P-70 / P-69 | DENISON HF-0, HF-1, HF-2 | Eaton (Vickers) M-2950 S | DIN 51524 PART 2 | ISO 11158"
),
"hydraulic_fa": (
    "روغن هیدرولیک پرکارایی تولیدشده با روغن‌های پایه معدنی با ویسکوزیته ایندکس بالا و بسته افزودنی برتر.\n\n"
    "ویژگی‌های عملکردی\n"
    "• ثبات حرارتی: کارکرد تمیز در دماهای بالا بدون تشکیل رسوبات لجنی.\n"
    "• مقاومت در برابر اکسیداسیون: مقاومت بالا در حضور هوا، آب و مس. نتایج عالی در آزمون TOST.\n"
    "• مقاومت در برابر آب: ثبات شیمیایی در رطوبت بالا؛ به حداقل رساندن خطر زنگ‌زدگی.\n"
    "• حفاظت برجسته در برابر سایش: بسته افزودنی تأییدشده بر اساس آزمون‌های Denison T6C و Vickers 35VQ25.\n"
    "• قابلیت فیلتراسیون عالی: مناسب برای فیلترهای فوق‌ظریف.\n"
    "• هواگیری و ضدکف: جلوگیری از کاویتاسیون و کُندسازی اکسیداسیون.\n"
    "• جداسازی آب: مقاومت در برابر تشکیل امولسیون؛ محافظت از سیستم و پمپ‌ها.\n"
    "• سازگاری با آب‌بندها و رنگ‌ها: سازگار با تمام اجزای مورد استفاده با روغن‌های معدنی.\n\n"
    "استانداردها و مشخصات\n"
    "CINCINNATI P-68 / P-70 / P-69 | DENISON HF-0, HF-1, HF-2 | Eaton (Vickers) M-2950 S | DIN 51524 PART 2 | ISO 11158"
),

# ── Morlina S2 BL / S2 B (Circulation / Bearing) ────────────────────────────

"morlina_en": (
    "Premium quality circulation oil with high viscosity index base oil and zinc-free formulation, providing high-level protection against rust, corrosion and wear.\n\n"
    "APPLICATIONS\n"
    "• Circulation systems and plain or rolling element bearings\n"
    "• High-speed bearing points\n"
    "• Lightly loaded gearboxes\n"
    "• Control and hydraulic systems containing steel-bronze or silver surfaces\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Excellent oxidation resistance: Resistant at high temperatures in the presence of water, air and metal catalysts.\n"
    "• Corrosion protection: Special additives enhance anti-corrosion performance.\n"
    "• Low pour point: Advantage in low-temperature applications.\n"
    "• Rapid air release and foam inhibition: Air is quickly eliminated to prevent cavitation."
),
"morlina_ru": (
    "Высококачественное циркуляционное масло с базовым маслом с высоким ВИ и формулой без цинка, обеспечивающее высокую защиту от ржавчины, коррозии и износа.\n\n"
    "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
    "• Циркуляционные системы и подшипники скольжения или качения\n"
    "• Высокоскоростные подшипниковые узлы\n"
    "• Редукторы с малой нагрузкой\n"
    "• Системы управления и гидравлики с поверхностями из стали, бронзы или серебра\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Отличная стойкость к окислению: Устойчивость при высоких температурах в присутствии воды, воздуха и катализаторов.\n"
    "• Защита от коррозии: Специальные присадки повышают антикоррозионные свойства.\n"
    "• Низкая температура застывания: Преимущество в низкотемпературных условиях.\n"
    "• Быстрое деаэрирование и пеногашение: Воздух быстро удаляется для предотвращения кавитации."
),
"morlina_fa": (
    "روغن گردشی با کیفیت عالی با روغن پایه دارای ویسکوزیته ایندکس بالا و فرمولاسیون بدون روی، که سطح بالایی از محافظت در برابر زنگ‌زدگی، خوردگی و سایش فراهم می‌کند.\n\n"
    "کاربردها\n"
    "• سیستم‌های گردشی و یاتاقان‌های لغزشی یا غلتشی\n"
    "• نقاط یاتاقان پرسرعت\n"
    "• گیربکس‌های تحت بار سبک\n"
    "• سیستم‌های کنترل و هیدرولیک با سطوح فولاد-برنز یا نقره\n\n"
    "ویژگی‌های عملکردی\n"
    "• مقاومت عالی در برابر اکسیداسیون: مقاومت در دماهای بالا در حضور آب، هوا و کاتالیزورهای فلزی.\n"
    "• حفاظت از خوردگی: افزودنی‌های ویژه عملکرد ضدخوردگی را بهبود می‌دهند.\n"
    "• نقطه ریزش پایین: مزیت در کاربردهای دمای پایین.\n"
    "• هواگیری سریع و ضدکف: هوا به سرعت حذف می‌شود تا از کاویتاسیون جلوگیری شود."
),

# ── Corena S2 P (Reciprocating Compressor) ───────────────────────────────────

"corena_p_en": (
    "Shell Corena S2 P is a compressor oil specially developed for reciprocating type compressors. It delivers high performance even when air discharge temperatures reach up to 220°C.\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Extended service intervals: Extends valve and piston maintenance intervals for long, efficient service life.\n"
    "• Reliable air lines: Minimises dangerous exothermic reactions caused by carbon deposits and rust residues.\n"
    "• High oxidation resistance: Minimises carbon build-up and maximises compressor efficiency.\n"
    "• Effective rust and corrosion protection: Extends service intervals.\n"
    "• Good air release: Does not cause foam formation.\n"
    "• Easy water separation: Oil repels water to prevent oxidation and viscosity increase.\n"
    "• Seal compatibility: Compatible with all components in air compressors.\n\n"
    "STANDARDS AND SPECIFICATIONS\nDIN 51506 VDL | ISO 6743-3A-DAB"
),
"corena_p_ru": (
    "Shell Corena S2 P — компрессорное масло, специально разработанное для поршневых компрессоров. Обеспечивает высокую производительность даже при температурах нагнетания воздуха до 220°C.\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Увеличенные интервалы обслуживания: Продлевает интервалы технического обслуживания клапанов и поршней.\n"
    "• Надёжные воздушные линии: Минимизирует опасные экзотермические реакции от углеродных отложений.\n"
    "• Высокая стойкость к окислению: Минимизирует углеродные отложения и максимизирует КПД компрессора.\n"
    "• Защита от ржавчины и коррозии: Продлевает интервалы обслуживания.\n"
    "• Хорошее деаэрирование: Не вызывает пенообразования.\n"
    "• Лёгкое водоотделение: Масло отталкивает воду, предотвращая окисление.\n"
    "• Совместимость с уплотнениями: Совместимо со всеми компонентами воздушных компрессоров.\n\n"
    "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nDIN 51506 VDL | ISO 6743-3A-DAB"
),
"corena_p_fa": (
    "Shell Corena S2 P روغن کمپرسوری است که به‌طور خاص برای کمپرسورهای پیستونی توسعه یافته است. حتی زمانی که دمای تخلیه هوا به 220°C می‌رسد، عملکرد بالایی ارائه می‌دهد.\n\n"
    "ویژگی‌های عملکردی\n"
    "• فواصل سرویس طولانی: فواصل نگهداری سوپاپ و پیستون را افزایش می‌دهد.\n"
    "• خطوط هوای قابل اطمینان: واکنش‌های اگزوترمیک خطرناک ناشی از رسوبات کربن را به حداقل می‌رساند.\n"
    "• مقاومت بالا در برابر اکسیداسیون: رسوب کربن را به حداقل و بازده کمپرسور را به حداکثر می‌رساند.\n"
    "• محافظت از زنگ‌زدگی و خوردگی: فواصل سرویس را افزایش می‌دهد.\n"
    "• هواگیری خوب: باعث تشکیل کف نمی‌شود.\n"
    "• جداسازی آسان آب: روغن آب را دفع می‌کند و از اکسیداسیون جلوگیری می‌کند.\n"
    "• سازگاری با آب‌بندها: با تمام اجزای کمپرسورهای هوا سازگار است.\n\n"
    "استانداردها و مشخصات\nDIN 51506 VDL | ISO 6743-3A-DAB"
),

# ── Corena S3 R / S4 R (Rotary Screw/Vane Compressor) ────────────────────────

"corena_r_en": (
    "Premium quality product delivering outstanding performance in oil-injected rotary screw and vane air compressors. Extended service life and trouble-free operation under the most demanding conditions.\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Outstanding oxidation resistance: Prevents carbon residue formation in equipment.\n"
    "• Extended oil drain intervals: Oil life of up to 8,000 hours.\n"
    "• Low volatility: Reduces oil consumption and top-up requirements.\n"
    "• High viscosity index: High performance under all operating conditions.\n"
    "• Excellent cooling: Fully meets critical cooling requirements.\n"
    "• Effective rust and corrosion protection: Extends service intervals.\n"
    "• Seal compatibility: Compatible with all components in air compressors."
),
"corena_r_ru": (
    "Продукт высшего качества, обеспечивающий выдающуюся производительность в маслонаполненных роторных винтовых и пластинчатых воздушных компрессорах. Длительный срок службы в самых тяжёлых условиях.\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Выдающаяся стойкость к окислению: Предотвращает образование углеродных остатков.\n"
    "• Увеличенные интервалы замены масла: Ресурс масла до 8000 часов.\n"
    "• Низкая летучесть: Снижает расход масла и потребность в доливке.\n"
    "• Высокий индекс вязкости: Высокая производительность при всех режимах.\n"
    "• Отличное охлаждение: Полностью обеспечивает критические задачи охлаждения.\n"
    "• Защита от ржавчины и коррозии: Продлевает интервалы обслуживания.\n"
    "• Совместимость с уплотнениями: Совместимо со всеми компонентами воздушных компрессоров."
),
"corena_r_fa": (
    "محصولی با کیفیت عالی که عملکرد برجسته‌ای در کمپرسورهای پیچی و پره‌ای روغن‌تزریقی فراهم می‌کند. طول عمر سرویس طولانی در شرایط سخت‌ترین کارکرد.\n\n"
    "ویژگی‌های عملکردی\n"
    "• مقاومت برجسته در برابر اکسیداسیون: از تشکیل باقی‌مانده‌های کربنی جلوگیری می‌کند.\n"
    "• فواصل تعویض روغن طولانی: طول عمر روغن تا 8000 ساعت.\n"
    "• فرارپذیری پایین: مصرف روغن و نیاز به تکمیل را کاهش می‌دهد.\n"
    "• ویسکوزیته ایندکس بالا: عملکرد بالا در تمام شرایط کارکرد.\n"
    "• خنک‌کنندگی عالی: وظایف خنک‌کنندگی حیاتی را به طور کامل انجام می‌دهد.\n"
    "• محافظت از زنگ‌زدگی و خوردگی: فواصل سرویس را افزایش می‌دهد.\n"
    "• سازگاری با آب‌بندها: با تمام اجزای کمپرسورهای هوا سازگار است."
),

# ── Refrigeration S4 FR (Alkylbenzene) ───────────────────────────────────────

"refrig_en": (
    "Alkylbenzene-based synthetic refrigeration compressor oil. Recommended for systems using Ammonia and HCFC refrigerants.\n\n"
    "APPLICATIONS\n"
    "• Commercial, industrial and domestic use in open, semi-hermetic and hermetic refrigerating compressors\n"
    "• Suitable for rotary screw and reciprocating compressors\n"
    "• Excellent performance in ammonia (R717) systems and at evaporation temperatures below -33°C\n"
    "• Compatible with halogenated gases (CFC, HCFC), hydrocarbons and R402A/B\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Fully synthetic formulation: High-tech alkylbenzene-based chemistry.\n"
    "• Outstanding stability: Far superior oxidation and thermal stability compared to mineral oils.\n"
    "• Excellent cleanliness: Controls deposit and sludge formation. Oil drain intervals far exceed those of mineral oils.\n"
    "• Excellent compatibility: Fully compatible with seals in refrigeration systems; miscible with mineral oils.\n"
    "• Superior low-temperature miscibility: Outstanding mixing with CFC/HCFC at low temperatures.\n\n"
    "STANDARDS AND SPECIFICATIONS\nDIN 51503 KAA, KC"
),
"refrig_ru": (
    "Синтетическое холодильное компрессорное масло на основе алкилбензола. Рекомендуется для систем с хладагентами Аммиак и HCFC.\n\n"
    "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
    "• Коммерческое, промышленное и бытовое применение в открытых, полугерметичных и герметичных холодильных компрессорах\n"
    "• Пригодно для роторных винтовых и поршневых компрессоров\n"
    "• Отличная работа в аммиачных (R717) системах и при температурах испарения ниже -33°C\n"
    "• Совместимо с галогенированными газами (CFC, HCFC), углеводородами и R402A/B\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Полностью синтетическая рецептура: высокотехнологичная алкилбензольная основа.\n"
    "• Выдающаяся стабильность: значительно превосходит минеральные масла по окислительной и термической стабильности.\n"
    "• Отличная чистота: контролирует образование отложений. Интервалы замены масла намного превышают минеральные масла.\n"
    "• Отличная совместимость: полная совместимость с уплотнениями; смешивается с минеральными маслами.\n"
    "• Превосходное низкотемпературное смешение: отличное смешивание с CFC/HCFC при низких температурах.\n\n"
    "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nDIN 51503 KAA, KC"
),
"refrig_fa": (
    "روغن کمپرسور تبرید سنتتیک بر پایه آلکیل بنزن. برای سیستم‌هایی با مبرد آمونیاک و HCFC توصیه می‌شود.\n\n"
    "کاربردها\n"
    "• استفاده تجاری، صنعتی و خانگی در کمپرسورهای تبرید باز، نیمه هرمتیک و هرمتیک\n"
    "• مناسب برای کمپرسورهای پیچی و پیستونی\n"
    "• عملکرد عالی در سیستم‌های آمونیاکی (R717) و در دمای تبخیر زیر -33°C\n"
    "• سازگار با گازهای هالوژنه (CFC، HCFC)، هیدروکربن‌ها و R402A/B\n\n"
    "ویژگی‌های عملکردی\n"
    "• فرمولاسیون تمام‌سنتتیک: شیمی فناورانه بر پایه آلکیل بنزن.\n"
    "• ثبات برجسته: برتری قابل توجه در ثبات اکسیداسیون و حرارتی نسبت به روغن‌های معدنی.\n"
    "• پاکیزگی عالی: کنترل تشکیل رسوب و لجن. فواصل تعویض روغن به مراتب از روغن‌های معدنی بیشتر.\n"
    "• سازگاری عالی: کاملاً سازگار با آب‌بندهای سیستم تبرید؛ قابل اختلاط با روغن‌های معدنی.\n"
    "• اختلاط‌پذیری برتر در دمای پایین: اختلاط عالی با CFC/HCFC در دماهای پایین.\n\n"
    "استانداردها و مشخصات\nDIN 51503 KAA, KC"
),

# ── Tonna S3 M (Slideway) ─────────────────────────────────────────────────────

"tonna_en": (
    "Shell Tonna S3 M oils are specially designed for the lubrication of machine tool slideways and tables. They are formulated with highly refined mineral oil base and contain adhesion, anti-wear and anti-stick-slip additives.\n\n"
    "APPLICATIONS\n"
    "• Machine tool slideways, tables and feed mechanisms (including cast and synthetic materials)\n"
    "• Hydraulic systems of machine tools (single oil for slideway and hydraulic use)\n"
    "• Machine tool gearboxes and spindles\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Excellent friction properties: Prevents stick-slip in slow-moving systems for smooth motion and superior surface quality.\n"
    "• Adhesion: Resistant to wash-off by cutting fluids.\n"
    "• Water separation: Easily separates from water-soluble fluids.\n"
    "• Anti-wear protection: For slideways, gears, bearings and hydraulic components.\n"
    "• Corrosion protection: Protects surfaces when water-soluble cutting fluids are used.\n\n"
    "STANDARDS AND SPECIFICATIONS\nISO 11158 / 6743-4 HM | DIN CGLP | Cincinnati Machine P-47 / P-50"
),
"tonna_ru": (
    "Shell Tonna S3 M специально разработаны для смазки направляющих и столов металлообрабатывающих станков. Формулируются на основе высокорафинированного минерального масла с присадками адгезии, противоизносными и противоскачковыми компонентами.\n\n"
    "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
    "• Направляющие, столы и механизмы подачи станков (включая чугунные и синтетические материалы)\n"
    "• Гидравлические системы станков (единое масло для направляющих и гидравлики)\n"
    "• Редукторы и шпиндели станков\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Отличные фрикционные свойства: Устраняет скачкообразное движение для плавного хода и высокого качества поверхности.\n"
    "• Адгезия: Устойчивость к смыванию смазочно-охлаждающими жидкостями.\n"
    "• Водоотделение: Легко отделяется от водорастворимых жидкостей.\n"
    "• Противоизносная защита: Для направляющих, шестерён, подшипников и гидравлических компонентов.\n"
    "• Защита от коррозии: Защищает поверхности при использовании водорастворимых СОЖ.\n\n"
    "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nISO 11158 / 6743-4 HM | DIN CGLP | Cincinnati Machine P-47 / P-50"
),
"tonna_fa": (
    "روغن‌های Shell Tonna S3 M به‌طور خاص برای روانکاری گایدوی‌ها و میزهای ماشین‌ابزار طراحی شده‌اند. با پایه روغن معدنی تصفیه‌شده بالا و حاوی افزودنی‌های چسبندگی، ضدسایش و ضدجهش‌وتوقف فرمولبندی شده‌اند.\n\n"
    "کاربردها\n"
    "• گایدوی‌های ماشین‌ابزار، میزها و مکانیزم‌های تغذیه (از جمله مواد چدنی و سنتتیک)\n"
    "• سیستم‌های هیدرولیک ماشین‌ابزار (روغن یکپارچه برای گایدوی و هیدرولیک)\n"
    "• گیربکس‌ها و اسپیندل‌های ماشین‌ابزار\n\n"
    "ویژگی‌های عملکردی\n"
    "• خواص اصطکاکی عالی: از جهش‌وتوقف در سیستم‌های کُندرو برای حرکت روان جلوگیری می‌کند.\n"
    "• چسبندگی: مقاومت در برابر شستشو توسط سیالات برش.\n"
    "• جداسازی آب: به‌راحتی از سیالات محلول در آب جدا می‌شود.\n"
    "• حفاظت ضدسایش: برای گایدوی‌ها، دنده‌ها، یاتاقان‌ها و اجزای هیدرولیک.\n"
    "• حفاظت از خوردگی: هنگام استفاده از سیالات برش محلول در آب از سطوح محافظت می‌کند.\n\n"
    "استانداردها و مشخصات\nISO 11158 / 6743-4 HM | DIN CGLP | Cincinnati Machine P-47 / P-50"
),

# ── Turbo T / CC / J / DR (Turbine) ──────────────────────────────────────────

"turbo_en": (
    "High-performance industrial turbine oil developed to meet the requirements of today's and future high-power steam and gas turbines.\n\n"
    "APPLICATIONS\n"
    "• Industrial steam turbines: main shaft bearings, mechanical gears, control valves\n"
    "• Wider industrial applications requiring high rust and oxidation protection\n"
    "• Turbo compressors\n\n"
    "PERFORMANCE CHARACTERISTICS\n"
    "• Excellent thermal and oxidation stability: Prevents formation of sludgy products and harmful by-products.\n"
    "• Excellent water separation: Water is easily drained to keep the system safe.\n"
    "• Excellent filterability: Superior filtration even in the presence of water or contamination.\n"
    "• Corrosion protection: High-quality base oil and additives protect metal surfaces.\n"
    "• Excellent air release: Rapid air removal; prevents foam formation.\n\n"
    "STANDARDS AND SPECIFICATIONS\nDIN 51515-1 | ISO 8068 | Siemens TLV 9013 04 | ABB HTGD 90117R | Alstom NPA P5001"
),
"turbo_ru": (
    "Высокоэффективное промышленное турбинное масло, разработанное для современных и перспективных мощных паровых и газовых турбин.\n\n"
    "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
    "• Промышленные паровые турбины: главные подшипники вала, механические передачи, регулирующие клапаны\n"
    "• Более широкие промышленные применения с высокими требованиями к защите от ржавчины и окисления\n"
    "• Турбокомпрессоры\n\n"
    "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
    "• Отличная термическая и окислительная стабильность: предотвращает образование шлама и вредных продуктов.\n"
    "• Отличное водоотделение: вода легко сливается для обеспечения безопасности системы.\n"
    "• Отличная фильтруемость: превосходная фильтрация даже в присутствии воды или загрязнений.\n"
    "• Защита от коррозии: высококачественное базовое масло и присадки защищают металлические поверхности.\n"
    "• Отличная деаэрация: быстрое удаление воздуха; предотвращает пенообразование.\n\n"
    "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nDIN 51515-1 | ISO 8068 | Siemens TLV 9013 04 | ABB HTGD 90117R | Alstom NPA P5001"
),
"turbo_fa": (
    "روغن توربین صنعتی پرکارایی توسعه‌یافته برای پاسخگویی به نیازهای توربین‌های بخار و گاز امروزی و آینده.\n\n"
    "کاربردها\n"
    "• توربین‌های بخار صنعتی: یاتاقان‌های محور اصلی، دنده‌های مکانیکی، شیرهای کنترل\n"
    "• کاربردهای صنعتی گسترده‌تر نیازمند محافظت بالا از زنگ‌زدگی و اکسیداسیون\n"
    "• توربوکمپرسورها\n\n"
    "ویژگی‌های عملکردی\n"
    "• ثبات حرارتی و اکسیداسیون عالی: از تشکیل محصولات لجنی و فرآورده‌های مضر جلوگیری می‌کند.\n"
    "• جداسازی عالی آب: آب به راحتی تخلیه می‌شود تا سیستم ایمن بماند.\n"
    "• قابلیت فیلتراسیون عالی: فیلتراسیون برتر حتی در حضور آب یا آلودگی.\n"
    "• حفاظت از خوردگی: روغن پایه و افزودنی‌های باکیفیت از سطوح فلزی محافظت می‌کنند.\n"
    "• هواگیری عالی: حذف سریع هوا؛ از تشکیل کف جلوگیری می‌کند.\n\n"
    "استانداردها و مشخصات\nDIN 51515-1 | ISO 8068 | Siemens TLV 9013 04 | ABB HTGD 90117R | Alstom NPA P5001"
),

}  # end FD dict

# ── Map slugs to family keys ──────────────────────────────────────────────────

HYDRAULIC = [
    "tellus-s2-m-32","tellus-s2-m-46","tellus-s2-m-68","tellus-s2-m-100",
    "tellus-s2-v-15","tellus-s2-v-22","tellus-s2-v-32","tellus-s2-v-46",
    "tellus-s2-v-68","tellus-s2-v-100",
    "tellus-s3-m-32","tellus-s3-m-46","tellus-s3-m-68","tellus-s3-m-100",
    "tellus-s4-me-32","tellus-s4-me-46","tellus-s4-vx-32",
    "naturelle-hf-e","tequla-v-32",
]
MORLINA    = [
    "morlina-s2-bl-5","morlina-s2-bl-10","morlina-s2-bl-22",
    "morlina-s2-b-46","morlina-s2-b-68","morlina-s2-b-100",
    "morlina-s2-b-150","morlina-s2-b-220","morlina-s2-b-320",
]
CORENA_P   = ["corena-s2-p-68","corena-s2-p-100","corena-s2-p-150"]
CORENA_R   = ["corena-s3-r-46","corena-s3-r-68","corena-s4-r-46","corena-s4-r-68"]
REFRIG     = [
    "refrigeration-s4-fr-f-32","refrigeration-s4-fr-f-68","refrigeration-s4-fr-f-100",
    "refrigeration-s4-fr-v-32","refrigeration-s4-fr-v-46","refrigeration-s4-fr-v-68",
]
TONNA      = ["tonna-s3-m-68","tonna-s3-m-220"]
TURBO      = [
    "turbo-t-32","turbo-t-46","turbo-t-68",
    "turbo-cc-32","turbo-cc-46",
    "turbo-fluid-dr-46","turbo-j-32",
]

INDIVIDUAL = {
    "diala-s4-zx-i": {
        "en": (
            "Shell Diala S4 ZX-I is the latest product in Shell's transformer oil family, produced using GTL technology.\n\n"
            "APPLICATIONS\n"
            "• All types of power transmission and distribution transformers\n"
            "• High-voltage switchgear\n\n"
            "PERFORMANCE CHARACTERISTICS\n"
            "• GTL Technology: New-generation formulation\n"
            "• Zero sulfur content: Copper corrosion risk completely eliminated\n"
            "• Five times the oxidation stability of the industry standard\n"
            "• Superior thermal properties: Continuous operation under high overload conditions\n"
            "• Low-temperature fluidity: Down to -30°C\n\n"
            "STANDARDS AND SPECIFICATIONS\nIEC 60296:Edition 4 (2012) | ABB, Siemens, Schneider Electric approved\nFlash Point: 191°C | Pour Point: -30°C | Sulfur Content: 0"
        ),
        "ru": (
            "Shell Diala S4 ZX-I — новейший продукт в линейке трансформаторных масел Shell, произведённый по технологии GTL.\n\n"
            "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
            "• Все типы силовых и распределительных трансформаторов\n"
            "• Высоковольтное коммутационное оборудование\n\n"
            "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
            "• Технология GTL: рецептура нового поколения\n"
            "• Нулевое содержание серы: риск коррозии меди полностью устранён\n"
            "• Пятикратная окислительная стабильность по сравнению со стандартом отрасли\n"
            "• Превосходные тепловые свойства: непрерывная работа в условиях высоких перегрузок\n"
            "• Текучесть при низких температурах: до -30°C\n\n"
            "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nIEC 60296:Издание 4 (2012) | Допуски ABB, Siemens, Schneider Electric\nТемпература вспышки: 191°C | Температура застывания: -30°C | Содержание серы: 0"
        ),
        "fa": (
            "Shell Diala S4 ZX-I جدیدترین محصول در خانواده روغن‌های ترانسفورماتور Shell است که با فناوری GTL تولید می‌شود.\n\n"
            "کاربردها\n"
            "• تمام انواع ترانسفورماتورهای انتقال و توزیع برق\n"
            "• تجهیزات کلیدزنی فشار قوی\n\n"
            "ویژگی‌های عملکردی\n"
            "• فناوری GTL: فرمولاسیون نسل جدید\n"
            "• محتوای گوگرد صفر: خطر خوردگی مس کاملاً حذف شده\n"
            "• پنج برابر ثبات اکسیداسیون نسبت به استاندارد صنعت\n"
            "• خواص حرارتی برتر: کارکرد مداوم در شرایط اضافه‌بار بالا\n"
            "• سیالیت در دمای پایین: تا -30°C\n\n"
            "استانداردها و مشخصات\nIEC 60296:ویرایش 4 (2012) | تأیید ABB، Siemens، Schneider Electric\nنقطه اشتعال: 191°C | نقطه ریزش: -30°C | محتوای گوگرد: 0"
        ),
    },
    "heat-transfer-oil-s2": {
        "en": (
            "Shell Heat Transfer Oil S2 is specially designed for closed heat transfer systems operating up to 320°C. Film temperature must not exceed 340°C.\n\n"
            "APPLICATIONS\nCirculating heat transfer systems in chemical plants, textile factories, dyehouses, plywood factories and oil-heated radiators.\n\n"
            "PERFORMANCE CHARACTERISTICS\n"
            "• High oxidation and thermal stability\n"
            "• High heat transfer coefficient due to low viscosity\n"
            "• Good solvent properties\n"
            "• Non-corrosive\n"
            "• Low vapour pressure\n\n"
            "TYPICAL PHYSICAL PROPERTIES\n"
            "Density @ 15°C: 895 kg/m³ | Flash Point (PMCC): 220°C | Pour Point: -12°C\n"
            "Kinematic Viscosity @ 40°C: 32 mm²/s | Initial Boiling Point: >355°C\n\n"
            "STANDARDS AND SPECIFICATIONS\nISO 6743-12 Q | DIN 51522"
        ),
        "ru": (
            "Shell Heat Transfer Oil S2 специально разработан для закрытых систем теплопередачи, работающих при температурах до 320°C. Температура плёнки не должна превышать 340°C.\n\n"
            "ОБЛАСТИ ПРИМЕНЕНИЯ\nЦиркуляционные системы теплопередачи на химических заводах, текстильных фабриках, красильных цехах, фанерных заводах.\n\n"
            "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
            "• Высокая окислительная и термическая стабильность\n"
            "• Высокий коэффициент теплопередачи благодаря низкой вязкости\n"
            "• Хорошие растворяющие свойства\n"
            "• Некоррозионная структура\n"
            "• Низкое давление паров\n\n"
            "ТИПИЧНЫЕ ФИЗИЧЕСКИЕ СВОЙСТВА\n"
            "Плотность @ 15°C: 895 кг/м³ | Температура вспышки (PMCC): 220°C | Температура застывания: -12°C\n"
            "Кинематическая вязкость @ 40°C: 32 мм²/с | Начало кипения: >355°C\n\n"
            "СТАНДАРТЫ И СПЕЦИФИКАЦИИ\nISO 6743-12 Q | DIN 51522"
        ),
        "fa": (
            "Shell Heat Transfer Oil S2 به‌طور خاص برای سیستم‌های انتقال حرارت بسته که تا 320°C کار می‌کنند طراحی شده است. دمای فیلم نباید از 340°C تجاوز کند.\n\n"
            "کاربردها\nسیستم‌های انتقال حرارت گردشی در کارخانه‌های شیمیایی، نساجی، رنگرزی و رادیاتورهای روغن‌گرم.\n\n"
            "ویژگی‌های عملکردی\n"
            "• ثبات اکسیداسیون و حرارتی بالا\n"
            "• ضریب انتقال حرارت بالا به دلیل ویسکوزیته پایین\n"
            "• خواص حلال خوب\n"
            "• غیرخورنده\n"
            "• فشار بخار پایین\n\n"
            "خصوصیات فیزیکی معمول\n"
            "چگالی @ 15°C: 895 kg/m³ | نقطه اشتعال (PMCC): 220°C | نقطه ریزش: -12°C\n"
            "ویسکوزیته سینماتیک @ 40°C: 32 mm²/s | نقطه شروع جوشش: >355°C\n\n"
            "استانداردها و مشخصات\nISO 6743-12 Q | DIN 51522"
        ),
    },
    "textile-needle-s2-m-32": {
        "en": (
            "Shell Textile Needle S2 M 32 is a specialty needle mechanism oil developed for the textile industry.\n\n"
            "APPLICATIONS\n"
            "• Needle mechanisms in circular knitting machines (wool, cotton, silk, synthetic and rayon processing)\n"
            "• Applications requiring rapid washing before dyeing\n\n"
            "PERFORMANCE CHARACTERISTICS\n"
            "• Washable formulation: Rapidly washable before the dyeing process\n"
            "• Prevents starch build-up: Clean operation during the knitting process\n"
            "• Oxidation resistance\n"
            "• Corrosion protection for equipment"
        ),
        "ru": (
            "Shell Textile Needle S2 M 32 — специальное масло для игольного механизма, разработанное для текстильной промышленности.\n\n"
            "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
            "• Игольные механизмы в круглых вязальных машинах (обработка шерсти, хлопка, шёлка, синтетических волокон)\n"
            "• Применения, требующие быстрой промывки перед крашением\n\n"
            "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
            "• Смываемая рецептура: Быстро смывается перед процессом крашения\n"
            "• Предотвращает накопление крахмала: Чистая работа в процессе вязания\n"
            "• Стойкость к окислению\n"
            "• Защита оборудования от коррозии"
        ),
        "fa": (
            "Shell Textile Needle S2 M 32 روغن مکانیزم سوزن ویژه‌ای است که برای صنعت نساجی توسعه یافته است.\n\n"
            "کاربردها\n"
            "• مکانیزم‌های سوزن در ماشین‌های بافندگی گرد (پردازش پشم، پنبه، ابریشم، سنتتیک)\n"
            "• کاربردهایی که نیاز به شستشوی سریع قبل از رنگرزی دارند\n\n"
            "ویژگی‌های عملکردی\n"
            "• فرمولاسیون قابل شستشو: قبل از فرآیند رنگرزی به سرعت شسته می‌شود\n"
            "• جلوگیری از تجمع نشاسته: کارکرد تمیز در حین بافندگی\n"
            "• مقاومت در برابر اکسیداسیون\n"
            "• حفاظت از خوردگی تجهیزات"
        ),
    },
    "air-tool-s2-a-100": {
        "en": (
            "Shell Air Tool S2 A 100 is formulated for impact-type drills and other pneumatic tools operating under the most demanding conditions.\n\n"
            "APPLICATIONS\n"
            "• Especially impact-type pneumatic tools (including rock drilling)\n"
            "• Oil mist lubrication systems and air tools\n"
            "• Gear and bearing lubrication in the presence of water\n\n"
            "PERFORMANCE CHARACTERISTICS\n"
            "• Excellent lubrication and anti-wear: Outstanding performance under impact load conditions.\n"
            "• Excellent oxidation resistance and thermal stability: Resistant to sludge and deposit formation at high operating temperatures.\n"
            "• Outstanding low-temperature fluidity: Maintains flow properties in cold conditions.\n"
            "• Excellent corrosion protection: Superior protection even in the presence of water.\n\n"
            "TYPICAL PHYSICAL PROPERTIES\nISO Viscosity Grade: 100 | KV @ 40°C: 100 mm²/s | VI: 107\nFlash Point (COC): 232°C | Pour Point: -30°C"
        ),
        "ru": (
            "Shell Air Tool S2 A 100 сформулировано для ударных дрелей и других пневматических инструментов в самых жёстких условиях.\n\n"
            "ОБЛАСТИ ПРИМЕНЕНИЯ\n"
            "• Особенно ударные пневматические инструменты (включая бурение скальных пород)\n"
            "• Системы смазки масляным туманом и воздушные инструменты\n"
            "• Смазка редукторов и подшипников в присутствии воды\n\n"
            "ЭКСПЛУАТАЦИОННЫЕ ХАРАКТЕРИСТИКИ\n"
            "• Отличная смазка и противоизносная защита: Выдающаяся работа в условиях ударных нагрузок.\n"
            "• Отличная стойкость к окислению и термическая стабильность.\n"
            "• Выдающаяся низкотемпературная текучесть: Сохраняет свойства течения в холодных условиях.\n"
            "• Отличная защита от коррозии: Превосходная защита даже в присутствии воды.\n\n"
            "ТИПИЧНЫЕ ФИЗИЧЕСКИЕ СВОЙСТВА\nКласс вязкости ISO: 100 | КВ @ 40°C: 100 мм²/с | ВИ: 107\nТемпература вспышки (COC): 232°C | Температура застывания: -30°C"
        ),
        "fa": (
            "Shell Air Tool S2 A 100 برای دریل‌های ضربه‌ای و سایر ابزارهای پنوماتیک در سخت‌ترین شرایط فرمولبندی شده است.\n\n"
            "کاربردها\n"
            "• به‌ویژه ابزارهای پنوماتیک ضربه‌ای (از جمله حفاری سنگ)\n"
            "• سیستم‌های روانکاری مه روغن و ابزارهای هوا\n"
            "• روانکاری دنده و یاتاقان در حضور آب\n\n"
            "ویژگی‌های عملکردی\n"
            "• روانکاری و ضدسایش عالی: عملکرد برجسته در شرایط بار ضربه‌ای.\n"
            "• مقاومت عالی در برابر اکسیداسیون و ثبات حرارتی.\n"
            "• سیالیت برجسته در دمای پایین: حفظ خواص جریان در شرایط سرد.\n"
            "• حفاظت عالی از خوردگی: حتی در حضور آب.\n\n"
            "خصوصیات فیزیکی معمول\nکلاس ویسکوزیته ISO: 100 | KV @ 40°C: 100 mm²/s | VI: 107\nنقطه اشتعال (COC): 232°C | نقطه ریزش: -30°C"
        ),
    },
}

for slug in ["edelex-956","catenex-s-321","ondina-x-415","ondina-x-432","ondina-x-420",
             "ensis-engine-oil-30","ensis-dw-2462","irus-fluid-c"]:
    INDIVIDUAL[slug] = {
        "en": None,  # will use description as fd fallback
        "ru": None,
        "fa": None,
    }

# ── Build fd entries per locale ───────────────────────────────────────────────

def build_fd(slug):
    if slug in INDIVIDUAL:
        return INDIVIDUAL[slug]
    if slug in HYDRAULIC:
        return {"en": FD["hydraulic_en"], "ru": FD["hydraulic_ru"], "fa": FD["hydraulic_fa"]}
    if slug in MORLINA:
        return {"en": FD["morlina_en"], "ru": FD["morlina_ru"], "fa": FD["morlina_fa"]}
    if slug in CORENA_P:
        return {"en": FD["corena_p_en"], "ru": FD["corena_p_ru"], "fa": FD["corena_p_fa"]}
    if slug in CORENA_R:
        return {"en": FD["corena_r_en"], "ru": FD["corena_r_ru"], "fa": FD["corena_r_fa"]}
    if slug in REFRIG:
        return {"en": FD["refrig_en"], "ru": FD["refrig_ru"], "fa": FD["refrig_fa"]}
    if slug in TONNA:
        return {"en": FD["tonna_en"], "ru": FD["tonna_ru"], "fa": FD["tonna_fa"]}
    if slug in TURBO:
        return {"en": FD["turbo_en"], "ru": FD["turbo_ru"], "fa": FD["turbo_fa"]}
    return {"en": None, "ru": None, "fa": None}


ALL_SLUGS = (HYDRAULIC + MORLINA + CORENA_P + CORENA_R + REFRIG +
             TONNA + TURBO + list(INDIVIDUAL.keys()))

# ── Patch ─────────────────────────────────────────────────────────────────────

def patch_fd(lang):
    path = os.path.join(MSG, f"{lang}.json")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    pd = data.setdefault("pd", {})
    updated = 0
    for slug in ALL_SLUGS:
        if slug not in pd:
            continue
        fd_texts = build_fd(slug)
        text = fd_texts.get(lang)
        if text:
            pd[slug]["fd"] = text
            updated += 1
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  {lang}.json — added fd to {updated} entries")


if __name__ == "__main__":
    for lang in ["en", "ru", "fa"]:
        print(f"Patching {lang}…")
        patch_fd(lang)
    print("Done.")
