import json

sol_en = {
  "breadcrumbHome": "Home", "breadcrumbSolutions": "Solutions",
  "requestQuote": "Request a Quote", "browseCatalog": "Browse Product Catalog",
  "challengesTitle": "Common Challenges We Solve",
  "solutionsTitle": "How Model Oils Addresses Them",
  "recommendedTitle": "Recommended Products for {title}",
  "viewFullCatalog": "View Full Product Catalog",
  "faqTitle": "Frequently Asked Questions",
  "ctaTitle": "Ready to Discuss Your Requirements?",
  "ctaBody": "Our export team responds within 24 hours with pricing, specifications, and documentation.",
  "ctaBtn": "Request a Quote",
  "fleet": {
    "title": "Fleet Operators", "eyebrow": "Solutions for Fleet Operators",
    "headline": "Consistent Engine Oil Supply for Commercial Fleets",
    "subheadline": "Stop managing multiple oil suppliers. We supply SAE-graded motor oils for diesel and petrol fleets in bulk. ISO certified, API rated, consistent across every order.",
    "p1": "Inconsistent oil quality causing early drain intervals",
    "p2": "Multiple suppliers with incompatible specifications",
    "p3": "Rising fleet maintenance costs from premium retail lubricants",
    "p4": "Documentation requirements from OEM warranty programs",
    "p5": "No dedicated account manager for re-order coordination",
    "s1t": "Bulk Pricing That Scales With Your Fleet",
    "s1d": "From 1,000L trial orders to full bulk tanker quantities. Price per liter drops significantly at IBC and tanker volumes.",
    "s2t": "API and OEM Specification Matching",
    "s2d": "Our technical team matches the correct API SN, CJ-4, or CK-4 specification to your fleet's OEM requirements.",
    "s3t": "Consistent Batch-to-Batch Quality",
    "s3d": "ISO 9001:2015 quality management and batch-specific COA on every order. Same formulation, same performance, every delivery.",
    "s4t": "Flexible Delivery Scheduling",
    "s4d": "Monthly, quarterly, or annual supply agreements. Proactive lead time communication so you never face an unplanned stock-out.",
    "testimonial": "We switched from three separate local suppliers to Model Oils for our entire 200-vehicle fleet. Pricing improved, documentation improved, and we haven't had a specification mismatch in 18 months.",
    "testimonialName": "Kwame A.", "testimonialRole": "Fleet Maintenance Director, West Africa",
    "faq1q": "What is the minimum order for fleet supply?",
    "faq1a": "Minimum bulk order is 1,000L (typically 5x 205L drums). We recommend starting with a trial order before committing to a supply agreement.",
    "faq2q": "Can you supply API CK-4 certified oil for modern diesel engines?",
    "faq2a": "Yes. Our SAE 15W-40 HD diesel oil carries API CK-4 certification, backward compatible with CJ-4 and CI-4.",
    "faq3q": "Do you offer price-lock agreements for fleet operators?",
    "faq3a": "Yes. 6-month and 12-month price-lock agreements are available for verified fleet operators committing to minimum quarterly volumes.",
    "faq4q": "Can I mix products across multiple specifications in one shipment?",
    "faq4a": "Yes. We regularly ship multi-product orders in a single container with separate COA for each batch."
  },
  "distributors": {
    "title": "Automotive Distributors", "eyebrow": "Solutions for Automotive Distributors",
    "headline": "Reliable Wholesale Motor Oil Supply for Distributors",
    "subheadline": "Establish a consistent supply of API and ACEA certified motor oils for your distribution network. Private label, co-packing, and custom formulation available.",
    "p1": "Unreliable supplier causing stock gaps in your distribution network",
    "p2": "No private label option from current manufacturer",
    "p3": "API and ACEA certifications required by automotive sector buyers",
    "p4": "Inconsistent quality complaints from end customers",
    "p5": "High cost of maintaining multiple source suppliers",
    "s1t": "Private Label and Co-Packing",
    "s1d": "We supply products under your label with your branding on drums and IBCs. Minimum private label run is 5,000L.",
    "s2t": "Full API and ACEA Certification Portfolio",
    "s2d": "API SN, SN+, CF, CK-4, and ACEA A3/B4, C3, E7, E9 across our motor oil range.",
    "s3t": "Distributor Pricing Tiers",
    "s3d": "Volume-based pricing with additional margin for distributors committing to quarterly minimum orders.",
    "s4t": "Complete Export Documentation",
    "s4d": "COA, MSDS, Certificate of Origin, and country-specific compliance documents. Your end customers clear customs without delays.",
    "testimonial": "We moved our entire product range to Model Oils as our single source supplier 14 months ago. Private label setup was straightforward, and the API documentation satisfied our local trade authority requirements immediately.",
    "testimonialName": "Rodrigo M.", "testimonialRole": "Import Director, South America",
    "faq1q": "What is the minimum for private label production?",
    "faq1a": "Minimum private label run is 5,000L per SKU. Lead time from label artwork approval to dispatch is 10-14 working days.",
    "faq2q": "Can you supply ACEA A3/B4 for European passenger car distribution?",
    "faq2a": "Yes. Our 5W-30 and 5W-40 synthetic oils are formulated and tested to ACEA A3/B4 and C3 sequences.",
    "faq3q": "Do you work with exclusive distributor agreements?",
    "faq3a": "Yes, for select markets. Exclusive distributor status requires a minimum annual volume commitment, reviewed quarterly.",
    "faq4q": "How do you handle quality complaints from my end customers?",
    "faq4a": "All batches are traceable via COA batch numbers. We investigate within 48 hours and provide a written response."
  },
  "industrial": {
    "title": "Industrial Companies", "eyebrow": "Solutions for Industrial Companies",
    "headline": "Industrial Lubricants for Manufacturing and Processing Plants",
    "subheadline": "Hydraulic fluids, gear oils, compressor oils, and specialty lubricants for industrial machinery. ISO VG graded, OEM specification matched, available in drums, IBCs, and bulk tanker.",
    "p1": "Multiple lubricant types from multiple suppliers creating procurement complexity",
    "p2": "High per-liter cost of branded industrial lubricants from major OEMs",
    "p3": "Difficulty sourcing ISO VG grades not stocked by local distributors",
    "p4": "Need for OEM approval documentation for warranty compliance",
    "p5": "Inconsistent lead times causing unplanned production downtime",
    "s1t": "Full Industrial Lubricant Range Under One Supplier",
    "s1d": "Hydraulic oils (ISO VG 32/46/68/100), gear oils (GL-4/GL-5), compressor oils, greases, and metalworking fluids. Consolidate procurement.",
    "s2t": "ISO VG Grade Matching",
    "s2d": "We stock or can formulate any ISO VG grade to DIN 51524, ISO 6743, or manufacturer specification.",
    "s3t": "Long-Term Supply Agreements",
    "s3d": "Annual supply agreements with quarterly delivery scheduling. Consistent pricing, consistent specification, dedicated account manager.",
    "s4t": "Technical Expertise",
    "s4d": "Our lubricants engineers can review your current product slate and identify consolidation opportunities.",
    "testimonial": "We consolidated from seven separate lubricant suppliers down to two. The cost reduction was significant, and technical support has been excellent.",
    "testimonialName": "Dmitri K.", "testimonialRole": "Procurement Manager, Eastern European Manufacturing Group",
    "faq1q": "Do you supply lubricants to ISO 6743 classification?",
    "faq1a": "Yes. Our industrial lubricant range covers ISO 6743 categories including HLP hydraulic fluids, CKD gear oils, VDL compressor oils, and others.",
    "faq2q": "Can you cross-reference against major OEM lubricant specifications?",
    "faq2a": "Yes. Our technical team maintains cross-reference tables against Bosch Rexroth, Parker, Sauer-Danfoss, and other major hydraulic OEM specifications.",
    "faq3q": "What is the lead time for industrial lubricants?",
    "faq3a": "Standard grades are available from stock with 5-10 working day lead time. Custom ISO VG grades require 15-20 working days.",
    "faq4q": "Do you offer a lubricant audit service?",
    "faq4a": "Yes. For qualified buyers considering a supply agreement, we offer a complimentary lubricant portfolio review."
  },
  "importers": {
    "title": "Lubricant Importers", "eyebrow": "Solutions for Lubricant Importers",
    "headline": "A Reliable Turkish Export Partner for Lubricant Importers",
    "subheadline": "Istanbul-based lubricant exporter with 15+ years of international trade experience. Consistent product quality, competitive FOB/CIF pricing, full customs documentation.",
    "p1": "Difficulty finding a reliable manufacturer that also handles export documentation",
    "p2": "Quality inconsistency between batches from trading companies",
    "p3": "Complex import compliance documentation requirements",
    "p4": "High minimum order quantities from major lubricant brands",
    "p5": "Limited flexibility on Incoterms and payment terms",
    "s1t": "Direct Manufacturer, Not a Trading Company",
    "s1d": "We blend and package lubricants in our Istanbul facility. No intermediary, no margin stacking, no quality variability.",
    "s2t": "Complete Export Documentation In-House",
    "s2d": "Our trade compliance team prepares every document required for your import clearance. No third-party delays.",
    "s3t": "Flexible Incoterms and Payment Terms",
    "s3d": "EXW, FOB, CFR, CIF, DAP, or DDP. T/T or L/C at sight. First order typically 30/70 T/T; established buyers can negotiate net terms.",
    "s4t": "Dedicated Export Account Manager",
    "s4d": "Single point of contact from order confirmation to delivery at destination port. Proactive updates on production, loading, and estimated arrival.",
    "testimonial": "As an importer handling customs clearance in three different countries, documentation accuracy is critical for us. Model Oils has not had a single documentation error in 23 shipments across 18 months.",
    "testimonialName": "Priya N.", "testimonialRole": "Import and Logistics Manager, Southeast Asia",
    "faq1q": "Are you a manufacturer or a trading company?",
    "faq1a": "We are a manufacturer and exporter. All blending and packaging takes place at our Istanbul facility. We do not resell third-party products.",
    "faq2q": "What are your typical lead times?",
    "faq2a": "Standard stock products: 5-7 working days from proforma confirmation. Custom formulations or private label: 15-20 working days.",
    "faq3q": "Can you prepare documentation for specific country import requirements?",
    "faq3a": "Yes. We have experience exporting to 40+ countries and maintain current knowledge of country-specific requirements.",
    "faq4q": "Do you have an existing importer in my country?",
    "faq4a": "We work directly with importers in most markets. Exclusivity agreements are available for importers committing to minimum annual volumes."
  }
}

sol_tr = {
  "breadcrumbHome": "Ana Sayfa", "breadcrumbSolutions": "Cozumler",
  "requestQuote": "Teklif Iste", "browseCatalog": "Urun Katalogu",
  "challengesTitle": "Cozdigumuz Yaygin Sorunlar",
  "solutionsTitle": "Model Oils Bunlari Nasil Cozer",
  "recommendedTitle": "{title} Icin Onerilen Urunler",
  "viewFullCatalog": "Tam Urun Katalogu",
  "faqTitle": "Sikca Sorulan Sorular",
  "ctaTitle": "Gereksinimlerinizi Gorusmeye Hazir misiniz?",
  "ctaBody": "Ihracat ekibimiz fiyatlandirma, teknik ozellikler ve belgelerle 24 saat icinde yanit verir.",
  "ctaBtn": "Teklif Iste",
  "fleet": {
    "title": "Filo Operatorleri", "eyebrow": "Filo Operatorleri Icin Cozumler",
    "headline": "Ticari Filolar Icin Tutarli Motor Yagi Temini",
    "subheadline": "Birden fazla yag tedarikcisini yonetmeyi birakin. Dizel ve benzinli filolar icin dokme SAE motor yaglari tedarik ediyoruz. ISO sertifikali, API degerlendirilmis.",
    "p1": "Erken yag degisim araliklarindan tutarsiz kalite",
    "p2": "Uyumsuz teknik ozelliklerle birden fazla tedarikci",
    "p3": "Premium perakende yaglardan artan bakim maliyetleri",
    "p4": "OEM garanti programlarindan belgeleme gereksinimleri",
    "p5": "Yeniden siparis koordinasyonu icin ozel hesap yoneticisi yok",
    "s1t": "Filonuzla Olceklenen Toplu Fiyatlandirma",
    "s1d": "1.000 litrelik deneme siparislerinden dokme tankere. IBC ve tanker hacimlerinde litre basina fiyat duser.",
    "s2t": "API ve OEM Teknik Ozellik Eslestime",
    "s2d": "Teknik ekibimiz filonuzun OEM gereksinimlerine gore dogru API SN, CJ-4 veya CK-4 teknik ozelligini belirler.",
    "s3t": "Partiden Partiye Tutarli Kalite",
    "s3d": "Her sipariste ISO 9001:2015 kalite yonetimi ve parti bazli COA. Ayni formulasyon, ayni performans.",
    "s4t": "Esnek Teslimat Planlamasi",
    "s4d": "Aylik, uc aylik veya yillik tedarik anlasmalari. Proaktif temin suresi bildirimi.",
    "testimonial": "200 araclik filomuz icin uc ayri yerel tedarikciden Model Oils'e gectik. Fiyatlandirma ve belgeler iyilesti, 18 aydir uyumsuzluk yok.",
    "testimonialName": "Kwame A.", "testimonialRole": "Filo Bakim Direktoru, Bati Afrika",
    "faq1q": "Filo tedariki icin minimum siparis nedir?",
    "faq1a": "Minimum 1.000 litredir. Tedarik anlasması yapmadan once deneme siparisiyle baslamanizi oneririz.",
    "faq2q": "Modern dizel icin API CK-4 sertifikali yag tedarik edebilir misiniz?",
    "faq2a": "Evet. SAE 15W-40 HD yagimiz API CK-4 sertifikalidir. Her sevkiyatla COA saglanir.",
    "faq3q": "Fiyat sabitleme anlasmalari sunuyor musunuz?",
    "faq3a": "Evet. Minimum uc aylik hacme taahhut eden operatorler icin 6 ve 12 aylik fiyat sabitleme anlasmalari mevcuttur.",
    "faq4q": "Tek sevkiyatta farkli teknik ozellikler karistirilabilir mi?",
    "faq4a": "Evet. Her parti icin ayri COA ile tek konteyner icinde cok urunlu siparisleri duzzenli olarak sevk ediyoruz."
  },
  "distributors": {
    "title": "Otomotiv Distribuutorleri", "eyebrow": "Otomotiv Distribuutorleri Icin Cozumler",
    "headline": "Distribuutorler Icin Guvenilir Toplu Motor Yagi Temini",
    "subheadline": "Dagitim aginiz icin API ve ACEA sertifikali motor yaglarinin tutarli tedarikini saglayin. Ozel etiket ve birlikte paketleme mevcuttur.",
    "p1": "Stok bosluklarina neden olan guvenilmez tedarikci",
    "p2": "Mevcut ureticiden ozel etiket secenegi yok",
    "p3": "Otomotiv sektoru alicilarinin API ve ACEA sertifikalari gerektirmesi",
    "p4": "Son musterilerden tutarsiz kalite sikayetleri",
    "p5": "Birden fazla kaynak tedarikci surdurmenin yuksek maliyeti",
    "s1t": "Ozel Etiket ve Birlikte Paketleme",
    "s1d": "Etiketinizle, varil ve IBC'lerde markanizin baskisiyla urun tedarik edebiliriz. Minimum 5.000 litre.",
    "s2t": "Tam API ve ACEA Sertifika Portfoyu",
    "s2d": "Motor yagi serimizde API SN, SN+, CF, CK-4 ve ACEA A3/B4, C3, E7, E9.",
    "s3t": "Distribuutor Fiyat Kademeleri",
    "s3d": "Uc aylik minimum siparisle taahhut eden distribuutorler icin ek marjla hacim bazli fiyatlandirma.",
    "s4t": "Eksiksiz Ihracat Belgeleme",
    "s4d": "COA, MSDS, Mense Sahadetnamesi ve ulkeye ozel uyumluluk belgeleri dahil.",
    "testimonial": "Tum urun serimizi 14 ay once Model Oils'e tasidik. Ozel etiket kurulumu basitti ve API belgeleri yerel gereksinimler karsiladi.",
    "testimonialName": "Rodrigo M.", "testimonialRole": "Ithalat Direktoru, Guney Amerika",
    "faq1q": "Ozel etiket uretimi icin minimum nedir?",
    "faq1a": "SKU basina 5.000 litredir. Etiket baskı onayindan sevkiyata 10-14 is gunu.",
    "faq2q": "Avrupa binek arac dagitimi icin ACEA A3/B4 tedarik edebilir misiniz?",
    "faq2a": "Evet. 5W-30 ve 5W-40 sentetik yaglarimiz ACEA A3/B4 ve C3 icin test edilmistir.",
    "faq3q": "Munhasir distribuutor anlasmalariyla calisiyor musunuz?",
    "faq3a": "Evet, secili pazarlarda. Minimum yillik hacim taahhuduu gerekir.",
    "faq4q": "Son musterilerimin kalite sikayetlerini nasil ele aliyorsunuz?",
    "faq4a": "COA parti numaralari araciligiyla tum partiler izlenebilir. 48 saat icinde inceliyoruz."
  },
  "industrial": {
    "title": "Endusturiyelel Sirketler", "eyebrow": "Endustriyel Sirketler Icin Cozumler",
    "headline": "Uretim ve Isleme Tesisleri Icin Endustriyel Yaglayicilar",
    "subheadline": "Endustriyel makineler icin hidrolik sivilar, disli yaglari, kompressor yaglari ve ozel yaglayicilar. ISO VG siniflandirmali, OEM teknik ozelligi eslesmis.",
    "p1": "Birden fazla tedarikciden birden fazla yaglayici turu - tedarik karmasikligi",
    "p2": "Buyuk OEM'lerden yuksek litre basina maliyet",
    "p3": "Yerel distribuutorlerin stokladigi ISO VG siniflarini tedarik etme zorlugu",
    "p4": "Garanti uyumlulugu icin OEM onay belgeleme ihtiyaci",
    "p5": "Planlanmamis uretim durusslarına neden olan tutarsiz temin sureleri",
    "s1t": "Tek Tedarikci Altinda Tam Endustriyel Yaglayici Yelpazesi",
    "s1d": "Hidrolik yaglar (ISO VG 32/46/68/100), disli yaglari (GL-4/GL-5), kompressor yaglari, gresler ve metal isleme sivilari.",
    "s2t": "ISO VG Sinif Eslestirme",
    "s2d": "DIN 51524, ISO 6743 veya uretici teknik ozelligine uygun herhangi bir ISO VG sinifini stokluyoruz veya formulleyebiliyoruz.",
    "s3t": "Uzun Vadeli Tedarik Anlasmalari",
    "s3d": "Uc aylik teslimat planlamali yillik tedarik anlasmalari. Tutarli fiyatlandirma ve ozel hesap yoneticisi.",
    "s4t": "Teknik Uzmanlik",
    "s4d": "Muhendislerimiz mevcut urun listenizi inceleyerek konsolidasyon firsatlarini belirleyebilir.",
    "testimonial": "Yedi ayri yaglayici tedarikcisini ikiye indirdik. Maliyet dususu onemli oldu ve teknik destek mukemmeldi.",
    "testimonialName": "Dmitri K.", "testimonialRole": "Satin Alma Muduru, Dogu Avrupa Uretim Grubu",
    "faq1q": "ISO 6743 siniflandirmasina gore yaglayici tedarik ediyor musunuz?",
    "faq1a": "Evet. HLP hidrolik sivilar, CKD disli yaglari, VDL kompressor yaglari dahil ISO 6743 kategorilerini kapsiyoruz.",
    "faq2q": "Buyuk OEM teknik ozelliklerine gore capraz referans yapabilir misiniz?",
    "faq2a": "Evet. Bosch Rexroth, Parker ve diger buyuk hidrolik OEM'lere karsi capraz referans tablolari tutuyoruz.",
    "faq3q": "Endustriyel yaglayicilar icin temin suresi nedir?",
    "faq3a": "Standart siniflar stoktan 5-10 is gunuduur. Ozel ISO VG siniflar 15-20 is gunu gerektirir.",
    "faq4q": "Yaglayici denetim hizmeti sunuyor musunuz?",
    "faq4a": "Evet. Tedarik anlasması degerlendiren nitelikli alicilar icin ucretsiz portfoy degerlendirmesi sunuyoruz."
  },
  "importers": {
    "title": "Yaglayici Ithalatacilar", "eyebrow": "Yaglayici Ithalaatcilari Icin Cozumler",
    "headline": "Yaglayici Ithalaatcilari Icin Guvenilir Turk Ihracat Ortagi",
    "subheadline": "15 yili askin uluslararasi ticaret deneyimiyle Istanbul merkezli yaglayici ihracatcisi. Tutarli kalite, rekabetci FOB/CIF fiyatlandirmasi, eksiksiz gumruk belgeleme.",
    "p1": "Ihracat belgelemesini de ustlenen guvenilir uretici bulmada zorluk",
    "p2": "Ticaret sirketlerinden partiler arasinda kalite tutarsizligi",
    "p3": "Karmasik ithalat uyumluluk belgeleme gereksinimleri",
    "p4": "Buyuk yaglayici markalarin yuksek minimum siparis miktarlari",
    "p5": "Incoterms ve odeme kosullarinda sinirli esneklik",
    "s1t": "Ticaret Sirketi Degil, Dogrudan Uretici",
    "s1d": "Yaglayicilari Istanbul tesisimizde harmanlar ve paketleriz. Araaci yok, marj ekleme yok.",
    "s2t": "Buynyede Eksiksiz Ihracat Belgeleme",
    "s2d": "Ozel ticaret uyum ekibimiz ithalat guumruugu icin gereken her belgeyi hazirlar.",
    "s3t": "Esnek Incoterms ve Odeme Kosullari",
    "s3d": "EXW, FOB, CFR, CIF, DAP veya DDP. T/T veya goruldugunde Akreditif.",
    "s4t": "Ozel Ihracat Hesap Yoneticisi",
    "s4d": "Siparis onayindan varis limaninda teslimata kadar tek iletisim noktasi.",
    "testimonial": "Uc farkli ulkede gumruk islemlerini yoneten bir ithalatci olarak belge dogrulugu kritik. Model Oils 18 ayda 23 sevkiyatta tek hata yapmadi.",
    "testimonialName": "Priya N.", "testimonialRole": "Ithalat ve Lojistik Muduru, Guneydogu Asya",
    "faq1q": "Uretici misiniz yoksa ticaret sirketi mi?",
    "faq1a": "Uretici ve ihracatciyiz. Tum harmanlamanin ve paketlemenin yapildigi yer Istanbul tesisimizdir.",
    "faq2q": "Tipik temin sureleriniz nedir?",
    "faq2a": "Standart stok: proforma onayindan 5-7 is gunu. Ozel formulasyonlar: 15-20 is gunu.",
    "faq3q": "Belirli ulke ithalat gereksinimleri icin belgeleme hazırlayabilir misiniz?",
    "faq3a": "Evet. 40'tan fazla ulkeye ihracat deneyimimiz var ve ulkeye ozel gereksinimleri guncel tutuyoruz.",
    "faq4q": "Ulkemizde mevcut bir ithalatciniz var mi?",
    "faq4a": "Cogu pazarda dogrudan ithalatatcilarla calisiyoruz. Munhasirlik anlasmalari minimum yillik hacim taahhuduu ile mevcuttur."
  }
}

# For RU and FA: copy EN structure but translate UI labels + persona titles
sol_ru = {k: v for k, v in sol_en.items()}
sol_ru.update({
  "breadcrumbHome": "Главная", "breadcrumbSolutions": "Решения",
  "requestQuote": "Запросить цену", "browseCatalog": "Просмотреть каталог",
  "challengesTitle": "Типичные проблемы, которые мы решаем",
  "solutionsTitle": "Как Model Oils их решает",
  "recommendedTitle": "Рекомендуемые продукты для {title}",
  "viewFullCatalog": "Полный каталог продукции",
  "faqTitle": "Часто задаваемые вопросы",
  "ctaTitle": "Готовы обсудить ваши требования?",
  "ctaBody": "Наша экспортная команда ответит в течение 24 часов с ценами, спецификациями и документацией.",
  "ctaBtn": "Запросить цену",
})
sol_ru["fleet"] = {k: v for k, v in sol_en["fleet"].items()}
sol_ru["fleet"]["title"] = "Операторы автопарков"
sol_ru["fleet"]["eyebrow"] = "Решения для операторов автопарков"
sol_ru["distributors"] = {k: v for k, v in sol_en["distributors"].items()}
sol_ru["distributors"]["title"] = "Автомобильные дистрибьюторы"
sol_ru["distributors"]["eyebrow"] = "Решения для автомобильных дистрибьюторов"
sol_ru["industrial"] = {k: v for k, v in sol_en["industrial"].items()}
sol_ru["industrial"]["title"] = "Промышленные компании"
sol_ru["industrial"]["eyebrow"] = "Решения для промышленных компаний"
sol_ru["importers"] = {k: v for k, v in sol_en["importers"].items()}
sol_ru["importers"]["title"] = "Импортёры смазочных материалов"
sol_ru["importers"]["eyebrow"] = "Решения для импортёров смазочных материалов"

sol_fa = {k: v for k, v in sol_en.items()}
sol_fa.update({
  "breadcrumbHome": "خانه", "breadcrumbSolutions": "راه‌حل‌ها",
  "requestQuote": "درخواست قیمت", "browseCatalog": "مشاهده کاتالوگ",
  "challengesTitle": "چالش‌های رایجی که حل می‌کنیم",
  "solutionsTitle": "Model Oils چگونه آن‌ها را حل می‌کند",
  "recommendedTitle": "محصولات توصیه‌شده برای {title}",
  "viewFullCatalog": "مشاهده کاتالوگ کامل محصولات",
  "faqTitle": "سوالات متداول",
  "ctaTitle": "آماده بحث درباره نیازهایتان هستید؟",
  "ctaBody": "تیم صادراتی ما ظرف ۲۴ ساعت با قیمت‌گذاری، مشخصات و مستندات پاسخ می‌دهد.",
  "ctaBtn": "درخواست قیمت",
})
sol_fa["fleet"] = {k: v for k, v in sol_en["fleet"].items()}
sol_fa["fleet"]["title"] = "اپراتورهای ناوگان"
sol_fa["fleet"]["eyebrow"] = "راه‌حل‌ها برای اپراتورهای ناوگان"
sol_fa["distributors"] = {k: v for k, v in sol_en["distributors"].items()}
sol_fa["distributors"]["title"] = "توزیع‌کنندگان خودرو"
sol_fa["distributors"]["eyebrow"] = "راه‌حل‌ها برای توزیع‌کنندگان خودرو"
sol_fa["industrial"] = {k: v for k, v in sol_en["industrial"].items()}
sol_fa["industrial"]["title"] = "شرکت‌های صنعتی"
sol_fa["industrial"]["eyebrow"] = "راه‌حل‌ها برای شرکت‌های صنعتی"
sol_fa["importers"] = {k: v for k, v in sol_en["importers"].items()}
sol_fa["importers"]["title"] = "واردکنندگان روان‌کننده"
sol_fa["importers"]["eyebrow"] = "راه‌حل‌ها برای واردکنندگان روان‌کننده"

for lang, sol in [('en', sol_en), ('tr', sol_tr), ('ru', sol_ru), ('fa', sol_fa)]:
    with open(f'c:/dev/model-oils/messages/{lang}.json', encoding='utf-8') as f:
        d = json.load(f)
    d['solutions'] = sol
    with open(f'c:/dev/model-oils/messages/{lang}.json', 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f'{lang}.json done')
