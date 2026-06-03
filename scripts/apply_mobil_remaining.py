#!/usr/bin/env python3
"""
Apply remaining Mobil patches:
  - category page.tsx (BRAND_OVERRIDES + PRODUCT_IMAGES)
  - messages/*.json (translations)

Run after apply_mobil.py has already patched the detail page.
Optionally set ANTHROPIC_API_KEY for ru/fa translations.
"""

import json, os, re

BASE    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.dirname(os.path.abspath(__file__))
MSG     = os.path.join(BASE, "messages")
LOC     = os.path.join(BASE, "src", "app", "[locale]", "brands", "[slug]", "[category]")
CAT     = os.path.join(LOC, "page.tsx")
SCRAPED = os.path.join(SCRIPTS, "mobil_scraped.json")

# ── Same product lists as apply_mobil.py (abbreviated for cat/messages) ──────

MOTOR_NAMES = [
    "Mobil 1 Extended Life 10W-60", "Mobil 1 FS New Life 0W-40",
    "Mobil 1 ESP Formula 5W-30", "Mobil 1 ESP 5W-30 Dexos2",
    "Mobil 1 FS 5W-50", "Mobil 1 ESP X3 0W-40",
    "Mobil Super 3000 Formula FE 5W-30", "Mobil Super 3000 XE 5W-30 C3",
    "Mobil Super 2000 X1 Diesel 10W-40",
    "Mobil Delvac XHP Ultra LE 5W-30", "Mobil Delvac 1 5W-40",
    "Mobil Delvac XHP LE 10W-40", "Mobil Delvac XHP Extra 10W-40",
    "Mobil Delvac XHP ESP 10W-40", "Mobil Delvac MX ESP 15W-40",
    "Mobil Delvac LCV F 5W-30", "Mobil Delvac MX 15W-40",
    "Mobil Delvac MX ESP 10W-30", "Mobil Delvac XHP 15W-40",
    "Mobil Delvac Super 20W-50", "Mobil Delvac 1350",
    "Mobil Delvac 1340", "Mobil Delvac 1330",
    "Mobil Delvac Super 1000 20W-50", "Mobil Delvac CT Diesel 10W-30",
]

IND_NAMES = [
    "Mobil SHC Pegasus 30", "Mobil Pegasus 805",
    "Mobil Pegasus 605", "Mobil Pegasus 610",
    "Mobil Pegasus 1005", "Mobil Pegasus 705",
]

MOTOR_SLUGS = [
    "1-extended-life-10w-60", "1-fs-new-life-0w-40", "1-esp-formula-5w-30",
    "1-esp-5w-30-dexos2", "1-fs-5w-50", "1-esp-x3-0w-40",
    "super-3000-formula-fe-5w-30", "super-3000-xe-5w-30-c3",
    "super-2000-x1-diesel-10w-40", "delvac-xhp-ultra-le-5w-30",
    "delvac-1-5w-40", "delvac-xhp-le-10w-40", "delvac-xhp-extra-10w-40",
    "delvac-xhp-esp-10w-40", "delvac-mx-esp-15w-40", "delvac-lcv-f-5w-30",
    "delvac-mx-15w-40", "delvac-mx-esp-10w-30", "delvac-xhp-15w-40",
    "delvac-super-20w-50", "delvac-1350", "delvac-1340", "delvac-1330",
    "delvac-super-1000-20w-50", "delvac-ct-diesel-10w-30",
]
IND_SLUGS = [
    "shc-pegasus-30", "pegasus-805", "pegasus-605",
    "pegasus-610", "pegasus-1005", "pegasus-705",
]
EXISTING_SLUGS = [
    "1-esp-x2-0w-20", "super-3000-x1-5w-40", "1-esp-0w-30", "1-esp-5w-30",
    "1-esp-x4-0w-40", "1-fs-5w-40", "1-new-life-0w-40", "super-3000-fe-5w-30",
    "super-2000-10w-40", "delvac-1-esp-5w-30", "delvac-1-esp-5w-40",
    "delvac-1300-super-15w-40", "super-1000-15w-40",
    "dte-10-excel-32", "dte-10-excel-46", "dte-10-excel-68", "dte-10-excel-100",
    "shc-630", "shc-632", "rarus-427", "rarus-shc-1024", "vactra-2", "grease-xhp-222",
]

# ── Translation data (same as apply_mobil.py) ─────────────────────────────────

TR_DATA = {
    "1-extended-life-10w-60": {"type": "Tam Sentetik", "description": "BMW M serisi ve yuksek performansli spor araclar icin formule edilmis tam sentetik motor yagi.", "f0": "BMW Longlife-98 onayli", "f1": "Yuksek yuk film dayanimi", "f2": "Spor motor korumasi", "f3": "Porsche A40 uyumlu"},
    "1-fs-new-life-0w-40": {"type": "Tam Sentetik", "description": "Sifir kilometreden itibaren motorunuzu korumak uzere gelistirilmis tam sentetik motor yagi.", "f0": "Sifir km'den tam koruma", "f1": "MB 229.5 onayli", "f2": "Porsche A40 onayli", "f3": "Ustun oksidasyon direnci"},
    "1-esp-formula-5w-30": {"type": "Tam Sentetik", "description": "Emisyon sonrasi sistemleri koruyan ACEA C3 sinifi tam sentetik ESP motor yagi.", "f0": "BMW LL-04 onayli", "f1": "MB 229.51 onayli", "f2": "VW 504/507 uyumlu", "f3": "DPF/GPF korumasi"},
    "1-esp-5w-30-dexos2": {"type": "Tam Sentetik", "description": "GM dexos2 lisansli tam sentetik ESP motor yagi.", "f0": "dexos2 lisansli", "f1": "BMW LL-04 onayli", "f2": "MB 229.51 onayli", "f3": "GPF/DPF uyumlu"},
    "1-fs-5w-50": {"type": "Tam Sentetik", "description": "Yuksek performansli spor araclar ve yaris motorlari icin gelistirilmis tam sentetik motor yagi.", "f0": "Yuksek RPM korumasi", "f1": "Porsche A40 onayli", "f2": "Asiri isi stabilitesi", "f3": "Spor surüs formulu"},
    "1-esp-x3-0w-40": {"type": "Tam Sentetik", "description": "Yuksek performansli Avrupa araclari icin ESP tam sentetik motor yagi.", "f0": "MB 229.5 onayli", "f1": "Porsche A40 onayli", "f2": "Genis arac uyumu", "f3": "Yuksek yuk dayanimi"},
    "super-3000-formula-fe-5w-30": {"type": "Tam Sentetik", "description": "Yakit ekonomisi odakli formülasyonuyla tasarlanmis tam sentetik motor yagi.", "f0": "Ford WSS-M2C913-D onayli", "f1": "Yakit tasarrufu teknolojisi", "f2": "A5/B5 sertifikali", "f3": "Dusuk surtunme formulu"},
    "super-3000-xe-5w-30-c3": {"type": "Tam Sentetik", "description": "Parciklu filtreleri olan araclar icin ACEA C3 sinifi DPF uyumlu tam sentetik motor yagi.", "f0": "C3 DPF uyumlu", "f1": "BMW LL-04 onayli", "f2": "MB 229.51 onayli", "f3": "Dusuk SAPS formulu"},
    "super-2000-x1-diesel-10w-40": {"type": "Yari Sentetik", "description": "Dizel motorlar icin optimize edilmis yari sentetik motor yagi.", "f0": "Dizel motor optimizasyonu", "f1": "VW 505.00 onayli", "f2": "Yuksek soot toleransi", "f3": "Ekonomik yari sentetik"},
    "delvac-xhp-ultra-le-5w-30": {"type": "Tam Sentetik (Agir Hizmet)", "description": "Son nesil Euro 6 agir hizmet dizel motorlari icin Low Emission tam sentetik motor yagi.", "f0": "CK-4 sertifikali", "f1": "Low-SAPS dusuk emisyon", "f2": "Euro 6 motor uyumlu", "f3": "Uzatilmis drain araligi"},
    "delvac-1-5w-40": {"type": "Tam Sentetik (Agir Hizmet)", "description": "Agir hizmet dizel motorlari icin dunya capinda onayli tam sentetik motor yagi.", "f0": "Tam sentetik agir hizmet", "f1": "Uzun drain araligi", "f2": "EGR motor uyumlu", "f3": "Genis OEM onay portfolyosu"},
    "delvac-xhp-le-10w-40": {"type": "Tam Sentetik (Agir Hizmet)", "description": "Dusuk emisyonlu agir hizmet dizel motorlari icin CK-4 sertifikali tam sentetik motor yagi.", "f0": "CK-4 onayli", "f1": "Low-SAPS formulu", "f2": "SCR/DPF uyumlu", "f3": "Ustun yuksek sicaklik stabilitesi"},
    "delvac-xhp-extra-10w-40": {"type": "Tam Sentetik (Agir Hizmet)", "description": "Genis agir hizmet arac yelpazesinde yuksek performans sunan CJ-4 sertifikali tam sentetik motor yagi.", "f0": "CJ-4 sertifikali", "f1": "Uzun drain araligi", "f2": "EGR uyumlu agir hizmet", "f3": "Ustun deposit kontrolu"},
    "delvac-xhp-esp-10w-40": {"type": "Tam Sentetik (Agir Hizmet)", "description": "Emisyon sonrasi sistemleri koruyan ESP teknolojili tam sentetik agir hizmet motor yagi.", "f0": "ESP emisyon sistemi dostu", "f1": "DPF dusuk SAPS formulu", "f2": "CJ-4 onayli", "f3": "Ustun deposit kontrolu"},
    "delvac-mx-esp-15w-40": {"type": "Mineral (Agir Hizmet)", "description": "Emisyon kontrol sistemleriyle uyumlu ekonomik mineral agir hizmet motor yagi.", "f0": "ESP emisyon sistemi uyumlu", "f1": "Ekonomik mineral formul", "f2": "CI-4 onayli", "f3": "Genis filo uyumlulugu"},
    "delvac-lcv-f-5w-30": {"type": "Tam Sentetik (Hafif Ticari)", "description": "Hafif ticari araclar icin ozellestirilmis tam sentetik motor yagi.", "f0": "Hafif ticari arac ozel", "f1": "Ford LCV onayli", "f2": "Uzun drain araligi", "f3": "Dusuk SAPS C3/E6 formulu"},
    "delvac-mx-15w-40": {"type": "Mineral (Agir Hizmet)", "description": "Agir hizmet dizel motorlari icin guvenilir ve ekonomik mineral motor yagi.", "f0": "CI-4 Plus sertifikali", "f1": "Ekonomik mineral formul", "f2": "Genis OEM onay portfolyosu", "f3": "Guvenilir agir hizmet korumasi"},
    "delvac-mx-esp-10w-30": {"type": "Mineral (Agir Hizmet)", "description": "Soguk iklim kosullarinda uygun ESP mineral agir hizmet motor yagi.", "f0": "Soguk start performansi", "f1": "ESP emisyon uyumlu", "f2": "Ekonomik mineral formul", "f3": "CI-4 onayli"},
    "delvac-xhp-15w-40": {"type": "Tam Sentetik (Agir Hizmet)", "description": "CJ-4 sertifikali yuksek performansli agir hizmet tam sentetik motor yagi.", "f0": "CJ-4 sertifikali", "f1": "Uzun drain araligi", "f2": "Ustun motor temizligi", "f3": "EGR motor uyumlu"},
    "delvac-super-20w-50": {"type": "Mineral (Agir Hizmet)", "description": "Tropikal ve yuksek cevre sicakligi kosullarinda agir hizmet dizel motorlari icin mineral motor yagi.", "f0": "Yuksek sicaklik stabilitesi", "f1": "Tropikal iklim uyumlu", "f2": "CH-4 sertifikali", "f3": "Ekonomik mineral formul"},
    "delvac-1350": {"type": "Mineral (Agir Hizmet, Monograde)", "description": "SAE 50 monograde agir hizmet dizel motor yagi.", "f0": "SAE 50 monograde formulu", "f1": "Eski nesil motor uyumlu", "f2": "Yuksek sicaklik korumasi", "f3": "Mineral ekonomik secenek"},
    "delvac-1340": {"type": "Mineral (Agir Hizmet, Monograde)", "description": "SAE 40 monograde agir hizmet dizel motor yagi.", "f0": "SAE 40 monograde formulu", "f1": "Eski dizel motor uyumlu", "f2": "Temel agir hizmet korumasi", "f3": "Ekonomik mineral secenek"},
    "delvac-1330": {"type": "Mineral (Agir Hizmet, Monograde)", "description": "SAE 30 monograde agir hizmet motor yagi.", "f0": "SAE 30 monograde formulu", "f1": "Caterpillar TO-2 onayli", "f2": "Temel agir hizmet formulu", "f3": "Ekonomik mineral yag"},
    "delvac-super-1000-20w-50": {"type": "Mineral (Agir Hizmet)", "description": "Buyuk arac filolari icin formule edilmis mineral agir hizmet motor yagi.", "f0": "Filo bakim ekonomisi", "f1": "Yuksek sicaklik stabilitesi", "f2": "CH-4 sertifikali", "f3": "Mineral ekonomik formul"},
    "delvac-ct-diesel-10w-30": {"type": "Mineral (Agir Hizmet)", "description": "Konvansiyonel teknoloji dizel motorlari icin CI-4 onayli mineral motor yagi.", "f0": "Soguk iklim start performansi", "f1": "CI-4 onayli", "f2": "Konvansiyonel dizel uyumlu", "f3": "Ekonomik mineral formul"},
    "shc-pegasus-30": {"type": "Gaz Motor Yagi (Tam Sentetik)", "description": "Dort zamanlı stasyoner dogal gaz motorlari icin gelistirilmis PAO bazli tam sentetik gaz motor yagi.", "f0": "PAO tam sentetik formul", "f1": "Dusuk deposit olusumu", "f2": "Uzun degisim araligi", "f3": "Gaz motoru optimizasyonu"},
    "pegasus-805": {"type": "Gaz Motor Yagi (Mineral)", "description": "Yuksek TBN kapasiteli dort zamanlı stasyoner dogal gaz motorlari icin mineral gaz motor yagi.", "f0": "Yuksek TBN kapasitesi", "f1": "Asit korozyon korumasi", "f2": "Dogal gaz motor uyumlu", "f3": "Guvenilir mineral formul"},
    "pegasus-605": {"type": "Gaz Motor Yagi (Mineral)", "description": "Orta duzey dort zamanlı stasyoner dogal gaz motorlari icin mineral gaz motor yagi.", "f0": "Gaz ve biyogaz motor uyumlu", "f1": "Orta TBN alkali rezerv", "f2": "Ekonomik mineral formul", "f3": "Stasyoner motor optimizasyonu"},
    "pegasus-610": {"type": "Gaz Motor Yagi (Mineral)", "description": "Dort zamanlı stasyoner dogal gaz motorlari icin yuksek performansli mineral gaz motor yagi.", "f0": "Yuksek oksidasyon direnci", "f1": "Uzun calisma suresi performansi", "f2": "Gaz motor uyumlu", "f3": "Mineral ekonomik formul"},
    "pegasus-1005": {"type": "Gaz Motor Yagi (Mineral, Yuksek Kul)", "description": "Kirli veya yuksek kukurtlu gaz yakitlariyla calisan agir hizmet gaz motorlari icin yuksek TBN'li mineral gaz motor yagi.", "f0": "En yuksek TBN kapasitesi", "f1": "Kirli gaz yakit toleransi", "f2": "Guclu asit notralizasyonu", "f3": "Agir hizmet gaz motoru"},
    "pegasus-705": {"type": "Gaz Motor Yagi (Mineral)", "description": "Dort zamanlı stasyoner dogal gaz motorlari icin guncellenmiş formulasyonlu mineral gaz motor yagi.", "f0": "Guncellenmiş gaz motor formulu", "f1": "Gelismis motor temizligi", "f2": "Korozyon korumasi", "f3": "Mineral ekonomik yag"},
}

EN_DATA = {
    "1-extended-life-10w-60": {"type": "Fully Synthetic", "description": "Wide-viscosity fully synthetic motor oil for BMW M-series and high-performance sports cars.", "f0": "BMW Longlife-98 approved", "f1": "High-load film strength", "f2": "Sports engine protection", "f3": "Porsche A40 compatible"},
    "1-fs-new-life-0w-40": {"type": "Fully Synthetic", "description": "Fully synthetic motor oil engineered to protect your engine from new. MB 229.5 and Porsche A40 approved.", "f0": "From-new engine protection", "f1": "MB 229.5 approved", "f2": "Porsche A40 approved", "f3": "Superior oxidation resistance"},
    "1-esp-formula-5w-30": {"type": "Fully Synthetic", "description": "ACEA C3 fully synthetic ESP motor oil protecting emission aftertreatment systems. BMW LL-04 and MB 229.51 approved.", "f0": "BMW LL-04 approved", "f1": "MB 229.51 approved", "f2": "VW 504/507 compatible", "f3": "DPF/GPF protection"},
    "1-esp-5w-30-dexos2": {"type": "Fully Synthetic", "description": "GM dexos2 licensed fully synthetic ESP motor oil. Approved by BMW, Mercedes-Benz and Volkswagen Group.", "f0": "dexos2 licensed", "f1": "BMW LL-04 approved", "f2": "MB 229.51 approved", "f3": "GPF/DPF compatible"},
    "1-fs-5w-50": {"type": "Fully Synthetic", "description": "Wide-viscosity fully synthetic motor oil for high-performance sports cars and racing engines.", "f0": "High-RPM protection", "f1": "Porsche A40 approved", "f2": "Extreme heat stability", "f3": "Sports performance formula"},
    "1-esp-x3-0w-40": {"type": "Fully Synthetic", "description": "Fully synthetic ESP motor oil for high-performance European vehicles. MB 229.5 and Porsche A40 approved.", "f0": "MB 229.5 approved", "f1": "Porsche A40 approved", "f2": "Broad vehicle compatibility", "f3": "High-load durability"},
    "super-3000-formula-fe-5w-30": {"type": "Fully Synthetic", "description": "Fuel Economy focused fully synthetic motor oil for Ford EcoBoost and other modern engines.", "f0": "Ford WSS-M2C913-D approved", "f1": "Fuel economy technology", "f2": "A5/B5 certified", "f3": "Low-friction formula"},
    "super-3000-xe-5w-30-c3": {"type": "Fully Synthetic", "description": "ACEA C3 DPF-compatible fully synthetic motor oil for vehicles with particulate filters.", "f0": "C3 DPF compatible", "f1": "BMW LL-04 approved", "f2": "MB 229.51 approved", "f3": "Low SAPS formula"},
    "super-2000-x1-diesel-10w-40": {"type": "Semi-Synthetic", "description": "Semi-synthetic motor oil optimised for diesel engines with high soot tolerance.", "f0": "Diesel engine optimised", "f1": "VW 505.00 approved", "f2": "High soot tolerance", "f3": "Semi-synthetic economy"},
    "delvac-xhp-ultra-le-5w-30": {"type": "Fully Synthetic (Heavy Duty)", "description": "Low Emission fully synthetic heavy-duty motor oil for Euro 6 engines with extended drain intervals.", "f0": "CK-4 certified", "f1": "Low SAPS / low emission", "f2": "Euro 6 engine compatible", "f3": "Extended drain intervals"},
    "delvac-1-5w-40": {"type": "Fully Synthetic (Heavy Duty)", "description": "Globally approved fully synthetic motor oil for heavy-duty diesel engines.", "f0": "Full synthetic heavy duty", "f1": "Extended drain intervals", "f2": "EGR engine compatible", "f3": "Broad OEM approvals"},
    "delvac-xhp-le-10w-40": {"type": "Fully Synthetic (Heavy Duty)", "description": "CK-4 certified low-emission fully synthetic heavy-duty motor oil.", "f0": "CK-4 certified", "f1": "Low SAPS formula", "f2": "SCR/DPF compatible", "f3": "Superior high-temperature stability"},
    "delvac-xhp-extra-10w-40": {"type": "Fully Synthetic (Heavy Duty)", "description": "CJ-4 certified fully synthetic motor oil for a broad range of heavy-duty engines.", "f0": "CJ-4 certified", "f1": "Extended drain intervals", "f2": "EGR-compatible protection", "f3": "Superior deposit control"},
    "delvac-xhp-esp-10w-40": {"type": "Fully Synthetic (Heavy Duty)", "description": "Fully synthetic heavy-duty ESP motor oil protecting emission aftertreatment systems.", "f0": "ESP emission system friendly", "f1": "DPF low-SAPS formula", "f2": "CJ-4 certified", "f3": "Superior deposit control"},
    "delvac-mx-esp-15w-40": {"type": "Mineral (Heavy Duty)", "description": "Cost-effective mineral heavy-duty motor oil compatible with emission control systems.", "f0": "ESP emission system compatible", "f1": "Cost-effective mineral formula", "f2": "CI-4 certified", "f3": "Broad fleet compatibility"},
    "delvac-lcv-f-5w-30": {"type": "Fully Synthetic (Light Commercial)", "description": "Fully synthetic motor oil engineered for light commercial vehicles. Ford and Fiat approved.", "f0": "Light commercial vehicle specific", "f1": "Ford LCV approved", "f2": "Extended drain intervals", "f3": "Low SAPS C3/E6 formula"},
    "delvac-mx-15w-40": {"type": "Mineral (Heavy Duty)", "description": "Reliable and cost-effective mineral motor oil for heavy-duty diesel engines.", "f0": "CI-4 Plus certified", "f1": "Cost-effective mineral formula", "f2": "Broad OEM approvals", "f3": "Reliable heavy-duty protection"},
    "delvac-mx-esp-10w-30": {"type": "Mineral (Heavy Duty)", "description": "ESP mineral heavy-duty motor oil for cold-climate operation.", "f0": "Cold-climate start performance", "f1": "ESP emission compatible", "f2": "Cost-effective mineral formula", "f3": "CI-4 certified"},
    "delvac-xhp-15w-40": {"type": "Fully Synthetic (Heavy Duty)", "description": "CJ-4 certified fully synthetic heavy-duty motor oil. Extended drain intervals reduce fleet costs.", "f0": "CJ-4 certified", "f1": "Extended drain intervals", "f2": "Superior engine cleanliness", "f3": "EGR engine compatible"},
    "delvac-super-20w-50": {"type": "Mineral (Heavy Duty)", "description": "Mineral motor oil for heavy-duty diesel engines in tropical and high-temperature conditions.", "f0": "High-temperature stability", "f1": "Tropical climate suitable", "f2": "CH-4 certified", "f3": "Cost-effective mineral formula"},
    "delvac-1350": {"type": "Mineral (Heavy Duty, Monograde)", "description": "SAE 50 monograde mineral motor oil for older heavy-duty diesel engines.", "f0": "SAE 50 monograde formula", "f1": "Legacy engine compatible", "f2": "High-temperature film protection", "f3": "Cost-effective mineral option"},
    "delvac-1340": {"type": "Mineral (Heavy Duty, Monograde)", "description": "SAE 40 monograde mineral motor oil for older heavy-duty diesel engines and equipment.", "f0": "SAE 40 monograde formula", "f1": "Legacy diesel engine compatible", "f2": "Basic heavy-duty protection", "f3": "Cost-effective mineral option"},
    "delvac-1330": {"type": "Mineral (Heavy Duty, Monograde)", "description": "SAE 30 monograde heavy-duty mineral motor oil compatible with Caterpillar equipment.", "f0": "SAE 30 monograde formula", "f1": "Caterpillar TO-2 approved", "f2": "Basic heavy-duty protection", "f3": "Cost-effective mineral oil"},
    "delvac-super-1000-20w-50": {"type": "Mineral (Heavy Duty)", "description": "Mineral heavy-duty motor oil for large fleet operations in high-temperature environments.", "f0": "Fleet maintenance economy", "f1": "High-temperature stability", "f2": "CH-4 certified", "f3": "Cost-effective mineral formula"},
    "delvac-ct-diesel-10w-30": {"type": "Mineral (Heavy Duty)", "description": "CI-4 approved mineral motor oil for conventional technology heavy-duty diesel engines.", "f0": "Cold-climate start performance", "f1": "CI-4 approved", "f2": "Conventional diesel compatible", "f3": "Cost-effective mineral formula"},
    "shc-pegasus-30": {"type": "Gas Engine Oil (Fully Synthetic)", "description": "PAO-based fully synthetic gas engine oil for four-stroke stationary natural gas engines.", "f0": "PAO fully synthetic formula", "f1": "Low deposit formation", "f2": "Extended drain intervals", "f3": "Gas engine optimised"},
    "pegasus-805": {"type": "Gas Engine Oil (Mineral)", "description": "High-TBN mineral gas engine oil for four-stroke stationary natural gas engines.", "f0": "High TBN capacity", "f1": "Acid corrosion protection", "f2": "Natural gas engine compatible", "f3": "Reliable mineral formula"},
    "pegasus-605": {"type": "Gas Engine Oil (Mineral)", "description": "Mineral gas engine oil for mid-range stationary natural gas and biogas engines.", "f0": "Gas and biogas engine compatible", "f1": "Medium TBN alkalinity reserve", "f2": "Economical mineral formula", "f3": "Stationary engine optimised"},
    "pegasus-610": {"type": "Gas Engine Oil (Mineral)", "description": "High-performance mineral gas engine oil for four-stroke stationary natural gas engines.", "f0": "High oxidation resistance", "f1": "Long runtime performance", "f2": "Gas engine compatible", "f3": "Cost-effective mineral formula"},
    "pegasus-1005": {"type": "Gas Engine Oil (Mineral, High Ash)", "description": "High-TBN mineral gas engine oil for heavy-duty engines on impure or high-sulphur gas fuels.", "f0": "Highest TBN capacity", "f1": "Impure gas fuel tolerance", "f2": "Maximum acid neutralisation", "f3": "Heavy-duty gas engine formula"},
    "pegasus-705": {"type": "Gas Engine Oil (Mineral)", "description": "Updated-formulation mineral gas engine oil for four-stroke stationary natural gas engines.", "f0": "Updated gas engine formula", "f1": "Enhanced engine cleanliness", "f2": "Corrosion protection", "f3": "Cost-effective mineral oil"},
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def qs(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


def extend_ts_array(content, array_key, new_items):
    idx = content.find(array_key)
    if idx == -1:
        print(f"  WARNING: {array_key!r} not found")
        return content
    open_b = content.index('[', idx)
    depth = 0
    i = open_b
    in_str = None
    while i < len(content):
        c = content[i]
        if in_str:
            if c == '\\': i += 2; continue
            if c == in_str: in_str = None
        else:
            if c in ('"', "'"): in_str = c
            elif c == '[': depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    # Only add names not already in the array
                    existing = content[open_b:i]
                    new_str = ""
                    for item in new_items:
                        if f'"{item}"' not in existing:
                            new_str += f'\n    {qs(item)},'
                    if new_str:
                        new_str += "\n  "
                        return content[:i] + new_str + content[i:]
                    return content
        i += 1
    raise ValueError(f"No closing bracket for {array_key!r}")


def patch_product_images(content, entries):
    marker = 'function getProductImage'
    fn_idx = content.find(marker)
    if fn_idx == -1:
        raise ValueError("getProductImage not found")
    close_idx = content.rfind('};', 0, fn_idx)
    if close_idx == -1:
        raise ValueError("PRODUCT_IMAGES closing not found")
    new_str = "  // Mobil\n"
    added = 0
    for key in sorted(entries):
        if f'"{key}"' in content[:fn_idx]:
            continue
        new_str += f'  {qs(key)}: {qs(entries[key])},\n'
        added += 1
    if added == 0:
        return content
    return content[:close_idx] + new_str + content[close_idx:]


def patch_messages(lang, entries):
    path = os.path.join(MSG, f"{lang}.json")
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    pd = d.setdefault("pd", {})
    added = sum(1 for k in entries if k not in pd)
    pd.update({k: v for k, v in entries.items() if k not in pd})
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f"  {lang}.json: +{added} new entries")


def translate_via_api(slugs_data, lang_name, lang_code):
    try:
        import anthropic
    except ImportError:
        print(f"  {lang_code}: anthropic not installed, skipping")
        return {}
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print(f"  {lang_code}: no ANTHROPIC_API_KEY, skipping")
        return {}
    client = anthropic.Anthropic(api_key=api_key)
    source = [{"slug": s, **v} for s, v in slugs_data.items()]
    prompt = (
        f"Translate these lubricant product fields from Turkish to {lang_name}. "
        f"Return ONLY valid JSON keyed by slug. Each value has: type, description, f0, f1, f2, f3.\n\n"
        f"{json.dumps(source, ensure_ascii=False)}"
    )
    print(f"  Calling Claude API for {lang_code}...")
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=6000,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    m = re.search(r'\{.*\}', raw, re.DOTALL)
    if not m:
        print(f"  {lang_code}: no JSON in response")
        return {}
    try:
        return json.loads(m.group())
    except json.JSONDecodeError as e:
        print(f"  {lang_code}: JSON parse error: {e}")
        return {}


def main():
    scraped = {}
    if os.path.exists(SCRAPED):
        with open(SCRAPED, encoding="utf-8") as f:
            scraped = json.load(f)

    def imgpath(slug):
        return (scraped.get(slug) or {}).get("image") or f"/images/products/mobil/{slug}.jpg"

    # ── Category page ────────────────────────────────────────────────────────
    with open(CAT, encoding="utf-8") as f:
        cat = f.read()

    cat = extend_ts_array(cat, '"mobil:motor-yaglari"', MOTOR_NAMES)
    cat = extend_ts_array(cat, '"mobil:endustriyel-yaglar"', IND_NAMES)

    img_map = {}
    for s in MOTOR_SLUGS + IND_SLUGS + EXISTING_SLUGS:
        img_map[f"mobil:{s}"] = imgpath(s)
    # Alias for old abbreviated key
    img_map["mobil:super-3000-fe-5w-30"] = imgpath("super-3000-formula-fe-5w-30")

    cat = patch_product_images(cat, img_map)

    with open(CAT, "w", encoding="utf-8") as f:
        f.write(cat)
    print(f"category page.tsx: BRAND_OVERRIDES + {sum(1 for k in img_map if 'mobil:' in k)} PRODUCT_IMAGES")

    # ── Messages ─────────────────────────────────────────────────────────────
    print("Patching messages...")
    patch_messages("tr", TR_DATA)
    patch_messages("en", EN_DATA)

    for lang_code, lang_name in [("ru", "Russian"), ("fa", "Persian/Farsi")]:
        translated = translate_via_api(TR_DATA, lang_name, lang_code)
        if translated:
            clean = {s: {k: v for k, v in data.items() if k in ("type","description","f0","f1","f2","f3")}
                     for s, data in translated.items() if isinstance(data, dict)}
            patch_messages(lang_code, clean)
        else:
            print(f"  {lang_code}: skipped (set ANTHROPIC_API_KEY to translate)")

    print("Done.")


if __name__ == "__main__":
    main()
