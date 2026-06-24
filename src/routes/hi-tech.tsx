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

interface ProductDetail {
  description: string;
  features: string[];
  standards: string;
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
      "Binek-0W-16-1L":     { description: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", features: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-16-4L":     { description: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", features: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-16-5L":     { description: "HI-TECH SYNTHETIC 0W-16, hibrit ve modern binek araçlar için geliştirilmiş premium tam sentetik motor yağıdır. API SN Plus ve ACEA C5 onaylı ultra düşük viskoziteli formülü, yakıt tasarrufunu maksimize ederken motor bileşenlerini eksiksiz koruma altına alır.", features: ["Hibrit araç motorları ve start-stop sistemleri için özel olarak formüle edilmiştir.", "Ultra düşük sürtünme katsayısı ile yakıt tüketimini ve CO₂ emisyonunu azaltır.", "API SN Plus onaylı LSPI koruması sunar."], standards: "API SN Plus, ACEA C5, ILSAC GF-6A", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-1L":     { description: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", features: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-4L":     { description: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", features: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-20-5L":     { description: "HI-TECH SYNTHETIC 0W-20, modern benzinli ve hibrit motorlar için tam sentetik motor yağıdır. ILSAC GF-5 ve API SL/SM onaylı formülü, düşük sıcaklıkta mükemmel akışkanlık ve üstün yakıt ekonomisi sağlar.", features: ["Çok düşük sıcaklıklarda hızlı yağ dolaşımı ile soğuk çalıştırma hasarını önler.", "Yüksek viskozite indeksi ile geniş sıcaklık aralığında kararlı koruma sağlar.", "Yakıt ekonomisini artıran ultra düşük sürtünme özelliğine sahiptir."], standards: "API SL/SM, ILSAC GF-5, ACEA A1/B1", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-1L":     { description: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", features: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-4L":     { description: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", features: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-0W-30-5L":     { description: "HI-TECH SYNTHETIC 0W-30, binek araçlar için tam sentetik motor yağıdır. API SL onaylı formülü, soğuk havalarda mükemmel akışkanlık ve yüksek sıcaklıklarda güçlü koruma sağlayarak motorun her koşulda en verimli şekilde çalışmasını destekler.", features: ["Geniş sıcaklık aralığında stabil performans; soğukta hızlı başlatma, sıcakta tam koruma.", "Oksidasyona ve termal bozunmaya karşı geliştirilmiş dirençli formül.", "Motor iç yüzeyleri temiz tutar; tortu ve vernik oluşumunu engeller."], standards: "API SL, ACEA A3/B4", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-1L":     { description: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", features: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-4L":     { description: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", features: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-5L":     { description: "HI-TECH SYNTHETIC 5W-30, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SL/SJ ve ACEA A5/B5 onaylı formülü ile uzun yağ değişim aralıkları ve üstün motor koruması sağlar.", features: ["Benzinli ve dizel motorlarda geniş uygulama yelpazesi; tek ürünle tam uyumluluk.", "Düşük yakıt tüketimini destekleyen enerji tasarruflu viskozite profili.", "Gelişmiş aşınma önleme katkıları ile motor ömrünü uzatır."], standards: "API SL/SJ, ACEA A5/B5, C3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-1L": { description: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", features: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-4L": { description: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", features: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-30-DPF-5L": { description: "HI-TECH FULLY SYNTHETIC 5W-30 DPF, dizel partikül filtresi (DPF) ile donatılmış modern dizel araçlar için özel geliştirilmiş tam sentetik motor yağıdır. Düşük küllü ACEA C2/C3 formülü, DPF ömrünü korurken motorun tam performansta çalışmasını sağlar.", features: ["Düşük SAPS formülü ile DPF ve diğer after-treatment sistemlerini korur.", "ACEA C2/C3 onayı ile Euro 5 ve Euro 6 emisyon standartlarını karşılar.", "Yağ tüketimini minimize ederek filtre tıkanma riskini önemli ölçüde azaltır."], standards: "ACEA C2/C3, API SN/CF, BMW Longlife-04", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-5W-40-1L":     { description: "HI-TECH SYNTHETIC 5W-40, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SN ve ACEA A3/C3 onaylı yüksek performanslı formülü, ağır şehir içi trafik koşullarında ve uzun yol sürüşlerinde üstün motor koruması sağlar.", features: ["Yüksek viskozite indeksi ile -35°C soğuktan +150°C sıcağa kadar kararlı yağ filmi sağlar.", "Sporcu sürüş tarzında ve yüksek motor yüklerinde mükemmel koruma sunar.", "Turbo ve doğal emişli motorlarda eşit etkinlikle çalışır."], standards: "API SN, ACEA A3/B4/C3, VW 502.00/505.00", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-5W-40-4L":     { description: "HI-TECH SYNTHETIC 5W-40, benzinli ve dizel binek araç motorları için tam sentetik motor yağıdır. API SN ve ACEA A3/C3 onaylı yüksek performanslı formülü, ağır şehir içi trafik koşullarında ve uzun yol sürüşlerinde üstün motor koruması sağlar.", features: ["Yüksek viskozite indeksi ile -35°C soğuktan +150°C sıcağa kadar kararlı yağ filmi sağlar.", "Sporcu sürüş tarzında ve yüksek motor yüklerinde mükemmel koruma sunar.", "Turbo ve doğal emişli motorlarda eşit etkinlikle çalışır."], standards: "API SN, ACEA A3/B4/C3, VW 502.00/505.00", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-10W-40-1L":    { description: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", features: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-40-4L":    { description: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", features: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-40-5L":    { description: "HI-TECH SYNTHETIC 10W-40, benzinli ve dizel binek araç motorları için yarı sentetik motor yağıdır. API SN ve ACEA A3/B3 onaylı formülü, ekonomik fiyatıyla yüksek motor koruması arayanlar için ideal çözüm sunar.", features: ["Yarı sentetik formül ile tam sentetike yakın koruma, daha ekonomik maliyette.", "Eski ve yeni nesil hem benzinli hem dizel motorlarda güvenilir kullanım.", "Yüksek sıcaklıkta stabil viskozite ile motor aşınmasını önler."], standards: "API SN, ACEA A3/B3", packaging: ["1 L", "4 L", "5 L", "200 L"] },
      "Binek-10W-60-1L":    { description: "HI-TECH SYNTHETIC 10W-60, yüksek performanslı spor ve yarış araçları için geliştirilmiş premium tam sentetik motor yağıdır. API SN/CF ve ACEA C3 onaylı formülü, ekstrem yüklerde ve yüksek devirlerde üstün motor koruması sağlar.", features: ["Yüksek devirli spor ve yarış motorlarının aşırı ısı ve basıncına karşı maksimum koruma.", "Supercharged ve turbocharged motorlarda yağ filminin bütünlüğünü korur.", "BMW M serisi ve yüksek performanslı araçlar için özellikle uygundur."], standards: "API SN/CF, ACEA C3, BMW M", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-10W-60-4L":    { description: "HI-TECH SYNTHETIC 10W-60, yüksek performanslı spor ve yarış araçları için geliştirilmiş premium tam sentetik motor yağıdır. API SN/CF ve ACEA C3 onaylı formülü, ekstrem yüklerde ve yüksek devirlerde üstün motor koruması sağlar.", features: ["Yüksek devirli spor ve yarış motorlarının aşırı ısı ve basıncına karşı maksimum koruma.", "Supercharged ve turbocharged motorlarda yağ filminin bütünlüğünü korur.", "BMW M serisi ve yüksek performanslı araçlar için özellikle uygundur."], standards: "API SN/CF, ACEA C3, BMW M", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-15W-40-1L":    { description: "HI-TECH MOTOR OIL 15W-40, benzinli ve dizel binek araç motorları için mineral bazlı motor yağıdır. API SN/CO onaylı ekonomik formülü, normal sürüş koşullarında güvenilir motor koruması sağlar.", features: ["Benzinli ve dizel motorlar için uygun çok amaçlı mineral bazlı formül.", "Sıcak havalarda ve normal şehir içi kullanımda kararlı yağlama sağlar.", "Ekonomik mineral baz yağ ile düşük bakım maliyeti sunar."], standards: "API SN/CO, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-15W-40-4L":    { description: "HI-TECH MOTOR OIL 15W-40, benzinli ve dizel binek araç motorları için mineral bazlı motor yağıdır. API SN/CO onaylı ekonomik formülü, normal sürüş koşullarında güvenilir motor koruması sağlar.", features: ["Benzinli ve dizel motorlar için uygun çok amaçlı mineral bazlı formül.", "Sıcak havalarda ve normal şehir içi kullanımda kararlı yağlama sağlar.", "Ekonomik mineral baz yağ ile düşük bakım maliyeti sunar."], standards: "API SN/CO, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-20W-50-1L":    { description: "HI-TECH MOTOR OIL 20W-50, benzinli ve dizel motorlar için yüksek viskoziteli mineral motor yağıdır. API SL/CC onaylı klasik formülü, sıcak iklimlerde ve eski nesil motorlarda güvenilir yağlama sağlar.", features: ["Yüksek viskozitesi ile sıcak iklim koşullarında yağ filminin bütünlüğünü korur.", "Eski nesil araçlar ve yüksek kilometreli motorlar için özellikle uygundur.", "Aşınmış motor parçalarında yağ tüketimini azaltır."], standards: "API SL/CC, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Binek-20W-50-4L":    { description: "HI-TECH MOTOR OIL 20W-50, benzinli ve dizel motorlar için yüksek viskoziteli mineral motor yağıdır. API SL/CC onaylı klasik formülü, sıcak iklimlerde ve eski nesil motorlarda güvenilir yağlama sağlar.", features: ["Yüksek viskozitesi ile sıcak iklim koşullarında yağ filminin bütünlüğünü korur.", "Eski nesil araçlar ve yüksek kilometreli motorlar için özellikle uygundur.", "Aşınmış motor parçalarında yağ tüketimini azaltır."], standards: "API SL/CC, ACEA A3/B3", packaging: ["1 L", "4 L", "200 L"] },
      "Hafif-5W30-7L":      { description: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçlar ve minibüsler için özel geliştirilmiş tam sentetik motor yağıdır. API SL/CF ve ACEA A5/B5 onaylı formülü, yüksek yüklü ticari kullanımda üstün motor koruması ve uzun yağ değişim aralıkları sağlar.", features: ["Hafif ticari araçların yüksek yük ve uzun mesafe koşulları için özel formüle edilmiştir.", "ACEA A5/B5 onayı ile hem benzinli hem dizel motorda güvenilir kullanım imkânı.", "Büyük hacimli ambalajı ile filo ve servis operasyonları için idealdir."], standards: "API SL/CF, ACEA A5/B5", packaging: ["7 L", "10.5 L", "200 L"] },
      "Hafif-5W30-10-5L":   { description: "HI-TECH SYNTHETIC 5W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçlar ve minibüsler için özel geliştirilmiş tam sentetik motor yağıdır. API SL/CF ve ACEA A5/B5 onaylı formülü, yüksek yüklü ticari kullanımda üstün motor koruması ve uzun yağ değişim aralıkları sağlar.", features: ["Hafif ticari araçların yüksek yük ve uzun mesafe koşulları için özel formüle edilmiştir.", "ACEA A5/B5 onayı ile hem benzinli hem dizel motorda güvenilir kullanım imkânı.", "Büyük hacimli ambalajı ile filo ve servis operasyonları için idealdir."], standards: "API SL/CF, ACEA A5/B5", packaging: ["7 L", "10.5 L", "200 L"] },
      "Hafif-10W30-7L":     { description: "HI-TECH SYNTHETIC TECHNOLOGY 10W-30 HAFİF TİCARİ ARAÇ, hafif ticari araçların dizel motorları için sentetik teknoloji ağır hizmet motor yağıdır. API CI-4 ve ACEA E7 onaylı formülü, sürekli çalışan hafif ticari araçlarda güvenilir motor koruması ve dayanıklılık sağlar.", features: ["API CI-4 onaylı formül ile hafif ticari araçların dizel motorlarında tam koruma.", "Yüksek yük altında çalışan motorlarda termal stabilite ve anti-wear performansı sunar.", "7L büyük hacimli ambalaj ile filo yönetimi ve toplu bakım hizmetleri için uygundur."], standards: "API CI-4, ACEA E7", packaging: ["7 L", "200 L"] },
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
        description: "HI-TECH ANTİFRİZ -37, etilen glikol esaslı, -37°C'lik soğutma sıvısıdır. Geliştirilmiş formülü sayesinde özel amaçlı kullanıma uygun radyatörlerde mükemmel koruma sağlar. Çok soğuk ve çok sıcak ortamda bulunan binek araç, kamyon, otobüs, traktör ve iş makinelerinin radyatörlerini donma ve korozyona karşı korur.",
        features: [
          "Korozyon ve tortu oluşumunu engelleyerek soğutma sistemini korur ve bakım maliyetini azaltır.",
          "Motor sıcaklığını dengeler ve motorun en üst performansta çalışmasına yardımcı olur.",
          "Motor soğutma sisteminde bulunan plastik, kauçuk ve sızdırmazlık elemanlarına uyumludur.",
        ],
        standards: "SAE J 1034, TS 3582, BS 6580, ASTM D3306",
        packaging: ["3 L", "20 L", "200 L"],
      },
      "Antifriz-56": {
        description: "HI-TECH ANTİFRİZ -56, etilen glikol esaslı, -56°C'ye kadar koruma sağlayan yüksek performanslı soğutma sıvısıdır. Aşırı soğuk iklimlerde ve zorlu koşullarda çalışan araç ve makinelerin soğutma sistemleri için özel olarak geliştirilmiştir. Donmaya karşı maksimum koruma ile korozyon önleyici özellikleri bir arada sunar.",
        features: [
          "Eksi 56°C'ye kadar donmaya karşı üstün koruma sağlar.",
          "Alüminyum, demir, çelik ve bakır alaşımlı soğutma sistemi bileşenlerini korozyona karşı korur.",
          "Yüksek kaynama noktası sayesinde aşırı sıcaklıklarda güvenli çalışmayı destekler.",
        ],
        standards: "SAE J 1034, TS 3582, ASTM D3306, G-11",
        packaging: ["3 L", "20 L", "200 L"],
      },
      "Antifriz-Konsantre": {
        description: "HI-TECH ANTİFRİZ KONSANTRE, yüksek saflıkta etilen glikol esaslı konsantre soğutma sıvısıdır. Su ile istenilen oranda karıştırılarak -15°C ile -65°C arasında koruma sağlanabilir. Ticari araçlar, iş makineleri ve endüstriyel uygulamalar için ideal çözüm sunar.",
        features: [
          "Su ile farklı oranlarda karıştırılarak ihtiyaca göre donma noktası ayarlanabilir.",
          "Tüm metal yüzeyleri, conta ve hortumları uzun süre etkili biçimde korur.",
          "Konsantre formülü sayesinde ekonomik kullanım ve kolay depolama imkânı sağlar.",
        ],
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
        description: "HI-TECH KALSİYUM BEYAZ GRES, kalsiyum esaslı çok amaçlı bir gres yağıdır. Plastik ve kauçuk parçalara uyumludur; renk gerektiren uygulamalarda ve gıda sektöründe kullanılabilecek şekilde formüle edilmiştir. Geniş sıcaklık aralığında stabil yapısını korur.",
        features: [
          "Plastik, kauçuk ve metal yüzeylere uyumludur.",
          "Nem, su ve korozyona karşı etkili koruma sağlar.",
          "Geniş sıcaklık aralığında (-30°C ile +120°C) stabil kalır.",
        ],
        standards: "DIN 51502, NLGI 2",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Gres-Kirmizi": {
        description: "HI-TECH KALSİYUM KIRMIZI GRES, kalsiyum esaslı yüksek sıcaklık gresidir. Ağır hizmet koşullarında çalışan rulman, mafsallı mil ve şasi bileşenlerinde üstün koruma sağlar. Yüksek basınç ve darbe yüklerine dayanıklı yapısıyla öne çıkar.",
        features: [
          "Yüksek sıcaklık dayanımı sayesinde +180°C'ye kadar etkili koruma sağlar.",
          "Ağır yük ve darbe koşullarında mükemmel film mukavemeti sunar.",
          "Su direnci yüksektir; yağmur ve nem altında yerinden ayrılmaz.",
        ],
        standards: "DIN 51502, NLGI 2, ISO 6743-9",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Lithium-Gres": {
        description: "HI-TECH LİTYUM EP GRES, lityum sabunlu EP (Extreme Pressure) katkılı çok amaçlı bir gres yağıdır. Otomotiv, endüstriyel ve tarım ekipmanlarının rulman, dişli ve şasi noktalarında güvenilir yağlama sağlar. Geniş kullanım alanıyla filo ve bakım hizmetleri için ideal bir tercihtir.",
        features: [
          "Rulmanlar, şasi noktaları ve genel endüstriyel uygulamalar için çok amaçlı kullanım.",
          "Oksidasyona ve kimyasal bozunmaya karşı güçlü koruma sağlar.",
          "Uzun servis ömrüyle yağlama aralıklarını uzatır, bakım maliyetini düşürür.",
        ],
        standards: "DIN 51502, NLGI 2, ISO 6743-9",
        packaging: ["3.6 KG", "14 KG", "180 KG"],
      },
      "Gres-Yesil": {
        description: "HI-TECH KALSİYUM KAUÇUK YEŞİL GRES, kalsiyum esaslı kauçuk katkılı özel formüllü bir gres yağıdır. Aşırı yük altında çalışan ekipman ve iş makinelerinin dişli, mafsal ve mil yatakları için özel olarak geliştirilmiştir. Kauçuk ve plastik bileşenlere tam uyumludur.",
        features: [
          "MoS₂ katkısı sayesinde metal-metal temasını önler ve aşınmayı azaltır.",
          "Yüksek basınç ve ağır yük koşullarında üstün EP (Extreme Pressure) performansı sunar.",
          "İş makineleri, tarım ekipmanları ve ağır hizmet uygulamaları için idealdir.",
        ],
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
        description: "HI-TECH HYDRA 32 HİDROLİK YAĞ, ISO VG 32 viskozite kademesinde yüksek kaliteli anti-wear hidrolik yağıdır. Düşük viskoziteli sistemlerde, hafif yük hidrolik pompa ve motorlarında mükemmel performans sunar. Uzun sistem ömrü ve temiz çalışma için özel olarak formüle edilmiştir.",
        features: [
          "Düşük ısınma ve yüksek verimlilik için optimize edilmiş viskozite-sıcaklık karakteristiği.",
          "Pompa, valf ve silindirlerde aşınmayı önleyen anti-wear katkıları içerir.",
          "Su ve hava ayırma özellikleri sayesinde kavitasyona karşı koruma sağlar.",
        ],
        standards: "ISO VG 32, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Hydra-46": {
        description: "HI-TECH HYDRA 46 HİDROLİK YAĞ, ISO VG 46 viskozite kademesinde çok amaçlı endüstriyel hidrolik yağıdır. İnşaat makineleri, tarım ekipmanları ve endüstriyel hidrolik sistemlerde en yaygın kullanılan viskozite kademesidir. Üstün termal stabilite ve uzun servis ömrü sağlar.",
        features: [
          "Geniş çalışma sıcaklığı aralığında stabil viskozite özelliği sunar.",
          "Yüksek aşınma koruması ile pompa ve hidrolik bileşenlerin ömrünü uzatır.",
          "Korozyon ve oksidasyon önleyici katkılarla sistem bütünlüğünü korur.",
        ],
        standards: "ISO VG 46, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Hydra-68": {
        description: "HI-TECH HYDRA 68 HİDROLİK YAĞ, ISO VG 68 viskozite kademesinde ağır hizmet endüstriyel hidrolik yağıdır. Yüksek basınçlı sistemlerde, ağır yük altında çalışan preslerde ve büyük hacimli hidrolik ekipmanlarda üstün koruma sağlar. Termal bozunmaya karşı geliştirilmiş direnci ile öne çıkar.",
        features: [
          "Yüksek viskozite indeksi ile sıcaklık değişimlerinden etkilenmeden stabil kalır.",
          "Ağır yük ve yüksek basınç koşullarında mükemmel film mukavemeti sunar.",
          "Uzun yağ değişim aralıkları ile işletme maliyetini düşürür.",
        ],
        standards: "ISO VG 68, DIN 51524 Part 2 (HLP), VDMA 24318",
        packaging: ["20 L", "200 L"],
      },
      "Kesme-Yagi": {
        description: "HI-TECH KESME YAĞI, metal işleme operasyonlarında yüksek yağlama ve soğutma performansı sunan özel formüllü bir kesme yağıdır. Tornalama, frezeleme, matkap ve diş açma işlemlerinde takım ömrünü uzatır, yüzey kalitesini artırır ve korozyon oluşumunu engeller.",
        features: [
          "Yüksek yağlayıcılık özelliği ile kesici takım ömrünü önemli ölçüde uzatır.",
          "Etkili soğutma kapasitesi ile yüzey pürüzlülüğünü azaltır ve işleme kalitesini artırır.",
          "Korozyon önleyici formülü ile iş parçası ve tezgahı paslanmaya karşı korur.",
        ],
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
        description: "HI-TECH MARINE 4T 10W-30, 4 zamanlı dıştan takma deniz motorları için özel olarak formüle edilmiş yüksek performanslı bir motor yağıdır. Denizcilikte karşılaşılan ağır hava koşullarına ve deniz suyunun korozif ortamına karşı üstün koruma sağlar.",
        features: [
          "4 zamanlı dıştan takma deniz motorları için özel olarak geliştirilmiştir.",
          "Tuzlu su ve nem ortamında korozyon ve paslanmaya karşı güçlü koruma sağlar.",
          "Yüksek sıcaklık ve yüksek devirde çalışan motorlarda kararlı viskozite sunar.",
        ],
        standards: "API SL, JASO MA2, NMMA FC-W",
        packaging: ["1 L", "200 L"],
      },
      "Marine-2T": {
        description: "HI-TECH MARINE 2T TC-W3, NMMA onaylı, 2 zamanlı dıştan takma deniz motorları için tasarlanmış özel bir motor yağıdır. TC-W3 sertifikasyonu ile geniş motor yelpazesinde mükemmel yağlama ve koruma sağlar.",
        features: [
          "NMMA TC-W3 onaylı formül, geniş marka ve model yelpazesinde güvenilir koruma sağlar.",
          "Egzoz ve piston tortulaşmasını minimuma indirerek motoru temiz tutar.",
          "Deniz ortamının agresif koşullarına karşı üstün anti-korozyon özellikleri sunar.",
        ],
        standards: "NMMA TC-W3, ISO-L-EGD",
        packaging: ["1 L", "200 L"],
      },
      "Marine-4T-25W40": {
        description: "HI-TECH MARINE 4T 25W-40, güçlü 4 zamanlı dıştan takma deniz motorları için yüksek viskoziteli özel formüllü motor yağıdır. Ağır yük altında çalışan yüksek devirli deniz motorlarında üstün koruma ve performans sunar.",
        features: [
          "Yüksek viskozitesi ile büyük güçlü ve yüksek performanslı deniz motorları için idealdir.",
          "Sıcaklık değişimlerinde kararlı yağ filmi oluşturarak motor aşınmasını önler.",
          "Deniz suyu ile temas halinde bile etkin koruma sağlayan özel anti-korozyon katkıları içerir.",
        ],
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
        description: "HI-TECH 5W-30 AĞIR HİZMET DİZEL YAĞI, API CK-4 ve ACEA E6/E11 onaylı tam sentetik teknoloji ile üretilmiş en üst seviye ağır hizmet dizel motor yağıdır. Katı emisyon standartlarını karşılayan modern dizel motorlar için özel olarak formüle edilmiştir.",
        features: [
          "API CK-4 ve ACEA E6/E11 onayı ile en güncel ağır hizmet dizel motor gereksinimlerini karşılar.",
          "Düşük viskoziteli sentetik formülü ile soğuk çalışmayı kolaylaştırır ve yakıt tasarrufu sağlar.",
          "DPF ve EGR sistemleriyle tam uyumlu; parçacık filtresi ömrünü korur.",
        ],
        standards: "API CK-4, ACEA E6/E11, Volvo VDS-4.5, MB 228.51",
        packaging: ["20 L", "200 L"],
      },
      "HD-10W40": {
        description: "HI-TECH 10W-40 AĞIR HİZMET DİZEL YAĞI, API CI-4 ve ACEA E7/E9 onaylı sentetik teknoloji ağır hizmet dizel motor yağıdır. Kamyon, otobüs ve uzun yol araçlarının talepkâr çalışma koşullarında üstün motor koruması sağlar.",
        features: [
          "API CI-4 ve ACEA E7/E9 çift onayı ile geniş araç yelpazesinde güvenilir kullanım imkânı sunar.",
          "Yüksek torku ve uzun mesafeyi göze alarak formüle edilmiş gelişmiş anti-wear katkılar içerir.",
          "Uzun yağ değişim aralıkları ile işletme maliyetini düşürür.",
        ],
        standards: "API CI-4, ACEA E7/E9, Volvo VDS-3, MB 228.3",
        packaging: ["20 L", "200 L"],
      },
      "HD-15W40": {
        description: "HI-TECH 15W-40 AĞIR HİZMET DİZEL YAĞI, API CI-4 ve ACEA C7 onaylı sentetik teknoloji ağır hizmet motor yağıdır. Ağır koşullarda çalışan dizel ve benzinli motorlar için kapsamlı koruma sunan çok amaçlı bir formüldür.",
        features: [
          "API CI-4 onaylı formülü ile dizel ve benzinli ağır hizmet motorlarında geniş kullanım sağlar.",
          "Yüksek sıcaklıklarda oksidasyona ve viskozite düşüşüne karşı üstün termal stabilite sunar.",
          "Sert çalışma koşullarında motor içini temiz tutarak bakım aralıklarını uzatır.",
        ],
        standards: "API CI-4, ACEA C7, MB 228.3, MAN M3275",
        packaging: ["20 L", "200 L"],
      },
      "SAE-30W": {
        description: "HI-TECH SAE 30W MONOGRAT MOTOR YAĞI, API CF/SG onaylı mineral bazlı tek viskozite kademeli ağır hizmet motor yağıdır. Sıcak ve sabit çalışma koşullarındaki dizel motorlar ile tarım ve iş makineleri için güvenilir yağlama sağlar.",
        features: [
          "API CF/SG onaylı monograt formülü ile hem dizel hem benzinli motorlarda kullanılabilir.",
          "Sabit yük ve sıcak iklim koşullarında kararlı yağ filmi oluşturarak motoru korur.",
          "Ekonomik mineral baz yağ ile geniş ekipman yelpazesinde uygun maliyet sunar.",
        ],
        standards: "API CF/SG, MIL-L-2104C",
        packaging: ["20 L", "200 L"],
      },
      "SAE-40W": {
        description: "HI-TECH SAE 40W MONOGRAT MOTOR YAĞI, API CF/SG onaylı ağır hizmet mineral motor yağıdır. Yüksek sıcaklık ve ağır yük koşullarında çalışan statüoner motorlar, jeneratörler ve endüstriyel ekipmanlarda uzun ömürlü koruma sağlar.",
        features: [
          "Yüksek viskozitesi ile sıcak ortamlarda kararlı yağ filmi ve güçlü motor koruması sunar.",
          "Statüoner dizel motorlar, jeneratörler ve ağır iş makineleri için idealdir.",
          "Aşınma ve korozyon önleyici katkılarla motor bileşenlerinin ömrünü uzatır.",
        ],
        standards: "API CF/SG, MIL-L-2104C",
        packaging: ["20 L", "200 L"],
      },
      "SAE-50W": {
        description: "HI-TECH SAE 50W MONOGRAT MOTOR YAĞI, API CF/CF-4/SG onaylı yüksek viskoziteli mineral motor yağıdır. Aşırı sıcak iklimlerde, eski nesil büyük hacimli dizel motorlarda ve yüksek yük altındaki endüstriyel uygulamalarda üstün koruma sağlar.",
        features: [
          "API CF/CF-4/SG üçlü onayı ile geniş motor tiplerinde güvenilir kullanım imkânı sunar.",
          "Yüksek viskozite indeksi ile aşırı sıcaklıklarda yağ filminin bütünlüğünü korur.",
          "Büyük çaplı motorlar ve ağır yük uygulamalarında güçlü anti-wear performansı sağlar.",
        ],
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
                  {t.hitech.becomeDistributor} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
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
      className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
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
                className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
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
  const { t, data } = useTranslation();
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
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/85 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[80vh] max-w-[88vw] object-contain drop-shadow-2xl"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 sm:-right-4 sm:-top-4"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-800" />
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
              className="inline-flex min-h-[44px] items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
              {translatedSubcatTitle ?? translatedCatTitle ?? category}
            </LocaleLink>
          </div>
        </div>

        {/* Hero: image + docs */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Circular product image — circle is the background, image floats on top */}
            <div className="flex w-full shrink-0 items-center justify-center lg:w-auto">
              <button
                onClick={() => setLightboxOpen(true)}
                className="group relative flex h-64 w-64 cursor-zoom-in items-center justify-center sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                aria-label="Resmi büyüt"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 h-56 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-64 lg:h-72"
                />
                <span className="absolute bottom-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow transition-opacity group-hover:opacity-100 sm:opacity-0">
                  <ZoomIn className="h-4 w-4 text-gray-700" />
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
                {detail.description.replace(/^[^,]+,\s*/, "")}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                {t.hitech.productFeatures}
              </h3>
              <div className="space-y-2">
                {detail.features.map((f) => (
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
              <p className="text-sm text-muted-foreground">{detail.standards}</p>
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
