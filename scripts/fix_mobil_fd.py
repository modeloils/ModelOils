#!/usr/bin/env python3
"""Fix fullDescription for existing Mobil products — replace scraped garbage with proper text."""

import os

BASE   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOC    = os.path.join(BASE, "src", "app", "[locale]", "brands", "[slug]", "[category]")
DETAIL = os.path.join(LOC, "[product]", "page.tsx")

# Proper Turkish fullDescriptions for existing products
EXISTING_FD = {
    "1-esp-x2-0w-20": (
        "BMW'nin en son verimlilik standardi LL-17FE+'yi karsilayan ultra dusuk viskoziteli"
        " tam sentetik motor yagi.\n\nEn ileri Mobil 1 ESP teknolojisiyle formule edilen bu yag,"
        " hibrit araclar dahil en modern BMW, Mercedes-Benz ve VW Group araclarinda maksimum yakit"
        " ekonomisi ve ustun motor korumasi saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* Yakit tuketimini minimize eden ultra dusuk viskozite\n"
        "* BMW LL-17FE+ ve LL-14FE+ onayli\n"
        "* Hibrit ve stop-start sistemlerle uyumluluk\n"
        "* Soguk start aninda anlik yaglama koruma\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA C5\nBMW LL-17FE+\nMB 229.71\nVW 508 00/509 00"
    ),
    "1-esp-0w-30": (
        "Mercedes-Benz 229.51 ve Porsche A40 onayli, ACEA C3 sinifi tam sentetik ESP motor yagi.\n\n"
        "Dusuk SAPS formulasyonuyla dizel partikul filtreleri ve emisyon sonrasi sistemleri korurken"
        " Mercedes-Benz ve Porsche araclarinda uzun servis araligi saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* DPF uyumlu dusuk SAPS formulu\n* MB 229.51 uzun servis araligi uyumu\n"
        "* Ustun soguk start korumasi\n* Yuksek sicaklik oksidasyonuna karsi direnc\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA C3\nMB 229.51, MB 229.31\nPorsche A40"
    ),
    "1-esp-5w-30": (
        "En genis OEM onay portfolyosuna sahip tam sentetik ESP motor yagi — BMW LL-04,"
        " MB 229.51 ve VW 504.00/507.00 onayli.\n\nDPF ve GPF filtreli araclar icin dusuk SAPS"
        " formulasyonuyla BMW, Mercedes-Benz ve Volkswagen Group araclarinda uzun servis araligi"
        " ve ustun koruma saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* En genis OEM onay portfolyosu (BMW, MB, VW)\n* DPF ve GPF uyumlu Low-SAPS\n"
        "* Uzatilmis servis araligi\n* Motor temizleyici ESP formulu\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA C3\nBMW LL-04\nMB 229.51\nVW 504.00/507.00"
    ),
    "1-esp-x4-0w-40": (
        "Yuksek performansli spor ve lüks Avrupa araclari icin gelistirilmis ust duzey tam sentetik"
        " ESP motor yagi.\n\nMB 229.5 ve Porsche A40 onayli genis sicaklik araligi formulasyonuyla"
        " spor araclarda maksimum motor korumasi ve yakit verimliligi saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* MB 229.5 ve Porsche A40 onayli\n* Genis sicaklik araliginda viskozite stabilitesi\n"
        "* Yuksek yuk altinda ustun film dayanimi\n* Spor arac motor korumasi\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA A3/B4\nMB 229.5\nPorsche A40\nRenault RN0700"
    ),
    "1-fs-5w-40": (
        "Dunya genelinde milyonlarca arac tarafindan guvenilen Mobil 1'in FS (Fully Synthetic)"
        " tam sentetik formulu.\n\nVW, Mercedes-Benz, Porsche ve diger onde gelen ureticilerin"
        " onaylariyla kuresel arac yelpazesi icin guclu ve evrensel motor korumasi saglar.\n\n"
        "PERFORMANS OZELLIKLERI\n"
        "* Kuresel OEM onaylari (VW, MB, Porsche)\n* Yil boyu her kosulda guvenilir koruma\n"
        "* Ustun soguk start ve yuksek sicaklik stabilitesi\n* Motor temizleyici deposit onleyici formul\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nVW 502.00/505.00\nMB 229.3\nPorsche A40"
    ),
    "1-new-life-0w-40": (
        "Sifirdan itibaren motorunuzu koruyan Mobil 1 tam sentetik motor yagi.\n\n"
        "Mercedes-Benz 229.5 ve Porsche onayli formulasyonuyla yuksek performansli arac motorlarinda"
        " yeni motor omru boyunca ustun oksidasyon ve termal stabilite saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* Sifir kilometreden itibaren ustun koruma\n* MB 229.5 uzun servis araligi uyumu\n"
        "* Ustun oksidasyon ve nitrasyon direnci\n* Motor temizleyici formul\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nMB 229.5\nPorsche A40\nRenault RN0700"
    ),
    "super-3000-fe-5w-30": (
        "Yakit ekonomisi odakli formulasyonuyla tasarlanmis A5/B5 sinifi tam sentetik motor yagi.\n\n"
        "Ford EcoBoost ve A5/B5 gerektiren diger modern motorlarda dusuk surtunme avantaji ve yakit"
        " tasarrufu saglarken mukemmel motor korumasi sunar.\n\nPERFORMANS OZELLIKLERI\n"
        "* Ford ve Renault onayli yakit ekonomisi formulu\n* A5/B5 dusuk surtunme teknolojisi\n"
        "* Soguk start aninda hizli yaglama\n* Ustun motor temizligi\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA A5/B5\nFord WSS-M2C913-D\nRenault RN0700"
    ),
    "super-3000-x1-5w-40": (
        "Genis arac yelpazesi icin ustun koruma sunan A3/B3/B4 sinifi tam sentetik motor yagi.\n\n"
        "MB 229.3 ve VW 502/505 onayli formulasyonuyla hem benzinli hem dizel motorlarda yuksek"
        " sicaklik korumasi ve uzun motor temizligi saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* Genis OEM onay portfolyosu (MB, VW, Renault)\n* Yuksek sicaklik motor korumasi\n"
        "* Motor temizleyici deposit onleyici\n* Tam sentetik uzun omur formulu\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SN/CF\nACEA A3/B3/B4\nMB 229.3\nVW 502.00/505.00\nRenault RN0700/RN0710"
    ),
    "super-2000-10w-40": (
        "Genis arac yelpazesinde ekonomik koruma sunan yari sentetik motor yagi.\n\n"
        "VW ve Mercedes-Benz onayli formulasyonuyla hem benzinli hem de dizel motorlarda standart"
        " bakim ihtiyaclarini karsilayan ekonomik yari sentetik secnek.\n\nPERFORMANS OZELLIKLERI\n"
        "* Genis arac ve motor uyumu\n* VW 501.01/505.00 ve MB 229.1 onayli\n"
        "* Ekonomik yari sentetik formulasyon\n* Benzinli ve dizel motor uyumlulugu\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SL/CF\nACEA A3/B3\nVW 501.01/505.00\nMB 229.1"
    ),
    "delvac-1-esp-5w-30": (
        "Euro 6 agir hizmet dizel motorlari icin gelistirilmis CK-4 sertifikali tam sentetik ESP motor yagi.\n\n"
        "SCR ve DPF sistemleriyle tam uyumlu Low-SAPS formulasyonuyla en guncel emisyon standartlarini"
        " karsilarken uzatilmis servis araligi saglar.\n\nPERFORMANS OZELLIKLERI\n"
        "* CK-4 / Euro 6 uyumu\n* SCR ve DPF Low-SAPS korumasi\n"
        "* Uzatilmis yag degisim araligi\n* Ustun soot ve deposit kontrolu\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI CK-4/SN\nACEA E6, E9\nVolvo VDS-4.5\nMack EO-O Premium Plus\nCummins CES 20086\nMB 228.51"
    ),
    "delvac-1-esp-5w-40": (
        "Agir hizmet kamyon ve otobus motorlari icin yuksek performansli CJ-4 sertifikali tam sentetik"
        " ESP motor yagi.\n\nUzun servis araliklari ve ustun deposit kontrolu ile filo isletme"
        " maliyetlerini dusururken motor guvenilirligini artirir.\n\nPERFORMANS OZELLIKLERI\n"
        "* CJ-4 EGR motor korumasi\n* Uzatilmis yag degisim araligi\n"
        "* Ustun deposit ve soot kontrolu\n* Yakit ekonomisi katkisi\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI CJ-4/SN\nACEA E7\nVolvo VDS-4\nMack EO-O Premium Plus\nCummins CES 20081\nMB 228.51"
    ),
    "delvac-1300-super-15w-40": (
        "Agir hizmet dizel motorlari icin guvenilir CI-4 Plus sertifikali mineral motor yagi.\n\n"
        "Genis OEM onay portfolyoyle buyuk filolar icin maliyet etkin, guvenilir agir hizmet korumasi saglar.\n\n"
        "PERFORMANS OZELLIKLERI\n"
        "* CI-4 Plus EGR motor korumasi\n* Genis OEM onay portfolyosu\n"
        "* Buyuk filo operasyonlari icin ekonomik\n* Guvenilir mineral agir hizmet formulu\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI CI-4 Plus/SL\nACEA E7\nCummins CES 20076\nMAN M3275\nMB 228.3\nVolvo VDS-3"
    ),
    "super-1000-15w-40": (
        "Standart bakim gereksinimlerini karsilayan ekonomik mineral motor yagi.\n\n"
        "Eski nesil benzinli ve dizel motorlarda temel koruma ihtiyaclarini karsilayan guvenilir"
        " mineral formulasyon.\n\nPERFORMANS OZELLIKLERI\n"
        "* Genis benzinli/dizel motor uyumu\n* MB 229.1 standart servis onayi\n"
        "* Temel motor korumasi ve temizligi\n* Ekonomik mineral formulasyon\n\n"
        "STANDARTLAR VE SPESIFIKASYONLAR\nAPI SL/CF\nACEA A3/B3\nMB 229.1"
    ),
}


def replace_fd(content: str, slug: str, new_fd: str) -> str:
    """Replace the fullDescription content for a specific product entry."""
    marker = f'  "{slug}": {{'
    idx = content.find(marker)
    if idx == -1:
        print(f"  {slug}: entry not found, skipping")
        return content

    # Find fullDescription: ` within this entry
    entry_end = content.find('\n  },', idx)
    if entry_end == -1:
        print(f"  {slug}: entry closing not found, skipping")
        return content

    fd_marker = 'fullDescription: `'
    fd_start = content.find(fd_marker, idx)
    if fd_start == -1 or fd_start > entry_end:
        print(f"  {slug}: no fullDescription, skipping")
        return content

    # Position of opening backtick
    bt_open = fd_start + len(fd_marker) - 1  # points to the opening `

    # Find closing backtick after content
    bt_close = content.find('`', bt_open + 1)
    if bt_close == -1:
        print(f"  {slug}: no closing backtick, skipping")
        return content

    # Escape backticks in new content
    new_fd_escaped = new_fd.replace('`', '\\`').replace('${', '\\${')

    # Replace content between backticks
    new_content = content[:bt_open + 1] + new_fd_escaped + content[bt_close:]
    print(f"  {slug}: replaced {bt_close - bt_open - 1} chars with {len(new_fd_escaped)} chars")
    return new_content


def main():
    with open(DETAIL, encoding='utf-8') as f:
        content = f.read()

    for slug, fd in EXISTING_FD.items():
        content = replace_fd(content, slug, fd)

    with open(DETAIL, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Done.")


if __name__ == "__main__":
    main()
