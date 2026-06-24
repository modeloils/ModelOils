import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, Flame, X, ZoomIn } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import flagshipImg from "@/assets/flagship.png";

interface ProductItem {
  slug: string;
  name: string;
  image: string;
}

type LocaleText = string | Record<string, string>;
type LocaleTextArray = string[] | Record<string, string[]>;

function resolveText(val: LocaleText, locale: string): string {
  if (typeof val === "string") return val;
  return val[locale] ?? val["en"] ?? "";
}
function resolveArray(val: LocaleTextArray, locale: string): string[] {
  if (Array.isArray(val)) return val;
  return val[locale] ?? val["en"] ?? [];
}

interface ProductDetail {
  description: LocaleText;
  features: LocaleTextArray;
  standards: LocaleText;
  packaging: string[];
}

interface SubcategoryGroup {
  title: string;
  products: ProductItem[];
}

interface CategoryData {
  title: string;
  products: ProductItem[];
  details: Record<string, ProductDetail>;
  subcategories?: Record<string, SubcategoryGroup>;
}

const CATEGORY_DATA: Record<string, CategoryData> = {
  "Binek-Arac-Motor-Yaglari": {
    title: "Binek Araç Motor Yağları",
    products: [],
    details: {
      "Binek-0W-16-1L":     { description: { tr: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", en: "HI-TECH SYNTHETIC 0W-16, a premium fully synthetic engine oil developed for hybrid and modern passenger cars. Its API SN Plus and ACEA C5 approved ultra-low viscosity formula maximises fuel savings while providing complete protection for engine components.", ru: "HI-TECH SYNTHETIC 0W-16, премиальное полностью синтетическое моторное масло, разработанное для гибридных и современных легковых автомобилей. Одобренная API SN Plus и ACEA C5 ультранизковязкостная формула максимально снижает расход топлива, обеспечивая полную защиту компонентов двигателя.", fa: "HI-TECH SYNTHETIC 0W-16، یک روغن موتور تمام سنتتیک برتر است که برای خودروهای هیبریدی و مدرن سواری توسعه یافته است. فرمول با ویسکوزیته بسیار پایین تأییدشده توسط API SN Plus و ACEA C5، صرفه‌جویی در سوخت را به حداکثر می‌رساند و در عین حال حفاظت کاملی از اجزای موتور فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 0W-16، زيت محرك اصطناعي بالكامل فائق الجودة مطوَّر للسيارات الهجينة والسيارات الركابية الحديثة. تعمل صيغته معتمدة API SN Plus وAECA C5 فائقة الانسيابية على تعظيم توفير الوقود مع توفير الحماية الكاملة لمكونات المحرك.", de: "HI-TECH SYNTHETIC 0W-16, ein Premium-Vollsynthetikmotoröl, das für Hybrid- und moderne Personenfahrzeuge entwickelt wurde. Die nach API SN Plus und ACEA C5 zugelassene Ultraniedrigviskositätsformel maximiert die Kraftstoffeinsparung und schützt gleichzeitig alle Motorkomponenten zuverlässig.", fr: "HI-TECH SYNTHETIC 0W-16, une huile moteur entièrement synthétique haut de gamme développée pour les véhicules hybrides et les voitures particulières modernes. Sa formule ultra-basse viscosité approuvée API SN Plus et ACEA C5 maximise les économies de carburant tout en assurant une protection complète des composants moteur." }, features: { tr: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], en: ["Specially formulated for hybrid vehicle engines and start-stop systems.", "Reduces fuel consumption and CO₂ emissions with an ultra-low friction coefficient.", "Provides LSPI protection approved by API SN Plus."], ru: ["Специально разработан для двигателей гибридных автомобилей и систем start-stop.", "Снижает расход топлива и выбросы CO₂ за счёт ультранизкого коэффициента трения.", "Обеспечивает защиту от LSPI, одобренную API SN Plus."], fa: ["برای موتورهای خودروهای هیبریدی و سیستم‌های استارت-استاپ فرموله شده است.", "با ضریب اصطکاک بسیار پایین، مصرف سوخت و انتشار CO₂ را کاهش می‌دهد.", "حفاظت LSPI تأییدشده توسط API SN Plus را ارائه می‌دهد."], ar: ["مُصاغ خصيصاً لمحركات السيارات الهجينة وأنظمة بدء التشغيل والإيقاف التلقائي.", "يقلل استهلاك الوقود وانبعاثات CO₂ بفضل معامل احتكاك منخفض للغاية.", "يوفر حماية LSPI معتمدة من API SN Plus."], de: ["Speziell für Hybridfahrzeugmotoren und Start-Stopp-Systeme formuliert.", "Reduziert Kraftstoffverbrauch und CO₂-Emissionen durch einen extrem niedrigen Reibungskoeffizienten.", "Bietet durch API SN Plus zugelassenen LSPI-Schutz."], fr: ["Spécialement formulée pour les moteurs de véhicules hybrides et les systèmes start-stop.", "Réduit la consommation de carburant et les émissions de CO₂ grâce à un coefficient de frottement ultra-faible.", "Offre une protection LSPI approuvée API SN Plus."] }, standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-16-4L":     { description: { tr: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", en: "HI-TECH SYNTHETIC 0W-16, a premium fully synthetic engine oil developed for hybrid and modern passenger cars. Its API SN Plus and ACEA C5 approved ultra-low viscosity formula maximises fuel savings while providing complete protection for engine components.", ru: "HI-TECH SYNTHETIC 0W-16, премиальное полностью синтетическое моторное масло, разработанное для гибридных и современных легковых автомобилей. Одобренная API SN Plus и ACEA C5 ультранизковязкостная формула максимально снижает расход топлива, обеспечивая полную защиту компонентов двигателя.", fa: "HI-TECH SYNTHETIC 0W-16، یک روغن موتور تمام سنتتیک برتر است که برای خودروهای هیبریدی و مدرن سواری توسعه یافته است. فرمول با ویسکوزیته بسیار پایین تأییدشده توسط API SN Plus و ACEA C5، صرفه‌جویی در سوخت را به حداکثر می‌رساند و در عین حال حفاظت کاملی از اجزای موتور فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 0W-16، زيت محرك اصطناعي بالكامل فائق الجودة مطوَّر للسيارات الهجينة والسيارات الركابية الحديثة. تعمل صيغته معتمدة API SN Plus وAECA C5 فائقة الانسيابية على تعظيم توفير الوقود مع توفير الحماية الكاملة لمكونات المحرك.", de: "HI-TECH SYNTHETIC 0W-16, ein Premium-Vollsynthetikmotoröl, das für Hybrid- und moderne Personenfahrzeuge entwickelt wurde. Die nach API SN Plus und ACEA C5 zugelassene Ultraniedrigviskositätsformel maximiert die Kraftstoffeinsparung und schützt gleichzeitig alle Motorkomponenten zuverlässig.", fr: "HI-TECH SYNTHETIC 0W-16, une huile moteur entièrement synthétique haut de gamme développée pour les véhicules hybrides et les voitures particulières modernes. Sa formule ultra-basse viscosité approuvée API SN Plus et ACEA C5 maximise les économies de carburant tout en assurant une protection complète des composants moteur." }, features: { tr: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], en: ["Specially formulated for hybrid vehicle engines and start-stop systems.", "Reduces fuel consumption and CO₂ emissions with an ultra-low friction coefficient.", "Provides LSPI protection approved by API SN Plus."], ru: ["Специально разработан для двигателей гибридных автомобилей и систем start-stop.", "Снижает расход топлива и выбросы CO₂ за счёт ультранизкого коэффициента трения.", "Обеспечивает защиту от LSPI, одобренную API SN Plus."], fa: ["برای موتورهای خودروهای هیبریدی و سیستم‌های استارت-استاپ فرموله شده است.", "با ضریب اصطکاک بسیار پایین، مصرف سوخت و انتشار CO₂ را کاهش می‌دهد.", "حفاظت LSPI تأییدشده توسط API SN Plus را ارائه می‌دهد."], ar: ["مُصاغ خصيصاً لمحركات السيارات الهجينة وأنظمة بدء التشغيل والإيقاف التلقائي.", "يقلل استهلاك الوقود وانبعاثات CO₂ بفضل معامل احتكاك منخفض للغاية.", "يوفر حماية LSPI معتمدة من API SN Plus."], de: ["Speziell für Hybridfahrzeugmotoren und Start-Stopp-Systeme formuliert.", "Reduziert Kraftstoffverbrauch und CO₂-Emissionen durch einen extrem niedrigen Reibungskoeffizienten.", "Bietet durch API SN Plus zugelassenen LSPI-Schutz."], fr: ["Spécialement formulée pour les moteurs de véhicules hybrides et les systèmes start-stop.", "Réduit la consommation de carburant et les émissions de CO₂ grâce à un coefficient de frottement ultra-faible.", "Offre une protection LSPI approuvée API SN Plus."] }, standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-16-5L":     { description: { tr: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", en: "HI-TECH SYNTHETIC 0W-16, a premium fully synthetic engine oil developed for hybrid and modern passenger cars. Its API SN Plus and ACEA C5 approved ultra-low viscosity formula maximises fuel savings while providing complete protection for engine components.", ru: "HI-TECH SYNTHETIC 0W-16, премиальное полностью синтетическое моторное масло, разработанное для гибридных и современных легковых автомобилей. Одобренная API SN Plus и ACEA C5 ультранизковязкостная формула максимально снижает расход топлива, обеспечивая полную защиту компонентов двигателя.", fa: "HI-TECH SYNTHETIC 0W-16، یک روغن موتور تمام سنتتیک برتر است که برای خودروهای هیبریدی و مدرن سواری توسعه یافته است. فرمول با ویسکوزیته بسیار پایین تأییدشده توسط API SN Plus و ACEA C5، صرفه‌جویی در سوخت را به حداکثر می‌رساند و در عین حال حفاظت کاملی از اجزای موتور فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 0W-16، زيت محرك اصطناعي بالكامل فائق الجودة مطوَّر للسيارات الهجينة والسيارات الركابية الحديثة. تعمل صيغته معتمدة API SN Plus وAECA C5 فائقة الانسيابية على تعظيم توفير الوقود مع توفير الحماية الكاملة لمكونات المحرك.", de: "HI-TECH SYNTHETIC 0W-16, ein Premium-Vollsynthetikmotoröl, das für Hybrid- und moderne Personenfahrzeuge entwickelt wurde. Die nach API SN Plus und ACEA C5 zugelassene Ultraniedrigviskositätsformel maximiert die Kraftstoffeinsparung und schützt gleichzeitig alle Motorkomponenten zuverlässig.", fr: "HI-TECH SYNTHETIC 0W-16, une huile moteur entièrement synthétique haut de gamme développée pour les véhicules hybrides et les voitures particulières modernes. Sa formule ultra-basse viscosité approuvée API SN Plus et ACEA C5 maximise les économies de carburant tout en assurant une protection complète des composants moteur." }, features: { tr: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], en: ["Specially formulated for hybrid vehicle engines and start-stop systems.", "Reduces fuel consumption and CO₂ emissions with an ultra-low friction coefficient.", "Provides LSPI protection approved by API SN Plus."], ru: ["Специально разработан для двигателей гибридных автомобилей и систем start-stop.", "Снижает расход топлива и выбросы CO₂ за счёт ультранизкого коэффициента трения.", "Обеспечивает защиту от LSPI, одобренную API SN Plus."], fa: ["برای موتورهای خودروهای هیبریدی و سیستم‌های استارت-استاپ فرموله شده است.", "با ضریب اصطکاک بسیار پایین، مصرف سوخت و انتشار CO₂ را کاهش می‌دهد.", "حفاظت LSPI تأییدشده توسط API SN Plus را ارائه می‌دهد."], ar: ["مُصاغ خصيصاً لمحركات السيارات الهجينة وأنظمة بدء التشغيل والإيقاف التلقائي.", "يقلل استهلاك الوقود وانبعاثات CO₂ بفضل معامل احتكاك منخفض للغاية.", "يوفر حماية LSPI معتمدة من API SN Plus."], de: ["Speziell für Hybridfahrzeugmotoren und Start-Stopp-Systeme formuliert.", "Reduziert Kraftstoffverbrauch und CO₂-Emissionen durch einen extrem niedrigen Reibungskoeffizienten.", "Bietet durch API SN Plus zugelassenen LSPI-Schutz."], fr: ["Spécialement formulée pour les moteurs de véhicules hybrides et les systèmes start-stop.", "Réduit la consommation de carburant et les émissions de CO₂ grâce à un coefficient de frottement ultra-faible.", "Offre une protection LSPI approuvée API SN Plus."] }, standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-1L":     { description: { tr: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", en: "HI-TECH SYNTHETIC 0W-20, a fully synthetic engine oil for modern petrol and hybrid engines. Its ILSAC GF-5 and API SL/SM approved formula delivers excellent fluidity at low temperatures and outstanding fuel economy.", ru: "HI-TECH SYNTHETIC 0W-20, полностью синтетическое моторное масло для современных бензиновых и гибридных двигателей. Формула, одобренная ILSAC GF-5 и API SL/SM, обеспечивает отличную текучесть при низких температурах и превосходную топливную экономичность.", fa: "HI-TECH SYNTHETIC 0W-20، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی مدرن و هیبریدی است. فرمول تأییدشده ILSAC GF-5 و API SL/SM، روانی عالی در دماهای پایین و صرفه‌جویی برتر در سوخت را تضمین می‌کند.", ar: "HI-TECH SYNTHETIC 0W-20، زيت محرك اصطناعي بالكامل للمحركات البنزينية الحديثة والهجينة. تضمن صيغته معتمدة ILSAC GF-5 وAPI SL/SM انسيابية ممتازة في درجات الحرارة المنخفضة واقتصاداً فائقاً في الوقود.", de: "HI-TECH SYNTHETIC 0W-20, ein vollsynthetisches Motoröl für moderne Benzin- und Hybridmotoren. Die nach ILSAC GF-5 und API SL/SM zugelassene Formel gewährleistet hervorragende Fließfähigkeit bei niedrigen Temperaturen und überlegene Kraftstoffwirtschaftlichkeit.", fr: "HI-TECH SYNTHETIC 0W-20, une huile moteur entièrement synthétique pour moteurs à essence modernes et hybrides. Sa formule approuvée ILSAC GF-5 et API SL/SM assure une fluidité excellente par basses températures et une économie de carburant supérieure." }, features: { tr: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], en: ["Rapid oil circulation at very low temperatures prevents cold-start damage.", "High viscosity index ensures stable protection across a wide temperature range.", "Ultra-low friction characteristic enhances fuel economy."], ru: ["Быстрая циркуляция масла при очень низких температурах предотвращает повреждения при холодном пуске.", "Высокий индекс вязкости обеспечивает стабильную защиту в широком диапазоне температур.", "Ультранизкое трение способствует экономии топлива."], fa: ["گردش سریع روغن در دماهای بسیار پایین از آسیب استارت سرد جلوگیری می‌کند.", "اندیس ویسکوزیته بالا، حفاظت پایدار در محدوده دمایی گسترده را تضمین می‌کند.", "ویژگی اصطکاک بسیار پایین، مصرف سوخت را بهبود می‌بخشد."], ar: ["تدفق الزيت السريع في درجات الحرارة المنخفضة جداً يمنع تلف بدء التشغيل البارد.", "مؤشر لزوجة عالٍ يضمن حماية مستقرة عبر نطاق درجات حرارة واسع.", "خاصية الاحتكاك المنخفض للغاية تحسّن اقتصاد الوقود."], de: ["Schnelle Ölzirkulation bei sehr niedrigen Temperaturen verhindert Kaltstart-Schäden.", "Hoher Viskositätsindex gewährleistet stabile Schutzwirkung über einen breiten Temperaturbereich.", "Ultraniedriges Reibungsmerkmal verbessert die Kraftstoffwirtschaftlichkeit."], fr: ["La circulation rapide de l'huile à très basses températures prévient les dommages au démarrage à froid.", "L'indice de viscosité élevé assure une protection stable sur une large plage de températures.", "La caractéristique de friction ultra-faible améliore l'économie de carburant."] }, standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-4L":     { description: { tr: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", en: "HI-TECH SYNTHETIC 0W-20, a fully synthetic engine oil for modern petrol and hybrid engines. Its ILSAC GF-5 and API SL/SM approved formula delivers excellent fluidity at low temperatures and outstanding fuel economy.", ru: "HI-TECH SYNTHETIC 0W-20, полностью синтетическое моторное масло для современных бензиновых и гибридных двигателей. Формула, одобренная ILSAC GF-5 и API SL/SM, обеспечивает отличную текучесть при низких температурах и превосходную топливную экономичность.", fa: "HI-TECH SYNTHETIC 0W-20، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی مدرن و هیبریدی است. فرمول تأییدشده ILSAC GF-5 و API SL/SM، روانی عالی در دماهای پایین و صرفه‌جویی برتر در سوخت را تضمین می‌کند.", ar: "HI-TECH SYNTHETIC 0W-20، زيت محرك اصطناعي بالكامل للمحركات البنزينية الحديثة والهجينة. تضمن صيغته معتمدة ILSAC GF-5 وAPI SL/SM انسيابية ممتازة في درجات الحرارة المنخفضة واقتصاداً فائقاً في الوقود.", de: "HI-TECH SYNTHETIC 0W-20, ein vollsynthetisches Motoröl für moderne Benzin- und Hybridmotoren. Die nach ILSAC GF-5 und API SL/SM zugelassene Formel gewährleistet hervorragende Fließfähigkeit bei niedrigen Temperaturen und überlegene Kraftstoffwirtschaftlichkeit.", fr: "HI-TECH SYNTHETIC 0W-20, une huile moteur entièrement synthétique pour moteurs à essence modernes et hybrides. Sa formule approuvée ILSAC GF-5 et API SL/SM assure une fluidité excellente par basses températures et une économie de carburant supérieure." }, features: { tr: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], en: ["Rapid oil circulation at very low temperatures prevents cold-start damage.", "High viscosity index ensures stable protection across a wide temperature range.", "Ultra-low friction characteristic enhances fuel economy."], ru: ["Быстрая циркуляция масла при очень низких температурах предотвращает повреждения при холодном пуске.", "Высокий индекс вязкости обеспечивает стабильную защиту в широком диапазоне температур.", "Ультранизкое трение способствует экономии топлива."], fa: ["گردش سریع روغن در دماهای بسیار پایین از آسیب استارت سرد جلوگیری می‌کند.", "اندیس ویسکوزیته بالا، حفاظت پایدار در محدوده دمایی گسترده را تضمین می‌کند.", "ویژگی اصطکاک بسیار پایین، مصرف سوخت را بهبود می‌بخشد."], ar: ["تدفق الزيت السريع في درجات الحرارة المنخفضة جداً يمنع تلف بدء التشغيل البارد.", "مؤشر لزوجة عالٍ يضمن حماية مستقرة عبر نطاق درجات حرارة واسع.", "خاصية الاحتكاك المنخفض للغاية تحسّن اقتصاد الوقود."], de: ["Schnelle Ölzirkulation bei sehr niedrigen Temperaturen verhindert Kaltstart-Schäden.", "Hoher Viskositätsindex gewährleistet stabile Schutzwirkung über einen breiten Temperaturbereich.", "Ultraniedriges Reibungsmerkmal verbessert die Kraftstoffwirtschaftlichkeit."], fr: ["La circulation rapide de l'huile à très basses températures prévient les dommages au démarrage à froid.", "L'indice de viscosité élevé assure une protection stable sur une large plage de températures.", "La caractéristique de friction ultra-faible améliore l'économie de carburant."] }, standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-5L":     { description: { tr: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", en: "HI-TECH SYNTHETIC 0W-20, a fully synthetic engine oil for modern petrol and hybrid engines. Its ILSAC GF-5 and API SL/SM approved formula delivers excellent fluidity at low temperatures and outstanding fuel economy.", ru: "HI-TECH SYNTHETIC 0W-20, полностью синтетическое моторное масло для современных бензиновых и гибридных двигателей. Формула, одобренная ILSAC GF-5 и API SL/SM, обеспечивает отличную текучесть при низких температурах и превосходную топливную экономичность.", fa: "HI-TECH SYNTHETIC 0W-20، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی مدرن و هیبریدی است. فرمول تأییدشده ILSAC GF-5 و API SL/SM، روانی عالی در دماهای پایین و صرفه‌جویی برتر در سوخت را تضمین می‌کند.", ar: "HI-TECH SYNTHETIC 0W-20، زيت محرك اصطناعي بالكامل للمحركات البنزينية الحديثة والهجينة. تضمن صيغته معتمدة ILSAC GF-5 وAPI SL/SM انسيابية ممتازة في درجات الحرارة المنخفضة واقتصاداً فائقاً في الوقود.", de: "HI-TECH SYNTHETIC 0W-20, ein vollsynthetisches Motoröl für moderne Benzin- und Hybridmotoren. Die nach ILSAC GF-5 und API SL/SM zugelassene Formel gewährleistet hervorragende Fließfähigkeit bei niedrigen Temperaturen und überlegene Kraftstoffwirtschaftlichkeit.", fr: "HI-TECH SYNTHETIC 0W-20, une huile moteur entièrement synthétique pour moteurs à essence modernes et hybrides. Sa formule approuvée ILSAC GF-5 et API SL/SM assure une fluidité excellente par basses températures et une économie de carburant supérieure." }, features: { tr: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], en: ["Rapid oil circulation at very low temperatures prevents cold-start damage.", "High viscosity index ensures stable protection across a wide temperature range.", "Ultra-low friction characteristic enhances fuel economy."], ru: ["Быстрая циркуляция масла при очень низких температурах предотвращает повреждения при холодном пуске.", "Высокий индекс вязкости обеспечивает стабильную защиту в широком диапазоне температур.", "Ультранизкое трение способствует экономии топлива."], fa: ["گردش سریع روغن در دماهای بسیار پایین از آسیب استارت سرد جلوگیری می‌کند.", "اندیس ویسکوزیته بالا، حفاظت پایدار در محدوده دمایی گسترده را تضمین می‌کند.", "ویژگی اصطکاک بسیار پایین، مصرف سوخت را بهبود می‌بخشد."], ar: ["تدفق الزيت السريع في درجات الحرارة المنخفضة جداً يمنع تلف بدء التشغيل البارد.", "مؤشر لزوجة عالٍ يضمن حماية مستقرة عبر نطاق درجات حرارة واسع.", "خاصية الاحتكاك المنخفض للغاية تحسّن اقتصاد الوقود."], de: ["Schnelle Ölzirkulation bei sehr niedrigen Temperaturen verhindert Kaltstart-Schäden.", "Hoher Viskositätsindex gewährleistet stabile Schutzwirkung über einen breiten Temperaturbereich.", "Ultraniedriges Reibungsmerkmal verbessert die Kraftstoffwirtschaftlichkeit."], fr: ["La circulation rapide de l'huile à très basses températures prévient les dommages au démarrage à froid.", "L'indice de viscosité élevé assure une protection stable sur une large plage de températures.", "La caractéristique de friction ultra-faible améliore l'économie de carburant."] }, standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-1L":     { description: { tr: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", en: "HI-TECH SYNTHETIC 0W-30, a fully synthetic engine oil for passenger cars. Its API SL approved formula provides excellent fluidity in cold weather and robust protection at high temperatures, supporting optimal engine operation under all conditions.", ru: "HI-TECH SYNTHETIC 0W-30, полностью синтетическое моторное масло для легковых автомобилей. Одобренная API SL формула обеспечивает отличную текучесть в холодных условиях и надёжную защиту при высоких температурах, поддерживая эффективную работу двигателя в любых условиях.", fa: "HI-TECH SYNTHETIC 0W-30، یک روغن موتور تمام سنتتیک برای خودروهای سواری است. فرمول تأییدشده API SL، روانی عالی در هوای سرد و حفاظت قوی در دماهای بالا را فراهم می‌کند و عملکرد بهینه موتور را در تمام شرایط پشتیبانی می‌کند.", ar: "HI-TECH SYNTHETIC 0W-30، زيت محرك اصطناعي بالكامل للسيارات الركابية. تتيح صيغته معتمدة API SL انسيابية ممتازة في الطقس البارد وحماية قوية عند درجات الحرارة المرتفعة، مما يدعم تشغيل المحرك بكفاءة مثلى في جميع الظروف.", de: "HI-TECH SYNTHETIC 0W-30, ein vollsynthetisches Motoröl für Personenkraftwagen. Die nach API SL zugelassene Formel bietet hervorragende Fließfähigkeit in der Kälte und robusten Schutz bei hohen Temperaturen und unterstützt damit den optimalen Motorbetrieb unter allen Bedingungen.", fr: "HI-TECH SYNTHETIC 0W-30, une huile moteur entièrement synthétique pour voitures particulières. Sa formule approuvée API SL procure une fluidité excellente par temps froid et une protection robuste à haute température, favorisant un fonctionnement optimal du moteur en toutes circonstances." }, features: { tr: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], en: ["Stable performance across a wide temperature range: rapid cold-start, full protection in heat.", "Advanced formula with enhanced resistance to oxidation and thermal degradation.", "Keeps internal engine surfaces clean; prevents sludge and varnish formation."], ru: ["Стабильная работа в широком диапазоне температур: быстрый холодный пуск и полная защита при нагреве.", "Усовершенствованная формула с повышенной стойкостью к окислению и термическому разложению.", "Поддерживает чистоту внутренних поверхностей двигателя; предотвращает образование шлама и лака."], fa: ["عملکرد پایدار در محدوده دمایی گسترده: استارت سریع در سرما، حفاظت کامل در گرما.", "فرمول پیشرفته با مقاومت بهبودیافته در برابر اکسیداسیون و تخریب حرارتی.", "سطوح داخلی موتور را تمیز نگه می‌دارد؛ از تشکیل رسوب و لاک جلوگیری می‌کند."], ar: ["أداء مستقر عبر نطاق درجات حرارة واسع: بدء تشغيل سريع في البرد وحماية كاملة في الحرارة.", "صيغة متطورة ذات مقاومة محسّنة للأكسدة والتدهور الحراري.", "يحافظ على نظافة الأسطح الداخلية للمحرك ويمنع تكوّن الترسبات والورنيش."], de: ["Stabile Leistung über einen weiten Temperaturbereich: schneller Kaltstart und vollständiger Schutz bei Hitze.", "Fortschrittliche Formel mit verbesserter Beständigkeit gegen Oxidation und thermischen Abbau.", "Hält die internen Motoroberflächen sauber; verhindert Schlamm- und Lackablagerungen."], fr: ["Performance stable sur une large plage de températures : démarrage rapide par le froid, protection complète à chaud.", "Formule avancée avec une résistance accrue à l'oxydation et à la dégradation thermique.", "Maintient la propreté des surfaces internes du moteur ; prévient la formation de boues et de vernis."] }, standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-4L":     { description: { tr: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", en: "HI-TECH SYNTHETIC 0W-30, a fully synthetic engine oil for passenger cars. Its API SL approved formula provides excellent fluidity in cold weather and robust protection at high temperatures, supporting optimal engine operation under all conditions.", ru: "HI-TECH SYNTHETIC 0W-30, полностью синтетическое моторное масло для легковых автомобилей. Одобренная API SL формула обеспечивает отличную текучесть в холодных условиях и надёжную защиту при высоких температурах, поддерживая эффективную работу двигателя в любых условиях.", fa: "HI-TECH SYNTHETIC 0W-30، یک روغن موتور تمام سنتتیک برای خودروهای سواری است. فرمول تأییدشده API SL، روانی عالی در هوای سرد و حفاظت قوی در دماهای بالا را فراهم می‌کند و عملکرد بهینه موتور را در تمام شرایط پشتیبانی می‌کند.", ar: "HI-TECH SYNTHETIC 0W-30، زيت محرك اصطناعي بالكامل للسيارات الركابية. تتيح صيغته معتمدة API SL انسيابية ممتازة في الطقس البارد وحماية قوية عند درجات الحرارة المرتفعة، مما يدعم تشغيل المحرك بكفاءة مثلى في جميع الظروف.", de: "HI-TECH SYNTHETIC 0W-30, ein vollsynthetisches Motoröl für Personenkraftwagen. Die nach API SL zugelassene Formel bietet hervorragende Fließfähigkeit in der Kälte und robusten Schutz bei hohen Temperaturen und unterstützt damit den optimalen Motorbetrieb unter allen Bedingungen.", fr: "HI-TECH SYNTHETIC 0W-30, une huile moteur entièrement synthétique pour voitures particulières. Sa formule approuvée API SL procure une fluidité excellente par temps froid et une protection robuste à haute température, favorisant un fonctionnement optimal du moteur en toutes circonstances." }, features: { tr: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], en: ["Stable performance across a wide temperature range: rapid cold-start, full protection in heat.", "Advanced formula with enhanced resistance to oxidation and thermal degradation.", "Keeps internal engine surfaces clean; prevents sludge and varnish formation."], ru: ["Стабильная работа в широком диапазоне температур: быстрый холодный пуск и полная защита при нагреве.", "Усовершенствованная формула с повышенной стойкостью к окислению и термическому разложению.", "Поддерживает чистоту внутренних поверхностей двигателя; предотвращает образование шлама и лака."], fa: ["عملکرد پایدار در محدوده دمایی گسترده: استارت سریع در سرما، حفاظت کامل در گرما.", "فرمول پیشرفته با مقاومت بهبودیافته در برابر اکسیداسیون و تخریب حرارتی.", "سطوح داخلی موتور را تمیز نگه می‌دارد؛ از تشکیل رسوب و لاک جلوگیری می‌کند."], ar: ["أداء مستقر عبر نطاق درجات حرارة واسع: بدء تشغيل سريع في البرد وحماية كاملة في الحرارة.", "صيغة متطورة ذات مقاومة محسّنة للأكسدة والتدهور الحراري.", "يحافظ على نظافة الأسطح الداخلية للمحرك ويمنع تكوّن الترسبات والورنيش."], de: ["Stabile Leistung über einen weiten Temperaturbereich: schneller Kaltstart und vollständiger Schutz bei Hitze.", "Fortschrittliche Formel mit verbesserter Beständigkeit gegen Oxidation und thermischen Abbau.", "Hält die internen Motoroberflächen sauber; verhindert Schlamm- und Lackablagerungen."], fr: ["Performance stable sur une large plage de températures : démarrage rapide par le froid, protection complète à chaud.", "Formule avancée avec une résistance accrue à l'oxydation et à la dégradation thermique.", "Maintient la propreté des surfaces internes du moteur ; prévient la formation de boues et de vernis."] }, standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-5L":     { description: { tr: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", en: "HI-TECH SYNTHETIC 0W-30, a fully synthetic engine oil for passenger cars. Its API SL approved formula provides excellent fluidity in cold weather and robust protection at high temperatures, supporting optimal engine operation under all conditions.", ru: "HI-TECH SYNTHETIC 0W-30, полностью синтетическое моторное масло для легковых автомобилей. Одобренная API SL формула обеспечивает отличную текучесть в холодных условиях и надёжную защиту при высоких температурах, поддерживая эффективную работу двигателя в любых условиях.", fa: "HI-TECH SYNTHETIC 0W-30، یک روغن موتور تمام سنتتیک برای خودروهای سواری است. فرمول تأییدشده API SL، روانی عالی در هوای سرد و حفاظت قوی در دماهای بالا را فراهم می‌کند و عملکرد بهینه موتور را در تمام شرایط پشتیبانی می‌کند.", ar: "HI-TECH SYNTHETIC 0W-30، زيت محرك اصطناعي بالكامل للسيارات الركابية. تتيح صيغته معتمدة API SL انسيابية ممتازة في الطقس البارد وحماية قوية عند درجات الحرارة المرتفعة، مما يدعم تشغيل المحرك بكفاءة مثلى في جميع الظروف.", de: "HI-TECH SYNTHETIC 0W-30, ein vollsynthetisches Motoröl für Personenkraftwagen. Die nach API SL zugelassene Formel bietet hervorragende Fließfähigkeit in der Kälte und robusten Schutz bei hohen Temperaturen und unterstützt damit den optimalen Motorbetrieb unter allen Bedingungen.", fr: "HI-TECH SYNTHETIC 0W-30, une huile moteur entièrement synthétique pour voitures particulières. Sa formule approuvée API SL procure une fluidité excellente par temps froid et une protection robuste à haute température, favorisant un fonctionnement optimal du moteur en toutes circonstances." }, features: { tr: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], en: ["Stable performance across a wide temperature range: rapid cold-start, full protection in heat.", "Advanced formula with enhanced resistance to oxidation and thermal degradation.", "Keeps internal engine surfaces clean; prevents sludge and varnish formation."], ru: ["Стабильная работа в широком диапазоне температур: быстрый холодный пуск и полная защита при нагреве.", "Усовершенствованная формула с повышенной стойкостью к окислению и термическому разложению.", "Поддерживает чистоту внутренних поверхностей двигателя; предотвращает образование шлама и лака."], fa: ["عملکرد پایدار در محدوده دمایی گسترده: استارت سریع در سرما، حفاظت کامل در گرما.", "فرمول پیشرفته با مقاومت بهبودیافته در برابر اکسیداسیون و تخریب حرارتی.", "سطوح داخلی موتور را تمیز نگه می‌دارد؛ از تشکیل رسوب و لاک جلوگیری می‌کند."], ar: ["أداء مستقر عبر نطاق درجات حرارة واسع: بدء تشغيل سريع في البرد وحماية كاملة في الحرارة.", "صيغة متطورة ذات مقاومة محسّنة للأكسدة والتدهور الحراري.", "يحافظ على نظافة الأسطح الداخلية للمحرك ويمنع تكوّن الترسبات والورنيش."], de: ["Stabile Leistung über einen weiten Temperaturbereich: schneller Kaltstart und vollständiger Schutz bei Hitze.", "Fortschrittliche Formel mit verbesserter Beständigkeit gegen Oxidation und thermischen Abbau.", "Hält die internen Motoroberflächen sauber; verhindert Schlamm- und Lackablagerungen."], fr: ["Performance stable sur une large plage de températures : démarrage rapide par le froid, protection complète à chaud.", "Formule avancée avec une résistance accrue à l'oxydation et à la dégradation thermique.", "Maintient la propreté des surfaces internes du moteur ; prévient la formation de boues et de vernis."] }, standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-1L":     { description: { tr: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 5W-30, a fully synthetic engine oil for petrol and diesel passenger car engines. Its API SL/SJ and ACEA A5/B5 approved formula provides extended oil change intervals and superior engine protection.", ru: "HI-TECH SYNTHETIC 5W-30, полностью синтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SL/SJ и ACEA A5/B5, обеспечивает увеличенные интервалы замены масла и превосходную защиту двигателя.", fa: "HI-TECH SYNTHETIC 5W-30، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SL/SJ و ACEA A5/B5، فواصل تعویض روغن طولانی و حفاظت برتر از موتور را فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 5W-30، زيت محرك اصطناعي بالكامل لمحركات السيارات الركابية البنزينية والديزل. تُوفّر صيغته معتمدة API SL/SJ وAECA A5/B5 فترات تغيير زيت ممتدة وحماية فائقة للمحرك.", de: "HI-TECH SYNTHETIC 5W-30, ein vollsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SL/SJ und ACEA A5/B5 zugelassene Formel ermöglicht verlängerte Ölwechselintervalle und überlegenen Motorschutz.", fr: "HI-TECH SYNTHETIC 5W-30, une huile moteur entièrement synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SL/SJ et ACEA A5/B5 permet des intervalles de vidange prolongés et une protection moteur supérieure." }, features: { tr: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], en: ["Wide application range in petrol and diesel engines; full compatibility with a single product.", "Energy-saving viscosity profile that supports reduced fuel consumption.", "Advanced anti-wear additives extend engine life."], ru: ["Широкий спектр применения в бензиновых и дизельных двигателях; полная совместимость с одним продуктом.", "Энергосберегающий профиль вязкости, способствующий снижению расхода топлива.", "Усовершенствованные противоизносные присадки продлевают ресурс двигателя."], fa: ["محدوده کاربرد گسترده در موتورهای بنزینی و دیزلی؛ سازگاری کامل با یک محصول واحد.", "پروفایل ویسکوزیته صرفه‌جو در انرژی که از کاهش مصرف سوخت حمایت می‌کند.", "افزودنی‌های پیشرفته ضد سایش عمر موتور را افزایش می‌دهند."], ar: ["نطاق تطبيق واسع في المحركات البنزينية والديزل؛ توافق كامل مع منتج واحد.", "مؤشر لزوجة موفّر للطاقة يدعم تقليل استهلاك الوقود.", "مضافات متطورة مضادة للتآكل تُطيل عمر المحرك."], de: ["Breites Anwendungsspektrum in Benzin- und Dieselmotoren; vollständige Kompatibilität mit einem einzigen Produkt.", "Energiesparendes Viskositätsprofil, das einen geringeren Kraftstoffverbrauch unterstützt.", "Fortschrittliche Verschleißschutzadditive verlängern die Motorlebensdauer."], fr: ["Large gamme d'application pour moteurs essence et diesel ; compatibilité totale avec un seul produit.", "Profil de viscosité économe en énergie favorisant une consommation de carburant réduite.", "Des additifs anti-usure avancés prolongent la durée de vie du moteur."] }, standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-4L":     { description: { tr: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 5W-30, a fully synthetic engine oil for petrol and diesel passenger car engines. Its API SL/SJ and ACEA A5/B5 approved formula provides extended oil change intervals and superior engine protection.", ru: "HI-TECH SYNTHETIC 5W-30, полностью синтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SL/SJ и ACEA A5/B5, обеспечивает увеличенные интервалы замены масла и превосходную защиту двигателя.", fa: "HI-TECH SYNTHETIC 5W-30، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SL/SJ و ACEA A5/B5، فواصل تعویض روغن طولانی و حفاظت برتر از موتور را فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 5W-30، زيت محرك اصطناعي بالكامل لمحركات السيارات الركابية البنزينية والديزل. تُوفّر صيغته معتمدة API SL/SJ وAECA A5/B5 فترات تغيير زيت ممتدة وحماية فائقة للمحرك.", de: "HI-TECH SYNTHETIC 5W-30, ein vollsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SL/SJ und ACEA A5/B5 zugelassene Formel ermöglicht verlängerte Ölwechselintervalle und überlegenen Motorschutz.", fr: "HI-TECH SYNTHETIC 5W-30, une huile moteur entièrement synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SL/SJ et ACEA A5/B5 permet des intervalles de vidange prolongés et une protection moteur supérieure." }, features: { tr: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], en: ["Wide application range in petrol and diesel engines; full compatibility with a single product.", "Energy-saving viscosity profile that supports reduced fuel consumption.", "Advanced anti-wear additives extend engine life."], ru: ["Широкий спектр применения в бензиновых и дизельных двигателях; полная совместимость с одним продуктом.", "Энергосберегающий профиль вязкости, способствующий снижению расхода топлива.", "Усовершенствованные противоизносные присадки продлевают ресурс двигателя."], fa: ["محدوده کاربرد گسترده در موتورهای بنزینی و دیزلی؛ سازگاری کامل با یک محصول واحد.", "پروفایل ویسکوزیته صرفه‌جو در انرژی که از کاهش مصرف سوخت حمایت می‌کند.", "افزودنی‌های پیشرفته ضد سایش عمر موتور را افزایش می‌دهند."], ar: ["نطاق تطبيق واسع في المحركات البنزينية والديزل؛ توافق كامل مع منتج واحد.", "مؤشر لزوجة موفّر للطاقة يدعم تقليل استهلاك الوقود.", "مضافات متطورة مضادة للتآكل تُطيل عمر المحرك."], de: ["Breites Anwendungsspektrum in Benzin- und Dieselmotoren; vollständige Kompatibilität mit einem einzigen Produkt.", "Energiesparendes Viskositätsprofil, das einen geringeren Kraftstoffverbrauch unterstützt.", "Fortschrittliche Verschleißschutzadditive verlängern die Motorlebensdauer."], fr: ["Large gamme d'application pour moteurs essence et diesel ; compatibilité totale avec un seul produit.", "Profil de viscosité économe en énergie favorisant une consommation de carburant réduite.", "Des additifs anti-usure avancés prolongent la durée de vie du moteur."] }, standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-5L":     { description: { tr: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 5W-30, a fully synthetic engine oil for petrol and diesel passenger car engines. Its API SL/SJ and ACEA A5/B5 approved formula provides extended oil change intervals and superior engine protection.", ru: "HI-TECH SYNTHETIC 5W-30, полностью синтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SL/SJ и ACEA A5/B5, обеспечивает увеличенные интервалы замены масла и превосходную защиту двигателя.", fa: "HI-TECH SYNTHETIC 5W-30، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SL/SJ و ACEA A5/B5، فواصل تعویض روغن طولانی و حفاظت برتر از موتور را فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 5W-30، زيت محرك اصطناعي بالكامل لمحركات السيارات الركابية البنزينية والديزل. تُوفّر صيغته معتمدة API SL/SJ وAECA A5/B5 فترات تغيير زيت ممتدة وحماية فائقة للمحرك.", de: "HI-TECH SYNTHETIC 5W-30, ein vollsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SL/SJ und ACEA A5/B5 zugelassene Formel ermöglicht verlängerte Ölwechselintervalle und überlegenen Motorschutz.", fr: "HI-TECH SYNTHETIC 5W-30, une huile moteur entièrement synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SL/SJ et ACEA A5/B5 permet des intervalles de vidange prolongés et une protection moteur supérieure." }, features: { tr: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], en: ["Wide application range in petrol and diesel engines; full compatibility with a single product.", "Energy-saving viscosity profile that supports reduced fuel consumption.", "Advanced anti-wear additives extend engine life."], ru: ["Широкий спектр применения в бензиновых и дизельных двигателях; полная совместимость с одним продуктом.", "Энергосберегающий профиль вязкости, способствующий снижению расхода топлива.", "Усовершенствованные противоизносные присадки продлевают ресурс двигателя."], fa: ["محدوده کاربرد گسترده در موتورهای بنزینی و دیزلی؛ سازگاری کامل با یک محصول واحد.", "پروفایل ویسکوزیته صرفه‌جو در انرژی که از کاهش مصرف سوخت حمایت می‌کند.", "افزودنی‌های پیشرفته ضد سایش عمر موتور را افزایش می‌دهند."], ar: ["نطاق تطبيق واسع في المحركات البنزينية والديزل؛ توافق كامل مع منتج واحد.", "مؤشر لزوجة موفّر للطاقة يدعم تقليل استهلاك الوقود.", "مضافات متطورة مضادة للتآكل تُطيل عمر المحرك."], de: ["Breites Anwendungsspektrum in Benzin- und Dieselmotoren; vollständige Kompatibilität mit einem einzigen Produkt.", "Energiesparendes Viskositätsprofil, das einen geringeren Kraftstoffverbrauch unterstützt.", "Fortschrittliche Verschleißschutzadditive verlängern die Motorlebensdauer."], fr: ["Large gamme d'application pour moteurs essence et diesel ; compatibilité totale avec un seul produit.", "Profil de viscosité économe en énergie favorisant une consommation de carburant réduite.", "Des additifs anti-usure avancés prolongent la durée de vie du moteur."] }, standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-1L": { description: { tr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", en: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, a fully synthetic engine oil specially developed for modern diesel vehicles equipped with a diesel particulate filter (DPF). Its low-ash ACEA C2/C3 formula preserves DPF service life while keeping the engine running at full performance.", ru: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, полностью синтетическое моторное масло, специально разработанное для современных дизельных автомобилей с сажевым фильтром (DPF). Малозольная формула ACEA C2/C3 сохраняет ресурс DPF, обеспечивая полноценную работу двигателя.", fa: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، یک روغن موتور تمام سنتتیک است که به طور خاص برای خودروهای دیزلی مدرن مجهز به فیلتر ذرات دیزل (DPF) توسعه یافته است. فرمول کم خاکستر ACEA C2/C3 طول عمر DPF را حفظ می‌کند و در عین حال موتور را با عملکرد کامل نگه می‌دارد.", ar: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، زيت محرك اصطناعي بالكامل مطوَّر خصيصاً لسيارات الديزل الحديثة المزودة بفلتر الجسيمات الديزل (DPF). تحافظ صيغته منخفضة الرماد ACEA C2/C3 على عمر DPF مع تشغيل المحرك بكامل أدائه.", de: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, ein vollsynthetisches Motoröl, das speziell für moderne Dieselfahrzeuge mit Dieselpartikelfilter (DPF) entwickelt wurde. Die aschenarme ACEA C2/C3 Formel schützt die Lebensdauer des DPF, während der Motor volle Leistung erbringt.", fr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, une huile moteur entièrement synthétique spécialement développée pour les véhicules diesel modernes équipés d'un filtre à particules (FAP). Sa formule à faible teneur en cendres ACEA C2/C3 préserve la durée de vie du FAP tout en maintenant le moteur à pleine performance." }, features: { tr: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], en: ["Low SAPS formula protects the DPF and other after-treatment systems.", "ACEA C2/C3 approval meets Euro 5 and Euro 6 emission standards.", "Minimises oil consumption, significantly reducing the risk of filter clogging."], ru: ["Малозольная (Low SAPS) формула защищает DPF и другие системы нейтрализации отработавших газов.", "Одобрение ACEA C2/C3 соответствует стандартам выбросов Евро 5 и Евро 6.", "Минимизирует расход масла, значительно снижая риск засорения фильтра."], fa: ["فرمول Low SAPS از DPF و سایر سیستم‌های پس از تصفیه محافظت می‌کند.", "تأییدیه ACEA C2/C3 استانداردهای انتشار یورو 5 و یورو 6 را برآورده می‌کند.", "مصرف روغن را به حداقل می‌رساند و خطر گرفتگی فیلتر را به میزان قابل توجهی کاهش می‌دهد."], ar: ["صيغة Low SAPS تحمي DPF وسائر أنظمة معالجة العادم.", "اعتماد ACEA C2/C3 يستوفي معايير الانبعاثات يورو 5 ويورو 6.", "يُقلّل استهلاك الزيت إلى أدنى حد، مما يقلل بشكل ملحوظ من خطر انسداد الفلتر."], de: ["Low-SAPS-Formel schützt den DPF und andere Abgasnachbehandlungssysteme.", "ACEA C2/C3-Zulassung erfüllt die Emissionsstandards Euro 5 und Euro 6.", "Minimiert den Ölverbrauch und reduziert das Risiko einer Filterverstopfung erheblich."], fr: ["La formule Low SAPS protège le FAP et les autres systèmes de post-traitement.", "L'approbation ACEA C2/C3 satisfait aux normes d'émission Euro 5 et Euro 6.", "Minimise la consommation d'huile, réduisant considérablement le risque de colmatage du filtre."] }, standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-4L": { description: { tr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", en: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, a fully synthetic engine oil specially developed for modern diesel vehicles equipped with a diesel particulate filter (DPF). Its low-ash ACEA C2/C3 formula preserves DPF service life while keeping the engine running at full performance.", ru: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, полностью синтетическое моторное масло, специально разработанное для современных дизельных автомобилей с сажевым фильтром (DPF). Малозольная формула ACEA C2/C3 сохраняет ресурс DPF, обеспечивая полноценную работу двигателя.", fa: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، یک روغن موتور تمام سنتتیک است که به طور خاص برای خودروهای دیزلی مدرن مجهز به فیلتر ذرات دیزل (DPF) توسعه یافته است. فرمول کم خاکستر ACEA C2/C3 طول عمر DPF را حفظ می‌کند و در عین حال موتور را با عملکرد کامل نگه می‌دارد.", ar: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، زيت محرك اصطناعي بالكامل مطوَّر خصيصاً لسيارات الديزل الحديثة المزودة بفلتر الجسيمات الديزل (DPF). تحافظ صيغته منخفضة الرماد ACEA C2/C3 على عمر DPF مع تشغيل المحرك بكامل أدائه.", de: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, ein vollsynthetisches Motoröl, das speziell für moderne Dieselfahrzeuge mit Dieselpartikelfilter (DPF) entwickelt wurde. Die aschenarme ACEA C2/C3 Formel schützt die Lebensdauer des DPF, während der Motor volle Leistung erbringt.", fr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, une huile moteur entièrement synthétique spécialement développée pour les véhicules diesel modernes équipés d'un filtre à particules (FAP). Sa formule à faible teneur en cendres ACEA C2/C3 préserve la durée de vie du FAP tout en maintenant le moteur à pleine performance." }, features: { tr: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], en: ["Low SAPS formula protects the DPF and other after-treatment systems.", "ACEA C2/C3 approval meets Euro 5 and Euro 6 emission standards.", "Minimises oil consumption, significantly reducing the risk of filter clogging."], ru: ["Малозольная (Low SAPS) формула защищает DPF и другие системы нейтрализации отработавших газов.", "Одобрение ACEA C2/C3 соответствует стандартам выбросов Евро 5 и Евро 6.", "Минимизирует расход масла, значительно снижая риск засорения фильтра."], fa: ["فرمول Low SAPS از DPF و سایر سیستم‌های پس از تصفیه محافظت می‌کند.", "تأییدیه ACEA C2/C3 استانداردهای انتشار یورو 5 و یورو 6 را برآورده می‌کند.", "مصرف روغن را به حداقل می‌رساند و خطر گرفتگی فیلتر را به میزان قابل توجهی کاهش می‌دهد."], ar: ["صيغة Low SAPS تحمي DPF وسائر أنظمة معالجة العادم.", "اعتماد ACEA C2/C3 يستوفي معايير الانبعاثات يورو 5 ويورو 6.", "يُقلّل استهلاك الزيت إلى أدنى حد، مما يقلل بشكل ملحوظ من خطر انسداد الفلتر."], de: ["Low-SAPS-Formel schützt den DPF und andere Abgasnachbehandlungssysteme.", "ACEA C2/C3-Zulassung erfüllt die Emissionsstandards Euro 5 und Euro 6.", "Minimiert den Ölverbrauch und reduziert das Risiko einer Filterverstopfung erheblich."], fr: ["La formule Low SAPS protège le FAP et les autres systèmes de post-traitement.", "L'approbation ACEA C2/C3 satisfait aux normes d'émission Euro 5 et Euro 6.", "Minimise la consommation d'huile, réduisant considérablement le risque de colmatage du filtre."] }, standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-5L": { description: { tr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", en: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, a fully synthetic engine oil specially developed for modern diesel vehicles equipped with a diesel particulate filter (DPF). Its low-ash ACEA C2/C3 formula preserves DPF service life while keeping the engine running at full performance.", ru: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, полностью синтетическое моторное масло, специально разработанное для современных дизельных автомобилей с сажевым фильтром (DPF). Малозольная формула ACEA C2/C3 сохраняет ресурс DPF, обеспечивая полноценную работу двигателя.", fa: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، یک روغن موتور تمام سنتتیک است که به طور خاص برای خودروهای دیزلی مدرن مجهز به فیلتر ذرات دیزل (DPF) توسعه یافته است. فرمول کم خاکستر ACEA C2/C3 طول عمر DPF را حفظ می‌کند و در عین حال موتور را با عملکرد کامل نگه می‌دارد.", ar: "HI-TECH FULLY SYNTHETIC 5W-30 DPF، زيت محرك اصطناعي بالكامل مطوَّر خصيصاً لسيارات الديزل الحديثة المزودة بفلتر الجسيمات الديزل (DPF). تحافظ صيغته منخفضة الرماد ACEA C2/C3 على عمر DPF مع تشغيل المحرك بكامل أدائه.", de: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, ein vollsynthetisches Motoröl, das speziell für moderne Dieselfahrzeuge mit Dieselpartikelfilter (DPF) entwickelt wurde. Die aschenarme ACEA C2/C3 Formel schützt die Lebensdauer des DPF, während der Motor volle Leistung erbringt.", fr: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, une huile moteur entièrement synthétique spécialement développée pour les véhicules diesel modernes équipés d'un filtre à particules (FAP). Sa formule à faible teneur en cendres ACEA C2/C3 préserve la durée de vie du FAP tout en maintenant le moteur à pleine performance." }, features: { tr: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], en: ["Low SAPS formula protects the DPF and other after-treatment systems.", "ACEA C2/C3 approval meets Euro 5 and Euro 6 emission standards.", "Minimises oil consumption, significantly reducing the risk of filter clogging."], ru: ["Малозольная (Low SAPS) формула защищает DPF и другие системы нейтрализации отработавших газов.", "Одобрение ACEA C2/C3 соответствует стандартам выбросов Евро 5 и Евро 6.", "Минимизирует расход масла, значительно снижая риск засорения фильтра."], fa: ["فرمول Low SAPS از DPF و سایر سیستم‌های پس از تصفیه محافظت می‌کند.", "تأییدیه ACEA C2/C3 استانداردهای انتشار یورو 5 و یورو 6 را برآورده می‌کند.", "مصرف روغن را به حداقل می‌رساند و خطر گرفتگی فیلتر را به میزان قابل توجهی کاهش می‌دهد."], ar: ["صيغة Low SAPS تحمي DPF وسائر أنظمة معالجة العادم.", "اعتماد ACEA C2/C3 يستوفي معايير الانبعاثات يورو 5 ويورو 6.", "يُقلّل استهلاك الزيت إلى أدنى حد، مما يقلل بشكل ملحوظ من خطر انسداد الفلتر."], de: ["Low-SAPS-Formel schützt den DPF und andere Abgasnachbehandlungssysteme.", "ACEA C2/C3-Zulassung erfüllt die Emissionsstandards Euro 5 und Euro 6.", "Minimiert den Ölverbrauch und reduziert das Risiko einer Filterverstopfung erheblich."], fr: ["La formule Low SAPS protège le FAP et les autres systèmes de post-traitement.", "L'approbation ACEA C2/C3 satisfait aux normes d'émission Euro 5 et Euro 6.", "Minimise la consommation d'huile, réduisant considérablement le risque de colmatage du filtre."] }, standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-40-1L":     { description: { tr: "HI-TECH SYNTHETIC 5W-40, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SN ve ACEA A3/C3 onaylı yüksek performanslı formülü, ağır şehir içi trafik koşullarında ve uzun yol sürüşlerinde üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 5W-40, a fully synthetic engine oil for petrol and diesel passenger car engines. Its high-performance API SN and ACEA A3/C3 approved formula provides superior engine protection in heavy urban traffic conditions and long-distance driving.", ru: "HI-TECH SYNTHETIC 5W-40, полностью синтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Высокоэффективная формула, одобренная API SN и ACEA A3/C3, обеспечивает превосходную защиту двигателя в тяжёлых городских условиях и при дальних поездках.", fa: "HI-TECH SYNTHETIC 5W-40، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول با عملکرد بالا تأییدشده API SN و ACEA A3/C3 در شرایط سنگین ترافیک شهری و رانندگی طولانی، حفاظت برتری از موتور ارائه می‌دهد.", ar: "HI-TECH SYNTHETIC 5W-40، زيت محرك اصطناعي بالكامل لمحركات السيارات الركابية البنزينية والديزل. تُوفّر صيغته عالية الأداء معتمدة API SN وAECA A3/C3 حماية فائقة للمحرك في ظروف حركة المرور الحضرية الكثيفة ورحلات الطرق الطويلة.", de: "HI-TECH SYNTHETIC 5W-40, ein vollsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die hochleistungsfähige, nach API SN und ACEA A3/C3 zugelassene Formel bietet überlegenen Motorschutz im schweren Stadtverkehr und bei Langstreckenfahrten.", fr: "HI-TECH SYNTHETIC 5W-40, une huile moteur entièrement synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule haute performance approuvée API SN et ACEA A3/C3 offre une protection moteur supérieure dans les conditions de trafic urbain intense et lors des trajets longue distance." }, features: { tr: ["Yüksek viskozite indeksi ile -35°C soğuktan +150°C sıcağa kadar kararlı yağ filmi sağlar.", "Sporcu sürüş tarzında ve yüksek motor yüklerinde mükemmel koruma sunar.", "Turbo ve doğal emişli motorlarda eşit etkinlikle çalışır."], en: ["High viscosity index maintains a stable oil film from -35°C cold to +150°C heat.", "Delivers excellent protection under sporty driving styles and high engine loads.", "Works with equal effectiveness in turbocharged and naturally aspirated engines."], ru: ["Высокий индекс вязкости обеспечивает стабильную масляную плёнку от -35°C до +150°C.", "Обеспечивает отличную защиту при спортивном стиле вождения и высоких нагрузках на двигатель.", "Одинаково эффективно работает в турбированных и атмосферных двигателях."], fa: ["اندیس ویسکوزیته بالا، فیلم روغن پایدار را از سرمای ۳۵- درجه تا گرمای ۱۵۰+ درجه سانتیگراد حفظ می‌کند.", "در سبک رانندگی ورزشی و بارهای بالای موتور، حفاظت عالی ارائه می‌دهد.", "در موتورهای توربو و تنفس طبیعی با اثربخشی یکسان کار می‌کند."], ar: ["مؤشر لزوجة عالٍ يحافظ على غشاء زيت مستقر من برودة -35°C إلى حرارة +150°C.", "يوفر حماية ممتازة في أسلوب القيادة الرياضي وتحت أحمال المحرك العالية.", "يعمل بكفاءة متساوية في المحركات التوربينية والمحركات ذات السحب الطبيعي."], de: ["Hoher Viskositätsindex gewährleistet einen stabilen Ölfilm von -35°C Kälte bis +150°C Hitze.", "Bietet hervorragenden Schutz bei sportlichem Fahrstil und hohen Motorlasten.", "Arbeitet gleichermaßen effektiv in Turbo- und Saugmotoren."], fr: ["L'indice de viscosité élevé maintient un film d'huile stable de -35°C de froid à +150°C de chaleur.", "Assure une protection excellente en conduite sportive et sous des charges moteur élevées.", "Fonctionne avec une efficacité égale sur les moteurs turbocompressés et à aspiration naturelle."] }, standards: "API SN, ACEA A3/B4/C3, VW 502.00/505.00", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-5W-40-4L":     { description: { tr: "HI-TECH SYNTHETIC 5W-40, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SN ve ACEA A3/C3 onaylı yüksek performanslı formülü, ağır şehir içi trafik koşullarında ve uzun yol sürüşlerinde üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 5W-40, a fully synthetic engine oil for petrol and diesel passenger car engines. Its high-performance API SN and ACEA A3/C3 approved formula provides superior engine protection in heavy urban traffic conditions and long-distance driving.", ru: "HI-TECH SYNTHETIC 5W-40, полностью синтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Высокоэффективная формула, одобренная API SN и ACEA A3/C3, обеспечивает превосходную защиту двигателя в тяжёлых городских условиях и при дальних поездках.", fa: "HI-TECH SYNTHETIC 5W-40، یک روغن موتور تمام سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول با عملکرد بالا تأییدشده API SN و ACEA A3/C3 در شرایط سنگین ترافیک شهری و رانندگی طولانی، حفاظت برتری از موتور ارائه می‌دهد.", ar: "HI-TECH SYNTHETIC 5W-40، زيت محرك اصطناعي بالكامل لمحركات السيارات الركابية البنزينية والديزل. تُوفّر صيغته عالية الأداء معتمدة API SN وAECA A3/C3 حماية فائقة للمحرك في ظروف حركة المرور الحضرية الكثيفة ورحلات الطرق الطويلة.", de: "HI-TECH SYNTHETIC 5W-40, ein vollsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die hochleistungsfähige, nach API SN und ACEA A3/C3 zugelassene Formel bietet überlegenen Motorschutz im schweren Stadtverkehr und bei Langstreckenfahrten.", fr: "HI-TECH SYNTHETIC 5W-40, une huile moteur entièrement synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule haute performance approuvée API SN et ACEA A3/C3 offre une protection moteur supérieure dans les conditions de trafic urbain intense et lors des trajets longue distance." }, features: { tr: ["Yüksek viskozite indeksi ile -35°C soğuktan +150°C sıcağa kadar kararlı yağ filmi sağlar.", "Sporcu sürüş tarzında ve yüksek motor yüklerinde mükemmel koruma sunar.", "Turbo ve doğal emişli motorlarda eşit etkinlikle çalışır."], en: ["High viscosity index maintains a stable oil film from -35°C cold to +150°C heat.", "Delivers excellent protection under sporty driving styles and high engine loads.", "Works with equal effectiveness in turbocharged and naturally aspirated engines."], ru: ["Высокий индекс вязкости обеспечивает стабильную масляную плёнку от -35°C до +150°C.", "Обеспечивает отличную защиту при спортивном стиле вождения и высоких нагрузках на двигатель.", "Одинаково эффективно работает в турбированных и атмосферных двигателях."], fa: ["اندیس ویسکوزیته بالا، فیلم روغن پایدار را از سرمای ۳۵- درجه تا گرمای ۱۵۰+ درجه سانتیگراد حفظ می‌کند.", "در سبک رانندگی ورزشی و بارهای بالای موتور، حفاظت عالی ارائه می‌دهد.", "در موتورهای توربو و تنفس طبیعی با اثربخشی یکسان کار می‌کند."], ar: ["مؤشر لزوجة عالٍ يحافظ على غشاء زيت مستقر من برودة -35°C إلى حرارة +150°C.", "يوفر حماية ممتازة في أسلوب القيادة الرياضي وتحت أحمال المحرك العالية.", "يعمل بكفاءة متساوية في المحركات التوربينية والمحركات ذات السحب الطبيعي."], de: ["Hoher Viskositätsindex gewährleistet einen stabilen Ölfilm von -35°C Kälte bis +150°C Hitze.", "Bietet hervorragenden Schutz bei sportlichem Fahrstil und hohen Motorlasten.", "Arbeitet gleichermaßen effektiv in Turbo- und Saugmotoren."], fr: ["L'indice de viscosité élevé maintient un film d'huile stable de -35°C de froid à +150°C de chaleur.", "Assure une protection excellente en conduite sportive et sous des charges moteur élevées.", "Fonctionne avec une efficacité égale sur les moteurs turbocompressés et à aspiration naturelle."] }, standards: "API SN, ACEA A3/B4/C3, VW 502.00/505.00", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-10W-40-1L":    { description: { tr: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", en: "HI-TECH SYNTHETIC 10W-40, a semi-synthetic engine oil for petrol and diesel passenger car engines. Its API SN and ACEA A3/B3 approved formula is the ideal solution for those seeking high engine protection at an economical cost.", ru: "HI-TECH SYNTHETIC 10W-40, полусинтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SN и ACEA A3/B3, — идеальное решение для тех, кто ищет высокий уровень защиты двигателя по разумной цене.", fa: "HI-TECH SYNTHETIC 10W-40، یک روغن موتور نیمه سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SN و ACEA A3/B3 با قیمت اقتصادی، راه‌حل ایده‌آل برای کسانی است که به دنبال حفاظت بالای موتور هستند.", ar: "HI-TECH SYNTHETIC 10W-40، زيت محرك شبه اصطناعي لمحركات السيارات الركابية البنزينية والديزل. تُعدّ صيغته معتمدة API SN وAECA A3/B3 الحلَّ الأمثل لمن يبحث عن حماية عالية للمحرك بتكلفة اقتصادية.", de: "HI-TECH SYNTHETIC 10W-40, ein halbsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SN und ACEA A3/B3 zugelassene Formel ist die ideale Lösung für alle, die hohen Motorschutz zu wirtschaftlichen Kosten suchen.", fr: "HI-TECH SYNTHETIC 10W-40, une huile moteur semi-synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SN et ACEA A3/B3 est la solution idéale pour ceux qui recherchent une protection moteur élevée à un coût économique." }, features: { tr: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], en: ["Semi-synthetic formula delivers near-full-synthetic protection at a more economical cost.", "Reliable use in both old and new generation petrol and diesel engines.", "Stable viscosity at high temperatures prevents engine wear."], ru: ["Полусинтетическая формула обеспечивает защиту, близкую к полностью синтетической, по более низкой цене.", "Надёжное применение в бензиновых и дизельных двигателях старого и нового поколений.", "Стабильная вязкость при высоких температурах предотвращает износ двигателя."], fa: ["فرمول نیمه سنتتیک با هزینه‌ای اقتصادی‌تر، حفاظتی نزدیک به تمام سنتتیک ارائه می‌دهد.", "استفاده قابل اعتماد در موتورهای بنزینی و دیزلی نسل قدیم و جدید.", "ویسکوزیته پایدار در دماهای بالا از فرسودگی موتور جلوگیری می‌کند."], ar: ["الصيغة شبه الاصطناعية توفر حماية تقترب من الاصطناعية الكاملة بتكلفة أكثر اقتصادية.", "استخدام موثوق في محركات البنزين والديزل من الجيل القديم والجديد.", "اللزوجة المستقرة عند درجات الحرارة المرتفعة تمنع تآكل المحرك."], de: ["Halbsynthetische Formel bietet nahezu vollsynthetischen Schutz zu wirtschaftlicheren Kosten.", "Zuverlässiger Einsatz in Benzin- und Dieselmotoren der alten und neuen Generation.", "Stabile Viskosität bei hohen Temperaturen verhindert Motorverschleiß."], fr: ["La formule semi-synthétique offre une protection proche du tout synthétique à un coût plus économique.", "Utilisation fiable dans les moteurs essence et diesel des ancienne et nouvelle générations.", "La viscosité stable à haute température prévient l'usure du moteur."] }, standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-40-4L":    { description: { tr: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", en: "HI-TECH SYNTHETIC 10W-40, a semi-synthetic engine oil for petrol and diesel passenger car engines. Its API SN and ACEA A3/B3 approved formula is the ideal solution for those seeking high engine protection at an economical cost.", ru: "HI-TECH SYNTHETIC 10W-40, полусинтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SN и ACEA A3/B3, — идеальное решение для тех, кто ищет высокий уровень защиты двигателя по разумной цене.", fa: "HI-TECH SYNTHETIC 10W-40، یک روغن موتور نیمه سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SN و ACEA A3/B3 با قیمت اقتصادی، راه‌حل ایده‌آل برای کسانی است که به دنبال حفاظت بالای موتور هستند.", ar: "HI-TECH SYNTHETIC 10W-40، زيت محرك شبه اصطناعي لمحركات السيارات الركابية البنزينية والديزل. تُعدّ صيغته معتمدة API SN وAECA A3/B3 الحلَّ الأمثل لمن يبحث عن حماية عالية للمحرك بتكلفة اقتصادية.", de: "HI-TECH SYNTHETIC 10W-40, ein halbsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SN und ACEA A3/B3 zugelassene Formel ist die ideale Lösung für alle, die hohen Motorschutz zu wirtschaftlichen Kosten suchen.", fr: "HI-TECH SYNTHETIC 10W-40, une huile moteur semi-synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SN et ACEA A3/B3 est la solution idéale pour ceux qui recherchent une protection moteur élevée à un coût économique." }, features: { tr: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], en: ["Semi-synthetic formula delivers near-full-synthetic protection at a more economical cost.", "Reliable use in both old and new generation petrol and diesel engines.", "Stable viscosity at high temperatures prevents engine wear."], ru: ["Полусинтетическая формула обеспечивает защиту, близкую к полностью синтетической, по более низкой цене.", "Надёжное применение в бензиновых и дизельных двигателях старого и нового поколений.", "Стабильная вязкость при высоких температурах предотвращает износ двигателя."], fa: ["فرمول نیمه سنتتیک با هزینه‌ای اقتصادی‌تر، حفاظتی نزدیک به تمام سنتتیک ارائه می‌دهد.", "استفاده قابل اعتماد در موتورهای بنزینی و دیزلی نسل قدیم و جدید.", "ویسکوزیته پایدار در دماهای بالا از فرسودگی موتور جلوگیری می‌کند."], ar: ["الصيغة شبه الاصطناعية توفر حماية تقترب من الاصطناعية الكاملة بتكلفة أكثر اقتصادية.", "استخدام موثوق في محركات البنزين والديزل من الجيل القديم والجديد.", "اللزوجة المستقرة عند درجات الحرارة المرتفعة تمنع تآكل المحرك."], de: ["Halbsynthetische Formel bietet nahezu vollsynthetischen Schutz zu wirtschaftlicheren Kosten.", "Zuverlässiger Einsatz in Benzin- und Dieselmotoren der alten und neuen Generation.", "Stabile Viskosität bei hohen Temperaturen verhindert Motorverschleiß."], fr: ["La formule semi-synthétique offre une protection proche du tout synthétique à un coût plus économique.", "Utilisation fiable dans les moteurs essence et diesel des ancienne et nouvelle générations.", "La viscosité stable à haute température prévient l'usure du moteur."] }, standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-40-5L":    { description: { tr: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", en: "HI-TECH SYNTHETIC 10W-40, a semi-synthetic engine oil for petrol and diesel passenger car engines. Its API SN and ACEA A3/B3 approved formula is the ideal solution for those seeking high engine protection at an economical cost.", ru: "HI-TECH SYNTHETIC 10W-40, полусинтетическое моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Формула, одобренная API SN и ACEA A3/B3, — идеальное решение для тех, кто ищет высокий уровень защиты двигателя по разумной цене.", fa: "HI-TECH SYNTHETIC 10W-40، یک روغن موتور نیمه سنتتیک برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول تأییدشده API SN و ACEA A3/B3 با قیمت اقتصادی، راه‌حل ایده‌آل برای کسانی است که به دنبال حفاظت بالای موتور هستند.", ar: "HI-TECH SYNTHETIC 10W-40، زيت محرك شبه اصطناعي لمحركات السيارات الركابية البنزينية والديزل. تُعدّ صيغته معتمدة API SN وAECA A3/B3 الحلَّ الأمثل لمن يبحث عن حماية عالية للمحرك بتكلفة اقتصادية.", de: "HI-TECH SYNTHETIC 10W-40, ein halbsynthetisches Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die nach API SN und ACEA A3/B3 zugelassene Formel ist die ideale Lösung für alle, die hohen Motorschutz zu wirtschaftlichen Kosten suchen.", fr: "HI-TECH SYNTHETIC 10W-40, une huile moteur semi-synthétique pour moteurs à essence et diesel de voitures particulières. Sa formule approuvée API SN et ACEA A3/B3 est la solution idéale pour ceux qui recherchent une protection moteur élevée à un coût économique." }, features: { tr: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], en: ["Semi-synthetic formula delivers near-full-synthetic protection at a more economical cost.", "Reliable use in both old and new generation petrol and diesel engines.", "Stable viscosity at high temperatures prevents engine wear."], ru: ["Полусинтетическая формула обеспечивает защиту, близкую к полностью синтетической, по более низкой цене.", "Надёжное применение в бензиновых и дизельных двигателях старого и нового поколений.", "Стабильная вязкость при высоких температурах предотвращает износ двигателя."], fa: ["فرمول نیمه سنتتیک با هزینه‌ای اقتصادی‌تر، حفاظتی نزدیک به تمام سنتتیک ارائه می‌دهد.", "استفاده قابل اعتماد در موتورهای بنزینی و دیزلی نسل قدیم و جدید.", "ویسکوزیته پایدار در دماهای بالا از فرسودگی موتور جلوگیری می‌کند."], ar: ["الصيغة شبه الاصطناعية توفر حماية تقترب من الاصطناعية الكاملة بتكلفة أكثر اقتصادية.", "استخدام موثوق في محركات البنزين والديزل من الجيل القديم والجديد.", "اللزوجة المستقرة عند درجات الحرارة المرتفعة تمنع تآكل المحرك."], de: ["Halbsynthetische Formel bietet nahezu vollsynthetischen Schutz zu wirtschaftlicheren Kosten.", "Zuverlässiger Einsatz in Benzin- und Dieselmotoren der alten und neuen Generation.", "Stabile Viskosität bei hohen Temperaturen verhindert Motorverschleiß."], fr: ["La formule semi-synthétique offre une protection proche du tout synthétique à un coût plus économique.", "Utilisation fiable dans les moteurs essence et diesel des ancienne et nouvelle générations.", "La viscosité stable à haute température prévient l'usure du moteur."] }, standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-60-1L":    { description: { tr: "HI-TECH SYNTHETIC 10W-60, yüksek performanslı spor ve yarış araçları için geliştirilmiş premium tam sentetik motor yağıdır. API SN/CF ve ACEA C3 onaylı formülü, ekstrem yüklerde ve yüksek devirlerde üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 10W-60, a premium fully synthetic engine oil developed for high-performance sports and racing vehicles. Its API SN/CF and ACEA C3 approved formula provides superior engine protection under extreme loads and high engine speeds.", ru: "HI-TECH SYNTHETIC 10W-60, премиальное полностью синтетическое моторное масло, разработанное для высокопроизводительных спортивных и гоночных автомобилей. Формула, одобренная API SN/CF и ACEA C3, обеспечивает превосходную защиту двигателя при экстремальных нагрузках и высоких оборотах.", fa: "HI-TECH SYNTHETIC 10W-60، یک روغن موتور تمام سنتتیک برتر است که برای خودروهای اسپرت و مسابقه‌ای با عملکرد بالا توسعه یافته است. فرمول تأییدشده API SN/CF و ACEA C3 در بارهای شدید و دورهای بالای موتور، حفاظت برتری ارائه می‌دهد.", ar: "HI-TECH SYNTHETIC 10W-60، زيت محرك اصطناعي بالكامل فائق الجودة مطوَّر للسيارات الرياضية وسيارات السباق عالية الأداء. تُوفّر صيغته معتمدة API SN/CF وAECA C3 حماية فائقة للمحرك في ظل الأحمال القصوى والسرعات العالية.", de: "HI-TECH SYNTHETIC 10W-60, ein Premium-Vollsynthetikmotoröl, das für Hochleistungssport- und Rennfahrzeuge entwickelt wurde. Die nach API SN/CF und ACEA C3 zugelassene Formel bietet überlegenen Motorschutz bei extremen Belastungen und hohen Drehzahlen.", fr: "HI-TECH SYNTHETIC 10W-60, une huile moteur entièrement synthétique haut de gamme développée pour les véhicules sportifs et de course haute performance. Sa formule approuvée API SN/CF et ACEA C3 offre une protection moteur supérieure sous des charges extrêmes et à des régimes élevés." }, features: { tr: ["Yüksek devirli spor ve yarış motorlarının aşırı ısı ve basıncına karşı maksimum koruma.", "Supercharged ve turbocharged motorlarda yağ filminin bütünlüğünü korur.", "BMW M serisi ve yüksek performanslı araçlar için özellikle uygundur."], en: ["Maximum protection against excessive heat and pressure in high-revving sport and racing engines.", "Maintains the integrity of the oil film in supercharged and turbocharged engines.", "Particularly suited for the BMW M series and high-performance vehicles."], ru: ["Максимальная защита от чрезмерного тепла и давления в высокооборотистых спортивных и гоночных двигателях.", "Поддерживает целостность масляной плёнки в двигателях с механическим нагнетателем и турбонаддувом.", "Особенно подходит для BMW серии M и высокопроизводительных автомобилей."], fa: ["حداکثر محافظت در برابر گرمای بیش از حد و فشار در موتورهای اسپرت و مسابقه‌ای با دور بالا.", "یکپارچگی فیلم روغن را در موتورهای سوپرچارجر و توربوچارجر حفظ می‌کند.", "به ویژه برای سری BMW M و خودروهای با عملکرد بالا مناسب است."], ar: ["حماية قصوى ضد الحرارة المفرطة والضغط في محركات السيارات الرياضية وسيارات السباق عالية الدوران.", "يحافظ على سلامة غشاء الزيت في المحركات ذات الشاحن الفائق والتوربيني.", "مناسب بشكل خاص لسلسلة BMW M والسيارات عالية الأداء."], de: ["Maximaler Schutz gegen übermäßige Hitze und Druck in hochdrehenden Sport- und Rennmotoren.", "Erhält die Integrität des Ölfilms in aufgeladenen und turbogekuppelten Motoren.", "Besonders geeignet für die BMW M-Serie und Hochleistungsfahrzeuge."], fr: ["Protection maximale contre la chaleur et la pression excessives dans les moteurs sport et course à haut régime.", "Maintient l'intégrité du film d'huile dans les moteurs suralimentés et turbocompressés.", "Particulièrement adapté à la gamme BMW M et aux véhicules haute performance."] }, standards: "API SN/CF, ACEA C3, BMW M", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-10W-60-4L":    { description: { tr: "HI-TECH SYNTHETIC 10W-60, yüksek performanslı spor ve yarış araçları için geliştirilmiş premium tam sentetik motor yağıdır. API SN/CF ve ACEA C3 onaylı formülü, ekstrem yüklerde ve yüksek devirlerde üstün motor koruması sağlar.", en: "HI-TECH SYNTHETIC 10W-60, a premium fully synthetic engine oil developed for high-performance sports and racing vehicles. Its API SN/CF and ACEA C3 approved formula provides superior engine protection under extreme loads and high engine speeds.", ru: "HI-TECH SYNTHETIC 10W-60, премиальное полностью синтетическое моторное масло, разработанное для высокопроизводительных спортивных и гоночных автомобилей. Формула, одобренная API SN/CF и ACEA C3, обеспечивает превосходную защиту двигателя при экстремальных нагрузках и высоких оборотах.", fa: "HI-TECH SYNTHETIC 10W-60، یک روغن موتور تمام سنتتیک برتر است که برای خودروهای اسپرت و مسابقه‌ای با عملکرد بالا توسعه یافته است. فرمول تأییدشده API SN/CF و ACEA C3 در بارهای شدید و دورهای بالای موتور، حفاظت برتری ارائه می‌دهد.", ar: "HI-TECH SYNTHETIC 10W-60، زيت محرك اصطناعي بالكامل فائق الجودة مطوَّر للسيارات الرياضية وسيارات السباق عالية الأداء. تُوفّر صيغته معتمدة API SN/CF وAECA C3 حماية فائقة للمحرك في ظل الأحمال القصوى والسرعات العالية.", de: "HI-TECH SYNTHETIC 10W-60, ein Premium-Vollsynthetikmotoröl, das für Hochleistungssport- und Rennfahrzeuge entwickelt wurde. Die nach API SN/CF und ACEA C3 zugelassene Formel bietet überlegenen Motorschutz bei extremen Belastungen und hohen Drehzahlen.", fr: "HI-TECH SYNTHETIC 10W-60, une huile moteur entièrement synthétique haut de gamme développée pour les véhicules sportifs et de course haute performance. Sa formule approuvée API SN/CF et ACEA C3 offre une protection moteur supérieure sous des charges extrêmes et à des régimes élevés." }, features: { tr: ["Yüksek devirli spor ve yarış motorlarının aşırı ısı ve basıncına karşı maksimum koruma.", "Supercharged ve turbocharged motorlarda yağ filminin bütünlüğünü korur.", "BMW M serisi ve yüksek performanslı araçlar için özellikle uygundur."], en: ["Maximum protection against excessive heat and pressure in high-revving sport and racing engines.", "Maintains the integrity of the oil film in supercharged and turbocharged engines.", "Particularly suited for the BMW M series and high-performance vehicles."], ru: ["Максимальная защита от чрезмерного тепла и давления в высокооборотистых спортивных и гоночных двигателях.", "Поддерживает целостность масляной плёнки в двигателях с механическим нагнетателем и турбонаддувом.", "Особенно подходит для BMW серии M и высокопроизводительных автомобилей."], fa: ["حداکثر محافظت در برابر گرمای بیش از حد و فشار در موتورهای اسپرت و مسابقه‌ای با دور بالا.", "یکپارچگی فیلم روغن را در موتورهای سوپرچارجر و توربوچارجر حفظ می‌کند.", "به ویژه برای سری BMW M و خودروهای با عملکرد بالا مناسب است."], ar: ["حماية قصوى ضد الحرارة المفرطة والضغط في محركات السيارات الرياضية وسيارات السباق عالية الدوران.", "يحافظ على سلامة غشاء الزيت في المحركات ذات الشاحن الفائق والتوربيني.", "مناسب بشكل خاص لسلسلة BMW M والسيارات عالية الأداء."], de: ["Maximaler Schutz gegen übermäßige Hitze und Druck in hochdrehenden Sport- und Rennmotoren.", "Erhält die Integrität des Ölfilms in aufgeladenen und turbogekuppelten Motoren.", "Besonders geeignet für die BMW M-Serie und Hochleistungsfahrzeuge."], fr: ["Protection maximale contre la chaleur et la pression excessives dans les moteurs sport et course à haut régime.", "Maintient l'intégrité du film d'huile dans les moteurs suralimentés et turbocompressés.", "Particulièrement adapté à la gamme BMW M et aux véhicules haute performance."] }, standards: "API SN/CF, ACEA C3, BMW M", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-15W-40-1L":    { description: { tr: "HI-TECH MOTOR OIL 15W-40, benzinli ve dizel binek araç motorları için mineral bazlı motor yağıdır. API SN/CO onaylı ekonomik formülü, normal sürüş koşullarında güvenilir motor koruması sağlar.", en: "HI-TECH MOTOR OIL 15W-40, a mineral-based engine oil for petrol and diesel passenger car engines. Its economical API SN/CO approved formula provides reliable engine protection under normal driving conditions.", ru: "HI-TECH MOTOR OIL 15W-40, минеральное моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Экономичная формула, одобренная API SN/CO, обеспечивает надёжную защиту двигателя в обычных условиях эксплуатации.", fa: "HI-TECH MOTOR OIL 15W-40، یک روغن موتور با پایه معدنی برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول اقتصادی تأییدشده API SN/CO در شرایط عادی رانندگی، حفاظت قابل اعتماد از موتور را فراهم می‌کند.", ar: "HI-TECH MOTOR OIL 15W-40، زيت محرك معدني لمحركات السيارات الركابية البنزينية والديزل. توفر صيغته الاقتصادية معتمدة API SN/CO حماية موثوقة للمحرك في ظروف القيادة العادية.", de: "HI-TECH MOTOR OIL 15W-40, ein mineralbasiertes Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die wirtschaftliche, nach API SN/CO zugelassene Formel bietet zuverlässigen Motorschutz unter normalen Fahrbedingungen.", fr: "HI-TECH MOTOR OIL 15W-40, une huile moteur à base minérale pour moteurs à essence et diesel de voitures particulières. Sa formule économique approuvée API SN/CO assure une protection moteur fiable dans des conditions de conduite normales." }, features: { tr: ["Benzinli ve dizel motorlar için uygun çok amaçlı mineral bazlı formül.", "Sıcak havalarda ve normal şehir içi kullanımda kararlı yağlama sağlar.", "Ekonomik mineral baz yağ ile düşük bakım maliyeti sunar."], en: ["Multi-purpose mineral-based formula suitable for petrol and diesel engines.", "Provides stable lubrication in hot weather and normal urban use.", "Economical mineral base oil keeps maintenance costs low."], ru: ["Многоцелевая минеральная формула, подходящая для бензиновых и дизельных двигателей.", "Обеспечивает стабильную смазку в жаркую погоду и при обычной городской эксплуатации.", "Экономичное минеральное базовое масло снижает затраты на техническое обслуживание."], fa: ["فرمول چند منظوره بر پایه معدنی مناسب برای موتورهای بنزینی و دیزلی.", "در هوای گرم و استفاده عادی شهری، روانکاری پایدار فراهم می‌کند.", "روغن پایه معدنی اقتصادی هزینه‌های نگهداری را پایین نگه می‌دارد."], ar: ["صيغة معدنية متعددة الأغراض مناسبة لمحركات البنزين والديزل.", "توفر تشحيماً مستقراً في الطقس الحار والاستخدام الحضري الاعتيادي.", "زيت القاعدة المعدنية الاقتصادي يُبقي تكاليف الصيانة منخفضة."], de: ["Mineralbasierte Mehrzweckformel, geeignet für Benzin- und Dieselmotoren.", "Bietet stabile Schmierung bei heißem Wetter und normalem Stadtbetrieb.", "Wirtschaftliches Mineralgrundöl hält die Wartungskosten niedrig."], fr: ["Formule multiusage à base minérale adaptée aux moteurs essence et diesel.", "Assure une lubrification stable par temps chaud et en utilisation urbaine normale.", "L'huile de base minérale économique maintient les coûts d'entretien bas."] }, standards: "API SN/CO, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-15W-40-4L":    { description: { tr: "HI-TECH MOTOR OIL 15W-40, benzinli ve dizel binek araç motorları için mineral bazlı motor yağıdır. API SN/CO onaylı ekonomik formülü, normal sürüş koşullarında güvenilir motor koruması sağlar.", en: "HI-TECH MOTOR OIL 15W-40, a mineral-based engine oil for petrol and diesel passenger car engines. Its economical API SN/CO approved formula provides reliable engine protection under normal driving conditions.", ru: "HI-TECH MOTOR OIL 15W-40, минеральное моторное масло для бензиновых и дизельных двигателей легковых автомобилей. Экономичная формула, одобренная API SN/CO, обеспечивает надёжную защиту двигателя в обычных условиях эксплуатации.", fa: "HI-TECH MOTOR OIL 15W-40، یک روغن موتور با پایه معدنی برای موتورهای بنزینی و دیزلی خودروهای سواری است. فرمول اقتصادی تأییدشده API SN/CO در شرایط عادی رانندگی، حفاظت قابل اعتماد از موتور را فراهم می‌کند.", ar: "HI-TECH MOTOR OIL 15W-40، زيت محرك معدني لمحركات السيارات الركابية البنزينية والديزل. توفر صيغته الاقتصادية معتمدة API SN/CO حماية موثوقة للمحرك في ظروف القيادة العادية.", de: "HI-TECH MOTOR OIL 15W-40, ein mineralbasiertes Motoröl für Benzin- und Dieselmotoren von Personenkraftwagen. Die wirtschaftliche, nach API SN/CO zugelassene Formel bietet zuverlässigen Motorschutz unter normalen Fahrbedingungen.", fr: "HI-TECH MOTOR OIL 15W-40, une huile moteur à base minérale pour moteurs à essence et diesel de voitures particulières. Sa formule économique approuvée API SN/CO assure une protection moteur fiable dans des conditions de conduite normales." }, features: { tr: ["Benzinli ve dizel motorlar için uygun çok amaçlı mineral bazlı formül.", "Sıcak havalarda ve normal şehir içi kullanımda kararlı yağlama sağlar.", "Ekonomik mineral baz yağ ile düşük bakım maliyeti sunar."], en: ["Multi-purpose mineral-based formula suitable for petrol and diesel engines.", "Provides stable lubrication in hot weather and normal urban use.", "Economical mineral base oil keeps maintenance costs low."], ru: ["Многоцелевая минеральная формула, подходящая для бензиновых и дизельных двигателей.", "Обеспечивает стабильную смазку в жаркую погоду и при обычной городской эксплуатации.", "Экономичное минеральное базовое масло снижает затраты на техническое обслуживание."], fa: ["فرمول چند منظوره بر پایه معدنی مناسب برای موتورهای بنزینی و دیزلی.", "در هوای گرم و استفاده عادی شهری، روانکاری پایدار فراهم می‌کند.", "روغن پایه معدنی اقتصادی هزینه‌های نگهداری را پایین نگه می‌دارد."], ar: ["صيغة معدنية متعددة الأغراض مناسبة لمحركات البنزين والديزل.", "توفر تشحيماً مستقراً في الطقس الحار والاستخدام الحضري الاعتيادي.", "زيت القاعدة المعدنية الاقتصادي يُبقي تكاليف الصيانة منخفضة."], de: ["Mineralbasierte Mehrzweckformel, geeignet für Benzin- und Dieselmotoren.", "Bietet stabile Schmierung bei heißem Wetter und normalem Stadtbetrieb.", "Wirtschaftliches Mineralgrundöl hält die Wartungskosten niedrig."], fr: ["Formule multiusage à base minérale adaptée aux moteurs essence et diesel.", "Assure une lubrification stable par temps chaud et en utilisation urbaine normale.", "L'huile de base minérale économique maintient les coûts d'entretien bas."] }, standards: "API SN/CO, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-20W-50-1L":    { description: { tr: "HI-TECH MOTOR OIL 20W-50, benzinli ve dizel motorlar için yüksek viskoziteli mineral motor yağıdır. API SL/CC onaylı klasik formülü, sıcak iklimlerde ve eski nesil motorlarda güvenilir yağlama sağlar.", en: "HI-TECH MOTOR OIL 20W-50, a high-viscosity mineral engine oil for petrol and diesel engines. Its classic API SL/CC approved formula provides reliable lubrication in hot climates and older generation engines.", ru: "HI-TECH MOTOR OIL 20W-50, высоковязкое минеральное моторное масло для бензиновых и дизельных двигателей. Классическая формула, одобренная API SL/CC, обеспечивает надёжную смазку в жарком климате и двигателях старого поколения.", fa: "HI-TECH MOTOR OIL 20W-50، یک روغن موتور معدنی با ویسکوزیته بالا برای موتورهای بنزینی و دیزلی است. فرمول کلاسیک تأییدشده API SL/CC در آب‌وهوای گرم و موتورهای نسل قدیم، روانکاری قابل اعتماد فراهم می‌کند.", ar: "HI-TECH MOTOR OIL 20W-50، زيت محرك معدني عالي اللزوجة لمحركات البنزين والديزل. تُوفّر صيغته الكلاسيكية معتمدة API SL/CC تشحيماً موثوقاً في المناخات الحارة ومحركات الجيل القديم.", de: "HI-TECH MOTOR OIL 20W-50, ein hochviskoses Mineralöl für Benzin- und Dieselmotoren. Die klassische, nach API SL/CC zugelassene Formel bietet zuverlässige Schmierung in heißen Klimazonen und Motoren älterer Bauart.", fr: "HI-TECH MOTOR OIL 20W-50, une huile moteur minérale haute viscosité pour moteurs à essence et diesel. Sa formule classique approuvée API SL/CC assure une lubrification fiable par temps chaud et dans les moteurs de génération ancienne." }, features: { tr: ["Yüksek viskozitesi ile sıcak iklim koşullarında yağ filminin bütünlüğünü korur.", "Eski nesil araçlar ve yüksek kilometreli motorlar için özellikle uygundur.", "Aşınmış motor parçalarında yağ tüketimini azaltır."], en: ["High viscosity preserves oil film integrity in hot climate conditions.", "Particularly suited for older generation vehicles and high-mileage engines.", "Reduces oil consumption in worn engine parts."], ru: ["Высокая вязкость сохраняет целостность масляной плёнки в условиях жаркого климата.", "Особенно подходит для автомобилей старого поколения и двигателей с большим пробегом.", "Снижает расход масла в изношенных деталях двигателя."], fa: ["ویسکوزیته بالا یکپارچگی فیلم روغن را در شرایط آب‌وهوای گرم حفظ می‌کند.", "به ویژه برای خودروهای نسل قدیم و موتورهای با کیلومتر بالا مناسب است.", "مصرف روغن را در قطعات فرسوده موتور کاهش می‌دهد."], ar: ["اللزوجة العالية تحافظ على سلامة غشاء الزيت في ظروف المناخ الحار.", "مناسب بشكل خاص للسيارات القديمة والمحركات عالية الأميال.", "يُقلّل استهلاك الزيت في أجزاء المحرك البالية."], de: ["Hohe Viskosität erhält die Integrität des Ölfilms bei heißen Klimabedingungen.", "Besonders geeignet für Fahrzeuge älterer Bauart und hochlaufende Motoren.", "Reduziert den Ölverbrauch in verschlissenen Motorteilen."], fr: ["La haute viscosité préserve l'intégrité du film d'huile par conditions climatiques chaudes.", "Particulièrement adapté aux véhicules de génération ancienne et aux moteurs à fort kilométrage.", "Réduit la consommation d'huile dans les pièces moteur usées."] }, standards: "API SL/CC, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-20W-50-4L":    { description: { tr: "HI-TECH MOTOR OIL 20W-50, benzinli ve dizel motorlar için yüksek viskoziteli mineral motor yağıdır. API SL/CC onaylı klasik formülü, sıcak iklimlerde ve eski nesil motorlarda güvenilir yağlama sağlar.", en: "HI-TECH MOTOR OIL 20W-50, a high-viscosity mineral engine oil for petrol and diesel engines. Its classic API SL/CC approved formula provides reliable lubrication in hot climates and older generation engines.", ru: "HI-TECH MOTOR OIL 20W-50, высоковязкое минеральное моторное масло для бензиновых и дизельных двигателей. Классическая формула, одобренная API SL/CC, обеспечивает надёжную смазку в жарком климате и двигателях старого поколения.", fa: "HI-TECH MOTOR OIL 20W-50، یک روغن موتور معدنی با ویسکوزیته بالا برای موتورهای بنزینی و دیزلی است. فرمول کلاسیک تأییدشده API SL/CC در آب‌وهوای گرم و موتورهای نسل قدیم، روانکاری قابل اعتماد فراهم می‌کند.", ar: "HI-TECH MOTOR OIL 20W-50، زيت محرك معدني عالي اللزوجة لمحركات البنزين والديزل. تُوفّر صيغته الكلاسيكية معتمدة API SL/CC تشحيماً موثوقاً في المناخات الحارة ومحركات الجيل القديم.", de: "HI-TECH MOTOR OIL 20W-50, ein hochviskoses Mineralöl für Benzin- und Dieselmotoren. Die klassische, nach API SL/CC zugelassene Formel bietet zuverlässige Schmierung in heißen Klimazonen und Motoren älterer Bauart.", fr: "HI-TECH MOTOR OIL 20W-50, une huile moteur minérale haute viscosité pour moteurs à essence et diesel. Sa formule classique approuvée API SL/CC assure une lubrification fiable par temps chaud et dans les moteurs de génération ancienne." }, features: { tr: ["Yüksek viskozitesi ile sıcak iklim koşullarında yağ filminin bütünlüğünü korur.", "Eski nesil araçlar ve yüksek kilometreli motorlar için özellikle uygundur.", "Aşınmış motor parçalarında yağ tüketimini azaltır."], en: ["High viscosity preserves oil film integrity in hot climate conditions.", "Particularly suited for older generation vehicles and high-mileage engines.", "Reduces oil consumption in worn engine parts."], ru: ["Высокая вязкость сохраняет целостность масляной плёнки в условиях жаркого климата.", "Особенно подходит для автомобилей старого поколения и двигателей с большим пробегом.", "Снижает расход масла в изношенных деталях двигателя."], fa: ["ویسکوزیته بالا یکپارچگی فیلم روغن را در شرایط آب‌وهوای گرم حفظ می‌کند.", "به ویژه برای خودروهای نسل قدیم و موتورهای با کیلومتر بالا مناسب است.", "مصرف روغن را در قطعات فرسوده موتور کاهش می‌دهد."], ar: ["اللزوجة العالية تحافظ على سلامة غشاء الزيت في ظروف المناخ الحار.", "مناسب بشكل خاص للسيارات القديمة والمحركات عالية الأميال.", "يُقلّل استهلاك الزيت في أجزاء المحرك البالية."], de: ["Hohe Viskosität erhält die Integrität des Ölfilms bei heißen Klimabedingungen.", "Besonders geeignet für Fahrzeuge älterer Bauart und hochlaufende Motoren.", "Reduziert den Ölverbrauch in verschlissenen Motorteilen."], fr: ["La haute viscosité préserve l'intégrité du film d'huile par conditions climatiques chaudes.", "Particulièrement adapté aux véhicules de génération ancienne et aux moteurs à fort kilométrage.", "Réduit la consommation d'huile dans les pièces moteur usées."] }, standards: "API SL/CC, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Hafif-5W30-7L":      { description: { tr: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçlar ve minibüsler için özel geliştirilmiş tam sentetik motor yağıdır. API SL/CF ve ACEA A5/B5 onaylı formülü, yüksek yüklü ticari kullanımda üstün motor koruması ve uzun yağ değişim aralıkları sağlar.", en: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, a fully synthetic engine oil specially developed for light commercial vehicles and minibuses. Its API SL/CF and ACEA A5/B5 approved formula provides superior engine protection and extended oil change intervals in high-load commercial use.", ru: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, полностью синтетическое моторное масло, специально разработанное для лёгких коммерческих автомобилей и минивэнов. Формула, одобренная API SL/CF и ACEA A5/B5, обеспечивает превосходную защиту двигателя и увеличенные интервалы замены масла при интенсивной коммерческой эксплуатации.", fa: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ، یک روغن موتور تمام سنتتیک است که به طور خاص برای وسایل نقلیه تجاری سبک و مینی‌بوس‌ها توسعه یافته است. فرمول تأییدشده API SL/CF و ACEA A5/B5 در استفاده تجاری با بار بالا، حفاظت برتر از موتور و فواصل تعویض روغن طولانی فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ، زيت محرك اصطناعي بالكامل مطوَّر خصيصاً للمركبات التجارية الخفيفة والحافلات الصغيرة. توفر صيغته معتمدة API SL/CF وAECA A5/B5 حماية فائقة للمحرك وفترات تغيير زيت ممتدة في الاستخدام التجاري ذي الحمل العالي.", de: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, ein vollsynthetisches Motoröl, das speziell für leichte Nutzfahrzeuge und Kleinbusse entwickelt wurde. Die nach API SL/CF und ACEA A5/B5 zugelassene Formel bietet überlegenen Motorschutz und verlängerte Ölwechselintervalle bei hoher gewerblicher Beanspruchung.", fr: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, une huile moteur entièrement synthétique spécialement développée pour les véhicules utilitaires légers et les minibus. Sa formule approuvée API SL/CF et ACEA A5/B5 assure une protection moteur supérieure et des intervalles de vidange prolongés lors d'une utilisation commerciale à forte charge." }, features: { tr: ["Hafif ticari araçların yüksek yük ve uzun mesafe koşulları için özel formüle edilmiştir.", "ACEA A5/B5 onayı ile hem benzinli hem dizel motorda güvenilir kullanım imkânı.", "Büyük hacimli ambalajı ile filo ve servis operasyonları için idealdir."], en: ["Specially formulated for the high-load and long-distance conditions of light commercial vehicles.", "ACEA A5/B5 approval ensures reliable use in both petrol and diesel engines.", "Large-volume packaging is ideal for fleet and service operations."], ru: ["Специально разработана для условий высоких нагрузок и дальних поездок лёгких коммерческих автомобилей.", "Одобрение ACEA A5/B5 гарантирует надёжное применение как в бензиновых, так и в дизельных двигателях.", "Большой объём упаковки идеально подходит для флотских и сервисных операций."], fa: ["به طور خاص برای شرایط بار بالا و مسافت طولانی خودروهای تجاری سبک فرموله شده است.", "تأییدیه ACEA A5/B5 استفاده قابل اعتماد در موتورهای بنزینی و دیزلی را تضمین می‌کند.", "بسته‌بندی با حجم بزرگ برای عملیات ناوگان و خدمات ایده‌آل است."], ar: ["مُصاغ خصيصاً لظروف الحمل العالي والمسافات الطويلة للمركبات التجارية الخفيفة.", "اعتماد ACEA A5/B5 يضمن الاستخدام الموثوق في محركات البنزين والديزل.", "التعبئة ذات الحجم الكبير مثالية لعمليات الأسطول والخدمة."], de: ["Speziell für die Hochlast- und Langstreckenbedingungen von leichten Nutzfahrzeugen formuliert.", "ACEA A5/B5-Zulassung gewährleistet zuverlässigen Einsatz in Benzin- und Dieselmotoren.", "Großvolumige Verpackung ist ideal für Flottenunternehmen und Servicebetriebe."], fr: ["Spécialement formulée pour les conditions de charge élevée et de longue distance des véhicules utilitaires légers.", "L'approbation ACEA A5/B5 garantit une utilisation fiable dans les moteurs essence et diesel.", "Le conditionnement grand volume est idéal pour les opérations de flotte et de service."] }, standards: "API SL/CF, ACEA A5/B5", packaging: ["7 L", "10.5 L", "200 L"] },
      "Hafif-5W30-10-5L":   { description: { tr: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçlar ve minibüsler için özel geliştirilmiş tam sentetik motor yağıdır. API SL/CF ve ACEA A5/B5 onaylı formülü, yüksek yüklü ticari kullanımda üstün motor koruması ve uzun yağ değişim aralıkları sağlar.", en: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, a fully synthetic engine oil specially developed for light commercial vehicles and minibuses. Its API SL/CF and ACEA A5/B5 approved formula provides superior engine protection and extended oil change intervals in high-load commercial use.", ru: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, полностью синтетическое моторное масло, специально разработанное для лёгких коммерческих автомобилей и минивэнов. Формула, одобренная API SL/CF и ACEA A5/B5, обеспечивает превосходную защиту двигателя и увеличенные интервалы замены масла при интенсивной коммерческой эксплуатации.", fa: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ، یک روغن موتور تمام سنتتیک است که به طور خاص برای وسایل نقلیه تجاری سبک و مینی‌بوس‌ها توسعه یافته است. فرمول تأییدشده API SL/CF و ACEA A5/B5 در استفاده تجاری با بار بالا، حفاظت برتر از موتور و فواصل تعویض روغن طولانی فراهم می‌کند.", ar: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ، زيت محرك اصطناعي بالكامل مطوَّر خصيصاً للمركبات التجارية الخفيفة والحافلات الصغيرة. توفر صيغته معتمدة API SL/CF وAECA A5/B5 حماية فائقة للمحرك وفترات تغيير زيت ممتدة في الاستخدام التجاري ذي الحمل العالي.", de: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, ein vollsynthetisches Motoröl, das speziell für leichte Nutzfahrzeuge und Kleinbusse entwickelt wurde. Die nach API SL/CF und ACEA A5/B5 zugelassene Formel bietet überlegenen Motorschutz und verlängerte Ölwechselintervalle bei hoher gewerblicher Beanspruchung.", fr: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, une huile moteur entièrement synthétique spécialement développée pour les véhicules utilitaires légers et les minibus. Sa formule approuvée API SL/CF et ACEA A5/B5 assure une protection moteur supérieure et des intervalles de vidange prolongés lors d'une utilisation commerciale à forte charge." }, features: { tr: ["Hafif ticari araçların yüksek yük ve uzun mesafe koşulları için özel formüle edilmiştir.", "ACEA A5/B5 onayı ile hem benzinli hem dizel motorda güvenilir kullanım imkânı.", "Büyük hacimli ambalajı ile filo ve servis operasyonları için idealdir."], en: ["Specially formulated for the high-load and long-distance conditions of light commercial vehicles.", "ACEA A5/B5 approval ensures reliable use in both petrol and diesel engines.", "Large-volume packaging is ideal for fleet and service operations."], ru: ["Специально разработана для условий высоких нагрузок и дальних поездок лёгких коммерческих автомобилей.", "Одобрение ACEA A5/B5 гарантирует надёжное применение как в бензиновых, так и в дизельных двигателях.", "Большой объём упаковки идеально подходит для флотских и сервисных операций."], fa: ["به طور خاص برای شرایط بار بالا و مسافت طولانی خودروهای تجاری سبک فرموله شده است.", "تأییدیه ACEA A5/B5 استفاده قابل اعتماد در موتورهای بنزینی و دیزلی را تضمین می‌کند.", "بسته‌بندی با حجم بزرگ برای عملیات ناوگان و خدمات ایده‌آل است."], ar: ["مُصاغ خصيصاً لظروف الحمل العالي والمسافات الطويلة للمركبات التجارية الخفيفة.", "اعتماد ACEA A5/B5 يضمن الاستخدام الموثوق في محركات البنزين والديزل.", "التعبئة ذات الحجم الكبير مثالية لعمليات الأسطول والخدمة."], de: ["Speziell für die Hochlast- und Langstreckenbedingungen von leichten Nutzfahrzeugen formuliert.", "ACEA A5/B5-Zulassung gewährleistet zuverlässigen Einsatz in Benzin- und Dieselmotoren.", "Großvolumige Verpackung ist ideal für Flottenunternehmen und Servicebetriebe."], fr: ["Spécialement formulée pour les conditions de charge élevée et de longue distance des véhicules utilitaires légers.", "L'approbation ACEA A5/B5 garantit une utilisation fiable dans les moteurs essence et diesel.", "Le conditionnement grand volume est idéal pour les opérations de flotte et de service."] }, standards: "API SL/CF, ACEA A5/B5", packaging: ["7 L", "10.5 L", "200 L"] },
      "Hafif-10W30-7L":     { description: { tr: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçların dizel motorları için sentetik teknoloji ağır hizmet motor yağıdır. API CI-4 ve ACEA E7 onaylı formülü, sürekli çalışan hafif ticari araçlarda güvenilir motor koruması ve dayanıklılık sağlar.", en: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, a synthetic-technology heavy-duty engine oil for diesel engines of light commercial vehicles. Its API CI-4 and ACEA E7 approved formula provides reliable engine protection and durability in continuously operating light commercial vehicles.", ru: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, тяжёлое моторное масло синтетической технологии для дизельных двигателей лёгких коммерческих автомобилей. Формула, одобренная API CI-4 и ACEA E7, обеспечивает надёжную защиту двигателя и долговечность непрерывно работающих лёгких коммерческих автомобилей.", fa: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ، یک روغن موتور سنگین با فناوری سنتتیک برای موتورهای دیزلی خودروهای تجاری سبک است. فرمول تأییدشده API CI-4 و ACEA E7 در خودروهای تجاری سبک که به طور مداوم کار می‌کنند، حفاظت قابل اعتماد از موتور و دوام ارائه می‌دهد.", ar: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ، زيت محرك ثقيل بتقنية اصطناعية لمحركات الديزل في المركبات التجارية الخفيفة. توفر صيغته معتمدة API CI-4 وAECA E7 حماية موثوقة للمحرك ومتانة في المركبات التجارية الخفيفة التي تعمل بشكل مستمر.", de: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, ein schwerlastfähiges Motoröl in Synthesetechnologie für Dieselmotoren von leichten Nutzfahrzeugen. Die nach API CI-4 und ACEA E7 zugelassene Formel bietet zuverlässigen Motorschutz und Langlebigkeit für kontinuierlich betriebene leichte Nutzfahrzeuge.", fr: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, une huile moteur poids lourd à technologie synthétique pour les moteurs diesel des véhicules utilitaires légers. Sa formule approuvée API CI-4 et ACEA E7 assure une protection moteur fiable et une durabilité pour les véhicules utilitaires légers à fonctionnement continu." }, features: { tr: ["API CI-4 onaylı formül ile hafif ticari araçların dizel motorlarında tam koruma.", "Yüksek yük altında çalışan motorlarda termal stabilite ve anti-wear performansı sunar.", "7L büyük hacimli ambalaj ile filo yönetimi ve toplu bakım hizmetleri için uygundur."], en: ["API CI-4 approved formula ensures complete protection in diesel engines of light commercial vehicles.", "Delivers thermal stability and anti-wear performance in engines operating under high loads.", "Large 7L packaging is suitable for fleet management and bulk maintenance services."], ru: ["Формула, одобренная API CI-4, обеспечивает полную защиту дизельных двигателей лёгких коммерческих автомобилей.", "Обеспечивает термическую стабильность и противоизносные свойства в двигателях, работающих под высокими нагрузками.", "Большая упаковка 7L подходит для управления автопарком и техобслуживания в больших объёмах."], fa: ["فرمول تأییدشده API CI-4 از موتورهای دیزلی خودروهای تجاری سبک حفاظت کامل می‌کند.", "در موتورهایی که تحت بارهای بالا کار می‌کنند، پایداری حرارتی و عملکرد ضد سایش ارائه می‌دهد.", "بسته‌بندی بزرگ 7 لیتری برای مدیریت ناوگان و خدمات نگهداری انبوه مناسب است."], ar: ["الصيغة معتمدة API CI-4 تضمن الحماية الكاملة في محركات الديزل للمركبات التجارية الخفيفة.", "توفر ثباتاً حرارياً وأداء مضاداً للتآكل في المحركات التي تعمل تحت أحمال عالية.", "التعبئة الكبيرة بسعة 7 لترات مناسبة لإدارة الأسطول وخدمات الصيانة الجماعية."], de: ["API CI-4-zugelassene Formel gewährleistet vollständigen Schutz in Dieselmotoren von leichten Nutzfahrzeugen.", "Bietet thermische Stabilität und Verschleißschutzleistung in Motoren unter hoher Last.", "Großverpackung 7L geeignet für Flottenmanagement und Massenabschmierungsdienste."], fr: ["La formule approuvée API CI-4 assure une protection complète dans les moteurs diesel des véhicules utilitaires légers.", "Offre une stabilité thermique et des performances anti-usure dans les moteurs fonctionnant sous charge élevée.", "Le grand conditionnement de 7L est adapté à la gestion de flottes et aux services d'entretien en volume."] }, standards: "API CI-4, ACEA E7", packaging: ["7 L", "200 L"] },
    },
    subcategories: {
      "0W-16":     { title: "0W-16",     products: [
        { slug: "Binek-0W-16-1L", name: "0W-16 1L", image: "/model-oils/images/hi-tech/binek/0W-16/1L.png" },
        { slug: "Binek-0W-16-4L", name: "0W-16 4L", image: "/model-oils/images/hi-tech/binek/0W-16/4L.png" },
        { slug: "Binek-0W-16-5L", name: "0W-16 5L", image: "/model-oils/images/hi-tech/binek/0W-16/5L.png" },
      ]},
      "0W-20":     { title: "0W-20",     products: [
        { slug: "Binek-0W-20-1L", name: "0W-20 1L", image: "/model-oils/images/hi-tech/binek/0W-20/1L.png" },
        { slug: "Binek-0W-20-4L", name: "0W-20 4L", image: "/model-oils/images/hi-tech/binek/0W-20/4L.png" },
        { slug: "Binek-0W-20-5L", name: "0W-20 5L", image: "/model-oils/images/hi-tech/binek/0W-20/5L.png" },
      ]},
      "0W-30":     { title: "0W-30",     products: [
        { slug: "Binek-0W-30-1L", name: "0W-30 1L", image: "/model-oils/images/hi-tech/binek/0W-30/1L.png" },
        { slug: "Binek-0W-30-4L", name: "0W-30 4L", image: "/model-oils/images/hi-tech/binek/0W-30/4L.png" },
        { slug: "Binek-0W-30-5L", name: "0W-30 5L", image: "/model-oils/images/hi-tech/binek/0W-30/5L.png" },
      ]},
      "5W-30":     { title: "5W-30",     products: [
        { slug: "Binek-5W-30-1L", name: "5W-30 1L", image: "/model-oils/images/hi-tech/binek/5W-30/1L.png" },
        { slug: "Binek-5W-30-4L", name: "5W-30 4L", image: "/model-oils/images/hi-tech/binek/5W-30/4L.png" },
        { slug: "Binek-5W-30-5L", name: "5W-30 5L", image: "/model-oils/images/hi-tech/binek/5W-30/5L.png" },
      ]},
      "5W-30-DPF": { title: "5W-30 DPF", products: [
        { slug: "Binek-5W-30-DPF-1L", name: "5W-30 DPF 1L", image: "/model-oils/images/hi-tech/binek/5W-30%20DPF/1L.png" },
        { slug: "Binek-5W-30-DPF-4L", name: "5W-30 DPF 4L", image: "/model-oils/images/hi-tech/binek/5W-30%20DPF/4L.png" },
        { slug: "Binek-5W-30-DPF-5L", name: "5W-30 DPF 5L", image: "/model-oils/images/hi-tech/binek/5W-30%20DPF/5L.png" },
      ]},
      "5W-40":     { title: "5W-40",     products: [
        { slug: "Binek-5W-40-1L", name: "5W-40 1L", image: "/model-oils/images/hi-tech/binek/5W-40/1L.png" },
        { slug: "Binek-5W-40-4L", name: "5W-40 4L", image: "/model-oils/images/hi-tech/binek/5W-40/4L.png" },
      ]},
      "10W-40":    { title: "10W-40",    products: [
        { slug: "Binek-10W-40-1L", name: "10W-40 1L", image: "/model-oils/images/hi-tech/binek/10W-40/1L.png" },
        { slug: "Binek-10W-40-4L", name: "10W-40 4L", image: "/model-oils/images/hi-tech/binek/10W-40/4L.png" },
        { slug: "Binek-10W-40-5L", name: "10W-40 5L", image: "/model-oils/images/hi-tech/binek/10W-40/5L.png" },
      ]},
      "10W-60":    { title: "10W-60",    products: [
        { slug: "Binek-10W-60-1L", name: "10W-60 1L", image: "/model-oils/images/hi-tech/binek/10W-60/1L.png" },
        { slug: "Binek-10W-60-4L", name: "10W-60 4L", image: "/model-oils/images/hi-tech/binek/10W-60/4L.png" },
      ]},
      "15W-40":    { title: "15W-40",    products: [
        { slug: "Binek-15W-40-1L", name: "15W-40 1L", image: "/model-oils/images/hi-tech/binek/15W-40/1L.png" },
        { slug: "Binek-15W-40-4L", name: "15W-40 4L", image: "/model-oils/images/hi-tech/binek/15W-40/4L.png" },
      ]},
      "20W-50":    { title: "20W-50",    products: [
        { slug: "Binek-20W-50-1L", name: "20W-50 1L", image: "/model-oils/images/hi-tech/binek/20W-50/1L.png" },
        { slug: "Binek-20W-50-4L", name: "20W-50 4L", image: "/model-oils/images/hi-tech/binek/20W-50/4L.png" },
      ]},
      "Hafif-Ticariler": { title: "Hafif Ticari Araçlar", products: [
        { slug: "Hafif-5W30-7L",    name: "5W-30 7L",    image: "/model-oils/images/hi-tech/binek/Hafif%20Ticariler/5W30%207L.png" },
        { slug: "Hafif-5W30-10-5L", name: "5W-30 10.5L", image: "/model-oils/images/hi-tech/binek/Hafif%20Ticariler/5W30%2010.5L.png" },
        { slug: "Hafif-10W30-7L",   name: "10W-30 7L",   image: "/model-oils/images/hi-tech/binek/Hafif%20Ticariler/10W30%207L.png" },
      ]},
    },
  },
  Antifrizler: {
    title: "Antifrizler",
    products: [
      { slug: "Antifriz-37",       name: "Antifriz -37",       image: "/model-oils/images/hi-tech/antifrizler/Antifriz%20-37.png" },
      { slug: "Antifriz-56",       name: "Antifriz -56",       image: "/model-oils/images/hi-tech/antifrizler/Antifriz%20-56.png" },
      { slug: "Antifriz-Konsantre", name: "Antifriz Konsantre", image: "/model-oils/images/hi-tech/antifrizler/Antifriz%20Konsantre.png" },
    ],
    details: {
      "Antifriz-37": {
        description: {
          tr: "HI-TECH ANTİFRİZ -37, etilen glikol esaslı, -37°C'lik soğutma sıvısıdır. Geliştirilmiş formülü sayesinde özel amaçlı kullanıma uygun radyatörlerde mükemmel koruma sağlar. Çok soğuk ve çok sıcak ortamda bulunan binek araç, kamyon, otobüs, traktör ve iş makinelerinin radyatörlerini donma ve korozyona karşı korur.",
          en: "HI-TECH ANTİFRİZ -37, an ethylene glycol-based coolant with -37°C freeze protection. Its advanced formula provides excellent protection in radiators for special-purpose applications. It protects the radiators of passenger cars, trucks, buses, tractors and construction machinery operating in extremely cold and hot environments against freezing and corrosion.",
          ru: "HI-TECH ANTİFRİZ -37, охлаждающая жидкость на основе этиленгликоля с защитой от замерзания до -37°C. Улучшенная формула обеспечивает отличную защиту в радиаторах для специального применения. Защищает радиаторы легковых автомобилей, грузовиков, автобусов, тракторов и строительной техники, работающих в условиях экстремального холода и жары, от замерзания и коррозии.",
          fa: "HI-TECH ANTİFRİZ -37، یک مایع خنک‌کننده بر پایه اتیلن گلیکول با حفاظت در برابر انجماد تا ۳۷- درجه سانتیگراد است. فرمول پیشرفته آن حفاظت عالی در رادیاتورها برای کاربردهای خاص ارائه می‌دهد. از رادیاتور خودروهای سواری، کامیون‌ها، اتوبوس‌ها، تراکتورها و ماشین‌آلات ساختمانی که در محیط‌های بسیار سرد و گرم کار می‌کنند در برابر یخ‌زدگی و خوردگی محافظت می‌کند.",
          ar: "HI-TECH ANTİFRİZ -37، سائل تبريد على أساس إيثيلين جلايكول مع حماية من التجمد حتى -37°C. توفر صيغته المتطورة حماية ممتازة في المبردات للتطبيقات الخاصة. تحمي مبردات السيارات الركابية والشاحنات والحافلات والجرارات والآليات الإنشائية العاملة في البيئات شديدة البرودة والحرارة من التجمد والتآكل.",
          de: "HI-TECH ANTİFRİZ -37, ein auf Ethylenglykol basierendes Kühlmittel mit Gefrierschutz bis -37°C. Die verbesserte Formel bietet ausgezeichneten Schutz in Kühler für Spezialanwendungen. Sie schützt die Kühler von Personenfahrzeugen, Lastkraftwagen, Bussen, Traktoren und Baumaschinen in extrem kalten und heißen Umgebungen vor Einfrieren und Korrosion.",
          fr: "HI-TECH ANTİFRİZ -37, un liquide de refroidissement à base d'éthylène glycol avec une protection antigel jusqu'à -37°C. Sa formule améliorée assure une protection excellente dans les radiateurs pour les applications spéciales. Il protège les radiateurs des voitures particulières, camions, bus, tracteurs et engins de chantier opérant dans des environnements extrêmement froids et chauds contre le gel et la corrosion.",
        },
        features: {
          tr: [
            "Korozyon ve tortu oluşumunu engelleyerek soğutma sistemini korur ve bakım maliyetini azaltır.",
            "Motor sıcaklığını dengeler ve motorun en üst performansta çalışmasına yardımcı olur.",
            "Motor soğutma sisteminde bulunan plastik, kauçuk ve sızdırmazlık elemanlarına uyumludur.",
          ],
          en: [
            "Protects the cooling system against corrosion and deposit formation, reducing maintenance costs.",
            "Balances engine temperature and helps the engine run at peak performance.",
            "Compatible with plastic, rubber and sealing elements found in the engine cooling system.",
          ],
          ru: [
            "Защищает систему охлаждения от коррозии и образования отложений, снижая затраты на обслуживание.",
            "Стабилизирует температуру двигателя и способствует его работе с максимальной эффективностью.",
            "Совместима с пластиковыми, резиновыми и уплотнительными элементами системы охлаждения двигателя.",
          ],
          fa: [
            "با جلوگیری از خوردگی و تشکیل رسوب از سیستم خنک‌کننده محافظت می‌کند و هزینه‌های نگهداری را کاهش می‌دهد.",
            "دمای موتور را تعادل می‌بخشد و به کارکرد موتور در اوج عملکرد کمک می‌کند.",
            "با عناصر پلاستیکی، لاستیکی و آب‌بندی موجود در سیستم خنک‌کننده موتور سازگار است.",
          ],
          ar: [
            "يحمي نظام التبريد من التآكل وتكوّن الترسبات، مما يقلل تكاليف الصيانة.",
            "يوازن درجة حرارة المحرك ويساعده على العمل بأعلى أداء.",
            "متوافق مع العناصر البلاستيكية والمطاطية وعناصر الإحكام الموجودة في نظام تبريد المحرك.",
          ],
          de: [
            "Schützt das Kühlsystem vor Korrosion und Ablagerungsbildung und senkt die Wartungskosten.",
            "Reguliert die Motortemperatur und hilft dem Motor, mit maximaler Leistung zu laufen.",
            "Kompatibel mit Kunststoff-, Gummi- und Dichtelementen im Motorkühlsystem.",
          ],
          fr: [
            "Protège le circuit de refroidissement contre la corrosion et la formation de dépôts, réduisant les coûts d'entretien.",
            "Équilibre la température du moteur et l'aide à fonctionner à son niveau de performance optimal.",
            "Compatible avec les éléments en plastique, en caoutchouc et les joints du système de refroidissement du moteur.",
          ],
        },
        standards: "SAE J 1034, TS 3582, BS 6580, ASTM D3306",
        packaging: ["3 L", "20 L", "200 L"],
      },
      "Antifriz-56": {
        description: {
          tr: "HI-TECH ANTİFRİZ -56, etilen glikol esaslı, -56°C'ye kadar koruma sağlayan yüksek performanslı soğutma sıvısıdır. Aşırı soğuk iklimlerde ve zorlu koşullarda çalışan araç ve makinelerin soğutma sistemleri için özel olarak geliştirilmiştir. Donmaya karşı maksimum koruma ile korozyon önleyici özellikleri bir arada sunar.",
          en: "HI-TECH ANTİFRİZ -56, a high-performance ethylene glycol-based coolant providing protection down to -56°C. Specially developed for the cooling systems of vehicles and machinery operating in extremely cold climates and harsh conditions. It combines maximum freeze protection with anti-corrosion properties.",
          ru: "HI-TECH ANTİFRİZ -56, высокоэффективная охлаждающая жидкость на основе этиленгликоля, обеспечивающая защиту до -56°C. Специально разработана для систем охлаждения автомобилей и техники, работающих в условиях экстремально холодного климата и жёстких условий. Сочетает максимальную защиту от замерзания с антикоррозионными свойствами.",
          fa: "HI-TECH ANTİFRİZ -56، یک مایع خنک‌کننده با عملکرد بالا بر پایه اتیلن گلیکول است که تا ۵۶- درجه سانتیگراد حفاظت ارائه می‌دهد. به طور خاص برای سیستم‌های خنک‌کننده خودروها و ماشین‌آلاتی که در آب‌وهوای بسیار سرد و شرایط سخت کار می‌کنند توسعه یافته است. حفاظت حداکثری در برابر انجماد را با خواص ضد خوردگی ترکیب می‌کند.",
          ar: "HI-TECH ANTİFRİZ -56، سائل تبريد عالي الأداء على أساس إيثيلين جلايكول يوفر حماية حتى -56°C. مطوَّر خصيصاً لأنظمة تبريد المركبات والآليات العاملة في المناخات الباردة للغاية والظروف القاسية. يجمع بين الحماية القصوى من التجمد وخصائص مضادة للتآكل.",
          de: "HI-TECH ANTİFRİZ -56, ein hochleistungsfähiges Kühlmittel auf Ethylenglykolbasis, das bis -56°C Schutz bietet. Speziell für die Kühlsysteme von Fahrzeugen und Maschinen entwickelt, die in extrem kalten Klimazonen und unter rauen Bedingungen arbeiten. Es kombiniert maximalen Gefrierringschutz mit Korrosionsschutzeigenschaften.",
          fr: "HI-TECH ANTİFRİZ -56, un liquide de refroidissement haute performance à base d'éthylène glycol offrant une protection jusqu'à -56°C. Spécialement développé pour les circuits de refroidissement des véhicules et machines fonctionnant dans des conditions climatiques extrêmement froides et difficiles. Il associe une protection antigel maximale à des propriétés anticorrosion.",
        },
        features: {
          tr: [
            "Eksi 56°C'ye kadar donmaya karşı üstün koruma sağlar.",
            "Alüminyum, demir, çelik ve bakır alaşımlı soğutma sistemi bileşenlerini korozyona karşı korur.",
            "Yüksek kaynama noktası sayesinde aşırı sıcaklıklarda güvenli çalışmayı destekler.",
          ],
          en: [
            "Provides superior freeze protection down to -56°C.",
            "Protects cooling system components made of aluminium, iron, steel and copper alloys against corrosion.",
            "High boiling point enables safe operation at extreme temperatures.",
          ],
          ru: [
            "Обеспечивает превосходную защиту от замерзания до -56°C.",
            "Защищает компоненты системы охлаждения из алюминия, железа, стали и медных сплавов от коррозии.",
            "Высокая точка кипения обеспечивает безопасную работу при экстремальных температурах.",
          ],
          fa: [
            "تا ۵۶- درجه سانتیگراد حفاظت برتر در برابر انجماد فراهم می‌کند.",
            "اجزای سیستم خنک‌کننده ساخته شده از آلیاژهای آلومینیوم، آهن، فولاد و مس را در برابر خوردگی محافظت می‌کند.",
            "نقطه جوش بالا امکان کارکرد ایمن در دماهای شدید را فراهم می‌کند.",
          ],
          ar: [
            "يوفر حماية فائقة من التجمد حتى -56°C.",
            "يحمي مكونات نظام التبريد المصنوعة من سبائك الألومنيوم والحديد والصلب والنحاس من التآكل.",
            "نقطة الغليان المرتفعة تتيح التشغيل الآمن في درجات الحرارة القصوى.",
          ],
          de: [
            "Bietet überlegenen Gefrierringschutz bis -56°C.",
            "Schützt Kühlsystemkomponenten aus Aluminium-, Eisen-, Stahl- und Kupferlegierungen vor Korrosion.",
            "Hoher Siedepunkt ermöglicht sicheren Betrieb bei extremen Temperaturen.",
          ],
          fr: [
            "Assure une protection antigel supérieure jusqu'à -56°C.",
            "Protège les composants du circuit de refroidissement en alliages d'aluminium, de fer, d'acier et de cuivre contre la corrosion.",
            "Le point d'ébullition élevé permet un fonctionnement sûr à des températures extrêmes.",
          ],
        },
        standards: "SAE J 1034, TS 3582, ASTM D3306, G-11",
        packaging: ["3 L", "20 L", "200 L"],
      },
      "Antifriz-Konsantre": {
        description: {
          tr: "HI-TECH ANTİFRİZ KONSANTRE, yüksek saflıkta etilen glikol esaslı konsantre soğutma sıvısıdır. Su ile istenilen oranda karıştırılarak -15°C ile -65°C arasında koruma sağlanabilir. Ticari araçlar, iş makineleri ve endüstriyel uygulamalar için ideal çözüm sunar.",
          en: "HI-TECH ANTİFRİZ KONSANTRE, a high-purity ethylene glycol-based concentrated coolant. By mixing with water at the desired ratio, protection can be achieved between -15°C and -65°C. It is the ideal solution for commercial vehicles, construction machinery and industrial applications.",
          ru: "HI-TECH ANTİFRİZ KONSANTRE, концентрированная охлаждающая жидкость на основе высокочистого этиленгликоля. При смешивании с водой в нужном соотношении обеспечивает защиту в диапазоне от -15°C до -65°C. Идеальное решение для коммерческих автомобилей, строительной техники и промышленных применений.",
          fa: "HI-TECH ANTİFRİZ KONSANTRE، یک مایع خنک‌کننده غلیظ بر پایه اتیلن گلیکول با خلوص بالا است. با مخلوط کردن با آب در نسبت دلخواه، می‌توان حفاظت بین ۱۵- درجه تا ۶۵- درجه سانتیگراد را ایجاد کرد. این محصول راه‌حل ایده‌آل برای وسایل نقلیه تجاری، ماشین‌آلات ساختمانی و کاربردهای صنعتی است.",
          ar: "HI-TECH ANTİFRİZ KONSANTRE، سائل تبريد مركّز عالي النقاء على أساس إيثيلين جلايكول. بمزجه مع الماء بالنسبة المطلوبة، يمكن تحقيق حماية تتراوح بين -15°C و-65°C. وهو الحل الأمثل للمركبات التجارية وآليات البناء والتطبيقات الصناعية.",
          de: "HI-TECH ANTİFRİZ KONSANTRE, ein hochreines, konzentriertes Kühlmittel auf Ethylenglykolbasis. Durch Mischung mit Wasser im gewünschten Verhältnis kann ein Schutz zwischen -15°C und -65°C erzielt werden. Es ist die ideale Lösung für Nutzfahrzeuge, Baumaschinen und industrielle Anwendungen.",
          fr: "HI-TECH ANTİFRİZ KONSANTRE, un liquide de refroidissement concentré à base d'éthylène glycol de haute pureté. En le mélangeant à l'eau dans le rapport souhaité, une protection entre -15°C et -65°C peut être obtenue. C'est la solution idéale pour les véhicules commerciaux, les engins de chantier et les applications industrielles.",
        },
        features: {
          tr: [
            "Su ile farklı oranlarda karıştırılarak ihtiyaca göre donma noktası ayarlanabilir.",
            "Tüm metal yüzeyleri, conta ve hortumları uzun süre etkili biçimde korur.",
            "Konsantre formülü sayesinde ekonomik kullanım ve kolay depolama imkânı sağlar.",
          ],
          en: [
            "Freeze point can be adjusted to requirements by mixing with water at different ratios.",
            "Effectively protects all metal surfaces, gaskets and hoses for extended periods.",
            "Concentrated formula enables economical use and easy storage.",
          ],
          ru: [
            "Температура замерзания настраивается в соответствии с требованиями путём смешивания с водой в разных соотношениях.",
            "Эффективно защищает все металлические поверхности, прокладки и шланги в течение длительного времени.",
            "Концентрированная формула обеспечивает экономичное использование и удобное хранение.",
          ],
          fa: [
            "نقطه انجماد می‌تواند با مخلوط کردن با آب در نسبت‌های مختلف بر اساس نیاز تنظیم شود.",
            "تمام سطوح فلزی، واشرها و شیلنگ‌ها را برای مدت طولانی به طور موثر محافظت می‌کند.",
            "فرمول غلیظ امکان استفاده اقتصادی و ذخیره‌سازی آسان را فراهم می‌کند.",
          ],
          ar: [
            "يمكن ضبط نقطة التجمد حسب الاحتياج بخلطه مع الماء بنسب مختلفة.",
            "يحمي جميع الأسطح المعدنية والحشيات والخراطيم بشكل فعال لفترات طويلة.",
            "الصيغة المركّزة تتيح الاستخدام الاقتصادي وسهولة التخزين.",
          ],
          de: [
            "Der Gefrierpunkt kann durch Mischung mit Wasser in verschiedenen Verhältnissen nach Bedarf eingestellt werden.",
            "Schützt alle Metalloberflächen, Dichtungen und Schläuche über längere Zeiträume wirksam.",
            "Konzentrierte Formel ermöglicht wirtschaftliche Nutzung und einfache Lagerung.",
          ],
          fr: [
            "Le point de congélation peut être ajusté selon les besoins en mélangeant avec de l'eau à différents ratios.",
            "Protège efficacement toutes les surfaces métalliques, joints et durites sur de longues périodes.",
            "La formule concentrée permet une utilisation économique et un stockage aisé.",
          ],
        },
        standards: "SAE J 1034, TS 3582, BS 6580, ASTM D3306",
        packaging: ["3 L", "20 L", "200 L"],
      },
    },
  },
  Gresler: {
    title: "Gresler",
    products: [
      { slug: "Gres-Beyaz",   name: "Kalsiyum Beyaz Gres",         image: "/model-oils/images/hi-tech/gresler/Beyaz.png" },
      { slug: "Gres-Kirmizi", name: "Kalsiyum Kırmızı Gres",       image: "/model-oils/images/hi-tech/gresler/K%C4%B1rm%C4%B1z%C4%B1.png" },
      { slug: "Lithium-Gres", name: "Lityum EP Gres",              image: "/model-oils/images/hi-tech/gresler/Lithium.png" },
      { slug: "Gres-Yesil",   name: "Kalsiyum Kauçuk Yeşil Gres", image: "/model-oils/images/hi-tech/gresler/Ye%C5%9Fil.png" },
    ],
    details: {
      "Gres-Beyaz": {
        description: {
          tr: "HI-TECH KALSİYUM BEYAZ GRES, kalsiyum esaslı çok amaçlı bir gres yağıdır. Plastik ve kauçuk parçalara uyumludur; renk gerektiren uygulamalarda ve gıda sektöründe kullanılabilecek şekilde formüle edilmiştir. Geniş sıcaklık aralığında stabil yapısını korur.",
          en: "HI-TECH KALSİYUM BEYAZ GRES, a calcium-based multi-purpose grease. Compatible with plastic and rubber parts; formulated for use in colour-critical applications and the food industry. Maintains a stable structure across a wide temperature range.",
          ru: "HI-TECH KALSİYUM BEYAZ GRES, многоцелевая смазка на кальциевой основе. Совместима с пластиковыми и резиновыми деталями; разработана для применения в областях, где важен цвет, и в пищевой промышленности. Сохраняет стабильную структуру в широком температурном диапазоне.",
          fa: "HI-TECH KALSİYUM BEYAZ GRES، یک گریس چند منظوره بر پایه کلسیم است. با قطعات پلاستیکی و لاستیکی سازگار است؛ برای استفاده در کاربردهایی که رنگ اهمیت دارد و در صنایع غذایی فرموله شده است. در محدوده دمایی گسترده ساختار پایداری را حفظ می‌کند.",
          ar: "HI-TECH KALSİYUM BEYAZ GRES، شحم متعدد الأغراض على أساس الكالسيوم. متوافق مع الأجزاء البلاستيكية والمطاطية؛ مُصاغ للاستخدام في التطبيقات الحساسة للون وفي صناعة الأغذية. يحافظ على بنية مستقرة عبر نطاق درجات حرارة واسع.",
          de: "HI-TECH KALSİYUM BEYAZ GRES, ein kalziumbasiertes Mehrzweckfett. Kompatibel mit Kunststoff- und Gummiteilen; formuliert für den Einsatz in farbanforderungsintensiven Anwendungen und der Lebensmittelindustrie. Behält seine stabile Struktur über einen weiten Temperaturbereich.",
          fr: "HI-TECH KALSİYUM BEYAZ GRES, une graisse polyvalente à base de calcium. Compatible avec les pièces en plastique et en caoutchouc ; formulée pour une utilisation dans les applications nécessitant une couleur spécifique et dans l'industrie alimentaire. Conserve une structure stable sur une large plage de températures.",
        },
        features: {
          tr: [
            "Plastik, kauçuk ve metal yüzeylere uyumludur.",
            "Nem, su ve korozyona karşı etkili koruma sağlar.",
            "Geniş sıcaklık aralığında (-30°C ile +120°C) stabil kalır.",
          ],
          en: [
            "Compatible with plastic, rubber and metal surfaces.",
            "Provides effective protection against moisture, water and corrosion.",
            "Remains stable across a wide temperature range (-30°C to +120°C).",
          ],
          ru: [
            "Совместима с пластиковыми, резиновыми и металлическими поверхностями.",
            "Обеспечивает эффективную защиту от влаги, воды и коррозии.",
            "Остаётся стабильной в широком диапазоне температур (от -30°C до +120°C).",
          ],
          fa: [
            "با سطوح پلاستیکی، لاستیکی و فلزی سازگار است.",
            "در برابر رطوبت، آب و خوردگی حفاظت موثر فراهم می‌کند.",
            "در محدوده دمایی گسترده (۳۰- تا ۱۲۰+ درجه سانتیگراد) پایدار می‌ماند.",
          ],
          ar: [
            "متوافق مع الأسطح البلاستيكية والمطاطية والمعدنية.",
            "يوفر حماية فعّالة من الرطوبة والماء والتآكل.",
            "يبقى مستقراً عبر نطاق درجات حرارة واسع (من -30°C إلى +120°C).",
          ],
          de: [
            "Kompatibel mit Kunststoff-, Gummi- und Metalloberflächen.",
            "Bietet wirksamen Schutz gegen Feuchtigkeit, Wasser und Korrosion.",
            "Bleibt über einen weiten Temperaturbereich (-30°C bis +120°C) stabil.",
          ],
          fr: [
            "Compatible avec les surfaces en plastique, en caoutchouc et en métal.",
            "Assure une protection efficace contre l'humidité, l'eau et la corrosion.",
            "Reste stable sur une large plage de températures (-30°C à +120°C).",
          ],
        },
        standards: "DIN 51502, NLGI 2",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Gres-Kirmizi": {
        description: {
          tr: "HI-TECH KALSİYUM KIRMIZI GRES, kalsiyum esaslı yüksek sıcaklık gresidir. Ağır hizmet koşullarında çalışan rulman, mafsallı mil ve şasi bileşenlerinde üstün koruma sağlar. Yüksek basınç ve darbe yüklerine dayanıklı yapısıyla öne çıkar.",
          en: "HI-TECH KALSİYUM KIRMIZI GRES, a calcium-based high-temperature grease. Provides superior protection for bearings, universal shafts and chassis components operating under heavy-duty conditions. Distinguished by its resistance to high pressure and impact loads.",
          ru: "HI-TECH KALSİYUM KIRMIZI GRES, высокотемпературная смазка на кальциевой основе. Обеспечивает превосходную защиту подшипников, карданных валов и компонентов шасси, работающих в условиях тяжёлых нагрузок. Выделяется стойкостью к высокому давлению и ударным нагрузкам.",
          fa: "HI-TECH KALSİYUM KIRMIZI GRES، یک گریس دمای بالا بر پایه کلسیم است. برای بلبرینگ‌ها، شفت‌های مفصلی و اجزای شاسی که در شرایط سنگین کار می‌کنند، حفاظت برتر فراهم می‌کند. با مقاومت در برابر فشار بالا و بارهای ضربه‌ای متمایز است.",
          ar: "HI-TECH KALSİYUM KIRMIZI GRES، شحم عالي الحرارة على أساس الكالسيوم. يوفر حماية فائقة للمحامل ومحاور التوجيه ومكونات الهيكل العاملة في ظروف الحمل الثقيل. يتميز بمقاومته للضغط العالي وأحمال الصدمات.",
          de: "HI-TECH KALSİYUM KIRMIZI GRES, ein kalziumbasiertes Hochtemperaturfett. Bietet überlegenen Schutz für Lager, Gelenkwellen und Fahrwerkskomponenten, die unter schweren Betriebsbedingungen arbeiten. Zeichnet sich durch seine Beständigkeit gegen hohen Druck und Stoßbelastungen aus.",
          fr: "HI-TECH KALSİYUM KIRMIZI GRES, une graisse haute température à base de calcium. Assure une protection supérieure pour les roulements, les arbres universels et les composants de châssis fonctionnant dans des conditions de service intensif. Se distingue par sa résistance aux fortes pressions et aux chocs.",
        },
        features: {
          tr: [
            "Yüksek sıcaklık dayanımı sayesinde +180°C'ye kadar etkili koruma sağlar.",
            "Ağır yük ve darbe koşullarında mükemmel film mukavemeti sunar.",
            "Su direnci yüksektir; yağmur ve nem altında yerinden ayrılmaz.",
          ],
          en: [
            "High temperature resistance provides effective protection up to +180°C.",
            "Delivers excellent film strength under heavy load and impact conditions.",
            "High water resistance; does not wash out in rain or under humid conditions.",
          ],
          ru: [
            "Высокая термостойкость обеспечивает эффективную защиту до +180°C.",
            "Обеспечивает отличную прочность масляной плёнки в условиях тяжёлых нагрузок и ударов.",
            "Высокое сопротивление воде; не вымывается под дождём и во влажных условиях.",
          ],
          fa: [
            "مقاومت در دمای بالا تا ۱۸۰+ درجه سانتیگراد حفاظت موثر فراهم می‌کند.",
            "در شرایط بار سنگین و ضربه، استحکام فیلم عالی ارائه می‌دهد.",
            "مقاومت بالا در برابر آب؛ در باران یا شرایط مرطوب از محل خود جابجا نمی‌شود.",
          ],
          ar: [
            "تتيح مقاومة الحرارة العالية حماية فعّالة حتى +180°C.",
            "توفر مقاومة فيلم ممتازة في ظروف الحمل الثقيل والصدمات.",
            "مقاومة عالية للماء؛ لا تُغسل بالمطر أو في الأجواء الرطبة.",
          ],
          de: [
            "Hohe Temperaturbeständigkeit bietet wirksamen Schutz bis +180°C.",
            "Liefert ausgezeichnete Filmfestigkeit unter schweren Last- und Stoßbedingungen.",
            "Hoher Wasserbeständigkeit; wird nicht durch Regen oder Feuchtigkeit herausgewaschen.",
          ],
          fr: [
            "La résistance à la haute température assure une protection efficace jusqu'à +180°C.",
            "Offre une excellente résistance du film sous des conditions de charge lourde et d'impact.",
            "Haute résistance à l'eau ; ne se rince pas sous la pluie ou dans des conditions humides.",
          ],
        },
        standards: "DIN 51502, NLGI 2, ISO 6743-9",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Lithium-Gres": {
        description: {
          tr: "HI-TECH LİTYUM EP GRES, lityum sabunlu EP (Extreme Pressure) katkılı çok amaçlı bir gres yağıdır. Otomotiv, endüstriyel ve tarım ekipmanlarının rulman, dişli ve şasi noktalarında güvenilir yağlama sağlar. Geniş kullanım alanıyla filo ve bakım hizmetleri için ideal bir tercihtir.",
          en: "HI-TECH LİTYUM EP GRES, a multi-purpose grease with lithium soap and EP (Extreme Pressure) additives. Provides reliable lubrication at the bearings, gears and chassis points of automotive, industrial and agricultural equipment. With its wide range of applications, it is an ideal choice for fleet and maintenance services.",
          ru: "HI-TECH LİTYUM EP GRES, многоцелевая смазка с литиевым мылом и добавками EP (экстремальное давление). Обеспечивает надёжную смазку подшипников, шестерён и точек шасси автомобильного, промышленного и сельскохозяйственного оборудования. Широкий спектр применения делает её идеальным выбором для флотских и технических служб.",
          fa: "HI-TECH LİTYUM EP GRES، یک گریس چند منظوره با صابون لیتیم و افزودنی‌های EP (فشار شدید) است. روانکاری قابل اعتماد در نقاط بلبرینگ، دنده و شاسی تجهیزات خودرویی، صنعتی و کشاورزی فراهم می‌کند. با محدوده کاربرد گسترده خود، انتخاب ایده‌آل برای خدمات ناوگان و نگهداری است.",
          ar: "HI-TECH LİTYUM EP GRES، شحم متعدد الأغراض بصابون الليثيوم ومضافات EP (الضغط الشديد). يوفر تشحيماً موثوقاً عند المحامل والتروس ونقاط الهيكل في معدات السيارات والصناعة والزراعة. بفضل نطاق تطبيقه الواسع، يُعدّ خياراً مثالياً لخدمات الأسطول والصيانة.",
          de: "HI-TECH LİTYUM EP GRES, ein Mehrzweckfett mit Lithiumseife und EP-Additiven (Extreme Pressure). Bietet zuverlässige Schmierung an den Lagern, Zahnrädern und Fahrwerkspunkten von Automobil-, Industrie- und Landwirtschaftsgeräten. Mit seinem breiten Anwendungsspektrum ist es die ideale Wahl für Flottenunternehmen und Wartungsdienste.",
          fr: "HI-TECH LİTYUM EP GRES, une graisse polyvalente avec savon de lithium et additifs EP (Extreme Pressure). Assure une lubrification fiable aux roulements, engrenages et points de châssis des équipements automobiles, industriels et agricoles. Avec sa large gamme d'applications, c'est un choix idéal pour les services de flotte et d'entretien.",
        },
        features: {
          tr: [
            "Rulmanlar, şasi noktaları ve genel endüstriyel uygulamalar için çok amaçlı kullanım.",
            "Oksidasyona ve kimyasal bozunmaya karşı güçlü koruma sağlar.",
            "Uzun servis ömrüyle yağlama aralıklarını uzatır, bakım maliyetini düşürür.",
          ],
          en: [
            "Multi-purpose use for bearings, chassis points and general industrial applications.",
            "Provides strong protection against oxidation and chemical degradation.",
            "Long service life extends lubrication intervals and reduces maintenance costs.",
          ],
          ru: [
            "Универсальное применение для подшипников, точек шасси и общих промышленных применений.",
            "Обеспечивает надёжную защиту от окисления и химического разложения.",
            "Длительный срок службы увеличивает интервалы смазки и снижает затраты на техническое обслуживание.",
          ],
          fa: [
            "استفاده چند منظوره برای بلبرینگ‌ها، نقاط شاسی و کاربردهای صنعتی عمومی.",
            "حفاظت قوی در برابر اکسیداسیون و تخریب شیمیایی فراهم می‌کند.",
            "عمر سرویس طولانی فواصل روانکاری را افزایش می‌دهد و هزینه‌های نگهداری را کاهش می‌دهد.",
          ],
          ar: [
            "استخدام متعدد الأغراض للمحامل ونقاط الهيكل والتطبيقات الصناعية العامة.",
            "يوفر حماية قوية من الأكسدة والتدهور الكيميائي.",
            "العمر الافتراضي الطويل يُطيل فترات التشحيم ويُقلّل تكاليف الصيانة.",
          ],
          de: [
            "Universeller Einsatz für Lager, Fahrwerkspunkte und allgemeine industrielle Anwendungen.",
            "Bietet starken Schutz gegen Oxidation und chemischen Abbau.",
            "Lange Nutzungsdauer verlängert die Schmierfristen und senkt die Wartungskosten.",
          ],
          fr: [
            "Usage polyvalent pour les roulements, les points de châssis et les applications industrielles générales.",
            "Offre une protection solide contre l'oxydation et la dégradation chimique.",
            "La longue durée de service étend les intervalles de lubrification et réduit les coûts d'entretien.",
          ],
        },
        standards: "DIN 51502, NLGI 2, ISO 6743-9",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Gres-Yesil": {
        description: {
          tr: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, kalsiyum esaslı kauçuk katkılı özel formüllü bir gres yağıdır. Aşırı yük altında çalışan ekipman ve iş makinelerinin dişli, mafsal ve mil yatakları için özel olarak geliştirilmiştir. Kauçuk ve plastik bileşenlere tam uyumludur.",
          en: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, a specially formulated calcium-based grease with rubber additives. Specially developed for gears, joints and shaft bearings of equipment and machinery operating under extreme loads. Fully compatible with rubber and plastic components.",
          ru: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, специально разработанная смазка на кальциевой основе с каучуковыми добавками. Специально создана для шестерён, шарниров и подшипников валов оборудования и машин, работающих под экстремальными нагрузками. Полностью совместима с резиновыми и пластиковыми компонентами.",
          fa: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES، یک گریس با فرمول خاص بر پایه کلسیم با افزودنی‌های لاستیکی است. به طور خاص برای دنده‌ها، مفاصل و یاتاقان‌های شفت تجهیزات و ماشین‌آلاتی که تحت بارهای شدید کار می‌کنند توسعه یافته است. کاملاً با اجزای لاستیکی و پلاستیکی سازگار است.",
          ar: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES، شحم خاص الصياغة على أساس الكالسيوم مع مضافات مطاطية. مطوَّر خصيصاً للتروس والوصلات ومحامل الأعمدة في المعدات والآليات العاملة تحت أحمال قصوى. متوافق تماماً مع المكونات المطاطية والبلاستيكية.",
          de: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, ein speziell formuliertes kalziumbasiertes Fett mit Kautschukzusätzen. Speziell für Zahnräder, Gelenke und Wellenlager von Geräten und Maschinen entwickelt, die unter extremen Lasten arbeiten. Vollständig kompatibel mit Gummi- und Kunststoffkomponenten.",
          fr: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, une graisse spécialement formulée à base de calcium avec des additifs caoutchouc. Spécialement développée pour les engrenages, les joints et les paliers d'arbres des équipements et machines fonctionnant sous des charges extrêmes. Entièrement compatible avec les composants en caoutchouc et en plastique.",
        },
        features: {
          tr: [
            "MoS₂ katkısı sayesinde metal-metal temasını önler ve aşınmayı azaltır.",
            "Yüksek basınç ve ağır yük koşullarında üstün EP (Extreme Pressure) performansı sunar.",
            "İş makineleri, tarım ekipmanları ve ağır hizmet uygulamaları için idealdir.",
          ],
          en: [
            "MoS₂ additive prevents metal-to-metal contact and reduces wear.",
            "Delivers superior EP (Extreme Pressure) performance under high pressure and heavy load conditions.",
            "Ideal for construction machinery, agricultural equipment and heavy-duty applications.",
          ],
          ru: [
            "Присадка MoS₂ предотвращает металл-металлический контакт и снижает износ.",
            "Обеспечивает превосходные EP-характеристики (экстремальное давление) при высоком давлении и тяжёлых нагрузках.",
            "Идеально подходит для строительной техники, сельскохозяйственного оборудования и тяжёлых условий эксплуатации.",
          ],
          fa: [
            "افزودنی MoS₂ از تماس فلز با فلز جلوگیری می‌کند و سایش را کاهش می‌دهد.",
            "در شرایط فشار بالا و بار سنگین، عملکرد برتر EP (فشار شدید) ارائه می‌دهد.",
            "برای ماشین‌آلات ساختمانی، تجهیزات کشاورزی و کاربردهای سنگین ایده‌آل است.",
          ],
          ar: [
            "مضاف MoS₂ يمنع الاتصال المعدن بالمعدن ويُقلّل التآكل.",
            "يوفر أداءً فائقاً EP (الضغط الشديد) في ظروف الضغط العالي والحمل الثقيل.",
            "مثالي لآليات البناء والمعدات الزراعية وتطبيقات الخدمة الشاقة.",
          ],
          de: [
            "MoS₂-Zusatz verhindert Metall-Metall-Kontakt und reduziert Verschleiß.",
            "Liefert überlegene EP-Leistung (Extreme Pressure) unter Hochdruck- und Schwerlastverhältnissen.",
            "Ideal für Baumaschinen, Landwirtschaftsgeräte und Schwerlastanwendungen.",
          ],
          fr: [
            "L'additif MoS₂ prévient le contact métal sur métal et réduit l'usure.",
            "Offre des performances EP (Extreme Pressure) supérieures dans des conditions de haute pression et de charge élevée.",
            "Idéal pour les engins de chantier, le matériel agricole et les applications de service intensif.",
          ],
        },
        standards: "DIN 51502, NLGI 2, ISO 6743-9, MIL-PRF-2105",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
    },
  },
  "Endustriyel-Yaglar": {
    title: "Endüstriyel Yağlar",
    products: [
      { slug: "Hydra-32",  name: "Hydra 32 Hidrolik Yağ", image: "/model-oils/images/hi-tech/end%C3%BCstriyel/Hydra32.png" },
      { slug: "Hydra-46",  name: "Hydra 46 Hidrolik Yağ", image: "/model-oils/images/hi-tech/end%C3%BCstriyel/Hydra46.png" },
      { slug: "Hydra-68",  name: "Hydra 68 Hidrolik Yağ", image: "/model-oils/images/hi-tech/end%C3%BCstriyel/Hydra68.png" },
      { slug: "Kesme-Yagi", name: "Kesme Yağı",           image: "/model-oils/images/hi-tech/end%C3%BCstriyel/Kesme.png" },
    ],
    details: {
      "Hydra-32": {
        description: {
          tr: "HI-TECH HYDRA 32 HİDROLİK YAĞ, ISO VG 32 viskozite kademesinde yüksek kaliteli anti-wear hidrolik yağıdır. Düşük viskoziteli sistemlerde, hafif yük hidrolik pompa ve motorlarında mükemmel performans sunar. Uzun sistem ömrü ve temiz çalışma için özel olarak formüle edilmiştir.",
          en: "HI-TECH HYDRA 32 HİDROLİK YAĞ, a high-quality anti-wear hydraulic oil in ISO VG 32 viscosity grade. Delivers excellent performance in low-viscosity systems and light-load hydraulic pumps and motors. Specially formulated for long system life and clean operation.",
          ru: "HI-TECH HYDRA 32 HİDROLİK YAĞ, высококачественное противоизносное гидравлическое масло класса вязкости ISO VG 32. Обеспечивает отличную работу в низковязкостных системах, лёгких гидронасосах и моторах. Специально разработано для долгого срока службы системы и чистой работы.",
          fa: "HI-TECH HYDRA 32 HİDROLİK YAĞ، یک روغن هیدرولیک با کیفیت بالا و ضد سایش در گرید ویسکوزیته ISO VG 32 است. در سیستم‌های با ویسکوزیته پایین و پمپ‌ها و موتورهای هیدرولیک با بار سبک عملکرد عالی ارائه می‌دهد. به طور خاص برای عمر طولانی سیستم و عملکرد تمیز فرموله شده است.",
          ar: "HI-TECH HYDRA 32 HİDROLİK YAĞ، زيت هيدروليكي مضاد للتآكل عالي الجودة بدرجة لزوجة ISO VG 32. يوفر أداءً ممتازاً في الأنظمة منخفضة اللزوجة والمضخات الهيدروليكية والمحركات ذات الحمل الخفيف. مُصاغ خصيصاً لإطالة عمر النظام والتشغيل النظيف.",
          de: "HI-TECH HYDRA 32 HİDROLİK YAĞ, ein hochwertiges Verschleißschutz-Hydrauliköl der Viskositätsklasse ISO VG 32. Bietet hervorragende Leistung in niedrigviskosen Systemen sowie in leichten Hydraulikpumpen und -motoren. Speziell formuliert für eine lange Systemlebensdauer und sauberen Betrieb.",
          fr: "HI-TECH HYDRA 32 HİDROLİK YAĞ, une huile hydraulique anti-usure de haute qualité en classe de viscosité ISO VG 32. Offre d'excellentes performances dans les systèmes à faible viscosité et les pompes et moteurs hydrauliques à charge légère. Spécialement formulée pour une longue durée de vie du système et un fonctionnement propre.",
        },
        features: {
          tr: [
            "Düşük ısınma ve yüksek verimlilik için optimize edilmiş viskozite-sıcaklık karakteristiği.",
            "Pompa, valf ve silindirlerde aşınmayı önleyen anti-wear katkıları içerir.",
            "Su ve hava ayırma özellikleri sayesinde kavitasyona karşı koruma sağlar.",
          ],
          en: [
            "Optimised viscosity-temperature characteristic for low heat generation and high efficiency.",
            "Contains anti-wear additives that prevent wear in pumps, valves and cylinders.",
            "Water and air separation properties provide protection against cavitation.",
          ],
          ru: [
            "Оптимизированная вязкостно-температурная характеристика для минимального тепловыделения и высокой эффективности.",
            "Содержит противоизносные присадки, предотвращающие износ насосов, клапанов и цилиндров.",
            "Свойства разделения воды и воздуха обеспечивают защиту от кавитации.",
          ],
          fa: [
            "ویژگی ویسکوزیته-دما برای تولید گرمای کم و کارایی بالا بهینه شده است.",
            "حاوی افزودنی‌های ضد سایش است که از فرسایش در پمپ‌ها، شیرها و سیلندرها جلوگیری می‌کنند.",
            "خواص جداسازی آب و هوا در برابر کاویتاسیون محافظت می‌کند.",
          ],
          ar: [
            "خاصية اللزوجة-الحرارة مُحسَّنة لتوليد حرارة منخفض وكفاءة عالية.",
            "يحتوي على مضافات مضادة للتآكل تمنع التلف في المضخات والصمامات والأسطوانات.",
            "خصائص فصل الماء والهواء توفر الحماية من التجويف.",
          ],
          de: [
            "Optimiertes Viskosität-Temperatur-Verhalten für geringe Wärmeentwicklung und hohe Effizienz.",
            "Enthält Verschleißschutzadditive, die Verschleiß in Pumpen, Ventilen und Zylindern verhindern.",
            "Wasser- und Luftabscheideigenschaften bieten Schutz vor Kavitation.",
          ],
          fr: [
            "Caractéristique viscosité-température optimisée pour une faible génération de chaleur et une haute efficacité.",
            "Contient des additifs anti-usure qui préviennent l'usure dans les pompes, vannes et cylindres.",
            "Les propriétés de séparation eau-air offrent une protection contre la cavitation.",
          ],
        },
        standards: "ISO VG 32, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Hydra-46": {
        description: {
          tr: "HI-TECH HYDRA 46 HİDROLİK YAĞ, ISO VG 46 viskozite kademesinde çok amaçlı endüstriyel hidrolik yağıdır. İnşaat makineleri, tarım ekipmanları ve endüstriyel hidrolik sistemlerde en yaygın kullanılan viskozite kademesidir. Üstün termal stabilite ve uzun servis ömrü sağlar.",
          en: "HI-TECH HYDRA 46 HİDROLİK YAĞ, a multi-purpose industrial hydraulic oil in ISO VG 46 viscosity grade. The most widely used viscosity grade in construction machinery, agricultural equipment and industrial hydraulic systems. Provides superior thermal stability and long service life.",
          ru: "HI-TECH HYDRA 46 HİDROLİK YAĞ, многоцелевое промышленное гидравлическое масло класса вязкости ISO VG 46. Наиболее распространённый класс вязкости в строительной технике, сельскохозяйственном оборудовании и промышленных гидравлических системах. Обеспечивает превосходную термостабильность и длительный срок службы.",
          fa: "HI-TECH HYDRA 46 HİDROLİK YAĞ، یک روغن هیدرولیک صنعتی چند منظوره در گرید ویسکوزیته ISO VG 46 است. پرکاربردترین گرید ویسکوزیته در ماشین‌آلات ساختمانی، تجهیزات کشاورزی و سیستم‌های هیدرولیک صنعتی. پایداری حرارتی برتر و عمر سرویس طولانی فراهم می‌کند.",
          ar: "HI-TECH HYDRA 46 HİDROLİK YAĞ، زيت هيدروليكي صناعي متعدد الأغراض بدرجة لزوجة ISO VG 46. درجة اللزوجة الأكثر استخداماً في آليات البناء ومعدات الزراعة والأنظمة الهيدروليكية الصناعية. يوفر ثباتاً حرارياً فائقاً وعمراً تشغيلياً طويلاً.",
          de: "HI-TECH HYDRA 46 HİDROLİK YAĞ, ein Mehrzweck-Industriehydrauliköl der Viskositätsklasse ISO VG 46. Die am häufigsten verwendete Viskositätsklasse in Baumaschinen, Landwirtschaftsgeräten und industriellen Hydrauliksystemen. Bietet überlegene thermische Stabilität und lange Nutzungsdauer.",
          fr: "HI-TECH HYDRA 46 HİDROLİK YAĞ, une huile hydraulique industrielle polyvalente en classe de viscosité ISO VG 46. La classe de viscosité la plus répandue dans les engins de chantier, le matériel agricole et les systèmes hydrauliques industriels. Assure une stabilité thermique supérieure et une longue durée de service.",
        },
        features: {
          tr: [
            "Geniş çalışma sıcaklığı aralığında stabil viskozite özelliği sunar.",
            "Yüksek aşınma koruması ile pompa ve hidrolik bileşenlerin ömrünü uzatır.",
            "Korozyon ve oksidasyon önleyici katkılarla sistem bütünlüğünü korur.",
          ],
          en: [
            "Provides stable viscosity across a wide operating temperature range.",
            "High wear protection extends the service life of pumps and hydraulic components.",
            "Corrosion and oxidation inhibiting additives preserve system integrity.",
          ],
          ru: [
            "Обеспечивает стабильную вязкость в широком диапазоне рабочих температур.",
            "Высокая противоизносная защита продлевает срок службы насосов и гидравлических компонентов.",
            "Ингибиторы коррозии и окисления сохраняют целостность системы.",
          ],
          fa: [
            "در محدوده دمای کاری گسترده، ویسکوزیته پایدار ارائه می‌دهد.",
            "حفاظت بالا در برابر سایش، عمر پمپ‌ها و اجزای هیدرولیک را افزایش می‌دهد.",
            "افزودنی‌های ضد خوردگی و ضد اکسیداسیون یکپارچگی سیستم را حفظ می‌کنند.",
          ],
          ar: [
            "توفر لزوجة مستقرة عبر نطاق واسع من درجات الحرارة التشغيلية.",
            "الحماية العالية من التآكل تُطيل عمر المضخات والمكونات الهيدروليكية.",
            "المضافات المثبطة للتآكل والأكسدة تحافظ على سلامة النظام.",
          ],
          de: [
            "Bietet stabile Viskosität über einen breiten Betriebstemperaturbereich.",
            "Hoher Verschleißschutz verlängert die Nutzungsdauer von Pumpen und Hydraulikkomponenten.",
            "Korrosions- und Oxidationsinhibitoren-Additive erhalten die Systemintegrität.",
          ],
          fr: [
            "Assure une viscosité stable sur une large plage de températures de fonctionnement.",
            "La haute protection anti-usure prolonge la durée de vie des pompes et des composants hydrauliques.",
            "Les additifs inhibiteurs de corrosion et d'oxydation préservent l'intégrité du système.",
          ],
        },
        standards: "ISO VG 46, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Hydra-68": {
        description: {
          tr: "HI-TECH HYDRA 68 HİDROLİK YAĞ, ISO VG 68 viskozite kademesinde ağır hizmet endüstriyel hidrolik yağıdır. Yüksek basınçlı sistemlerde, ağır yük altında çalışan preslerde ve büyük hacimli hidrolik ekipmanlarda üstün koruma sağlar. Termal bozunmaya karşı geliştirilmiş direnci ile öne çıkar.",
          en: "HI-TECH HYDRA 68 HİDROLİK YAĞ, a heavy-duty industrial hydraulic oil in ISO VG 68 viscosity grade. Provides superior protection in high-pressure systems, presses operating under heavy loads and large-volume hydraulic equipment. Distinguished by its enhanced resistance to thermal degradation.",
          ru: "HI-TECH HYDRA 68 HİDROLİK YAĞ, тяжёлое промышленное гидравлическое масло класса вязкости ISO VG 68. Обеспечивает превосходную защиту в высокодавленческих системах, прессах под тяжёлыми нагрузками и крупногабаритном гидравлическом оборудовании. Выделяется повышенной стойкостью к термическому разложению.",
          fa: "HI-TECH HYDRA 68 HİDROLİK YAĞ، یک روغن هیدرولیک صنعتی سنگین در گرید ویسکوزیته ISO VG 68 است. در سیستم‌های پرفشار، پرس‌هایی که تحت بارهای سنگین کار می‌کنند و تجهیزات هیدرولیک با حجم زیاد، حفاظت برتر فراهم می‌کند. با مقاومت بهبودیافته در برابر تخریب حرارتی متمایز است.",
          ar: "HI-TECH HYDRA 68 HİDROLİK YAĞ، زيت هيدروليكي صناعي ثقيل بدرجة لزوجة ISO VG 68. يوفر حماية فائقة في الأنظمة عالية الضغط والمكابس العاملة تحت أحمال ثقيلة والمعدات الهيدروليكية ذات الحجم الكبير. يتميز بمقاومته المحسّنة للتدهور الحراري.",
          de: "HI-TECH HYDRA 68 HİDROLİK YAĞ, ein Schwerlast-Industriehydrauliköl der Viskositätsklasse ISO VG 68. Bietet überlegenen Schutz in Hochdrucksystemen, unter schwerer Last arbeitenden Pressen und großvolumigen Hydraulikgeräten. Zeichnet sich durch seine verbesserte Beständigkeit gegen thermischen Abbau aus.",
          fr: "HI-TECH HYDRA 68 HİDROLİK YAĞ, une huile hydraulique industrielle lourde en classe de viscosité ISO VG 68. Assure une protection supérieure dans les systèmes haute pression, les presses fonctionnant sous charge élevée et les équipements hydrauliques de grand volume. Se distingue par sa résistance accrue à la dégradation thermique.",
        },
        features: {
          tr: [
            "Yüksek viskozite indeksi ile sıcaklık değişimlerinden etkilenmeden stabil kalır.",
            "Ağır yük ve yüksek basınç koşullarında mükemmel film mukavemeti sunar.",
            "Uzun yağ değişim aralıkları ile işletme maliyetini düşürür.",
          ],
          en: [
            "High viscosity index maintains stability regardless of temperature fluctuations.",
            "Delivers excellent film strength under heavy load and high-pressure conditions.",
            "Long oil change intervals reduce operating costs.",
          ],
          ru: [
            "Высокий индекс вязкости обеспечивает стабильность независимо от колебаний температуры.",
            "Обеспечивает отличную прочность масляной плёнки в условиях тяжёлых нагрузок и высокого давления.",
            "Увеличенные интервалы замены масла снижают эксплуатационные расходы.",
          ],
          fa: [
            "اندیس ویسکوزیته بالا بدون توجه به نوسانات دما، پایداری را حفظ می‌کند.",
            "در شرایط بار سنگین و فشار بالا، استحکام فیلم عالی ارائه می‌دهد.",
            "فواصل طولانی تعویض روغن هزینه‌های بهره‌برداری را کاهش می‌دهد.",
          ],
          ar: [
            "مؤشر اللزوجة العالي يحافظ على الاستقرار بغض النظر عن تقلبات درجات الحرارة.",
            "يوفر مقاومة فيلم ممتازة في ظروف الحمل الثقيل والضغط العالي.",
            "فترات تغيير الزيت الطويلة تُقلّل تكاليف التشغيل.",
          ],
          de: [
            "Hoher Viskositätsindex hält die Stabilität unabhängig von Temperaturschwankungen aufrecht.",
            "Liefert ausgezeichnete Filmfestigkeit unter schweren Last- und Hochdruckbedingungen.",
            "Lange Ölwechselintervalle senken die Betriebskosten.",
          ],
          fr: [
            "L'indice de viscosité élevé maintient la stabilité indépendamment des fluctuations de température.",
            "Offre une excellente résistance du film dans des conditions de charge élevée et de haute pression.",
            "Les longs intervalles de vidange réduisent les coûts d'exploitation.",
          ],
        },
        standards: "ISO VG 68, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Kesme-Yagi": {
        description: {
          tr: "HI-TECH KESME YAĞI, metal işleme operasyonlarında yüksek yağlama ve soğutma performansı sunan özel formüllü bir kesme yağıdır. Tornalama, frezeleme, matkap ve diş açma işlemlerinde takım ömrünü uzatır, yüzey kalitesini artırır ve korozyon oluşumunu engeller.",
          en: "HI-TECH KESME YAĞI, a specially formulated cutting oil offering high lubrication and cooling performance in metal machining operations. Extends tool life, improves surface quality and prevents corrosion in turning, milling, drilling and tapping operations.",
          ru: "HI-TECH KESME YAĞI, специально разработанное масло для резки с высокими смазочными и охлаждающими характеристиками при металлообработке. Продлевает срок службы инструмента, улучшает качество поверхности и предотвращает коррозию при точении, фрезеровании, сверлении и нарезании резьбы.",
          fa: "HI-TECH KESME YAĞI، یک روغن برش با فرمول خاص است که در عملیات ماشینکاری فلز، عملکرد روانکاری و خنک‌کاری بالایی ارائه می‌دهد. عمر ابزار را افزایش می‌دهد، کیفیت سطح را بهبود می‌بخشد و از خوردگی در عملیات تراشکاری، فرزکاری، حفاری و رزوه‌زنی جلوگیری می‌کند.",
          ar: "HI-TECH KESME YAĞI، زيت قطع خاص الصياغة يوفر أداءً عالياً للتشحيم والتبريد في عمليات التشغيل الآلي للمعادن. يُطيل عمر الأدوات ويحسّن جودة السطح ويمنع التآكل في عمليات الخراطة والتفريز والحفر وقطع الخيوط.",
          de: "HI-TECH KESME YAĞI, ein speziell formuliertes Schneidöl mit hoher Schmier- und Kühlleistung bei der Metallbearbeitung. Verlängert die Werkzeugstandzeit, verbessert die Oberflächenqualität und verhindert Korrosion beim Drehen, Fräsen, Bohren und Gewindeschneiden.",
          fr: "HI-TECH KESME YAĞI, une huile de coupe spécialement formulée offrant de hautes performances de lubrification et de refroidissement lors des opérations d'usinage des métaux. Prolonge la durée de vie des outils, améliore la qualité de surface et prévient la corrosion dans les opérations de tournage, fraisage, perçage et taraudage.",
        },
        features: {
          tr: [
            "Yüksek yağlayıcılık özelliği ile kesici takım ömrünü önemli ölçüde uzatır.",
            "Etkili soğutma kapasitesi ile yüzey pürüzlülüğünü azaltır ve işleme kalitesini artırır.",
            "Korozyon önleyici formülü ile iş parçası ve tezgahı paslanmaya karşı korur.",
          ],
          en: [
            "High lubricity significantly extends cutting tool life.",
            "Effective cooling capacity reduces surface roughness and improves machining quality.",
            "Anti-corrosion formula protects the workpiece and machine from rust.",
          ],
          ru: [
            "Высокая смазывающая способность значительно продлевает срок службы режущего инструмента.",
            "Эффективная охлаждающая способность снижает шероховатость поверхности и улучшает качество обработки.",
            "Противокоррозионная формула защищает заготовку и станок от ржавчины.",
          ],
          fa: [
            "قابلیت روانکاری بالا به طور قابل توجهی عمر ابزار برش را افزایش می‌دهد.",
            "ظرفیت خنک‌کاری موثر زبری سطح را کاهش می‌دهد و کیفیت ماشینکاری را بهبود می‌بخشد.",
            "فرمول ضد خوردگی از قطعه کار و ماشین در برابر زنگ محافظت می‌کند.",
          ],
          ar: [
            "الزلاقة العالية تُطيل بشكل ملحوظ عمر أدوات القطع.",
            "قدرة التبريد الفعّالة تُقلّل خشونة السطح وتحسّن جودة التشغيل الآلي.",
            "الصيغة المضادة للتآكل تحمي قطعة العمل والماكينة من الصدأ.",
          ],
          de: [
            "Hohe Schmierfähigkeit verlängert die Standzeit von Zerspanungswerkzeugen erheblich.",
            "Effektive Kühlkapazität reduziert die Oberflächenrauheit und verbessert die Bearbeitungsqualität.",
            "Korrosionsschutzformel schützt Werkstück und Maschine vor Rost.",
          ],
          fr: [
            "La grande onctuosité prolonge considérablement la durée de vie des outils de coupe.",
            "La capacité de refroidissement efficace réduit la rugosité de surface et améliore la qualité d'usinage.",
            "La formule anti-corrosion protège la pièce et la machine contre la rouille.",
          ],
        },
        standards: "ISO 6743-7, DIN 51385",
        packaging: ["20 L", "200 L"],
      },
    },
  },
  "Deniz-Yaglari": {
    title: "Deniz Yağları",
    products: [
      { slug: "Marine-4T-10W30", name: "Marine 4T 10W-30", image: "/model-oils/images/hi-tech/deniz/marine1030.png" },
      { slug: "Marine-2T",       name: "Marine 2T TC-W3",  image: "/model-oils/images/hi-tech/deniz/marine2t.png" },
      { slug: "Marine-4T-25W40", name: "Marine 4T 25W-40", image: "/model-oils/images/hi-tech/deniz/marine4t.png" },
    ],
    details: {
      "Marine-4T-10W30": {
        description: {
          tr: "HI-TECH MARINE 4T 10W-30, 4 zamanlı dıştan takma deniz motorları için özel olarak formüle edilmiş yüksek performanslı bir motor yağıdır. Denizcilikte karşılaşılan ağır hava koşullarına ve deniz suyunun korozif ortamına karşı üstün koruma sağlar.",
          en: "HI-TECH MARINE 4T 10W-30, a high-performance engine oil specially formulated for 4-stroke outboard marine engines. Provides superior protection against the harsh weather conditions encountered at sea and the corrosive environment of seawater.",
          ru: "HI-TECH MARINE 4T 10W-30, высокоэффективное моторное масло, специально разработанное для 4-тактных подвесных морских двигателей. Обеспечивает превосходную защиту от суровых погодных условий на море и агрессивной среды морской воды.",
          fa: "HI-TECH MARINE 4T 10W-30، یک روغن موتور با عملکرد بالا است که به طور خاص برای موتورهای دریایی خارجی 4 زمانه فرموله شده است. در برابر شرایط آب‌وهوایی سخت دریا و محیط خورنده آب دریا، حفاظت برتر فراهم می‌کند.",
          ar: "HI-TECH MARINE 4T 10W-30، زيت محرك عالي الأداء مُصاغ خصيصاً لمحركات البحر الخارجية رباعية الأشواط. يوفر حماية فائقة من الأحوال الجوية القاسية التي تواجهها في البحر والبيئة المسبّبة للتآكل لمياه البحر.",
          de: "HI-TECH MARINE 4T 10W-30, ein leistungsstarkes Motoröl, das speziell für 4-Takt-Außenbordmotoren entwickelt wurde. Bietet überlegenen Schutz gegen die rauen Wetterbedingungen auf See und die korrosive Umgebung des Meereswassers.",
          fr: "HI-TECH MARINE 4T 10W-30, une huile moteur haute performance spécialement formulée pour les moteurs marins hors-bord 4 temps. Assure une protection supérieure contre les conditions météorologiques difficiles rencontrées en mer et l'environnement corrosif de l'eau de mer.",
        },
        features: {
          tr: [
            "4 zamanlı dıştan takma deniz motorları için özel olarak geliştirilmiştir.",
            "Tuzlu su ve nem ortamında korozyon ve paslanmaya karşı güçlü koruma sağlar.",
            "Yüksek sıcaklık ve yüksek devirde çalışan motorlarda kararlı viskozite sunar.",
          ],
          en: [
            "Specially developed for 4-stroke outboard marine engines.",
            "Provides strong protection against corrosion and rust in saltwater and humid environments.",
            "Delivers stable viscosity in engines operating at high temperatures and high speeds.",
          ],
          ru: [
            "Специально разработано для 4-тактных подвесных морских двигателей.",
            "Обеспечивает надёжную защиту от коррозии и ржавчины в солёной воде и влажной среде.",
            "Обеспечивает стабильную вязкость в двигателях, работающих при высоких температурах и высоких оборотах.",
          ],
          fa: [
            "به طور خاص برای موتورهای دریایی خارجی 4 زمانه توسعه یافته است.",
            "در محیط آب شور و مرطوب، حفاظت قوی در برابر خوردگی و زنگ‌زدگی فراهم می‌کند.",
            "در موتورهایی که در دماهای بالا و دورهای بالا کار می‌کنند، ویسکوزیته پایدار ارائه می‌دهد.",
          ],
          ar: [
            "مطوَّر خصيصاً لمحركات البحر الخارجية رباعية الأشواط.",
            "يوفر حماية قوية من التآكل والصدأ في بيئات المياه المالحة والرطبة.",
            "يوفر لزوجة مستقرة في المحركات العاملة بدرجات حرارة عالية وسرعات عالية.",
          ],
          de: [
            "Speziell für 4-Takt-Außenbordmotoren entwickelt.",
            "Bietet starken Schutz gegen Korrosion und Rost in Salzwasser- und Feuchtigkeitsumgebungen.",
            "Liefert stabile Viskosität in Motoren, die bei hohen Temperaturen und hohen Drehzahlen arbeiten.",
          ],
          fr: [
            "Spécialement développée pour les moteurs marins hors-bord 4 temps.",
            "Assure une protection solide contre la corrosion et la rouille dans les environnements à l'eau salée et humides.",
            "Offre une viscosité stable dans les moteurs fonctionnant à haute température et à haut régime.",
          ],
        },
        standards: "API SL, JASO MA2, NMMA FC-W",
        packaging: ["1 L", "200 L"],
      },
      "Marine-2T": {
        description: {
          tr: "HI-TECH MARINE 2T TC-W3, NMMA onaylı, 2 zamanlı dıştan takma deniz motorları için tasarlanmış özel bir motor yağıdır. TC-W3 sertifikasyonu ile geniş motor yelpazesinde mükemmel yağlama ve koruma sağlar.",
          en: "HI-TECH MARINE 2T TC-W3, an NMMA approved special engine oil designed for 2-stroke outboard marine engines. TC-W3 certification ensures excellent lubrication and protection across a wide range of engines.",
          ru: "HI-TECH MARINE 2T TC-W3, специальное моторное масло с одобрением NMMA, разработанное для 2-тактных подвесных морских двигателей. Сертификация TC-W3 обеспечивает отличную смазку и защиту в широком ассортименте двигателей.",
          fa: "HI-TECH MARINE 2T TC-W3، یک روغن موتور خاص تأییدشده NMMA است که برای موتورهای دریایی خارجی 2 زمانه طراحی شده است. گواهینامه TC-W3 روانکاری و حفاظت عالی را در طیف وسیعی از موتورها تضمین می‌کند.",
          ar: "HI-TECH MARINE 2T TC-W3، زيت محرك خاص معتمد من NMMA مصمَّم لمحركات البحر الخارجية ثنائية الأشواط. اعتماد TC-W3 يضمن تشحيماً وحماية ممتازين عبر مجموعة واسعة من المحركات.",
          de: "HI-TECH MARINE 2T TC-W3, ein von NMMA zugelassenes Spezialöl für 2-Takt-Außenbordmotoren. TC-W3-Zertifizierung gewährleistet hervorragende Schmierung und Schutz für eine breite Palette von Motoren.",
          fr: "HI-TECH MARINE 2T TC-W3, une huile moteur spéciale approuvée NMMA conçue pour les moteurs marins hors-bord 2 temps. La certification TC-W3 garantit une lubrification et une protection excellentes sur une large gamme de moteurs.",
        },
        features: {
          tr: [
            "NMMA TC-W3 onaylı formül, geniş marka ve model yelpazesinde güvenilir koruma sağlar.",
            "Egzoz ve piston tortulaşmasını minimuma indirerek motoru temiz tutar.",
            "Deniz ortamının agresif koşullarına karşı üstün anti-korozyon özellikleri sunar.",
          ],
          en: [
            "NMMA TC-W3 approved formula provides reliable protection across a wide range of brands and models.",
            "Keeps the engine clean by minimising exhaust and piston deposits.",
            "Offers superior anti-corrosion properties against the aggressive conditions of the marine environment.",
          ],
          ru: [
            "Формула с одобрением NMMA TC-W3 обеспечивает надёжную защиту для широкого ассортимента марок и моделей.",
            "Поддерживает двигатель в чистоте, сводя к минимуму отложения на выхлопе и поршнях.",
            "Обеспечивает превосходные антикоррозионные свойства против агрессивных условий морской среды.",
          ],
          fa: [
            "فرمول تأییدشده NMMA TC-W3 در طیف وسیعی از مارک‌ها و مدل‌ها حفاظت قابل اعتماد فراهم می‌کند.",
            "با به حداقل رساندن رسوبات اگزوز و پیستون، موتور را تمیز نگه می‌دارد.",
            "در برابر شرایط سخت محیط دریا، خواص ضد خوردگی برتر ارائه می‌دهد.",
          ],
          ar: [
            "الصيغة معتمدة NMMA TC-W3 توفر حماية موثوقة عبر مجموعة واسعة من الماركات والموديلات.",
            "يحافظ على نظافة المحرك بتقليل ترسبات العادم والمكبس إلى أدنى حد.",
            "يوفر خصائص مضادة للتآكل فائقة ضد الظروف القاسية لبيئة البحر.",
          ],
          de: [
            "NMMA TC-W3-zugelassene Formel bietet zuverlässigen Schutz für eine breite Palette von Marken und Modellen.",
            "Hält den Motor sauber, indem Abgas- und Kolbenablagerungen minimiert werden.",
            "Bietet überlegene Korrosionsschutzeigenschaften gegen die aggressiven Bedingungen der Meeresumgebung.",
          ],
          fr: [
            "La formule approuvée NMMA TC-W3 assure une protection fiable sur une large gamme de marques et de modèles.",
            "Maintient le moteur propre en minimisant les dépôts d'échappement et sur les pistons.",
            "Offre des propriétés anti-corrosion supérieures contre les conditions agressives du milieu marin.",
          ],
        },
        standards: "NMMA TC-W3, ISO-L-EGD",
        packaging: ["1 L", "200 L"],
      },
      "Marine-4T-25W40": {
        description: {
          tr: "HI-TECH MARINE 4T 25W-40, güçlü 4 zamanlı dıştan takma deniz motorları için yüksek viskoziteli özel formüllü motor yağıdır. Ağır yük altında çalışan yüksek devirli deniz motorlarında üstün koruma ve performans sunar.",
          en: "HI-TECH MARINE 4T 25W-40, a high-viscosity specially formulated engine oil for powerful 4-stroke outboard marine engines. Offers superior protection and performance in high-speed marine engines operating under heavy loads.",
          ru: "HI-TECH MARINE 4T 25W-40, высоковязкое специально разработанное моторное масло для мощных 4-тактных подвесных морских двигателей. Обеспечивает превосходную защиту и производительность высокооборотистых морских двигателей под тяжёлыми нагрузками.",
          fa: "HI-TECH MARINE 4T 25W-40، یک روغن موتور با ویسکوزیته بالا و فرمول خاص برای موتورهای دریایی خارجی 4 زمانه قوی است. در موتورهای دریایی با دور بالا که تحت بارهای سنگین کار می‌کنند، حفاظت و عملکرد برتر ارائه می‌دهد.",
          ar: "HI-TECH MARINE 4T 25W-40، زيت محرك خاص الصياغة عالي اللزوجة لمحركات البحر الخارجية رباعية الأشواط القوية. يوفر حماية وأداءً فائقين في محركات البحر سريعة الدوران العاملة تحت أحمال ثقيلة.",
          de: "HI-TECH MARINE 4T 25W-40, ein hochviskoses, speziell formuliertes Motoröl für leistungsstarke 4-Takt-Außenbordmotoren. Bietet überlegenen Schutz und Leistung in schnelllaufenden Schiffsmotoren unter schwerer Last.",
          fr: "HI-TECH MARINE 4T 25W-40, une huile moteur haute viscosité spécialement formulée pour les puissants moteurs marins hors-bord 4 temps. Offre une protection et des performances supérieures dans les moteurs marins à haut régime fonctionnant sous charge élevée.",
        },
        features: {
          tr: [
            "Yüksek viskozitesi ile büyük güçlü ve yüksek performanslı deniz motorları için idealdir.",
            "Sıcaklık değişimlerinde kararlı yağ filmi oluşturarak motor aşınmasını önler.",
            "Deniz suyu ile temas halinde bile etkin koruma sağlayan özel anti-korozyon katkıları içerir.",
          ],
          en: [
            "High viscosity makes it ideal for large, high-powered and high-performance marine engines.",
            "Forms a stable oil film during temperature changes, preventing engine wear.",
            "Contains special anti-corrosion additives that provide effective protection even on contact with seawater.",
          ],
          ru: [
            "Высокая вязкость делает его идеальным для крупных, высокомощных и высокопроизводительных морских двигателей.",
            "Образует стабильную масляную плёнку при изменениях температуры, предотвращая износ двигателя.",
            "Содержит специальные антикоррозионные присадки, обеспечивающие эффективную защиту даже при контакте с морской водой.",
          ],
          fa: [
            "ویسکوزیته بالا آن را برای موتورهای دریایی بزرگ، قدرتمند و با عملکرد بالا ایده‌آل می‌کند.",
            "در طول تغییرات دما یک فیلم روغن پایدار تشکیل می‌دهد و از فرسودگی موتور جلوگیری می‌کند.",
            "حاوی افزودنی‌های خاص ضد خوردگی است که حتی در تماس با آب دریا نیز حفاظت موثر ارائه می‌دهد.",
          ],
          ar: [
            "اللزوجة العالية تجعله مثالياً لمحركات البحر الكبيرة والقوية وعالية الأداء.",
            "يُشكّل غشاء زيت مستقراً خلال تغيرات درجات الحرارة، مما يمنع تآكل المحرك.",
            "يحتوي على مضافات خاصة مضادة للتآكل توفر حماية فعّالة حتى عند التلامس مع مياه البحر.",
          ],
          de: [
            "Hohe Viskosität macht es ideal für große, hochleistungsfähige Schiffsmotoren.",
            "Bildet bei Temperaturschwankungen einen stabilen Ölfilm und verhindert Motorverschleiß.",
            "Enthält spezielle Korrosionsschutzadditive, die auch bei Kontakt mit Meerwasser wirksamen Schutz bieten.",
          ],
          fr: [
            "La haute viscosité le rend idéal pour les moteurs marins grands, puissants et haute performance.",
            "Forme un film d'huile stable lors des variations de température, prévenant l'usure du moteur.",
            "Contient des additifs anti-corrosion spéciaux qui assurent une protection efficace même au contact de l'eau de mer.",
          ],
        },
        standards: "API SL, JASO MA2, NMMA FC-W",
        packaging: ["1 L", "200 L"],
      },
    },
  },
  "Agir-Hizmet-Motor-Yaglari": {
    title: "Ağır Hizmet Motor Yağları",
    products: [
      { slug: "HD-5W30",   name: "5W-30 Ağır Hizmet Dizel Yağı",  image: "/model-oils/images/hi-tech/ticari/5w30.png" },
      { slug: "HD-10W40",  name: "10W-40 Ağır Hizmet Dizel Yağı", image: "/model-oils/images/hi-tech/ticari/10w40.png" },
      { slug: "HD-15W40",  name: "15W-40 Ağır Hizmet Dizel Yağı", image: "/model-oils/images/hi-tech/ticari/15w40.png" },
      { slug: "SAE-30W",   name: "SAE 30W Monograt Motor Yağı",   image: "/model-oils/images/hi-tech/ticari/sae30w.png" },
      { slug: "SAE-40W",   name: "SAE 40W Monograt Motor Yağı",   image: "/model-oils/images/hi-tech/ticari/sae40w.png" },
      { slug: "SAE-50W",   name: "SAE 50W Monograt Motor Yağı",   image: "/model-oils/images/hi-tech/ticari/sae50w.png" },
    ],
    details: {
      "HD-5W30": {
        description: {
          tr: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, API CK-4 ve ACEA E6/E11 onaylı tam sentetik teknoloji ile üretilmiş en üst seviye ağır hizmet dizel motor yağıdır. Katı emisyon standartlarını karşılayan modern dizel motorlar için özel olarak formüle edilmiştir.",
          en: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, a top-tier heavy-duty diesel engine oil produced with fully synthetic technology, approved by API CK-4 and ACEA E6/E11. Specially formulated for modern diesel engines meeting stringent emission standards.",
          ru: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, высококлассное дизельное масло для тяжёлых условий, произведённое по технологии полного синтеза, одобренное API CK-4 и ACEA E6/E11. Специально разработано для современных дизельных двигателей, соответствующих жёстким стандартам выбросов.",
          fa: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI، یک روغن موتور دیزلی با کیفیت بالا برای خدمات سنگین است که با فناوری تمام سنتتیک تولید شده و توسط API CK-4 و ACEA E6/E11 تأیید شده است. به طور خاص برای موتورهای دیزلی مدرن که استانداردهای سخت انتشار را برآورده می‌کنند فرموله شده است.",
          ar: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI، زيت محرك ديزل ثقيل الخدمة بالمستوى الأعلى مُنتَج بتقنية اصطناعية بالكامل، معتمد من API CK-4 وAECA E6/E11. مُصاغ خصيصاً لمحركات الديزل الحديثة التي تستوفي معايير الانبعاثات الصارمة.",
          de: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, ein erstklassiges Schwerlast-Dieselmotoröl, das mit vollsynthetischer Technologie hergestellt und nach API CK-4 und ACEA E6/E11 zugelassen ist. Speziell formuliert für moderne Dieselmotoren, die strenge Emissionsstandards erfüllen.",
          fr: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, une huile moteur diesel lourde service de premier rang produite avec une technologie entièrement synthétique, approuvée API CK-4 et ACEA E6/E11. Spécialement formulée pour les moteurs diesel modernes respectant des normes d'émission strictes.",
        },
        features: {
          tr: [
            "API CK-4 ve ACEA E6/E11 onayı ile en güncel ağır hizmet dizel motor gereksinimlerini karşılar.",
            "Düşük viskoziteli sentetik formülü ile soğuk çalışmayı kolaylaştırır ve yakıt tasarrufu sağlar.",
            "DPF ve EGR sistemleriyle tam uyumlu; parçacık filtresi ömrünü korur.",
          ],
          en: [
            "API CK-4 and ACEA E6/E11 approval meets the latest heavy-duty diesel engine requirements.",
            "Low-viscosity synthetic formula facilitates cold-weather starting and saves fuel.",
            "Fully compatible with DPF and EGR systems; preserves particulate filter life.",
          ],
          ru: [
            "Одобрение API CK-4 и ACEA E6/E11 соответствует последним требованиям для тяжёлых дизельных двигателей.",
            "Низковязкая синтетическая формула облегчает холодный пуск и экономит топливо.",
            "Полностью совместимо с системами DPF и EGR; сохраняет ресурс сажевого фильтра.",
          ],
          fa: [
            "تأییدیه API CK-4 و ACEA E6/E11 آخرین نیازمندی‌های موتورهای دیزلی سنگین را برآورده می‌کند.",
            "فرمول سنتتیک با ویسکوزیته پایین استارت در هوای سرد را آسان می‌کند و سوخت صرفه‌جویی می‌کند.",
            "کاملاً با سیستم‌های DPF و EGR سازگار است؛ عمر فیلتر ذرات را حفظ می‌کند.",
          ],
          ar: [
            "اعتماد API CK-4 وAECA E6/E11 يستوفي أحدث متطلبات محركات الديزل الثقيل.",
            "الصيغة الاصطناعية منخفضة اللزوجة تُيسّر التشغيل في الطقس البارد وتوفر الوقود.",
            "متوافق تماماً مع أنظمة DPF وEGR؛ يحافظ على عمر فلتر الجسيمات.",
          ],
          de: [
            "API CK-4- und ACEA E6/E11-Zulassung erfüllt die neuesten Anforderungen für schwere Dieselmotoren.",
            "Niedrigviskose synthetische Formel erleichtert den Kaltstart und spart Kraftstoff.",
            "Vollständig kompatibel mit DPF- und EGR-Systemen; schützt die Nutzungsdauer des Partikelfilters.",
          ],
          fr: [
            "L'approbation API CK-4 et ACEA E6/E11 répond aux exigences les plus récentes pour les moteurs diesel lourds.",
            "La formule synthétique à faible viscosité facilite le démarrage par temps froid et économise le carburant.",
            "Entièrement compatible avec les systèmes DPF et EGR ; préserve la durée de vie du filtre à particules.",
          ],
        },
        standards: "API CK-4, ACEA E6/E11, Volvo VDS-4.5, MB 228.51",
        packaging: ["20 L", "200 L"],
      },
      "HD-10W40": {
        description: {
          tr: "HI-TECH 10W-40 AĞIR HİZMET DİZEL YAĞI, API CI-4 ve ACEA E7/E9 onaylı sentetik teknoloji ağır hizmet dizel motor yağıdır. Kamyon, otobüs ve uzun yol araçlarının talepkâr çalışma koşullarında üstün motor koruması sağlar.",
          en: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL, a synthetic-technology heavy-duty diesel engine oil approved by API CI-4 and ACEA E7/E9. Provides superior engine protection under the demanding operating conditions of trucks, buses and long-haul vehicles.",
          ru: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL, дизельное масло для тяжёлых условий на основе синтетической технологии, одобренное API CI-4 и ACEA E7/E9. Обеспечивает превосходную защиту двигателя в тяжёлых условиях эксплуатации грузовиков, автобусов и магистральных автомобилей.",
          fa: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL، یک روغن موتور دیزلی خدمات سنگین با فناوری سنتتیک است که توسط API CI-4 و ACEA E7/E9 تأیید شده است. در شرایط کاری سخت کامیون‌ها، اتوبوس‌ها و خودروهای مسافت طولانی محافظت برتر از موتور ارائه می‌دهد.",
          ar: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL، زيت محرك ديزل ثقيل الخدمة بتقنية اصطناعية معتمد من API CI-4 وACEA E7/E9. يوفر حماية فائقة للمحرك في ظروف التشغيل الصعبة للشاحنات والحافلات ومركبات المسافات الطويلة.",
          de: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL, ein Schwerlast-Dieselmotoröl in Synthesetechnologie, zugelassen nach API CI-4 und ACEA E7/E9. Bietet überlegenen Motorschutz unter den anspruchsvollen Einsatzbedingungen von Lkw, Bussen und Langstreckenfahrzeugen.",
          fr: "HI-TECH 10W-40 HEAVY DUTY DIESEL OIL, une huile moteur diesel lourde service de technologie synthétique, approuvée API CI-4 et ACEA E7/E9. Offre une protection moteur supérieure dans les conditions d'exploitation exigeantes des camions, bus et véhicules longue distance.",
        },
        features: {
          tr: [
            "API CI-4 ve ACEA E7/E9 çift onayı ile geniş araç yelpazesinde güvenilir kullanım imkânı sunar.",
            "Yüksek torku ve uzun mesafeyi göze alarak formüle edilmiş gelişmiş anti-wear katkılar içerir.",
            "Uzun yağ değişim aralıkları ile işletme maliyetini düşürür.",
          ],
          en: [
            "Dual API CI-4 and ACEA E7/E9 approval ensures reliable use across a wide range of vehicles.",
            "Contains advanced anti-wear additives formulated for high torque and long distances.",
            "Long oil-drain intervals reduce operating costs.",
          ],
          ru: [
            "Двойное одобрение API CI-4 и ACEA E7/E9 обеспечивает надёжное применение в широком парке техники.",
            "Содержит современные противоизносные присадки, рассчитанные на высокий крутящий момент и большие пробеги.",
            "Длительные интервалы замены масла снижают эксплуатационные расходы.",
          ],
          fa: [
            "تأییدیه دوگانه API CI-4 و ACEA E7/E9 استفاده مطمئن در طیف گسترده‌ای از خودروها را تضمین می‌کند.",
            "حاوی افزودنی‌های پیشرفته ضد سایش است که برای گشتاور بالا و مسافت‌های طولانی فرموله شده‌اند.",
            "فواصل طولانی تعویض روغن هزینه‌های عملیاتی را کاهش می‌دهد.",
          ],
          ar: [
            "الاعتماد المزدوج API CI-4 وACEA E7/E9 يضمن استخداماً موثوقاً عبر مجموعة واسعة من المركبات.",
            "يحتوي على مضافات متقدمة مضادة للتآكل مُصاغة لعزم الدوران العالي والمسافات الطويلة.",
            "فترات تغيير الزيت الطويلة تقلل تكاليف التشغيل.",
          ],
          de: [
            "Die doppelte Zulassung nach API CI-4 und ACEA E7/E9 gewährleistet zuverlässigen Einsatz in einer breiten Fahrzeugpalette.",
            "Enthält fortschrittliche Verschleißschutzadditive, die für hohes Drehmoment und lange Strecken formuliert sind.",
            "Lange Ölwechselintervalle senken die Betriebskosten.",
          ],
          fr: [
            "La double approbation API CI-4 et ACEA E7/E9 garantit une utilisation fiable sur une large gamme de véhicules.",
            "Contient des additifs anti-usure avancés formulés pour un couple élevé et de longues distances.",
            "Les longs intervalles de vidange réduisent les coûts d'exploitation.",
          ],
        },
        standards: "API CI-4, ACEA E7/E9, Volvo VDS-3, MB 228.3",
        packaging: ["20 L", "200 L"],
      },
      "HD-15W40": {
        description: {
          tr: "HI-TECH 15W-40 AĞIR HİZMET DİZEL YAĞI, API CI-4 ve ACEA C7 onaylı sentetik teknoloji ağır hizmet motor yağıdır. Ağır koşullarda çalışan dizel ve benzinli motorlar için kapsamlı koruma sunan çok amaçlı bir formüldür.",
          en: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL, a synthetic-technology heavy-duty engine oil approved by API CI-4 and ACEA C7. A multi-purpose formula offering comprehensive protection for diesel and petrol engines operating under severe conditions.",
          ru: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL, моторное масло для тяжёлых условий на основе синтетической технологии, одобренное API CI-4 и ACEA C7. Универсальная формула, обеспечивающая всестороннюю защиту дизельных и бензиновых двигателей, работающих в тяжёлых условиях.",
          fa: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL، یک روغن موتور خدمات سنگین با فناوری سنتتیک است که توسط API CI-4 و ACEA C7 تأیید شده است. فرمولی چندمنظوره که محافظت جامع برای موتورهای دیزلی و بنزینی که در شرایط سخت کار می‌کنند ارائه می‌دهد.",
          ar: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL، زيت محرك ثقيل الخدمة بتقنية اصطناعية معتمد من API CI-4 وACEA C7. صيغة متعددة الأغراض توفر حماية شاملة لمحركات الديزل والبنزين العاملة في ظروف قاسية.",
          de: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL, ein Schwerlast-Motoröl in Synthesetechnologie, zugelassen nach API CI-4 und ACEA C7. Eine Mehrzweckformel, die umfassenden Schutz für Diesel- und Benzinmotoren unter schweren Bedingungen bietet.",
          fr: "HI-TECH 15W-40 HEAVY DUTY DIESEL OIL, une huile moteur lourde service de technologie synthétique, approuvée API CI-4 et ACEA C7. Une formule polyvalente offrant une protection complète aux moteurs diesel et essence fonctionnant dans des conditions sévères.",
        },
        features: {
          tr: [
            "API CI-4 onaylı formülü ile dizel ve benzinli ağır hizmet motorlarında geniş kullanım sağlar.",
            "Yüksek sıcaklıklarda oksidasyona ve viskozite düşüşüne karşı üstün termal stabilite sunar.",
            "Sert çalışma koşullarında motor içini temiz tutarak bakım aralıklarını uzatır.",
          ],
          en: [
            "API CI-4 approved formula allows broad use in diesel and petrol heavy-duty engines.",
            "Provides superior thermal stability against oxidation and viscosity loss at high temperatures.",
            "Keeps the engine interior clean under harsh operating conditions, extending maintenance intervals.",
          ],
          ru: [
            "Формула с одобрением API CI-4 обеспечивает широкое применение в дизельных и бензиновых двигателях для тяжёлых условий.",
            "Обеспечивает превосходную термическую стабильность против окисления и снижения вязкости при высоких температурах.",
            "Сохраняет чистоту двигателя в суровых условиях, увеличивая интервалы обслуживания.",
          ],
          fa: [
            "فرمول تأییدشده API CI-4 امکان استفاده گسترده در موتورهای دیزلی و بنزینی خدمات سنگین را فراهم می‌کند.",
            "پایداری حرارتی برتر در برابر اکسیداسیون و افت ویسکوزیته در دماهای بالا ارائه می‌دهد.",
            "داخل موتور را در شرایط کاری سخت تمیز نگه می‌دارد و فواصل نگهداری را افزایش می‌دهد.",
          ],
          ar: [
            "الصيغة المعتمدة من API CI-4 تتيح استخداماً واسعاً في محركات الديزل والبنزين ثقيلة الخدمة.",
            "توفر ثباتاً حرارياً فائقاً ضد الأكسدة وانخفاض اللزوجة عند درجات الحرارة العالية.",
            "تحافظ على نظافة المحرك الداخلية في ظروف التشغيل القاسية، مما يطيل فترات الصيانة.",
          ],
          de: [
            "Die nach API CI-4 zugelassene Formel ermöglicht den breiten Einsatz in Diesel- und Benzin-Schwerlastmotoren.",
            "Bietet überlegene thermische Stabilität gegen Oxidation und Viskositätsverlust bei hohen Temperaturen.",
            "Hält das Motorinnere unter rauen Betriebsbedingungen sauber und verlängert die Wartungsintervalle.",
          ],
          fr: [
            "La formule approuvée API CI-4 permet une large utilisation dans les moteurs diesel et essence à service intensif.",
            "Offre une stabilité thermique supérieure contre l'oxydation et la perte de viscosité à haute température.",
            "Maintient l'intérieur du moteur propre dans des conditions d'exploitation difficiles, prolongeant les intervalles d'entretien.",
          ],
        },
        standards: "API CI-4, ACEA C7, MB 228.3, MAN M3275",
        packaging: ["20 L", "200 L"],
      },
      "SAE-30W": {
        description: {
          tr: "HI-TECH SAE 30W MONOGRAT MOTOR YAĞI, API CF/SG onaylı mineral bazlı tek viskozite kademeli ağır hizmet motor yağıdır. Sıcak ve sabit çalışma koşullarındaki dizel motorlar ile tarım ve iş makineleri için güvenilir yağlama sağlar.",
          en: "HI-TECH SAE 30W MONOGRADE ENGINE OIL, a mineral-based single-grade heavy-duty engine oil approved by API CF/SG. Provides reliable lubrication for diesel engines as well as agricultural and construction machinery operating under hot, steady conditions.",
          ru: "HI-TECH SAE 30W MONOGRADE ENGINE OIL, минеральное односезонное моторное масло для тяжёлых условий, одобренное API CF/SG. Обеспечивает надёжную смазку дизельных двигателей, а также сельскохозяйственной и строительной техники, работающей в жарких и стабильных условиях.",
          fa: "HI-TECH SAE 30W MONOGRADE ENGINE OIL، یک روغن موتور خدمات سنگین تک‌درجه بر پایه مواد معدنی است که توسط API CF/SG تأیید شده است. روان‌کاری مطمئن برای موتورهای دیزلی و همچنین ماشین‌آلات کشاورزی و راه‌سازی که در شرایط گرم و ثابت کار می‌کنند ارائه می‌دهد.",
          ar: "HI-TECH SAE 30W MONOGRADE ENGINE OIL، زيت محرك ثقيل الخدمة أحادي الدرجة على أساس معدني معتمد من API CF/SG. يوفر تزييتاً موثوقاً لمحركات الديزل وكذلك للآلات الزراعية ومعدات البناء العاملة في ظروف حارة وثابتة.",
          de: "HI-TECH SAE 30W MONOGRADE ENGINE OIL, ein mineralisches Einbereichs-Schwerlastmotoröl, zugelassen nach API CF/SG. Bietet zuverlässige Schmierung für Dieselmotoren sowie Landwirtschafts- und Baumaschinen, die unter heißen, gleichmäßigen Bedingungen arbeiten.",
          fr: "HI-TECH SAE 30W MONOGRADE ENGINE OIL, une huile moteur monograde à base minérale pour service intensif, approuvée API CF/SG. Assure une lubrification fiable des moteurs diesel ainsi que des engins agricoles et de chantier fonctionnant dans des conditions chaudes et stables.",
        },
        features: {
          tr: [
            "API CF/SG onaylı monograt formülü ile hem dizel hem benzinli motorlarda kullanılabilir.",
            "Sabit yük ve sıcak iklim koşullarında kararlı yağ filmi oluşturarak motoru korur.",
            "Ekonomik mineral baz yağ ile geniş ekipman yelpazesinde uygun maliyet sunar.",
          ],
          en: [
            "Its API CF/SG approved monograde formula can be used in both diesel and petrol engines.",
            "Forms a stable oil film under steady loads and hot climates to protect the engine.",
            "Economical mineral base oil offers cost efficiency across a wide range of equipment.",
          ],
          ru: [
            "Монолитная формула с одобрением API CF/SG подходит как для дизельных, так и для бензиновых двигателей.",
            "Образует стабильную масляную плёнку при постоянных нагрузках и в жарком климате, защищая двигатель.",
            "Экономичное минеральное базовое масло обеспечивает выгодную стоимость для широкого парка техники.",
          ],
          fa: [
            "فرمول تک‌درجه تأییدشده API CF/SG را می‌توان در هر دو موتور دیزلی و بنزینی استفاده کرد.",
            "تحت بارهای ثابت و آب‌وهوای گرم لایه روغن پایدار تشکیل می‌دهد تا از موتور محافظت کند.",
            "روغن پایه معدنی اقتصادی صرفه‌جویی در هزینه را در طیف گسترده‌ای از تجهیزات ارائه می‌دهد.",
          ],
          ar: [
            "صيغته أحادية الدرجة المعتمدة من API CF/SG يمكن استخدامها في محركات الديزل والبنزين على حد سواء.",
            "يُشكّل طبقة زيت ثابتة تحت الأحمال المستقرة والمناخ الحار لحماية المحرك.",
            "زيت الأساس المعدني الاقتصادي يوفر كفاءة في التكلفة عبر مجموعة واسعة من المعدات.",
          ],
          de: [
            "Die nach API CF/SG zugelassene Einbereichsformel kann sowohl in Diesel- als auch in Benzinmotoren verwendet werden.",
            "Bildet bei gleichbleibenden Lasten und heißem Klima einen stabilen Ölfilm zum Schutz des Motors.",
            "Das wirtschaftliche mineralische Grundöl bietet Kosteneffizienz über eine breite Gerätepalette.",
          ],
          fr: [
            "Sa formule monograde approuvée API CF/SG peut être utilisée dans les moteurs diesel comme essence.",
            "Forme un film d'huile stable sous des charges constantes et des climats chauds pour protéger le moteur.",
            "L'huile de base minérale économique offre une rentabilité sur une large gamme d'équipements.",
          ],
        },
        standards: "API CF/SG, MIL-L-2104C",
        packaging: ["20 L", "200 L"],
      },
      "SAE-40W": {
        description: {
          tr: "HI-TECH SAE 40W MONOGRAT MOTOR YAĞI, API CF/SG onaylı ağır hizmet mineral motor yağıdır. Yüksek sıcaklık ve ağır yük koşullarında çalışan statüoner motorlar, jeneratörler ve endüstriyel ekipmanlarda uzun ömürlü koruma sağlar.",
          en: "HI-TECH SAE 40W MONOGRADE ENGINE OIL, a heavy-duty mineral engine oil approved by API CF/SG. Provides long-lasting protection in stationary engines, generators and industrial equipment operating under high temperatures and heavy loads.",
          ru: "HI-TECH SAE 40W MONOGRADE ENGINE OIL, минеральное моторное масло для тяжёлых условий, одобренное API CF/SG. Обеспечивает длительную защиту стационарных двигателей, генераторов и промышленного оборудования, работающих при высоких температурах и больших нагрузках.",
          fa: "HI-TECH SAE 40W MONOGRADE ENGINE OIL، یک روغن موتور معدنی خدمات سنگین است که توسط API CF/SG تأیید شده است. در موتورهای ثابت، ژنراتورها و تجهیزات صنعتی که در دمای بالا و بارهای سنگین کار می‌کنند محافظت طولانی‌مدت ارائه می‌دهد.",
          ar: "HI-TECH SAE 40W MONOGRADE ENGINE OIL، زيت محرك معدني ثقيل الخدمة معتمد من API CF/SG. يوفر حماية طويلة الأمد في المحركات الثابتة والمولدات والمعدات الصناعية العاملة في درجات حرارة عالية وأحمال ثقيلة.",
          de: "HI-TECH SAE 40W MONOGRADE ENGINE OIL, ein mineralisches Schwerlastmotoröl, zugelassen nach API CF/SG. Bietet langanhaltenden Schutz in stationären Motoren, Generatoren und Industrieanlagen, die unter hohen Temperaturen und schweren Lasten arbeiten.",
          fr: "HI-TECH SAE 40W MONOGRADE ENGINE OIL, une huile moteur minérale pour service intensif, approuvée API CF/SG. Offre une protection durable dans les moteurs stationnaires, les générateurs et les équipements industriels fonctionnant sous hautes températures et charges lourdes.",
        },
        features: {
          tr: [
            "Yüksek viskozitesi ile sıcak ortamlarda kararlı yağ filmi ve güçlü motor koruması sunar.",
            "Statüoner dizel motorlar, jeneratörler ve ağır iş makineleri için idealdir.",
            "Aşınma ve korozyon önleyici katkılarla motor bileşenlerinin ömrünü uzatır.",
          ],
          en: [
            "Its high viscosity provides a stable oil film and strong engine protection in hot environments.",
            "Ideal for stationary diesel engines, generators and heavy construction machinery.",
            "Anti-wear and anti-corrosion additives extend the life of engine components.",
          ],
          ru: [
            "Высокая вязкость обеспечивает стабильную масляную плёнку и надёжную защиту двигателя в жарких условиях.",
            "Идеально подходит для стационарных дизельных двигателей, генераторов и тяжёлой строительной техники.",
            "Противоизносные и антикоррозионные присадки продлевают срок службы деталей двигателя.",
          ],
          fa: [
            "ویسکوزیته بالای آن لایه روغن پایدار و محافظت قوی از موتور را در محیط‌های گرم ارائه می‌دهد.",
            "برای موتورهای دیزلی ثابت، ژنراتورها و ماشین‌آلات سنگین راه‌سازی ایده‌آل است.",
            "افزودنی‌های ضد سایش و ضد خوردگی عمر اجزای موتور را افزایش می‌دهند.",
          ],
          ar: [
            "لزوجته العالية توفر طبقة زيت ثابتة وحماية قوية للمحرك في البيئات الحارة.",
            "مثالي لمحركات الديزل الثابتة والمولدات وآلات البناء الثقيلة.",
            "مضافات مقاومة التآكل والصدأ تطيل عمر مكونات المحرك.",
          ],
          de: [
            "Seine hohe Viskosität bietet einen stabilen Ölfilm und starken Motorschutz in heißen Umgebungen.",
            "Ideal für stationäre Dieselmotoren, Generatoren und schwere Baumaschinen.",
            "Verschleißschutz- und Korrosionsschutzadditive verlängern die Lebensdauer der Motorkomponenten.",
          ],
          fr: [
            "Sa haute viscosité offre un film d'huile stable et une forte protection moteur dans les environnements chauds.",
            "Idéale pour les moteurs diesel stationnaires, les générateurs et les engins de chantier lourds.",
            "Les additifs anti-usure et anticorrosion prolongent la durée de vie des composants du moteur.",
          ],
        },
        standards: "API CF/SG, MIL-L-2104C",
        packaging: ["20 L", "200 L"],
      },
      "SAE-50W": {
        description: {
          tr: "HI-TECH SAE 50W MONOGRAT MOTOR YAĞI, API CF/CF-4/SG onaylı yüksek viskoziteli mineral motor yağıdır. Aşırı sıcak iklimlerde, eski nesil büyük hacimli dizel motorlarda ve yüksek yük altındaki endüstriyel uygulamalarda üstün koruma sağlar.",
          en: "HI-TECH SAE 50W MONOGRADE ENGINE OIL, a high-viscosity mineral engine oil approved by API CF/CF-4/SG. Delivers superior protection in extremely hot climates, older large-displacement diesel engines and heavy-load industrial applications.",
          ru: "HI-TECH SAE 50W MONOGRADE ENGINE OIL, высоковязкое минеральное моторное масло, одобренное API CF/CF-4/SG. Обеспечивает превосходную защиту в чрезвычайно жарком климате, старых дизельных двигателях большого объёма и промышленных применениях с высокой нагрузкой.",
          fa: "HI-TECH SAE 50W MONOGRADE ENGINE OIL، یک روغن موتور معدنی با ویسکوزیته بالا است که توسط API CF/CF-4/SG تأیید شده است. در آب‌وهوای بسیار گرم، موتورهای دیزلی حجم بالای نسل قدیم و کاربردهای صنعتی با بار سنگین محافظت برتر ارائه می‌دهد.",
          ar: "HI-TECH SAE 50W MONOGRADE ENGINE OIL، زيت محرك معدني عالي اللزوجة معتمد من API CF/CF-4/SG. يوفر حماية فائقة في المناخات الحارة جداً ومحركات الديزل كبيرة السعة من الجيل القديم والتطبيقات الصناعية ذات الأحمال الثقيلة.",
          de: "HI-TECH SAE 50W MONOGRADE ENGINE OIL, ein hochviskoses mineralisches Motoröl, zugelassen nach API CF/CF-4/SG. Bietet überlegenen Schutz in extrem heißen Klimazonen, älteren großvolumigen Dieselmotoren und schwerlastigen Industrieanwendungen.",
          fr: "HI-TECH SAE 50W MONOGRADE ENGINE OIL, une huile moteur minérale à haute viscosité, approuvée API CF/CF-4/SG. Offre une protection supérieure dans les climats extrêmement chauds, les moteurs diesel anciens à grande cylindrée et les applications industrielles à charge lourde.",
        },
        features: {
          tr: [
            "API CF/CF-4/SG üçlü onayı ile geniş motor tiplerinde güvenilir kullanım imkânı sunar.",
            "Yüksek viskozite indeksi ile aşırı sıcaklıklarda yağ filminin bütünlüğünü korur.",
            "Büyük çaplı motorlar ve ağır yük uygulamalarında güçlü anti-wear performansı sağlar.",
          ],
          en: [
            "Triple API CF/CF-4/SG approval ensures reliable use across a wide range of engine types.",
            "Its high viscosity index preserves oil-film integrity at extreme temperatures.",
            "Delivers strong anti-wear performance in large-bore engines and heavy-load applications.",
          ],
          ru: [
            "Тройное одобрение API CF/CF-4/SG обеспечивает надёжное применение в широком диапазоне типов двигателей.",
            "Высокий индекс вязкости сохраняет целостность масляной плёнки при экстремальных температурах.",
            "Обеспечивает высокие противоизносные характеристики в крупногабаритных двигателях и при высоких нагрузках.",
          ],
          fa: [
            "تأییدیه سه‌گانه API CF/CF-4/SG استفاده مطمئن در طیف گسترده‌ای از انواع موتور را تضمین می‌کند.",
            "شاخص ویسکوزیته بالای آن یکپارچگی لایه روغن را در دماهای شدید حفظ می‌کند.",
            "عملکرد قوی ضد سایش را در موتورهای با قطر بزرگ و کاربردهای با بار سنگین ارائه می‌دهد.",
          ],
          ar: [
            "الاعتماد الثلاثي API CF/CF-4/SG يضمن استخداماً موثوقاً عبر مجموعة واسعة من أنواع المحركات.",
            "مؤشر اللزوجة العالي يحافظ على سلامة طبقة الزيت في درجات الحرارة القصوى.",
            "يوفر أداءً قوياً مضاداً للتآكل في المحركات كبيرة القطر والتطبيقات ذات الأحمال الثقيلة.",
          ],
          de: [
            "Die dreifache Zulassung nach API CF/CF-4/SG gewährleistet zuverlässigen Einsatz über eine breite Palette von Motortypen.",
            "Sein hoher Viskositätsindex bewahrt die Integrität des Ölfilms bei extremen Temperaturen.",
            "Bietet starke Verschleißschutzleistung in großvolumigen Motoren und Schwerlastanwendungen.",
          ],
          fr: [
            "La triple approbation API CF/CF-4/SG garantit une utilisation fiable sur une large gamme de types de moteurs.",
            "Son indice de viscosité élevé préserve l'intégrité du film d'huile à des températures extrêmes.",
            "Offre de solides performances anti-usure dans les moteurs à gros alésage et les applications à charge lourde.",
          ],
        },
        standards: "API CF/CF-4/SG, MIL-L-2104C",
        packaging: ["20 L", "200 L"],
      },
    },
  },
  "Motosiklet-Yaglari": {
    title: "Motosiklet Yağları",
    products: [
      { slug: "Moto-4T-10W40", name: "4T 10W-40 Motor Yağı", image: "/model-oils/images/hi-tech/motosiklet/4t.png" },
      { slug: "Moto-2T",       name: "2T Motor Yağı",        image: "/model-oils/images/hi-tech/motosiklet/2t.png" },
    ],
    details: {
      "Moto-4T-10W40": {
        description: "HI-TECH 4T 10W-40, 4 zamanlı motosiklet motorları için yüksek performanslı motor yağıdır. Hem yağlama hem de güç aktarımı fonksiyonlarını birleştiren JASO MA2 onaylı formülü ile ıslak debriyaj sistemleriyle tam uyumludur. Her koşulda güvenilir motor koruması ve pürüzsüz vites geçişi sağlar.",
        features: [
          "JASO MA2 onaylı formülü ile ıslak debriyajlı 4 zamanlı motosiklet motorları için özel olarak geliştirilmiştir.",
          "Yüksek devirde termal stabilite sağlayarak motor ömrünü uzatır ve performansı korur.",
          "Piston, silindir ve rulman yüzeylerini aşınmaya karşı üstün koruma altına alır.",
        ],
        standards: "API SL, JASO MA2",
        packaging: ["1 L", "200 L"],
      },
      "Moto-2T": {
        description: "HI-TECH 2T, 2 zamanlı motosiklet ve küçük motorlar için yüksek kaliteli motor yağıdır. Benzin ile tam karışım sağlayan özel formülü sayesinde mükemmel yanma ve düşük egzoz emisyonu sunar. Motor temizliğini koruyarak buji ve egzoz tortulaşmasını minimize eder.",
        features: [
          "Benzinle mükemmel karışabilirlik özelliği ile homojen yağlama sağlar.",
          "Düşük duman ve is oluşumu ile çevre dostu performans sunar.",
          "Piston ve silindir duvarlarını yüksek devirde aşınmaya karşı korur.",
        ],
        standards: "API TC, ISO-L-EGB, JASO FB",
        packaging: ["1 L", "200 L"],
      },
    },
  },
  "Disli-ve-Transmisyon-Yaglari": {
    title: "Dişli ve Transmisyon Yağları",
    products: [
      { slug: "Gear-75W80",  name: "75W-80 Sentetik Dişli Yağı",  image: "/model-oils/images/hi-tech/di%C5%9Fliler/7580.png" },
      { slug: "Gear-75W90",  name: "75W-90 Sentetik Dişli Yağı",  image: "/model-oils/images/hi-tech/di%C5%9Fliler/7590.png" },
      { slug: "Gear-80W90",  name: "80W-90 Sentetik Dişli Yağı",  image: "/model-oils/images/hi-tech/di%C5%9Fliler/8090.png" },
      { slug: "Gear-85W140", name: "85W-140 Sentetik Dişli Yağı", image: "/model-oils/images/hi-tech/di%C5%9Fliler/85140.png" },
      { slug: "Gear-90W",    name: "Gear 90W Mineral Dişli Yağı", image: "/model-oils/images/hi-tech/di%C5%9Fliler/90w.png" },
      { slug: "Gear-140",    name: "Gear 140 Mineral Dişli Yağı", image: "/model-oils/images/hi-tech/di%C5%9Fliler/140w.png" },
    ],
    details: {
      "Gear-75W80": {
        description: "HI-TECH 75W-80 SENTETİK DİŞLİ YAĞI, API GL-4/GL-5 onaylı tam sentetik formüllü manuel şanzıman ve aks dişli yağıdır. Düşük viskozitesi sayesinde soğuk havalarda kolay vites geçişi ve üstün yakıt ekonomisi sağlar.",
        features: [
          "Tam sentetik baz yağ ile düşük sürtünme katsayısı ve mükemmel akışkanlık sunar.",
          "GL-4/GL-5 çift onayı ile geniş araç yelpazesinde kullanım imkânı sağlar.",
          "Aşırı basınç (EP) katkıları ile dişli yüzeylerini yıpranmaya karşı korur.",
        ],
        standards: "API GL-4/GL-5, ZF TE-ML 02B/08/17B/19B",
        packaging: ["20 L", "200 L"],
      },
      "Gear-75W90": {
        description: "HI-TECH 75W-90 SENTETİK DİŞLİ YAĞI, API GL-4/GL-5 onaylı tam sentetik dişli ve şanzıman yağıdır. Binek araçlar, hafif ticari araçlar ve ağır hizmet araçlarının manuel şanzımanları ile ön/arka akslarında yüksek performans sunar.",
        features: [
          "Geniş sıcaklık aralığında kararlı viskozite ile dişlilere sürekli yağ filmi sağlar.",
          "Mükemmel oksidasyon ve termal stabilite ile uzun yağ değişim aralıkları sunar.",
          "Sentetik formülü sayesinde sürtünme kaynaklı enerji kayıplarını minimuma indirir.",
        ],
        standards: "API GL-4/GL-5, MAN 341 Type E-1, ZF TE-ML 02B/05A/12L/16F/17B/19B/21A",
        packaging: ["20 L", "200 L"],
      },
      "Gear-80W90": {
        description: "HI-TECH 80W-90 SENTETİK DİŞLİ YAĞI, API GL-4/GL-5 onaylı sentetik dişli yağıdır. Manuel şanzımanlar, ön/arka diferansiyeller ve transfer kutuları için güvenilir yağlama ve koruma sağlar.",
        features: [
          "Yüksek EP (Extreme Pressure) performansı ile ağır yük altındaki dişlileri korur.",
          "Su ve nem direnci yüksektir; ıslak koşullarda bile etkin yağlama sağlar.",
          "Gürültü ve titreşimi azaltarak şanzıman ömrünü uzatır.",
        ],
        standards: "API GL-4/GL-5, MIL-L-2105D",
        packaging: ["20 L", "200 L"],
      },
      "Gear-85W140": {
        description: "HI-TECH 85W-140 SENTETİK DİŞLİ YAĞI, API GL-5 onaylı yüksek viskoziteli sentetik dişli yağıdır. Ağır hizmet araçlarının arka aksları ve diferansiyelleri için özel olarak geliştirilmiştir. Yüksek yük ve darbe koşullarında üstün koruma sunar.",
        features: [
          "API GL-5 onayı ile yüksek torklu ve ağır yüklü diferansiyeller için idealdir.",
          "Yüksek viskozitesi ile metal-metal temasını önler ve dişli yüzeylerini korur.",
          "Ekstremal sıcaklık koşullarında güvenilir yağ filmi oluşturur.",
        ],
        standards: "API GL-5, MIL-L-2105D",
        packaging: ["20 L", "200 L"],
      },
      "Gear-90W": {
        description: "HI-TECH GEAR 90W MİNERAL DİŞLİ YAĞI, API GL-4 onaylı mineral bazlı dişli yağıdır. Manuel şanzımanlar ve aks dişlileri için ekonomik ve güvenilir yağlama çözümü sunar. Geniş araç ve ekipman yelpazesiyle uyumludur.",
        features: [
          "API GL-4 onaylı mineral formül ile manuel şanzımanlarda stabil koruma sağlar.",
          "Korozyon ve aşınma önleyici katkılarla dişli bileşenlerinin ömrünü uzatır.",
          "Tarım makineleri, iş makineleri ve ticari araçlarda geniş uygulama alanı sunar.",
        ],
        standards: "API GL-4, MIL-L-2105",
        packaging: ["20 L", "200 L"],
      },
      "Gear-140": {
        description: "HI-TECH GEAR 140 MİNERAL DİŞLİ YAĞI, API GL-4 onaylı yüksek viskoziteli mineral dişli yağıdır. Sıcak iklimlerde ve ağır çalışma koşullarında güvenilir dişli koruması için tercih edilen klasik formüldür.",
        features: [
          "Yüksek viskoziteli mineral formülü ile sıcak havalarda güvenilir yağ filmi oluşturur.",
          "Eski nesil şanzıman ve aks sistemleri için uygun viskozite kademesi sunar.",
          "Aşırı basınç katkıları ile dişli yüzeyleri yüksek yüklere karşı korunur.",
        ],
        standards: "API GL-4, MIL-L-2105",
        packaging: ["20 L", "200 L"],
      },
    },
  },
};

const hiTechBg = "/model-oils/images/HI-TECH-BG.png";
const hitechCategorySlugs = [
  "Binek-Arac-Motor-Yaglari",
  "Agir-Hizmet-Motor-Yaglari",
  "Motosiklet-Yaglari",
  "Disli-ve-Transmisyon-Yaglari",
  "Deniz-Yaglari",
  "Endustriyel-Yaglar",
  "Antifrizler",
  "Gresler",
];

const hitechCategoryBgs = [
  "https://images.unsplash.com/photo-1563826773-1e2b4b2cde42?w=600&q=80&auto=format&fit=crop", // black BMW in dark — binek araç
  "https://images.unsplash.com/photo-1754437954174-9662c997b661?w=600&q=80&auto=format&fit=crop", // modern semi-truck on dark backdrop — ağır hizmet
  "https://images.unsplash.com/photo-1692317785388-a7d076077d9d?w=600&q=80&auto=format&fit=crop", // motorcycle lit in dark — motosiklet
  "https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=600&q=80&auto=format&fit=crop", // black metal gears close-up — dişli & transmisyon
  "https://images.unsplash.com/photo-1560134025-a119c071bf16?w=600&q=80&auto=format&fit=crop", // large grey cargo ship in ocean — deniz
  "https://images.unsplash.com/photo-1511454493857-0a29f2c023c7?w=600&q=80&auto=format&fit=crop", // black metal industrial factory — endüstriyel
  "https://images.unsplash.com/photo-1762172189607-91ee2d5f1e34?w=600&q=80&auto=format&fit=crop", // frost crystals dark — antifriz
  "https://images.unsplash.com/photo-1528774701372-1d4b668aed17?w=600&q=80&auto=format&fit=crop", // bearing ball at mechanic shop — gresler
];

export function hiTechHead(locale: Locale) {
  return pageHead(locale, "hitech", [{ property: "og:image", content: flagshipImg }]);
}

export const Route = createFileRoute("/hi-tech")({
  head: () => hiTechHead("en"),
  component: HiTech,
});

export function HiTech() {
  const { t, data } = useTranslation();
  return (
    <SiteLayout>
      <div
        className="bg-background bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hiTechBg})` }}
      >
        <div className="border-b border-border bg-background/80 backdrop-blur-[1px]">
          <PageHero
            eyebrow={t.hitech.heroEyebrow}
            title={t.hitech.heroTitle}
            subtitle={t.hitech.heroSubtitle}
            transparent
          >
            <div className="mt-7 flex flex-wrap gap-2">
              {data.hitechBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="hero" size="lg">
                <LocaleLink to="/contact">
                  {t.hitech.becomeDistributor} <ArrowRight className="h-4 w-4" />
                </LocaleLink>
              </Button>
            </div>
          </PageHero>
        </div>

        <section className="border-b border-border bg-background/80 py-20 backdrop-blur-[1px] lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] glow-blue">
              <img
                src={flagshipImg}
                alt="HI-TECH flagship product family"
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow={t.hitech.whyEyebrow} title={t.hitech.whyTitle} />
              <ul className="mt-6 space-y-4">
                {t.hitech.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="kategorilerimiz" className="bg-background/80 py-20 backdrop-blur-[1px] lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t.hitech.rangeEyebrow}
              title={t.hitech.rangeTitle}
              description={t.hitech.rangeDescription}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.categories.slice(0, 8).map((category, index) => (
                <LocaleLink
                  key={category.name}
                  to={`/hi-tech/${hitechCategorySlugs[index]}`}
                  className="group relative flex min-h-40 items-end overflow-hidden rounded-lg border border-border shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50"
                >
                  <img
                    src={hitechCategoryBgs[index]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <h3 className="relative p-5 font-display text-base font-bold leading-snug text-white drop-shadow-sm">
                    {category.name}
                  </h3>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

function BackToCategories() {
  const { t } = useTranslation();
  return (
    <LocaleLink
      to="/hi-tech"
      hash="kategorilerimiz"
      className="mb-8 inline-flex items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4" />
      {t.common.backToProducts}
    </LocaleLink>
  );
}

export function HiTechSubcategory() {
  const { category, product } = useParams({ strict: false });
  const { t, data } = useTranslation();
  const catData = category ? CATEGORY_DATA[category] : undefined;

  // Build slug → translated category name using hitechCategorySlugs + data.categories
  const slugToTranslatedName: Record<string, string> = {};
  hitechCategorySlugs.forEach((slug, idx) => {
    if (data.categories[idx]) slugToTranslatedName[slug] = data.categories[idx].name;
  });
  const translatedCatTitle = (category ? slugToTranslatedName[category] : undefined) ?? catData?.title;

  // Subcategory slug → translated title (for non-grade subcategories)
  const subcatTranslations: Record<string, string> = {
    "Hafif-Ticariler": t.hitech.lightCommercial,
  };

  // Subcategory grade page — e.g. /Binek-Arac-Motor-Yaglari/5W-30
  if (product && catData?.subcategories) {
    const subData = catData.subcategories[product];
    if (subData) {
      const cols = subData.products.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
      return (
        <SiteLayout>
          <div className="min-h-[55vh] bg-background py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LocaleLink
                to={`/hi-tech/${category}`}
                className="mb-8 inline-flex items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {translatedCatTitle}
              </LocaleLink>
              <SectionHeading eyebrow="HI-TECH" title={product ? (subcatTranslations[product] ?? subData.title) : subData.title} />
              <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${cols}`}>
                {subData.products.map((p) => (
                  <LocaleLink
                    key={p.slug}
                    to={`/hi-tech/${category}/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50"
                  >
                    <div className="flex items-center justify-center p-8">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-56 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="border-t border-border p-5">
                      <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {p.name}
                      </h3>
                    </div>
                  </LocaleLink>
                ))}
              </div>
            </div>
          </div>
        </SiteLayout>
      );
    }
  }

  // Product detail — delegate to child route
  if (product) {
    return <Outlet />;
  }

  // Subcategory grid — e.g. /Binek-Arac-Motor-Yaglari shows 11 grade boxes
  if (catData?.subcategories) {
    const subcatEntries = Object.entries(catData.subcategories);
    return (
      <SiteLayout>
        <div className="min-h-[55vh] bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BackToCategories />
            <SectionHeading eyebrow="HI-TECH" title={translatedCatTitle ?? ""} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subcatEntries.map(([slug, sub]) => (
                <LocaleLink
                  key={slug}
                  to={`/hi-tech/${category}/${slug}`}
                  className="group flex min-h-32 items-center rounded-lg border border-border bg-[image:var(--gradient-panel)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50"
                >
                  <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {subcatTranslations[slug] ?? sub.title}
                  </h3>
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Regular product grid (all other categories)
  if (catData) {
    const cols = catData.products.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
    return (
      <SiteLayout>
        <div className="min-h-[55vh] bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BackToCategories />
            <SectionHeading eyebrow="HI-TECH" title={translatedCatTitle ?? ""} />
            <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${cols}`}>
              {catData.products.map((p) => (
                <LocaleLink
                  key={p.slug}
                  to={`/hi-tech/${category}/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="flex items-center justify-center p-8">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-56 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-border p-5">
                    <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {p.name}
                    </h3>
                  </div>
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="min-h-[55vh] bg-background" />
    </SiteLayout>
  );
}

export function HiTechProduct() {
  const { product: productSlug, category } = useParams({ strict: false });
  const { t, data, locale } = useTranslation();
  const catData = category ? CATEGORY_DATA[category] : undefined;
  let product = catData?.products.find((p) => p.slug === productSlug);
  let parentSubcategorySlug: string | undefined;
  let parentSubcategoryTitle: string | undefined;
  if (!product && catData?.subcategories) {
    for (const [slug, sub] of Object.entries(catData.subcategories)) {
      const found = sub.products.find((p) => p.slug === productSlug);
      if (found) { product = found; parentSubcategorySlug = slug; parentSubcategoryTitle = sub.title; break; }
    }
  }

  const slugToTranslatedName: Record<string, string> = {};
  hitechCategorySlugs.forEach((slug, idx) => {
    if (data.categories[idx]) slugToTranslatedName[slug] = data.categories[idx].name;
  });
  const translatedCatTitle = (category ? slugToTranslatedName[category] : undefined) ?? catData?.title;
  const subcatTranslations: Record<string, string> = { "Hafif-Ticariler": t.hitech.lightCommercial };
  const translatedSubcatTitle = parentSubcategorySlug ? (subcatTranslations[parentSubcategorySlug] ?? parentSubcategoryTitle) : parentSubcategoryTitle;
  const detail = productSlug ? catData?.details[productSlug] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!product) {
    return (
      <SiteLayout>
        <div className="flex min-h-[55vh] items-center justify-center bg-background">
          <p className="text-muted-foreground">{t.hitech.productNotFound}</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/85 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[80vh] max-w-[80vw] object-contain drop-shadow-2xl"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-800" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-background/80 py-3">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <LocaleLink
              to={parentSubcategorySlug ? `/hi-tech/${category}/${parentSubcategorySlug}` : `/hi-tech/${category ?? ""}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              {translatedSubcatTitle ?? translatedCatTitle ?? category}
            </LocaleLink>
          </div>
        </div>

        {/* Hero: image + docs */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Circular product image — circle is the background, image floats on top */}
            <div className="flex shrink-0 items-center justify-center">
              <button
                onClick={() => setLightboxOpen(true)}
                className="group relative flex h-72 w-72 cursor-zoom-in items-center justify-center sm:h-80 sm:w-80"
                aria-label={t.hitech.zoomImage}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 h-64 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-72"
                />
                <span className="absolute bottom-5 right-5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 opacity-0 shadow transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-3.5 w-3.5 text-gray-700" />
                </span>
              </button>
            </div>

            {/* Right: name + documents */}
            <div className="flex flex-1 flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">HI-TECH</p>
                <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {product.name}
                </h1>
              </div>

            </div>
          </div>
        </div>

        {detail && (
          <div className="mx-auto max-w-6xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
            {/* Description */}
            <div className="rounded border border-border bg-[image:var(--gradient-panel)] p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {t.hitech.productDescription}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-primary">HI-TECH {product.name.toUpperCase()},</span>{" "}
                {resolveText(detail.description, locale).replace(/^[^,]+,\s*/, "")}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                {t.hitech.productFeatures}
              </h3>
              <div className="space-y-2">
                {resolveArray(detail.features, locale).map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded border border-border bg-[image:var(--gradient-panel)] px-4 py-3"
                  >
                    <Flame className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-sm text-muted-foreground">{f}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards */}
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
                {t.hitech.productStandards}
              </h3>
              <p className="text-sm text-muted-foreground">{resolveText(detail.standards, locale)}</p>
            </div>

            {/* Packaging */}
            <div className="rounded border border-border bg-[image:var(--gradient-panel)] p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">
                {t.hitech.productPackaging}
              </h3>
              <div className="flex flex-wrap gap-3">
                {detail.packaging.map((size) => (
                  <span
                    key={size}
                    className="rounded border border-border bg-background/60 px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
