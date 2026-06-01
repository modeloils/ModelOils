import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

function toSlug(name: string) {
  return name
    .replace(/^(Shell|Mobil|Castrol|Total|Elf|Motul|Texol|Texaco)\s+/i, "")
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
}

const SHELL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "helix-ultra-0w-20": {
    name: "Shell Helix Ultra 0W-20", grade: "0W-20", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Ford WSS-M2C948-B"],
    description: "En zorlu koşullar için geliştirilmiş tam sentetik motor yağı. Düşük vizkoziteli formülasyonu sayesinde soğuk hava başlangıçlarında üstün koruma sağlar ve yakıt verimliliğini artırır.",
    features: ["Üstün soğuk hava başlangıç koruması", "Optimize yakıt ekonomisi", "Uzun motor ömrü", "Tam sentetik formül"],
  },
  "helix-ultra-0w-30": {
    name: "Shell Helix Ultra 0W-30", grade: "0W-30", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["VW 502 00/505 00", "MB 229.5"],
    description: "Avrupa OEM standartlarını karşılayan tam sentetik motor yağı. VW ve Mercedes-Benz onaylarıyla modern benzinli ve dizel motorlar için ideal.",
    features: ["VW ve MB onaylı", "Düşük sürtünme teknolojisi", "Uzun ömürlü koruma", "Yakıt tasarrufu"],
  },
  "helix-ultra-0w-40": {
    name: "Shell Helix Ultra 0W-40", grade: "0W-40", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Yüksek performanslı spor ve lüks araçlar için geliştirilmiş tam sentetik motor yağı. Porsche ve Mercedes-Benz onayıyla aşırı çalışma koşullarında maksimum motor koruması sunar.",
    features: ["Spor ve lüks araç onaylı", "Yüksek ısı direnci", "Maksimum motor koruması", "Porsche A40 onaylı"],
  },
  "helix-ultra-5w-30": {
    name: "Shell Helix Ultra 5W-30", grade: "5W-30", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["BMW LL-01", "MB 229.3", "MB 229.5", "Renault RN0700/RN0710"],
    description: "En popüler tam sentetik motor yağlarından biri. BMW ve Mercedes-Benz uzun ömürlü servis onayıyla geniş bir araç yelpazesinde mükemmel koruma sağlar.",
    features: ["BMW LL-01 onaylı", "MB uzun servis onaylı", "Çok amaçlı kullanım", "Üstün motor temizliği"],
  },
  "helix-ultra-5w-40": {
    name: "Shell Helix Ultra 5W-40", grade: "5W-40", series: "Helix Ultra", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["VW 502 00/505 00", "Porsche A40", "MB 229.3"],
    description: "Geniş sıcaklık aralığında mükemmel performans sunan tam sentetik motor yağı. Volkswagen ve Porsche onayıyla hem günlük hem de yüksek performanslı kullanım için uygundur.",
    features: ["VW ve Porsche onaylı", "Geniş sıcaklık aralığı", "Sürüklenme karşıtı koruma", "Motor temizleyici özellik"],
  },
  "helix-ultra-ect-c2-c3-0w-30": {
    name: "Shell Helix Ultra ECT C2/C3 0W-30", grade: "0W-30", series: "Helix Ultra ECT", type: "Tam Sentetik",
    api: "SN/CF", acea: "C2/C3",
    approvals: ["Renault RN0700/RN0710", "Fiat 9.55535-GH2", "MB 229.52"],
    description: "DPF (Dizel Partikül Filtresi) ve TWC (Katalitik Konvertör) uyumlu tam sentetik motor yağı. ACEA C2/C3 çift sertifikasyonuyla modern emisyon kontrol sistemlerini korur.",
    features: ["DPF uyumlu", "Düşük kül içeriği (Low SAPS)", "Katalitik konvertör koruma", "Renault ve Fiat onaylı"],
  },
  "helix-ultra-ect-c3-5w-30": {
    name: "Shell Helix Ultra ECT C3 5W-30", grade: "5W-30", series: "Helix Ultra ECT", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00"],
    description: "BMW, Mercedes-Benz ve Volkswagen'in modern emisyon kontrol sistemleri için özel olarak onaylanmış tam sentetik motor yağı. DPF ve GPF filtreli araçlar için idealdir.",
    features: ["BMW LL-04 onaylı", "MB 229.51 onaylı", "VW 504/507 onaylı", "GPF ve DPF uyumlu"],
  },
  "helix-ultra-professional-ab-l-0w-30": {
    name: "Shell Helix Ultra Professional AB-L 0W-30", grade: "0W-30", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-D", "Ford WSS-M2C913-C"],
    description: "Ford araçları için özel olarak geliştirilmiş tam sentetik motor yağı. Ford'un en güncel WSS-M2C913-D standardını karşılayan düşük viskoziteli formülasyon.",
    features: ["Ford OEM onaylı", "Düşük viskozite direnci", "Gelişmiş yakıt ekonomisi", "EcoBoost motor uyumlu"],
  },
  "helix-ultra-professional-af-5w-20": {
    name: "Shell Helix Ultra Professional AF 5W-20", grade: "5W-20", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "A1/B1",
    approvals: ["Ford WSS-M2C948-B"],
    description: "Ford EcoBoost ve diğer Ford benzinli motorlar için özel olarak tasarlanmış tam sentetik motor yağı. Düşük sürtünmeli formülasyonuyla yakıt tasarrufu sağlar.",
    features: ["Ford EcoBoost onaylı", "Minimum sürtünme", "İleri yakıt ekonomisi", "Soğuk başlangıç koruması"],
  },
  "helix-ultra-professional-ag-5w-30": {
    name: "Shell Helix Ultra Professional AG 5W-30", grade: "5W-30", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["GM dexos2", "Opel/GM OV0401547"],
    description: "General Motors ve Opel araçları için GM dexos2 lisanslı tam sentetik motor yağı. GM'in küresel araç filosu için zorunlu kıldığı yüksek performans standardını karşılar.",
    features: ["GM dexos2 lisanslı", "Opel/GM onaylı", "Turbo motor koruması", "Uzun servis aralıkları"],
  },
  "helix-ultra-professional-am-l-5w-30": {
    name: "Shell Helix Ultra Professional AM-L 5W-30", grade: "5W-30", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["MB 229.52", "MB 229.51"],
    description: "Mercedes-Benz'in en yeni Low-SAPS standardı olan MB 229.52'yi karşılayan tam sentetik motor yağı. Modern Mercedes dizel ve benzinli motorlarda DPF koruması sağlar.",
    features: ["MB 229.52 onaylı", "Low-SAPS formülü", "DPF uyumlu", "BlueTEC dizel uyumlu"],
  },
  "helix-ultra-professional-av-l-0w-30": {
    name: "Shell Helix Ultra Professional AV-L 0W-30", grade: "0W-30", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["VW 504 00", "VW 507 00", "Porsche C30"],
    description: "Volkswagen Group'un en yüksek standardı olan VW 504 00/507 00'ı karşılayan tam sentetik motor yağı. VW, Audi, Skoda ve Seat dizel araçları için idealdir.",
    features: ["VW 504/507 onaylı", "Porsche C30 onaylı", "TDI dizel uyumlu", "Uzun ömürlü servis"],
  },
  "helix-ultra-professional-av-5w-30": {
    name: "Shell Helix Ultra Professional AV 5W-30", grade: "5W-30", series: "Helix Ultra Professional", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["VW 504 00", "VW 507 00"],
    description: "VW Group araçları için VW 504/507 onaylı tam sentetik motor yağı. TSI ve TDI motorlarda üstün koruma ve uzun servis aralıkları sunar.",
    features: ["VW 504/507 onaylı", "TSI ve TDI uyumlu", "Gelişmiş DPF koruması", "Uzun değişim aralıkları"],
  },
  "helix-hx8-5w-30": {
    name: "Shell Helix HX8 5W-30", grade: "5W-30", series: "Helix HX8", type: "Sentetik Teknoloji",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.3", "Renault RN0700"],
    description: "Shell'in sentetik teknoloji formülü ile üretilen yüksek performanslı motor yağı. Tam sentetikle karşılaştırılabilir koruma seviyesi sunarken daha geniş uygulama alanına sahiptir.",
    features: ["Sentetik teknoloji formülü", "Geniş uygulama yelpazesi", "MB 229.3 onaylı", "Üstün yüksek ısı koruması"],
  },
  "helix-hx8-5w-40": {
    name: "Shell Helix HX8 5W-40", grade: "5W-40", series: "Helix HX8", type: "Sentetik Teknoloji",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["VW 502 00/505 00", "MB 229.3", "Renault RN0700/RN0710"],
    description: "Geniş viskozite aralığında mükemmel koruma sunan sentetik teknoloji motor yağı. VW ve Mercedes-Benz onaylı formülasyonuyla hem benzinli hem dizel motorlarda kullanılır.",
    features: ["Çok amaçlı formül", "VW ve MB onaylı", "Yüksek ısı stabilitesi", "Motor temizleme özelliği"],
  },
  "helix-hx8-10w-40": {
    name: "Shell Helix HX8 10W-40", grade: "10W-40", series: "Helix HX8", type: "Sentetik Teknoloji",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["VW 501 01/505 00", "MB 229.1"],
    description: "Sıcak iklimlerde ve yüksek çalışma sıcaklıklarında mükemmel performans gösteren sentetik teknoloji motor yağı. Hem yeni hem de yüksek kilometreli motorlar için uygundur.",
    features: ["Sıcak iklim performansı", "Yüksek km motor koruması", "Aşınma karşıtı formül", "Geniş motor uyumluluğu"],
  },
  "helix-hx8-ect-5w-30": {
    name: "Shell Helix HX8 ECT 5W-30", grade: "5W-30", series: "Helix HX8 ECT", type: "Sentetik Teknoloji",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51"],
    description: "Emisyon kontrol sistemli araçlar için sentetik teknoloji motor yağı. DPF filtreli dizel ve katalitik konvertörlü benzinli araçlarda düşük kül avantajı sağlar.",
    features: ["DPF uyumlu Low-SAPS", "BMW LL-04 onaylı", "Katalitik konvertör dostu", "Ekonomik alternatif"],
  },
  "helix-hx7-5w-40": {
    name: "Shell Helix HX7 5W-40", grade: "5W-40", series: "Helix HX7", type: "Yarı Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["VW 502 00/505 00", "MB 229.1"],
    description: "Geniş bir araç yelpazesi için ideal yarı sentetik motor yağı. Mineral ve tam sentetik yağların avantajlarını birleştirerek ekonomik ve etkili koruma sağlar.",
    features: ["Ekonomik yarı sentetik", "Geniş araç uyumluluğu", "Yüksek ısı koruması", "VW ve MB onaylı"],
  },
  "helix-hx7-10w-40": {
    name: "Shell Helix HX7 10W-40", grade: "10W-40", series: "Helix HX7", type: "Yarı Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["VW 501 01/505 00", "MB 229.1", "Renault RN0700"],
    description: "Hem benzinli hem dizel motorlar için uygun yarı sentetik motor yağı. Sıcak iklimlerde ve şehir içi sürüşlerde güvenilir motor koruması sunar.",
    features: ["Benzinli ve dizel uyumlu", "Şehir içi sürüş optimizasyonu", "Güçlü deterjan paketi", "Çok markalı onay"],
  },
  "helix-hx7-15w-40": {
    name: "Shell Helix HX7 15W-40", grade: "15W-40", series: "Helix HX7", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1"],
    description: "Sıcak iklimlerde ve eski nesil motorlar için tasarlanmış güvenilir yarı sentetik motor yağı. Yüksek viskoziteli formülasyonuyla yüksek sıcaklık koruması sağlar.",
    features: ["Sıcak iklim optimizasyonu", "Eski motor koruması", "Yüksek viskozite stabilitesi", "Ekonomik seçenek"],
  },
  "helix-hx7-av-l-5w-30": {
    name: "Shell Helix HX7 AV-L 5W-30", grade: "5W-30", series: "Helix HX7", type: "Yarı Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["VW 504 00", "VW 507 00"],
    description: "VW Group araçları için ekonomik VW 504/507 onaylı yarı sentetik motor yağı. TDI motorlarda DPF koruması sağlarken bütçe dostu bir alternatif sunar.",
    features: ["VW 504/507 onaylı", "DPF uyumlu", "Ekonomik alternatif", "TDI motor uyumlu"],
  },
  "helix-hx6-10w-40": {
    name: "Shell Helix HX6 10W-40", grade: "10W-40", series: "Helix HX6", type: "Yarı Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: [],
    description: "Günlük kullanım için geliştirilmiş güvenilir yarı sentetik motor yağı. Geniş motor ve araç uyumluluğu ile standart bakım gereksinimlerini karşılar.",
    features: ["Günlük kullanım için ideal", "Dengeli koruma paketi", "Geniş motor uyumu", "Ekonomik yarı sentetik"],
  },
  "helix-hx5-15w-40": {
    name: "Shell Helix HX5 15W-40", grade: "15W-40", series: "Helix HX5", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: [],
    description: "Standart bakım gereksinimlerini karşılayan güvenilir mineral motor yağı. Eski nesil benzinli ve dizel motorlarda temel motor koruması sağlar.",
    features: ["Temel motor koruması", "Eski motor uyumlu", "Standart viskozite", "Güvenilir formül"],
  },
  "helix-hx5-20w-50": {
    name: "Shell Helix HX5 20W-50", grade: "20W-50", series: "Helix HX5", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: [],
    description: "Yüksek sıcaklıklarda ve yüksek mileajlı motorlarda kullanım için tasarlanmış yüksek viskoziteli mineral motor yağı. Sıcak iklimlerde güvenilir koruma sunar.",
    features: ["Yüksek viskozite güvenliği", "Sıcak iklim koruması", "Yaşlı motor desteği", "Standart mineral formül"],
  },
  "helix-hx3-20w-50": {
    name: "Shell Helix HX3 20W-50", grade: "20W-50", series: "Helix HX3", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: [],
    description: "Ekonomik mineral motor yağı. Standart bakım programları için minimum düzeyde motor koruması sağlar. Eski ve yüksek kilometreli motorlar için uygundur.",
    features: ["Ekonomik mineral yağ", "Standart koruma", "Geniş uyumluluk", "Temel bakım için ideal"],
  },
  "rimula-r2-extra-15w-40": {
    name: "Shell Rimula R2 Extra 15W-40", grade: "15W-40", series: "Rimula R2 Extra", type: "Ağır Hizmet",
    api: "CH-4/SL", acea: "E5",
    approvals: ["MAN M3275", "Volvo VDS-2"],
    description: "Ağır hizmet dizel motorları için geliştirilmiş güvenilir motor yağı. Çoklu katkı paketi sayesinde dizel araçlarda güvenilir koruma ve uzun motor ömrü sağlar.",
    features: ["Ağır hizmet dizel koruması", "Çoklu katkı paketi", "MAN ve Volvo onaylı", "Uzun motor ömrü"],
  },
  "rimula-r3-15w-40": {
    name: "Shell Rimula R3 15W-40", grade: "15W-40", series: "Rimula R3", type: "Ağır Hizmet",
    api: "CH-4/SL", acea: "E5",
    approvals: ["Cummins CES 20071", "MAN M3275", "Volvo VDS-2", "MB 228.3"],
    description: "Global ağır hizmet dizel motorları için tasarlanmış mineral bazlı motor yağı. Cummins, MAN, Volvo ve Mercedes-Benz onaylarıyla geniş filolar için ekonomik çözüm sunar.",
    features: ["Geniş filo uyumluluğu", "Cummins onaylı", "Ekonomik filo çözümü", "Güçlü yük altı koruması"],
  },
  "rimula-r3-multi-10w-30": {
    name: "Shell Rimula R3 Multi 10W-30", grade: "10W-30", series: "Rimula R3 Multi", type: "Ağır Hizmet",
    api: "CH-4/SL", acea: "E7",
    approvals: ["Cummins CES 20071", "MAN M3275", "Volvo VDS-2"],
    description: "Hem düşük hem yüksek sıcaklıklarda üstün performans gösteren çok dereceli ağır hizmet motor yağı. Geniş çalışma sıcaklık aralığı sayesinde soğuk start ve sıcak koruma sağlar.",
    features: ["Geniş sıcaklık aralığı", "Soğuk start üstünlüğü", "ACEA E7 sertifikalı", "Çok dereceli formül"],
  },
  "rimula-r4-l-15w-40": {
    name: "Shell Rimula R4 L 15W-40", grade: "15W-40", series: "Rimula R4 L", type: "Ağır Hizmet",
    api: "CI-4/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "MB 228.3", "Volvo VDS-3", "Renault RLD-2"],
    description: "Ağır hizmet kamyon ve otobüs motorları için geliştirilmiş yüksek performanslı motor yağı. EGR (Egzoz Gazı Resirkülasyonu) sistemli motorlarda üstün deposit kontrolü sağlar.",
    features: ["EGR motor uyumlu", "Üstün deposit kontrolü", "Uzun servis aralığı", "Çok OEM onaylı"],
  },
  "rimula-r4-x-15w-40": {
    name: "Shell Rimula R4 X 15W-40", grade: "15W-40", series: "Rimula R4 X", type: "Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "MB 228.3", "Volvo VDS-3"],
    description: "Yüksek stresli ağır hizmet motorlar için geliştirilmiş üstün performanslı motor yağı. R4 L'ye kıyasla daha güçlü katkı paketi ile zorlayıcı çalışma koşullarında ekstra koruma sağlar.",
    features: ["Ekstra stres koruması", "CI-4 Plus sertifikalı", "Güçlendirilmiş katkı paketi", "Yoğun çalışma uyumlu"],
  },
  "rimula-r5-e-10w-40": {
    name: "Shell Rimula R5 E 10W-40", grade: "10W-40", series: "Rimula R5 E", type: "Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "MB 228.5", "Volvo VDS-3", "Renault RLD-2"],
    description: "Uzun servis aralıkları için tasarlanmış sentetik teknoloji ağır hizmet motor yağı. Modern EGR motorlarda olağanüstü deposit kontrolü ve kısa mesafeli çalışmalarda güvenilir koruma sağlar.",
    features: ["Uzun servis aralığı", "EGR uyumlu", "MB 228.5 onaylı", "Sentetik teknoloji"],
  },
  "rimula-r5-le-10w-40": {
    name: "Shell Helix Rimula R5 LE 10W-40", grade: "10W-40", series: "Rimula R5 LE", type: "Ağır Hizmet",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "Volvo VDS-3", "MB 228.5"],
    description: "Düşük emisyonlu gelişmiş ağır hizmet motorları için geliştirilmiş sentetik teknoloji motor yağı. R5 E ile karşılaştırılabilir özellikler sunarken Euro motorlar için optimize edilmiştir.",
    features: ["Düşük emisyon uyumlu", "Euro motor optimizasyonu", "Sentetik teknoloji", "Çok OEM onaylı"],
  },
  "rimula-r6-lme-5w-30": {
    name: "Shell Rimula R6 LME 5W-30", grade: "5W-30", series: "Rimula R6 LME", type: "Ağır Hizmet",
    api: "CJ-4/SL", acea: "E6/E9",
    approvals: ["Volvo VDS-4", "Mack EO-O Premium Plus", "Cummins CES 20081", "MB 228.51"],
    description: "SCR (Seçici Katalitik Redüksiyon) ve DPF filtreleri ile donatılmış Euro 6 ağır hizmet motorları için geliştirilmiş tam sentetik motor yağı. En düşük sülfür içeriğiyle çevre dostu formül.",
    features: ["Euro 6 motor uyumlu", "SCR ve DPF uyumlu", "Low-SAPS formülü", "En üst düzey emisyon uyumu"],
  },
  "rimula-r6-me-5w-30": {
    name: "Shell Rimula R6 ME 5W-30", grade: "5W-30", series: "Rimula R6 ME", type: "Ağır Hizmet",
    api: "CJ-4/SL", acea: "E6/E9",
    approvals: ["MB 228.51", "Volvo VDS-4", "Cummins CES 20081", "MAN M3677"],
    description: "Mercedes-Benz ağır hizmet araçları için özel olarak optimize edilmiş tam sentetik motor yağı. MB 228.51 onayıyla Actros ve diğer MB kamyonlarda en uzun servis aralıklarını sunar.",
    features: ["MB 228.51 onaylı", "Actros motor uyumlu", "Maksimum servis aralığı", "Tam sentetik formül"],
  },
};

const SHELL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec> = {
  // ── Tellus — Hydraulic oils ───────────────────────────────────────
  "tellus-s2-mx-32": {
    name: "Shell Tellus S2 MX 32", grade: "ISO VG 32", series: "Tellus S2 MX", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-2", "Eaton (Vickers) I-286-S"],
    description: "Endüstriyel hidrolik sistemler için geliştirilmiş yüksek performanslı mineral hidrolik yağı. Üstün termal ve oksidasyon stabilitesi ile uzun sistem ömrü ve ekipman koruması sağlar.",
    features: ["Üstün oksidasyon stabilitesi", "Mükemmel filtre uyumluluğu", "Düşük köpük eğilimi", "Geniş sıcaklık aralığı performansı"],
  },
  "tellus-s2-mx-46": {
    name: "Shell Tellus S2 MX 46", grade: "ISO VG 46", series: "Tellus S2 MX", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-2", "Eaton (Vickers) I-286-S", "Cincinnati Machine P-68/P-69/P-70"],
    description: "En yaygın kullanılan endüstriyel viskozite derecesinde geliştirilmiş hidrolik yağı. Sabit sıcaklıklarda çalışan genel amaçlı hidrolik sistemler için idealdir.",
    features: ["Genel amaçlı hidrolik sistemler", "Üstün pompa koruması", "Hızlı su ayrışması", "Uzun yağ ömrü"],
  },
  "tellus-s2-mx-68": {
    name: "Shell Tellus S2 MX 68", grade: "ISO VG 68", series: "Tellus S2 MX", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-2", "Eaton (Vickers) I-286-S"],
    description: "Yüksek çalışma sıcaklıklarında ve ağır yük altında çalışan hidrolik sistemler için tasarlanmış mineral hidrolik yağı. Sanayi presleri ve büyük inşaat ekipmanları için uygundur.",
    features: ["Yüksek sıcaklık stabilitesi", "Ağır yük kapasitesi", "Üstün viskozite indeksi", "Aşınma önleyici formül"],
  },
  "tellus-s2-mx-100": {
    name: "Shell Tellus S2 MX 100", grade: "ISO VG 100", series: "Tellus S2 MX", type: "Hidrolik Yağ",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLP",
    approvals: ["Bosch Rexroth RE 90220", "Parker Denison HF-2"],
    description: "Yüksek viskoziteli uygulamalar ve ekstra yük kapasitesi gerektiren büyük hidrolik sistemler için geliştirilmiş mineral hidrolik yağı. Ağır presler ve sanayi tesisleri için idealdir.",
    features: ["Ekstra yük kapasitesi", "Büyük sistem uyumluluğu", "Termal stabilite", "Uzun servis aralığı"],
  },
  "tellus-s3-m-46": {
    name: "Shell Tellus S3 M 46", grade: "ISO VG 46", series: "Tellus S3 M", type: "Hidrolik Yağ (Küllüsüz)",
    api: "ISO 11158 HM", acea: "DIN 51524-2 HLPD",
    approvals: ["Parker Denison HF-0", "Bosch Rexroth RE 90220", "Eaton (Vickers) I-286-S", "Cincinnati Machine P-68/P-69/P-70"],
    description: "Çinko (ZAF) içermeyen küllüsüz formülasyonuyla çevre dostu hidrolik yağı. Gümüş ve magnezyum alaşımlı bileşenler içeren hassas hidrolik sistemler ve servo vanalar için idealdir.",
    features: ["Çinko içermeyen ZAF formül", "Gümüş alaşım uyumlu", "Servo vana uyumluluğu", "Üstün filtre uyumluluğu"],
  },
  // ── Omala — Industrial gear oils ─────────────────────────────────
  "omala-s2-gx-150": {
    name: "Shell Omala S2 GX 150", grade: "ISO VG 150", series: "Omala S2 GX", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC", acea: "DIN 51517-3 CLP",
    approvals: ["David Brown S1.53.101", "US Steel 224", "AGMA 9005-E02"],
    description: "Kapalı endüstriyel dişli kutular için geliştirilmiş yüksek basınç (EP) dişli yağı. Yüksek yük altında üstün dişli koruması ve uzun ömürlü servis sağlar.",
    features: ["Yüksek basınç koruması", "Uzun dişli ömrü", "David Brown onaylı", "Geniş dişli tipi uyumluluğu"],
  },
  "omala-s2-gx-220": {
    name: "Shell Omala S2 GX 220", grade: "ISO VG 220", series: "Omala S2 GX", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC/CKD", acea: "DIN 51517-3 CLP",
    approvals: ["David Brown S1.53.101", "US Steel 224", "AGMA 9005-E02", "Cincinnati Machine P-74"],
    description: "En yaygın kullanılan endüstriyel dişli yağı viskozitesinde geliştirilmiş EP dişli yağı. Redüktörler, konveyör sistemleri ve genel sanayi dişli kutularında mükemmel koruma sağlar.",
    features: ["En yaygın sanayi viskozitesi", "Redüktör uyumluluğu", "Aşınma ve korozyon koruması", "Uzun değişim aralığı"],
  },
  "omala-s2-gx-320": {
    name: "Shell Omala S2 GX 320", grade: "ISO VG 320", series: "Omala S2 GX", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC/CKD", acea: "DIN 51517-3 CLP",
    approvals: ["David Brown S1.53.101", "US Steel 224", "AGMA 9005-E02"],
    description: "Yüksek yük ve düşük devir uygulamaları için geliştirilmiş ağır hizmet EP dişli yağı. Büyük sanayi redüktörleri ve vinç sistemlerinde güvenilir koruma sunar.",
    features: ["Ağır hizmet yük kapasitesi", "Düşük devir uyumluluğu", "Vinç sistem koruması", "Güçlü EP katkı paketi"],
  },
  "omala-s2-gx-460": {
    name: "Shell Omala S2 GX 460", grade: "ISO VG 460", series: "Omala S2 GX", type: "Dişli Yağı EP",
    api: "ISO 12925-1 CKC/CKD", acea: "DIN 51517-3 CLP",
    approvals: ["David Brown S1.53.101", "US Steel 224", "AGMA 9005-E02"],
    description: "Çok yavaş devir ve çok yüksek yük altında çalışan büyük endüstriyel dişli sistemleri için geliştirilmiş ağır viskoziteli EP dişli yağı. Açık ocak madenciliği ve çelik sanayi uygulamaları için idealdir.",
    features: ["Çok yüksek yük kapasitesi", "Madencilik ekipman uyumluluğu", "Yüksek film kalınlığı", "Ekstrem basınç koruma"],
  },
  // ── Corena — Compressor oils ──────────────────────────────────────
  "corena-s3-r-46": {
    name: "Shell Corena S3 R 46", grade: "ISO VG 46", series: "Corena S3 R", type: "Kompresör Yağı",
    api: "ISO 6743-3A DAJ", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair"],
    description: "Döner vidalı ve döner paletli kompresörler için geliştirilmiş sentetik teknoloji kompresör yağı. 4.000 saate kadar uzun değişim aralığıyla işletme maliyetlerini düşürür.",
    features: ["4.000 saat değişim aralığı", "Döner vida kompresör uyumlu", "Düşük karbon birikimi", "Üstün oksidasyon direnci"],
  },
  "corena-s4-r-46": {
    name: "Shell Corena S4 R 46", grade: "ISO VG 46", series: "Corena S4 R", type: "Kompresör Yağı (Tam Sentetik)",
    api: "ISO 6743-3A DAJ/DAH", acea: "DIN 51506 VDL",
    approvals: ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair", "Gardner Denver"],
    description: "Döner vidalı kompresörler için geliştirilmiş tam sentetik kompresör yağı. 8.000 saate kadar uzatılmış değişim aralığı ve üstün termal stabilite ile yüksek sıcaklıklarda çalışan sistemler için idealdir.",
    features: ["8.000 saat değişim aralığı", "Tam sentetik formül", "Yüksek sıcaklık stabilitesi", "Minimum çamur oluşumu"],
  },
  // ── Gadus — Greases ──────────────────────────────────────────────
  "gadus-s2-v220-2": {
    name: "Shell Gadus S2 V220 2", grade: "NLGI 2", series: "Gadus S2 V220", type: "Gres Yağı EP",
    api: "ISO 6743-9 L-XBCHB 2", acea: "DIN 51825 KP2K-20",
    approvals: ["SKF EMGB", "FAG Arcanol"],
    description: "Genel amaçlı yüksek yük kapasiteli lityum kompleks gres yağı. Rulmanlı yataklar, dişli kutular ve santrifüj pompalar dahil geniş bir endüstriyel uygulama yelpazesinde üstün koruma sağlar.",
    features: ["Geniş uygulama yelpazesi", "Yüksek yük taşıma kapasitesi", "Su ve korozyon direnci", "Geniş sıcaklık aralığı (-20°C ile +120°C)"],
  },
  // ── Morlina — Bearing and circulating oils ────────────────────────
  "morlina-s2-bl-10": {
    name: "Shell Morlina S2 BL 10", grade: "ISO VG 10", series: "Morlina S2 BL", type: "Sirkülasyon / Türbin Yağı",
    api: "ISO 8068 TSA/TGA", acea: "DIN 51515-1 L-TD",
    approvals: ["Siemens TLV 9013 04", "General Electric GEK-32568"],
    description: "Buhar türbinleri, gaz türbinleri ve sirkülasyon sistemleri için geliştirilmiş yüksek kaliteli yağlama yağı. Mükemmel su ayrışma özelliği ve uzun ömürlü oksidasyon stabilitesiyle kesintisiz işletim sağlar.",
    features: ["Turbine-grade su ayrışması", "Uzun oksidasyon ömrü", "Düşük köpük eğilimi", "Siemens ve GE onaylı"],
  },
  // ── Tonna — Slideway oils ─────────────────────────────────────────
  "tonna-s3-m-68": {
    name: "Shell Tonna S3 M 68", grade: "ISO VG 68", series: "Tonna S3 M", type: "Kızak Yağı",
    api: "ISO 6743-13 G", acea: "DIN 51502 CGLP",
    approvals: ["Cincinnati Machine P-47", "Mori Seiki", "Mazak"],
    description: "Tezgah kızakları ve kayar tablalar için geliştirilmiş özel kızak yağı. Stick-slip önleyici formülasyonu sayesinde hassas ilerleme hareketi ve titreşimsiz çalışma sağlar.",
    features: ["Stick-slip önleme", "Hassas ilerleme kontrolü", "Titreşimsiz çalışma", "CNC tezgah uyumluluğu"],
  },
  // ── Diala — Transformer oils ──────────────────────────────────────
  "diala-s4-zx-i": {
    name: "Shell Diala S4 ZX-I", grade: "Sınıf II İnhibisyonlu", series: "Diala S4 ZX-I", type: "Trafo Yağı",
    api: "IEC 60296 Sınıf II", acea: "IEC 60422 / ASTM D3487",
    approvals: ["ABB", "Siemens", "Schneider Electric"],
    description: "Güç transformatörleri ve yüksek voltajlı şalt ekipmanları için geliştirilmiş ultra yüksek performanslı mineral izolasyon yağı. Üstün termal ve elektriksel özellikleriyle uzun ekipman ömrü sağlar.",
    features: ["Üstün dielektrik dayanımı", "Düşük viskozite — gelişmiş soğutma", "Uzun oksidasyon ömrü", "ABB ve Siemens onaylı"],
  },
};

const SHELL_INDUSTRIAL_TDS: Record<string, string> = {
  "tellus-s2-mx-32":  "https://shop.sclubricants.com/pub/media/pds/shell/Shell-Tellus-S2-MX-32-datasheet.pdf",
  "tellus-s2-mx-46":  "https://shop.sclubricants.com/pub/media/pds/shell/Shell-Tellus-S2-MX-46-datasheet.pdf",
  "tellus-s2-mx-68":  "https://www.shell-livedocs.com/data/published/en-US/8f37ea23-3102-469c-b713-d626763986eb.pdf",
  "tellus-s2-mx-100": "https://www.shell-livedocs.com/data/published/en/19df5d2e-25af-4dc3-8146-c9bd59f3aef6.pdf",
  "tellus-s3-m-46":   "https://shell-livedocs.com/data/published/en-US/bd4fbbf9-1e0e-4e04-b94c-1b7c57d9dcef.pdf",
  "omala-s2-gx-150":  "https://www.shell-livedocs.com/data/published/en-IN/0530261d-8c39-4a0c-b6d9-264e70c2feb5.pdf",
  "omala-s2-gx-220":  "https://www.shell-livedocs.com/data/published/en-US/bc85410c-fb55-471a-85c3-db729dddf42b.pdf",
  "omala-s2-gx-320":  "https://industrialfluidsmfg.twinoils.com/Asset/Omala%20S2%20GX%20320.pdf",
  "omala-s2-gx-460":  "https://www.shell.com.mx/business-customers/lubricants-for-business/factory/omala-s2-gx/_jcr_content/root/main/section_copy_copy_co/simple_copy/text.multi.stream/1718106832203/ad3b822dcc66d975652dcd2a378f7dc3fcc1c3c5/omala-s2-gx-460-ing-1.pdf",
  "corena-s3-r-46":   "https://www.shell-livedocs.com/data/published/en-US/dc6df9c2-06a8-4400-9ee2-fb21567f3405.pdf",
  "corena-s4-r-46":   "https://www.shell-livedocs.com/data/published/en-CA/68bcf258-084d-486a-8943-b1844971b4d4.pdf",
  "gadus-s2-v220-2":  "https://shop.sclubricants.com/pub/media/pds/shell/Shell-Gadus-S2-V220-2-datasheet.pdf",
  "morlina-s2-bl-10": "https://www.lubefinder.com/document/Shell_Morlina_S2_BL_10_TDS_v1.4.pdf",
  "tonna-s3-m-68":    "https://fandl.com/content/tds/tonnas3m68_tds.pdf",
  "diala-s4-zx-i":    "https://www.shell.com/business-customers/lubricants-for-business/sector-expertise/power-industry/wind-power/windeurope-electric-city/_jcr_content/root/main/section/simple_2118681472/text.multi.stream/1726581236629/30ce6e8d9d69ebdcb19c946c00e1644ec7507965/shell-diala-s4-zx-i-tds.pdf",
};

// ── Motor & industrial TDS maps — non-Shell brands ───────────────────────

// Motor TDS are served from local /public/docs/[brand]/tds/ files (same pattern as Shell motor).

const MOBIL_INDUSTRIAL_TDS: Record<string, string> = {
  "dte-10-excel-32":   "https://hascooil.com/wp-content/uploads/2016/05/Mobil-DTE-10-Excel%E2%84%A2-Series-pds.pdf",
  "dte-10-excel-46":   "https://www.e-lubritec.com/docs/PROD/MOBIL/MB10468/FT_MB_Mobil_DTE_10_Excel_46.pdf",
  "dte-10-excel-68":   "https://hascooil.com/wp-content/uploads/2016/05/Mobil-DTE-10-Excel%E2%84%A2-Series-pds.pdf",
  "dte-10-excel-100":  "https://hascooil.com/wp-content/uploads/2016/05/Mobil-DTE-10-Excel%E2%84%A2-Series-pds.pdf",
  "shc-630":           "https://www.ulei-mobil.ro/pdf/MobilIndustrieDataSheet/SHC%20600%20Series%20pds.pdf",
  "shc-632":           "https://www.ulei-mobil.ro/pdf/MobilIndustrieDataSheet/SHC%20600%20Series%20pds.pdf",
  "rarus-427":         "http://www.ulei-mobil.ro/pdf/MobilIndustrieDataSheet/mobil_rarus%20427.pdf",
  "rarus-shc-1024":    "https://petroleumservicecompany.com/content/pdfs/MOBIL_SHC_RARUS_PDS.pdf",
  "vactra-2":          "https://www.lubefinder.com/document/Mobil_Vactra_Oil_Numbered_Series_TDS.pdf",
  "grease-xhp-222":    "https://www.perma-tec.com/_Resources/Lubricants/Exxon%20Mobil/MOBILGREASE_XHP_222_TDS_en.pdf",
};


const CASTROL_INDUSTRIAL_TDS: Record<string, string> = {
  "hyspin-aws-32":          "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/6E9106BC3CB9751880257796002FD14E/$File/456615_GB_en.pdf",
  "hyspin-aws-46":          "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/984C9A119EA7634280258A690009B4F4/$File/bpxe-9cg55e.pdf",
  "hyspin-aws-68":          "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/5E7B172C092D6A5480257796002FD252/$File/456618_GB_en.pdf",
  "hyspin-aws-100":         "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/820FBAB013280A1C8025825E003A3F1C/$File/Hyspin%20AWS.pdf",
  "optigear-bm-100":        "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/335864C2836FA61A8025779600300F80/$File/450750_DE_en.pdf",
  "optigear-bm-220":        "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/3D12EB87C8DE0A158025779600301067/$File/450752_DE_en.pdf",
  "tribol-1100-220":        "https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/95F8CB74C474E513802577960030489F/$File/Tribol%201100.pdf",
  "aircol-sn-46":           "#",
  "molub-alloy-860-220-2-el":"https://msdspds.castrol.com/bpglis/FusionPDS.nsf/Files/5B441A56917A0C9180257796002FFF73/$File/Molub-Alloy%20860-220.pdf",
};


const TOTAL_INDUSTRIAL_TDS: Record<string, string> = {
  "azolla-zs-32":      "https://totalenergies.com.au/system/files/atoms/files/tds_total_azolla_zs_68_164_202010_en.pdf",
  "azolla-zs-46":      "https://totalenergies.com.au/system/files/atoms/files/tds_total_azolla_zs_68_164_202010_en.pdf",
  "azolla-zs-68":      "https://totalenergies.com.au/system/files/atoms/files/tds_total_azolla_zs_68_164_202010_en.pdf",
  "azolla-zs-100":     "https://totaloilnz.co.nz/technical-documents/4063.pdf",
  "carter-ep-220":     "https://totalenergies.com.au/system/files/atoms/files/tds_total_carter_ep_68_100_150_220_320_460_680_1000_186_201907_en.pdf",
  "carter-ep-320":     "https://totalenergies.com.au/system/files/atoms/files/tds_total_carter_ep_68_100_150_220_320_460_680_1000_186_201907_en.pdf",
  "planetelf-acd-46":  "https://totalenergies.com.au/system/files/atoms/files/tds_total_planetelf_acd_32_46_68_100fy_ggm_202008_en.pdf",
  "multis-ep-2":       "https://totaloilnz.co.nz/technical-documents/4172.pdf",
  "biohydran-tmp-46":  "https://www.totallubmarine.com/sites/default/files/products/tds/TDS_BIOHYDRAN_TMP_32_46_68_100_R1.pdf",
};


const MOTUL_INDUSTRIAL_TDS: Record<string, string> = {
  "gear-300-ls-75w-90":  "https://azupim01.motul.com/media/motulData/DO/base/gear_300_ls_75w-90_en_fr_motultech.pdf",
  "gear-300-75w-90":     "https://azupim01.motul.com/media/motulData/DO/base/GEAR_300_75W-90_en_FR_motul_34200_20211021.pdf",
  "atf-vi":              "https://azupim01.motul.com/media/motulData/DO/base/ATF_VI_en_FR_motul_19280_20210809.pdf",
  "multi-dctf":          "https://azupim01.motul.com/media/motulData/DO/base/MULTI_DCTF_en_FR_motul_45611_20210712.pdf",
  "hydraulic-sus-46":    "#",
  "hydraulic-sus-68":    "#",
  "coolant-ultra-37":    "https://azupim01.motul.com/media/motulData/DO/base/auto_cool_g13_-37_en_fr_motul_20200519.pdf",
  "inugel-g13-ultra":    "https://azupim01.motul.com/media/motulData/DO/base/inugel_g13_ultra_es_es_motul_20191127.pdf",
};


const TEXACO_INDUSTRIAL_TDS: Record<string, string> = {
  "meropa-xl-220":  "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=453209&docFormat=PDF",
  "meropa-xl-320":  "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=453209&docFormat=PDF",
  "meropa-xl-460":  "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=453209&docFormat=PDF",
  "rando-hdz-32":   "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=323788&docFormat=PDF",
  "rando-hdz-46":   "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=323788&docFormat=PDF",
  "rando-hdz-68":   "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=323788&docFormat=PDF",
  "cetus-pao-46":   "https://www.chevronmarineproducts.com/content/dam/chevron-marine/pds-2020/Chevron_PDS_Compressor%20Oils_CetusPAO_v0920.pdf",
  "multifak-ep-2":  "https://cglapps.chevron.com/sdspds/PDSDetailPage.aspx?docDataId=338116&docFormat=PDF",
  "novatex-gp-2":   "https://cglapps.chevron.com/msdspds/PDSDetailPage.aspx?docDataId=579359&docFormat=PDF",
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
  texaco:  { name: "Texaco",      primary: "#CC0000", secondary: "#880000", accent: "#ffffff", accentText: "#CC0000" },
};

// ── MOBIL ─────────────────────────────────────────────────────────────────

const MOBIL_MOTOR_PRODUCTS: Record<string, ProductSpec> = {
  "1-esp-x2-0w-20": {
    name: "Mobil 1 ESP X2 0W-20", grade: "0W-20", series: "Mobil 1 ESP X2", type: "Tam Sentetik",
    api: "SN/CF", acea: "C5",
    approvals: ["BMW LL-17FE+", "MB 229.71", "VW 508 00/509 00"],
    description: "BMW'nin son teknoloji verimlilik standardı LL-17FE+'yı karşılayan ultra düşük viskoziteli tam sentetik motor yağı. Yakıt ekonomisini maksimize ederken üstün motor koruması sağlar.",
    features: ["BMW LL-17FE+ onaylı", "Ultra düşük viskozite", "Maksimum yakıt ekonomisi", "Hibrit araç uyumlu"],
  },
  "1-esp-0w-30": {
    name: "Mobil 1 ESP 0W-30", grade: "0W-30", series: "Mobil 1 ESP", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["MB 229.51", "MB 229.31", "Porsche A40"],
    description: "Mercedes-Benz ve Porsche araçları için özel olarak geliştirilmiş tam sentetik ESP motor yağı. ACEA C3 sertifikasyonuyla DPF filtreli araçlarda üstün koruma sağlar.",
    features: ["MB 229.51 onaylı", "Porsche A40 onaylı", "DPF uyumlu Low-SAPS", "Soğuk başlangıç üstünlüğü"],
  },
  "1-esp-5w-30": {
    name: "Mobil 1 ESP 5W-30", grade: "5W-30", series: "Mobil 1 ESP", type: "Tam Sentetik",
    api: "SN/CF", acea: "C3",
    approvals: ["BMW LL-04", "MB 229.51", "VW 504 00/507 00"],
    description: "En geniş OEM onay portföyüne sahip tam sentetik ESP motor yağı. BMW, Mercedes-Benz ve Volkswagen Group araçlarında DPF koruma ve uzun servis aralığı sunar.",
    features: ["BMW LL-04 onaylı", "MB 229.51 onaylı", "VW 504/507 uyumlu", "Uzun değişim aralığı"],
  },
  "1-esp-x4-0w-40": {
    name: "Mobil 1 ESP X4 0W-40", grade: "0W-40", series: "Mobil 1 ESP X4", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Yüksek performanslı spor ve lüks araçlar için geliştirilmiş tam sentetik ESP motor yağı. Geniş sıcaklık aralığında maksimum motor koruması ve yakıt verimliliği sağlar.",
    features: ["MB 229.5 onaylı", "Spor araç uyumlu", "Geniş çalışma sıcaklığı", "Yüksek yük altı koruması"],
  },
  "1-fs-5w-40": {
    name: "Mobil 1 FS 5W-40", grade: "5W-40", series: "Mobil 1 FS", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["VW 502 00/505 00", "MB 229.3", "Porsche A40"],
    description: "Dünya çapında milyonlarca araç tarafından güvenilen tam sentetik motor yağı. Geniş OEM onay portföyüyle hem Avrupa hem de küresel araç modelleri için mükemmel koruma sağlar.",
    features: ["Küresel OEM onayları", "Yıl boyu koruma", "VW ve Porsche onaylı", "Sürüklenme karşıtı formül"],
  },
  "1-new-life-0w-40": {
    name: "Mobil 1 New Life 0W-40", grade: "0W-40", series: "Mobil 1 New Life", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.5", "Porsche A40", "Renault RN0700"],
    description: "Sıfırdan itibaren motorunuzu koruyan tam sentetik motor yağı. Mercedes-Benz ve Porsche yüksek performanslı motorları için optimize edilmiş formülasyonuyla üstün oksidasyon direnci sağlar.",
    features: ["Yüksek performans motor uyumlu", "MB 229.5 onaylı", "Sıfır kilometre koruması", "Üstün oksidasyon direnci"],
  },
  "super-3000-fe-5w-30": {
    name: "Mobil Super 3000 FE 5W-30", grade: "5W-30", series: "Mobil Super 3000 FE", type: "Tam Sentetik",
    api: "SN/CF", acea: "A5/B5",
    approvals: ["Ford WSS-M2C913-D", "Renault RN0700"],
    description: "Yakıt ekonomisi odaklı tam sentetik motor yağı. Ford EcoBoost motorlarda mükemmel performans gösteren düşük sürtünmeli formülasyonuyla günlük kullanım için idealdir.",
    features: ["Ford EcoBoost uyumlu", "Yakıt tasarruf odaklı", "A5/B5 sertifikalı", "Soğuk başlangıç kolaylığı"],
  },
  "super-3000-x1-5w-40": {
    name: "Mobil Super 3000 X1 5W-40", grade: "5W-40", series: "Mobil Super 3000 X1", type: "Tam Sentetik",
    api: "SN/CF", acea: "A3/B3/B4",
    approvals: ["MB 229.3", "VW 502 00/505 00", "Renault RN0700/RN0710"],
    description: "Geniş bir araç yelpazesi için güvenilir tam sentetik motor yağı. Yüksek sıcaklık koruması ve uzun motor temizliği ile yoğun şehir trafiğinde üstün performans gösterir.",
    features: ["Tam sentetik formül", "Yüksek ısı koruması", "Motor temizleyici özellik", "Geniş araç uyumu"],
  },
  "super-2000-10w-40": {
    name: "Mobil Super 2000 10W-40", grade: "10W-40", series: "Mobil Super 2000", type: "Yarı Sentetik",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["VW 501 01/505 00", "MB 229.1"],
    description: "Geniş bir araç yelpazesinde güvenilir koruma sunan yarı sentetik motor yağı. Ekonomik formülasyonuyla hem benzinli hem dizel motorlarda standart bakım ihtiyaçlarını karşılar.",
    features: ["Ekonomik yarı sentetik", "Geniş motor uyumu", "VW ve MB onaylı", "Benzinli/dizel uyumlu"],
  },
  "delvac-1-esp-5w-30": {
    name: "Mobil Delvac 1 ESP 5W-30", grade: "5W-30", series: "Mobil Delvac 1 ESP", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CK-4/SN", acea: "E6/E9",
    approvals: ["Volvo VDS-4.5", "Mack EO-O Premium Plus", "Cummins CES 20086", "MB 228.51"],
    description: "Son nesil ağır hizmet dizel motorları için geliştirilmiş tam sentetik ESP motor yağı. SCR ve DPF sistemleriyle tam uyumlu Low-SAPS formülasyonuyla Euro 6 standartlarını karşılar.",
    features: ["Euro 6 motor uyumlu", "SCR/DPF koruması", "Low-SAPS formülü", "CK-4 sertifikalı"],
  },
  "delvac-1-esp-5w-40": {
    name: "Mobil Delvac 1 ESP 5W-40", grade: "5W-40", series: "Mobil Delvac 1 ESP", type: "Tam Sentetik (Ağır Hizmet)",
    api: "CJ-4/SN", acea: "E7",
    approvals: ["Volvo VDS-4", "Mack EO-O Premium Plus", "Cummins CES 20081", "MB 228.51"],
    description: "Ağır hizmet kamyon ve otobüs motorları için yüksek performanslı tam sentetik motor yağı. Uzun servis aralıkları ve üstün deposit kontrolü ile işletme maliyetlerini düşürür.",
    features: ["Uzun servis aralığı", "EGR uyumlu", "Üstün deposit kontrolü", "Yakıt ekonomisi"],
  },
  "delvac-1300-super-15w-40": {
    name: "Mobil Delvac 1300 Super 15W-40", grade: "15W-40", series: "Mobil Delvac 1300 Super", type: "Mineral (Ağır Hizmet)",
    api: "CI-4 Plus/SL", acea: "E7",
    approvals: ["Cummins CES 20076", "MAN M3275", "MB 228.3", "Volvo VDS-3"],
    description: "Ağır hizmet dizel motorları için güvenilir ve ekonomik mineral motor yağı. Geniş OEM onay portföyüyle büyük filolar için maliyet etkin çözüm sunar.",
    features: ["Geniş filo uyumluluğu", "Ekonomik mineral formül", "Çok OEM onaylı", "Güvenilir ağır hizmet koruması"],
  },
  "super-1000-15w-40": {
    name: "Mobil Super 1000 15W-40", grade: "15W-40", series: "Mobil Super 1000", type: "Mineral",
    api: "SL/CF", acea: "A3/B3",
    approvals: ["MB 229.1"],
    description: "Standart bakım gereksinimlerini karşılayan güvenilir mineral motor yağı. Eski nesil benzinli ve dizel motorlarda temel koruma sağlayan ekonomik seçenek.",
    features: ["Temel motor koruması", "Ekonomik mineral yağ", "Eski motor uyumlu", "Güvenilir standart performans"],
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

// ── Brand product lookup maps ──────────────────────────────────────────────

const BRAND_MOTOR_PRODUCTS: Record<string, Record<string, ProductSpec>> = {
  shell: SHELL_MOTOR_PRODUCTS,
  mobil: MOBIL_MOTOR_PRODUCTS,
  castrol: CASTROL_MOTOR_PRODUCTS,
  total: TOTAL_MOTOR_PRODUCTS,
  motul: MOTUL_MOTOR_PRODUCTS,
  texol: TEXOL_MOTOR_PRODUCTS,
  texaco: TEXACO_MOTOR_PRODUCTS,
};

const BRAND_INDUSTRIAL_PRODUCTS: Record<string, Record<string, ProductSpec>> = {
  shell: SHELL_INDUSTRIAL_PRODUCTS,
  mobil: MOBIL_INDUSTRIAL_PRODUCTS,
  castrol: CASTROL_INDUSTRIAL_PRODUCTS,
  total: TOTAL_INDUSTRIAL_PRODUCTS,
  motul: MOTUL_INDUSTRIAL_PRODUCTS,
  texol: TEXOL_INDUSTRIAL_PRODUCTS,
  texaco: TEXACO_INDUSTRIAL_PRODUCTS,
};

function getTdsUrl(brandSlug: string, category: string, product: string): string {
  const isIndustrial = category === "endustriyel-yaglar";
  if (!isIndustrial) {
    // Motor oils — served from local public/docs/[brand]/tds/ files
    return `/docs/${brandSlug}/tds/${product}.pdf`;
  }
  // Industrial oils — external URL maps
  switch (brandSlug) {
    case "shell":   return SHELL_INDUSTRIAL_TDS[product]   ?? "#";
    case "mobil":   return MOBIL_INDUSTRIAL_TDS[product]   ?? "#";
    case "castrol": return CASTROL_INDUSTRIAL_TDS[product] ?? "#";
    case "total":   return TOTAL_INDUSTRIAL_TDS[product]   ?? "#";
    case "motul":   return MOTUL_INDUSTRIAL_TDS[product]   ?? "#";
    case "texaco":  return TEXACO_INDUSTRIAL_TDS[product]  ?? "#";
    default:        return "#";
  }
}

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
  const { slug, category, product } = await params;

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

  // Use message-file translations when available; fall back to TypeScript data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pd = await getTranslations("pd" as any);
  let translatedType = spec.type;
  let translatedDesc = spec.description;
  let translatedFeatures = spec.features;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key = product as any;
    translatedType = pd(`${key}.type`);
    translatedDesc = pd(`${key}.description`);
    translatedFeatures = [pd(`${key}.f0`), pd(`${key}.f1`), pd(`${key}.f2`), pd(`${key}.f3`)];
  } catch {
    // fallback already set above
  }

  const { series, grade, api, acea, approvals } = spec;

  const backLabel = isIndustrial
    ? t("backToIndustrial", { brand: brandConfig.name })
    : t("backToMotor", { brand: brandConfig.name });

  const tdsUrl = getTdsUrl(brandSlug, category, product);
  const tdsAvailable = tdsUrl !== "#";

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

            {/* Styled product "image" */}
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

      {/* Documents */}
      <section className="pb-8">
        <div className="container-xl">
          <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
            <h2 className="text-xl font-bold text-brand-900 mb-5">{t("documents")}</h2>
            {tdsAvailable ? (
              <div className="flex flex-wrap gap-4">
                <a
                  href={tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-brand-200 rounded-[var(--radius-card)] px-5 py-4 hover:border-brand-400 hover:bg-brand-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: primary }}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900 text-sm group-hover:text-brand-700 transition-colors">
                      {t("tdsLabel")}
                    </p>
                    <p className="text-brand-400 text-xs">PDF — {spec.name}</p>
                  </div>
                </a>
              </div>
            ) : (
              <p className="text-brand-400 text-sm">{t("tdsNotAvailable")}</p>
            )}
            <p className="text-brand-400 text-xs mt-4">{t("docsNote")}</p>
          </div>
        </div>
      </section>

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
