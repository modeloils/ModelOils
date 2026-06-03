#!/usr/bin/env python3
"""
Apply Mobil product data to:
  src/app/[locale]/brands/[slug]/[category]/[product]/page.tsx
  src/app/[locale]/brands/[slug]/[category]/page.tsx
  messages/{en,tr,ru,fa}.json

Run scrape_mobil.py first to download images.
Set ANTHROPIC_API_KEY for ru/fa translations.

Run from project root:
    python scripts/apply_mobil.py
"""

import json, os, re, sys

BASE     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS  = os.path.dirname(os.path.abspath(__file__))
MSG      = os.path.join(BASE, "messages")
LOC      = os.path.join(BASE, "src", "app", "[locale]", "brands", "[slug]", "[category]")
DETAIL   = os.path.join(LOC, "[product]", "page.tsx")
CAT      = os.path.join(LOC, "page.tsx")
SCRAPED  = os.path.join(SCRIPTS, "mobil_scraped.json")

# ── Product data ──────────────────────────────────────────────────────────────

MOTOR: list[dict] = [
    {   "slug": "1-extended-life-10w-60",
        "name": "Mobil 1 Extended Life 10W-60", "grade": "10W-60",
        "series": "Mobil 1 Extended Life", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "A3/B4",
        "approvals": ["BMW Longlife-98", "Porsche A40", "MB 229.3"],
        "description": "BMW M serisi ve yüksek performanslı spor araçlar için formüle edilmiş geniş viskozite aralıklı tam sentetik motor yağı. Aşırı sürüş koşullarında üstün film dayanımı ve termal stabilite sağlar.",
        "features": ["BMW Longlife-98 onaylı", "Yüksek yük film dayanımı", "Spor motor koruması", "Porsche A40 uyumlu"],
        "fd": "Yüksek performanslı spor araçlar ve BMW M serisi için tasarlanmış üst düzey tam sentetik motor yağı.\n\nAşırı motor sıcaklıkları ve yüksek devirde bile stabil viskozite filmi koruyan gelişmiş formülasyonuyla motorsiklet ve spor araç sürüşünde maksimum motor ömrü sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Yüksek hız ve yük altında üstün film koruması\n• BMW M serisi sürüş koşullarına özel formüle edilmiştir\n• Gelişmiş termal ve oksidasyon stabilitesi\n• Geniş sıcaklık aralığında viskozite stabilitesi\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B4\nBMW Longlife-98\nPorsche A40\nMB 229.3",
        "en_type": "Fully Synthetic",
        "en_desc": "Wide-viscosity fully synthetic motor oil for BMW M-series and high-performance sports cars. Maintains superior film protection under extreme engine loads and temperatures.",
        "en_feat": ["BMW Longlife-98 approved", "High-load film strength", "Sports engine protection", "Porsche A40 compatible"],
    },
    {   "slug": "1-fs-new-life-0w-40",
        "name": "Mobil 1 FS New Life 0W-40", "grade": "0W-40",
        "series": "Mobil 1 FS New Life", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "A3/B3/B4",
        "approvals": ["MB 229.5", "Porsche A40", "Renault RN0700"],
        "description": "Sıfır kilometreden itibaren motorunuzu korumak üzere geliştirilmiş tam sentetik motor yağı. Mercedes-Benz ve Porsche onaylı formülasyonuyla yüksek performanslı motorda üstün oksidasyon direnci sağlar.",
        "features": ["Sıfır km'den tam koruma", "MB 229.5 onaylı", "Porsche A40 onaylı", "Üstün oksidasyon direnci"],
        "fd": "Sıfır kilometreden itibaren motorunuzu korumak üzere özel olarak formüle edilmiş üst düzey tam sentetik motor yağı.\n\nFS teknolojisiyle yeni araç servis aralıklarının uzatılmasına katkıda bulunurken motorunuzu ilk günden itibaren optimum koruma altında tutar.\n\nPERFORMANS ÖZELLİKLERİ\n• Sıfır kilometreden itibaren tam sentetik koruma\n• Yüksek sıcaklıklarda üstün oksidasyon ve termal stabilite\n• Soğuk start anında hızlı yağlama\n• Uzun motor ömrü için deposit önleme\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nMB 229.5\nPorsche A40\nRenault RN0700",
        "en_type": "Fully Synthetic",
        "en_desc": "Fully synthetic motor oil engineered to protect your engine from new. MB 229.5 and Porsche A40 approved, delivering outstanding oxidation resistance in high-performance engines.",
        "en_feat": ["From-new engine protection", "MB 229.5 approved", "Porsche A40 approved", "Superior oxidation resistance"],
    },
    {   "slug": "1-esp-formula-5w-30",
        "name": "Mobil 1 ESP Formula 5W-30", "grade": "5W-30",
        "series": "Mobil 1 ESP Formula", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "C3",
        "approvals": ["BMW LL-04", "MB 229.51", "VW 504.00/507.00"],
        "description": "Emisyon sonrası sistemleri koruyan ACEA C3 sınıfı tam sentetik ESP motor yağı. BMW, Mercedes-Benz ve Volkswagen DPF filtreli araçlarında uzun servis aralığı sağlar.",
        "features": ["BMW LL-04 onaylı", "MB 229.51 onaylı", "VW 504/507 uyumlu", "DPF/GPF koruması"],
        "fd": "Emisyon sonrası sistemleri koruyan, modern dizel ve benzinli motorlar için geliştirilmiş tam sentetik ESP motor yağı.\n\nDüşük SAPS formülasyonuyla dizel partikül filtreleri (DPF) ve benzin partikül filtrelerini (GPF) temiz tutarken uzun servis aralıklarında optimum motor koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• DPF ve GPF filtrelerini korur\n• Uzun servis aralığı performansı\n• Üstün soğuk start koruması\n• Motor temizleyici formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3\nBMW LL-04\nMB 229.51\nVW 504.00/507.00",
        "en_type": "Fully Synthetic",
        "en_desc": "ACEA C3 fully synthetic ESP motor oil protecting emission aftertreatment systems. Delivers extended service intervals in BMW, Mercedes-Benz and VW DPF-equipped vehicles.",
        "en_feat": ["BMW LL-04 approved", "MB 229.51 approved", "VW 504/507 compatible", "DPF/GPF protection"],
    },
    {   "slug": "1-esp-5w-30-dexos2",
        "name": "Mobil 1 ESP 5W-30 Dexos2", "grade": "5W-30",
        "series": "Mobil 1 ESP", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "C3",
        "approvals": ["GMW16177 (dexos2)", "BMW LL-04", "MB 229.51", "VW 504.00/507.00"],
        "description": "GM dexos2 lisanslı tam sentetik ESP motor yağı. DPF ve GPF filtreli benzinli ve dizel Opel/Vauxhall ve GM araçlarında üstün emisyon sistemi koruması sağlar.",
        "features": ["dexos2 lisanslı", "BMW LL-04 onaylı", "MB 229.51 onaylı", "GPF/DPF uyumlu"],
        "fd": "GM dexos2 lisanslı, partikül filtreli araçlar için özel olarak formüle edilmiş tam sentetik ESP motor yağı.\n\nModern benzinli ve dizel motorların gelişmiş emisyon sistemleriyle tam uyumlu düşük SAPS formülasyonuyla GPF ve DPF filtrelerini korurken optimum motor performansı sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• GM dexos2 lisanslı geniş araç uyumu\n• GPF ve DPF emisyon sistemi koruması\n• Gelişmiş motor temizliği ve koruma\n• Uzun servis aralığı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3\nGMW16177 (dexos2)\nBMW LL-04\nMB 229.51\nVW 504.00/507.00",
        "en_type": "Fully Synthetic",
        "en_desc": "GM dexos2 licensed fully synthetic ESP motor oil for petrol and diesel engines with DPF or GPF filters. Approved by BMW, Mercedes-Benz and Volkswagen Group.",
        "en_feat": ["dexos2 licensed", "BMW LL-04 approved", "MB 229.51 approved", "GPF/DPF compatible"],
    },
    {   "slug": "1-fs-5w-50",
        "name": "Mobil 1 FS 5W-50", "grade": "5W-50",
        "series": "Mobil 1 FS", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "A3/B4",
        "approvals": ["Porsche A40", "MB 229.5", "BMW Longlife-98"],
        "description": "Yüksek performanslı spor araçlar ve yarış motorları için geliştirilmiş geniş viskozite aralıklı tam sentetik motor yağı. Yüksek devirde ve aşırı sıcaklıklarda üstün motor koruması sağlar.",
        "features": ["Yüksek RPM koruması", "Porsche A40 onaylı", "Aşırı ısı stabilitesi", "Spor sürüş formülü"],
        "fd": "Yüksek devirli spor araçlar ve yarış motorları için özel olarak tasarlanmış tam sentetik motor yağı.\n\nGeniş viskozite aralığıyla hem soğuk start anında hızlı yağlama sağlar hem de yüksek sıcaklıklarda film kalınlığını koruyarak motor parçalarını maksimum düzeyde korur.\n\nPERFORMANS ÖZELLİKLERİ\n• Yüksek devir ve yük altında üstün film dayanımı\n• Soğuk start ve sıcak çalışma koşullarında stabilite\n• Aşırı termal koşullarda oksidasyon direnci\n• Motor deposit ve çamur oluşumunu engelleme\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B4\nPorsche A40\nMB 229.5\nBMW Longlife-98",
        "en_type": "Fully Synthetic",
        "en_desc": "Wide-viscosity fully synthetic motor oil for high-performance sports cars and racing engines. Delivers superior engine protection at high RPM and extreme temperatures.",
        "en_feat": ["High-RPM protection", "Porsche A40 approved", "Extreme heat stability", "Sports performance formula"],
    },
    {   "slug": "1-esp-x3-0w-40",
        "name": "Mobil 1 ESP X3 0W-40", "grade": "0W-40",
        "series": "Mobil 1 ESP X3", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "A3/B4",
        "approvals": ["MB 229.5", "Porsche A40", "Renault RN0700"],
        "description": "Yüksek performanslı Avrupa araçları için geliştirilmiş ESP tam sentetik motor yağı. MB 229.5, Porsche A40 ve Renault onaylı geniş OEM portföyüyle üstün motor koruması sağlar.",
        "features": ["MB 229.5 onaylı", "Porsche A40 onaylı", "Geniş araç uyumu", "Yüksek yük dayanımı"],
        "fd": "Yüksek performanslı Avrupa araçları için tasarlanmış, Emisyon Sistemi Koruma (ESP) teknolojili tam sentetik motor yağı.\n\nMercedes-Benz 229.5 ve Porsche A40 onaylı formülasyonuyla performanslı araçlarda uzun motor ömrü ve üstün yüksek sıcaklık koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• MB 229.5 ve Porsche A40 onaylı koruma\n• Geniş sıcaklık aralığında viskozite stabilitesi\n• Üstün aşınma ve yük koruması\n• Hızlı soğuk start yağlaması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B4\nMB 229.5\nPorsche A40\nRenault RN0700",
        "en_type": "Fully Synthetic",
        "en_desc": "Fully synthetic ESP motor oil for high-performance European vehicles. MB 229.5 and Porsche A40 approved, with broad OEM coverage and superior high-temperature protection.",
        "en_feat": ["MB 229.5 approved", "Porsche A40 approved", "Broad vehicle compatibility", "High-load durability"],
    },
    {   "slug": "super-3000-formula-fe-5w-30",
        "name": "Mobil Super 3000 Formula FE 5W-30", "grade": "5W-30",
        "series": "Mobil Super 3000 Formula FE", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "A5/B5",
        "approvals": ["Ford WSS-M2C913-D", "Renault RN0700"],
        "description": "Yakıt ekonomisi odaklı formülasyonuyla tasarlanmış tam sentetik motor yağı. Ford EcoBoost motorlarda mükemmel performans gösteren düşük sürtünmeli formülasyonuyla günlük kullanım için idealdir.",
        "features": ["Ford WSS-M2C913-D onaylı", "Yakıt tasarruf teknolojisi", "A5/B5 sertifikalı", "Düşük sürtünme formülü"],
        "fd": "Yakıt ekonomisini maksimize etmek için özel olarak formüle edilmiş, Ford EcoBoost motorlara yönelik tam sentetik motor yağı.\n\nA5/B5 sertifikasyonuyla düşük viskozite sürtünme direncini azaltırken motor koruma kalitesini koruyarak hem yakıt ekonomisi hem de motor ömrünü iyileştirir.\n\nPERFORMANS ÖZELLİKLERİ\n• Ford EcoBoost motorlarda mükemmel performans\n• Yakıt tüketimini azaltan düşük sürtünme formülü\n• Soğuk start anında hızlı yağlama\n• Üstün motor temizliği\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A5/B5\nFord WSS-M2C913-D\nRenault RN0700",
        "en_type": "Fully Synthetic",
        "en_desc": "Fuel Economy-focused fully synthetic motor oil for Ford EcoBoost and other modern engines. Low-friction formulation reduces fuel consumption while maintaining excellent engine protection.",
        "en_feat": ["Ford WSS-M2C913-D approved", "Fuel economy technology", "A5/B5 certified", "Low-friction formula"],
    },
    {   "slug": "super-3000-xe-5w-30-c3",
        "name": "Mobil Super 3000 XE 5W-30 C3", "grade": "5W-30",
        "series": "Mobil Super 3000 XE", "type": "Tam Sentetik",
        "api": "SN/CF", "acea": "C3",
        "approvals": ["BMW LL-04", "MB 229.51"],
        "description": "Partiküllü filtreleri olan araçlar için ACEA C3 sınıfı DPF uyumlu tam sentetik motor yağı. BMW LL-04 ve MB 229.51 onaylı düşük SAPS formülasyonuyla emisyon sistemlerini korur.",
        "features": ["C3 DPF uyumlu", "BMW LL-04 onaylı", "MB 229.51 onaylı", "Düşük SAPS formülü"],
        "fd": "ACEA C3 sınıfı düşük SAPS formülasyonuyla partikül filtreleri koruyan tam sentetik motor yağı.\n\nBMW LL-04 ve Mercedes-Benz 229.51 onaylı bu motor yağı, DPF filtreli modern araçlarda uzun servis aralığı ve üstün motor koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Dizel ve benzin partikül filtrelerini korur\n• BMW ve Mercedes-Benz için uzun servis aralığı\n• Gelişmiş motor temizliği\n• Düşük SAPS ile katalitik konvertör uyumluluğu\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3\nBMW LL-04\nMB 229.51",
        "en_type": "Fully Synthetic",
        "en_desc": "ACEA C3 DPF-compatible fully synthetic motor oil for vehicles with particulate filters. Low SAPS formulation protects emission systems; BMW LL-04 and MB 229.51 approved.",
        "en_feat": ["C3 DPF compatible", "BMW LL-04 approved", "MB 229.51 approved", "Low SAPS formula"],
    },
    {   "slug": "super-2000-x1-diesel-10w-40",
        "name": "Mobil Super 2000 X1 Diesel 10W-40", "grade": "10W-40",
        "series": "Mobil Super 2000 X1 Diesel", "type": "Yarı Sentetik",
        "api": "SL/CF", "acea": "A3/B4",
        "approvals": ["VW 505.00", "MB 229.1"],
        "description": "Dizel motorlar için optimize edilmiş yarı sentetik motor yağı. Yüksek soot toleransı ve gelişmiş deposit kontrolüyle dizel partiküllerine karşı üstün koruma sağlar.",
        "features": ["Dizel motor optimizasyonu", "VW 505.00 onaylı", "Yüksek soot toleransı", "Ekonomik yarı sentetik"],
        "fd": "Modern ve eski nesil dizel motorlar için özel olarak formüle edilmiş yarı sentetik motor yağı.\n\nYüksek soot tutma kapasitesiyle dizel yanma artıklarını süspanse halinde tutarken motor parçalarına zarar vermeden temiz çalışma koşulları sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Dizel motorlara özel yüksek soot toleransı\n• Gelişmiş motor temizliği ve deposit kontrolü\n• Geniş dizel araç uyumu\n• Soğuk start performansı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SL/CF\nACEA A3/B4\nVW 505.00\nMB 229.1",
        "en_type": "Semi-Synthetic",
        "en_desc": "Semi-synthetic motor oil optimised for diesel engines. High soot tolerance and deposit control deliver superior protection against diesel combustion by-products.",
        "en_feat": ["Diesel engine optimised", "VW 505.00 approved", "High soot tolerance", "Semi-synthetic economy"],
    },
    {   "slug": "delvac-xhp-ultra-le-5w-30",
        "name": "Mobil Delvac XHP Ultra LE 5W-30", "grade": "5W-30",
        "series": "Mobil Delvac XHP Ultra LE", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CK-4/SN", "acea": "E6/E9",
        "approvals": ["Volvo VDS-4.5", "Mack EO-O Premium Plus", "Cummins CES 20086", "MB 228.51"],
        "description": "Son nesil Euro 6 ağır hizmet dizel motorları için geliştirilmiş Low Emission tam sentetik motor yağı. SCR ve DPF sistemleriyle tam uyumlu düşük SAPS formülasyonuyla uzatılmış servis aralığı sağlar.",
        "features": ["CK-4 sertifikalı", "Low-SAPS düşük emisyon", "Euro 6 motor uyumlu", "Uzatılmış drain aralığı"],
        "fd": "Son nesil ağır hizmet dizel motorları için özel olarak geliştirilen Low Emission (LE) tam sentetik motor yağı.\n\nSCR, DPF ve EGR sistemleriyle tam uyumlu düşük SAPS formülasyonu sayesinde Euro 6 emisyon standartlarını karşılarken araç filosu için işletme maliyetlerini düşürür.\n\nPERFORMANS ÖZELLİKLERİ\n• SCR ve DPF sistemleriyle tam uyumluluk\n• Uzatılmış yağ değişim aralığı\n• Üstün motor deposit ve karbonlaşma kontrolü\n• Yakıt ekonomisi katkısı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CK-4/SN\nACEA E6, E9\nVolvo VDS-4.5\nMack EO-O Premium Plus\nCummins CES 20086\nMB 228.51",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "Low Emission fully synthetic heavy-duty motor oil for Euro 6 engines. Low SAPS formulation fully compatible with SCR and DPF systems, extending drain intervals.",
        "en_feat": ["CK-4 certified", "Low SAPS / low emission", "Euro 6 engine compatible", "Extended drain intervals"],
    },
    {   "slug": "delvac-1-5w-40",
        "name": "Mobil Delvac 1 5W-40", "grade": "5W-40",
        "series": "Mobil Delvac 1", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CI-4 Plus/SL", "acea": "E7",
        "approvals": ["Volvo VDS-3", "Cummins CES 20081", "MAN M3477", "MB 228.3"],
        "description": "Ağır hizmet dizel motorları için dünya çapında onaylı tam sentetik motor yağı. EGR motor uyumluluğu ve uzun drain aralığıyla filo işletme maliyetlerini düşürür.",
        "features": ["Tam sentetik ağır hizmet", "Uzun drain aralığı", "EGR motor uyumlu", "Geniş OEM onay portföyü"],
        "fd": "Ağır hizmet kamyon ve otobüs motorları için geliştirilmiş, dünya genelinde başlıca OEM'ler tarafından onaylanmış tam sentetik motor yağı.\n\nEGR teknolojili motorlarda üstün koruma sağlayan formülasyonuyla hem motor ömrünü uzatır hem de filo bakım maliyetlerini azaltır.\n\nPERFORMANS ÖZELLİKLERİ\n• EGR motorlarda üstün deposit ve soot kontrolü\n• Uzatılmış yağ değişim aralığı\n• Soğuk iklimde kolay start ve koruma\n• Üstün oksitlenme ve nitrasyon direnci\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4 Plus/SL\nACEA E7\nVolvo VDS-3\nCummins CES 20081\nMAN M3477\nMB 228.3",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "Globally approved fully synthetic motor oil for heavy-duty diesel engines. EGR-compatible formulation extends drain intervals and reduces fleet maintenance costs.",
        "en_feat": ["Full synthetic heavy duty", "Extended drain intervals", "EGR engine compatible", "Broad OEM approvals"],
    },
    {   "slug": "delvac-xhp-le-10w-40",
        "name": "Mobil Delvac XHP LE 10W-40", "grade": "10W-40",
        "series": "Mobil Delvac XHP LE", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CK-4/SN", "acea": "E6/E9",
        "approvals": ["Volvo VDS-4.5", "Mack EO-O Premium Plus", "Cummins CES 20086"],
        "description": "Düşük emisyonlu ağır hizmet dizel motorları için geliştirilmiş CK-4 sertifikalı tam sentetik motor yağı. Low-SAPS formülasyonuyla SCR/DPF sistemlerini korur.",
        "features": ["CK-4 onaylı", "Low-SAPS formülü", "SCR/DPF uyumlu", "Üstün yüksek sıcaklık stabilitesi"],
        "fd": "CK-4 sınıfı düşük emisyonlu ağır hizmet motorları için geliştirilmiş tam sentetik motor yağı.\n\nLow-SAPS formülasyonuyla modern emisyon kontrol sistemlerini korurken yüksek sıcaklık stabilitesi ve uzatılmış servis aralığı sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• CK-4 düşük emisyon uyumluluğu\n• Dizel partikül filtresi (DPF) koruması\n• Yüksek sıcaklıklarda üstün viskozite stabilitesi\n• Uzun servis aralığı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CK-4/SN\nACEA E6, E9\nVolvo VDS-4.5\nMack EO-O Premium Plus\nCummins CES 20086",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "CK-4 certified low-emission fully synthetic heavy-duty motor oil. Low SAPS formula protects SCR/DPF systems and provides extended service intervals.",
        "en_feat": ["CK-4 certified", "Low SAPS formula", "SCR/DPF compatible", "Superior high-temperature stability"],
    },
    {   "slug": "delvac-xhp-extra-10w-40",
        "name": "Mobil Delvac XHP Extra 10W-40", "grade": "10W-40",
        "series": "Mobil Delvac XHP Extra", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CJ-4/SN", "acea": "E7",
        "approvals": ["Volvo VDS-3", "Mack EO-O Premium Plus", "Cummins CES 20081"],
        "description": "Geniş ağır hizmet araç yelpazesinde yüksek performans sunan CJ-4 sertifikalı tam sentetik motor yağı. Gelişmiş deposit kontrolü ve uzun drain aralığıyla işletme maliyetlerini düşürür.",
        "features": ["CJ-4 sertifikalı", "Uzun drain aralığı", "EGR uyumlu ağır hizmet", "Üstün deposit kontrolü"],
        "fd": "CJ-4 sertifikalı, geniş ağır hizmet kamyon ve otobüs motorları için tasarlanmış tam sentetik motor yağı.\n\nYüksek TBN kapasitesi ve gelişmiş deposit önleme özellikleriyle uzun servis aralıklarında optimum motor koruması sağlarken yakıt ekonomisine katkıda bulunur.\n\nPERFORMANS ÖZELLİKLERİ\n• CJ-4 ile EGR uyumlu motor koruması\n• Üstün deposit ve soot kontrolü\n• Yakıt ekonomisi katkısı\n• Uzatılmış yağ ömrü\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CJ-4/SN\nACEA E7\nVolvo VDS-3\nMack EO-O Premium Plus\nCummins CES 20081",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "CJ-4 certified fully synthetic motor oil for a broad range of heavy-duty engines. Advanced deposit control and extended drain intervals reduce operating costs.",
        "en_feat": ["CJ-4 certified", "Extended drain intervals", "EGR-compatible protection", "Superior deposit control"],
    },
    {   "slug": "delvac-xhp-esp-10w-40",
        "name": "Mobil Delvac XHP ESP 10W-40", "grade": "10W-40",
        "series": "Mobil Delvac XHP ESP", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CJ-4/SN", "acea": "E6/E7",
        "approvals": ["Volvo VDS-3", "Cummins CES 20081", "MB 228.31", "MAN M3477"],
        "description": "Emisyon sonrası sistemleri koruyan ESP teknolojili tam sentetik ağır hizmet motor yağı. DPF dostu düşük SAPS formülasyonuyla CJ-4 standartlarını karşılar.",
        "features": ["ESP emisyon sistemi dostu", "DPF düşük SAPS formülü", "CJ-4 onaylı", "Üstün deposit kontrolü"],
        "fd": "Emisyon Sistemi Koruması (ESP) teknolojisiyle formüle edilmiş, ağır hizmet dizel motorları için tam sentetik motor yağı.\n\nCJ-4 sertifikalı düşük SAPS formülasyonuyla dizel partikül filtrelerini (DPF) korurken motor içi temizliği ve korumasını maksimize eder.\n\nPERFORMANS ÖZELLİKLERİ\n• Dizel partikül filtrelerini temiz tutar\n• CJ-4 uyumlu düşük SAPS\n• Üstün soot ve deposit kontrolü\n• Uzatılmış yağ değişim aralığı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CJ-4/SN\nACEA E6, E7\nVolvo VDS-3\nCummins CES 20081\nMB 228.31\nMAN M3477",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "Fully synthetic heavy-duty ESP motor oil protecting emission aftertreatment systems. Low SAPS, DPF-friendly formulation meeting CJ-4 standards.",
        "en_feat": ["ESP emission system friendly", "DPF low-SAPS formula", "CJ-4 certified", "Superior deposit control"],
    },
    {   "slug": "delvac-mx-esp-15w-40",
        "name": "Mobil Delvac MX ESP 15W-40", "grade": "15W-40",
        "series": "Mobil Delvac MX ESP", "type": "Mineral (Ağır Hizmet)",
        "api": "CI-4/SL", "acea": "E7",
        "approvals": ["Volvo VDS-3", "Cummins CES 20078", "MAN M3275", "MB 228.3"],
        "description": "Emisyon kontrol sistemleriyle uyumlu ekonomik mineral ağır hizmet motor yağı. Geniş OEM onay portföyüyle büyük filolar için maliyet etkin koruma sağlar.",
        "features": ["ESP emisyon sistemi uyumlu", "Ekonomik mineral formül", "CI-4 onaylı", "Geniş filo uyumluluğu"],
        "fd": "Emisyon kontrol sistemleriyle uyumlu geliştirilmiş ekonomik mineral ağır hizmet motor yağı.\n\nGeniş OEM onayları portföyüyle büyük filolarda bakım maliyetlerini minimize ederken güvenilir motor koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• EGR motorlarla uyumlu ESP teknolojisi\n• Geniş filo ve OEM uyumu\n• Güvenilir ağır hizmet koruması\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4/SL\nACEA E7\nVolvo VDS-3\nCummins CES 20078\nMAN M3275\nMB 228.3",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "Cost-effective mineral heavy-duty motor oil compatible with emission control systems. Broad OEM approval portfolio makes it ideal for large fleet operations.",
        "en_feat": ["ESP emission system compatible", "Cost-effective mineral formula", "CI-4 certified", "Broad fleet compatibility"],
    },
    {   "slug": "delvac-lcv-f-5w-30",
        "name": "Mobil Delvac LCV F 5W-30", "grade": "5W-30",
        "series": "Mobil Delvac LCV F", "type": "Tam Sentetik (Hafif Ticari)",
        "api": "SN/CF", "acea": "C3/E6",
        "approvals": ["Ford WSS-M2C913-D", "Fiat 9.55535-S1", "Renault RN0700"],
        "description": "Hafif ticari araçlar ve LCV filolar için özelleştirilmiş tam sentetik motor yağı. Ford ve Fiat ticari araç onaylı formülasyonuyla uzun değişim aralığı sağlar.",
        "features": ["Hafif ticari araç özel", "Ford LCV onaylı", "Uzun drain aralığı", "Düşük SAPS C3/E6 formülü"],
        "fd": "Hafif ticari araçlar (LCV) için özel olarak geliştirilen, Ford ve Fiat onaylı tam sentetik motor yağı.\n\nC3 ve E6 çift sertifikasyonuyla hem binek taşımacılığı hem de hafif yük araçlarında optimum motor koruması ve yakıt ekonomisi sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Ford ve Fiat hafif ticari araç onaylı\n• C3/E6 çift sertifikasyon uyumu\n• Uzun servis aralığı ile filo ekonomisi\n• DPF ve GPF koruması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3, E6\nFord WSS-M2C913-D\nFiat 9.55535-S1\nRenault RN0700",
        "en_type": "Fully Synthetic (Light Commercial)",
        "en_desc": "Fully synthetic motor oil engineered for light commercial vehicles. Ford and Fiat approved, delivering extended drain intervals and dual C3/E6 certification.",
        "en_feat": ["Light commercial vehicle specific", "Ford LCV approved", "Extended drain intervals", "Low SAPS C3/E6 formula"],
    },
    {   "slug": "delvac-mx-15w-40",
        "name": "Mobil Delvac MX 15W-40", "grade": "15W-40",
        "series": "Mobil Delvac MX", "type": "Mineral (Ağır Hizmet)",
        "api": "CI-4 Plus/SL", "acea": "E7",
        "approvals": ["Cummins CES 20076", "MAN M3275", "MB 228.3", "Volvo VDS-3"],
        "description": "Ağır hizmet dizel motorları için geliştirilmiş güvenilir ve ekonomik mineral motor yağı. Geniş OEM onay portföyüyle büyük filolar için maliyet etkin çözüm sunar.",
        "features": ["CI-4 Plus sertifikalı", "Ekonomik mineral formül", "Geniş OEM onay portföyü", "Güvenilir ağır hizmet koruması"],
        "fd": "Ağır hizmet kamyon ve otobüs motorları için güvenilir, ekonomik mineral motor yağı.\n\nCI-4 Plus sertifikasyonu ve geniş OEM onay portföyüyle büyük araç filolarında hem güvenilir koruma hem de düşük bakım maliyeti sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• CI-4 Plus ile EGR motor koruması\n• Geniş filo ve araç uyumu\n• Ekonomik mineral formülasyon\n• Güvenilir ağır hizmet koruması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4 Plus/SL\nACEA E7\nCummins CES 20076\nMAN M3275\nMB 228.3\nVolvo VDS-3",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "Reliable and cost-effective mineral motor oil for heavy-duty diesel engines. Broad OEM approval portfolio makes it an economical choice for large fleets.",
        "en_feat": ["CI-4 Plus certified", "Cost-effective mineral formula", "Broad OEM approvals", "Reliable heavy-duty protection"],
    },
    {   "slug": "delvac-mx-esp-10w-30",
        "name": "Mobil Delvac MX ESP 10W-30", "grade": "10W-30",
        "series": "Mobil Delvac MX ESP", "type": "Mineral (Ağır Hizmet)",
        "api": "CI-4/SL", "acea": "E7",
        "approvals": ["Cummins CES 20078", "MB 228.3", "Volvo VDS-3"],
        "description": "Soğuk iklim koşullarında kullanıma uygun ESP mineral ağır hizmet motor yağı. Düşük sıcaklıklarda kolay soğuk start ve emisyon kontrol sistemi uyumluluğu sağlar.",
        "features": ["Soğuk start performansı", "ESP emisyon uyumlu", "Ekonomik mineral formül", "CI-4 onaylı"],
        "fd": "Soğuk iklim bölgeleri için özel olarak formüle edilmiş, emisyon kontrol sistemi uyumlu mineral ağır hizmet motor yağı.\n\nDüşük viskozitesi sayesinde soğuk havada kolay motor start sağlarken ESP teknolojisiyle EGR ve emisyon sonrası sistemleri korur.\n\nPERFORMANS ÖZELLİKLERİ\n• Soğuk iklimde kolay start ve hızlı yağlama\n• ESP teknolojisi ile emisyon uyumluluğu\n• Ekonomik mineral formülasyon\n• Güvenilir ağır hizmet motor koruması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4/SL\nACEA E7\nCummins CES 20078\nMB 228.3\nVolvo VDS-3",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "ESP mineral heavy-duty motor oil for cold-climate operation. Low-viscosity grade provides easy cold starts while ESP technology protects emission control systems.",
        "en_feat": ["Cold-climate start performance", "ESP emission compatible", "Cost-effective mineral formula", "CI-4 certified"],
    },
    {   "slug": "delvac-xhp-15w-40",
        "name": "Mobil Delvac XHP 15W-40", "grade": "15W-40",
        "series": "Mobil Delvac XHP", "type": "Tam Sentetik (Ağır Hizmet)",
        "api": "CJ-4/SN", "acea": "E7",
        "approvals": ["Volvo VDS-3", "Cummins CES 20081", "MAN M3477", "MB 228.3"],
        "description": "CJ-4 sertifikalı yüksek performanslı ağır hizmet tam sentetik motor yağı. Uzun drain aralığı ve üstün motor temizliğiyle filo işletme maliyetlerini azaltır.",
        "features": ["CJ-4 sertifikalı", "Uzun drain aralığı", "Üstün motor temizliği", "EGR motor uyumlu"],
        "fd": "CJ-4 ağır hizmet standardını karşılayan, ağır hizmet kamyon motorları için geliştirilmiş tam sentetik motor yağı.\n\nUzun servis aralıkları ve üstün deposit önleme özellikleriyle filo işletme maliyetlerini düşürürken motor ömrünü uzatır.\n\nPERFORMANS ÖZELLİKLERİ\n• CJ-4 standardına göre uzatılmış drain aralığı\n• Üstün motor temizliği ve deposit kontrolü\n• EGR uyumlu formülasyon\n• Yakıt ekonomisine katkı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CJ-4/SN\nACEA E7\nVolvo VDS-3\nCummins CES 20081\nMAN M3477\nMB 228.3",
        "en_type": "Fully Synthetic (Heavy Duty)",
        "en_desc": "CJ-4 certified fully synthetic heavy-duty motor oil. Extended drain intervals and superior engine cleanliness reduce fleet operating costs.",
        "en_feat": ["CJ-4 certified", "Extended drain intervals", "Superior engine cleanliness", "EGR engine compatible"],
    },
    {   "slug": "delvac-super-20w-50",
        "name": "Mobil Delvac Super 20W-50", "grade": "20W-50",
        "series": "Mobil Delvac Super", "type": "Mineral (Ağır Hizmet)",
        "api": "CH-4/SL", "acea": "E3",
        "approvals": ["Cummins CES 20071", "MAN M3275", "MB 228.1"],
        "description": "Tropikal ve yüksek çevre sıcaklığı koşullarında ağır hizmet dizel motorları için formüle edilmiş mineral motor yağı. Yüksek sıcaklıklarda üstün viskozite stabilitesi sağlar.",
        "features": ["Yüksek sıcaklık stabilitesi", "Tropikal iklim uyumlu", "CH-4 sertifikalı", "Ekonomik mineral formül"],
        "fd": "Sıcak iklim bölgeleri ve yüksek çevre sıcaklığı koşullarında çalışan ağır hizmet motorları için özel olarak formüle edilmiş mineral motor yağı.\n\nYüksek viskozite indeksiyle yüksek çalışma sıcaklıklarında film kalınlığını koruyarak tropikal ortamlarda motor parçalarını güvenilir biçimde korur.\n\nPERFORMANS ÖZELLİKLERİ\n• Yüksek sıcaklıklarda üstün viskozite stabilitesi\n• Tropikal ve sıcak iklim koşullarına uygun\n• Güvenilir ağır hizmet motor koruması\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CH-4/SL\nACEA E3\nCummins CES 20071\nMAN M3275\nMB 228.1",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "Mineral motor oil formulated for heavy-duty diesel engines in tropical and high-ambient-temperature conditions. Maintains superior viscosity stability at elevated temperatures.",
        "en_feat": ["High-temperature stability", "Tropical climate suitable", "CH-4 certified", "Cost-effective mineral formula"],
    },
    {   "slug": "delvac-1350",
        "name": "Mobil Delvac 1350", "grade": "SAE 50",
        "series": "Mobil Delvac 1350", "type": "Mineral (Ağır Hizmet, Monograde)",
        "api": "CF-4/SF", "acea": "E2",
        "approvals": ["MIL-L-2104E", "MAN M3275"],
        "description": "SAE 50 monograde ağır hizmet dizel motor yağı. Eski nesil kamyon ve iş makinesi motorlarında güvenilir yüksek sıcaklık koruması sağlayan ekonomik mineral seçenek.",
        "features": ["SAE 50 monograde formülü", "Eski nesil motor uyumlu", "Yüksek sıcaklık koruması", "Mineral ekonomik seçenek"],
        "fd": "Eski ve konvansiyonel ağır hizmet dizel motorları için formüle edilmiş SAE 50 monograde mineral motor yağı.\n\nYüksek viskozitesiyle yüksek çalışma sıcaklıklarında güvenilir film koruması sağlarken eski nesil motor tasarımlarının gereksinimlerini karşılar.\n\nPERFORMANS ÖZELLİKLERİ\n• SAE 50 yüksek viskozite koruması\n• Eski motor tasarımlarıyla uyumluluk\n• Güvenilir yüksek sıcaklık film koruması\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF-4/SF\nACEA E2\nMIL-L-2104E\nMAN M3275",
        "en_type": "Mineral (Heavy Duty, Monograde)",
        "en_desc": "SAE 50 monograde mineral motor oil for older heavy-duty diesel engines. Provides reliable high-temperature film protection for legacy engine designs.",
        "en_feat": ["SAE 50 monograde formula", "Legacy engine compatible", "High-temperature film protection", "Cost-effective mineral option"],
    },
    {   "slug": "delvac-1340",
        "name": "Mobil Delvac 1340", "grade": "SAE 40",
        "series": "Mobil Delvac 1340", "type": "Mineral (Ağır Hizmet, Monograde)",
        "api": "CF-4/SF", "acea": "E2",
        "approvals": ["MIL-L-2104E", "MAN M3275"],
        "description": "SAE 40 monograde ağır hizmet dizel motor yağı. Standart çalışma koşullarındaki eski nesil dizel motorlar ve iş makinelerinde temel motor koruması sağlar.",
        "features": ["SAE 40 monograde formülü", "Eski dizel motor uyumlu", "Temel ağır hizmet koruması", "Ekonomik mineral seçenek"],
        "fd": "Standart çalışma koşullarında eski ve konvansiyonel ağır hizmet dizel motorları için formüle edilmiş SAE 40 monograde mineral motor yağı.\n\nTemel motor koruması ihtiyaçlarını karşılayan ekonomik formülasyonuyla eski nesil kamyon ve iş makinesi motorları için ideal seçenektir.\n\nPERFORMANS ÖZELLİKLERİ\n• SAE 40 dengeli viskozite koruması\n• Eski motor tasarımlarıyla uyumluluk\n• Temel ağır hizmet motor koruması\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF-4/SF\nACEA E2\nMIL-L-2104E\nMAN M3275",
        "en_type": "Mineral (Heavy Duty, Monograde)",
        "en_desc": "SAE 40 monograde mineral motor oil for older heavy-duty diesel engines and equipment. Meets basic protection requirements for legacy engine designs.",
        "en_feat": ["SAE 40 monograde formula", "Legacy diesel engine compatible", "Basic heavy-duty protection", "Cost-effective mineral option"],
    },
    {   "slug": "delvac-1330",
        "name": "Mobil Delvac 1330", "grade": "SAE 30",
        "series": "Mobil Delvac 1330", "type": "Mineral (Ağır Hizmet, Monograde)",
        "api": "CF-4/SF", "acea": "E2",
        "approvals": ["MIL-L-2104E", "Caterpillar TO-2"],
        "description": "SAE 30 monograde ağır hizmet motor yağı. Standart çalışma koşullarında motor koruması ve Caterpillar iş makineleriyle uyumluluk sağlar.",
        "features": ["SAE 30 monograde formülü", "Caterpillar TO-2 onaylı", "Temel ağır hizmet formülü", "Ekonomik mineral yağ"],
        "fd": "Eski ve konvansiyonel ağır hizmet motorları için SAE 30 monograde mineral motor yağı.\n\nDüşük viskozitesiyle soğuk start koşullarında hızlı yağlama sağlarken temel motor koruma gereksinimlerini karşılar.\n\nPERFORMANS ÖZELLİKLERİ\n• SAE 30 düşük viskoziteli soğuk start avantajı\n• Caterpillar iş makineleriyle uyumluluk\n• Temel ağır hizmet motor koruması\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF-4/SF\nACEA E2\nMIL-L-2104E\nCaterpillar TO-2",
        "en_type": "Mineral (Heavy Duty, Monograde)",
        "en_desc": "SAE 30 monograde heavy-duty mineral motor oil. Provides fast cold-start lubrication and is compatible with Caterpillar equipment.",
        "en_feat": ["SAE 30 monograde formula", "Caterpillar TO-2 approved", "Basic heavy-duty protection", "Cost-effective mineral oil"],
    },
    {   "slug": "delvac-super-1000-20w-50",
        "name": "Mobil Delvac Super 1000 20W-50", "grade": "20W-50",
        "series": "Mobil Delvac Super 1000", "type": "Mineral (Ağır Hizmet)",
        "api": "CH-4/SL", "acea": "E3",
        "approvals": ["Cummins CES 20071", "MB 228.1"],
        "description": "Büyük araç filoları ve yüksek sıcaklık ortamları için formüle edilmiş mineral ağır hizmet motor yağı. Filo bakım maliyetlerini minimize eden ekonomik formülasyonuyla güvenilir koruma sağlar.",
        "features": ["Filo bakım ekonomisi", "Yüksek sıcaklık stabilitesi", "CH-4 sertifikalı", "Mineral ekonomik formül"],
        "fd": "Büyük araç filolarının ekonomik bakım ihtiyaçlarını karşılamak için tasarlanmış mineral ağır hizmet motor yağı.\n\nYüksek çalışma sıcaklıklarında yeterli film koruması sağlarken düşük maliyet avantajıyla büyük filolarda bakım maliyetlerini azaltır.\n\nPERFORMANS ÖZELLİKLERİ\n• Büyük filo operasyonları için ekonomik seçenek\n• Yüksek sıcaklıklarda yeterli viskozite koruması\n• CH-4 ağır hizmet sertifikasyonu\n• Güvenilir motor koruması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CH-4/SL\nACEA E3\nCummins CES 20071\nMB 228.1",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "Mineral heavy-duty motor oil for large fleet operations in high-temperature environments. Economical formulation minimises fleet maintenance costs.",
        "en_feat": ["Fleet maintenance economy", "High-temperature stability", "CH-4 certified", "Cost-effective mineral formula"],
    },
    {   "slug": "delvac-ct-diesel-10w-30",
        "name": "Mobil Delvac CT Diesel 10W-30", "grade": "10W-30",
        "series": "Mobil Delvac CT", "type": "Mineral (Ağır Hizmet)",
        "api": "CI-4/SL", "acea": "E5",
        "approvals": ["MB 228.3", "Volvo VDS-2", "MAN M3275"],
        "description": "Konvansiyonel teknoloji dizel motorları için formüle edilmiş CI-4 onaylı mineral motor yağı. Soğuk iklim koşullarında kolay soğuk start özelliği ve güvenilir koruma sağlar.",
        "features": ["Soğuk iklim start performansı", "CI-4 onaylı", "Konvansiyonel dizel uyumlu", "Ekonomik mineral formül"],
        "fd": "Konvansiyonel ve eski teknoloji ağır hizmet dizel motorları için formüle edilmiş CI-4 onaylı mineral motor yağı.\n\nDüşük viskozitesiyle soğuk havalarda kolay motor start sağlarken güvenilir ağır hizmet koruması ve emisyon kontrol sistemi uyumluluğu sunar.\n\nPERFORMANS ÖZELLİKLERİ\n• Soğuk iklimde kolay start ve hızlı yağlama\n• CI-4 standartlarına uygun koruma\n• Konvansiyonel ve eski teknoloji motor uyumu\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4/SL\nACEA E5\nMB 228.3\nVolvo VDS-2\nMAN M3275",
        "en_type": "Mineral (Heavy Duty)",
        "en_desc": "CI-4 approved mineral motor oil for conventional technology heavy-duty diesel engines. Provides easy cold starts in cold-climate conditions with reliable engine protection.",
        "en_feat": ["Cold-climate start performance", "CI-4 approved", "Conventional diesel compatible", "Cost-effective mineral formula"],
    },
]

INDUSTRIAL: list[dict] = [
    {   "slug": "shc-pegasus-30",
        "name": "Mobil SHC Pegasus 30", "grade": "SAE 30",
        "series": "Mobil SHC Pegasus", "type": "Gaz Motor Yağı (Tam Sentetik)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
        "description": "Dört zamanlı stasyoner doğal gaz motorları için geliştirilmiş PAO bazlı tam sentetik gaz motor yağı. Yüksek hızlı gaz motorlarında minimum deposit ve uzun yağ değişim aralığı sağlar.",
        "features": ["PAO tam sentetik formül", "Düşük deposit oluşumu", "Uzun değişim aralığı", "Gaz motoru optimizasyonu"],
        "fd": "Stasyoner ve doğal gaz motorları için özel olarak geliştirilen PAO (Poly-Alpha-Olefin) bazlı tam sentetik gaz motor yağı.\n\nMineral yağlara kıyasla çok daha uzun servis aralıkları ve düşük deposit oluşumuyla endüstriyel gaz motorlarında işletme maliyetlerini azaltır ve motor ömrünü uzatır.\n\nPERFORMANS ÖZELLİKLERİ\n• Yüksek oksidasyon ve nitrasyon direnci\n• Düşük kül içeriğiyle spark plug koruması\n• Uzatılmış yağ değişim aralığı\n• Geniş sıcaklık aralığında viskozite stabilitesi\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nCummins\nWaukesha",
        "en_type": "Gas Engine Oil (Fully Synthetic)",
        "en_desc": "PAO-based fully synthetic gas engine oil for four-stroke stationary natural gas engines. Delivers minimal deposit formation and extended oil change intervals.",
        "en_feat": ["PAO fully synthetic formula", "Low deposit formation", "Extended drain intervals", "Gas engine optimised"],
    },
    {   "slug": "pegasus-805",
        "name": "Mobil Pegasus 805", "grade": "SAE 40",
        "series": "Mobil Pegasus 800", "type": "Gaz Motor Yağı (Mineral)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
        "description": "Yüksek TBN kapasiteli dört zamanlı stasyoner doğal gaz motorları için geliştirilmiş mineral gaz motor yağı. Asit nötralizasyonu ve korozyon korumasıyla uzun motor ömrü sağlar.",
        "features": ["Yüksek TBN kapasitesi", "Asit korozyon koruması", "Doğal gaz motor uyumlu", "Güvenilir mineral formül"],
        "fd": "Dört zamanlı stasyoner doğal gaz motorları için yüksek TBN (Total Base Number) kapasiteli mineral gaz motor yağı.\n\nYüksek alkali rezerviyle yanma süreçlerinde oluşan asidik artıkları nötralize ederek motor parçalarını korozyon ve aşınmaya karşı korur.\n\nPERFORMANS ÖZELLİKLERİ\n• Yüksek TBN ile güçlü asit nötralizasyonu\n• Motor korozyonuna karşı etkin koruma\n• Doğal gaz motorlarına özel formülasyon\n• Güvenilir mineral motor yağı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nCummins\nWaukesha",
        "en_type": "Gas Engine Oil (Mineral)",
        "en_desc": "High-TBN mineral gas engine oil for four-stroke stationary natural gas engines. Strong acid neutralisation protects against corrosion from combustion by-products.",
        "en_feat": ["High TBN capacity", "Acid corrosion protection", "Natural gas engine compatible", "Reliable mineral formula"],
    },
    {   "slug": "pegasus-605",
        "name": "Mobil Pegasus 605", "grade": "SAE 40",
        "series": "Mobil Pegasus 600", "type": "Gaz Motor Yağı (Mineral)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Waukesha"],
        "description": "Orta düzey dört zamanlı stasyoner doğal gaz ve biyogaz motorları için geliştirilmiş mineral gaz motor yağı. Güvenilir koruma ve ekonomik formülasyonuyla orta ölçekli tesisler için idealdir.",
        "features": ["Gaz ve biyogaz motor uyumlu", "Orta TBN alkali rezerv", "Ekonomik mineral formül", "Stasyoner motor optimizasyonu"],
        "fd": "Orta ölçekli stasyoner doğal gaz ve biyogaz motorları için formüle edilmiş mineral gaz motor yağı.\n\nOrta düzey TBN kapasitesiyle temiz yakıtlı gaz motorlarında güvenilir koruma ve ekonomik bakım imkânı sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Temiz gaz yakıtlı motorlarda güvenilir koruma\n• Orta TBN ile asit kontrolü\n• Ekonomik mineral formülasyon\n• Uzun çalışma koşullarında stabilite\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nWaukesha",
        "en_type": "Gas Engine Oil (Mineral)",
        "en_desc": "Mineral gas engine oil for mid-range four-stroke stationary natural gas and biogas engines. Reliable protection and economical formulation for medium-sized installations.",
        "en_feat": ["Gas and biogas engine compatible", "Medium TBN alkalinity reserve", "Economical mineral formula", "Stationary engine optimised"],
    },
    {   "slug": "pegasus-610",
        "name": "Mobil Pegasus 610", "grade": "SAE 40",
        "series": "Mobil Pegasus 600", "type": "Gaz Motor Yağı (Mineral)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Waukesha"],
        "description": "Dört zamanlı stasyoner doğal gaz motorları için formüle edilmiş yüksek performanslı mineral gaz motor yağı. Gelişmiş oksidasyon direnciyle uzun çalışma sürelerinde güvenilir motor koruması sağlar.",
        "features": ["Yüksek oksidasyon direnci", "Uzun çalışma süresi performansı", "Gaz motor uyumlu", "Mineral ekonomik formül"],
        "fd": "Yüksek çalışma saatlerinde güvenilir performans sağlayan dört zamanlı stasyoner doğal gaz motorları için mineral gaz motor yağı.\n\nGelişmiş oksidasyon direnci formülasyonuyla uzun çalışma sürelerinde yağın bozulmasını yavaşlatarak motor korumasını sürdürür.\n\nPERFORMANS ÖZELLİKLERİ\n• Uzun çalışma sürelerinde üstün oksidasyon stabilitesi\n• Düşük deposit ve vernik oluşumu\n• Doğal gaz motorlarına özel formülasyon\n• Güvenilir mineral motor koruma\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nWaukesha",
        "en_type": "Gas Engine Oil (Mineral)",
        "en_desc": "High-performance mineral gas engine oil for four-stroke stationary natural gas engines. Advanced oxidation resistance maintains reliable engine protection over long operating hours.",
        "en_feat": ["High oxidation resistance", "Long runtime performance", "Gas engine compatible", "Cost-effective mineral formula"],
    },
    {   "slug": "pegasus-1005",
        "name": "Mobil Pegasus 1005", "grade": "SAE 40",
        "series": "Mobil Pegasus 1000", "type": "Gaz Motor Yağı (Mineral, Yüksek Kül)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
        "description": "Kirli veya yüksek kükürtlü gaz yakıtlarıyla çalışan ağır hizmet gaz motorları için yüksek TBN'li mineral gaz motor yağı. Güçlü asit nötralizasyonuyla motor ömrünü korur.",
        "features": ["En yüksek TBN kapasitesi", "Kirli gaz yakıt toleransı", "Güçlü asit nötralizasyonu", "Ağır hizmet gaz motoru"],
        "fd": "Kirli veya yüksek kükürtlü gaz yakıtlarının kullanıldığı ağır hizmet gaz motorları için formüle edilmiş yüksek TBN'li mineral gaz motor yağı.\n\nEn yüksek alkali rezerv kapasitesiyle asidik yanma ürünlerini etkili biçimde nötralize ederek motor parçalarını korozyona karşı korur.\n\nPERFORMANS ÖZELLİKLERİ\n• En yüksek TBN ile maksimum asit nötralizasyonu\n• Kirli gaz yakıtlarında üstün koruma\n• Motor korozyonuna karşı en güçlü kalkan\n• Ağır hizmet gaz motoru koşulları için optimize edilmiş\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nCummins\nWaukesha",
        "en_type": "Gas Engine Oil (Mineral, High Ash)",
        "en_desc": "High-TBN mineral gas engine oil for heavy-duty gas engines running on impure or high-sulphur gas fuels. Maximum alkalinity neutralises aggressive combustion acids.",
        "en_feat": ["Highest TBN capacity", "Impure gas fuel tolerance", "Maximum acid neutralisation", "Heavy-duty gas engine formula"],
    },
    {   "slug": "pegasus-705",
        "name": "Mobil Pegasus 705", "grade": "SAE 40",
        "series": "Mobil Pegasus 700", "type": "Gaz Motor Yağı (Mineral)",
        "api": "API CF", "acea": "ISO-L-EGD",
        "approvals": ["GE Jenbacher", "Caterpillar", "Cummins", "Waukesha"],
        "description": "Dört zamanlı stasyoner doğal gaz motorları için güncellenmiş formülasyonlu mineral gaz motor yağı. Gelişmiş katık teknolojisiyle motor temizliği ve korozyon koruması sağlar.",
        "features": ["Güncellenmiş gaz motor formülü", "Gelişmiş motor temizliği", "Korozyon koruması", "Mineral ekonomik yağ"],
        "fd": "700 serisi güncellenmiş formülasyonuyla dört zamanlı stasyoner gaz motorları için geliştirilmiş mineral gaz motor yağı.\n\nGelişmiş katık paketi sayesinde önceki jenerasyona kıyasla daha iyi motor temizliği ve korozyon koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Gelişmiş katık teknolojisiyle üstün motor temizliği\n• Güçlendirilmiş korozyon ve aşınma koruması\n• Doğal gaz motorlarına özel optimizasyon\n• Güvenilir mineral motor yağı performansı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CF\nISO-L-EGD\nGE Jenbacher\nCaterpillar\nCummins\nWaukesha",
        "en_type": "Gas Engine Oil (Mineral)",
        "en_desc": "Updated-formulation mineral gas engine oil for four-stroke stationary natural gas engines. Improved additive technology delivers enhanced engine cleanliness and corrosion protection.",
        "en_feat": ["Updated gas engine formula", "Enhanced engine cleanliness", "Corrosion protection", "Cost-effective mineral oil"],
    },
]

# Full descriptions for EXISTING products (no fullDescription currently)
EXISTING_FD: dict[str, str] = {
    "1-esp-x2-0w-20": "BMW'nin en son verimlilik standardı LL-17FE+'yı karşılamak üzere geliştirilen ultra düşük viskoziteli tam sentetik motor yağı.\n\nEn ileri Mobil 1 ESP teknolojisiyle formüle edilen bu yağ, hibrit araçlar dahil en modern BMW, Mercedes-Benz ve VW Group araçlarında maksimum yakıt ekonomisi ve üstün motor koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Yakıt tüketimini minimize eden ultra düşük viskozite\n• BMW LL-17FE+ ve LL-14FE+ onaylı\n• Hibrit ve stop-start sistemlerle uyumluluk\n• Soğuk start anında anlık yağlama koruma\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C5\nBMW LL-17FE+\nMB 229.71\nVW 508 00/509 00",
    "1-esp-0w-30": "Mercedes-Benz 229.51 ve Porsche A40 onaylı, ACEA C3 sınıfı tam sentetik ESP motor yağı.\n\nDüşük SAPS formülasyonuyla dizel partikül filtreleri ve emisyon sonrası sistemleri korurken Mercedes-Benz ve Porsche araçlarında uzun servis aralığı sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• DPF uyumlu düşük SAPS formülü\n• MB 229.51 uzun servis aralığı uyumu\n• Üstün soğuk start koruması\n• Yüksek sıcaklık oksidasyonuna karşı direnç\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3\nMB 229.51, MB 229.31\nPorsche A40",
    "1-esp-5w-30": "En geniş OEM onay portföyüne sahip tam sentetik ESP motor yağı — BMW LL-04, MB 229.51 ve VW 504.00/507.00 onaylı.\n\nDizel partikül filtreleri ve emisyon sonrası sistemlerle tam uyumlu düşük SAPS formülasyonuyla BMW, Mercedes-Benz ve Volkswagen Group araçlarında uzun servis aralığı ve üstün koruma sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• En geniş OEM onay portföyü (BMW, MB, VW)\n• DPF ve GPF uyumlu Low-SAPS\n• Uzatılmış servis aralığı\n• Motor temizleyici ESP formülü\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA C3\nBMW LL-04\nMB 229.51\nVW 504.00/507.00",
    "1-esp-x4-0w-40": "Yüksek performanslı spor ve lüks Avrupa araçları için geliştirilmiş üst düzey tam sentetik ESP motor yağı.\n\nMB 229.5 ve Porsche A40 onaylı geniş sıcaklık aralığı formülasyonuyla spor araçlarda maksimum motor koruması ve yakıt verimliliği sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• MB 229.5 ve Porsche A40 onaylı\n• Geniş sıcaklık aralığında viskozite stabilitesi\n• Yüksek yük altında üstün film dayanımı\n• Spor araç motor koruması\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B4\nMB 229.5\nPorsche A40\nRenault RN0700",
    "1-fs-5w-40": "Dünya genelinde milyonlarca araç tarafından güvenilen Mobil 1'in FS (Fully Synthetic) tam sentetik formülü.\n\nVW, Mercedes-Benz, Porsche ve diğer önde gelen üreticilerin onaylarıyla küresel araç yelpazesi için güçlü ve evrensel motor koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Küresel OEM onayları (VW, MB, Porsche)\n• Yıl boyu her koşulda güvenilir koruma\n• Üstün soğuk start ve yüksek sıcaklık stabilitesi\n• Motor temizleyici ve deposit önleyici formül\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nVW 502.00/505.00\nMB 229.3\nPorsche A40",
    "1-new-life-0w-40": "Sıfırdan itibaren motorunuzu koruyan Mobil 1 tam sentetik motor yağı.\n\nMercedes-Benz 229.5 ve Porsche onaylı formülasyonuyla yüksek performanslı araç motorlarında yeni motor ömrü boyunca üstün oksidasyon ve termal stabilite sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Sıfır kilometreden itibaren üstün koruma\n• MB 229.5 uzun servis aralığı uyumu\n• Üstün oksidasyon ve nitrasyon direnci\n• Motor temizleyici formül\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nMB 229.5\nPorsche A40\nRenault RN0700",
    "super-3000-fe-5w-30": "Yakıt ekonomisi odaklı formülasyonuyla tasarlanmış A5/B5 sınıfı tam sentetik motor yağı.\n\nFord EcoBoost ve A5/B5 gerektiren diğer modern motorlarda düşük sürtünme avantajı ve yakıt tasarrufu sağlarken mükemmel motor koruması sunar.\n\nPERFORMANS ÖZELLİKLERİ\n• Ford ve Renault onaylı yakıt ekonomisi formülü\n• A5/B5 düşük sürtünme teknolojisi\n• Soğuk start anında hızlı yağlama\n• Üstün motor temizliği\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A5/B5\nFord WSS-M2C913-D\nRenault RN0700",
    "super-3000-x1-5w-40": "Geniş araç yelpazesi için üstün koruma sunan A3/B3/B4 sınıfı tam sentetik motor yağı.\n\nMB 229.3 ve VW 502/505 onaylı formülasyonuyla hem benzinli hem dizel motorlarda yüksek sıcaklık koruması ve uzun motor temizliği sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• Geniş OEM onay portföyü (MB, VW, Renault)\n• Yüksek sıcaklık motor koruması\n• Motor temizleyici ve deposit önleyici\n• Tam sentetik uzun ömür formülü\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nMB 229.3\nVW 502.00/505.00\nRenault RN0700/RN0710",
    "super-2000-10w-40": "Geniş araç yelpazesinde ekonomik koruma sunan yarı sentetik motor yağı.\n\nVW ve Mercedes-Benz onaylı formülasyonuyla hem benzinli hem de dizel motorlarda standart bakım ihtiyaçlarını karşılayan ekonomik yarı sentetik seçenek.\n\nPERFORMANS ÖZELLİKLERİ\n• Geniş araç ve motor uyumu\n• VW 501.01/505.00 ve MB 229.1 onaylı\n• Ekonomik yarı sentetik formülasyon\n• Benzinli ve dizel motor uyumluluğu\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SL/CF\nACEA A3/B3\nVW 501.01/505.00\nMB 229.1",
    "delvac-1-esp-5w-30": "Euro 6 ağır hizmet dizel motorları için geliştirilmiş CK-4 sertifikalı tam sentetik ESP motor yağı.\n\nSCR ve DPF sistemleriyle tam uyumlu Low-SAPS formülasyonuyla en güncel emisyon standartlarını karşılarken uzatılmış servis aralığı sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• CK-4 / Euro 6 uyumu\n• SCR ve DPF Low-SAPS koruması\n• Uzatılmış yağ değişim aralığı\n• Üstün soot ve deposit kontrolü\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CK-4/SN\nACEA E6, E9\nVolvo VDS-4.5\nMack EO-O Premium Plus\nCummins CES 20086\nMB 228.51",
    "delvac-1-esp-5w-40": "Ağır hizmet kamyon ve otobüs motorları için yüksek performanslı CJ-4 sertifikalı tam sentetik ESP motor yağı.\n\nUzun servis aralıkları ve üstün deposit kontrolü ile filo işletme maliyetlerini düşürürken motor güvenilirliğini artırır.\n\nPERFORMANS ÖZELLİKLERİ\n• CJ-4 EGR motor koruması\n• Uzatılmış yağ değişim aralığı\n• Üstün deposit ve soot kontrolü\n• Yakıt ekonomisi katkısı\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CJ-4/SN\nACEA E7\nVolvo VDS-4\nMack EO-O Premium Plus\nCummins CES 20081\nMB 228.51",
    "delvac-1300-super-15w-40": "Ağır hizmet dizel motorları için güvenilir CI-4 Plus sertifikalı mineral motor yağı.\n\nGeniş OEM onay portföyüyle büyük filolar için maliyet etkin, güvenilir ağır hizmet koruması sağlar.\n\nPERFORMANS ÖZELLİKLERİ\n• CI-4 Plus EGR motor koruması\n• Geniş OEM onay portföyü\n• Büyük filo operasyonları için ekonomik\n• Güvenilir mineral ağır hizmet formülü\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI CI-4 Plus/SL\nACEA E7\nCummins CES 20076\nMAN M3275\nMB 228.3\nVolvo VDS-3",
    "super-1000-15w-40": "Standart bakım gereksinimlerini karşılayan ekonomik mineral motor yağı.\n\nEski nesil benzinli ve dizel motorlarda temel koruma ihtiyaçlarını karşılayan güvenilir mineral formülasyon.\n\nPERFORMANS ÖZELLİKLERİ\n• Geniş benzinli/dizel motor uyumu\n• MB 229.1 standart servis onayı\n• Temel motor koruması ve temizliği\n• Ekonomik mineral formülasyon\n\nSTANDARTLAR VE SPESİFİKASYONLAR\nAPI SL/CF\nACEA A3/B3\nMB 229.1",
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def qs(s: str) -> str:
    """Double-quoted TypeScript string."""
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


def arr(items: list[str]) -> str:
    return '[' + ', '.join(qs(x) for x in items) + ']'


def to_ts_entry(p: dict, img: str | None) -> str:
    lines = [
        f'  {qs(p["slug"])}: {{',
        f'    name: {qs(p["name"])}, grade: {qs(p["grade"])}, series: {qs(p["series"])}, type: {qs(p["type"])},',
        f'    api: {qs(p["api"])}, acea: {qs(p["acea"])},',
        f'    approvals: {arr(p["approvals"])},',
        f'    description: {qs(p["description"])},',
        f'    features: {arr(p["features"])},',
    ]
    if img:
        lines.append(f'    image: {qs(img)},')
    if p.get("fd"):
        fd = p["fd"].replace("`", "\\`").replace("${", "\\${")
        lines.append(f'    fullDescription: `{fd}`,')
    lines.append('  },')
    return "\n".join(lines)


def insert_before_block_close(content: str, block_start: str, new_ts: str) -> str:
    """Insert new_ts just before the closing '};' of a TypeScript const block."""
    start = content.find(block_start)
    if start == -1:
        raise ValueError(f"Block not found: {block_start!r}")
    open_brace = content.index('{', start)
    depth = 0
    i = open_brace
    in_str = None
    while i < len(content):
        c = content[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == in_str:
                in_str = None
        else:
            if c in ('"', "'", '`'):
                in_str = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return content[:i] + new_ts + '\n' + content[i:]
        i += 1
    raise ValueError(f"No closing brace for: {block_start!r}")


def extend_ts_array(content: str, array_key: str, new_items: list[str]) -> str:
    """Append string items to a TypeScript array literal."""
    idx = content.find(array_key)
    if idx == -1:
        print(f"  WARNING: array key not found: {array_key!r}")
        return content
    open_b = content.index('[', idx)
    depth = 0
    i = open_b
    in_str = None
    while i < len(content):
        c = content[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == in_str:
                in_str = None
        else:
            if c in ('"', "'"):
                in_str = c
            elif c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    ins = "\n" + "".join(f'    {qs(item)},\n' for item in new_items)
                    return content[:i] + ins + "  " + content[i:]
        i += 1
    raise ValueError(f"No closing bracket for: {array_key!r}")


def add_fd_to_entry(content: str, slug: str, fd: str) -> str:
    """Add fullDescription to an existing TypeScript product entry (if not already present)."""
    marker = f'  "{slug}": {{'
    idx = content.find(marker)
    if idx == -1:
        return content
    # Check if fullDescription already exists in this entry
    close = content.find('\n  },', idx)
    if close == -1:
        return content
    if 'fullDescription' in content[idx:close]:
        return content
    fd_escaped = fd.replace("`", "\\`").replace("${", "\\${")
    new_field = f'\n    fullDescription: `{fd_escaped}`,'
    return content[:close] + new_field + content[close:]


def update_image_in_entry(content: str, slug: str, img: str) -> str:
    """Add/update image field in an existing TypeScript product entry."""
    marker = f'  "{slug}": {{'
    idx = content.find(marker)
    if idx == -1:
        return content
    close = content.find('\n  },', idx)
    if close == -1:
        return content
    if 'image:' in content[idx:close]:
        return content  # Already has image
    new_field = f'\n    image: {qs(img)},'
    return content[:close] + new_field + content[close:]


def patch_product_images(content: str, entries: dict[str, str]) -> str:
    """Add Mobil entries to PRODUCT_IMAGES const."""
    # Find the closing '};' of PRODUCT_IMAGES, just before 'function getProductImage'
    marker = 'function getProductImage'
    fn_idx = content.find(marker)
    if fn_idx == -1:
        raise ValueError("getProductImage not found in category page")
    # Find the '};' that immediately precedes getProductImage
    close_idx = content.rfind('};', 0, fn_idx)
    if close_idx == -1:
        raise ValueError("PRODUCT_IMAGES closing '};' not found")
    # Don't duplicate existing mobil entries
    new_str = "  // Mobil\n"
    for key in sorted(entries):
        if f'"{key}"' in content[:fn_idx]:
            continue  # already present
        new_str += f'  {qs(key)}: {qs(entries[key])},\n'
    if new_str.strip() == "// Mobil":
        return content  # Nothing to add
    return content[:close_idx] + new_str + content[close_idx:]


def patch_messages(lang: str, entries: dict):
    path = os.path.join(MSG, f"{lang}.json")
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    pd = d.setdefault("pd", {})
    added = 0
    for k, v in entries.items():
        if k not in pd:
            pd[k] = v
            added += 1
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f"  {lang}.json: +{added} entries")


def translate_via_api(products: list[dict], lang_name: str, lang_code: str) -> dict:
    try:
        import anthropic
    except ImportError:
        print(f"  anthropic not installed — skipping {lang_code}")
        return {}
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print(f"  ANTHROPIC_API_KEY not set — skipping {lang_code}")
        return {}
    client = anthropic.Anthropic(api_key=api_key)
    source = [
        {"slug": p["slug"], "type": p["type"], "description": p["description"],
         "f0": p["features"][0], "f1": p["features"][1],
         "f2": p["features"][2], "f3": p["features"][3]}
        for p in products
    ]
    prompt = (
        f"Translate these motor oil product fields from Turkish to {lang_name}.\n"
        f"Return ONLY a JSON object keyed by slug with translated type, description, f0-f3.\n"
        f"Do not add explanations.\n\nSource:\n{json.dumps(source, ensure_ascii=False)}"
    )
    print(f"  Calling Claude API for {lang_code}...")
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    # Extract JSON from response
    m = re.search(r'\{.*\}', raw, re.DOTALL)
    if not m:
        print(f"  No JSON found in {lang_code} response")
        return {}
    try:
        data = json.loads(m.group())
        return data
    except json.JSONDecodeError as e:
        print(f"  JSON parse error for {lang_code}: {e}")
        return {}


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    # Load scraped image paths
    scraped: dict = {}
    if os.path.exists(SCRAPED):
        with open(SCRAPED, encoding="utf-8") as f:
            scraped = json.load(f)
    else:
        print("WARNING: mobil_scraped.json not found — using assumed image paths")

    def img(slug: str) -> str | None:
        return (scraped.get(slug) or {}).get("image")

    # ── Patch product detail page ────────────────────────────────────────────
    with open(DETAIL, encoding="utf-8") as f:
        detail = f.read()

    # New motor products
    motor_ts = ""
    for p in MOTOR:
        motor_ts += "\n" + to_ts_entry(p, img(p["slug"]))
    detail = insert_before_block_close(detail, "const MOBIL_MOTOR_PRODUCTS: Record<string, ProductSpec>", motor_ts)

    # Add fullDescription + image to existing motor products
    for slug, fd in EXISTING_FD.items():
        scraped_text = (scraped.get(slug) or {}).get("desc_raw", "")
        if scraped_text and len(scraped_text) > 200:
            fd = scraped_text.strip()
        detail = add_fd_to_entry(detail, slug, fd)
        i = img(slug)
        if i:
            detail = update_image_in_entry(detail, slug, i)

    # New industrial products
    ind_ts = ""
    for p in INDUSTRIAL:
        ind_ts += "\n" + to_ts_entry(p, img(p["slug"]))
    detail = insert_before_block_close(detail, "const MOBIL_INDUSTRIAL_PRODUCTS: Record<string, ProductSpec>", ind_ts)

    with open(DETAIL, "w", encoding="utf-8") as f:
        f.write(detail)
    print(f"✓ detail page.tsx — {len(MOTOR)} motor + {len(INDUSTRIAL)} industrial products added")

    # ── Patch category page ──────────────────────────────────────────────────
    with open(CAT, encoding="utf-8") as f:
        cat = f.read()

    # BRAND_OVERRIDES
    motor_names = [p["name"] for p in MOTOR]
    ind_names   = [p["name"] for p in INDUSTRIAL]
    cat = extend_ts_array(cat, '"mobil:motor-yaglari"', motor_names)
    cat = extend_ts_array(cat, '"mobil:endustriyel-yaglar"', ind_names)

    # PRODUCT_IMAGES
    img_map: dict[str, str] = {}
    for p in MOTOR + INDUSTRIAL:
        s = p["slug"]
        path = img(s) or f"/images/products/mobil/{s}.jpg"
        img_map[f"mobil:{s}"] = path

    # Existing products
    for s in ["1-esp-x2-0w-20", "super-3000-x1-5w-40", "1-esp-0w-30", "1-esp-5w-30",
              "1-esp-x4-0w-40", "1-fs-5w-40", "1-new-life-0w-40", "super-3000-fe-5w-30",
              "super-2000-10w-40", "delvac-1-esp-5w-30", "delvac-1-esp-5w-40",
              "delvac-1300-super-15w-40", "super-1000-15w-40",
              "dte-10-excel-32", "dte-10-excel-46", "dte-10-excel-68", "dte-10-excel-100",
              "shc-630", "shc-632", "rarus-427", "rarus-shc-1024", "vactra-2", "grease-xhp-222"]:
        path = img(s) or f"/images/products/mobil/{s}.jpg"
        img_map[f"mobil:{s}"] = path

    # Alias for existing abbreviated name
    img_map["mobil:super-3000-fe-5w-30"] = img_map.get(
        "mobil:super-3000-formula-fe-5w-30",
        f"/images/products/mobil/super-3000-formula-fe-5w-30.jpg"
    )

    cat = patch_product_images(cat, img_map)

    with open(CAT, "w", encoding="utf-8") as f:
        f.write(cat)
    print(f"✓ category page.tsx — BRAND_OVERRIDES + {len(img_map)} PRODUCT_IMAGES entries")

    # ── Patch messages ───────────────────────────────────────────────────────
    all_products = MOTOR + INDUSTRIAL

    # Turkish (source language)
    tr_entries = {}
    for p in all_products:
        f_list = p["features"]
        tr_entries[p["slug"]] = {
            "type": p["type"],
            "description": p["description"],
            "f0": f_list[0], "f1": f_list[1], "f2": f_list[2], "f3": f_list[3],
        }
        if p.get("fd"):
            tr_entries[p["slug"]]["fd"] = p["fd"]
    # Also for existing products
    for slug, fd in EXISTING_FD.items():
        if slug not in tr_entries:
            tr_entries[slug] = {"fd": fd}
    patch_messages("tr", tr_entries)

    # English (hardcoded)
    en_entries = {}
    for p in all_products:
        en_entries[p["slug"]] = {
            "type": p["en_type"],
            "description": p["en_desc"],
            "f0": p["en_feat"][0], "f1": p["en_feat"][1],
            "f2": p["en_feat"][2], "f3": p["en_feat"][3],
        }
    patch_messages("en", en_entries)

    # Russian + Farsi via Anthropic API (optional)
    for lang_code, lang_name in [("ru", "Russian"), ("fa", "Persian/Farsi")]:
        translated = translate_via_api(all_products, lang_name, lang_code)
        if translated:
            entries = {}
            for slug, data in translated.items():
                entries[slug] = {
                    "type": data.get("type", ""),
                    "description": data.get("description", ""),
                    "f0": data.get("f0", ""), "f1": data.get("f1", ""),
                    "f2": data.get("f2", ""), "f3": data.get("f3", ""),
                }
            patch_messages(lang_code, entries)
        else:
            print(f"  {lang_code}: skipped (run with ANTHROPIC_API_KEY to translate)")

    print("\nAll done.")


if __name__ == "__main__":
    main()
