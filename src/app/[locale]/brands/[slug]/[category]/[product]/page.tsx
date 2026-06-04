import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ProductImageLightbox from "./ProductImageLightbox";

function toSlug(name: string) {
  return name
    .replace(/^(Shell|Mobil|Castrol|Total|Elf|Motul|Texol|Texaco|Petrol Ofisi)\s+/i, "")
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface ProductSpec {
  name: string;
  grade: string;
  series: string;
  type: string;
  api: string;
  acea: string;
  approvals: string[];
  description: string;
  features: string[];
  image?: string;
  fullDescription?: string;
}

const SHELL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "helix-ultra-sp-0w-20": {
    name: "Shell Helix Ultra SP 0W-20", grade: "0W-20", series: "Helix Ultra SP", type: "Tam Sentetik",
    api: "SP", acea: "C5",
    approvals: [],
    description: "API SP ve ACEA C5 sertifikalı, PurePlus teknolojisiyle doğal gazdan sentezlenen tam sentetik motor yağı. Pistonları endüstri standardına göre %50 daha temiz tutar ve yakıt ekonomisini artırır.",
    features: ["API SP sertifikalı", "PurePlus Teknolojisi", "ACEA C5 uyumlu", "Maksimum yakıt tasarrufu"],
    image: "/images/products/shell/helix-ultra-sp-0w-20.jpg",
    fullDescription: `Motor üreticilerinin özel gereksinimlerini karşılamak üzere tasarlandı. Günümüz araçlarının, değişen taleplere ayak uyduran, performansı ve motor ömrünü artırmak için daha fazlasını yapan bir motor yağına ihtiyacı var. Bu nedenle Shell, patentli Shell PurePlus Teknolojisi ile doğal gazdan üretilen sentetik baz yağlar üretmenin tamamen yeni bir yolunu buldu.

Shell Helix Ultra, benzersiz Shell PurePlus Teknolojisi kullanılarak formüle edilmiş, motorları temiz tutmaya aktif olarak yardımcı olan üst düzey bir motor yağı serisidir. Aktif Temizleme Teknolojisi her zaman Shell Helix'in kalbinde yer almıştır. Eşsiz Shell PurePlus Teknolojisi ile başlamak, ürünün daha da yüksek düzeyde temizlik ve koruma sağlamasına olanak tanır.

PERFORMANS ÖZELLİKLERİ
• Benzersiz aşınma ve çamur koruması
• Pistonları endüstri standardına göre %50 daha temiz bırakır
• Emisyonlarda buna karşılık gelen azalmayla birlikte gelişmiş yakıt ekonomisi

STANDARTLAR VE SPESİFİKASYONLAR
ACEA C5
API SP`,
  },
  "helix-ultra-ect-c2-c3-0w-30": {
    name: "Shell Helix Ultra ECT C2-C3 0W-30", grade: "0W-30", series: "Helix Ultra ECT C2-C3", type: "Tam Sentetik",
    api: "SN", acea: "C2/C3",
    approvals: ["VW 504.00/507.00", "MB 229.52/229.51/229.31", "Fiat 9.55535-GS1/DS1", "Porsche C30"],
    description: "VW 504/507, MB 229.52, Fiat GS1/DS1 ve Porsche C30 onaylı tam sentetik motor yağı. DPF ve katalitik konvertör uyumlu düşük SAPS formülasyonu ile emisyon sistemlerini korur.",
    features: ["VW 504.00/507.00 onaylı", "MB 229.52/229.31 onaylı", "Porsche C30 onaylı", "Düşük SAPS / DPF uyumlu"],
    image: "/images/products/shell/helix-ultra-ect-c2-c3-0w-30.jpg",
    fullDescription: `Tam sentetik motor yağı – Shell'den egzoz emisyon sistemleri için üstün koruma.

Bu güne kadar en gelişmiş formülümüz olan Shell Helix Ultra ECT C2/C3 0W-30 ile motorunuza üstün performans ve koruma sağlayın. Yüksek kaliteli tam sentetik motor yağları portföyümüzün en yenisi, her zamankinden daha fazla performans sağladığı kanıtlandı. Emisyon Uyumlu Teknolojimiz (ECT) sayesinde Shell Helix Ultra ECT C2/C3 modern dizel ve benzinli motorların çoğunluğunda kirliliğin ve tortu birikmesinin önlenmesine yardımcı olmak için geliştirildi.

Shell PurePlus Teknolojisiyle yüksek performanslı katık paketini birleştiren Shell Helix Ultra ECT C2/C3 daha da yüksek seviyede temizleme ve koruma sağlıyor.

PERFORMANS ÖZELLİKLERİ
• %2,6'ya kadar daha fazla yakıt ekonomisi
• Korozyon aşınmasına karşı sektörün en son standardından 3 kata kadar daha iyi, eşsiz koruma
• Aşınmaya karşı sektörün en son standardından 4 kata kadar daha iyi koruma
• Sektör standardından %45'e kadar daha temiz pistonlar
• Dizel partikül filtrelerini temiz tutmaya yardımcı olarak emisyon sistemlerini korur
• Çamurlaşmaya karşı eşsiz koruma

STANDARTLAR VE SPESİFİKASYONLAR
ACEA C2, ACEA C3
API SN
VW 504.00/507.00
MB 229.52, MB 229.51, MB 229.31
Fiat 955535.GS1 & Fiat 955535.DS1
Porsche C30`,
  },
  "helix-ultra-pro-af-5w-30": {
    name: "Shell Helix Ultra Pro AF 5W-30", grade: "5W-30", series: "Helix Ultra Pro AF", type: "Tam Sentetik",
    api: "SL", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-C", "Ford WSS-M2C913-D", "Jaguar Land Rover STJLR.03.5003"],
    description: "Ford WSS-M2C913-C/D ve Jaguar Land Rover STJLR.03.5003 onaylı tam sentetik motor yağı. Ford ve Jaguar/Land Rover araçlarında uzun servis aralığı ve üstün koruma sağlar.",
    features: ["Ford WSS-M2C913-C/D onaylı", "Jaguar Land Rover onaylı", "A5/B5 uyumlu", "Uzun değişim aralığı"],
    image: "/images/products/shell/helix-ultra-pro-af-5w-30.jpg",
    fullDescription: `Tam sentetik motor yağı – Motor üreticilerinin özel gereksinimlerini karşılamak üzere geliştirilmiştir.

Özellikle yüksek performanslı motorların zor gereksinimlerini karşılayacak şekilde geliştirilmiştir. Buna Ford ve ACEA A5/B5 gereksinimleri dahildir.

Shell ve Ford birçok ülkede yerel ilişkilere sahiptir ve Shell, Hindistan ve ABD'de Ford için önde gelen tedarikçidir.

WSS-M2C913-C motor yağı spesifikasyonuna uygunluk için kapsamlı performans testlerinden geçmiştir.

STANDARTLAR VE SPESİFİKASYONLAR
ACEA A5/B5
API SL
Ford WSS-M2C913-C
Ford WSS-M2C913-D
Jaguar Land Rover STJLR.03.5003`,
  },
  "helix-ultra-pro-ag-5w-30": {
    name: "Shell Helix Ultra Pro AG 5W-30", grade: "5W-30", series: "Helix Ultra Pro AG", type: "Tam Sentetik",
    api: "SN", acea: "C3",
    approvals: ["GMW16177 (dexos2™)"],
    description: "GMW16177 (dexos2™) onaylı tam sentetik motor yağı. GM araçları için özel olarak formüle edilmiş; emisyon sonrası sistemleri korurken üstün motor temizliği ve yakıt ekonomisi sağlar.",
    features: ["dexos2™ onaylı", "ACEA C3 uyumlu", "GM araçları için özel", "Emisyon sistemi koruması"],
    image: "/images/products/shell/helix-ultra-pro-ag-5w-30.jpg",
    fullDescription: `Tam sentetik motor yağı – Motor üreticilerinin özel gereksinimlerini karşılamak üzere geliştirilmiştir.

Günümüzün yüksek performanslı motorları, değişen ihtiyaçlara ayak uyduran ve motor performansını artırıp motor ömrünü uzatan bir motor yağına ihtiyaç duymaktadır. Shell'in, sentetik baz yağ üretiminde kullandığı patentli Shell PurePlus Teknolojisi ile doğal gazdan motor yağı geliştirmesinin nedeni budur.

Shell Helix Ultra, motorların temiz kalmasına aktif olarak yardımcı olan bir motor yağı üretilmesini sağlayan eşsiz Shell PurePlus Teknolojisi ile geliştirilen yüksek performanslı motor yağı yelpazesidir. Aktif Temizleme Teknolojisi, Shell Helix'in her zaman merkezinde yer almıştır. Eşsiz Shell PurePlus Teknolojisi ile başlamak, ürünün çok daha yüksek temizleme ve koruma düzeyleri sağlamasını mümkün kılar.

PERFORMANS ÖZELLİKLERİ
• General Motors ile API SN veya ACEA C3 gerektirenler de dahil olmak üzere, özellikle yüksek performanslı motorların zorlu gereksinimlerini karşılayacak şekilde geliştirilmiştir
• Shell ile General Motors arasındaki yıllar süren teknolojik işbirliği ve yağlayıcı araştırma çalışmalarıyla geliştirilmiştir
• GMW16177 (dexos2™) motor yağı spesifikasyonuna uygunluk için kapsamlı performans testlerinden geçmiştir

STANDARTLAR VE SPESİFİKASYONLAR
API SN
ACEA C3
GMW16177 (dexos2™)`,
  },
  "helix-ultra-pro-ar-l-5w-30": {
    name: "Shell Helix Ultra Pro AR-L 5W-30", grade: "5W-30", series: "Helix Ultra Pro AR-L", type: "Tam Sentetik",
    api: "—", acea: "C4",
    approvals: ["Renault RN0720"],
    description: "Renault RN0720 onaylı ve ACEA C4 uyumlu tam sentetik motor yağı. DPF filtreli Renault ve Nissan benzinli/dizel motorlar için özel olarak formüle edilmiştir.",
    features: ["Renault RN0720 onaylı", "ACEA C4 uyumlu", "DPF filtreli motorlar için", "Renault/Nissan özel"],
    image: "/images/products/shell/helix-ultra-pro-ar-l-5w-30.jpg",
    fullDescription: `Dizel partikül filtreli olanlar da dahil, tüm Renault ve Nissan benzinli ve dizel motorlara en yüksek koruma sağlamak üzere özel olarak dizayn edilmiş en son nesil tam sentetik motor yağıdır. Üretiminde kullanılan aktif temizleme teknolojisi, kurum ve tortu oluşumunu engellediğinden, motor performansını bir sonraki yağ değişimine kadar maksimum seviyede tutar.

Shell şu anda Renault-Nissan ittifakının bir numaralı küresel madeni yağ tedarikçisidir. Motor yağı spesifikasyonu Renault RN0720 karşılamak için kapsamlı performans testlerinden geçmiştir.

PERFORMANS ÖZELLİKLERİ
• Emisyon sistemini korur: Düşük SAPS özelliği sayesinde, üç yollu katalizör sistemine sahip benzinli motorların ömrünü uzatır. Partikül filtreli dizel motorlar için de uygundur.
• Aktif temizleme teknolojisiyle üretilmiştir: Kirli motorlardan tortu birikimini temizlemede mineral yağlardan daha etkilidir.
• Yüksek oksidasyon kararlılığı: Bir sonraki yağ değişimine kadar yağdaki bozunmayı önler.
• Özel olarak seçilmiş sentetik baz yağ: Yağın uçuculuğunu, dolayısıyla yağ tüketimini azaltır.
• Yüksek yırtılma direnci: Bir sonraki yağ değişimine kadar viskozitesini ve sınıfının özelliklerini korur.
• Çevre koruma: CO2 egzoz emisyonlarını azaltmak üzere özel olarak formüle edilmiştir.
• Titreşimi ve motor gürültüsünü en aza indirir: Daha pürüzsüz, daha sessiz bir sürüş.

STANDARTLAR VE SPESİFİKASYONLAR
ACEA C4
Renault RN0720`,
  },
  "helix-ultra-pro-am-l-5w-30": {
    name: "Shell Helix Ultra Pro AM-L 5W-30", grade: "5W-30", series: "Helix Ultra Pro AM-L", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "Maserati"],
    description: "BMW LL-04 ve MB 229.51 onaylı tam sentetik motor yağı. BMW ve Mercedes-Benz premium araçlarında üst düzey motor koruması ve uzun değişim aralığı sağlar.",
    features: ["BMW LL-04 onaylı", "MB 229.51 onaylı", "Premium araç formülasyonu", "Uzun değişim aralığı"],
    image: "/images/products/shell/helix-ultra-pro-am-l-5w-30.jpg",
    fullDescription: `Tam sentetik motor yağı – Motor üreticilerinin özel gereksinimlerine uygun olarak geliştirilmiştir.

Otomotiv teknolojisindeki güncel gelişmeler nedeniyle günümüzün araçları, motor ömrünü uzatmak ve performansı artırmak gibi farklı taleplere yanıt verebilecek motor yağlarına ihtiyaç duyuyorlar.

Shell Helix Ultra, motorların temiz kalmasına yardımcı olan bir motor yağı üretilmesini sağlayan eşsiz Shell PurePlus Teknolojisi ile geliştirilen yüksek performanslı bir ürün grubudur. Aktif Temizleme Teknolojisinin Shell PurePlus Teknolojisi ile eşsiz birleşimi sonucu üstün temizlik ve koruma sağlayan bir motor yağı üretiriz.

PERFORMANS ÖZELLİKLERİ
• Mercedes-Benz ve BMW ile API SN/CF veya ACEA C3 dahil olmak üzere, özellikle yüksek performanslı motorların zorlu gereksinimlerini karşılayacak şekilde geliştirilmiştir
• Shell ve Mercedes-Benz arasında teknik iş birlikteliği olup araştırma ve geliştirme projeleri yürütülmektedir
• MB 229.51 spesifikasyonuna uygunluk için kapsamlı performans testlerinden geçmiştir

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA C3
BMW LL-04
MB 229.51
Maserati`,
  },
  "helix-ultra-pro-ap-l-5w-30": {
    name: "Shell Helix Ultra Pro AP-L 5W-30", grade: "5W-30", series: "Helix Ultra Pro AP-L", type: "Tam Sentetik",
    api: "—", acea: "C2",
    approvals: ["PSA B71 2290", "Fiat 9.55535-S1", "IVECO 18-1811 SP"],
    description: "PSA B71 2290, Fiat 9.55535-S1 ve IVECO 18-1811 SP onaylı tam sentetik motor yağı. PSA grubu ve IVECO ticari araçlarında emisyon sistemi koruması sağlar.",
    features: ["PSA B71 2290 onaylı", "Fiat 9.55535-S1 onaylı", "IVECO onaylı", "ACEA C2 uyumlu"],
    image: "/images/products/shell/helix-ultra-pro-ap-l-5w-30.png",
    fullDescription: `Tam sentetik motor yağı – motor üreticilerinin özel gereksinimlerine uygun olarak geliştirilmiştir.

Günümüzün yüksek performanslı motorları, değişen ihtiyaçlara ayak uyduran ve motor performansını artırıp motor ömrünü uzatan bir motor yağına ihtiyaç duymaktadır. Shell'in, sentetik baz yağ üretiminde kullandığı patentli Shell PurePlus Teknolojisi ile doğal gazdan motor yağı geliştirmesinin nedeni budur.

Shell Helix Ultra, motorların temiz kalmasına aktif olarak yardımcı olan bir motor yağı üretilmesini sağlayan eşsiz Shell PurePlus Teknolojisi ile geliştirilen birinci kalite motor yağı yelpazesidir. Aktif Temizleme Teknolojisi, Shell Helix'in her zaman odağında yer almıştır.

PERFORMANS ÖZELLİKLERİ
• Peugeot, Citroën ve Fiat ile ACEA C2 gereksinimleri dahil olmak üzere, özellikle yüksek performanslı motorların zor gereksinimlerini karşılayacak şekilde geliştirilmiştir
• Shell, Avrupa ve Hindistan'da birçok PSA servisinde servis dolum motor yağları tedarik etmektedir
• Fiat 9.55535-S1 ve PSA B71 2290 motor yağı spesifikasyonlarına uygunluk için kapsamlı performans testlerinden geçmiştir

STANDARTLAR VE SPESİFİKASYONLAR
ACEA C2
PSA B71 2290
Fiat 9.55535-S1
IVECO 18-1811 SP`,
  },
  "helix-ultra-ect-multi-5w-30": {
    name: "Shell Helix Ultra ECT Multi 5W-30", grade: "5W-30", series: "Helix Ultra ECT Multi", type: "Tam Sentetik",
    api: "—", acea: "C2/C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504.00/507.00", "PSA Service Fill"],
    description: "BMW LL-04, MB 229.51 ve VW 504.00/507.00 onaylı katalitik konvertör ve DPF uyumlu tam sentetik motor yağı. Aktif temizleme teknolojisi mineral yağlara göre 5 kat daha etkin çalışır.",
    features: ["BMW LL-04 onaylı", "VW 504.00/507.00 onaylı", "Düşük SAPS formülasyon", "DPF koruması"],
    image: "/images/products/shell/helix-ultra-ect-multi-5w-30.jpg",
    fullDescription: `Shell Helix Ultra ECT 5W-30 (eski adıyla Shell Helix Ultra Extra 5W-30), egzoz gazı resirkülasyon sistemleri, pozitif karter havalandırması, katalitik konverterler ve partiküler filtreler ile donatılmış tüm yakıt enjeksiyonlu motorlar için üretilmiştir.

Partiküler filtreler, geleneksel motor yağları tarafından hasar görebilir. Bu ürün, kir ve çamur birikimini sürekli önleyen Shell'nin premium aktif temizleme teknolojisine sahipken filtreleri korur ve maksimum performans ile koruma sağlar. Formül, mineral yağlara kıyasla çamur giderimi konusunda 5 kat daha etkilidir.

PERFORMANS ÖZELLİKLERİ
• Düşük SAP (Sülfatlı Kül, Fosfor, Kükürt) formülasyonu emisyon sistemlerini korur
• Shell'nin üstün aktif temizleme teknolojisi
• Uzatılmış oksidasyon stabilitesi
• Düşük viskozite sayesinde hızlı yağ akışı ve azaltılmış sürtünme
• Yüksek aşınma direnci
• Özel olarak seçilmiş sentetik baz yağlar
• Titreşim ve motor gürültüsünü azaltır
• Egzoz sonrası arıtma sistemlerinin ömrünü uzatır
• Rakip sentetik markalarla karşılaştırıldığında yaklaşık %37 daha fazla koruma
• Geliştirilmiş yakıt verimliliği ve iyileştirilmiş soğuk çalışma
• Yağ değişim aralıkları boyunca viskoziteyi korur

STANDARTLAR VE SPESİFİKASYONLAR
ACEA C2/C3
BMW LL-04
MB 229.51
VW 504.00/507.00
PSA Service Fill`,
  },
  "rimula-r6-lme-5w-30": {
    name: "Shell Rimula R6 LME 5W-30", grade: "5W-30", series: "Rimula R6 LME", type: "Tam Sentetik",
    api: "CF", acea: "E7/E4",
    approvals: ["MB 228.5", "MAN 3277", "Volvo VDS-3", "Scania LDF-2", "Renault Trucks RXD", "Cummins CES 20072", "MTU Category 3"],
    description: "MB 228.5, MAN 3277, Volvo VDS-3 ve Scania LDF-2 onaylı tam sentetik ağır hizmet dizel motor yağı. Düşük emisyonlu motorlarda uzatılmış değişim aralığı sağlar.",
    features: ["MB 228.5 onaylı", "Scania LDF-2 onaylı", "Volvo VDS-3 onaylı", "Uzatılmış değişim aralığı"],
    image: "/images/products/shell/rimula-r6-lme-5w-30.jpg",
    fullDescription: `Düşük emisyon, bakım masraflarından tasarruf ve enerji tasarrufu.

Shell Rimula ağır hizmet dizel motor yağlarının Enerjili Koruması üç ayrı kritik alanda faaliyet gösterir:
1. Asit kontrolü – kesin olarak kanıtlanmış performans katkıları, yakıt yandığı zaman oluşan asitlerden kaynaklanan korozyona karşı koruma sağlar.
2. Tortu kontrolü – motoru sürekli performans ve uzun ömür sağlayacak şekilde temiz tutar.
3. Aşınma kontrolü – hareketli metal motor parçalarını birbirinden ayrı tutarak motor ömrünü uzatır.

Shell Rimula R6 LME, motorun değişen ihtiyaçlarına karşılık verecek şekilde kimyasal ve fiziksel olarak adapte olan eşsiz bir teknolojiden yararlanmaktadır. Sentetik baz yağ teknolojisi, eşsiz katkı teknolojisi ve özel bir aşınma önleyici takviye sisteminin birleşimi, dayanıklılıktan ödün vermeden üstün performans, uzun yağ değiştirme aralığı ve yakıt tasarrufu kapasitesi sağlar.

ENERJI TASARRUFU
İngiltere'nin lider süpermarketlerinden birisindeki kamyon filosuyla yapılan denemelerde müşteri, Shell Rimula R6 LME'nin tipik bir 10W-40 yağına kıyasla 100.000 km'lik bir yağ değiştirme aralığında %2,0'ye kadar yakıt tasarrufu gerçekleştirdiğini teyit etmiştir.

BAKIM TASARRUFLARI
MB OM501 motor testinde referans yağın piston temizliğinden %25 daha iyi bir temizlik sağlamıştır. Mercedes-Benz ve diğerleri tarafından uzun yağ değiştirme uygulaması için onaylanmıştır.

STANDARTLAR VE SPESİFİKASYONLAR
SAE 5W-30
ACEA E6, E7
Cummins CES 20077
MAN M3477
MB 228.51`,
  },
  "helix-ultra-5w-40": {
    name: "Shell Helix Ultra 5W-40", grade: "5W-40", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SL/CF", acea: "A3/B3/B4",
    approvals: ["Ferrari", "Porsche", "BMW Longlife '98", "MB 229.3", "VW 500.00/502.00/505.00", "SAAB"],
    description: "Ferrari, Porsche, BMW LL-98 ve MB 229.3 onaylı üst segment tam sentetik motor yağı. Benzinli, dizel ve LPG motorlarda yüksek performans ve kapsamlı koruma sağlar.",
    features: ["Ferrari ve Porsche onaylı", "BMW LL-98 onaylı", "MB 229.3 onaylı", "Çok yakıt tipi uyumlu"],
    image: "/images/products/shell/helix-ultra-5w-40.jpg",
    fullDescription: `Kullanıcılarına yüksek performanslı sürüş sağlayan eşsiz bir formülasyona sahip tam sentetik motor yağıdır. Shell'in Formula 1 yarışlarındaki deneyimleri ile geliştirilmiş, en zorlu sürüş şartlarında test edilmiş ve performansı onaylanmıştır. Shell Helix Ultra, Ferrari tarafından onay verilen tek motor yağıdır.

UYGULAMALAR
• Benzinli, dizel ve LPG ile çalışan tüm doğal aspirasyonlu, enjeksiyonlu, turboşarjlı ve çok valfli motorlarda kullanılabilir.

PERFORMANS ÖZELLİKLERİ
• Çok yüksek koruma, mükemmel temizleme ve uzun motor ömrü
• Formula 1 teknolojisi ile geliştirilmiş
• Geliştirilmiş yakıt ekonomisi ve düşük sıcaklık performansı
• Düşük yağ tüketimi: özel sentetik baz yağı sayesinde düşük uçuculuk
• Katalitik konvertörlü ve turboşarjlı araçlarda etkin koruma
• Çok yüksek devirli sürüş şartlarında ve şehir içi dur-kalk kullanımında üstün performans

TİPİK FİZİKSEL ÖZELLİKLER
Kinematik Viskozite @ 40°C: 75,4 mm²/s
Kinematik Viskozite @ 100°C: 13,16 mm²/s
Viskozite İndeksi: 178
Yoğunluk @ 15°C: 851 kg/m³
Parlama Noktası: 217°C
Akma Noktası: -39°C

STANDARTLAR VE SPESİFİKASYONLAR
API SL/CF
ACEA A3/B3/B4-98
Ferrari Onaylı
VW 500.00, 502.00, 505.00
Porsche Onaylı
BMW Longlife '98
Peugeot-Citroën PSA E ve D
Mercedes-Benz 229.3
SAAB`,
  },
  "helix-hx8-5w-30": {
    name: "Shell Helix HX8 5W-30", grade: "5W-30", series: "Helix HX8", type: "Tam Sentetik",
    api: "SM/CF", acea: "A3/B3/B4",
    approvals: ["BMW LL-01", "MB 229.5", "VW 502.00/505.00", "Renault RN0700/RN0710"],
    description: "BMW LL-01, MB 229.5 ve VW 502.00/505.00 onaylı tam sentetik motor yağı. Aktif temizleme teknolojisiyle kiri konvansiyonel yağlara göre 4 kat daha etkin giderir.",
    features: ["BMW LL-01 onaylı", "MB 229.5 onaylı", "VW 502/505 onaylı", "Aktif temizleme teknolojisi"],
    image: "/images/products/shell/helix-hx8-5w-30.jpg",
    fullDescription: `Tam sentetik motor yağı – modern araçlarda maksimum performans için mühendislik.

Shell Helix HX8 5W-30, yaklaşık 4 kat daha etkili olan üstün aktif temizleme teknolojisi ile kirli motorlardan tortu ve kiri temizler. Uzatılmış oksidasyon stabilitesi ile uzun servis aralıklarında üstün oksidasyon direnci ve uzatılmış koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Rakip tam sentetik ürünlere kıyasla yaklaşık %35 daha yüksek koruma
• Hızlı yağ akışını kolaylaştırır ve soğuk startları iyileştirmek için sürtünmeyi azaltır
• Zararlı tortu birikintilerini (soot, vernik, yüksek sıcaklık kalıntıları) motor bileşenlerine birikmeden önler
• Koruyucu film katmanı oluştururken yanma artıklarından kaynaklanan asidik yan ürünleri nötralize eder
• Geliştirilmiş yakıt ekonomisi

STANDARTLAR VE SPESİFİKASYONLAR
API SM/CF
ACEA A3/B3/B4
BMW LL-01
Mercedes-Benz 229.5
VW 502.00/505.00
Renault RN0700, RN0710`,
  },
  "helix-hx8-5w-40": {
    name: "Shell Helix HX8 5W-40", grade: "5W-40", series: "Helix HX8", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.3", "VW 502.00/505.00", "Renault RN0700/RN0710", "Fiat 9.55535-N2", "Fiat 9.55535-M2"],
    description: "MB 229.3, VW 502.00/505.00 ve Fiat 9.55535-N2/M2 onaylı tam sentetik motor yağı. Benzinli, dizel ve LPG motorlarda geniş sıcaklık yelpazesinde üstün koruma sağlar.",
    features: ["MB 229.3 onaylı", "Fiat 9.55535-N2/M2 onaylı", "Benzinli/Dizel/LPG uyumlu", "Üstün aşınma koruması"],
    image: "/images/products/shell/helix-hx8-5w-40.jpg",
    fullDescription: `Tam sentetik motor yağı – üstün performans, temizlik ve motor koruması.

• En zorlu sürüş şartlarında bile aşınmaya karşı koruma sağlayarak motor ömrünün uzatılmasına yardımcı olur
• Araç üreticileri tarafından tavsiye edilen tüm yağ değiştirme aralıklarına uygundur
• Düşük yağ tüketimi sağlar
• Benzinli, dizel ve gazlı motorlarda kullanılabilir; biyodizel ve benzin/etanol karışımları için de uygundur

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B3, A3/B4
MB 229.3
VW 502.00/505.00
Renault RN0700, RN0710
Fiat 9.55535-N2 ve 9.55535-M2`,
  },
  "rimula-r6-m-10w-40": {
    name: "Shell Rimula R6 M 10W-40", grade: "10W-40", series: "Rimula R6 M", type: "Tam Sentetik",
    api: "CF", acea: "E7/E4",
    approvals: ["Cummins CES 20072", "MAN 3277", "MB 228.5", "MTU Category 3", "Renault Trucks RXD", "Scania LDF-2", "Volvo VDS-3"],
    description: "Cummins, MAN 3277, MB 228.5, Scania LDF-2 ve Volvo VDS-3 onaylı tam sentetik ağır hizmet dizel motor yağı. Euro 2-4 motorlar için uzatılmış servis aralığı ve yakıt tasarrufu.",
    features: ["Volvo VDS-3 onaylı", "Scania LDF-2 onaylı", "MB 228.5 onaylı", "Uzatılmış değişim aralığı"],
    image: "/images/products/shell/rimula-r6-m-10w-40.png",
    fullDescription: `Tam Sentetik Ağır Hizmet Dizel Motor Yağı.

UYGULAMALAR
Mercedes-Benz, MAN, DAF, Volvo ve diğer düşük emisyonlu motorlara sahip araçların taşımacılık uygulamalarında kullanılır. Ayrıca Volvo, Renault, DAF, Scania gibi Avrupalı üreticilerin; Cummins, Mack gibi Amerikalı üreticilerin ve birçok Japon motor üreticisinin performans kriterlerini karşılar veya aşar.

Shell Rimula R6 M, birçok Avrupalı motor üreticisinin Euro 2, Euro 3 ve bazı Euro 4 motor uygulamalarının gereksinimlerini karşılar. Özellikle dizel partikül filtresi (DPF) ile donatılmış motorlar için Shell Rimula R6 LM/LME'nin kullanımı tavsiye edilmektedir.

PERFORMANS ÖZELLİKLERİ
• Bakım maliyetlerinde azalma
• Üstün piston temizliği: Geliştirilmiş katık teknolojisi ile uzun motor ömrü için yüksek seviyede piston temizliği sağlanır
• Düşük aşınma – uzun motor ömrü: Silindir yüzeyi perdahlanmasını ve supap grubu aşınmasını kontrol eder
• Yakıt ekonomisi: Yüksek viskozite sınıfındaki yağlarla kıyaslandığında yakıt tüketimini azaltır

STANDARTLAR VE SPESİFİKASYONLAR
ACEA E7, E4
API CF
Cummins CES 20072
MAN 3277
Mercedes-Benz 228.5
MTU Category 3
Renault Trucks RXD
Scania LDF-2
VOLVO VDS-3`,
  },
  "rimula-r6-lm-10w-40": {
    name: "Shell Rimula R6 LM 10W-40", grade: "10W-40", series: "Rimula R6 LM", type: "Tam Sentetik",
    api: "CI-4/CH-4", acea: "E7/E6/E4",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20077", "MAN 3477/3271", "MB 228.51/226.9", "MTU Category 3.1", "Renault Trucks RD-2", "Volvo VDS-2"],
    description: "Cat ECF-1-A, Cummins CES 20077, MAN 3477, MB 228.51 ve Volvo VDS-2 onaylı düşük SAPS tam sentetik motor yağı. DPF uyumlu; emisyon sonrası arıtma sistemli araçlar için idealdir.",
    features: ["Cat ECF-1-A onaylı", "MB 228.51 onaylı", "Düşük SAPS / DPF uyumlu", "Volvo VDS-2 onaylı"],
    image: "/images/products/shell/rimula-r6-lm-10w-40.png",
    fullDescription: `Shell Rimula R6 LM, ağır yük dizel motorları için tasarlanmış yenilikçi bir teknoloji çözümüdür. Üç kritik alanda koruma sağlar:

1. Asit kontrolü – yakıt yanması sırasında oluşan asitlerden kaynaklanan korozyona karşı koruma
2. Tortu kontrolü – motoru temiz tutarak sürekli performans ve uzun ömür sağlama
3. Aşınma kontrolü – hareketli metal parçaları birbirinden ayrı tutarak motor ömrünü uzatma

BAŞLICA ÖZELLİKLER
• Düşük Emisyon: Egzoz sistemi performansını ve ömrünü koruyan katalist ve parçacık filtresi uyumluluğu
• Bakım Masraflarından Tasarruf: Uzun yağ değiştirme kapasitesi ve çok yönlülük sayesinde işletme maliyetlerini azaltma
• Koruyucu Güç: Sentetik baz yağlar, eşsiz katkı teknolojisi ve özel aşınma önleyici desteği kombinasyonu

Ürün, kamyon ve otobüs filosu işletmecilerinin ihtiyaçlarını karşılamak üzere tasarlanmıştır. Dizel ve CNG motorları ile çalışan araçlar için uygun olup, dizel parçacık filtresi (DPF) takılı taşıtlar için özellikle önerilir.

STANDARTLAR VE SPESİFİKASYONLAR
SAE 10W-40
ACEA E7, E6, E4-99
API CI-4, CH-4, CG-4, CF-4
Caterpillar ECF-1-A
Cummins CES 20077
Mercedes-Benz 228.51, 226.9
MAN 3477, 3271-1
Volvo CNG, VDS-2
Mack EO-M+`,
  },
  "rimula-r5-e-10w-40": {
    name: "Shell Rimula R5 E 10W-40", grade: "10W-40", series: "Rimula R5 E", type: "Yarı Sentetik",
    api: "CI-4", acea: "E7",
    approvals: [],
    description: "Enerji tasarrufu sağlayan yarı sentetik ağır hizmet dizel motor yağı. Modern motor teknolojisine uygun çoklu filo uyumluluğu ile tüm basınç ve sıcaklık koşullarında üstün koruma.",
    features: ["Enerji tasarrufu teknolojisi", "Çoklu filo uyumluluğu", "Üstün aşınma koruması", "Uzun motor ömrü"],
    image: "/images/products/shell/rimula-r5-e-10w-40.png",
    fullDescription: `Dinamik Koruma (Energised Protection) yağları, modern motorlardaki tüm basınç ve sıcaklık aralıklarına uyum göstererek koruma sağlayacak yüksek performanslı katıklardan formüle edilmiştir.

Özellikle farklı markalarda araçlara sahip filolar için tek tip bir yağ olup sentetik baz yağ teknolojisi ile geliştirilmiş olması sayesinde enerji tasarrufu, yakıt ekonomisi, aşınmaya karşı üstün koruma ve mükemmel kurum ve viskozite kontrolü özelliklerine sahiptir.

PERFORMANS ÖZELLİKLERİ
• Enerji tasarrufu yeteneği ve geliştirilmiş yakıt ekonomisi
• Üstün aşınma koruması
• Mükemmel tortu ve viskozite kontrolü
• Çoklu filo uyumluluğu – farklı marka araçlar için tek yağ

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4
ACEA E7`,
  },
  "helix-hx7-10w-40": {
    name: "Shell Helix HX7 10W-40", grade: "10W-40", series: "Helix HX7", type: "Yarı Sentetik",
    api: "SM/CF", acea: "A3/B3/B4",
    approvals: [],
    description: "API SM/CF ve ACEA A3/B3/B4 sertifikalı yarı sentetik motor yağı. Özel aktif temizleme teknolojisi ile kir ve çamur oluşumunu sürekli olarak önler, motor yanıt süresini iyileştirir.",
    features: ["Aktif temizleme teknolojisi", "A3/B3/B4 uyumlu", "Benzinli/Dizel uyumlu", "Geliştirilmiş motor yanıtı"],
    image: "/images/products/shell/helix-hx7-10w-40.jpg",
    fullDescription: `Shell Helix HX7, özel aktif temizleme teknolojisi ile formüle edilmiştir. Geleneksel motor yağlarına kıyasla üstün koruma sağlayarak kir ve çamur oluşumunu sürekli olarak engeller, sonraki planlanan yağ değişimine kadar daha iyi motor tepkisine izin verir.

UYGULAMALAR
• API SM/CF ve ACEA A3/B3/B4 performans sınıflandırmaları gerektiren araçlar için uygundur
• Pozitif karter havalandırmalı ve katalitik dönüştürücü takılmış gazlı ya da yakıt enjeksiyonlu benzinli motorlar

STANDARTLAR VE SPESİFİKASYONLAR
API SM/CF
ACEA A3/B3/B4`,
  },
  "helix-hx6-10w-40": {
    name: "Shell Helix HX6 10W-40", grade: "10W-40", series: "Helix HX6", type: "Yarı Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.3", "VW 502.00/505.00", "Renault RN0700"],
    description: "MB 229.3, VW 502.00/505.00 ve Renault RN0700 onaylı yarı sentetik motor yağı. Çamur ve aşınmaya karşı üstün koruma; modern benzinli ve dizel motorlar için uygundur.",
    features: ["MB 229.3 onaylı", "VW 502/505 onaylı", "Renault RN0700 onaylı", "Çamur ve aşınma koruması"],
    image: "/images/products/shell/helix-hx6-10w-40.jpg",
    fullDescription: `Sentetik teknoloji motor yağı – tortu ve aşınmaya karşı koruma sağlamaya yardımcı olur.

Tek başına mineral yağlardan elde edilemeyecek yüksek performans seviyelerine ulaşmak için hem sentetik hem de mineral baz yağlardan yararlanılır. Aşınmaya karşı koruma sağlayarak motor ömrünü uzatmaya yardımcı olur. Yağ değiştirme aralığının tamamında korumanın devam etmesine yardımcı olur. Benzinli, dizel ve gazlı motorlarda kullanılabilir; biyodizel ve benzin/etanol karışımları için de uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B3, A3/B4
MB 229.3
VW 502.00/505.00
Renault RN0700`,
  },
  "rimula-r3plus-10w": {
    name: "Shell Rimula R3+ 10W", grade: "10W", series: "Rimula R3+", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20078/20077", "DDC 93K215", "MACK EO-M/EO-M+", "MAN 3275", "MB 228.3", "Renault Trucks RLD-2", "Volvo VDS-3"],
    description: "CI-4 ve ACEA E7/E5/E3 sertifikalı tek dereceli mineral ağır hizmet dizel motor yağı. Cat ECF-1-A, MB 228.3 ve Volvo VDS-3 onaylı; inşaat ve maden uygulamaları için.",
    features: ["Cat ECF-1-A onaylı", "MB 228.3 onaylı", "Volvo VDS-3 onaylı", "Yüksek sıcaklık stabilitesi"],
    image: "/images/products/shell/rimula-r3plus-10w.jpg",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R3 10W, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Özel katık teknolojisi ile Euro 3, US 2002 ve diğer geliştirilmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği ve koruması sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Shell Rimula R3 10W, Avrupa, ABD ve Japonya üretimi olan son teknoloji, yüksek güçlü, ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma ve performans sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Euro 2, Euro 3 ve US 2002 gibi birçok gelişmiş, düşük emisyonlu motorlarda kullanıma uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "rimula-r3plus-30": {
    name: "Shell Rimula R3+ 30", grade: "SAE 30", series: "Rimula R3+", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20078/20077", "DDC 93K215", "MACK EO-M/EO-M+", "MAN 3275", "MB 228.3", "Renault Trucks RLD-2", "Volvo VDS-3"],
    description: "SAE 30 tek dereceli mineral ağır hizmet dizel motor yağı. CI-4 ve ACEA E7/E5/E3 sertifikalı; yüksek sıcaklıklı çalışma ortamları ve büyük hacimli motorlar için optimize edilmiştir.",
    features: ["CI-4 sertifikalı", "E7/E5/E3 uyumlu", "MB 228.3 onaylı", "Volvo VDS-3 onaylı"],
    image: "/images/products/shell/rimula-r3plus-30.jpg",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R3 +30, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Shell Rimula R3 +30, özel katık teknolojisi ile Euro 3, US 2002 ve diğer geliştirilmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği ve koruması sağlayarak Shell Rimula R3 +30'in birçok OEM gereksinimlerini aşmasını sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Shell Rimula R3 +30, Avrupa, ABD ve Japonya üretimi olan son teknoloji, yüksek güçlü, ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma ve performans sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Shell Rimula R3 +30, Euro 2, Euro 3 ve US 2002 gibi birçok gelişmiş, düşük emisyonlu motorlarda kullanıma uygundur. Özellikle dizel partikül filtresi (DPF) ile donatılmış motorlar için uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "spirax-s6-txme": {
    name: "Shell Spirax S6 TXME", grade: "SAE 30", series: "Spirax S6 TXME", type: "Transmisyon Yağı",
    api: "—", acea: "—",
    approvals: ["Ford MERCON", "GM Allison C-4", "MB 236.5/236.6", "ZF TE-ML 03D/04D/09/11A/14A/17C", "Voith 55.6335", "MAN 339 Type D"],
    description: "Ford MERCON, GM Allison C-4, MB 236.5/236.6 ve ZF TE-ML onaylı transmisyon yağı. Otomatik şanzımanlar, hidrolik sistemler ve seçili direksiyon sistemleri için tasarlanmıştır.",
    features: ["Ford MERCON onaylı", "GM Allison C-4 onaylı", "ZF TE-ML onaylı", "MB 236.5/236.6 onaylı"],
    image: "/images/products/shell/spirax-s6-txme.jpg",
    fullDescription: `Shell Spirax S6 TXME (eski adı Shell Donax TDS), binek araçların ve ağır vasıtaların otomatik şanzımanlarında, hidrolik direksiyonlarında ve bazı hidrolik sistemlerde kullanılan bir üründür.

PERFORMANS ÖZELLİKLERİ
• Geliştirilmiş sürtünmeyi önleme: Otomatik şanzımanlarda sürekli olarak sessiz, sorunsuz ve güvenilir çalışma şartları sağlar.
• Yüksek oksidasyona dayanım: Yağ bozunmasına karşı gösterdiği direnç sürekli performans sağlar.
• Yırtılmaya karşı maksimum direnç: Özel Viskozite İndeksi artırıcı katıklar en zorlu şartlarda dahi kırılmaya uğramayarak yağın uzun süre yüksek sıcaklıklarda performanslı çalışmasını sağlar.
• Aşınmaya karşı güvenilir koruma: Dişli ve hidrolik pompa uygulamalarda sorunsuz çalışma ve uzun ekipman ömrü sağlar.

TİPİK FİZİKSEL ÖZELLİKLER
Kinematik Viskozite @ 40°C: 34,6 mm²/s
Kinematik Viskozite @ 100°C: 7,1 mm²/s
Viskozite İndeksi: 174
Yoğunluk @ 15°C: 874 kg/m³
Parlama Noktası: 180°C
Akma Noktası: -45°C

UYGULAMALAR
• Binek araçların otomatik şanzımanları
• Ağır vasıtaların otomatik şanzımanları
• Hidrolik direksiyonlar
• Hidrolik güç sistemleri

STANDARTLAR VE SPESİFİKASYONLAR
Ford MERCON
General Motors Allison C-4
Mercedes-Benz 236.5, 236.6
ZF TE-ML 03D-04D-09-11A-14A-17C
Voith 55.6335
MAN 339 Type D`,
  },
  "rimula-r3plus-40": {
    name: "Shell Rimula R3+ 40", grade: "SAE 40", series: "Rimula R3+", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20078/20077", "MACK EO-M/EO-M+", "MAN 3275", "MB 228.3", "Volvo VDS-3"],
    description: "SAE 40 tek dereceli mineral ağır hizmet dizel motor yağı. CI-4 ve ACEA E7/E5/E3 sertifikalı; sıcak iklimlerde ve yüksek çalışma sıcaklıklarında büyük hacimli motorlar için idealdir.",
    features: ["CI-4 sertifikalı", "Sıcak iklim uyumlu", "Cat ECF-1-A onaylı", "MB 228.3 onaylı"],
    image: "/images/products/shell/rimula-r3plus-40.jpg",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R3 +40, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Özel katık teknolojisi ile Euro 3, US 2002 ve diğer geliştirilmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği ve koruması sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Avrupa, ABD ve Japonya üretimi yüksek güçlü ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Euro 2, Euro 3 ve US 2002 gibi gelişmiş düşük emisyonlu motorlarda ve dizel partikül filtresi (DPF) donatılmış motorlarda kullanıma uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "rimula-r4-x-15w-40": {
    name: "Shell Rimula R4 X 15W-40", grade: "15W-40", series: "Rimula R4 X", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Global DHD-1", "Caterpillar ECF-1-A", "Cummins CES 20078/20077", "DDC 93K215", "MACK EO-M+", "MAN 3275", "MB 228.3", "Renault Trucks RLD-2", "Volvo VDS-3"],
    description: "Cat ECF-1-A, Cummins CES 20078, MAN 3275, MB 228.3 ve Volvo VDS-3 onaylı dört mevsimlik mineral ağır hizmet motor yağı. İnşaat, maden ve ağır taşımacılık uygulamaları için.",
    features: ["Global DHD-1 uyumlu", "Cummins CES 20078 onaylı", "Volvo VDS-3 onaylı", "İnşaat/maden uygulamaları"],
    image: "/images/products/shell/rimula-r4-x-15w-40.jpg",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R4, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Özel katık teknolojisi ile Euro 3, US 2002 ve diğer gelişmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği ve koruması sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Avrupa, ABD ve Japonya üretimi olan son teknoloji, yüksek güçlü, ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma ve performans sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Euro 2, Euro 3 ve US 2002 gibi birçok gelişmiş, düşük emisyonlu motorlarda kullanıma uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "rimula-r4-l-15w-40": {
    name: "Shell Rimula R4 L 15W-40", grade: "15W-40", series: "Rimula R4 L", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20078/20077", "MACK EO-M/EO-M+", "MB 228.3", "Volvo VDS-3"],
    description: "Cat ECF-1-A, Cummins CES 20078, MACK EO-M+, MB 228.3 ve Volvo VDS-3 onaylı dört mevsimlik ağır hizmet dizel motor yağı. Zorlu koşullarda mükemmel motor temizliği ve koruma.",
    features: ["Cat ECF-1-A onaylı", "Cummins CES 20078 onaylı", "MB 228.3 onaylı", "Volvo VDS-3 onaylı"],
    image: "/images/products/shell/rimula-r4-l-15w-40.png",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R4, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Özel katık teknolojisi ile Euro 3, US 2002 ve diğer gelişmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Avrupa, ABD ve Japonya üretimi olan son teknoloji, yüksek güçlü, ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Euro 2, Euro 3 ve US 2002 gibi birçok gelişmiş, düşük emisyonlu motorlarda kullanıma uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "rimula-r2-extra-15w-40": {
    name: "Shell Rimula R2 Extra 15W-40", grade: "15W-40", series: "Rimula R2 Extra", type: "Mineral",
    api: "CF-4/CF", acea: "E2",
    approvals: ["MAN 271", "MB 228.1", "Volvo VDS"],
    description: "MAN 271, MB 228.1 ve VDS onaylı mineral ağır hizmet dizel motor yağı. Üç bileşenli Multi Energy Protection formülü ile asit kontrolü, depo kontrolü ve aşınma koruması sağlar.",
    features: ["MAN 271 onaylı", "MB 228.1 onaylı", "Multi Energy Protection", "ACEA E2 uyumlu"],
    image: "/images/products/shell/rimula-r2-extra-15w-40.jpg",
    fullDescription: `Shell Rimula R2 Extra 15W-40, tortulara karşı ek koruma sağlayan ağır hizmet dizel motor yağıdır. Çalışma şartlarının ne kadar sıcak, soğuk, eğimli, tozlu, çamurlu veya uzun olursa olsun, motorunuzu korumak üzere tasarlanmıştır.

ENERJİLİ KORUMA
Shell Rimula ağır hizmet dizel motor yağları üç ayrı kritik alanda faaliyet gösterir:
1. Asit kontrolü – yakıt yandığı zaman oluşan asitlerden kaynaklanan korozyona karşı koruma sağlar.
2. Tortu kontrolü – motoru sürekli performans ve uzun ömür sağlayacak şekilde temiz tutar.
3. Aşınma kontrolü – hareketli metal motor parçalarını birbirinden ayrı tutarak motor ömrünü uzatır.

Shell Rimula R2 Extra Multi, pislikleri uzaklaştırıp motorunuzu temiz tutmak için kanıtlanmış katkı maddesi bileşimlerini kullanır. Daha yüksek güçlü veya turboşarjlı motorlarda, API CF-4'ye uygun yağlara göre yaklaşık "%20'ye kadar daha fazla aktif tortu kontrollü katkı maddesi" içerir. Mercedes-Benz, MAN ve Volvo gibi motor üreticilerinin gerektirdiği testlere uygunluğu ölçülmüştür.

KULLANIM ALANLARI
• Turboşarjlı motorlarda birikinti oluşumuna karşı güçlü koruma sağlar; kısa ve uzun mesafeli nakliye için idealdir.
• Daha eski turboşarjlı motorlara sahip ağır yük otobüs işletmecileri için uygundur.
• Birçok tarım uygulamasında çok yönlü yüksek performanslı koruma sağlar.

STANDARTLAR VE SPESİFİKASYONLAR
API CF-4, CF
ACEA E2
MAN 271
MB 228.1
Volvo VDS`,
  },
  "rimula-r3-50": {
    name: "Shell Rimula R3 50", grade: "SAE 50", series: "Rimula R3", type: "Mineral",
    api: "CI-4/CH-4/CG-4/CF-4/CF", acea: "E7/E5/E3",
    approvals: ["Caterpillar ECF-1-A", "Cummins CES 20078/20077", "MACK EO-M/EO-M+", "MAN 3275", "MB 228.3", "Volvo VDS-3"],
    description: "SAE 50 tek dereceli mineral ağır hizmet dizel motor yağı. CI-4 ve ACEA E7/E5/E3 sertifikalı; en yüksek çalışma sıcaklıklarında ve ağır yük koşullarında üstün motor koruması.",
    features: ["CI-4 sertifikalı", "ACEA E7/E5/E3 uyumlu", "Maksimum yük koşulları", "Yüksek sıcaklık stabilitesi"],
    image: "/images/products/shell/rimula-r3-50.jpg",
    fullDescription: `Dört Mevsimlik Ağır Hizmet Dizel Motor Yağı
• BENZERSİZ AKTİF TEKNOLOJİ
• GELİŞMİŞ MOTORLAR YÜKSEK GÜÇ KULLANIMI

Shell Rimula R3, Dinamik Koruma (Energised Protection) yağları, gelişmiş motorlarda bulunan tüm basınç ve sıcaklık aralıklarında - pistonlardaki yüksek sıcaklıklardan, supap gruplarındaki son derece ağır yüklere kadar - motoru koruyacak ve şartlara uyum sağlayacak yüksek performanslı katıkları içermektedir. Özellikle farklı marka araçlara sahip filolar için tek tip yağ olup ekstra aktif katıklar sayesinde yüksek performanslı motorlarda oluşabilen zararlı kurumu ve partikülleri kontrol edip uzaklaştırarak mükemmel kurum ve viskozite kontrolü, aşınmaya karşı üstün koruma sağlar.

PERFORMANS ÖZELLİKLERİ
• Mükemmel Koruma: Özel katık teknolojisi ile Euro 3, US 2002 ve diğer geliştirilmiş motorlarda kuruma karşı maksimum koruma, mükemmel aşınma koruması ve uzun yağ ömrü sağlar.
• Tüm Uygulamalar için İspatlanmış Performans: Madencilik ve inşaat uygulamalarından ağır hizmet nakliyecilik uygulamalarına kadar dünyanın en zorlu ortamlarında test edilmiştir.
• Geliştirilmiş Motor Temizliği: Özel katık sistemi, piston depozitlerine karşı geliştirilmiş motor temizliği sağlar.

UYGULAMALAR
Zorlu Şartlar - Ağır Hizmet Dizel Motorlar: Avrupa, ABD ve Japonya üretimi olan son teknoloji, yüksek güçlü, ağır hizmet dizel motorların karayolu ve iş makinası uygulamalarında üstün koruma ve performans sağlar.
Yüksek Teknolojili Düşük Emisyonlu Motorlar: Euro 2, Euro 3 ve US 2002 gibi birçok gelişmiş, düşük emisyonlu motorlarda kullanıma uygundur.

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4, CH-4, CG-4, CF-4, CF
ACEA E7, E5, E3
Global DHD-1
Caterpillar ECF-1-A
Cummins CES 20078, 77, 76, 75, 72, 71
DDC 93K215
MACK EO-M, EO-M+
MAN 3275
Mercedes-Benz 228.3
Renault Trucks RLD-2
VOLVO VDS-3`,
  },
  "helix-hx3-20w-50": {
    name: "Shell Helix HX3 20W-50", grade: "20W-50", series: "Helix HX3", type: "Mineral",
    api: "SJ/CF", acea: "—",
    approvals: [],
    description: "API SJ/CF sertifikalı mineral motor yağı. Karbüratörlü motorlar, doğal emişli dizel motorlar ve eski model araçlar için aktif temizleme teknolojisi ve oksidasyona karşı koruma sağlar.",
    features: ["API SJ/CF sertifikalı", "Karbüratörlü motor uyumlu", "Aktif temizleme teknolojisi", "Eski model araç uyumlu"],
    image: "/images/products/shell/helix-hx3-20w-50.jpg",
    fullDescription: `Shell Helix HX3 20W-50, özel aktif temizleme teknolojisiyle formüle edildiğinden kurum ve tortu birikimini önler, böylece motoru korur ve ömrünü uzatır.

UYGULAMALAR
• Benzinli ve Dizel Motorlar
• Karbüratörlü ve benzinli motorlar
• Doğal aspirasyonlu dizel motorlar

PERFORMANS ÖZELLİKLERİ
• 3 Aktif temizleyici katık teknolojisiyle formüle edilmiştir: Kurum ve tortu birikmesini önlemeye yardımcı olur, bu sayede motoru korur ve ömrünü uzatır.
• Oksidasyon direnci: Bir sonraki yağ değişimine kadar yağdaki bozunmayı önler.

TİPİK FİZİKSEL ÖZELLİKLER
Kinematik Viskozite @ 40°C: 157,0 cSt
Kinematik Viskozite @ 100°C: 19,0 cSt
Viskozite İndeksi: 137
Yoğunluk @ 15°C: 0,888 kg/l
Parlama Noktası: 215°C
Akma Noktası: -27°C

STANDARTLAR VE SPESİFİKASYONLAR
API SJ/CF`,
  },
};

const SHELL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "tellus-s2-m-32": {
    name: "Shell Tellus S2 M 32", grade: "ISO VG 32", series: "Tellus S2 M", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S", "CINCINNATI P-68"],
    description: "ISO 11158 HM sertifikalı yüksek performanslı hidrolik yağ. Termal kararlılık, mükemmel oksidasyon direnci ve olağanüstü aşınma önleme özellikleriyle endüstriyel hidrolik sistemler için idealdir.",
    features: ["Termal kararlılık", "Oksidasyon direnci", "Aşınma önleme", "Mükemmel filtrelenebilme"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-m-32.jpg",
  },
  "tellus-s2-m-46": {
    name: "Shell Tellus S2 M 46", grade: "ISO VG 46", series: "Tellus S2 M", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S", "CINCINNATI P-70"],
    description: "ISO 11158 HM sertifikalı yüksek performanslı hidrolik yağ. En yaygın kullanılan viskozite sınıfında üstün termal kararlılık, oksidasyon ve aşınma koruması sağlar.",
    features: ["Termal kararlılık", "Olağanüstü aşınma önleme", "Mükemmel filtrelenebilme", "Sudan ayrılma"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-m-46.jpg",
  },
  "tellus-s2-m-68": {
    name: "Shell Tellus S2 M 68", grade: "ISO VG 68", series: "Tellus S2 M", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S", "CINCINNATI P-69"],
    description: "ISO 11158 HM sertifikalı yüksek performanslı hidrolik yağ. Yüksek sıcaklık ve ağır yük koşullarında üstün termal kararlılık ve aşınma koruması.",
    features: ["Yüksek sıcaklık stabilitesi", "Olağanüstü aşınma önleme", "Mükemmel filtrelenebilme", "Sudan ayrılma"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-m-68.jpg",
  },
  "tellus-s2-m-100": {
    name: "Shell Tellus S2 M 100", grade: "ISO VG 100", series: "Tellus S2 M", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "ISO 11158 HM sertifikalı yüksek viskoziteli hidrolik yağ. Vakum pompaları ve yüksek basınçlı sistemlerde üstün koruma sağlar.",
    features: ["Yüksek viskozite stabilitesi", "Oksidasyon direnci", "Aşınma önleme", "Sudan ayrılma"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-m-100.jpg",
  },
  "tellus-s2-v-15": {
    name: "Shell Tellus S2 V 15", grade: "ISO VG 15", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Geniş sıcaklık aralığında kararlı viskozite performansı sağlayan yüksek VI hidrolik yağ. Soğuk ortamlar ve hassas kontrol sistemleri için idealdir.",
    features: ["Yüksek viskozite indeksi", "Geniş sıcaklık aralığı", "Termal kararlılık", "Mükemmel filtrelenebilme"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-15.jpg",
  },
  "tellus-s2-v-22": {
    name: "Shell Tellus S2 V 22", grade: "ISO VG 22", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Geniş sıcaklık aralığında sabit viskozite sağlayan yüksek VI hidrolik yağ. Değişken sıcaklık koşullarındaki endüstriyel ve mobil hidrolik sistemler için uygundur.",
    features: ["Yüksek viskozite indeksi", "Geniş sıcaklık performansı", "Aşınma önleme", "Oksidasyon direnci"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-22.jpg",
  },
  "tellus-s2-v-32": {
    name: "Shell Tellus S2 V 32", grade: "ISO VG 32", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Yüksek viskozite indeksiyle geniş sıcaklık aralığında sabit performans sağlayan hidrolik yağ. Dış ortam makineleri ve mobil sistemler için uygundur.",
    features: ["Yüksek VI", "Geniş sıcaklık aralığı", "Denison HF-0 onaylı", "Sudan ayrılma"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-32.jpg",
  },
  "tellus-s2-v-46": {
    name: "Shell Tellus S2 V 46", grade: "ISO VG 46", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "En yaygın hidrolik viskozite sınıfında yüksek VI formülü. Hem endüstriyel hem mobil sistemlerde üstün pompa koruması ve kararlı performans sağlar.",
    features: ["Yüksek viskozite indeksi", "En yaygın hidrolik viskozite", "Üstün pompa koruması", "Mükemmel filtrelenebilme"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-46.jpg",
  },
  "tellus-s2-v-68": {
    name: "Shell Tellus S2 V 68", grade: "ISO VG 68", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Yüksek sıcaklıklı ağır hizmet sistemleri için yüksek VI hidrolik yağ. İnşaat ve madencilik ekipmanlarında güvenilir performans.",
    features: ["Yüksek sıcaklık stabilitesi", "Ağır hizmet uyumlu", "Yüksek viskozite indeksi", "Aşınma önleme"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-68.jpg",
  },
  "tellus-s2-v-100": {
    name: "Shell Tellus S2 V 100", grade: "ISO VG 100", series: "Tellus S2 V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2"],
    description: "Ekstra yük kapasitesi gerektiren büyük hidrolik sistemler için yüksek VI hidrolik yağ. Yavaş çalışan büyük sistemlerde kararlı viskozite.",
    features: ["Ekstra yük kapasitesi", "Yüksek VI", "Büyük sistem uyumlu", "Termal stabilite"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s2-v-100.jpg",
  },
  "tellus-s3-m-32": {
    name: "Shell Tellus S3 M 32", grade: "ISO VG 32", series: "Tellus S3 M", type: "Küllüsüz Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Parker Denison", "Eaton Vickers"],
    description: "Çinko (ZAF) içermeyen küllüsüz formülasyonuyla çevre dostu hidrolik yağ. Hassas servo vanalar ve gümüş/magnezyum alaşımlı bileşenler içeren sistemler için.",
    features: ["Çinko içermeyen formül", "Servo vana uyumlu", "Hassas filtre uyumlu", "Geniş sistem uyumu"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s3-m-32.jpg",
  },
  "tellus-s3-m-46": {
    name: "Shell Tellus S3 M 46", grade: "ISO VG 46", series: "Tellus S3 M", type: "Küllüsüz Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Parker Denison", "Eaton Vickers"],
    description: "Çinko içermeyen küllüsüz formülasyonuyla hassas servo vanaları ve alaşımlı bileşenleri koruyan hidrolik yağ. En yaygın endüstriyel viskozite sınıfı.",
    features: ["Küllüsüz formül", "Servo vana uyumlu", "Üstün oksidasyon stabilitesi", "Hassas filtre uyumlu"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s3-m-46.jpg",
  },
  "tellus-s3-m-68": {
    name: "Shell Tellus S3 M 68", grade: "ISO VG 68", series: "Tellus S3 M", type: "Küllüsüz Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Parker Denison"],
    description: "Yüksek sıcaklık ve ağır yüklerde çinko içermeyen küllüsüz hidrolik yağ. Sanayi presleri ve inşaat ekipmanları için uygundur.",
    features: ["Çinko içermeyen formül", "Yüksek sıcaklık stabilitesi", "Ağır yük kapasitesi", "Aşınma önleyici"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s3-m-68.jpg",
  },
  "tellus-s3-m-100": {
    name: "Shell Tellus S3 M 100", grade: "ISO VG 100", series: "Tellus S3 M", type: "Küllüsüz Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2"],
    description: "Çinko içermeyen küllüsüz formülasyonla yüksek viskoziteli büyük hidrolik sistemler için üstün koruma. Ağır presler ve sanayi tesisleri için.",
    features: ["Çinko içermeyen formül", "Ekstra yük kapasitesi", "Büyük sistem uyumlu", "Uzun servis aralığı"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s3-m-100.jpg",
  },
  "tellus-s4-me-32": {
    name: "Shell Tellus S4 ME 32", grade: "ISO VG 32", series: "Tellus S4 ME", type: "Enerji Tasarruflu Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers", "CINCINNATI"],
    description: "Enerji tasarrufu özellikli sentetik teknoloji hidrolik yağ. Gelişmiş formülasyonuyla sistem verimliliğini artırırken uzun yağ ömrü sağlar.",
    features: ["Enerji tasarrufu", "Sentetik teknoloji", "Uzun yağ ömrü", "Üstün oksidasyon direnci"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s4-me-32.jpg",
  },
  "tellus-s4-me-46": {
    name: "Shell Tellus S4 ME 46", grade: "ISO VG 46", series: "Tellus S4 ME", type: "Enerji Tasarruflu Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524 Part 2",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers", "CINCINNATI"],
    description: "Enerji tasarruflu sentetik teknoloji hidrolik yağ. En yaygın viskozite sınıfında sistem verimliliğini artırır ve yağ değişim aralıklarını uzatır.",
    features: ["Enerji tasarrufu", "Sentetik teknoloji", "Uzun değişim aralığı", "Üstün aşınma önleme"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s4-me-46.jpg",
  },
  "tellus-s4-vx-32": {
    name: "Shell Tellus S4 VX 32", grade: "ISO VG 32", series: "Tellus S4 VX", type: "Geniş Sıcaklık Aralığı Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers"],
    description: "Çok geniş sıcaklık aralığında sabit viskozite sağlayan sentetik teknoloji hidrolik yağ. Arktik koşullardan yüksek sıcaklıklara kadar üstün performans.",
    features: ["Çok geniş sıcaklık aralığı", "Sentetik teknoloji", "Yüksek VI indeksi", "Soğuk başlangıç üstünlüğü"],
    fullDescription: `Yüksek viskozite indeksli mineral yağlar ve üstün katık paketi kullanılarak imal edilmiş yüksek performanslı hidrolik yağıdır.

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Modern hidrolik sistemlerde yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında yüksek oksidasyon direnci. TOST testlerinde mükemmel sonuçlar.
• Suya karşı dayanıklılık: Yüksek nemde kimyasal kararlılık; paslanma ve korozyon riskini minimize eder.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş katık paketi.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun; su ve kalsiyum karışmasında özelliklerini korur.
• Mükemmel havayı defetme ve köpüğü önleme: Kavitasyonu önler, oksidasyonu yavaşlatır.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç; sistem ve pompaları korur.
• Sızdırmazlık elemanları ve boya uyumluluğu: Mineral yağlarla kullanılan tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
CINCINNATI P-68 (ISO 32) / P-70 (ISO 46) / P-69 (ISO 68)
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950 S, I-286 S
DIN 51524 PART 2
ISO 11158
Mannesman Rexroth RE 90 220-1`,
    image: "/images/products/shell/tellus-s4-vx-32.jpg",
  },
  "morlina-s2-bl-5": {
    name: "Shell Morlina S2 BL 5", grade: "ISO VG 5", series: "Morlina S2 BL", type: "Sirkülasyon / Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV", "General Electric GEK"],
    description: "Çinko içermeyen ultra düşük viskoziteli sirkülasyon yağı. Yüksek devirli yataklar ve hassas sirkülasyon sistemleri için; -60°C akma noktasıyla soğuk ortamlarda avantajlı.",
    features: ["Çinko içermeyen formül", "Ultra düşük viskozite", "Düşük akma noktası -60°C", "Oksidasyon direnci"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri
• Düz ya da rulmanlı yataklar
• Yüksek devirli noktalar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıklarda dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı uygulamalarda avantaj sağlar.
• Havayı hızlı defetme ve köpük önleme: Özel katkı paketi ile hava hızla uzaklaştırılır.`,
    image: "/images/products/shell/morlina-s2-bl-5.jpg",
  },
  "morlina-s2-bl-10": {
    name: "Shell Morlina S2 BL 10", grade: "ISO VG 10", series: "Morlina S2 BL", type: "Sirkülasyon / Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "General Electric GEK-32568"],
    description: "Çinko içermeyen düşük viskoziteli sirkülasyon yağı. Buhar türbinleri, gaz türbinleri ve yüksek devirli sirkülasyon sistemleri için üstün oksidasyon stabilitesi.",
    features: ["Türbin sınıfı su ayrışması", "Uzun oksidasyon ömrü", "Siemens ve GE onaylı", "Köpük önleyici"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri
• Düz ya da rulmanlı yataklar
• Yüksek devirli noktalar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıklarda dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı uygulamalarda avantaj sağlar.
• Havayı hızlı defetme ve köpük önleme: Özel katkı paketi ile hava hızla uzaklaştırılır.`,
    image: "/images/products/shell/morlina-s2-bl-10.jpg",
  },
  "morlina-s2-bl-22": {
    name: "Shell Morlina S2 BL 22", grade: "ISO VG 22", series: "Morlina S2 BL", type: "Sirkülasyon / Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV", "General Electric GEK"],
    description: "Çinko içermeyen ISO VG 22 sirkülasyon yağı. Düz ve rulmanlı yataklar ile hassas sirkülasyon sistemleri için yüksek oksidasyon direnci ve korozyon koruması.",
    features: ["Çinko içermeyen formül", "Yüksek oksidasyon direnci", "Korozyon koruması", "Düşük köpük eğilimi"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri
• Düz ya da rulmanlı yataklar
• Yüksek devirli noktalar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıklarda dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı uygulamalarda avantaj sağlar.
• Havayı hızlı defetme ve köpük önleme: Özel katkı paketi ile hava hızla uzaklaştırılır.`,
    image: "/images/products/shell/morlina-s2-bl-22.jpg",
  },
  "morlina-s2-b-46": {
    name: "Shell Morlina S2 B 46", grade: "ISO VG 46", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 46 sirkülasyon ve rulman yağı. Sirkülasyon sistemleri, rulmanlı yataklar ve düşük yüklü dişli kutuları için üstün oksidasyon direnci ve korozyon koruması.",
    features: ["Çinko içermeyen formül", "Oksidasyon direnci", "Korozyon koruması", "Düşük köpük"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-46.jpg",
  },
  "morlina-s2-b-68": {
    name: "Shell Morlina S2 B 68", grade: "ISO VG 68", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 68 sirkülasyon yağı. Parlama noktası 240°C ile yüksek sıcaklıklarda güvenli çalışma; rulmanlı yataklar ve sirkülasyon sistemleri için.",
    features: ["Yüksek parlama noktası 240°C", "Çinko içermeyen formül", "Oksidasyon direnci", "Korozyon koruması"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-68.jpg",
  },
  "morlina-s2-b-100": {
    name: "Shell Morlina S2 B 100", grade: "ISO VG 100", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 100 sirkülasyon yağı. Parlama noktası 250°C; orta-yüksek viskoziteli sirkülasyon sistemleri ve rulman uygulamaları için.",
    features: ["Parlama noktası 250°C", "Çinko içermeyen formül", "Uzun servis aralığı", "Korozyon koruması"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-100.jpg",
  },
  "morlina-s2-b-150": {
    name: "Shell Morlina S2 B 150", grade: "ISO VG 150", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 150 sirkülasyon yağı. Ağır yük rulmanlar ve geniş endüstriyel sirkülasyon sistemleri için yüksek oksidasyon stabilitesi.",
    features: ["ISO VG 150 sirkülasyon", "Çinko içermeyen formül", "Yüksek sıcaklık stabilitesi", "Korozyon koruması"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-150.jpg",
  },
  "morlina-s2-b-220": {
    name: "Shell Morlina S2 B 220", grade: "ISO VG 220", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 220 sirkülasyon yağı. Parlama noktası 280°C ile ağır sanayi uygulamalarında ve yüksek sıcaklıklarda güvenilir koruma.",
    features: ["Parlama noktası 280°C", "Çinko içermeyen formül", "Ağır sanayi uyumu", "Korozyon koruması"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-220.jpg",
  },
  "morlina-s2-b-320": {
    name: "Shell Morlina S2 B 320", grade: "ISO VG 320", series: "Morlina S2 B", type: "Sirkülasyon / Rulman Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Çinko içermeyen ISO VG 320 sirkülasyon yağı. Parlama noktası 282°C ile çok ağır yüklü rulman ve sirkülasyon uygulamaları için en yüksek viskoziteli Morlina S2 B.",
    features: ["En yüksek viskozite sınıfı", "Parlama noktası 282°C", "Çinko içermeyen formül", "Ağır yük kapasitesi"],
    fullDescription: `Yüksek viskozite indeksli bazyağı ve çinko içermeyen formülasyonu ile pasa, korozyona ve aşınmaya karşı yüksek seviyede koruma sağlayan yüksek kaliteli sirkülasyon yağı.

UYGULAMALAR
• Sirkülasyon sistemleri ve rulmanlı yataklar
• Düşük yükte çalışan dişli kutuları
• Çelik-bronz ve gümüş yüzeyler içeren kontrol ve hidrolik sistemler

PERFORMANS ÖZELLİKLERİ
• Mükemmel oksidasyon direnci: Su, hava ve metal katalistler varlığında yüksek sıcaklıkta dirençli.
• Korozyona karşı koruma: Özel katkılar korozyon önleme performansını artırır.
• Düşük akma noktası: Düşük sıcaklıklı endüstriyel uygulamalarda avantaj.
• Havayı hızlı defetme ve köpük önleme: Kavitasyonu önler.`,
    image: "/images/products/shell/morlina-s2-b-320.jpg",
  },
  "corena-s2-p-68": {
    name: "Shell Corena S2 P 68", grade: "ISO VG 68", series: "Corena S2 P", type: "Pistonlu Kompresör Yağı",
    api: "ISO 6743-3A DAB", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Ingersoll Rand", "Gardner Denver"],
    description: "Pistonlu hava kompresörleri için özel geliştirilmiş yüksek performanslı kompresör yağı. 220°C hava çıkış sıcaklığına kadar güvenilir koruma ve uzatılmış servis aralıkları.",
    features: ["Pistonlu kompresör uzmanı", "Yüksek sıcaklık koruması", "Uzun servis aralığı", "Karbon birikimini önler"],
    fullDescription: `Shell Corena P, pistonlu tip kompresörler için özel olarak geliştirilmiş kompresör yağıdır. Hava çıkış sıcaklıklarının 220°C'ye kadar yükseldiği durumlarda dahi yüksek performans sağlar.

PERFORMANS ÖZELLİKLERİ
• Servis aralıklarında uzama: Valf ve piston bakım aralıklarını uzatarak yüksek verimli uzun çalışma ömrü.
• Güvenilir hava hatları: Karbon depozitler ve pas artıklarından kaynaklanan tehlikeli ekzotermik reaksiyonları minimize eder.
• Oksidasyona karşı yüksek direnç: Karbon birikimini minimize eder, kompresör verimliliğini maksimize eder.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Havadan iyi ayrılma: Köpük oluşumuna sebebiyet vermez.
• Sudan kolay ayrışma: Yağ suyu iterek oksidasyon ve viskozite artışını önler.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51506 VDL
ISO 6743-3A-DAB`,
    image: "/images/products/shell/corena-s2-p-68.jpg",
  },
  "corena-s2-p-100": {
    name: "Shell Corena S2 P 100", grade: "ISO VG 100", series: "Corena S2 P", type: "Pistonlu Kompresör Yağı",
    api: "ISO 6743-3A DAB", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Ingersoll Rand"],
    description: "Pistonlu tip hava kompresörleri için ISO VG 100 kompresör yağı. 220°C hava çıkış sıcaklığında dahi üstün koruma; oksidasyona karşı yüksek direnç.",
    features: ["Pistonlu kompresör uzmanı", "Yüksek oksidasyon direnci", "Servis aralığı uzatma", "Sudan kolay ayrışma"],
    fullDescription: `Shell Corena P, pistonlu tip kompresörler için özel olarak geliştirilmiş kompresör yağıdır. Hava çıkış sıcaklıklarının 220°C'ye kadar yükseldiği durumlarda dahi yüksek performans sağlar.

PERFORMANS ÖZELLİKLERİ
• Servis aralıklarında uzama: Valf ve piston bakım aralıklarını uzatarak yüksek verimli uzun çalışma ömrü.
• Güvenilir hava hatları: Karbon depozitler ve pas artıklarından kaynaklanan tehlikeli ekzotermik reaksiyonları minimize eder.
• Oksidasyona karşı yüksek direnç: Karbon birikimini minimize eder, kompresör verimliliğini maksimize eder.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Havadan iyi ayrılma: Köpük oluşumuna sebebiyet vermez.
• Sudan kolay ayrışma: Yağ suyu iterek oksidasyon ve viskozite artışını önler.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51506 VDL
ISO 6743-3A-DAB`,
    image: "/images/products/shell/corena-s2-p-100.jpg",
  },
  "corena-s2-p-150": {
    name: "Shell Corena S2 P 150", grade: "ISO VG 150", series: "Corena S2 P", type: "Pistonlu Kompresör Yağı",
    api: "ISO 6743-3A DAB", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Ingersoll Rand"],
    description: "Pistonlu hava kompresörleri için yüksek viskoziteli kompresör yağı. Karbon birikim önleme, güvenilir hava hattı koruması ve uzun servis aralıkları.",
    features: ["Yüksek viskozite", "Karbon birikimini önler", "Güvenilir hava hatları", "Servis aralığı uzatma"],
    fullDescription: `Shell Corena P, pistonlu tip kompresörler için özel olarak geliştirilmiş kompresör yağıdır. Hava çıkış sıcaklıklarının 220°C'ye kadar yükseldiği durumlarda dahi yüksek performans sağlar.

PERFORMANS ÖZELLİKLERİ
• Servis aralıklarında uzama: Valf ve piston bakım aralıklarını uzatarak yüksek verimli uzun çalışma ömrü.
• Güvenilir hava hatları: Karbon depozitler ve pas artıklarından kaynaklanan tehlikeli ekzotermik reaksiyonları minimize eder.
• Oksidasyona karşı yüksek direnç: Karbon birikimini minimize eder, kompresör verimliliğini maksimize eder.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Havadan iyi ayrılma: Köpük oluşumuna sebebiyet vermez.
• Sudan kolay ayrışma: Yağ suyu iterek oksidasyon ve viskozite artışını önler.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51506 VDL
ISO 6743-3A-DAB`,
    image: "/images/products/shell/corena-s2-p-150.jpg",
  },
  "corena-s3-r-46": {
    name: "Shell Corena S3 R 46", grade: "ISO VG 46", series: "Corena S3 R", type: "Vidalı/Kanatlı Kompresör Yağı",
    api: "ISO 6743-3A DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair"],
    description: "Yağ banyolu vidalı ve kanatlı kompresörler için yüksek kaliteli kompresör yağı. 8000 saate kadar uzayan yağ değişim ömrü ve düşük karbon birikimi.",
    features: ["8000 saat yağ ömrü", "Düşük karbon birikimi", "Olağanüstü oksidasyon direnci", "Düşük uçuculuk"],
    fullDescription: `Yağ banyolu vidalı ve kanatlı hava kompresörlerinde mükemmel performans sağlayan üstün kaliteli ürün. Özel sentetik bazyağı ve formülasyonu ile en zorlu şartlarda uzun ömür ve sorunsuz operasyon.

PERFORMANS ÖZELLİKLERİ
• Oksidasyona karşı olağanüstü direnç: Ekipmanda karbon kalıntı oluşumunu önler.
• Yağ değişim periyodlarında artış: 8000 saate kadar uzayan yağ ömrü.
• Düşük uçuculuk: Yağ tüketimini ve eklemeleri azaltır.
• Yüksek viskozite indeksi: Her çalışma şartında yüksek performans.
• Mükemmel soğutma: Kritik soğutma görevini eksiksiz yerine getirir.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.`,
    image: "/images/products/shell/corena-s3-r-46.jpg",
  },
  "corena-s3-r-68": {
    name: "Shell Corena S3 R 68", grade: "ISO VG 68", series: "Corena S3 R", type: "Vidalı/Kanatlı Kompresör Yağı",
    api: "ISO 6743-3A DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair"],
    description: "Yağ banyolu vidalı ve kanatlı kompresörler için ISO VG 68 kompresör yağı. 8000 saat yağ ömrü, düşük uçuculuk ve mükemmel soğutma performansı.",
    features: ["8000 saat yağ ömrü", "Düşük uçuculuk", "Mükemmel soğutma", "Pas ve korozyon koruması"],
    fullDescription: `Yağ banyolu vidalı ve kanatlı hava kompresörlerinde mükemmel performans sağlayan üstün kaliteli ürün. Özel sentetik bazyağı ve formülasyonu ile en zorlu şartlarda uzun ömür ve sorunsuz operasyon.

PERFORMANS ÖZELLİKLERİ
• Oksidasyona karşı olağanüstü direnç: Ekipmanda karbon kalıntı oluşumunu önler.
• Yağ değişim periyodlarında artış: 8000 saate kadar uzayan yağ ömrü.
• Düşük uçuculuk: Yağ tüketimini ve eklemeleri azaltır.
• Yüksek viskozite indeksi: Her çalışma şartında yüksek performans.
• Mükemmel soğutma: Kritik soğutma görevini eksiksiz yerine getirir.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.`,
    image: "/images/products/shell/corena-s3-r-68.jpg",
  },
  "corena-s4-r-46": {
    name: "Shell Corena S4 R 46", grade: "ISO VG 46", series: "Corena S4 R", type: "Vidalı/Kanatlı Kompresör Yağı (Sentetik)",
    api: "ISO 6743-3A DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair", "Gardner Denver"],
    description: "Tam sentetik vidalı ve kanatlı kompresör yağı. 8000 saate kadar yağ ömrü, yüksek sıcaklık stabilitesi ve minimum karbon birikimi.",
    features: ["Tam sentetik", "8000 saat yağ ömrü", "Yüksek sıcaklık stabilitesi", "Minimum karbon birikimi"],
    fullDescription: `Yağ banyolu vidalı ve kanatlı hava kompresörlerinde mükemmel performans sağlayan üstün kaliteli ürün. Özel sentetik bazyağı ve formülasyonu ile en zorlu şartlarda uzun ömür ve sorunsuz operasyon.

PERFORMANS ÖZELLİKLERİ
• Oksidasyona karşı olağanüstü direnç: Ekipmanda karbon kalıntı oluşumunu önler.
• Yağ değişim periyodlarında artış: 8000 saate kadar uzayan yağ ömrü.
• Düşük uçuculuk: Yağ tüketimini ve eklemeleri azaltır.
• Yüksek viskozite indeksi: Her çalışma şartında yüksek performans.
• Mükemmel soğutma: Kritik soğutma görevini eksiksiz yerine getirir.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.`,
    image: "/images/products/shell/corena-s4-r-46.png",
  },
  "corena-s4-r-68": {
    name: "Shell Corena S4 R 68", grade: "ISO VG 68", series: "Corena S4 R", type: "Vidalı/Kanatlı Kompresör Yağı (Sentetik)",
    api: "ISO 6743-3A DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair"],
    description: "Tam sentetik ISO VG 68 vidalı kompresör yağı. Yüksek sıcaklıklarda çalışan sistemlerde 8000 saat yağ ömrü ve üstün termal stabilite.",
    features: ["Tam sentetik", "Yüksek sıcaklık kompresörleri", "8000 saat yağ ömrü", "Üstün oksidasyon direnci"],
    fullDescription: `Yağ banyolu vidalı ve kanatlı hava kompresörlerinde mükemmel performans sağlayan üstün kaliteli ürün. Özel sentetik bazyağı ve formülasyonu ile en zorlu şartlarda uzun ömür ve sorunsuz operasyon.

PERFORMANS ÖZELLİKLERİ
• Oksidasyona karşı olağanüstü direnç: Ekipmanda karbon kalıntı oluşumunu önler.
• Yağ değişim periyodlarında artış: 8000 saate kadar uzayan yağ ömrü.
• Düşük uçuculuk: Yağ tüketimini ve eklemeleri azaltır.
• Yüksek viskozite indeksi: Her çalışma şartında yüksek performans.
• Mükemmel soğutma: Kritik soğutma görevini eksiksiz yerine getirir.
• Pas ve korozyona karşı etkin koruma: Servis aralıklarını uzatır.
• Sızdırmazlık uyumu: Hava kompresörlerindeki tüm elemanlarla uyumlu.`,
    image: "/images/products/shell/corena-s4-r-68.png",
  },
  "refrigeration-s4-fr-f-32": {
    name: "Shell Refrigeration Oil S4 FR-F 32", grade: "ISO VG 32", series: "Refrigeration S4 FR-F", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı sentetik soğutma kompresör yağı. Amonyak (R717) ve HCFC sistemleri için özel; -39°C akma noktası ve mükemmel düşük sıcaklık performansı.",
    features: ["Amonyak sistemi uzmanı", "Alkil benzen sentetik", "Mükemmel düşük sıcaklık", "-39°C akma noktası"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-f-32.jpg",
  },
  "refrigeration-s4-fr-f-68": {
    name: "Shell Refrigeration Oil S4 FR-F 68", grade: "ISO VG 68", series: "Refrigeration S4 FR-F", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı ISO VG 68 sentetik soğutma kompresör yağı. Amonyak ve HCFC sistemlerinde yüksek oksidasyon kararlılığı ve uzun yağ değişim aralığı.",
    features: ["Alkil benzen sentetik", "Yüksek oksidasyon kararlılığı", "Amonyak sistemi uyumlu", "Uzun yağ ömrü"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-f-68.jpg",
  },
  "refrigeration-s4-fr-f-100": {
    name: "Shell Refrigeration Oil S4 FR-F 100", grade: "ISO VG 100", series: "Refrigeration S4 FR-F", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı ISO VG 100 sentetik soğutma kompresör yağı. Amonyak sistemlerinde -33°C altı buharlaşma sıcaklıklarında üstün performans.",
    features: ["Yüksek viskozite soğutma yağı", "Alkil benzen sentetik", "Amonyak sistemi uzmanı", "Mineral yağla karışabilir"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-f-100.jpg",
  },
  "refrigeration-s4-fr-v-32": {
    name: "Shell Refrigeration Oil S4 FR-V 32", grade: "ISO VG 32", series: "Refrigeration S4 FR-V", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı sentetik soğutma yağı. CFC/HCFC ve amonyak sistemleri için; düşük sıcaklıklarda mineral yağlara üstün karışma performansı.",
    features: ["CFC/HCFC uyumlu", "Üstün düşük sıcaklık karışımı", "Alkil benzen sentetik", "Mineral yağla karışabilir"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-v-32.jpg",
  },
  "refrigeration-s4-fr-v-46": {
    name: "Shell Refrigeration Oil S4 FR-V 46", grade: "ISO VG 46", series: "Refrigeration S4 FR-V", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı ISO VG 46 sentetik soğutma yağı. CFC/HCFC ve amonyak sistemlerinde düşük sıcaklık karışma üstünlüğü ve uzun yağ değişim aralığı.",
    features: ["CFC/HCFC uyumlu", "Alkil benzen sentetik", "Uzun yağ ömrü", "Amonyak sistemi uyumlu"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-v-46.jpg",
  },
  "refrigeration-s4-fr-v-68": {
    name: "Shell Refrigeration Oil S4 FR-V 68", grade: "ISO VG 68", series: "Refrigeration S4 FR-V", type: "Soğutma Kompresör Yağı (Alkil Benzen)",
    api: "ISO 6743-3A", acea: "DIN 51503 KAA/KC",
    approvals: [],
    description: "Alkil benzen esaslı ISO VG 68 sentetik soğutma yağı. Amonyak ve HCFC sistemlerinde yüksek oksidasyon kararlılığı ve mükemmel sızdırmazlık uyumu.",
    features: ["Yüksek oksidasyon kararlılığı", "CFC/HCFC uyumlu", "Alkil benzen sentetik", "Uzun yağ ömrü"],
    fullDescription: `Alkil benzen esaslı sentetik soğutma kompresör yağı. Özellikle soğutma gazı olarak Amonyak ve HCFC'nin kullanıldığı sistemler için tavsiye edilmektedir.

UYGULAMALAR
• Açık, yarı açık ve hermetik tipteki soğutucu kompresörlerde ticari, endüstriyel ve bireysel kullanım
• Vidalı ve pistonlu tipte kompresörlerde kullanılabilir
• Amonyaklı (R717) sistemlerde yüksek sıcaklıklarda ve -33°C altındaki buharlaşma sıcaklıklarında mükemmel performans
• Halojene edilmiş gazlar (CFC, HCFC), hidrokarbonlar ve R402A/B ile uyumlu

PERFORMANS ÖZELLİKLERİ
• Tam sentetik formülasyon: Alkil benzen esaslı yüksek teknoloji.
• Olağanüstü kararlılık: Mineral yağlara oranla çok yüksek oksidasyon ve sıcaklık kararlılığı.
• Mükemmel temizlik: Depozit ve çamurumsu atık oluşumunu kontrol altında tutar. Yağ değişim aralıkları mineral yağlardan çok daha uzun.
• Mükemmel uyum: Soğutma sistemlerindeki sızdırmazlık elemanlarıyla tamamen uyumlu; mineral yağlarla karışabilir.
• Çok iyi karışma performansı: CFC/HCFC kullanımında düşük sıcaklıklarda üstün karışma.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51503 KAA, KC`,
    image: "/images/products/shell/refrigeration-s4-fr-v-68.jpg",
  },
  "tonna-s3-m-68": {
    name: "Shell Tonna S3 M 68", grade: "ISO VG 68", series: "Tonna S3 M", type: "Kızak Yağı",
    api: "ISO 6743-13 G", acea: "DIN 51502 CGLP",
    approvals: ["Cincinnati Machine P-47", "Mori Seiki", "Mazak"],
    description: "Tezgah kızakları ve kayar tablalar için özel kızak yağı. Stick-slip titreşimleri elimine ederek hassas ilerleme hareketi ve yüzey kalitesi sağlar.",
    features: ["Stick-slip önleme", "Hassas ilerleme kontrolü", "CNC tezgah uyumlu", "Korozyon önleme"],
    fullDescription: `Shell Tonna S3 M yağları, tezgah kızakları ve tablalarının yağlanması için özel olarak tasarlanmıştır. Yüksek oranda rafine edilmiş mineral yağ temeli ile yüzeye tutunma, aşınma önleme ve kayma önleme katıkları içerir.

UYGULAMALAR
• Tezgahların kızak, tabla ve besleme mekanizmaları (döküm ve sentetik malzemeler dahil)
• Tezgahların hidrolik sistemleri (kızak ve hidrolik için tek tip yağ)
• Tezgah dişli kutuları ve milleri

PERFORMANS ÖZELLİKLERİ
• Mükemmel sürtünme özellikleri: Yavaş hareket eden sistemlerde stick-slip önleme, kesintisiz hareket ve yüzey kalitesi sağlar.
• Gelişmiş teknoloji: Tezgah üreticileriyle işbirliğinde geliştirilmiştir.
• Güçlü yapışma: Kesme sıvılarıyla kolayca yıkanıp gitmez.
• Su ayrışması: Suda çözünen sıvılardan kolaylıkla ayrılır.
• Aşınma önleme: Kızaklar, dişliler, rulmanlar ve hidrolik elemanlar için koruma.
• Korozyon önleme: Suda çözünen kesme sıvısı kullanımında yüzeyleri korur.

STANDARTLAR VE SPESİFİKASYONLAR
ISO 11158/6743-4 HM
DIN CGLP
Cincinnati Machine P-47 (ISO VG68) / P-50 (ISO VG220)`,
    image: "/images/products/shell/tonna-s3-m-68.jpg",
  },
  "tonna-s3-m-220": {
    name: "Shell Tonna S3 M 220", grade: "ISO VG 220", series: "Tonna S3 M", type: "Kızak Yağı",
    api: "ISO 6743-13 G", acea: "DIN 51502 CGLP",
    approvals: ["Cincinnati Machine P-50", "Mori Seiki", "Mazak"],
    description: "Ağır kızak uygulamaları için ISO VG 220 kızak yağı. Yavaş ilerleme mekanizmalarında stick-slip önleme ve üstün yüzey kalitesi için yüksek viskoziteli formül.",
    features: ["Ağır kızak uygulamaları", "Stick-slip önleme", "Yüksek viskozite kararlılığı", "Su ayrışması"],
    fullDescription: `Shell Tonna S3 M yağları, tezgah kızakları ve tablalarının yağlanması için özel olarak tasarlanmıştır. Yüksek oranda rafine edilmiş mineral yağ temeli ile yüzeye tutunma, aşınma önleme ve kayma önleme katıkları içerir.

UYGULAMALAR
• Tezgahların kızak, tabla ve besleme mekanizmaları (döküm ve sentetik malzemeler dahil)
• Tezgahların hidrolik sistemleri (kızak ve hidrolik için tek tip yağ)
• Tezgah dişli kutuları ve milleri

PERFORMANS ÖZELLİKLERİ
• Mükemmel sürtünme özellikleri: Yavaş hareket eden sistemlerde stick-slip önleme, kesintisiz hareket ve yüzey kalitesi sağlar.
• Gelişmiş teknoloji: Tezgah üreticileriyle işbirliğinde geliştirilmiştir.
• Güçlü yapışma: Kesme sıvılarıyla kolayca yıkanıp gitmez.
• Su ayrışması: Suda çözünen sıvılardan kolaylıkla ayrılır.
• Aşınma önleme: Kızaklar, dişliler, rulmanlar ve hidrolik elemanlar için koruma.
• Korozyon önleme: Suda çözünen kesme sıvısı kullanımında yüzeyleri korur.

STANDARTLAR VE SPESİFİKASYONLAR
ISO 11158/6743-4 HM
DIN CGLP
Cincinnati Machine P-47 (ISO VG68) / P-50 (ISO VG220)`,
    image: "/images/products/shell/tonna-s3-m-220.jpg",
  },
  "turbo-t-32": {
    name: "Shell Turbo T 32", grade: "ISO VG 32", series: "Turbo T", type: "Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001"],
    description: "Yüksek güçlü buhar türbinleri için geliştirilmiş endüstriyel türbin yağı. Siemens, ABB ve Alstom onaylı; mükemmel oksidasyon kararlılığı ve su ayrışma performansı.",
    features: ["Siemens ve ABB onaylı", "Mükemmel oksidasyon kararlılığı", "Üstün sudan ayrılma", "Mükemmel filtrelenebilme"],
    fullDescription: `Yüksek Performanslı Endüstriyel Türbin Yağı. Shell Turbo T ürünleri, günümüzün ve gelecekteki yüksek güçlü buhar türbinlerinin gereksinimlerini karşılayacak şekilde geliştirilmiştir.

UYGULAMALAR
• Endüstriyel buhar türbinleri: Ana mil yatakları, mekanik dişliler, kontrol valfleri
• Daha geniş endüstriyel uygulamalar: Yüksek pas ve oksidasyon koruması gereken sistemler
• Turbo kompresörler

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çamurumsu ürünlerin ve zararlı yan ürünlerin oluşumunu önler.
• Mükemmel sudan ayrılma: Suyu sistemi güvenli hale getirmek için kolayca dreyn eder.
• Mükemmel filtrelenebilirlik: Su veya kontaminasyon varlığında dahi üstün filtrasyon.
• Korozyona karşı koruma: Yüksek kaliteli bazyağ ve katıklar metal yüzeyleri korur.
• Mükemmel havayı defetme: Havanın hızlı uzaklaştırılması; köpük oluşumunu önler.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51515-1
ISO 8068
SIEMENS TLV 9013 04
ABB HTGD 90117R
ALSTOM NPA P5001`,
    image: "/images/products/shell/turbo-t-32.jpg",
  },
  "turbo-t-46": {
    name: "Shell Turbo T 46", grade: "ISO VG 46", series: "Turbo T", type: "Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001"],
    description: "Buhar türbinleri için ISO VG 46 endüstriyel türbin yağı. Korozyon önleme, mükemmel su ayrışma ve filtrasyon özellikleriyle uzun sistem ömrü.",
    features: ["Siemens ve ABB onaylı", "Korozyon önleme", "Mükemmel sudan ayrılma", "Turbo kompresör uyumlu"],
    fullDescription: `Yüksek Performanslı Endüstriyel Türbin Yağı. Shell Turbo T ürünleri, günümüzün ve gelecekteki yüksek güçlü buhar türbinlerinin gereksinimlerini karşılayacak şekilde geliştirilmiştir.

UYGULAMALAR
• Endüstriyel buhar türbinleri: Ana mil yatakları, mekanik dişliler, kontrol valfleri
• Daha geniş endüstriyel uygulamalar: Yüksek pas ve oksidasyon koruması gereken sistemler
• Turbo kompresörler

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çamurumsu ürünlerin ve zararlı yan ürünlerin oluşumunu önler.
• Mükemmel sudan ayrılma: Suyu sistemi güvenli hale getirmek için kolayca dreyn eder.
• Mükemmel filtrelenebilirlik: Su veya kontaminasyon varlığında dahi üstün filtrasyon.
• Korozyona karşı koruma: Yüksek kaliteli bazyağ ve katıklar metal yüzeyleri korur.
• Mükemmel havayı defetme: Havanın hızlı uzaklaştırılması; köpük oluşumunu önler.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51515-1
ISO 8068
SIEMENS TLV 9013 04
ABB HTGD 90117R
ALSTOM NPA P5001`,
    image: "/images/products/shell/turbo-t-46.jpg",
  },
  "turbo-t-68": {
    name: "Shell Turbo T 68", grade: "ISO VG 68", series: "Turbo T", type: "Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001"],
    description: "Yüksek güçlü buhar türbinleri için ISO VG 68 türbin yağı. Yüksek pas ve oksidasyon koruması gereken endüstriyel uygulamalar ve turbo kompresörler için.",
    features: ["Yüksek oksidasyon koruması", "Siemens ve ABB onaylı", "Mükemmel filtrelenebilme", "Havayı defetme özelliği"],
    fullDescription: `Yüksek Performanslı Endüstriyel Türbin Yağı. Shell Turbo T ürünleri, günümüzün ve gelecekteki yüksek güçlü buhar türbinlerinin gereksinimlerini karşılayacak şekilde geliştirilmiştir.

UYGULAMALAR
• Endüstriyel buhar türbinleri: Ana mil yatakları, mekanik dişliler, kontrol valfleri
• Daha geniş endüstriyel uygulamalar: Yüksek pas ve oksidasyon koruması gereken sistemler
• Turbo kompresörler

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çamurumsu ürünlerin ve zararlı yan ürünlerin oluşumunu önler.
• Mükemmel sudan ayrılma: Suyu sistemi güvenli hale getirmek için kolayca dreyn eder.
• Mükemmel filtrelenebilirlik: Su veya kontaminasyon varlığında dahi üstün filtrasyon.
• Korozyona karşı koruma: Yüksek kaliteli bazyağ ve katıklar metal yüzeyleri korur.
• Mükemmel havayı defetme: Havanın hızlı uzaklaştırılması; köpük oluşumunu önler.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51515-1
ISO 8068
SIEMENS TLV 9013 04
ABB HTGD 90117R
ALSTOM NPA P5001`,
    image: "/images/products/shell/turbo-t-68.jpg",
  },
  "turbo-cc-32": {
    name: "Shell Turbo CC 32", grade: "ISO VG 32", series: "Turbo CC", type: "Kombine Çevrim Türbin Yağı",
    api: "ISO 8068 TSE/TGE", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001", "GE GEK 101941", "Westinghouse"],
    description: "Kombine çevrim sistemleri için özel endüstriyel türbin yağı. Siemens, ABB, GE ve Westinghouse onaylı; ağır yük dişli kapasitesi ve mükemmel oksidasyon kararlılığı.",
    features: ["Kombine çevrim türbinleri", "Ağır yük dişli kapasitesi", "Siemens/GE/ABB onaylı", "Mükemmel oksidasyon kararlılığı"],
    fullDescription: `Yüksek Performanslı Endüstriyel Kombine Çevrim Türbin Yağı. Shell Turbo CC, kombine çevrim sisteminin bulunduğu buhar ve gaz türbinlerindeki en zor şartlara dayanıklı formülasyonuyla öne çıkar.

UYGULAMALAR
• Kombine çevrim sistemleri: Türbin ana yatakları, dişliler, kontrol valfleri ve governor yağı
• Buhar ve gaz türbinleri: Yüksek yük taşıma kapasitesi gerektiren standart türbinler
• Ağır yük altında çalışan dişli sistemleri

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çok zor şartlarda viskoziteyi korur; zararlı ürün ve çamur oluşumunu önler.
• Çok iyi sudan ayrılma: Fazla suyu dreyn ederek sistemi güvenli hale getirir.
• Mükemmel havayı defetme: Köpük oluşumuna sebep vermez.
• Mükemmel yük taşıma kapasitesi: Ağır yük altındaki dişli sistemlerinde kullanılabilir.
• Korozyona karşı mükemmel koruma: Sistem ömrünü uzatır.

STANDARTLAR VE SPESİFİKASYONLAR
ISO 6743/5, ISO 8068
ISO-L-TSA / -TSE / -TGB / -TGE, type AR
DIN 51515-1, L-TD
GEK 32568E, GEK 101941
SIEMENS TLV 9013 04
WESTINGHOUSE 21T 0591
ABB HTGD 90117R
ALSTOM NPA P5001
SOLAR ES 9-224U
MHI 600 87182`,
    image: "/images/products/shell/turbo-cc-32.jpg",
  },
  "turbo-cc-46": {
    name: "Shell Turbo CC 46", grade: "ISO VG 46", series: "Turbo CC", type: "Kombine Çevrim Türbin Yağı",
    api: "ISO 8068 TSE/TGE", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001", "GE GEK 101941", "Westinghouse"],
    description: "Kombine çevrim sistemleri için ISO VG 46 türbin yağı. Buhar ve gaz türbinlerinde ağır yük dişli sistemi dahil tek tip yağ olarak kullanılabilir.",
    features: ["Kombine çevrim uzmanlığı", "Tek tip sistem yağı", "Çok sayıda OEM onayı", "Mükemmel sudan ayrılma"],
    fullDescription: `Yüksek Performanslı Endüstriyel Kombine Çevrim Türbin Yağı. Shell Turbo CC, kombine çevrim sisteminin bulunduğu buhar ve gaz türbinlerindeki en zor şartlara dayanıklı formülasyonuyla öne çıkar.

UYGULAMALAR
• Kombine çevrim sistemleri: Türbin ana yatakları, dişliler, kontrol valfleri ve governor yağı
• Buhar ve gaz türbinleri: Yüksek yük taşıma kapasitesi gerektiren standart türbinler
• Ağır yük altında çalışan dişli sistemleri

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çok zor şartlarda viskoziteyi korur; zararlı ürün ve çamur oluşumunu önler.
• Çok iyi sudan ayrılma: Fazla suyu dreyn ederek sistemi güvenli hale getirir.
• Mükemmel havayı defetme: Köpük oluşumuna sebep vermez.
• Mükemmel yük taşıma kapasitesi: Ağır yük altındaki dişli sistemlerinde kullanılabilir.
• Korozyona karşı mükemmel koruma: Sistem ömrünü uzatır.

STANDARTLAR VE SPESİFİKASYONLAR
ISO 6743/5, ISO 8068
ISO-L-TSA / -TSE / -TGB / -TGE, type AR
DIN 51515-1, L-TD
GEK 32568E, GEK 101941
SIEMENS TLV 9013 04
WESTINGHOUSE 21T 0591
ABB HTGD 90117R
ALSTOM NPA P5001
SOLAR ES 9-224U
MHI 600 87182`,
    image: "/images/products/shell/turbo-cc-46.jpg",
  },
  "turbo-fluid-dr-46": {
    name: "Shell Turbo S5 DR 46", grade: "ISO VG 46", series: "Turbo S5 DR", type: "Türbin / Sirkülasyon Yağı",
    api: "ISO 8068", acea: "DIN 51515-1",
    approvals: [],
    description: "Yüksek performanslı endüstriyel türbin ve sirkülasyon yağı. Özel formülasyonuyla türbin sistemlerinde uzun servis ömrü ve güvenilir koruma.",
    features: ["Türbin ve sirkülasyon uygulamaları", "Yüksek termal stabilite", "Oksidasyon direnci", "Uzun servis ömrü"],
    fullDescription: `Yüksek Performanslı Endüstriyel Türbin Yağı. Shell Turbo T ürünleri, günümüzün ve gelecekteki yüksek güçlü buhar türbinlerinin gereksinimlerini karşılayacak şekilde geliştirilmiştir.

UYGULAMALAR
• Endüstriyel buhar türbinleri: Ana mil yatakları, mekanik dişliler, kontrol valfleri
• Daha geniş endüstriyel uygulamalar: Yüksek pas ve oksidasyon koruması gereken sistemler
• Turbo kompresörler

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çamurumsu ürünlerin ve zararlı yan ürünlerin oluşumunu önler.
• Mükemmel sudan ayrılma: Suyu sistemi güvenli hale getirmek için kolayca dreyn eder.
• Mükemmel filtrelenebilirlik: Su veya kontaminasyon varlığında dahi üstün filtrasyon.
• Korozyona karşı koruma: Yüksek kaliteli bazyağ ve katıklar metal yüzeyleri korur.
• Mükemmel havayı defetme: Havanın hızlı uzaklaştırılması; köpük oluşumunu önler.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51515-1
ISO 8068
SIEMENS TLV 9013 04
ABB HTGD 90117R
ALSTOM NPA P5001`,
    image: "/images/products/shell/turbo-fluid-dr-46.jpg",
  },
  "turbo-j-32": {
    name: "Shell Turbo J 32", grade: "ISO VG 32", series: "Turbo J", type: "Türbin Yağı",
    api: "ISO 8068 TSA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "ABB HTGD 90117R", "Alstom NPA P5001"],
    description: "Endüstriyel buhar türbinleri için ISO VG 32 türbin yağı. Ana mil yatakları, mekanik dişliler ve kontrol valfleri için yüksek oksidasyon ve pas koruması.",
    features: ["Yüksek oksidasyon koruması", "Siemens ve ABB onaylı", "Mükemmel sudan ayrılma", "Turbo kompresör uyumlu"],
    fullDescription: `Yüksek Performanslı Endüstriyel Türbin Yağı. Shell Turbo T ürünleri, günümüzün ve gelecekteki yüksek güçlü buhar türbinlerinin gereksinimlerini karşılayacak şekilde geliştirilmiştir.

UYGULAMALAR
• Endüstriyel buhar türbinleri: Ana mil yatakları, mekanik dişliler, kontrol valfleri
• Daha geniş endüstriyel uygulamalar: Yüksek pas ve oksidasyon koruması gereken sistemler
• Turbo kompresörler

PERFORMANS ÖZELLİKLERİ
• Mükemmel termal ve oksidasyon kararlılığı: Çamurumsu ürünlerin ve zararlı yan ürünlerin oluşumunu önler.
• Mükemmel sudan ayrılma: Suyu sistemi güvenli hale getirmek için kolayca dreyn eder.
• Mükemmel filtrelenebilirlik: Su veya kontaminasyon varlığında dahi üstün filtrasyon.
• Korozyona karşı koruma: Yüksek kaliteli bazyağ ve katıklar metal yüzeyleri korur.
• Mükemmel havayı defetme: Havanın hızlı uzaklaştırılması; köpük oluşumunu önler.

STANDARTLAR VE SPESİFİKASYONLAR
DIN 51515-1
ISO 8068
SIEMENS TLV 9013 04
ABB HTGD 90117R
ALSTOM NPA P5001`,
    image: "/images/products/shell/turbo-j-32.jpg",
  },
  "diala-s4-zx-i": {
    name: "Shell Diala S4 ZX-I", grade: "Sınıf II İnhibisyonlu", series: "Diala S4 ZX-I", type: "Trafo Yağı",
    api: "IEC 60296 Ed.4", acea: "IEC 60422 / ASTM D3487",
    approvals: ["ABB", "Siemens", "Schneider Electric"],
    description: "GTL teknolojisiyle üretilen yeni nesil trafo yağı. Sıfır kükürt içeriği, endüstri standardının 5 katı oksidasyon stabilitesi ve uzun ekipman ömrü. Güç transformatörleri ve yüksek voltajlı şalt ekipmanları için.",
    features: ["GTL teknolojisi", "Sıfır kükürt içeriği", "5x oksidasyon stabilitesi", "ABB ve Siemens onaylı"],
    fullDescription: `Shell Diala S4 ZX-I, Shell'in trafo yağı ailesindeki en yeni ürün olup GTL teknolojisiyle üretilmiştir.

UYGULAMALAR
• Her türlü güç iletim ve dağıtım transformatörleri
• Yüksek voltajlı şalt ekipmanları

PERFORMANS ÖZELLİKLERİ
• GTL Teknolojisi: Yeni nesil formülasyon
• Sıfır kükürt içeriği: Bakır korozyon riski tamamen ortadan kalkar
• Endüstri standardının 5 katı oksidasyon stabilitesi
• Üstün termal özellikler: Yüksek aşırı yük şartlarında kesintisiz çalışma
• Düşük sıcaklık akışkanlığı: -30°C'ye kadar

STANDARTLAR VE SPESİFİKASYONLAR
IEC 60296:Edition 4 (2012)
ABB, Siemens, Schneider Electric onaylı
Parlama Noktası: 191°C
Akma Noktası: -30°C
Kükürt İçeriği: 0`,
    image: "/images/products/shell/diala-s4-zx-i.jpg",
  },
  "heat-transfer-oil-s2": {
    name: "Shell Heat Transfer Oil S2", grade: "—", series: "Heat Transfer S2", type: "Isı Transfer Yağı",
    api: "ISO 6743-12 Q", acea: "DIN 51522",
    approvals: [],
    description: "Kapalı ısı transfer sistemleri için 320°C'ye kadar çalışabilen yüksek performanslı ısı transfer yağı. Düşük buhar basıncı, yüksek ısı transfer katsayısı ve termal kararlılık.",
    features: ["320°C çalışma sıcaklığı", "Yüksek termal kararlılık", "Düşük buhar basıncı", "Geniş uygulama yelpazesi"],
    fullDescription: `Shell Heat Transfer Oil S2 (eski adı: Shell Thermia B), 320°C'ye kadar çalışan kapalı ısı transfer sistemleri için özel olarak tasarlanmıştır. Film sıcaklığı 340°C'yi geçmemelidir.

UYGULAMALAR
Kimya tesisleri, tekstil fabrikaları, boyahane, kontrplak fabrikaları ve yağ ısıtmalı radyatörlerde sirkülasyonlu ısı transfer sistemleri.

PERFORMANS ÖZELLİKLERİ
• Yüksek oksidasyon ve termal kararlılık
• Düşük viskozite ile yüksek ısı transfer katsayısı
• İyi çözücü özelliği
• Korozif olmayan yapı
• Düşük buhar basıncı

TİPİK FİZİKSEL ÖZELLİKLER
Yoğunluk @ 15°C: 895 kg/m³
Parlama Noktası (PMCC): 220°C
Parlama Noktası (COC): 230°C
Akma Noktası: -12°C
Kinematik Viskozite @ 40°C: 32 mm²/s
Kaynama Noktası Başlangıcı: >355°C

STANDARTLAR VE SPESİFİKASYONLAR
ISO 6743-12 Q
DIN 51522`,
    image: "/images/products/shell/heat-transfer-oil-s2.jpg",
  },
  "naturelle-hf-e": {
    name: "Shell Naturelle HF-E", grade: "ISO VG 46", series: "Naturelle HF-E", type: "Biyolojik Parçalanabilir Hidrolik Yağ",
    api: "ISO 15380 HEES", acea: "VDMA 24568",
    approvals: ["Denison HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Çevre dostu biyolojik parçalanabilir hidrolik yağ. Yüksek viskozite indeksi ile geniş sıcaklık aralığında performans; nehir kenarı, orman ve deniz uygulamaları için.",
    features: ["Biyolojik parçalanabilir", "Çevre dostu", "Yüksek viskozite indeksi", "Denison HF-0 onaylı"],
    fullDescription: `Shell Naturelle HF-E, çevre hassasiyeti gerektiren uygulamalar için geliştirilmiş biyolojik parçalanabilir hidrolik yağıdır.

UYGULAMALAR
• Endüstriyel hidrolik sistemler
• Hidrolik güç iletim sistemleri
• Denizcilik ve nehir kıyısı uygulamaları

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık, oksidasyona dayanım, suya karşı dayanıklılık
• Olağanüstü aşınma önleme performansı (Denison T6C ve Vickers 35VQ25 testleri)
• Mükemmel filtrelenebilme ve havayı defetme
• İyi sudan ayrılma
• Sızdırmazlık elemanları ve boya uyumluluğu

STANDARTLAR VE SPESİFİKASYONLAR
ISO 15380 HEES
DENISON HF-0, HF-1, HF-2
Eaton (Vickers) M-2950-S`,
    image: "/images/products/shell/naturelle-hf-e.jpg",
  },
  "tequla-v-32": {
    name: "Shell Tequla V 32", grade: "ISO VG 32", series: "Tequla V", type: "Yüksek VI Hidrolik Yağ",
    api: "ISO 11158 HV", acea: "DIN 51524 Part 3",
    approvals: ["DENISON HF-0/HF-1/HF-2", "Eaton Vickers"],
    description: "Yüksek viskozite indeksli endüstriyel hidrolik yağ. Değişken sıcaklık koşullarındaki sistemlerde sabit viskozite performansı ve üstün aşınma koruması.",
    features: ["Yüksek viskozite indeksi", "Termal kararlılık", "Olağanüstü aşınma önleme", "Mükemmel filtrelenebilme"],
    fullDescription: `Shell Tequla V 32, yüksek viskozite indeksli mineral yağlar ve üstün katık paketi ile imal edilmiş yüksek performanslı hidrolik yağıdır.

UYGULAMALAR
• Endüstriyel hidrolik sistemler
• Hidrolik güç iletim sistemleri
• Denizcilik sektöründe hidrolik uygulamalar

PERFORMANS ÖZELLİKLERİ
• Termal kararlılık: Yüksek sıcaklıklarda çamurumsu ürünler oluşturmadan temiz çalışma.
• Oksidasyona dayanım: Hava, su ve bakır varlığında TOST testleri başarılı.
• Olağanüstü aşınma önleme: Denison T6C ve Vickers 35VQ25 testlerinden geçmiş.
• Mükemmel filtrelenebilme: Ultra-hassas filtreler için uygun.
• Mükemmel havayı defetme ve köpüğü önleme.
• İyi sudan ayrılma: Emülsiyon oluşumuna direnç.
• Sızdırmazlık elemanları ve boya uyumluluğu.`,
    image: "/images/products/shell/tequla-v-32.jpg",
  },
  "textile-needle-s2-m-32": {
    name: "Shell Textile Needle S2 M 32", grade: "ISO VG 32", series: "Textile Needle S2 M", type: "Tekstil Makina Yağı",
    api: "—", acea: "—",
    approvals: [],
    description: "Tekstil endüstrisi için geliştirilmiş iğne mekanizması yağı. Yıkanabilir formülasyon; boyama öncesi çabuk yıkama özelliği ve haşıl birikimini önleme.",
    features: ["Yıkanabilir formülasyon", "Haşıl birikimini önler", "Boyahane uyumlu", "Korozyon koruması"],
    fullDescription: `Shell Textile Needle S2 M 32 (eski adı: Shell Vexilla G), tekstil endüstrisi için özel geliştirilmiş iğne mekanizması yağıdır.

UYGULAMALAR
• Yuvarlak yatak örgü makinelerinde iğne mekanizmaları (yün, pamuk, ipek, sentetik ipek, rayon işleme)
• Örgü işlemi sonrası boyama öncesi hızlı yıkama gerektiren uygulamalar

PERFORMANS ÖZELLİKLERİ
• Yıkanabilir tip formülasyon: Boyama işlemi öncesi çabuk yıkanabilir
• Haşıl birikimini önler: Örgü işleminde temiz çalışma
• Oksidasyon direnci
• Ekipmana korozyon koruması`,
    image: "/images/products/shell/textile-needle-s2-m-32.jpg",
  },
  "air-tool-s2-a-100": {
    name: "Shell Air Tool S2 A 100", grade: "ISO VG 100", series: "Air Tool S2 A", type: "Pnömatik Alet Yağı",
    api: "—", acea: "—",
    approvals: ["Gardner-Denver"],
    description: "Darbe tipi matkap ve pnömatik alet yağı. Özel mineral bazyağı ve katıklar ile darbe yükü koşullarında üstün aşınma koruması ve soğuk ortam akışkanlığı.",
    features: ["Darbe yükü koruması", "Üstün aşınma önleme", "Soğuk ortam akışkanlığı", "Yüksek oksidasyon direnci"],
    fullDescription: `Shell Air Tool S2 A 100 (eski adı: Shell Torcula 100), darbe tipli matkaplar ve diğer pnömatik aletlerin en zorlu koşullarda çalışması için formüle edilmiştir.

UYGULAMALAR
• Özellikle darbe tipli pnömatik aletler (kaya sondajı dahil)
• Yağ buharı yağlama sistemleri ve hava araçları
• Su varlığında dişli ve yatak yağlaması

PERFORMANS ÖZELLİKLERİ
• Mükemmel yağlama ve aşınma önleme: Darbe yükü koşullarında üstün performans.
• Mükemmel oksidasyon direnci ve termal kararlılık: Yüksek çalışma sıcaklıklarında çamur ve birikinti oluşumuna dirençli.
• Olağanüstü düşük sıcaklık akışkanlığı: Soğuk koşullarda akış özelliklerini korur.
• Mükemmel korozyon koruması: Su varlığında dahi üstün koruma.

TİPİK FİZİKSEL ÖZELLİKLER
ISO Viskozite Sınıfı: 100
Kinematik Viskozite @ 40°C: 100 mm²/s | @ 100°C: 11,8 mm²/s
Viskozite İndeksi: 107
Parlama Noktası (COC): 232°C | Akma Noktası: -30°C
Yoğunluk @ 15°C: 895 kg/m³`,
    image: "/images/products/shell/air-tool-s2-a-100.jpg",
  },
  "edelex-956": {
    name: "Shell Edelex 956", grade: "—", series: "Edelex", type: "Naftanik Proses Yağı",
    api: "US FDA §178.3620(c)", acea: "ISO VGC 0.820-0.849",
    approvals: [],
    description: "Yüksek çözücü özellikli naftanik proses yağı. Lastik, plastik ve termoplastik elastomer üretiminde ekstender; tekstil ve deri işlemede taşıyıcı sıvı olarak kullanılır.",
    features: ["Yüksek naftanik çözücülük", "Lastik/plastik ekstender", "FDA uyumlu", "Düşük aromatik içerik"],
    fullDescription: `Shell Edelex yağları, açık renk, düşük koku ve yüksek çözücülük gerektiren uygulamalarda kullanılan yüksek kaliteli naftanik proses yağlarıdır.

UYGULAMALAR
• Ekstender ve plastikleştirici: Yüksek kaliteli kauçuk, plastik, TPE ve teknik lastik malzeme üretimi
• Taşıyıcı sıvı: Yağ katkıları, tekstil yardımcıları, deri işlem yağları, köpük kesiciler ve boyalar
• Kararlılık ve üstün çözücülük gerektiren uygulamalar

PERFORMANS ÖZELLİKLERİ
• Yoğun rafinasyon işleminden geçmiş yüksek kaliteli naftanik yağ
• AB tehlikeli maddeler direktifi kapsamında sınıflandırılmayan zararsız formül
• Naftanik içerik sayesinde yüksek çözücülük
• Açık renk ve gelişmiş kararlılık

STANDARTLAR VE SPESİFİKASYONLAR
US FDA §178.3620(c), §175.105, §176.200, §177.2600, §177.2800, §178.3570`,
    image: "/images/products/shell/edelex-956.jpg",
  },
  "catenex-s-321": {
    name: "Shell Catenex S 321", grade: "—", series: "Catenex", type: "Parafinik Proses Yağı",
    api: "US FDA §178.3620(c)", acea: "ISO VGC <0.820",
    approvals: [],
    description: "Yüksek parlama noktalı parafinik proses yağı. Otomotiv lastiği, sentetik kauçuk ve yapıştırıcı üretiminde ekstender; kauçuk formülasyonlarında referans yağ olarak kullanılır.",
    features: ["Yüksek parlama noktası", "Parafinik proses yağı", "Kauçuk formülasyonları referansı", "FDA uyumlu"],
    fullDescription: `Shell Catenex, parafinik proses yağı olarak sınıflandırılan yüksek kaliteli endüstriyel yağdır.

UYGULAMALAR
• Ekstender ve plastik yapıcı: Sentetik ve doğal kauçuk, otomotiv lastiği, conta ve yapıştırıcı üretimi
• Taşıyıcı sıvı: Yağ katkıları, tekstil yardımcıları, deri ve kürk işlem yağları
• Parafinik yağların uygun olduğu çeşitli uygulamalar

PERFORMANS ÖZELLİKLERİ
• Yüksek parlama noktası: Naftanik yağlara kıyasla daha yüksek
• Yoğun rafinasyon ile kararlı ürün
• Birçok onaylı formülde ana madde
• Geniş viskozite yelpazesi

STANDARTLAR VE SPESİFİKASYONLAR
Parafinik proses yağları (VGC < 0.820)
US FDA §178.3620(c), §175.105, §176.200, §177.2260, §177.2600, §177.2800`,
    image: "/images/products/shell/catenex-s-321.jpg",
  },
  "ondina-x-415": {
    name: "Shell Ondina X 415", grade: "—", series: "Ondina", type: "Beyaz Mineral Yağ (Farmasötik)",
    api: "US FDA §172.878", acea: "European Pharmacopoeia",
    approvals: [],
    description: "Farmasötik kalitede beyaz mineral yağ. Kozmetik, ilaç ve gıda sektöründe; aroma içermeyen, renksiz ve kokusuz formülasyon. Polisiklik aromatik hidrokarbonlar uzaklaştırılmış.",
    features: ["Farmasötik kalite", "Renksiz ve kokusuz", "FDA §172.878 onaylı", "PCA uzaklaştırılmış"],
    fullDescription: `Shell Ondina, İngiltere, Almanya ve Amerika farmasötik spesifikasyonlarını karşılayan yüksek oranda rafine edilmiş beyaz mineral yağlardır. Renksiz, tatsız ve kokusuzdur. Polisiklik aromatik hidrokarbonlar uzaklaştırılmıştır.

UYGULAMALAR
• Kozmetik ve ilaç sektörü: Kremler, losyonlar, güneş kremi yağları
• Gıda sektörü ambalajı: Plastik malzeme üretimi
• Teknik uygulamalar: TPE elastomerlerde taşıyıcı sıvı
• Oyuncaklar: SBS ve SEBS tipi TPE elastomerleri

PERFORMANS ÖZELLİKLERİ
• Yüksek saflık: Aromatik bileşenler tamamen uzaklaştırılmış
• Üstün kalite kontrolü
• Mükemmel oksidasyon stabilitesi
• Geniş ürün yelpazesi (naftanik ve parafinik)

STANDARTLAR VE SPESİFİKASYONLAR
Avrupa Farmakopesi 3. Baskı
ABD Farmakopesi 23. Baskı
US FDA §172.878, §178.3620(a)
İngiltere Mineral Hidrokarbon Yönetmelikleri 1966
BGA Bülten 38 ve 155`,
    image: "/images/products/shell/ondina-x-415.jpg",
  },
  "ondina-x-432": {
    name: "Shell Ondina X 432", grade: "—", series: "Ondina", type: "Beyaz Mineral Yağ (Farmasötik)",
    api: "US FDA §172.878", acea: "European Pharmacopoeia",
    approvals: [],
    description: "Farmasötik kalitede beyaz mineral yağ. Kozmetik, ilaç ve gıda ambalajında kullanılan renksiz, kokusuz formülasyon; FDA ve Avrupa Farmakopesi uyumlu.",
    features: ["Farmasötik kalite", "FDA §172.878 onaylı", "Renksiz/kokusuz", "Avrupa Farmakopesi uyumlu"],
    fullDescription: `Shell Ondina X 432, yüksek oranda rafine edilmiş farmasötik kalitede beyaz mineral yağdır.

UYGULAMALAR
• Kozmetik ve ilaç: Kremler, losyonlar, güneş kremleri
• Gıda ambalajı: Plastik malzeme üretimi
• Teknik uygulamalar: TPE elastomerlerde taşıyıcı
• Oyuncaklar: SBS ve SEBS tipi elastomerleri

PERFORMANS ÖZELLİKLERİ
• Yüksek saflık: Tüm aromatik bileşenler uzaklaştırılmış
• Sürekli kalite kontrolü
• Üstün oksidasyon stabilitesi
• Renksiz, tatsız ve kokusuz

STANDARTLAR VE SPESİFİKASYONLAR
Avrupa Farmakopesi 3. Baskı
ABD Farmakopesi 23. Baskı
US FDA §172.878, §178.3620
İngiltere Mineral Hidrokarbon Yönetmelikleri 1966`,
    image: "/images/products/shell/ondina-x-432.jpg",
  },
  "ondina-x-420": {
    name: "Shell Ondina X 420", grade: "—", series: "Ondina", type: "Beyaz Mineral Yağ (Farmasötik)",
    api: "US FDA §172.878", acea: "European Pharmacopoeia",
    approvals: [],
    description: "Farmasötik kalitede beyaz mineral yağ. Kozmetik, ilaç ve gıda sektöründe kullanılan renksiz, kokusuz formülasyon; FDA ve Avrupa Farmakopesi uyumlu.",
    features: ["Farmasötik kalite", "FDA uyumlu", "Renksiz/kokusuz", "Avrupa Farmakopesi uyumlu"],
    fullDescription: `Shell Ondina X 420 (eski adı: Ondina 919), farmasötik kalitede beyaz mineral yağdır. Kozmetik, ilaç ve gıda ambalajı uygulamaları için renksiz, tatsız ve kokusuz formülasyon.

STANDARTLAR VE SPESİFİKASYONLAR
Avrupa Farmakopesi | ABD Farmakopesi
US FDA §172.878, §178.3620`,
    image: "/images/products/shell/ondina-x-420.jpg",
  },
  "ensis-engine-oil-30": {
    name: "Shell Ensis Engine Oil 30", grade: "SAE 30", series: "Ensis Engine Oil", type: "Motor Koruma / Konservasyon Yağı",
    api: "—", acea: "—",
    approvals: [],
    description: "Uzun süreli depolama ve nakliye sırasında motor koruması için konservasyon yağı. Paslanma ve korozyona karşı güçlü bariyer oluşturur.",
    features: ["Motor konservasyon", "Pas ve korozyon koruması", "Uzun depolama uyumlu", "SAE 30"],
    fullDescription: `Shell Ensis Engine Oil 30, motorların uzun süreli depolanması ve nakliyesi sırasında paslanma ve korozyona karşı koruma sağlayan özel konservasyon yağıdır.

UYGULAMALAR
• Motor ve makina depolama koruması
• Uzun süreli nakliye koruması

PERFORMANS ÖZELLİKLERİ
• Güçlü pas ve korozyon önleme
• Uzun süreli yüzey koruma filmi`,
    image: "/images/products/shell/ensis-engine-oil-30.jpg",
  },
  "ensis-dw-2462": {
    name: "Shell Ensis DW 2462", grade: "—", series: "Ensis DW", type: "Konservasyon / Pas Önleyici Yağ",
    api: "—", acea: "—",
    approvals: [],
    description: "Endüstriyel ekipman ve metal yüzeylerin uzun süreli korunması için özel pas önleyici konservasyon yağı.",
    features: ["Pas önleyici", "Metal yüzey koruması", "Uzun süreli koruma", "Endüstriyel konservasyon"],
    fullDescription: `Shell Ensis DW 2462, metal yüzeylerin ve endüstriyel ekipmanların uzun süreli depolama ve nakliye sürecinde korunması için geliştirilmiş konservasyon yağıdır.

UYGULAMALAR
• Metal yüzey koruması
• Endüstriyel ekipman depolama
• Uzun süreli konservasyon

PERFORMANS ÖZELLİKLERİ
• Etkili pas ve korozyon önleme
• Uzun ömürlü koruma filmi`,
    image: "/images/products/shell/ensis-dw-2462.jpg",
  },
  "irus-fluid-c": {
    name: "Shell Irus Fluid C", grade: "—", series: "Irus Fluid", type: "Özel Endüstriyel Sıvı",
    api: "—", acea: "—",
    approvals: [],
    description: "Özel endüstriyel uygulamalar için geliştirilmiş yüksek performanslı endüstriyel sıvı.",
    features: ["Özel endüstriyel formülasyon", "Yüksek performans", "Endüstriyel sistemler", "Güvenilir koruma"],
    fullDescription: `Shell Irus Fluid C, özel endüstriyel uygulamalar için geliştirilmiş yüksek performanslı endüstriyel sıvıdır.

UYGULAMALAR
• Özel endüstriyel sistemler
• Endüstriyel prosesler

PERFORMANS ÖZELLİKLERİ
• Yüksek performanslı endüstriyel formülasyon
• Güvenilir sistem koruması`,
    image: "/images/products/shell/irus-fluid-c.jpg",
  },
};


// ── Brand configs ─────────────────────────────────────────────────────────

interface BrandConfig { name: string; primary: string; secondary: string; accent: string; accentText: string; }

const BRAND_CONFIGS: Record<string, BrandConfig> = {
  shell:   { name: "Shell",       primary: "#DD1D21", secondary: "#9b1015", accent: "#FBCE07", accentText: "#9b1015" },
  mobil:   { name: "Mobil",       primary: "#003DA5", secondary: "#001a5c", accent: "#CC0000", accentText: "#ffffff" },
  castrol: { name: "Castrol",     primary: "#007A37", secondary: "#004d22", accent: "#E31837", accentText: "#ffffff" },
  total:   { name: "Elf / Total", primary: "#EE1C25", secondary: "#aa1019", accent: "#FFD100", accentText: "#aa1019" },
  motul:   { name: "Motul",       primary: "#1a1a1a", secondary: "#000000", accent: "#E8192C", accentText: "#ffffff" },
  texol:   { name: "Texol",       primary: "#0052A1", secondary: "#002d6b", accent: "#7EC8E3", accentText: "#002d6b" },
  texaco:         { name: "Texaco",       primary: "#CC0000", secondary: "#880000", accent: "#ffffff",  accentText: "#CC0000" },
  "petrol-ofisi": { name: "Petrol Ofisi", primary: "#CC2229", secondary: "#8c0f13", accent: "#ffffff",  accentText: "#CC2229" },
};

// ── MOBIL ─────────────────────────────────────────────────────────────────

const MOBIL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "1-esp-x2-0w-20": {
    name: "Mobil 1 ESP X2 0W-20", grade: "0W-20", series: "Mobil 1 ESP X2", type: "Tam Sentetik",
    api: "SN/CF", acea: "C5",
    approvals: ["BMW LL-17FE+", "MB 229.71", "VW 508 00/509 00"],
    description: "BMW'nin son teknoloji verimlilik standardı LL-17FE+'yı karşılayan ultra düşük viskoziteli tam sentetik motor yağı. Yakıt ekonomisini maksimize ederken üstün motor koruması sağlar.",
    features: ["BMW LL-17FE+ onaylı", "Ultra düşük viskozite", "Maksimum yakıt ekonomisi", "Hibrit araç uyumlu"],
    fullDescription: `BMW'nin en son verimlilik standardi LL-17FE+'yi karsilayan ultra dusuk viskoziteli tam sentetik motor yagi.

En ileri Mobil 1 ESP teknolojisiyle formule edilen bu yag, hibrit araclar dahil en modern BMW, Mercedes-Benz ve VW Group araclarinda maksimum yakit ekonomisi ve ustun motor korumasi saglar.

PERFORMANS OZELLIKLERI
* Yakit tuketimini minimize eden ultra dusuk viskozite
* BMW LL-17FE+ ve LL-14FE+ onayli
* Hibrit ve stop-start sistemlerle uyumluluk
* Soguk start aninda anlik yaglama koruma

STANDARTLAR VE SPESIFIKASYONLAR
API SN/CF
ACEA C5
BMW LL-17FE+
MB 229.71
VW 508 00/509 00`,
    image: "/images/products/mobil/1-esp-x2-0w-20.jpg",
  },






  "super-3000-x1-5w-40": {
    name: "Mobil Super 3000 X1 5W-40", grade: "5W-40", series: "Mobil Super 3000 X1", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Geniş bir araç yelpazesi için güvenilir tam sentetik motor yağı. Yüksek sıcaklık koruması ve uzun motor temizliği ile yoğun şehir trafiğinde üstün performans gösterir.",
    features: ["Tam sentetik formül", "Yüksek ısı koruması", "Motor temizleyici özellik", "Geniş araç uyumu"],
    fullDescription: `Genis arac yelpazesi icin ustun koruma sunan A3/B3/B4 sinifi tam sentetik motor yagi.

MB 229.3 ve VW 502/505 onayli formulasyonuyla hem benzinli hem dizel motorlarda yuksek sicaklik korumasi ve uzun motor temizligi saglar.

PERFORMANS OZELLIKLERI
* Genis OEM onay portfolyosu (MB, VW, Renault)
* Yuksek sicaklik motor korumasi
* Motor temizleyici deposit onleyici
* Tam sentetik uzun omur formulu

STANDARTLAR VE SPESIFIKASYONLAR
API SN/CF
ACEA A3/B3/B4
MB 229.3
VW 502.00/505.00
Renault RN0700/RN0710`,
    image: "/images/products/mobil/super-3000-x1-5w-40.png",
  },






  "1-extended-life-10w-60": {
    name: "Mobil 1 Extended Life 10W-60", grade: "10W-60", series: "Mobil 1 Extended Life", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["BMW Longlife-98", "Porsche A40", "MB 229.3"],
    description: "BMW M serisi ve yüksek performanslı spor araçlar için formüle edilmiş geniş viskozite aralıklı tam sentetik motor yağı. Aşırı sürüş koşullarında üstün film dayanımı ve termal stabilite sağlar.",
    features: ["BMW Longlife-98 onaylı", "Yüksek yük film dayanımı", "Spor motor koruması", "Porsche A40 uyumlu"],
    image: "/images/products/mobil/1-extended-life-10w-60.jpg",
    fullDescription: `Yüksek performanslı spor araçlar ve BMW M serisi için tasarlanmış üst düzey tam sentetik motor yağı.

Aşırı motor sıcaklıkları ve yüksek devirde bile stabil viskozite filmi koruyan gelişmiş formülasyonuyla motorsiklet ve spor araç sürüşünde maksimum motor ömrü sağlar.

PERFORMANS ÖZELLİKLERİ
• Yüksek hız ve yük altında üstün film koruması
• BMW M serisi sürüş koşullarına özel formüle edilmiştir
• Gelişmiş termal ve oksidasyon stabilitesi
• Geniş sıcaklık aralığında viskozite stabilitesi

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B4
BMW Longlife-98
Porsche A40
MB 229.3`,
  },
  "1-fs-new-life-0w-40": {
    name: "Mobil 1 FS New Life 0W-40", grade: "0W-40", series: "Mobil 1 FS New Life", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Sıfır kilometreden itibaren motorunuzu korumak üzere geliştirilmiş tam sentetik motor yağı. Mercedes-Benz ve Porsche onaylı formülasyonuyla yüksek performanslı motorda üstün oksidasyon direnci sağlar.",
    features: ["Sıfır km'den tam koruma", "MB 229.5 onaylı", "Porsche A40 onaylı", "Üstün oksidasyon direnci"],
    image: "/images/products/mobil/1-fs-new-life-0w-40.jpg",
    fullDescription: `Sıfır kilometreden itibaren motorunuzu korumak üzere özel olarak formüle edilmiş üst düzey tam sentetik motor yağı.

FS teknolojisiyle yeni araç servis aralıklarının uzatılmasına katkıda bulunurken motorunuzu ilk günden itibaren optimum koruma altında tutar.

PERFORMANS ÖZELLİKLERİ
• Sıfır kilometreden itibaren tam sentetik koruma
• Yüksek sıcaklıklarda üstün oksidasyon ve termal stabilite
• Soğuk start anında hızlı yağlama
• Uzun motor ömrü için deposit önleme

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B3/B4
MB 229.5
Porsche A40
Renault RN0700`,
  },
  "1-esp-formula-5w-30": {
    name: "Mobil 1 ESP Formula 5W-30", grade: "5W-30", series: "Mobil 1 ESP Formula", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504.00/507.00"],
    description: "Emisyon sonrası sistemleri koruyan ACEA C3 sınıfı tam sentetik ESP motor yağı. BMW, Mercedes-Benz ve Volkswagen DPF filtreli araçlarında uzun servis aralığı sağlar.",
    features: ["BMW LL-04 onaylı", "MB 229.51 onaylı", "VW 504/507 uyumlu", "DPF/GPF koruması"],
    image: "/images/products/mobil/1-esp-formula-5w-30.jpg",
    fullDescription: `Emisyon sonrası sistemleri koruyan, modern dizel ve benzinli motorlar için geliştirilmiş tam sentetik ESP motor yağı.

Düşük SAPS formülasyonuyla dizel partikül filtreleri (DPF) ve benzin partikül filtrelerini (GPF) temiz tutarken uzun servis aralıklarında optimum motor koruması sağlar.

PERFORMANS ÖZELLİKLERİ
• DPF ve GPF filtrelerini korur
• Uzun servis aralığı performansı
• Üstün soğuk start koruması
• Motor temizleyici formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA C3
BMW LL-04
MB 229.51
VW 504.00/507.00`,
  },
  "1-esp-5w-30-dexos2": {
    name: "Mobil 1 ESP 5W-30 Dexos2", grade: "5W-30", series: "Mobil 1 ESP", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["GMW16177 (dexos2)", "BMW LL-04", "MB 229.51", "VW 504.00/507.00"],
    description: "GM dexos2 lisanslı tam sentetik ESP motor yağı. DPF ve GPF filtreli benzinli ve dizel Opel/Vauxhall ve GM araçlarında üstün emisyon sistemi koruması sağlar.",
    features: ["dexos2 lisanslı", "BMW LL-04 onaylı", "MB 229.51 onaylı", "GPF/DPF uyumlu"],
    image: "/images/products/mobil/1-esp-5w-30-dexos2.jpg",
    fullDescription: `GM dexos2 lisanslı, partikül filtreli araçlar için özel olarak formüle edilmiş tam sentetik ESP motor yağı.

Modern benzinli ve dizel motorların gelişmiş emisyon sistemleriyle tam uyumlu düşük SAPS formülasyonuyla GPF ve DPF filtrelerini korurken optimum motor performansı sağlar.

PERFORMANS ÖZELLİKLERİ
• GM dexos2 lisanslı geniş araç uyumu
• GPF ve DPF emisyon sistemi koruması
• Gelişmiş motor temizliği ve koruma
• Uzun servis aralığı

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA C3
GMW16177 (dexos2)
BMW LL-04
MB 229.51
VW 504.00/507.00`,
  },
  "1-fs-5w-50": {
    name: "Mobil 1 FS 5W-50", grade: "5W-50", series: "Mobil 1 FS", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["Porsche A40", "MB 229.5", "BMW Longlife-98"],
    description: "Yüksek performanslı spor araçlar ve yarış motorları için geliştirilmiş geniş viskozite aralıklı tam sentetik motor yağı. Yüksek devirde ve aşırı sıcaklıklarda üstün motor koruması sağlar.",
    features: ["Yüksek RPM koruması", "Porsche A40 onaylı", "Aşırı ısı stabilitesi", "Spor sürüş formülü"],
    image: "/images/products/mobil/1-fs-5w-50.jpg",
    fullDescription: `Yüksek devirli spor araçlar ve yarış motorları için özel olarak tasarlanmış tam sentetik motor yağı.

Geniş viskozite aralığıyla hem soğuk start anında hızlı yağlama sağlar hem de yüksek sıcaklıklarda film kalınlığını koruyarak motor parçalarını maksimum düzeyde korur.

PERFORMANS ÖZELLİKLERİ
• Yüksek devir ve yük altında üstün film dayanımı
• Soğuk start ve sıcak çalışma koşullarında stabilite
• Aşırı termal koşullarda oksidasyon direnci
• Motor deposit ve çamur oluşumunu engelleme

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B4
Porsche A40
MB 229.5
BMW Longlife-98`,
  },
  "1-esp-x3-0w-40": {
    name: "Mobil 1 ESP X3 0W-40", grade: "0W-40", series: "Mobil 1 ESP X3", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Yüksek performanslı Avrupa araçları için geliştirilmiş ESP tam sentetik motor yağı. MB 229.5, Porsche A40 ve Renault onaylı geniş OEM portföyüyle üstün motor koruması sağlar.",
    features: ["MB 229.5 onaylı", "Porsche A40 onaylı", "Geniş araç uyumu", "Yüksek yük dayanımı"],
    image: "/images/products/mobil/1-esp-x3-0w-40.jpg",
    fullDescription: `Yüksek performanslı Avrupa araçları için tasarlanmış, Emisyon Sistemi Koruma (ESP) teknolojili tam sentetik motor yağı.

Mercedes-Benz 229.5 ve Porsche A40 onaylı formülasyonuyla performanslı araçlarda uzun motor ömrü ve üstün yüksek sıcaklık koruması sağlar.

PERFORMANS ÖZELLİKLERİ
• MB 229.5 ve Porsche A40 onaylı koruma
• Geniş sıcaklık aralığında viskozite stabilitesi
• Üstün aşınma ve yük koruması
• Hızlı soğuk start yağlaması

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A3/B4
MB 229.5
Porsche A40
Renault RN0700`,
  },
  "super-3000-formula-fe-5w-30": {
    name: "Mobil Super 3000 Formula FE 5W-30", grade: "5W-30", series: "Mobil Super 3000 Formula FE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-D", "Renault RN0700"],
    description: "Yakıt ekonomisi odaklı formülasyonuyla tasarlanmış tam sentetik motor yağı. Ford EcoBoost motorlarda mükemmel performans gösteren düşük sürtünmeli formülasyonuyla günlük kullanım için idealdir.",
    features: ["Ford WSS-M2C913-D onaylı", "Yakıt tasarruf teknolojisi", "A5/B5 sertifikalı", "Düşük sürtünme formülü"],
    image: "/images/products/mobil/super-3000-formula-fe-5w-30.jpg",
    fullDescription: `Yakıt ekonomisini maksimize etmek için özel olarak formüle edilmiş, Ford EcoBoost motorlara yönelik tam sentetik motor yağı.

A5/B5 sertifikasyonuyla düşük viskozite sürtünme direncini azaltırken motor koruma kalitesini koruyarak hem yakıt ekonomisi hem de motor ömrünü iyileştirir.

PERFORMANS ÖZELLİKLERİ
• Ford EcoBoost motorlarda mükemmel performans
• Yakıt tüketimini azaltan düşük sürtünme formülü
• Soğuk start anında hızlı yağlama
• Üstün motor temizliği

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA A5/B5
Ford WSS-M2C913-D
Renault RN0700`,
  },
  "super-3000-xe-5w-30-c3": {
    name: "Mobil Super 3000 XE 5W-30 C3", grade: "5W-30", series: "Mobil Super 3000 XE", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51"],
    description: "Partiküllü filtreleri olan araçlar için ACEA C3 sınıfı DPF uyumlu tam sentetik motor yağı. BMW LL-04 ve MB 229.51 onaylı düşük SAPS formülasyonuyla emisyon sistemlerini korur.",
    features: ["C3 DPF uyumlu", "BMW LL-04 onaylı", "MB 229.51 onaylı", "Düşük SAPS formülü"],
    image: "/images/products/mobil/super-3000-xe-5w-30-c3.jpg",
    fullDescription: `ACEA C3 sınıfı düşük SAPS formülasyonuyla partikül filtreleri koruyan tam sentetik motor yağı.

BMW LL-04 ve Mercedes-Benz 229.51 onaylı bu motor yağı, DPF filtreli modern araçlarda uzun servis aralığı ve üstün motor koruması sağlar.

PERFORMANS ÖZELLİKLERİ
• Dizel ve benzin partikül filtrelerini korur
• BMW ve Mercedes-Benz için uzun servis aralığı
• Gelişmiş motor temizliği
• Düşük SAPS ile katalitik konvertör uyumluluğu

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA C3
BMW LL-04
MB 229.51`,
  },
  "super-2000-x1-diesel-10w-40": {
    name: "Mobil Super 2000 X1 Diesel 10W-40", grade: "10W-40", series: "Mobil Super 2000 X1 Diesel", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B4",
    approvals: ["VW 505.00", "MB 229.1"],
    description: "Dizel motorlar için optimize edilmiş yarı sentetik motor yağı. Yüksek soot toleransı ve gelişmiş deposit kontrolüyle dizel partiküllerine karşı üstün koruma sağlar.",
    features: ["Dizel motor optimizasyonu", "VW 505.00 onaylı", "Yüksek soot toleransı", "Ekonomik yarı sentetik"],
    image: "/images/products/mobil/super-2000-x1-diesel-10w-40.jpg",
    fullDescription: `Modern ve eski nesil dizel motorlar için özel olarak formüle edilmiş yarı sentetik motor yağı.

Yüksek soot tutma kapasitesiyle dizel yanma artıklarını süspanse halinde tutarken motor parçalarına zarar vermeden temiz çalışma koşulları sağlar.

PERFORMANS ÖZELLİKLERİ
• Dizel motorlara özel yüksek soot toleransı
• Gelişmiş motor temizliği ve deposit kontrolü
• Geniş dizel araç uyumu
• Soğuk start performansı

STANDARTLAR VE SPESİFİKASYONLAR
API SL/CF
ACEA A3/B4
VW 505.00
MB 229.1`,
  },
  "delvac-xhp-ultra-le-5w-30": {
    name: "Mobil Delvac XHP Ultra LE 5W-30", grade: "5W-30", series: "Mobil Delvac XHP Ultra LE", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CK-4/SN", acea: "E6/E9",
    approvals: ["Volvo VDS-4.5", "Mack EO-O Premium Plus", "Cummins CES 20086", "MB 228.51"],
    description: "Son nesil Euro 6 ağır hizmet dizel motorları için geliştirilmiş Low Emission tam sentetik motor yağı. SCR ve DPF sistemleriyle tam uyumlu düşük SAPS formülasyonuyla uzatılmış servis aralığı sağlar.",
    features: ["CK-4 sertifikalı", "Low-SAPS düşük emisyon", "Euro 6 motor uyumlu", "Uzatılmış drain aralığı"],
    image: "/images/products/mobil/delvac-xhp-ultra-le-5w-30.jpg",
    fullDescription: `Son nesil ağır hizmet dizel motorları için özel olarak geliştirilen Low Emission (LE) tam sentetik motor yağı.

SCR, DPF ve EGR sistemleriyle tam uyumlu düşük SAPS formülasyonu sayesinde Euro 6 emisyon standartlarını karşılarken araç filosu için işletme maliyetlerini düşürür.

PERFORMANS ÖZELLİKLERİ
• SCR ve DPF sistemleriyle tam uyumluluk
• Uzatılmış yağ değişim aralığı
• Üstün motor deposit ve karbonlaşma kontrolü
• Yakıt ekonomisi katkısı

STANDARTLAR VE SPESİFİKASYONLAR
API CK-4/SN
ACEA E6, E9
Volvo VDS-4.5
Mack EO-O Premium Plus
Cummins CES 20086
MB 228.51`,
  },
  "delvac-1-5w-40": {
    name: "Mobil Delvac 1 5W-40", grade: "5W-40", series: "Mobil Delvac 1", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "Cummins CES 20081", "MAN M3477", "MB 228.3"],
    description: "Ağır hizmet dizel motorları için dünya çapında onaylı tam sentetik motor yağı. EGR motor uyumluluğu ve uzun drain aralığıyla filo işletme maliyetlerini düşürür.",
    features: ["Tam sentetik ağır hizmet", "Uzun drain aralığı", "EGR motor uyumlu", "Geniş OEM onay portföyü"],
    image: "/images/products/mobil/delvac-1-5w-40.jpg",
    fullDescription: `Ağır hizmet kamyon ve otobüs motorları için geliştirilmiş, dünya genelinde başlıca OEM'ler tarafından onaylanmış tam sentetik motor yağı.

EGR teknolojili motorlarda üstün koruma sağlayan formülasyonuyla hem motor ömrünü uzatır hem de filo bakım maliyetlerini azaltır.

PERFORMANS ÖZELLİKLERİ
• EGR motorlarda üstün deposit ve soot kontrolü
• Uzatılmış yağ değişim aralığı
• Soğuk iklimde kolay start ve koruma
• Üstün oksitlenme ve nitrasyon direnci

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4 Plus/SL
ACEA E7
Volvo VDS-3
Cummins CES 20081
MAN M3477
MB 228.3`,
  },
  "delvac-xhp-le-10w-40": {
    name: "Mobil Delvac XHP LE 10W-40", grade: "10W-40", series: "Mobil Delvac XHP LE", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CK-4/SN", acea: "E6/E9",
    approvals: ["Volvo VDS-4.5", "Mack EO-O Premium Plus", "Cummins CES 20086"],
    description: "Düşük emisyonlu ağır hizmet dizel motorları için geliştirilmiş CK-4 sertifikalı tam sentetik motor yağı. Low-SAPS formülasyonuyla SCR/DPF sistemlerini korur.",
    features: ["CK-4 onaylı", "Low-SAPS formülü", "SCR/DPF uyumlu", "Üstün yüksek sıcaklık stabilitesi"],
    image: "/images/products/mobil/delvac-xhp-le-10w-40.jpg",
    fullDescription: `CK-4 sınıfı düşük emisyonlu ağır hizmet motorları için geliştirilmiş tam sentetik motor yağı.

Low-SAPS formülasyonuyla modern emisyon kontrol sistemlerini korurken yüksek sıcaklık stabilitesi ve uzatılmış servis aralığı sağlar.

PERFORMANS ÖZELLİKLERİ
• CK-4 düşük emisyon uyumluluğu
• Dizel partikül filtresi (DPF) koruması
• Yüksek sıcaklıklarda üstün viskozite stabilitesi
• Uzun servis aralığı

STANDARTLAR VE SPESİFİKASYONLAR
API CK-4/SN
ACEA E6, E9
Volvo VDS-4.5
Mack EO-O Premium Plus
Cummins CES 20086`,
  },
  "delvac-xhp-extra-10w-40": {
    name: "Mobil Delvac XHP Extra 10W-40", grade: "10W-40", series: "Mobil Delvac XHP Extra", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CJ-4/SN", acea: "E7",
    approvals: ["Volvo VDS-3", "Mack EO-O Premium Plus", "Cummins CES 20081"],
    description: "Geniş ağır hizmet araç yelpazesinde yüksek performans sunan CJ-4 sertifikalı tam sentetik motor yağı. Gelişmiş deposit kontrolü ve uzun drain aralığıyla işletme maliyetlerini düşürür.",
    features: ["CJ-4 sertifikalı", "Uzun drain aralığı", "EGR uyumlu ağır hizmet", "Üstün deposit kontrolü"],
    image: "/images/products/mobil/delvac-xhp-extra-10w-40.png",
    fullDescription: `CJ-4 sertifikalı, geniş ağır hizmet kamyon ve otobüs motorları için tasarlanmış tam sentetik motor yağı.

Yüksek TBN kapasitesi ve gelişmiş deposit önleme özellikleriyle uzun servis aralıklarında optimum motor koruması sağlarken yakıt ekonomisine katkıda bulunur.

PERFORMANS ÖZELLİKLERİ
• CJ-4 ile EGR uyumlu motor koruması
• Üstün deposit ve soot kontrolü
• Yakıt ekonomisi katkısı
• Uzatılmış yağ ömrü

STANDARTLAR VE SPESİFİKASYONLAR
API CJ-4/SN
ACEA E7
Volvo VDS-3
Mack EO-O Premium Plus
Cummins CES 20081`,
  },
  "delvac-xhp-esp-10w-40": {
    name: "Mobil Delvac XHP ESP 10W-40", grade: "10W-40", series: "Mobil Delvac XHP ESP", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CJ-4/SN", acea: "E6/E7",
    approvals: ["Volvo VDS-3", "Cummins CES 20081", "MB 228.31", "MAN M3477"],
    description: "Emisyon sonrası sistemleri koruyan ESP teknolojili tam sentetik ağır hizmet motor yağı. DPF dostu düşük SAPS formülasyonuyla CJ-4 standartlarını karşılar.",
    features: ["ESP emisyon sistemi dostu", "DPF düşük SAPS formülü", "CJ-4 onaylı", "Üstün deposit kontrolü"],
    image: "/images/products/mobil/delvac-xhp-esp-10w-40.png",
    fullDescription: `Emisyon Sistemi Koruması (ESP) teknolojisiyle formüle edilmiş, ağır hizmet dizel motorları için tam sentetik motor yağı.

CJ-4 sertifikalı düşük SAPS formülasyonuyla dizel partikül filtrelerini (DPF) korurken motor içi temizliği ve korumasını maksimize eder.

PERFORMANS ÖZELLİKLERİ
• Dizel partikül filtrelerini temiz tutar
• CJ-4 uyumlu düşük SAPS
• Üstün soot ve deposit kontrolü
• Uzatılmış yağ değişim aralığı

STANDARTLAR VE SPESİFİKASYONLAR
API CJ-4/SN
ACEA E6, E7
Volvo VDS-3
Cummins CES 20081
MB 228.31
MAN M3477`,
  },
  "delvac-mx-esp-15w-40": {
    name: "Mobil Delvac MX ESP 15W-40", grade: "15W-40", series: "Mobil Delvac MX ESP", type: "Mineral (Ağır Hizmet)",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "Cummins CES 20078", "MAN M3275", "MB 228.3"],
    description: "Emisyon kontrol sistemleriyle uyumlu ekonomik mineral ağır hizmet motor yağı. Geniş OEM onay portföyüyle büyük filolar için maliyet etkin koruma sağlar.",
    features: ["ESP emisyon sistemi uyumlu", "Ekonomik mineral formül", "CI-4 onaylı", "Geniş filo uyumluluğu"],
    image: "/images/products/mobil/delvac-mx-esp-15w-40.jpg",
    fullDescription: `Emisyon kontrol sistemleriyle uyumlu geliştirilmiş ekonomik mineral ağır hizmet motor yağı.

Geniş OEM onayları portföyüyle büyük filolarda bakım maliyetlerini minimize ederken güvenilir motor koruması sağlar.

PERFORMANS ÖZELLİKLERİ
• EGR motorlarla uyumlu ESP teknolojisi
• Geniş filo ve OEM uyumu
• Güvenilir ağır hizmet koruması
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4/SL
ACEA E7
Volvo VDS-3
Cummins CES 20078
MAN M3275
MB 228.3`,
  },
  "delvac-lcv-f-5w-30": {
    name: "Mobil Delvac LCV F 5W-30", grade: "5W-30", series: "Mobil Delvac LCV F", type: "Tam Sentetik (Hafif Ticari)",
    api: "SN/CF", acea: "C3/E6",
    approvals: ["Ford WSS-M2C913-D", "Fiat 9.55535-S1", "Renault RN0700"],
    description: "Hafif ticari araçlar ve LCV filolar için özelleştirilmiş tam sentetik motor yağı. Ford ve Fiat ticari araç onaylı formülasyonuyla uzun değişim aralığı sağlar.",
    features: ["Hafif ticari araç özel", "Ford LCV onaylı", "Uzun drain aralığı", "Düşük SAPS C3/E6 formülü"],
    image: "/images/products/mobil/delvac-lcv-f-5w-30.jpg",
    fullDescription: `Hafif ticari araçlar (LCV) için özel olarak geliştirilen, Ford ve Fiat onaylı tam sentetik motor yağı.

C3 ve E6 çift sertifikasyonuyla hem binek taşımacılığı hem de hafif yük araçlarında optimum motor koruması ve yakıt ekonomisi sağlar.

PERFORMANS ÖZELLİKLERİ
• Ford ve Fiat hafif ticari araç onaylı
• C3/E6 çift sertifikasyon uyumu
• Uzun servis aralığı ile filo ekonomisi
• DPF ve GPF koruması

STANDARTLAR VE SPESİFİKASYONLAR
API SN/CF
ACEA C3, E6
Ford WSS-M2C913-D
Fiat 9.55535-S1
Renault RN0700`,
  },
  "delvac-mx-15w-40": {
    name: "Mobil Delvac MX 15W-40", grade: "15W-40", series: "Mobil Delvac MX", type: "Mineral (Ağır Hizmet)",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "MB 228.3", "Volvo VDS-3"],
    description: "Ağır hizmet dizel motorları için geliştirilmiş güvenilir ve ekonomik mineral motor yağı. Geniş OEM onay portföyüyle büyük filolar için maliyet etkin çözüm sunar.",
    features: ["CI-4 Plus sertifikalı", "Ekonomik mineral formül", "Geniş OEM onay portföyü", "Güvenilir ağır hizmet koruması"],
    image: "/images/products/mobil/delvac-mx-15w-40.png",
    fullDescription: `Ağır hizmet kamyon ve otobüs motorları için güvenilir, ekonomik mineral motor yağı.

CI-4 Plus sertifikasyonu ve geniş OEM onay portföyüyle büyük araç filolarında hem güvenilir koruma hem de düşük bakım maliyeti sağlar.

PERFORMANS ÖZELLİKLERİ
• CI-4 Plus ile EGR motor koruması
• Geniş filo ve araç uyumu
• Ekonomik mineral formülasyon
• Güvenilir ağır hizmet koruması

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4 Plus/SL
ACEA E7
Cummins CES 20076
MAN M3275
MB 228.3
Volvo VDS-3`,
  },
  "delvac-mx-esp-10w-30": {
    name: "Mobil Delvac MX ESP 10W-30", grade: "10W-30", series: "Mobil Delvac MX ESP", type: "Mineral (Ağır Hizmet)",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Cummins CES 20078", "MB 228.3", "Volvo VDS-3"],
    description: "Soğuk iklim koşullarında kullanıma uygun ESP mineral ağır hizmet motor yağı. Düşük sıcaklıklarda kolay soğuk start ve emisyon kontrol sistemi uyumluluğu sağlar.",
    features: ["Soğuk start performansı", "ESP emisyon uyumlu", "Ekonomik mineral formül", "CI-4 onaylı"],
    image: "/images/products/mobil/delvac-mx-esp-10w-30.jpg",
    fullDescription: `Soğuk iklim bölgeleri için özel olarak formüle edilmiş, emisyon kontrol sistemi uyumlu mineral ağır hizmet motor yağı.

Düşük viskozitesi sayesinde soğuk havada kolay motor start sağlarken ESP teknolojisiyle EGR ve emisyon sonrası sistemleri korur.

PERFORMANS ÖZELLİKLERİ
• Soğuk iklimde kolay start ve hızlı yağlama
• ESP teknolojisi ile emisyon uyumluluğu
• Ekonomik mineral formülasyon
• Güvenilir ağır hizmet motor koruması

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4/SL
ACEA E7
Cummins CES 20078
MB 228.3
Volvo VDS-3`,
  },
  "delvac-xhp-15w-40": {
    name: "Mobil Delvac XHP 15W-40", grade: "15W-40", series: "Mobil Delvac XHP", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CJ-4/SN", acea: "E7",
    approvals: ["Volvo VDS-3", "Cummins CES 20081", "MAN M3477", "MB 228.3"],
    description: "CJ-4 sertifikalı yüksek performanslı ağır hizmet tam sentetik motor yağı. Uzun drain aralığı ve üstün motor temizliğiyle filo işletme maliyetlerini azaltır.",
    features: ["CJ-4 sertifikalı", "Uzun drain aralığı", "Üstün motor temizliği", "EGR motor uyumlu"],
    image: "/images/products/mobil/delvac-xhp-15w-40.jpg",
    fullDescription: `CJ-4 ağır hizmet standardını karşılayan, ağır hizmet kamyon motorları için geliştirilmiş tam sentetik motor yağı.

Uzun servis aralıkları ve üstün deposit önleme özellikleriyle filo işletme maliyetlerini düşürürken motor ömrünü uzatır.

PERFORMANS ÖZELLİKLERİ
• CJ-4 standardına göre uzatılmış drain aralığı
• Üstün motor temizliği ve deposit kontrolü
• EGR uyumlu formülasyon
• Yakıt ekonomisine katkı

STANDARTLAR VE SPESİFİKASYONLAR
API CJ-4/SN
ACEA E7
Volvo VDS-3
Cummins CES 20081
MAN M3477
MB 228.3`,
  },
  "delvac-super-20w-50": {
    name: "Mobil Delvac Super 20W-50", grade: "20W-50", series: "Mobil Delvac Super", type: "Mineral (Ağır Hizmet)",
    api: "CH-4/SL", acea: "E3",
    approvals: ["Cummins CES 20071", "MAN M3275", "MB 228.1"],
    description: "Tropikal ve yüksek çevre sıcaklığı koşullarında ağır hizmet dizel motorları için formüle edilmiş mineral motor yağı. Yüksek sıcaklıklarda üstün viskozite stabilitesi sağlar.",
    features: ["Yüksek sıcaklık stabilitesi", "Tropikal iklim uyumlu", "CH-4 sertifikalı", "Ekonomik mineral formül"],
    image: "/images/products/mobil/delvac-super-20w-50.png",
    fullDescription: `Sıcak iklim bölgeleri ve yüksek çevre sıcaklığı koşullarında çalışan ağır hizmet motorları için özel olarak formüle edilmiş mineral motor yağı.

Yüksek viskozite indeksiyle yüksek çalışma sıcaklıklarında film kalınlığını koruyarak tropikal ortamlarda motor parçalarını güvenilir biçimde korur.

PERFORMANS ÖZELLİKLERİ
• Yüksek sıcaklıklarda üstün viskozite stabilitesi
• Tropikal ve sıcak iklim koşullarına uygun
• Güvenilir ağır hizmet motor koruması
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CH-4/SL
ACEA E3
Cummins CES 20071
MAN M3275
MB 228.1`,
  },
  "delvac-1350": {
    name: "Mobil Delvac 1350", grade: "SAE 50", series: "Mobil Delvac 1350", type: "Mineral (Ağır Hizmet, Monograde)",
    api: "CF-4/SF", acea: "E2",
    approvals: ["MIL-L-2104E", "MAN M3275"],
    description: "SAE 50 monograde ağır hizmet dizel motor yağı. Eski nesil kamyon ve iş makinesi motorlarında güvenilir yüksek sıcaklık koruması sağlayan ekonomik mineral seçenek.",
    features: ["SAE 50 monograde formülü", "Eski nesil motor uyumlu", "Yüksek sıcaklık koruması", "Mineral ekonomik seçenek"],
    image: "/images/products/mobil/delvac-1350.jpg",
    fullDescription: `Eski ve konvansiyonel ağır hizmet dizel motorları için formüle edilmiş SAE 50 monograde mineral motor yağı.

Yüksek viskozitesiyle yüksek çalışma sıcaklıklarında güvenilir film koruması sağlarken eski nesil motor tasarımlarının gereksinimlerini karşılar.

PERFORMANS ÖZELLİKLERİ
• SAE 50 yüksek viskozite koruması
• Eski motor tasarımlarıyla uyumluluk
• Güvenilir yüksek sıcaklık film koruması
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CF-4/SF
ACEA E2
MIL-L-2104E
MAN M3275`,
  },
  "delvac-1340": {
    name: "Mobil Delvac 1340", grade: "SAE 40", series: "Mobil Delvac 1340", type: "Mineral (Ağır Hizmet, Monograde)",
    api: "CF-4/SF", acea: "E2",
    approvals: ["MIL-L-2104E", "MAN M3275"],
    description: "SAE 40 monograde ağır hizmet dizel motor yağı. Standart çalışma koşullarındaki eski nesil dizel motorlar ve iş makinelerinde temel motor koruması sağlar.",
    features: ["SAE 40 monograde formülü", "Eski dizel motor uyumlu", "Temel ağır hizmet koruması", "Ekonomik mineral seçenek"],
    image: "/images/products/mobil/delvac-1340.jpg",
    fullDescription: `Standart çalışma koşullarında eski ve konvansiyonel ağır hizmet dizel motorları için formüle edilmiş SAE 40 monograde mineral motor yağı.

Temel motor koruması ihtiyaçlarını karşılayan ekonomik formülasyonuyla eski nesil kamyon ve iş makinesi motorları için ideal seçenektir.

PERFORMANS ÖZELLİKLERİ
• SAE 40 dengeli viskozite koruması
• Eski motor tasarımlarıyla uyumluluk
• Temel ağır hizmet motor koruması
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CF-4/SF
ACEA E2
MIL-L-2104E
MAN M3275`,
  },
  "delvac-1330": {
    name: "Mobil Delvac 1330", grade: "SAE 30", series: "Mobil Delvac 1330", type: "Mineral (Ağır Hizmet, Monograde)",
    api: "CF-4/SF", acea: "E2",
    approvals: ["MIL-L-2104E", "Caterpillar TO-2"],
    description: "SAE 30 monograde ağır hizmet motor yağı. Standart çalışma koşullarında motor koruması ve Caterpillar iş makineleriyle uyumluluk sağlar.",
    features: ["SAE 30 monograde formülü", "Caterpillar TO-2 onaylı", "Temel ağır hizmet formülü", "Ekonomik mineral yağ"],
    image: "/images/products/mobil/delvac-1330.jpg",
    fullDescription: `Eski ve konvansiyonel ağır hizmet motorları için SAE 30 monograde mineral motor yağı.

Düşük viskozitesiyle soğuk start koşullarında hızlı yağlama sağlarken temel motor koruma gereksinimlerini karşılar.

PERFORMANS ÖZELLİKLERİ
• SAE 30 düşük viskoziteli soğuk start avantajı
• Caterpillar iş makineleriyle uyumluluk
• Temel ağır hizmet motor koruması
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CF-4/SF
ACEA E2
MIL-L-2104E
Caterpillar TO-2`,
  },
  "delvac-super-1000-20w-50": {
    name: "Mobil Delvac Super 1000 20W-50", grade: "20W-50", series: "Mobil Delvac Super 1000", type: "Mineral (Ağır Hizmet)",
    api: "CH-4/SL", acea: "E3",
    approvals: ["Cummins CES 20071", "MB 228.1"],
    description: "Büyük araç filoları ve yüksek sıcaklık ortamları için formüle edilmiş mineral ağır hizmet motor yağı. Filo bakım maliyetlerini minimize eden ekonomik formülasyonuyla güvenilir koruma sağlar.",
    features: ["Filo bakım ekonomisi", "Yüksek sıcaklık stabilitesi", "CH-4 sertifikalı", "Mineral ekonomik formül"],
    image: "/images/products/mobil/delvac-super-1000-20w-50.jpg",
    fullDescription: `Büyük araç filolarının ekonomik bakım ihtiyaçlarını karşılamak için tasarlanmış mineral ağır hizmet motor yağı.

Yüksek çalışma sıcaklıklarında yeterli film koruması sağlarken düşük maliyet avantajıyla büyük filolarda bakım maliyetlerini azaltır.

PERFORMANS ÖZELLİKLERİ
• Büyük filo operasyonları için ekonomik seçenek
• Yüksek sıcaklıklarda yeterli viskozite koruması
• CH-4 ağır hizmet sertifikasyonu
• Güvenilir motor koruması

STANDARTLAR VE SPESİFİKASYONLAR
API CH-4/SL
ACEA E3
Cummins CES 20071
MB 228.1`,
  },
  "delvac-ct-diesel-10w-30": {
    name: "Mobil Delvac CT Diesel 10W-30", grade: "10W-30", series: "Mobil Delvac CT", type: "Mineral (Ağır Hizmet)",
    api: "CI-4/SL", acea: "E5",
    approvals: ["MB 228.3", "Volvo VDS-2", "MAN M3275"],
    description: "Konvansiyonel teknoloji dizel motorları için formüle edilmiş CI-4 onaylı mineral motor yağı. Soğuk iklim koşullarında kolay soğuk start özelliği ve güvenilir koruma sağlar.",
    features: ["Soğuk iklim start performansı", "CI-4 onaylı", "Konvansiyonel dizel uyumlu", "Ekonomik mineral formül"],
    image: "/images/products/mobil/delvac-ct-diesel-10w-30.jpg",
    fullDescription: `Konvansiyonel ve eski teknoloji ağır hizmet dizel motorları için formüle edilmiş CI-4 onaylı mineral motor yağı.

Düşük viskozitesiyle soğuk havalarda kolay motor start sağlarken güvenilir ağır hizmet koruması ve emisyon kontrol sistemi uyumluluğu sunar.

PERFORMANS ÖZELLİKLERİ
• Soğuk iklimde kolay start ve hızlı yağlama
• CI-4 standartlarına uygun koruma
• Konvansiyonel ve eski teknoloji motor uyumu
• Ekonomik mineral formülasyon

STANDARTLAR VE SPESİFİKASYONLAR
API CI-4/SL
ACEA E5
MB 228.3
Volvo VDS-2
MAN M3275`,
  },
};

const MOBIL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "dte-10-excel-32": {
    name: "Mobil DTE 10 Excel 32", grade: "ISO VG 32", series: "Mobil DTE 10 Excel", type: "Hidrolik Yağ (Yüksek VI)",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton (Vickers) I-286-S/M-2950-S"],
    description: "Yüksek viskozite indeksiyle geniş sıcaklık aralığında sabit performans sunan premium hidrolik yağı. Özellikle dış ortam makineleri ve mobil hidrolik sistemler için idealdir.",
    features: ["Geniş sıcaklık aralığı performansı", "Üstün viskozite indeksi (VI 150+)", "Parker Denison HF-0 onaylı", "Uzun sistem ömrü"],
  },
  "dte-10-excel-46": {
    name: "Mobil DTE 10 Excel 46", grade: "ISO VG 46", series: "Mobil DTE 10 Excel", type: "Hidrolik Yağ (Yüksek VI)",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton (Vickers) I-286-S/M-2950-S", "Cincinnati Machine P-68/P-69/P-70"],
    description: "Endüstriyel hidrolik sistemlerin en yaygın viskozite derecesinde sunulan yüksek VI hidrolik yağı. Fabrika içi ve mobil ekipmanlarda üstün pompa koruması sağlar.",
    features: ["En yaygın sanayi viskozitesi", "Yüksek VI formülü", "Çoklu pompa uyumluluğu", "Üstün oksidasyon direnci"],
  },
  "dte-10-excel-68": {
    name: "Mobil DTE 10 Excel 68", grade: "ISO VG 68", series: "Mobil DTE 10 Excel", type: "Hidrolik Yağ (Yüksek VI)",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton (Vickers) I-286-S"],
    description: "Yüksek çalışma sıcaklıklarındaki ağır hizmet hidrolik sistemler için tasarlanmış yüksek VI hidrolik yağı. İnşaat ve madencilik ekipmanlarında güvenilir performans sağlar.",
    features: ["Yüksek sıcaklık stabilitesi", "Ağır hizmet uyumlu", "Düşük köpük eğilimi", "Yüksek VI indeksi"],
  },
  "dte-10-excel-100": {
    name: "Mobil DTE 10 Excel 100", grade: "ISO VG 100", series: "Mobil DTE 10 Excel", type: "Hidrolik Yağ (Yüksek VI)",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2"],
    description: "Ekstra yük kapasitesi gerektiren büyük hidrolik sistemler için yüksek viskoziteli premium hidrolik yağı. Ağır presler ve büyük inşaat ekipmanlarında güvenilir koruma sağlar.",
    features: ["Ekstra yük kapasitesi", "Büyük sistem uyumluluğu", "Termal stabilite", "Uzun servis ömrü"],
  },
  "shc-630": {
    name: "Mobil SHC 630", grade: "ISO VG 150", series: "Mobil SHC 630", type: "Dişli Yağı (Tam Sentetik)",
    api: "ISO 12925-1 CKT", acea: "DIN 51517-3 CLP",
    approvals: ["US Steel 224", "David Brown S1.53.101", "AGMA 9005-E02"],
    description: "PAO bazlı tam sentetik endüstriyel dişli yağı. Mineral yağlara kıyasla çok daha uzun servis aralıkları ve üstün düşük sıcaklık performansı ile sert çalışma koşullarında üstün dişli koruması sağlar.",
    features: ["PAO tam sentetik formül", "Uzun servis aralığı", "Üstün düşük sıcaklık akışkanlığı", "Yüksek ısı stabilitesi"],
  },
  "shc-632": {
    name: "Mobil SHC 632", grade: "ISO VG 220", series: "Mobil SHC 632", type: "Dişli Yağı (Tam Sentetik)",
    api: "ISO 12925-1 CKT", acea: "DIN 51517-3 CLP",
    approvals: ["US Steel 224", "David Brown S1.53.101", "AGMA 9005-E02"],
    description: "En yaygın endüstriyel dişli viskozite derecesinde PAO bazlı tam sentetik dişli yağı. Redüktörler ve kapalı dişli kutularında mineral yağlara göre 3 kat daha uzun servis ömrü sağlar.",
    features: ["ISO VG 220 tam sentetik", "3x uzun servis ömrü", "Enerji tasarrufu", "Üstün düşük sıcaklık akışı"],
  },
  "rarus-427": {
    name: "Mobil Rarus 427", grade: "ISO VG 46", series: "Mobil Rarus 427", type: "Kompresör Yağı (Mineral)",
    api: "ISO 6743-3A DAA/DAB/DAH/DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Ingersoll Rand", "Sullair", "CompAir"],
    description: "Hava kompresörleri için geliştirilmiş yüksek performanslı mineral kompresör yağı. Pistonlu ve döner vidalı kompresörlerde uzun ömürlü performans ve düşük karbon birikimi sağlar.",
    features: ["Geniş kompresör tipi uyumluluğu", "Düşük karbon birikimi", "Üstün oksidasyon direnci", "Ekonomik mineral formül"],
  },
  "rarus-shc-1024": {
    name: "Mobil Rarus SHC 1024", grade: "ISO VG 46", series: "Mobil Rarus SHC 1024", type: "Kompresör Yağı (Tam Sentetik)",
    api: "ISO 6743-3A DAJ/DAH", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair", "Gardner Denver"],
    description: "Döner vidalı kompresörler için geliştirilmiş PAO bazlı tam sentetik kompresör yağı. 8.000 saate kadar uzatılmış değişim aralığı ve minimum karbon birikimi ile işletme maliyetlerini azaltır.",
    features: ["PAO tam sentetik formül", "8.000 saat değişim aralığı", "Sıfır karbon birikimi", "Çevre dostu uzun ömür"],
  },
  "vactra-2": {
    name: "Mobil Vactra 2", grade: "ISO VG 68 (No.2)", series: "Mobil Vactra", type: "Kızak Yağı",
    api: "ISO 6743-13 G", acea: "DIN 51502 CGLP",
    approvals: ["Cincinnati Machine P-47", "Mazak", "Okuma", "Fanuc"],
    description: "CNC tezgahları ve hassas takım tezgahları için geliştirilmiş özel kızak yağı. Stick-slip titreşimlerini elimine ederek hassas yüzey kalitesi ve ilerleme tutarlılığı sağlar.",
    features: ["Stick-slip önleme", "CNC tezgah uyumluluğu", "Hassas ilerleme kontrolü", "Su emülsiyonu direnci"],
  },
  "grease-xhp-222": {
    name: "Mobil Grease XHP 222", grade: "NLGI 2", series: "Mobil Grease XHP 222", type: "Gres Yağı EP",
    api: "ISO 6743-9 L-XBCHB 2", acea: "DIN 51825 KP2K-20",
    approvals: ["SKF", "FAG", "NSK", "Timken"],
    description: "Lityum kompleks kıvamlaştırıcılı yüksek performanslı EP gres yağı. Rulmanlı yataklar, dişli kutular ve eklem noktaları dahil geniş endüstriyel uygulamalarda üstün koruma sağlar.",
    features: ["Yüksek EP kapasitesi", "Geniş sıcaklık aralığı (-20°C ile +150°C)", "Su ve pas koruması", "Uzun yeniden gres aralıkları"],
  },

  "shc-pegasus-30": {
    name: "Mobil SHC Pegasus 30", grade: "SAE 30", series: "Mobil SHC Pegasus", type: "Gaz Motor Yağı (Tam Sentetik)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
    description: "Dört zamanlı stasyoner doğal gaz motorları için geliştirilmiş PAO bazlı tam sentetik gaz motor yağı. Yüksek hızlı gaz motorlarında minimum deposit ve uzun yağ değişim aralığı sağlar.",
    features: ["PAO tam sentetik formül", "Düşük deposit oluşumu", "Uzun değişim aralığı", "Gaz motoru optimizasyonu"],
    image: "/images/products/mobil/shc-pegasus-30.jpg",
    fullDescription: `Stasyoner ve doğal gaz motorları için özel olarak geliştirilen PAO (Poly-Alpha-Olefin) bazlı tam sentetik gaz motor yağı.

Mineral yağlara kıyasla çok daha uzun servis aralıkları ve düşük deposit oluşumuyla endüstriyel gaz motorlarında işletme maliyetlerini azaltır ve motor ömrünü uzatır.

PERFORMANS ÖZELLİKLERİ
• Yüksek oksidasyon ve nitrasyon direnci
• Düşük kül içeriğiyle spark plug koruması
• Uzatılmış yağ değişim aralığı
• Geniş sıcaklık aralığında viskozite stabilitesi

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Cummins
Waukesha`,
  },
  "pegasus-805": {
    name: "Mobil Pegasus 805", grade: "SAE 40", series: "Mobil Pegasus 800", type: "Gaz Motor Yağı (Mineral)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
    description: "Yüksek TBN kapasiteli dört zamanlı stasyoner doğal gaz motorları için geliştirilmiş mineral gaz motor yağı. Asit nötralizasyonu ve korozyon korumasıyla uzun motor ömrü sağlar.",
    features: ["Yüksek TBN kapasitesi", "Asit korozyon koruması", "Doğal gaz motor uyumlu", "Güvenilir mineral formül"],
    image: "/images/products/mobil/pegasus-805.jpg",
    fullDescription: `Dört zamanlı stasyoner doğal gaz motorları için yüksek TBN (Total Base Number) kapasiteli mineral gaz motor yağı.

Yüksek alkali rezerviyle yanma süreçlerinde oluşan asidik artıkları nötralize ederek motor parçalarını korozyon ve aşınmaya karşı korur.

PERFORMANS ÖZELLİKLERİ
• Yüksek TBN ile güçlü asit nötralizasyonu
• Motor korozyonuna karşı etkin koruma
• Doğal gaz motorlarına özel formülasyon
• Güvenilir mineral motor yağı

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Cummins
Waukesha`,
  },
  "pegasus-605": {
    name: "Mobil Pegasus 605", grade: "SAE 40", series: "Mobil Pegasus 600", type: "Gaz Motor Yağı (Mineral)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Waukesha"],
    description: "Orta düzey dört zamanlı stasyoner doğal gaz ve biyogaz motorları için geliştirilmiş mineral gaz motor yağı. Güvenilir koruma ve ekonomik formülasyonuyla orta ölçekli tesisler için idealdir.",
    features: ["Gaz ve biyogaz motor uyumlu", "Orta TBN alkali rezerv", "Ekonomik mineral formül", "Stasyoner motor optimizasyonu"],
    image: "/images/products/mobil/pegasus-605.jpg",
    fullDescription: `Orta ölçekli stasyoner doğal gaz ve biyogaz motorları için formüle edilmiş mineral gaz motor yağı.

Orta düzey TBN kapasitesiyle temiz yakıtlı gaz motorlarında güvenilir koruma ve ekonomik bakım imkânı sağlar.

PERFORMANS ÖZELLİKLERİ
• Temiz gaz yakıtlı motorlarda güvenilir koruma
• Orta TBN ile asit kontrolü
• Ekonomik mineral formülasyon
• Uzun çalışma koşullarında stabilite

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Waukesha`,
  },
  "pegasus-610": {
    name: "Mobil Pegasus 610", grade: "SAE 40", series: "Mobil Pegasus 600", type: "Gaz Motor Yağı (Mineral)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Waukesha"],
    description: "Dört zamanlı stasyoner doğal gaz motorları için formüle edilmiş yüksek performanslı mineral gaz motor yağı. Gelişmiş oksidasyon direnciyle uzun çalışma sürelerinde güvenilir motor koruması sağlar.",
    features: ["Yüksek oksidasyon direnci", "Uzun çalışma süresi performansı", "Gaz motor uyumlu", "Mineral ekonomik formül"],
    image: "/images/products/mobil/pegasus-610.jpg",
    fullDescription: `Yüksek çalışma saatlerinde güvenilir performans sağlayan dört zamanlı stasyoner doğal gaz motorları için mineral gaz motor yağı.

Gelişmiş oksidasyon direnci formülasyonuyla uzun çalışma sürelerinde yağın bozulmasını yavaşlatarak motor korumasını sürdürür.

PERFORMANS ÖZELLİKLERİ
• Uzun çalışma sürelerinde üstün oksidasyon stabilitesi
• Düşük deposit ve vernik oluşumu
• Doğal gaz motorlarına özel formülasyon
• Güvenilir mineral motor koruma

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Waukesha`,
  },
  "pegasus-1005": {
    name: "Mobil Pegasus 1005", grade: "SAE 40", series: "Mobil Pegasus 1000", type: "Gaz Motor Yağı (Mineral, Yüksek Kül)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
    description: "Kirli veya yüksek kükürtlü gaz yakıtlarıyla çalışan ağır hizmet gaz motorları için yüksek TBN'li mineral gaz motor yağı. Güçlü asit nötralizasyonuyla motor ömrünü korur.",
    features: ["En yüksek TBN kapasitesi", "Kirli gaz yakıt toleransı", "Güçlü asit nötralizasyonu", "Ağır hizmet gaz motoru"],
    image: "/images/products/mobil/pegasus-1005.jpg",
    fullDescription: `Kirli veya yüksek kükürtlü gaz yakıtlarının kullanıldığı ağır hizmet gaz motorları için formüle edilmiş yüksek TBN'li mineral gaz motor yağı.

En yüksek alkali rezerv kapasitesiyle asidik yanma ürünlerini etkili biçimde nötralize ederek motor parçalarını korozyona karşı korur.

PERFORMANS ÖZELLİKLERİ
• En yüksek TBN ile maksimum asit nötralizasyonu
• Kirli gaz yakıtlarında üstün koruma
• Motor korozyonuna karşı en güçlü kalkan
• Ağır hizmet gaz motoru koşulları için optimize edilmiş

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Cummins
Waukesha`,
  },
  "pegasus-705": {
    name: "Mobil Pegasus 705", grade: "SAE 40", series: "Mobil Pegasus 700", type: "Gaz Motor Yağı (Mineral)",
    api: "API CF", acea: "ISO-L-EGD",
    approvals: ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
    description: "Dört zamanlı stasyoner doğal gaz motorları için güncellenmiş formülasyonlu mineral gaz motor yağı. Gelişmiş katık teknolojisiyle motor temizliği ve korozyon koruması sağlar.",
    features: ["Güncellenmiş gaz motor formülü", "Gelişmiş motor temizliği", "Korozyon koruması", "Mineral ekonomik yağ"],
    image: "/images/products/mobil/pegasus-705.jpg",
    fullDescription: `700 serisi güncellenmiş formülasyonuyla dört zamanlı stasyoner gaz motorları için geliştirilmiş mineral gaz motor yağı.

Gelişmiş katık paketi sayesinde önceki jenerasyona kıyasla daha iyi motor temizliği ve korozyon koruması sağlar.

PERFORMANS ÖZELLİKLERİ
• Gelişmiş katık teknolojisiyle üstün motor temizliği
• Güçlendirilmiş korozyon ve aşınma koruması
• Doğal gaz motorlarına özel optimizasyon
• Güvenilir mineral motor yağı performansı

STANDARTLAR VE SPESİFİKASYONLAR
API CF
ISO-L-EGD
GE Jenbacher
Caterpillar
Cummins
Waukesha`,
  },
};

// ── CASTROL ───────────────────────────────────────────────────────────────

const CASTROL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "edge-0w-20": {
    name: "Castrol EDGE 0W-20", grade: "0W-20", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Ford WSS-M2C948-B", "Honda HTO-06"],
    description: "Castrol'ün en gelişmiş tam sentetik motor yağı. Titanium FST teknolojisiyle donatılmış olan EDGE 0W-20, motor parçaları arasındaki filmi güçlendirerek aşınmaya karşı üstün koruma sağlar.",
    features: ["Titanium FST teknolojisi", "Maksimum motor performansı", "Yakıt ekonomisi optimizasyonu", "Soğuk başlangıç koruması"],
  },
  "edge-0w-30": {
    name: "Castrol EDGE 0W-30", grade: "0W-30", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["BMW LL-04", "MB 229.31"],
    description: "BMW ve Mercedes-Benz onaylı tam sentetik motor yağı. Düşük sürtünmeli formülasyonuyla yakıt tasarrufu sağlarken üstün motor koruması sunar.",
    features: ["BMW LL-04 onaylı", "MB 229.31 onaylı", "Düşük sürtünme teknolojisi", "Uzun servis aralıkları"],
  },
  "edge-5w-30": {
    name: "Castrol EDGE 5W-30", grade: "5W-30", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["BMW LL-01", "MB 229.5", "VW 502 00/505 00"],
    description: "En çok tercih edilen Castrol EDGE viskozitesi. BMW, Mercedes-Benz ve Volkswagen onaylarıyla geniş bir araç yelpazesinde eksiksiz koruma sağlayan tam sentetik formül.",
    features: ["Üç büyük OEM onaylı", "Titanium FST teknolojisi", "Yüksek basınç koruması", "Motor temizleyici özellik"],
  },
  "edge-5w-40": {
    name: "Castrol EDGE 5W-40", grade: "5W-40", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.5", "VW 502 00/505 01", "Porsche A40"],
    description: "Yüksek performanslı araçlar için ideal tam sentetik motor yağı. MB, VW ve Porsche onaylarıyla aşırı koşullarda bile maksimum motor koruması sunar.",
    features: ["Porsche A40 onaylı", "Yüksek sıcaklık direnci", "Turbo koruma", "Sürüklenme karşıtı teknoloji"],
  },
  "edge-0w-40": {
    name: "Castrol EDGE 0W-40", grade: "0W-40", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.5", "Porsche A40", "VW 502 00"],
    description: "Aşırı sıcaklık farklılıklarında performans gerektiren araçlar için geliştirilmiş. Soğuk başlangıçta hızlı akış ile yüksek sıcakta film stabilitesini bir arada sunar.",
    features: ["Geniş sıcaklık aralığı", "Hızlı pompalanabilirlik", "Yüksek ısı stabilitesi", "Premium tam sentetik"],
  },
  "edge-10w-60": {
    name: "Castrol EDGE 10W-60", grade: "10W-60", series: "EDGE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["BMW M", "Porsche A40"],
    description: "BMW M ve Porsche yüksek performanslı motorlar için özel olarak geliştirilmiş ağır viskoziteli tam sentetik yağ. Yarış pistinden günlük kullanıma kadar zorlu koşullarda maksimum koruma.",
    features: ["BMW M serisi onaylı", "Yüksek viskozite stabilitesi", "Yarış seviyesi koruma", "Aşınma karşıtı teknoloji"],
  },
  "magnatec-5w-30": {
    name: "Castrol Magnatec 5W-30", grade: "5W-30", series: "Magnatec", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-D", "Renault RN0700"],
    description: "Castrol Magnatec'in akıllı molekülleri motorun kritik parçalarına yapışarak soğuk çalışma koşullarında bile sürekli koruma sağlar. Ford ve Renault onaylı formül.",
    features: ["Akıllı molekül teknolojisi", "Sürekli motor koruması", "Soğuk çalışma koruması", "Ford ve Renault onaylı"],
  },
  "magnatec-5w-40": {
    name: "Castrol Magnatec 5W-40", grade: "5W-40", series: "Magnatec", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Volkswagen ve Renault onaylı Magnatec formülü. Akıllı moleküller motorun en hassas bölgelerine tutunarak marş anından itibaren tam koruma sağlar.",
    features: ["VW ve Renault onaylı", "Marş anından itibaren koruma", "Akıllı moleküller", "Geniş araç uyumluluğu"],
  },
  "magnatec-10w-40": {
    name: "Castrol Magnatec 10W-40", grade: "10W-40", series: "Magnatec", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B4",
    approvals: ["VW 501 01/505 00", "MB 229.1", "Renault RN0700"],
    description: "Yarı sentetik Magnatec formülü ile güvenilir günlük motor koruması. Hem eski hem de yeni araçlarda üstün performans sunan ekonomik çözüm.",
    features: ["Yarı sentetik güvenilirlik", "Günlük sürüş koruması", "Geniş araç uyumluluğu", "Ekonomik seçenek"],
  },
  "gtx-15w-40": {
    name: "Castrol GTX 15W-40", grade: "15W-40", series: "GTX", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1", "VW 501 01/505 00"],
    description: "Castrol'ün efsanevi GTX serisi. Çamur karşıtı teknolojisiyle motoru çamurun 5 kat daha fazla birikimine karşı korur. Hem benzinli hem dizel motorlar için güvenilir seçim.",
    features: ["Çamur karşıtı teknoloji", "Mineral güvenilirlik", "Benzinli ve dizel uyumlu", "Uzun motor ömrü"],
  },
  "gtx-20w-50": {
    name: "Castrol GTX 20W-50", grade: "20W-50", series: "GTX", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1", "VW 501 01"],
    description: "Sıcak iklimlerde ve yüksek kilometre araçlarda üstün koruma sağlayan klasik mineral motor yağı. Yüksek viskozitesiyle geniş boşluklarda koruyucu film oluşturur.",
    features: ["Sıcak iklim optimizasyonu", "Yüksek km araç uyumlu", "Güvenilir mineral formül", "Ekonomik seçenek"],
  },
  "vecton-15w-40": {
    name: "Castrol Vecton 15W-40", grade: "15W-40", series: "Vecton", type: "Mineral Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "Cummins CES 20078", "MB 228.3"],
    description: "Ağır hizmet dizel motorları için geliştirilmiş Vecton serisi. System Pro Technology ile yağın özelliklerini uzun süre boyunca sabit tutar.",
    features: ["System Pro Technology", "Uzun servis aralıkları", "Volvo ve Cummins onaylı", "Ağır hizmet koruması"],
  },
  "vecton-long-drain-10w-40": {
    name: "Castrol Vecton Long Drain 10W-40", grade: "10W-40", series: "Vecton Long Drain", type: "Yarı Sentetik Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "MB 228.3", "Renault VI RLD-2"],
    description: "Uzun yağ değişim aralıkları için tasarlanmış yarı sentetik ağır hizmet yağı. Filtreler üzerindeki baskıyı azaltır ve aşınma korumayı maksimumda tutar.",
    features: ["Uzun değişim aralığı", "Filtre uyumlu formül", "Yarı sentetik dayanıklılık", "Düşük kül içeriği"],
  },
};

const CASTROL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "hyspin-aws-32": {
    name: "Castrol Hyspin AWS 32", grade: "ISO VG 32", series: "Hyspin AWS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Vickers I-286-S"],
    description: "Geniş endüstriyel ve mobil hidrolik sistemler için yüksek kaliteli mineral bazlı hidrolik yağ. Üstün oksidatif ve termal stabilite ile uzun sistem ömrü sağlar.",
    features: ["Üstün oksidatif stabilite", "Yüksek su ayrışma kabiliyeti", "Pas ve korozyon koruması", "Pompa uyumluluğu onaylı"],
  },
  "hyspin-aws-46": {
    name: "Castrol Hyspin AWS 46", grade: "ISO VG 46", series: "Hyspin AWS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Endüstride en yaygın kullanılan viskozite sınıfında hidrolik yağ. Yüksek performanslı hidrolik sistemlerde güvenilir ve uzun ömürlü çalışma için optimize edilmiştir.",
    features: ["En yaygın hidrolik viskozite", "Uzun sistem ömrü", "Çok sayıda OEM onayı", "Enerji verimliliği"],
  },
  "hyspin-aws-68": {
    name: "Castrol Hyspin AWS 68", grade: "ISO VG 68", series: "Hyspin AWS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-2"],
    description: "Yüksek yük ve sıcaklık koşullarındaki hidrolik sistemler için formüle edilmiş. Ağır endüstriyel uygulamalarda uzun servis ömrü ve güvenilir koruma sunar.",
    features: ["Yüksek yük kapasitesi", "Termal stabilite", "Viskozite kararlılığı", "Aşınma koruması"],
  },
  "hyspin-aws-100": {
    name: "Castrol Hyspin AWS 100", grade: "ISO VG 100", series: "Hyspin AWS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220"],
    description: "Yavaş çalışan veya yüksek basınçlı hidrolik sistemler için ağır viskoziteli hidrolik yağ. Özellikle yüksek ortam sıcaklıklarında çalışan sistemler için uygundur.",
    features: ["Ağır viskozite stabilitesi", "Yüksek basınç kapasitesi", "Sıcak ortam performansı", "Uzun ömürlü formül"],
  },
  "optigear-bm-100": {
    name: "Castrol Optigear BM 100", grade: "ISO VG 100", series: "Optigear BM", type: "Dişli Yağı",
    api: "ISO 12925-1 CKB", acea: "DIN 51517-2 CL",
    approvals: ["Siemens AG", "Flender Helical/Bevel", "SEW-Eurodrive"],
    description: "Endüstriyel açık ve kapalı dişli kutuları için mineral bazlı dişli yağı. Rust-Blocker teknolojisiyle üstün pas koruması ve uzun dişli ömrü sağlar.",
    features: ["Rust-Blocker teknolojisi", "Siemens ve SEW onaylı", "Üstün aşınma koruması", "Yüksek yük kapasitesi"],
  },
  "optigear-bm-220": {
    name: "Castrol Optigear BM 220", grade: "ISO VG 220", series: "Optigear BM", type: "Dişli Yağı",
    api: "ISO 12925-1 CKB", acea: "DIN 51517-2 CL",
    approvals: ["Siemens AG", "Flender Helical/Bevel/Planetary", "SEW-Eurodrive"],
    description: "Yüksek torklı ve ağır yük altındaki dişli kutuları için ISO VG 220 mineral dişli yağı. Endüstriyel redüktörler ve tahrik sistemlerinde güvenilir performans sunar.",
    features: ["Ağır yük kapasitesi", "Endüstriyel redüktör onaylı", "Uzun yağ değişim aralığı", "Köpük karşıtı formül"],
  },
  "tribol-1100-220": {
    name: "Castrol Tribol 1100/220", grade: "ISO VG 220", series: "Tribol 1100", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "Flender", "Renk Renfrew", "Sumitomo"],
    description: "Yüksek EP (Extreme Pressure) katkılı endüstriyel dişli yağı. Ağır darbe yükleri ve yüksek tork koşullarında dişlileri ve yatakları üstün koruma altına alır.",
    features: ["Yüksek EP kapasitesi", "Darbe yükü koruması", "Çok sayıda OEM onayı", "Uzun dişli ömrü"],
  },
  "aircol-sn-46": {
    name: "Castrol Aircol SN 46", grade: "ISO VG 46", series: "Aircol SN", type: "Kompresör Yağı",
    api: "ISO 6743-3A DAA", acea: "DIN 51506 VBL",
    approvals: ["Atlas Copco", "Ingersoll Rand", "Gardner Denver"],
    description: "Pistonlu hava kompresörleri için geliştirilmiş mineral bazlı kompresör yağı. Yüksek yanma noktası ve düşük karbon birikimiyle güvenli çalışma sağlar.",
    features: ["Yüksek yanma noktası", "Düşük karbon birikimi", "Atlas Copco onaylı", "Uzun kompresör ömrü"],
  },
  "molub-alloy-860-220-2-el": {
    name: "Castrol Molub-Alloy 860/220-2 EL", grade: "NLGI 2", series: "Molub-Alloy 860", type: "Gres EP",
    api: "NLGI 2", acea: "DIN 51502 KP2K-40",
    approvals: ["FAG", "SKF LGEP 2", "NSK"],
    description: "Yüksek EP katkılı lityum kompleks tabanlı gres yağı. Ağır yük, yüksek hız ve geniş sıcaklık aralığı gerektiren endüstriyel rulmanlar ve kaymalı yataklar için idealdir.",
    features: ["Lityum kompleks formül", "Yüksek EP katkısı", "Geniş sıcaklık aralığı (-20°C/+150°C)", "SKF ve FAG onaylı"],
  },
};

// ── TOTAL / ELF ───────────────────────────────────────────────────────────

const TOTAL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "quartz-9000-energy-5w-30": {
    name: "Total Quartz 9000 Energy 5W-30", grade: "5W-30", series: "Quartz 9000 Energy", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["BMW LL-01", "MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Total'ün en prestijli tam sentetik motor yağı serisi. Gelişmiş katkı teknolojisiyle maksimum motor koruması ve üstün temizlik özelliği sunar.",
    features: ["BMW LL-01 onaylı", "MB 229.3 onaylı", "Maksimum motor koruması", "Üstün temizlik teknolojisi"],
  },
  "quartz-9000-energy-5w-40": {
    name: "Total Quartz 9000 Energy 5W-40", grade: "5W-40", series: "Quartz 9000 Energy", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Porsche A40"],
    description: "Yüksek performanslı araçlar için geliştirilmiş tam sentetik motor yağı. Geniş sıcaklık aralığında üstün viskozite stabilitesi ve aşınma koruması sağlar.",
    features: ["Porsche A40 onaylı", "Geniş sıcaklık stabilitesi", "Turbo motor koruması", "Uzun servis ömrü"],
  },
  "quartz-9000-energy-0w-40": {
    name: "Total Quartz 9000 Energy 0W-40", grade: "0W-40", series: "Quartz 9000 Energy", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Soğuk başlangıç performansını ön plana çıkaran 0W-40 tam sentetik formül. Geniş sıcaklık aralığında üstün motor koruması ve yakıt verimliliği sunar.",
    features: ["Hızlı soğuk başlangıç", "MB 229.5 onaylı", "Yüksek ısı dayanımı", "Tam sentetik güvenilirlik"],
  },
  "quartz-9000-future-nfc-5w-30": {
    name: "Total Quartz 9000 Future NFC 5W-30", grade: "5W-30", series: "Quartz 9000 Future NFC", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00"],
    description: "NFC (Nano Friction Control) teknolojisiyle donatılmış DPF uyumlu tam sentetik motor yağı. BMW, MB ve VW'nin modern emisyon kontrol sistemleri için özel olarak onaylanmıştır.",
    features: ["NFC nano teknolojisi", "DPF/GPF uyumlu", "BMW LL-04 onaylı", "Düşük SAPS formülü"],
  },
  "quartz-9000-future-ecob-5w-20": {
    name: "Total Quartz 9000 Future EcoB 5W-20", grade: "5W-20", series: "Quartz 9000 Future EcoB", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Ford WSS-M2C948-B", "Jaguar Land Rover STJLR.03.5003"],
    description: "Ford ve Jaguar Land Rover için özel olarak onaylanmış düşük viskoziteli tam sentetik motor yağı. EcoBoost motorlarında yakıt tasarrufunu maksimize eder.",
    features: ["Ford EcoBoost uyumlu", "JLR onaylı", "Maksimum yakıt ekonomisi", "Düşük viskozite direnci"],
  },
  "quartz-ineo-ecs-5w-30": {
    name: "Total Quartz INEO ECS 5W-30", grade: "5W-30", series: "Quartz INEO ECS", type: "Tam Sentetik",
    api: "SN/CF", acea: "C2",
    approvals: ["PSA Peugeot Citroën B71 2290", "Fiat 9.55535-S1"],
    description: "PSA ve Fiat emisyon kontrol sistemleri için özel olarak geliştirilmiş INEO serisi. FAP filtresi ve katalitik konvertör ömrünü uzatmak için optimize edilmiş formül.",
    features: ["PSA FAP uyumlu", "Fiat onaylı", "Katalitik konvertör koruması", "ACEA C2 sertifikalı"],
  },
  "quartz-7000-10w-40": {
    name: "Total Quartz 7000 10W-40", grade: "10W-40", series: "Quartz 7000", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B4",
    approvals: ["MB 229.1", "VW 501 01/505 00", "Renault RN0700"],
    description: "Yarı sentetik teknolojisiyle günlük sürüş için güvenilir motor koruması sunan Quartz 7000 serisi. Geniş araç uyumluluğuyla popüler bir tercih olan formül.",
    features: ["Yarı sentetik güvenilirlik", "Geniş araç uyumluluğu", "Günlük sürüş optimizasyonu", "Ekonomik seçenek"],
  },
  "quartz-5000-15w-40": {
    name: "Total Quartz 5000 15W-40", grade: "15W-40", series: "Quartz 5000", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1", "VW 501 01/505 00"],
    description: "Hem benzinli hem de dizel motorlar için uygun, mineral bazlı çok amaçlı motor yağı. Güvenilir ve ekonomik günlük sürüş koruması sağlar.",
    features: ["Mineral güvenilirlik", "Benzinli ve dizel uyumlu", "Ekonomik günlük koruma", "Geniş motor uyumluluğu"],
  },
  "rubia-tir-8600-15w-40": {
    name: "Total Rubia TIR 8600 15W-40", grade: "15W-40", series: "Rubia TIR 8600", type: "Mineral Ağır Hizmet",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "MB 228.3", "Cummins CES 20078", "MAN M 3275-1"],
    description: "Uzun mesafe ticari araçlar için geliştirilmiş mineral bazlı ağır hizmet dizel motor yağı. Volvo, Cummins ve MAN onaylı formülle uzun servis aralıklarında güvenilir koruma.",
    features: ["Volvo VDS-3 onaylı", "Cummins ve MAN onaylı", "Uzun servis aralığı", "Ticari araç optimizasyonu"],
  },
  "rubia-tir-9200-5w-30": {
    name: "Total Rubia TIR 9200 5W-30", grade: "5W-30", series: "Rubia TIR 9200", type: "Tam Sentetik Ağır Hizmet",
    api: "CK-4/SN", acea: "E6/E9",
    approvals: ["Volvo VDS-4.5", "MB 228.51", "Renault VI RLD-3", "Mack EO-O Premium Plus"],
    description: "En son nesil ağır hizmet dizel motorları için formüle edilmiş tam sentetik motor yağı. Euro VI emisyon standartlarını karşılayan araçlarda maksimum koruma ve yakıt ekonomisi.",
    features: ["Euro VI uyumlu", "Volvo VDS-4.5 onaylı", "Tam sentetik ağır hizmet", "Düşük yakıt tüketimi"],
  },
  "evolution-900-sxr-5w-30": {
    name: "Elf Evolution 900 SXR 5W-30", grade: "5W-30", series: "Evolution 900 SXR", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Renault RN0700/RN0710", "Ford WSS-M2C913-D"],
    description: "Elf'in üst segment tam sentetik motor yağı. SXR teknolojisiyle donatılmış formül, özellikle Renault ve Ford araçlarında maksimum yakıt tasarrufu ve motor koruması sunar.",
    features: ["SXR teknolojisi", "Renault OEM onaylı", "Ford onaylı", "Yakıt tasarrufu optimizasyonu"],
  },
  "evolution-900-ft-5w-40": {
    name: "Elf Evolution 900 FT 5W-40", grade: "5W-40", series: "Evolution 900 FT", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Full Technology (FT) formülasyonuyla benzinli ve dizel motorlara eşit koruma sağlayan tam sentetik motor yağı. Geniş OEM onaylarıyla çok amaçlı kullanım için idealdir.",
    features: ["Full Technology formülü", "Benzinli ve dizel uyumlu", "Çoklu OEM onayı", "Yüksek sıcaklık stabilitesi"],
  },
};

const TOTAL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "azolla-zs-32": {
    name: "Total Azolla ZS 32", grade: "ISO VG 32", series: "Azolla ZS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Vickers I-286-S"],
    description: "Yüksek performanslı zinç içerikli hidrolik yağ. Üstün aşınma koruması, oksidatif stabilite ve yüksek su ayrışma kabiliyetiyle geniş endüstriyel uygulama alanına sahiptir.",
    features: ["Yüksek su ayrışması", "Üstün aşınma koruması", "Çok sayıda pompa onayı", "Uzun sistem ömrü"],
  },
  "azolla-zs-46": {
    name: "Total Azolla ZS 46", grade: "ISO VG 46", series: "Azolla ZS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Endüstriyel ve mobil hidrolik sistemlerde en yaygın kullanılan viskozite sınıfında yüksek kaliteli hidrolik yağ. Güvenilir ve uzun ömürlü performans sunar.",
    features: ["En yaygın hidrolik viskozite", "Yüksek termal stabilite", "Su ve pas direnci", "Pompa uyumluluğu"],
  },
  "azolla-zs-68": {
    name: "Total Azolla ZS 68", grade: "ISO VG 68", series: "Azolla ZS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-2"],
    description: "Yüksek sıcaklık ve ağır yük koşullarındaki hidrolik sistemler için formüle edilmiş. Termal açıdan zorlu ortamlarda viskozite stabilitesini korur.",
    features: ["Yüksek sıcaklık dayanımı", "Ağır yük kapasitesi", "Termal stabilite", "Uzun değişim aralığı"],
  },
  "azolla-zs-100": {
    name: "Total Azolla ZS 100", grade: "ISO VG 100", series: "Azolla ZS", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220"],
    description: "Yavaş çalışan veya yüksek basınçlı hidrolik sistemler için ağır viskoziteli hidrolik yağ. Sıcak ortam ve yüksek basınç koşullarında güvenilir performans sunar.",
    features: ["Ağır viskozite stabilitesi", "Yüksek basınç kapasitesi", "Sıcak ortam uyumlu", "Uzun ömürlü formül"],
  },
  "carter-ep-220": {
    name: "Total Carter EP 220", grade: "ISO VG 220", series: "Carter EP", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "Flender", "SEW-Eurodrive", "David Brown S1.53.101"],
    description: "Yüksek EP katkılı endüstriyel dişli yağı. Ağır yük ve darbe yükü koşullarında dişlileri ve yatakları koruyarak uzun dişli kutusu ömrü sağlar.",
    features: ["Yüksek EP kapasitesi", "David Brown onaylı", "Darbe yükü koruması", "Uzun dişli ömrü"],
  },
  "carter-ep-320": {
    name: "Total Carter EP 320", grade: "ISO VG 320", series: "Carter EP", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "Flender", "SEW-Eurodrive"],
    description: "Yüksek viskoziteli EP dişli yağı. Düşük hızlı yüksek torklı uygulamalarda ve açık dişlilerde güvenilir yağlama ve koruma sağlar.",
    features: ["Yüksek viskozite stabilitesi", "Düşük hız/yüksek tork uyumlu", "Çok sayıda OEM onayı", "Aşınma ve korozyon koruması"],
  },
  "planetelf-acd-46": {
    name: "Total Planetelf ACD 46", grade: "ISO VG 46", series: "Planetelf ACD", type: "Kompresör Yağı Sentetik",
    api: "ISO 6743-3A DAA", acea: "DIN 51506 VCL",
    approvals: ["Atlas Copco", "Ingersoll Rand", "Sullair", "Quincy"],
    description: "Vidalı ve dönüşlü hava kompresörleri için geliştirilmiş tam sentetik (alkylbenzene) kompresör yağı. Uzun servis aralıkları ve düşük karbon birikimi sunar.",
    features: ["Tam sentetik alkylbenzene", "8000 saat servis ömrü", "Düşük karbon birikimi", "Atlas Copco onaylı"],
  },
  "multis-ep-2": {
    name: "Total Multis EP 2", grade: "NLGI 2", series: "Multis EP", type: "Gres EP",
    api: "NLGI 2", acea: "DIN 51502 KP2K-30",
    approvals: ["SKF LGEP 2", "FAG Arcanol MULTI2", "NSK"],
    description: "Lityum kompleks kıvamlaştırıcılı çok amaçlı EP gres yağı. Yüksek yük, yüksek sıcaklık ve su koşullarına dayanıklı formülüyle geniş endüstriyel uygulama alanına sahip.",
    features: ["Çok amaçlı gres", "Yüksek EP kapasitesi", "Su dayanımı", "SKF ve FAG onaylı"],
  },
  "biohydran-tmp-46": {
    name: "Total Biohydran TMP 46", grade: "ISO VG 46", series: "Biohydran TMP", type: "Biyolojik Parçalanabilir Hidrolik Yağ",
    api: "ISO 15380 HETG/HEES", acea: "VDMA 24568",
    approvals: ["Swedish Standard SS 15 54 34", "Blue Angel RAL UZ 178"],
    description: "Çevre dostu uygulamalar için TMP ester bazlı biyolojik parçalanabilir hidrolik yağ. Nehir yakını, orman ve deniz uygulamalarında tercih edilen ekolojik formül.",
    features: ["Biyolojik parçalanabilir", "Ekolojik sertifikalı", "TMP ester bazlı", "Çevre dostu uygulama"],
  },
};

// ── MOTUL ─────────────────────────────────────────────────────────────────

const MOTUL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "8100-x-cleanplus-5w-30": {
    name: "Motul 8100 X-clean+ 5W-30", grade: "5W-30", series: "8100 X-clean+", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00", "Porsche C30"],
    description: "Yüksek performanslı Low SAPS tam sentetik motor yağı. BMW, MB, VW ve Porsche onaylı formülüyle DPF/GPF filtreli modern motorlarda maksimum koruma ve uzun servis aralığı sunar.",
    features: ["BMW LL-04 onaylı", "VW 504/507 onaylı", "DPF ve GPF uyumlu", "Düşük SAPS formülü"],
  },
  "8100-x-cess-gen2-5w-40": {
    name: "Motul 8100 X-cess Gen2 5W-40", grade: "5W-40", series: "8100 X-cess Gen2", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710", "Porsche A40"],
    description: "İkinci nesil formülasyonuyla güncellenen X-cess serisi. Benzinli ve dizel motorda eşit üstünlük sağlayan tam sentetik yağ, modern turbo motorlarda maksimum koruma sunar.",
    features: ["İkinci nesil formül", "Turbo motor koruması", "Çok sayıda OEM onayı", "Geniş araç uyumluluğu"],
  },
  "8100-eco-nergy-0w-30": {
    name: "Motul 8100 Eco-nergy 0W-30", grade: "0W-30", series: "8100 Eco-nergy", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-D", "Renault RN0700/RN0710"],
    description: "Yakıt ekonomisini ön plana çıkaran düşük viskoziteli tam sentetik motor yağı. Ford ve Renault onaylı Eco-nergy serisi, ACEA A5/B5 standardıyla çevre dostu sürüş sağlar.",
    features: ["Yakıt ekonomisi odaklı", "Ford ve Renault onaylı", "ACEA A5/B5 sertifikalı", "Düşük emisyon formülü"],
  },
  "8100-eco-lite-0w-20": {
    name: "Motul 8100 Eco-lite 0W-20", grade: "0W-20", series: "8100 Eco-lite", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Honda HTO-06", "Mitsubishi Diamond SP"],
    description: "Japon ve Asya kökenli araçlar için optimize edilmiş ultra düşük viskoziteli tam sentetik motor yağı. Mükemmel soğuk çalışma özellikleriyle Honda ve Mitsubishi araçlarında maksimum yakıt ekonomisi sağlar.",
    features: ["Honda ve Mitsubishi onaylı", "Ultra düşük viskozite", "Soğuk çalışma optimizasyonu", "Asya araç uyumlu"],
  },
  "300v-competition-5w-40": {
    name: "Motul 300V Competition 5W-40", grade: "5W-40", series: "300V Competition", type: "Tam Sentetik Yarış",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["FIA onaylı"],
    description: "Motul'ün efsanevi 300V serisi. Ester Core teknolojisiyle üretilmiş motor sporları yağı, pist ve yüksek performanslı araçlarda en zorlu koşullarda bile üstün motor koruması ve maksimum güç çıkışı sağlar.",
    features: ["Ester Core teknolojisi", "Yarış pisti koruması", "Maksimum güç çıkışı", "FIA onaylı formül"],
  },
  "300v-high-rpm-0w-20": {
    name: "Motul 300V High RPM 0W-20", grade: "0W-20", series: "300V High RPM", type: "Tam Sentetik Yarış",
    api: "SN/CF", acea: "A1/B1",
    approvals: [],
    description: "Yüksek devirli yarış motorları için geliştirilmiş ultra düşük viskoziteli 300V serisi. Ester Core teknolojisiyle aşırı yüksek RPM koşullarında dahi yağlama filmini korur.",
    features: ["Yüksek RPM optimizasyonu", "Ester Core teknolojisi", "Yarış seviyesi koruma", "Ultra düşük sürtünme"],
  },
  "300v-le-mans-20w-60": {
    name: "Motul 300V Le Mans 20W-60", grade: "20W-60", series: "300V Le Mans", type: "Tam Sentetik Yarış",
    api: "SN/CF", acea: "A3/B4",
    approvals: [],
    description: "Le Mans 24 Saat yarışı gibi uzun süreli yüksek yük koşulları için geliştirilmiş ağır viskoziteli yarış yağı. Ester Core teknolojisiyle uzun maraton yarışlarında bile motor korumasını sürdürür.",
    features: ["Le Mans yarış formülü", "Uzun süreli yük dayanımı", "Ester Core teknolojisi", "Yüksek viskozite stabilitesi"],
  },
  "specific-bmw-ll-04-5w-30": {
    name: "Motul Specific BMW LL-04 5W-30", grade: "5W-30", series: "Specific BMW LL-04", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00"],
    description: "BMW araçları için özel olarak geliştirilmiş Low SAPS tam sentetik motor yağı. BMW Longlife-04 standardını tam olarak karşılayan formül, modern BMW motorlarının uzun ömürlü çalışmasını garanti eder.",
    features: ["BMW LL-04 OEM onaylı", "Özel BMW formülü", "DPF uyumlu", "Uzun servis aralığı"],
  },
  "specific-vw-50800-0w-20": {
    name: "Motul Specific VW 508.00 0W-20", grade: "0W-20", series: "Specific VW 508.00", type: "Tam Sentetik",
    api: "SN/CF", acea: "C5",
    approvals: ["VW 508 00", "VW 509 00"],
    description: "Volkswagen Grubu'nun en yeni 508.00/509.00 spesifikasyonları için özel olarak geliştirilmiş ultra düşük viskoziteli tam sentetik motor yağı. En yeni VW, Audi, Skoda ve SEAT araçlarında zorunlu kılan standarttır.",
    features: ["VW 508.00 OEM onaylı", "VW 509.00 onaylı", "Ultra düşük viskozite", "Audi/Skoda/SEAT uyumlu"],
  },
  "truck-and-bus-15w-40": {
    name: "Motul Truck and Bus 15W-40", grade: "15W-40", series: "Truck and Bus", type: "Mineral Ağır Hizmet",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "MB 228.3", "MAN M 3275-1", "Renault VI RLD-2"],
    description: "Ticari araçlar ve otobüsler için geliştirilmiş mineral bazlı ağır hizmet motor yağı. Uzun rota şartlarında Volvo, MB ve MAN motorlarını güvenilir şekilde korur.",
    features: ["Ağır ticari araç onaylı", "Volvo VDS-3 onaylı", "Uzun mesafe optimizasyonu", "Çoklu OEM desteği"],
  },
};

const MOTUL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "gear-300-ls-75w-90": {
    name: "Motul Gear 300 LS 75W-90", grade: "75W-90", series: "Gear 300 LS", type: "Şanzıman/Diferansiyel Yağı",
    api: "API GL-5 LS", acea: "MT-1",
    approvals: ["Limited Slip Differential", "ZF TE-ML 05C/12C/16C"],
    description: "Limited Slip Diferansiyel (LS/LSD) uyumlu tam sentetik şanzıman ve diferansiyel yağı. Özel sürtünme modifiye edici katkısıyla LSD titremesini ve gıcırtısını önler.",
    features: ["Limited Slip uyumlu", "LSD titreme önleyici", "ZF onaylı", "Tam sentetik güvenilirlik"],
  },
  "gear-300-75w-90": {
    name: "Motul Gear 300 75W-90", grade: "75W-90", series: "Gear 300", type: "Şanzıman/Diferansiyel Yağı",
    api: "API GL-5", acea: "MT-1",
    approvals: ["ZF TE-ML 02C/05C/12C/16C/17C", "MAN 341 Z-4"],
    description: "Yüksek performanslı araçların manuel şanzıman ve diferansiyellerinde üstün koruma sağlayan tam sentetik yağ. ZF ve MAN onaylı formülüyle uzun servis ömrü sunar.",
    features: ["ZF multi-onaylı", "Tam sentetik şanzıman yağı", "Düşük sürtünme katkısı", "Uzun dişli ömrü"],
  },
  "atf-vi": {
    name: "Motul ATF VI", grade: "ATF VI", series: "ATF VI", type: "Otomatik Şanzıman Yağı",
    api: "GM Dexron VI", acea: "JASO-1A",
    approvals: ["GM Dexron VI", "Ford Mercon LV", "ZF TE-ML 14D/16L", "Toyota WS"],
    description: "En geniş uyumluluk aralığına sahip tam sentetik otomatik şanzıman yağı. GM, Ford, ZF ve Toyota onaylı evrensel formülü, eski ve yeni otomatik şanzımanlarda güvenilir çalışma sağlar.",
    features: ["GM Dexron VI onaylı", "Ford Mercon LV onaylı", "Toyota WS uyumlu", "Evrensel uyumluluk"],
  },
  "multi-dctf": {
    name: "Motul Multi DCTF", grade: "DCTF", series: "Multi DCTF", type: "Çift Kavramalı Şanzıman Yağı",
    api: "DCTF", acea: "JASO-1A",
    approvals: ["VW G 052 182", "BMW 83 22 0 402 413", "Ford WSS-M2C200-D2"],
    description: "Kuru ve ıslak tipteki çift kavramalı şanzımanlar (DCT/DSG) için geliştirilmiş özel tam sentetik yağ. VW DSG, BMW ve Ford PowerShift şanzıman uyumlu formül.",
    features: ["DSG/DCT uyumlu", "VW 7/6-vitesli DSG onaylı", "BMW DCT onaylı", "Kuru ve ıslak tip uyumlu"],
  },
  "hydraulic-sus-46": {
    name: "Motul Hydraulic SUS 46", grade: "ISO VG 46", series: "Hydraulic SUS", type: "Tam Sentetik Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2"],
    description: "PAO bazlı tam sentetik hidrolik yağ. Mineral yağlara kıyasla çok daha uzun servis ömrü, daha iyi düşük sıcaklık akışkanlığı ve üstün termal stabilite sunar.",
    features: ["PAO tam sentetik bazlı", "Uzun servis ömrü", "Üstün düşük sıcaklık akışkanlığı", "Yüksek termal stabilite"],
  },
  "hydraulic-sus-68": {
    name: "Motul Hydraulic SUS 68", grade: "ISO VG 68", series: "Hydraulic SUS", type: "Tam Sentetik Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220"],
    description: "Yüksek yük ve sıcaklık koşullarındaki hidrolik sistemler için PAO bazlı tam sentetik hidrolik yağ. Kritik endüstriyel uygulamalarda uzun süre güvenilir performans sağlar.",
    features: ["PAO tam sentetik", "Yüksek sıcaklık dayanımı", "Uzun değişim aralığı", "Enerji tasarrufu"],
  },
  "coolant-ultra-37": {
    name: "Motul Coolant Ultra -37", grade: "-37°C", series: "Coolant Ultra", type: "Motor Soğutma Sıvısı",
    api: "ASTM D3306", acea: "BS 6580",
    approvals: ["VW TL 774-F G12+", "MB 325.3", "BMW GS 94000"],
    description: "OAT (Organic Acid Technology) formüllü uzun ömürlü motor soğutma sıvısı. -37°C'ye kadar donmaya karşı koruma sağlarken radyatör ve soğutma sistemi metal yüzeylerini korozyondan korur.",
    features: ["OAT teknolojisi", "-37°C don koruması", "Uzun ömürlü formül", "Korozyon önleyici"],
  },
  "inugel-g13-ultra": {
    name: "Motul Inugel G13 Ultra", grade: "G13", series: "Inugel G13 Ultra", type: "Motor Soğutma Sıvısı",
    api: "ASTM D3306 G13", acea: "BS 6580",
    approvals: ["VW TL 774-J G13", "Audi/Skoda/SEAT G13 uyumlu"],
    description: "Propilen glikol bazlı G13 soğutma sıvısı. Etilen glikol içermeyen çevre dostu formülü, VW Grubu'nun en yeni G13 standardını karşılayarak modern araçlarda üstün soğutma sistemi koruması sunar.",
    features: ["Propilen glikol bazlı", "Çevre dostu formül", "VW G13 onaylı", "Uzun servis aralığı"],
  },
};

// ── TEXOL ─────────────────────────────────────────────────────────────────

const TEXOL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "multisyn-5w-30": {
    name: "Texol Multisyn 5W-30", grade: "5W-30", series: "Multisyn", type: "Tam Sentetik",
    api: "SM/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-A/B/C/D", "GM-LL-A-025", "GM-LL-B-025"],
    description: "Texol Multisyn serisinin temel tam sentetik motor yağı. Ford ve GM onaylı formülüyle yakıt tasarrufu sağlarken benzinli ve hafif dizel motorlarda üstün koruma sunar.",
    features: ["Tam sentetik formül", "Ford WSS-M2C913-D onaylı", "GM onaylı", "Yakıt ekonomisi optimizasyonu"],
  },
  "multisyn-dpf-5w-30": {
    name: "Texol Multisyn DPF 5W-30", grade: "5W-30", series: "Multisyn DPF", type: "Tam Sentetik",
    api: "SN", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.31", "MB 229.51", "MB 228.51", "VW 504 00/507 00"],
    description: "DPF filtreli modern motorlar için geliştirilmiş Ultra High Performance Low SAPS tam sentetik motor yağı. BMW, Mercedes-Benz ve Volkswagen Group'un en yüksek emisyon kontrol standartlarını karşılar.",
    features: ["BMW LL-04 onaylı", "MB 229.51 onaylı", "VW 504/507 onaylı", "Ultra düşük SAPS formülü"],
  },
  "multisyn-5w-40": {
    name: "Texol Multisyn 5W-40", grade: "5W-40", series: "Multisyn", type: "Tam Sentetik",
    api: "SM/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "GM-LL-B-025"],
    description: "Geniş araç yelpazesi için ultra yüksek performanslı tam sentetik motor yağı. Kesme stabilitesi ile geniş sıcaklık aralığında viskozite koruyarak Mercedes-Benz ve GM onaylı üstün motor koruması sağlar.",
    features: ["Tam sentetik yüksek performans", "MB 229.3 onaylı", "GM onaylı", "Geniş sıcaklık aralığı"],
  },
  "multisyn-10w-40": {
    name: "Texol Multisyn 10W-40", grade: "10W-40", series: "Multisyn", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B4",
    approvals: ["VW 505 00", "MB 229.1"],
    description: "Yüksek performanslı yarı sentetik motor yağı. Volkswagen ve Mercedes-Benz onaylı formülüyle benzinli ve dizel motorlarda güvenilir günlük koruma ile ekonomik kullanım sunar.",
    features: ["Yarı sentetik formül", "VW 505.00 onaylı", "MB 229.1 onaylı", "Geniş motor uyumluluğu"],
  },
  "multisyn-0w-20": {
    name: "Texol Multisyn 0W-20", grade: "0W-20", series: "Multisyn", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Ford WSS-M2C947-A", "Ford WSS-M2C947-B1", "ILSAC GF-5"],
    description: "Süper yüksek performanslı ultra düşük viskoziteli tam sentetik motor yağı. Ford EcoBoost ve modern benzinli motorlarda maksimum yakıt ekonomisi ile üstün soğuk başlangıç koruması sunar.",
    features: ["Ultra düşük viskozite", "Ford WSS-M2C947-B1 onaylı", "ILSAC GF-5 sertifikalı", "Maksimum yakıt ekonomisi"],
  },
  "multisyn-c2-5w-30": {
    name: "Texol Multisyn C2 5W-30", grade: "5W-30", series: "Multisyn C2", type: "Tam Sentetik",
    api: "SM/CF", acea: "C2",
    approvals: ["PSA B71 2290", "Renault RN 0700", "JASO DL-1"],
    description: "PSA ve Renault araçlarının FAP/DPF sistemleri için özel geliştirilmiş Low SAPS tam sentetik motor yağı. ACEA C2 sertifikasyonuyla katalitik konvertör ve partikül filtresi ömrünü uzatır.",
    features: ["PSA B71 2290 onaylı", "Renault RN 0700 onaylı", "ACEA C2 Low SAPS", "FAP/DPF uyumlu"],
  },
  "multisyn-tdx-10w-40": {
    name: "Texol Multisyn TDX 10W-40", grade: "10W-40", series: "Multisyn TDX", type: "Yarı Sentetik Ağır Hizmet",
    api: "CI-4/CH-4", acea: "E7",
    approvals: ["Cummins CES 20071/20078", "MB 228.5", "MAN M 3277", "Volvo VDS-3", "Renault RLD-2", "Scania LDF-2", "Mack EO-M Plus"],
    description: "Ultra yüksek performanslı yarı sentetik ağır hizmet dizel motor yağı. Cummins, Mercedes-Benz, MAN, Volvo ve Scania çok sayıda OEM onayıyla ağır ticari araçlarda uzun servis aralığı sağlar.",
    features: ["Cummins çok onaylı", "Volvo VDS-3 onaylı", "MB 228.5 onaylı", "Geniş OEM uyumluluğu"],
  },
  "multisyn-15w-40-premium": {
    name: "Texol Multisyn 15W-40 Premium", grade: "15W-40", series: "Multisyn Premium", type: "Mineral Ağır Hizmet",
    api: "CJ-4/CI-4 Plus", acea: "E9/E7",
    approvals: ["Caterpillar ECF-3", "Cummins CES 20081", "MB 228.31", "Volvo VDS-3/VDS-4", "Mack EO-O Premium Plus", "Renault RLD-3"],
    description: "TFAS teknolojisiyle formüle edilmiş premium düşük SAPS ağır hizmet motor yağı. Caterpillar, Cummins ve Volvo başta olmak üzere geniş OEM onay portföyüyle en zorlu ticari araç koşullarında üstün koruma sağlar.",
    features: ["CJ-4 en yüksek ağır hizmet standardı", "Caterpillar ECF-3 onaylı", "Volvo VDS-4 onaylı", "TFAS teknolojisi"],
  },
  "multisyn-tdx-5w-30": {
    name: "Texol Multisyn TDX 5W-30", grade: "5W-30", series: "Multisyn TDX", type: "Tam Sentetik Ağır Hizmet",
    api: "CI-4/CH-4", acea: "E7/E6",
    approvals: ["MB 228.51", "MAN M 3271-1/M 3477", "Volvo VDS-3", "Renault RLD-2", "Mack EO-N", "JASO DH-2"],
    description: "Yakıt verimliliği odaklı tam sentetik ağır hizmet motor yağı. Mercedes-Benz, MAN ve Volvo onaylı formülüyle Euro V motorlarda düşük yakıt tüketimi ve uzun servis aralıkları sunar.",
    features: ["Tam sentetik ağır hizmet", "MB 228.51 onaylı", "MAN M 3477 onaylı", "Yakıt ekonomisi odaklı"],
  },
  "multisyn-10w-60": {
    name: "Texol Multisyn 10W-60", grade: "10W-60", series: "Multisyn", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: [],
    description: "Yüksek yük ve aşırı performans koşulları için geliştirilmiş tam sentetik motor yağı. Çok yüksek viskozite indeksiyle sporatif ve yarış motorlarında geniş sıcaklık aralığında maksimum film koruması sağlar.",
    features: ["Yarış seviyesi tam sentetik", "Yüksek viskozite indeksi (178)", "Aşırı yük koruması", "Soğukta hızlı pompalanabilirlik"],
  },
  "multisyn-tdx-5w-30-plus": {
    name: "Texol Multisyn TDX 5W-30 Plus", grade: "5W-30", series: "Multisyn TDX Plus", type: "Tam Sentetik Ağır Hizmet",
    api: "CJ-4/CI-4 Plus", acea: "E9/E7/E6/E4",
    approvals: ["Caterpillar ECF-3", "MB 228.51/228.31", "MAN M 3477/M 3677/M 3271-1/M 3575", "Volvo VDS-3/VDS-4", "Cummins CES 20081", "Scania LDF-4/Low Ash", "Detroit Diesel DDC93K218"],
    description: "Euro VI uyumlu en kapsamlı onay portföyüne sahip tam sentetik ağır hizmet motor yağı. Caterpillar, MAN, Volvo, Scania ve Cummins dahil sektörün en geniş OEM onaylarıyla yeni nesil motorlarda maksimum koruma sağlar.",
    features: ["CJ-4/ACEA E9 en yüksek standart", "Caterpillar ECF-3 onaylı", "Scania LDF-4 onaylı", "Euro VI motor uyumlu"],
  },
};

const TEXOL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "hydraulic-32": {
    name: "Texol Hydraulic 32", grade: "ISO VG 32", series: "Hydraulic", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Vickers I-286-S"],
    description: "Endüstriyel ve mobil hidrolik sistemler için yüksek kaliteli mineral bazlı hidrolik yağ. Düşük viskoziteli formülü, hızlı çalışan ve hassas pompalı sistemlerde üstün performans sağlar.",
    features: ["Üstün aşınma koruması", "Yüksek su ayrışması", "Pas ve korozyon koruması", "Düşük köpük eğilimi"],
  },
  "hydraulic-46": {
    name: "Texol Hydraulic 46", grade: "ISO VG 46", series: "Hydraulic", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Eaton Vickers M-2950-S"],
    description: "Endüstriyel hidrolik sistemlerde en yaygın kullanılan viskozite sınıfında mineral hidrolik yağ. Güvenilir ve uzun ömürlü sistem performansı için optimize edilmiş formül.",
    features: ["En yaygın hidrolik viskozite", "Uzun sistem ömrü", "Termal stabilite", "Pompa uyumluluğu"],
  },
  "hydraulic-68": {
    name: "Texol Hydraulic 68", grade: "ISO VG 68", series: "Hydraulic", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220"],
    description: "Yüksek yük ve sıcaklık koşullarındaki hidrolik sistemler için ağır viskoziteli mineral hidrolik yağ. Endüstriyel ağır hizmet uygulamalarında güvenilir performans sunar.",
    features: ["Yüksek yük kapasitesi", "Termal stabilite", "Aşınma koruması", "Uzun değişim aralığı"],
  },
  "gear-oil-220": {
    name: "Texol Gear Oil 220", grade: "ISO VG 220", series: "Gear Oil", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "David Brown S1.53.101"],
    description: "Endüstriyel dişli kutuları ve redüktörler için EP katkılı mineral dişli yağı. Ağır yük ve darbe koşullarında dişlileri ve yatakları koruyarak uzun dişli ömrü sağlar.",
    features: ["EP katkılı formül", "Darbe yükü koruması", "Endüstriyel redüktör uyumlu", "Uzun dişli ömrü"],
  },
  "gear-oil-320": {
    name: "Texol Gear Oil 320", grade: "ISO VG 320", series: "Gear Oil", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "David Brown S1.53.101"],
    description: "Düşük hızlı yüksek torklı endüstriyel uygulamalar için yüksek viskoziteli EP dişli yağı. Açık dişliler ve ağır tahrik sistemlerinde maksimum koruma sunar.",
    features: ["Yüksek viskozite stabilitesi", "Yüksek tork kapasitesi", "Aşınma ve korozyon koruması", "Uzun servis ömrü"],
  },
  "compressor-46": {
    name: "Texol Compressor 46", grade: "ISO VG 46", series: "Compressor", type: "Kompresör Yağı",
    api: "ISO 6743-3A DAA", acea: "DIN 51506 VBL",
    approvals: ["Atlas Copco", "Ingersoll Rand"],
    description: "Pistonlu ve vidalı hava kompresörleri için mineral bazlı kompresör yağı. Yüksek yanma noktası ve düşük karbon birikimi özellikleriyle kompresör sistemlerinde güvenli ve uzun ömürlü çalışma sağlar.",
    features: ["Yüksek yanma noktası", "Düşük karbon birikimi", "Atlas Copco onaylı", "Uzun kompresör ömrü"],
  },
  "grease-ep-2": {
    name: "Texol Grease EP 2", grade: "NLGI 2", series: "Grease EP", type: "Gres EP",
    api: "NLGI 2", acea: "DIN 51502 KP2K-30",
    approvals: ["SKF LGEP 2", "FAG"],
    description: "Lityum bazlı EP katkılı çok amaçlı gres yağı. Yüksek yük, orta hız ve geniş sıcaklık aralığında endüstriyel rulmanlar, dişliler ve kaymalı yataklar için güvenilir yağlama sağlar.",
    features: ["Lityum bazlı formül", "Yüksek EP kapasitesi", "Su dayanımı", "Çok amaçlı kullanım"],
  },
  "slideway-68": {
    name: "Texol Slideway 68", grade: "ISO VG 68", series: "Slideway", type: "Kızak Yağı",
    api: "ISO 6743-13 G", acea: "DIN 51502 G 68",
    approvals: ["Cincinnati Milacron P-47", "Mazak"],
    description: "CNC tezgahları ve hassas takım tezgahlarının kızak yüzeyleri için özel formüle edilmiş yağ. Yapışma-kayma (stick-slip) titremesini önleyerek hassas işleme kalitesi ve kızak ömrü sağlar.",
    features: ["Yapışma-kayma önleyici", "CNC tezgah uyumlu", "Hassas işleme kalitesi", "Uzun kızak ömrü"],
  },
};

// ── TEXACO ────────────────────────────────────────────────────────────────

const TEXACO_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "havoline-prods-5w-30": {
    name: "Texaco Havoline ProDS 5W-30", grade: "5W-30", series: "Havoline ProDS", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00"],
    description: "Havoline'nin ProDS (Professional Driven Solution) serisi, DPF filtreli modern motorlar için geliştirilmiş Low SAPS tam sentetik motor yağıdır. BMW, MB ve VW onaylı formülüyle uzun servis aralıkları sağlar.",
    features: ["BMW LL-04 onaylı", "DPF/GPF uyumlu", "Low SAPS formülü", "Uzun servis aralığı"],
  },
  "havoline-prods-5w-40": {
    name: "Texaco Havoline ProDS 5W-40", grade: "5W-40", series: "Havoline ProDS", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Porsche A40"],
    description: "Yüksek performanslı benzinli ve dizel motorlar için tam sentetik ProDS motor yağı. Geniş OEM onaylarıyla turbo motorlarda ve spor araçlarda üstün koruma sağlar.",
    features: ["Porsche A40 onaylı", "Turbo motor koruması", "Yüksek sıcaklık stabilitesi", "Çoklu OEM onayı"],
  },
  "havoline-extra-10w-40": {
    name: "Texaco Havoline Extra 10W-40", grade: "10W-40", series: "Havoline Extra", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B4",
    approvals: ["MB 229.1", "VW 501 01/505 00"],
    description: "Günlük sürüş için güvenilir yarı sentetik motor yağı. Havoline Extra serisi, hem benzinli hem dizel motorlarda dengeli koruma ve ekonomik kullanım sunar.",
    features: ["Yarı sentetik teknoloji", "Benzinli ve dizel uyumlu", "Dengeli günlük koruma", "Ekonomik formül"],
  },
  "havoline-motor-oil-20w-50": {
    name: "Texaco Havoline Motor Oil 20W-50", grade: "20W-50", series: "Havoline Motor Oil", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1", "VW 501 01"],
    description: "Sıcak iklimlerde ve yüksek kilometre araçlarda güvenilir koruma sağlayan mineral motor yağı. Geniş viskozite aralığı sayesinde eski motorlarda ve yüksek çalışma sıcaklıklarında yağlama filmini korur.",
    features: ["Sıcak iklim optimizasyonu", "Yüksek km araç uyumlu", "Güçlü viskozite stabilitesi", "Ekonomik seçenek"],
  },
  "havoline-synthetic-5w-30": {
    name: "Texaco Havoline Synthetic 5W-30", grade: "5W-30", series: "Havoline Synthetic", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Geniş araç uyumluluğuyla öne çıkan tam sentetik Havoline motor yağı. Üstün motor temizliği ve aşınma korumasıyla uzun motor ömrü sağlayan güvenilir formül.",
    features: ["Geniş OEM uyumluluğu", "Üstün motor temizliği", "Tam sentetik dayanıklılık", "Soğuk başlangıç koruması"],
  },
  "ursa-premium-tdx-15w-40": {
    name: "Texaco Ursa Premium TDX 15W-40", grade: "15W-40", series: "Ursa Premium TDX", type: "Mineral Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "MB 228.3", "Cummins CES 20078", "MAN M 3275-1", "Renault VI RLD-2"],
    description: "Ağır hizmet ticari araçlar için premium mineral motor yağı. TDX teknolojisiyle formüle edilmiş Ursa serisi, uzun mesafe koşullarında Volvo, Cummins ve MAN motorlarında üstün koruma sağlar.",
    features: ["Volvo VDS-3 onaylı", "Cummins ve MAN onaylı", "TDX teknolojisi", "Uzun servis aralığı"],
  },
  "ursa-super-plus-10w-40": {
    name: "Texaco Ursa Super Plus 10W-40", grade: "10W-40", series: "Ursa Super Plus", type: "Yarı Sentetik Ağır Hizmet",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Volvo VDS-3", "MB 228.3", "MAN M 3275-1"],
    description: "Karma ticari araç filolarında kullanım için ideal yarı sentetik ağır hizmet motor yağı. Geniş OEM onaylarıyla farklı marka motorların tek bir yağla korunmasını mümkün kılar.",
    features: ["Karma filo uyumluluğu", "Yarı sentetik ağır hizmet", "Çok sayıda OEM onayı", "Yakıt tasarrufu"],
  },
  "delo-400-mgx-15w-40": {
    name: "Texaco Delo 400 MGX 15W-40", grade: "15W-40", series: "Delo 400 MGX", type: "Mineral Ağır Hizmet",
    api: "CK-4/SN", acea: "E9",
    approvals: ["Volvo VDS-4.5", "MB 228.31", "Mack EO-O Premium Plus", "Cummins CES 20086"],
    description: "En son nesil CK-4 ağır hizmet standardını karşılayan Delo 400 MGX. Euro VI uyumlu motorlarda DPF ve EGR sistemlerini korurken yakıt ekonomisi sağlar.",
    features: ["CK-4 sertifikalı", "Euro VI uyumlu", "Volvo VDS-4.5 onaylı", "DPF ve EGR koruması"],
  },
  "delo-400-xsp-5w-40": {
    name: "Texaco Delo 400 XSP 5W-40", grade: "5W-40", series: "Delo 400 XSP", type: "Tam Sentetik Ağır Hizmet",
    api: "CK-4/SN", acea: "E6/E9",
    approvals: ["Volvo VDS-4.5", "MB 228.51", "Cummins CES 20086", "Mack EO-O Premium Plus"],
    description: "Tam sentetik Delo 400 XSP, en yüksek performanslı ağır hizmet motorları için formüle edilmiştir. Volvo, MB ve Cummins onaylı formülüyle maksimum motor koruması ve uzun servis aralığı sunar.",
    features: ["Tam sentetik ağır hizmet", "CK-4 sertifikalı", "Volvo ve MB onaylı", "Maksimum servis aralığı"],
  },
  "havoline-0w-20": {
    name: "Texaco Havoline 0W-20", grade: "0W-20", series: "Havoline", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Honda HTO-06", "Chrysler MS-6395", "Ford WSS-M2C948-B"],
    description: "Japon ve Amerikan araçları için optimize edilmiş ultra düşük viskoziteli tam sentetik motor yağı. Soğuk hava başlangıçlarında hızlı yağlama sağlayarak yakıt tüketimini minimuma indirir.",
    features: ["Honda ve Ford onaylı", "Ultra düşük viskozite", "Soğuk başlangıç optimizasyonu", "Maksimum yakıt ekonomisi"],
  },
};

const TEXACO_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "meropa-xl-220": {
    name: "Texaco Meropa XL 220", grade: "ISO VG 220", series: "Meropa XL", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "Flender", "SEW-Eurodrive", "David Brown S1.53.101"],
    description: "Yüksek EP katkılı endüstriyel dişli kutuları ve redüktörler için mineral dişli yağı. XL serisi uzun ömürlü formülüyle dişli sistemi ömrünü ve değişim aralıklarını uzatır.",
    features: ["Uzun ömürlü XL formülü", "Yüksek EP kapasitesi", "Siemens ve SEW onaylı", "Uzun değişim aralığı"],
  },
  "meropa-xl-320": {
    name: "Texaco Meropa XL 320", grade: "ISO VG 320", series: "Meropa XL", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "Flender", "David Brown S1.53.101"],
    description: "Düşük hızlı yüksek torklı endüstriyel uygulamalar için yüksek viskoziteli EP dişli yağı. Ağır yük altında dişli yüzeylerini koruyan XL teknolojisi ile üstün performans.",
    features: ["Yüksek viskozite stabilitesi", "Yüksek tork uyumlu", "Darbe yükü koruması", "Uzun dişli ömrü"],
  },
  "meropa-xl-460": {
    name: "Texaco Meropa XL 460", grade: "ISO VG 460", series: "Meropa XL", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["Siemens AG", "David Brown S1.53.101"],
    description: "Çok ağır yük ve yüksek tork koşullarındaki açık ve kapalı dişli sistemleri için en yüksek viskoziteli Meropa XL. Sıcak ortamlarda ve yavaş çalışan sistemlerde mükemmel yağlama sağlar.",
    features: ["Maksimum viskozite stabilitesi", "Ağır endüstriyel uygulama", "Sıcak ortam uyumlu", "Üstün EP koruması"],
  },
  "rando-hdz-32": {
    name: "Texaco Rando HDZ 32", grade: "ISO VG 32", series: "Rando HDZ", type: "Hidrolik Yağ Yüksek VI",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Vickers I-286-S/M-2950-S"],
    description: "Yüksek Viskozite İndeksli (HVI) Rando HDZ serisi, geniş sıcaklık aralıklarında viskozite stabilitesini koruyarak hem soğuk hem de sıcak ortamlarda üstün hidrolik sistem performansı sağlar.",
    features: ["Yüksek Viskozite İndeksi", "Geniş sıcaklık uyumluluğu", "Çoklu pompa onayı", "Uzun sistem ömrü"],
  },
  "rando-hdz-46": {
    name: "Texaco Rando HDZ 46", grade: "ISO VG 46", series: "Rando HDZ", type: "Hidrolik Yağ Yüksek VI",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-1/HF-2", "Eaton Vickers M-2950-S"],
    description: "Endüstriyel ve mobil hidrolik sistemlerde en yaygın kullanılan viskozite sınıfında yüksek VI'li hidrolik yağ. Mevsimsel sıcaklık değişimlerinde güvenilir sistem performansı sunar.",
    features: ["En yaygın hidrolik viskozite", "Yüksek VI stabilite", "Çok sayıda OEM onayı", "Mevsimsel uyumluluk"],
  },
  "rando-hdz-68": {
    name: "Texaco Rando HDZ 68", grade: "ISO VG 68", series: "Rando HDZ", type: "Hidrolik Yağ Yüksek VI",
    api: "ISO 11158 HV", acea: "DIN 51524-3 HVLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-0/HF-2"],
    description: "Yüksek yük ve sıcaklık koşullarındaki hidrolik sistemler için yüksek VI'li mineral hidrolik yağ. Endüstriyel ağır hizmet uygulamalarında geniş sıcaklık aralığında güvenilir performans.",
    features: ["Yüksek yük kapasitesi", "Termal stabilite", "Yüksek VI formülü", "Aşınma koruması"],
  },
  "cetus-pao-46": {
    name: "Texaco Cetus PAO 46", grade: "ISO VG 46", series: "Cetus PAO", type: "Kompresör Yağı Tam Sentetik",
    api: "ISO 6743-3A DAA/DAH", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Ingersoll Rand", "Gardner Denver", "Sullair"],
    description: "PAO bazlı tam sentetik kompresör yağı. Mineral yağlara kıyasla çok daha uzun servis aralığı, daha düşük karbon birikimi ve daha iyi düşük sıcaklık akışkanlığı sağlayan üst segment formül.",
    features: ["PAO tam sentetik bazlı", "8000+ saat servis ömrü", "Düşük karbon birikimi", "Atlas Copco onaylı"],
  },
  "multifak-ep-2": {
    name: "Texaco Multifak EP 2", grade: "NLGI 2", series: "Multifak EP", type: "Gres EP",
    api: "NLGI 2", acea: "DIN 51502 KP2K-30",
    approvals: ["SKF LGEP 2", "FAG Arcanol MULTI2", "NSK"],
    description: "Lityum bazlı çok amaçlı EP gres yağı. Endüstriyel rulmanlar, dişliler ve kaymalı yataklar için yüksek yük, orta hız ve geniş sıcaklık aralığında güvenilir yağlama sağlar.",
    features: ["Lityum bazlı formül", "Yüksek EP kapasitesi", "Su dayanımı", "SKF ve FAG onaylı"],
  },
  "novatex-gp-2": {
    name: "Texaco Novatex GP 2", grade: "NLGI 2", series: "Novatex GP", type: "Gres Genel Amaçlı",
    api: "NLGI 2", acea: "DIN 51502 K2K-30",
    approvals: ["SKF LGGB 2"],
    description: "Genel amaçlı lityum bazlı gres yağı. Hafif ve orta yük koşullarındaki endüstriyel rulmanlar, eklem noktaları ve kaymalı yüzeyler için ekonomik ve güvenilir yağlama çözümü.",
    features: ["Genel amaçlı formül", "Hafif-orta yük uyumlu", "Geniş uygulama alanı", "Ekonomik seçenek"],
  },
};

// ── PETROL OFİSİ ─────────────────────────────────────────────────────────

const PETROL_OFISI_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "maxima-cx-0w-20-plus": {
    name: "Petrol Ofisi Maxima CX 0W-20 Plus", grade: "0W-20", series: "Maxima CX", type: "Tam Sentetik",
    api: "SP", acea: "C5",
    approvals: ["Fiat 9.55535-DM1"],
    description: "Katalitik konvertör uyumlu (Low-SAPS) tam sentetik motor yağı. Düşük SAPS içeriği sayesinde modern emisyon sonrası arıtma sistemlerini korur ve yakıt ekonomisini maksimize eder.",
    features: ["Low-SAPS formülasyon", "DPF ve TWC koruması", "API SP sertifikalı", "Fiat onaylı"],
  },
  "maxima-cx-0w-30-plus": {
    name: "Petrol Ofisi Maxima CX 0W-30 Plus", grade: "0W-30", series: "Maxima CX", type: "Tam Sentetik",
    api: "—", acea: "C2, C3",
    approvals: ["Fiat 9.55535-DS1", "Fiat 9.55535-GS1"],
    description: "ACEA C2/C3 uyumlu düşük viskoziteli tam sentetik motor yağı. Modern dizel ve benzinli motorlarda DPF ve TWC sistemlerini etkin biçimde korurken düşük yakıt tüketimi sağlar.",
    features: ["ACEA C2/C3 uyumlu", "DPF koruması", "Düşük viskozite", "Fiat DS1/GS1 onaylı"],
  },
  "maxima-cx-5w-30-plus": {
    name: "Petrol Ofisi Maxima CX 5W-30 Plus", grade: "5W-30", series: "Maxima CX", type: "Tam Sentetik",
    api: "SP/CF", acea: "C2, C3",
    approvals: ["MB 229.31", "Fiat 9.55535-S1"],
    description: "API SP/CF ve ACEA C2/C3 sertifikalı tam sentetik motor yağı. MB 229.31 ve Fiat S1 onaylarıyla geniş bir araç yelpazesinde üstün motor koruması ve yakıt ekonomisi sağlar.",
    features: ["API SP/CF sertifikalı", "MB 229.31 onaylı", "ACEA C2/C3 uyumlu", "Yakıt tasarrufu"],
  },
  "maxima-hybrid-0w-20": {
    name: "Petrol Ofisi Maxima Hybrid 0W-20", grade: "0W-20", series: "Maxima Hybrid", type: "Tam Sentetik",
    api: "SN", acea: "C5",
    approvals: [],
    description: "Hibrit araçlar için özel olarak formüle edilmiş tam sentetik motor yağı. Sık soğuk motor başlangıçlarının yaşandığı hibrit sistemlerde minimum aşınma ve maksimum koruma sunar.",
    features: ["Hibrit araç özel formülü", "Soğuk başlangıç koruması", "ACEA C5 uyumlu", "Düşük sürtünme"],
  },
  "maxima-hybrid-tech-0w-20": {
    name: "Petrol Ofisi Maxima Hybrid Tech 0W-20", grade: "0W-20", series: "Maxima Hybrid Tech", type: "Tam Sentetik",
    api: "SP", acea: "—",
    approvals: ["ILSAC GF-6A"],
    description: "API SP ve ILSAC GF-6A onaylı hibrit araç motor yağı. Gelişmiş yakıt tasarrufu teknolojisi ile hibrit sistemlerde üstün motor performansı ve uzatılmış değişim aralığı sağlar.",
    features: ["ILSAC GF-6A onaylı", "Hibrit sistem uyumlu", "Maksimum yakıt tasarrufu", "Uzatılmış değişim aralığı"],
  },
  "maxima-ll-5w-30": {
    name: "Petrol Ofisi Maxima LL 5W-30", grade: "5W-30", series: "Maxima LL", type: "Tam Sentetik",
    api: "SL", acea: "A3/B4",
    approvals: ["BMW LL-01", "MB 229.5", "MB 229.3", "VW 502.00/505.00"],
    description: "Uzun değişim aralıklı (Long Life) tam sentetik motor yağı. BMW LL-01 ve MB 229.5 onaylarıyla premium Avrupa araçlarında üstün motor koruması ve optimize yakıt verimliliği sağlar.",
    features: ["BMW LL-01 onaylı", "MB 229.5 onaylı", "Uzun değişim aralığı", "Premium Avrupa araç uyumlu"],
  },
  "maxima-vsa-0w-20": {
    name: "Petrol Ofisi Maxima VSA 0W-20", grade: "0W-20", series: "Maxima VSA", type: "Tam Sentetik",
    api: "SP", acea: "C5",
    approvals: ["VW 508.00/509.00", "Porsche C20", "Fiat 9.55535-DM1"],
    description: "VW 508.00/509.00 ve Porsche C20 onaylı tam sentetik motor yağı. Son nesil Volkswagen ve Porsche araçlarında uzun değişim aralığı ve üstün yakıt tasarrufu sağlar.",
    features: ["VW 508.00/509.00 onaylı", "Porsche C20 onaylı", "Ultra düşük viskozite", "Maksimum yakıt ekonomisi"],
  },
  "maxima-k-0w-20": {
    name: "Petrol Ofisi Maxima K 0W-20", grade: "0W-20", series: "Maxima K", type: "Tam Sentetik",
    api: "SP", acea: "—",
    approvals: ["ILSAC GF-6A"],
    description: "KIA araçları için API SP ve ILSAC GF-6A onaylı tam sentetik motor yağı. Ultra düşük viskoziteli formülasyonu ile sıfır atıklı sürüş konseptine uygun ve üstün yakıt tasarrufu.",
    features: ["KIA araçları için tasarlandı", "ILSAC GF-6A onaylı", "Ultra düşük viskozite", "Yakıt tasarrufu"],
  },
  "maxima-0w-20": {
    name: "Petrol Ofisi Maxima 0W-20", grade: "0W-20", series: "Maxima", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: [],
    description: "API SN/CF ve ACEA A5/B5 sertifikalı geniş kullanım yelpazeli tam sentetik motor yağı. Düşük viskoziteli formülü sayesinde soğuk başlangıçlarda hızlı yağ dolaşımı ve üstün motor koruması sağlar.",
    features: ["API SN/CF sertifikalı", "ACEA A5/B5 uyumlu", "Hızlı yağ dolaşımı", "Soğuk başlangıç koruması"],
  },
  "maxima-0w-30": {
    name: "Petrol Ofisi Maxima 0W-30", grade: "0W-30", series: "Maxima", type: "Tam Sentetik",
    api: "SN", acea: "A5/B5, C2",
    approvals: ["Ford WSS-M2C950-A", "Fiat 9.55535-GS1/DS1"],
    description: "Ford WSS-M2C950-A ve Fiat GS1/DS1 onaylı tam sentetik motor yağı. Uzun değişim aralığı ve geniş sıcaklık yelpazesinde stabil viskozite performansı.",
    features: ["Ford onaylı", "Fiat GS1/DS1 onaylı", "Uzun değişim aralığı", "Geniş sıcaklık stabilitesi"],
  },
  "maximus-la-5w-30": {
    name: "Petrol Ofisi Maximus LA 5W-30", grade: "5W-30", series: "Maximus LA", type: "Tam Sentetik",
    api: "CJ-4/SN", acea: "E6/E7/E9",
    approvals: ["MB 228.51", "MAN M3677"],
    description: "MB 228.51 ve MAN M3677 onaylı düşük küllü (Low-SAPS) tam sentetik ağır hizmet motor yağı. Euro V/VI dizel motorlarda DPF koruması ve uzun değişim aralığı sağlar.",
    features: ["Low-SAPS formülasyon", "DPF koruması", "MB 228.51 onaylı", "Euro V/VI uyumlu"],
  },
  "maximus-la-10w-40": {
    name: "Petrol Ofisi Maximus LA 10W-40", grade: "10W-40", series: "Maximus LA", type: "Yarı Sentetik",
    api: "CI-4", acea: "E6/E7/E8/E9/E11",
    approvals: ["Volvo VDS-3", "MAN 3477/M3271", "Scania Low Ash", "DEUTZ DQC IV-18 LA"],
    description: "ACEA E6/E7/E8/E9/E11 uyumlu düşük küllü yarı sentetik ağır hizmet motor yağı. Çok sayıda OEM onayıyla düşük emisyonlu ağır ticari araçlarda uzun değişim aralığı sağlar.",
    features: ["ACEA E6/E7/E9/E11 uyumlu", "Volvo VDS-3 onaylı", "Scania Low Ash onaylı", "Uzun değişim aralığı"],
  },
  "maximus-hd-e-5w-30": {
    name: "Petrol Ofisi Maximus HD-E 5W-30", grade: "5W-30", series: "Maximus HD-E", type: "Tam Sentetik",
    api: "CK-4/SN", acea: "E4/E7/E8/E11",
    approvals: ["Volvo VDS-4.5", "MAN M3777", "Scania LDF-4", "JASO DH-2"],
    description: "API CK-4 ve ACEA E4/E7/E11 sertifikalı tam sentetik ağır hizmet motor yağı. Volvo VDS-4.5 ve Scania LDF-4 onaylarıyla Euro VI emisyon motorlarında üstün koruma ve maksimum yakıt verimliliği.",
    features: ["API CK-4 sertifikalı", "Volvo VDS-4.5 onaylı", "Euro VI uyumlu", "JASO DH-2 onaylı"],
  },
  "maximus-hd-m-5w-30": {
    name: "Petrol Ofisi Maximus HD-M 5W-30", grade: "5W-30", series: "Maximus HD-M", type: "Tam Sentetik",
    api: "FA-4", acea: "—",
    approvals: ["Cummins CES 20087", "Detroit Diesel 93K223"],
    description: "API FA-4 sınıfı, yeni nesil ABD ağır ticari araç motorları için geliştirilmiş tam sentetik motor yağı. Cummins CES 20087 ve Detroit Diesel 93K223 onaylıdır; iyileştirilmiş yakıt ekonomisi sağlar.",
    features: ["API FA-4 sertifikalı", "Cummins CES 20087 onaylı", "Detroit Diesel onaylı", "Üstün yakıt ekonomisi"],
  },
  "maximus-m-5w-30": {
    name: "Petrol Ofisi Maximus M 5W-30", grade: "5W-30", series: "Maximus M", type: "Tam Sentetik",
    api: "CI-4", acea: "E4/E7",
    approvals: ["MB 228.5", "Volvo VDS-3", "MAN M3277/M3377", "Scania LDF"],
    description: "MB 228.5, Volvo VDS-3, MAN M3277/3377 ve Scania LDF onaylı çok markalı tam sentetik ağır hizmet motor yağı. Euro V motorlarda uzun değişim aralığı ve düşük yakıt tüketimi.",
    features: ["MB 228.5 onaylı", "Volvo VDS-3 onaylı", "Scania LDF onaylı", "Çok markalı uyumluluk"],
  },
  "maximus-hd-15w-40": {
    name: "Petrol Ofisi Maximus HD 15W-40", grade: "15W-40", series: "Maximus HD", type: "Mineral",
    api: "CK-4/SN", acea: "E7/E9",
    approvals: ["Volvo VDS-4.5", "MAN M3775", "Cummins CES 20086", "Mack EOS 4.5", "CAT ECF-3", "DEUTZ DQC III-18 LA"],
    description: "API CK-4/SN ve ACEA E7/E9 sertifikalı mineral bazlı ağır hizmet motor yağı. Geniş OEM onay yelpazesiyle çeşitli ağır ticari araç motorlarında güvenilir ve ekonomik koruma.",
    features: ["API CK-4/SN sertifikalı", "Volvo VDS-4.5 onaylı", "Cummins CES 20086 onaylı", "CAT ECF-3 onaylı"],
  },
  "maximus-hd-10w-40": {
    name: "Petrol Ofisi Maximus HD 10W-40", grade: "10W-40", series: "Maximus HD", type: "Yarı Sentetik",
    api: "CK-4/SN", acea: "E9",
    approvals: ["Volvo VDS-4.5", "MAN M3775", "Cummins CES 20086", "DEUTZ DQC III-18 LA"],
    description: "API CK-4/SN ve ACEA E9 uyumlu yarı sentetik ağır hizmet motor yağı. Volvo, MAN ve Cummins onaylarıyla Euro V/VI motorlarda motor ömrünü uzatan gelişmiş yağlama sağlar.",
    features: ["API CK-4 sertifikalı", "ACEA E9 uyumlu", "Volvo VDS-4.5 onaylı", "Uzatılmış motor ömrü"],
  },
  "maximus-hd-e-10w-40": {
    name: "Petrol Ofisi Maximus HD-E 10W-40", grade: "10W-40", series: "Maximus HD-E", type: "Tam Sentetik",
    api: "CK-4", acea: "E6/E7/E8/E9/E11",
    approvals: ["MB 228.31/228.51", "Volvo VDS-4.5", "MAN M3775", "CAT ECF-3"],
    description: "API CK-4 ve ACEA E6/E7/E8/E9/E11 sertifikalı tam sentetik ağır hizmet motor yağı. MB 228.31/228.51 ve Volvo VDS-4.5 onaylarıyla Euro VI motorlarda maksimum performans.",
    features: ["API CK-4 sertifikalı", "ACEA E6/E9/E11 uyumlu", "MB 228.51 onaylı", "Volvo VDS-4.5 onaylı"],
  },
  "maximus-10w-40": {
    name: "Petrol Ofisi Maximus 10W-40", grade: "10W-40", series: "Maximus", type: "Yarı Sentetik",
    api: "CI-4", acea: "E4/E7",
    approvals: ["MB DTFR 15B120", "Volvo VDS-3", "Renault VI RLD-2", "Mack EO-N", "DEUTZ DQC III-18"],
    description: "ACEA E4/E7 uyumlu yarı sentetik ağır ticari araç motor yağı. Çok sayıda OEM onayıyla Euro IV/V motorlarda kapsamlı motor koruması ve güvenilir performans sağlar.",
    features: ["ACEA E4/E7 uyumlu", "Volvo VDS-3 onaylı", "Mack EO-N onaylı", "Çok markalı uyumluluk"],
  },
  "maximus-turbo-diesel-extra-15w-40": {
    name: "Petrol Ofisi Maximus Turbo Diesel Extra 15W-40", grade: "15W-40", series: "Maximus Turbo Diesel Extra", type: "Mineral",
    api: "CI-4/SL/SC", acea: "E7",
    approvals: ["Volvo VDS-3", "Mack EO-N", "MB DTFR 15B110", "MAN M3275", "Cummins CES 20077/78"],
    description: "API CI-4/SL/SC ve ACEA E7 sertifikalı yüksek performanslı mineral dizel motor yağı. Geniş OEM onay yelpazesiyle Euro III/IV motorlarda ve eski nesil ağır hizmet araçlarında güvenilir koruma.",
    features: ["API CI-4 sertifikalı", "ACEA E7 uyumlu", "Volvo VDS-3 onaylı", "Cummins CES 20077/78 onaylı"],
  },
};

const PETROL_OFISI_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  "hydro-oil-hd-32": {
    name: "Petrol Ofisi Hydro Oil HD 32", grade: "ISO VG 32", series: "Hydro Oil HD", type: "Hidrolik Yağ HLP",
    api: "ISO 11158 HL/HM", acea: "DIN 51524 Pt.II HLP",
    approvals: ["Bosch Rexroth RDE 90235", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-1/HF-2", "JCMAS P041"],
    description: "DIN 51524 Pt.II (HLP) standardını karşılayan mineral bazlı hidrolik yağ. Bosch Rexroth ve Eaton onaylı; yüksek basınçlı endüstriyel sabit ve mobil hidrolik sistemlerde uzun servis ömrü.",
    features: ["DIN 51524 HLP uyumlu", "Bosch Rexroth onaylı", "Eaton M-2950 onaylı", "Parker HF-0/1/2 onaylı"],
  },
  "hydro-oil-hd-46": {
    name: "Petrol Ofisi Hydro Oil HD 46", grade: "ISO VG 46", series: "Hydro Oil HD", type: "Hidrolik Yağ HLP",
    api: "ISO 11158 HL/HM", acea: "DIN 51524 Pt.II HLP",
    approvals: ["Bosch Rexroth RDE 90235", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-1/HF-2", "JCMAS P041"],
    description: "Endüstriyel hidrolik sistemlerde en yaygın kullanılan viskozite derecesinde HLP mineral hidrolik yağ. Cincinnati, Parker ve JCMAS P041 onaylı; fabrika içi makine ve pres sistemlerinde üstün performans.",
    features: ["En yaygın hidrolik viskozite", "Cincinnati onaylı", "Parker HF-0/1/2 onaylı", "JCMAS P041 onaylı"],
  },
  "hydro-oil-hd-68": {
    name: "Petrol Ofisi Hydro Oil HD 68", grade: "ISO VG 68", series: "Hydro Oil HD", type: "Hidrolik Yağ HLP",
    api: "ISO 11158 HL/HM", acea: "DIN 51524 Pt.II HLP",
    approvals: ["Bosch Rexroth RDE 90235", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-2"],
    description: "Orta-yüksek viskoziteli mineral bazlı HLP hidrolik yağ. Yüksek basınçlı endüstriyel sistemler, büyük piston pompaları ve daha ağır yüklü ekipmanlar için tercih edilen viskozite sınıfı.",
    features: ["Yüksek viskozite stabilitesi", "Büyük pompa uyumlu", "Yüksek basınç koruması", "Uzun servis ömrü"],
  },
  "hydro-oil-hd-100": {
    name: "Petrol Ofisi Hydro Oil HD 100", grade: "ISO VG 100", series: "Hydro Oil HD", type: "Hidrolik Yağ HLP",
    api: "ISO 11158 HL/HM", acea: "DIN 51524 Pt.II HLP",
    approvals: ["Bosch Rexroth RDE 90235", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-2"],
    description: "Yüksek viskoziteli HLP mineral hidrolik yağ. Yavaş çalışan büyük kapasiteli silindir ve piston pompalı sistemler için uygun; ağır yük altında güvenilir film kalınlığı sağlar.",
    features: ["Yüksek viskozite", "Ağır yük uyumlu", "Güvenilir film kalınlığı", "Büyük sistemler için"],
  },
  "hydro-tech-hvi-32": {
    name: "Petrol Ofisi Hydro Tech HVI 32", grade: "ISO VG 32", series: "Hydro Tech HVI", type: "Hidrolik Yağ HVLP",
    api: "ISO 11158 HV", acea: "DIN 51524 Pt.III HVLP",
    approvals: ["Bosch Rexroth RDE 90220", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-1/HF-2", "JCMAS P041"],
    description: "DIN 51524 Pt.III (HVLP) standardını karşılayan yüksek viskozite indeksli mineral hidrolik yağ. Geniş çalışma sıcaklığı aralığında stabil viskozite; mevsimsel ve dış ortam uygulamalar için ideal.",
    features: ["DIN 51524 HVLP uyumlu", "Yüksek VI formülasyonu", "Bosch Rexroth RDE 90220 onaylı", "JCMAS P041 onaylı"],
  },
  "hydro-tech-hvi-46": {
    name: "Petrol Ofisi Hydro Tech HVI 46", grade: "ISO VG 46", series: "Hydro Tech HVI", type: "Hidrolik Yağ HVLP",
    api: "ISO 11158 HV", acea: "DIN 51524 Pt.III HVLP",
    approvals: ["Bosch Rexroth RDE 90220", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-1/HF-2"],
    description: "Geniş sıcaklık yelpazesinde stabil viskozite sunan HVLP mineral hidrolik yağ. Mevsimsel değişimlere maruz kalan dış ortam makineleri ve mobil iş makineleri için ideal seçim.",
    features: ["HVLP yüksek VI", "Mevsimsel uyumluluk", "Mobil iş makinesi uyumlu", "Stabil viskozite"],
  },
  "hydro-tech-hvi-68": {
    name: "Petrol Ofisi Hydro Tech HVI 68", grade: "ISO VG 68", series: "Hydro Tech HVI", type: "Hidrolik Yağ HVLP",
    api: "ISO 11158 HV", acea: "DIN 51524 Pt.III HVLP",
    approvals: ["Bosch Rexroth RDE 90220", "Cincinnati P-68/P-69/P-70", "Eaton M-2950", "Parker HF-0/HF-2"],
    description: "Yüksek viskozite indeksli HVLP mineral hidrolik yağ. Büyük kapasiteli endüstriyel sistemlerde hem yaz hem kış koşullarında güvenilir performans; yavaş çalışan ağır yüklü sistemler için tercih edilir.",
    features: ["Yüksek VI stabilitesi", "Yaz/kış uyumlu", "Ağır yük kapasitesi", "HVLP uyumlu"],
  },
  "gravis-m-220": {
    name: "Petrol Ofisi Gravis M 220", grade: "ISO VG 220", series: "Gravis M", type: "Dişli Yağı CLP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "AIST 224", "David Brown S1.53.101"],
    description: "DIN 51517 Pt.3 uyumlu mineral bazlı endüstriyel CLP dişli yağı. AGMA 9005-E02 ve David Brown S1.53.101 onaylı; kapalı dişli kutularında yüksek EP koruması ve uzun servis ömrü.",
    features: ["DIN 51517-3 CLP uyumlu", "AGMA 9005-E02 onaylı", "David Brown onaylı", "Yüksek EP koruması"],
  },
  "gravis-m-320": {
    name: "Petrol Ofisi Gravis M 320", grade: "ISO VG 320", series: "Gravis M", type: "Dişli Yağı CLP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "AIST 224", "David Brown S1.53.101"],
    description: "Orta-yüksek viskoziteli mineral CLP endüstriyel dişli yağı. AGMA 9005-E02 ve AIST 224 onaylı; ağır yük altında çalışan endüstriyel redüktör ve dişli kutularında güvenilir uzun ömürlü koruma.",
    features: ["AGMA 9005-E02 onaylı", "AIST 224 onaylı", "Ağır yük uyumlu", "Uzun servis ömrü"],
  },
  "gravis-m-460": {
    name: "Petrol Ofisi Gravis M 460", grade: "ISO VG 460", series: "Gravis M", type: "Dişli Yağı CLP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "AIST 224", "David Brown S1.53.101"],
    description: "Yüksek viskoziteli mineral CLP endüstriyel dişli yağı. Düşük hızlı ve yüksek torklı sistemler için tasarlanmış; David Brown ve AGMA onaylarıyla çeşitli endüstriyel redüktör uygulamaları için.",
    features: ["Yüksek viskozite", "Düşük hız-yüksek tork uyumlu", "David Brown onaylı", "Uzun sistem ömrü"],
  },
  "gravis-mp-150": {
    name: "Petrol Ofisi Gravis MP 150", grade: "ISO VG 150", series: "Gravis MP", type: "Dişli Yağı CLP EP",
    api: "ISO 12925-1 CKD", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "Flender Rev.16.2", "SEB 181226"],
    description: "DIN 51517 Pt.3 uyumlu Flender Rev.16.2 onaylı EP dişli yağı. Micropitting direnci güçlendirilmiş formülasyonu sayesinde yüksek hızlı heliks dişlilerde ve rüzgar türbini dişli kutularında uzun ömür.",
    features: ["Flender Rev.16.2 onaylı", "Micropitting direnci", "Rüzgar türbini uyumlu", "Yüksek hız kapasitesi"],
  },
  "gravis-mp-220": {
    name: "Petrol Ofisi Gravis MP 220", grade: "ISO VG 220", series: "Gravis MP", type: "Dişli Yağı CLP EP",
    api: "ISO 12925-1 CKD", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "Flender Rev.16.2", "SEB 181226"],
    description: "AGMA 9005-E02 ve Flender Rev.16.2 onaylı mineral bazlı EP dişli yağı. Yüksek yük kapasitesi ve micropitting direnciyle endüstriyel redüktörlerde ve konveyör sistemlerinde uzun değişim aralığı.",
    features: ["Flender Rev.16.2 onaylı", "AGMA 9005-E02 onaylı", "Micropitting direnci", "Uzun değişim aralığı"],
  },
  "gravis-mp-320": {
    name: "Petrol Ofisi Gravis MP 320", grade: "ISO VG 320", series: "Gravis MP", type: "Dişli Yağı CLP EP",
    api: "ISO 12925-1 CKD", acea: "DIN 51517-3 CLP",
    approvals: ["AGMA 9005-E02", "Flender Rev.16.2", "SEB 181226"],
    description: "Flender Rev.16.2 ve SEB 181226 (Siemens) onaylı yüksek viskoziteli EP dişli yağı. Ağır yük ve yüksek tork altında çalışan endüstriyel dişli kutularında maksimum güvenilirlik ve uzun servis ömrü.",
    features: ["Flender Rev.16.2 onaylı", "Siemens SEB 181226 onaylı", "Yüksek tork uyumlu", "Maksimum EP koruması"],
  },
  "compressor-oil-xt-46": {
    name: "Petrol Ofisi Compressor Oil XT 46", grade: "ISO VG 46", series: "Compressor Oil XT", type: "Kompresör Yağı Mineral",
    api: "ISO 6743-3 DAA/DAH", acea: "DIN 51506 VDL",
    approvals: ["DIN 51517-1 C", "DIN 51517-2 CL"],
    description: "DIN 51506 VDL standardını karşılayan mineral bazlı kompresör yağı. Pistonlu ve vidalı kompresörler için; yüksek oksidasyon direnci ve karbon oluşum riskini minimize eden formülasyon.",
    features: ["DIN 51506 VDL uyumlu", "Pistonlu ve vidalı kompresör uyumlu", "Düşük karbon birikimi", "Yüksek oksidasyon direnci"],
  },
  "compressor-oil-xt-68": {
    name: "Petrol Ofisi Compressor Oil XT 68", grade: "ISO VG 68", series: "Compressor Oil XT", type: "Kompresör Yağı Mineral",
    api: "ISO 6743-3 DAA/DAH", acea: "DIN 51506 VDL",
    approvals: ["DIN 51517-1 C"],
    description: "Yüksek sıcaklıklarda çalışan pistonlu kompresörler için yüksek oksidasyon stabiliteli mineral bazlı kompresör yağı. DIN 51506 VDL onaylı; uzun servis aralığı ve güvenilir sistem performansı.",
    features: ["Yüksek sıcaklık stabilitesi", "DIN 51506 VDL uyumlu", "Uzun servis aralığı", "Pistonlu kompresör uyumlu"],
  },
  "compressor-oil-sp-46": {
    name: "Petrol Ofisi Compressor Oil SP 46", grade: "ISO VG 46", series: "Compressor Oil SP", type: "Kompresör Yağı Tam Sentetik",
    api: "ISO 6743-3 DAA/DAH", acea: "DIN 51506 VDL",
    approvals: ["DIN 51524 HLP", "GM LJ", "SAE MS1003-2"],
    description: "PAO/ester bazlı sentetik kompresör yağı. Mineral yağlara kıyasla çok daha uzun değişim aralığı, düşük buharlaşma ve üstün termal stabilite sağlar. Vidalı ve döner kompresörler için idealdir.",
    features: ["Tam sentetik formül", "Uzun değişim aralığı", "Düşük buharlaşma", "GM LJ onaylı"],
  },
  "compressor-oil-sp-68": {
    name: "Petrol Ofisi Compressor Oil SP 68", grade: "ISO VG 68", series: "Compressor Oil SP", type: "Kompresör Yağı Tam Sentetik",
    api: "ISO 6743-3 DAA/DAH", acea: "DIN 51506 VDL",
    approvals: ["DIN 51524 HLP", "GM LJ", "SAE MS1003-2"],
    description: "Yüksek sıcaklık uygulamaları için PAO/ester bazlı sentetik kompresör yağı. DIN 51506 VDL onaylı; uzun servis ömrü, yüksek oksidasyon kararlılığı ve düşük karbon birikimi sağlar.",
    features: ["PAO/ester bazlı", "DIN 51506 VDL uyumlu", "Yüksek oksidasyon stabilitesi", "Uzun servis ömrü"],
  },
  "turbine-oil-tx-46": {
    name: "Petrol Ofisi Turbine Oil TX 46", grade: "ISO VG 46", series: "Turbine Oil TX", type: "Türbin Yağı",
    api: "ISO 8068 L-TSA/L-TGA", acea: "DIN 51515 Pts I & II",
    approvals: ["Siemens TLV 9013", "ALSTOM HTGD 90117", "GE GEK32568G/46506E", "BS 489:1999"],
    description: "ISO 8068:2006 L-TSA/L-TGA standardını karşılayan yüksek kaliteli türbin yağı. Siemens, ALSTOM ve GE onaylarıyla büyük endüstriyel buhar ve gaz türbinlerinde güvenilir uzun ömürlü yağlama sağlar.",
    features: ["Siemens TLV 9013 onaylı", "ALSTOM HTGD 90117 onaylı", "GE onaylı", "Uzun ömürlü yağlama"],
  },
  "super-gres-ep-2": {
    name: "Petrol Ofisi Super Gres EP 2", grade: "NLGI 2", series: "Super Gres EP", type: "Gres EP",
    api: "NLGI 2", acea: "DIN 51825 KP 2 K-20",
    approvals: ["TS 11584"],
    description: "DIN 51825 KP 2 K-20 ve TS 11584 standardını karşılayan lityum bazlı EP gres. Yüksek basınç ve orta çalışma sıcaklıklarında rulman, bilyalı yatak ve dişli maşalarında güvenilir yağlama sağlar.",
    features: ["Lityum bazlı EP formül", "DIN 51825 KP 2 K-20 uyumlu", "TS 11584 onaylı", "Yüksek yük kapasitesi"],
  },
  "molibdenli-gres-2": {
    name: "Petrol Ofisi Molibdenli Gres 2", grade: "NLGI 2", series: "Molibdenli Gres", type: "Gres MoS₂",
    api: "NLGI 2", acea: "DIN 51825 KP 2 N-20",
    approvals: ["TS 11584"],
    description: "MoS₂ (molibden disülfür) katkılı lityum bazlı EP gres. Yüksek spesifik basınç ve titreşimli çalışma koşullarında üstün kayma yüzeyi koruması; sık yağlamaya erişimin güç olduğu uygulamalar için idealdir.",
    features: ["MoS₂ katkılı formül", "Yüksek basınç koruması", "Titreşim direnci", "Uzun yeniden yağlama aralığı"],
  },
};

// ── Brand product lookup maps ──────────────────────────────────────────────

const BRAND_MOTOR_PRODUCTS: Record<string, Record<string, ProductSpec>> = {
  shell: SHELL_MOTOR_PRODUCTS,
  mobil: MOBIL_MOTOR_PRODUCTS,
  castrol: CASTROL_MOTOR_PRODUCTS,
  total: TOTAL_MOTOR_PRODUCTS,
  motul: MOTUL_MOTOR_PRODUCTS,
  texol: TEXOL_MOTOR_PRODUCTS,
  texaco: TEXACO_MOTOR_PRODUCTS,
  "petrol-ofisi": PETROL_OFISI_MOTOR_PRODUCTS,
};

const BRAND_INDUSTRIAL_PRODUCTS: Record<string, Record<string, ProductSpec>> = {
  shell: SHELL_INDUSTRIAL_PRODUCTS,
  mobil: MOBIL_INDUSTRIAL_PRODUCTS,
  castrol: CASTROL_INDUSTRIAL_PRODUCTS,
  total: TOTAL_INDUSTRIAL_PRODUCTS,
  motul: MOTUL_INDUSTRIAL_PRODUCTS,
  texol: TEXOL_INDUSTRIAL_PRODUCTS,
  texaco: TEXACO_INDUSTRIAL_PRODUCTS,
  "petrol-ofisi": PETROL_OFISI_INDUSTRIAL_PRODUCTS,
};


interface ProductPageProps {
  params: Promise<{ locale: string; slug: string; category: string; product: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; category: string; product: string }[] = [];
  for (const [brandSlug, map] of Object.entries(BRAND_MOTOR_PRODUCTS)) {
    for (const product of Object.keys(map)) {
      params.push({ slug: brandSlug, category: "motor-yaglari", product });
    }
  }
  for (const [brandSlug, map] of Object.entries(BRAND_INDUSTRIAL_PRODUCTS)) {
    for (const product of Object.keys(map)) {
      params.push({ slug: brandSlug, category: "endustriyel-yaglar", product });
    }
  }
  return params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug, category, product } = await params;
  setRequestLocale(locale);

  const brandSlug = slug.toLowerCase();
  const isIndustrial = category === "endustriyel-yaglar";
  const brandConfig: BrandConfig = BRAND_CONFIGS[brandSlug] ?? {
    name: "Shell", primary: "#DD1D21", secondary: "#9b1015", accent: "#FBCE07", accentText: "#9b1015",
  };
  const { primary, secondary, accent, accentText } = brandConfig;

  const motorMap = BRAND_MOTOR_PRODUCTS[brandSlug];
  const industrialMap = BRAND_INDUSTRIAL_PRODUCTS[brandSlug];
  const spec = isIndustrial ? (industrialMap?.[product] ?? null) : (motorMap?.[product] ?? null);

  if (!spec) notFound();

  const t = await getTranslations("productPage");

  // Use message-file translations when available; fall back to TypeScript data.
  // Only brands with entries in the pd namespace are looked up — others use the
  // TypeScript spec data directly (already in the correct language).
  let translatedType = spec.type;
  let translatedDesc = spec.description;
  let translatedFeatures = spec.features;
  let translatedFullDesc = spec.fullDescription;
  const BRANDS_WITH_PD = new Set(["shell", "mobil", "castrol", "total", "motul", "texol", "texaco"]);
  if (BRANDS_WITH_PD.has(brandSlug)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pd = await getTranslations("pd" as any);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const key = product as any;
      const pType     = pd(`${key}.type`);
      const pDesc     = pd(`${key}.description`);
      const pF0       = pd(`${key}.f0`);
      const pF1       = pd(`${key}.f1`);
      const pF2       = pd(`${key}.f2`);
      const pF3       = pd(`${key}.f3`);
      // next-intl returns the key path when a key is missing — detect and skip
      const missing = (v: string, field: string) => v.endsWith(`.${field}`);
      if (!missing(pType, "type"))           translatedType     = pType;
      if (!missing(pDesc, "description"))    translatedDesc     = pDesc;
      if (!missing(pF0,  "f0"))              translatedFeatures = [pF0, pF1, pF2, pF3];
      try {
        const pFd = pd(`${key}.fd`);
        if (!missing(pFd, "fd"))             translatedFullDesc = pFd;
      } catch { /* keep spec fallback */ }
    } catch {
      // fallback already set above
    }
  }

  const { series, grade, api, acea, approvals } = spec;

  const backLabel = isIndustrial
    ? t("backToIndustrial", { brand: brandConfig.name })
    : t("backToMotor", { brand: brandConfig.name });

  const specRows = isIndustrial
    ? [
        { label: t("productName"),    value: spec.name },
        { label: t("viscosityIso"),   value: grade     },
        { label: t("productSeries"),  value: series    },
        { label: t("oilType"),        value: translatedType },
        { label: t("isoStd"),         value: api            },
        { label: t("addCert"),        value: acea           },
      ]
    : [
        { label: t("productName"),    value: spec.name         },
        { label: t("viscosity"),      value: `SAE ${grade}`    },
        { label: t("productSeries"),  value: series            },
        { label: t("oilType"),        value: translatedType    },
        { label: t("apiClass"),       value: api               },
        { label: t("aceaClass"),      value: acea              },
      ];

  return (
    <main className="min-h-screen bg-brand-50 pt-[120px]">

      {/* Back link */}
      <div className="bg-white border-b border-brand-200 py-4">
        <div className="container-xl">
          <Link
            href={`/brands/${slug}/${category}`}
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16"
        style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
      >
        <svg
          viewBox="0 0 400 200"
          className="absolute right-0 top-0 h-full opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(9)].map((_, i) => (
            <line key={i} x1="400" y1="200" x2={i * 50} y2="0"
              stroke={accent} strokeWidth="12" strokeLinecap="round" />
          ))}
        </svg>

        <div className="container-xl relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">

            {/* Product image */}
            {spec.image ? (
              <ProductImageLightbox src={spec.image} alt={spec.name} accent={accent} borderColor={accent} />
            ) : (
            <div
              className="shrink-0 w-52 h-64 rounded-2xl flex flex-col items-center justify-center border-4 shadow-2xl"
              style={{ borderColor: accent, background: `linear-gradient(170deg, ${primary} 0%, ${secondary} 100%)` }}
            >
              <svg viewBox="0 0 120 60" className="w-28 mb-3 opacity-30" aria-hidden="true">
                {[...Array(7)].map((_, i) => (
                  <line key={i} x1="60" y1="60" x2={10 + i * 17} y2="0"
                    stroke={accent} strokeWidth="5" strokeLinecap="round" />
                ))}
              </svg>
              <span className="text-3xl font-black leading-none text-center px-3" style={{ color: accent }}>
                {grade}
              </span>
              <span className="text-white text-sm font-bold mt-2 opacity-80 text-center px-4">
                {series}
              </span>
              <span
                className="mt-3 text-xs font-semibold px-3 py-1 rounded-full text-center"
                style={{ background: accent, color: accentText }}
              >
                {translatedType}
              </span>
            </div>
            )}

            <div className="text-white flex-1">
              <p className="text-sm font-semibold tracking-widest uppercase mb-2 opacity-70">{brandConfig.name}</p>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">{spec.name}</h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">{translatedDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Features */}
      <section className="section-padding">
        <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Technical specs */}
          <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
            <h2 className="text-xl font-bold text-brand-900 mb-5">{t("techSpecs")}</h2>
            <dl className="divide-y divide-brand-100">
              {specRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3 text-sm">
                  <dt className="text-brand-500 font-medium">{label}</dt>
                  <dd className="text-brand-900 font-semibold text-right">{value}</dd>
                </div>
              ))}

              {approvals.length > 0 && (
                <div className="py-3 text-sm">
                  <dt className="text-brand-500 font-medium mb-2">{t("oemApprovals")}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {approvals.map((a) => (
                      <span key={a} className="bg-brand-100 text-brand-700 text-xs font-semibold px-2 py-1 rounded">
                        {a}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Key features */}
          <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
            <h2 className="text-xl font-bold text-brand-900 mb-5">{t("keyFeatures")}</h2>
            <ul className="space-y-3">
              {translatedFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: primary }} />
                  <span className="text-brand-700 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Full description */}
      {translatedFullDesc && (
        <section className="pb-8">
          <div className="container-xl">
            <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
              <h2 className="text-xl font-bold text-brand-900 mb-5">{t("productDesc")}</h2>
              <div className="space-y-1">
                {translatedFullDesc.split("\n").map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={i} className="h-3" />;
                  const isHeader =
                    trimmed.startsWith("###") ||
                    /^[A-ZА-ЯЁÇĞİÖŞÜ][A-ZА-ЯЁÇĞİÖŞÜ\s]{3,}$/.test(trimmed) ||
                    /^(PERFORMANS|UYGULAMALAR|STANDARTLAR|TİPİK|BAŞLICA|ENERJİ|BAKIM|KULLANIM|KORUYUCU)/.test(trimmed);
                  const isBullet = trimmed.startsWith("•") || /^\d+\.\s/.test(trimmed);
                  const display = trimmed.startsWith("###") ? trimmed.replace(/^###\s*/, "") : trimmed;
                  if (isHeader) return (
                    <p key={i} className="font-bold text-brand-900 text-sm uppercase tracking-wide mt-4 mb-1">{display}</p>
                  );
                  if (isBullet) return (
                    <p key={i} className="text-brand-700 text-sm pl-4">{display}</p>
                  );
                  return <p key={i} className="text-brand-700 text-sm leading-relaxed">{display}</p>;
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12">
        <div className="container-xl text-center">
          <p className="text-brand-500 text-lg mb-6 max-w-xl mx-auto">{t("ctaText")}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("ctaBtn")}</Link>
          </Button>
        </div>
      </section>

    </main>
  );
}
