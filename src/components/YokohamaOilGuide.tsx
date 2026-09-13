import { LocaleLink, useTranslation } from "@/lib/i18n";
import { YOKOHAMA_CATEGORY_DATA } from "@/lib/yokohama-products";

const passengerCategory = "Binek-Arac-Motor-Yaglari";

export function YokohamaOilGuide({ introOnly = false }: { introOnly?: boolean }) {
  const { locale } = useTranslation();
  if (locale !== "en" && locale !== "tr") return null;
  const tr = locale === "tr";
  if (introOnly)
    return (
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
        {tr
          ? "Yokohama motor yağı ve madeni yağ ürünlerini araç tipine ve viskoziteye göre inceleyin. MODEL GRUP, Orta Doğu ve Avrupa için yetkili distribütör olarak binek araç, ağır hizmet ve motosiklet motor yağlarının yanı sıra şanzıman yağları, endüstriyel yağlar ve gresler sunar."
          : "Explore Yokohama motor oil, engine oil and lubricants by vehicle type and viscosity. MODEL GRUP supplies passenger car, heavy-duty diesel and motorcycle oils, alongside transmission fluids, industrial lubricants and greases, as the authorized distributor for the Middle East and Europe."}
      </p>
    );
  const grades = Object.keys(YOKOHAMA_CATEGORY_DATA[passengerCategory].subcategories ?? {}).filter(
    (grade) => grade !== "Other",
  );
  const questions = tr
    ? [
        [
          "Hangi Yokohama motor yağını seçmeliyim?",
          "Aracınızın kullanım kılavuzundaki SAE viskozitesini, API veya ACEA performans sınıfını ve üretici şartnamesini kontrol edin. Aynı viskozitedeki yağların özellikleri farklı olabilir; ürün sayfasındaki standartları ve teknik bilgileri karşılaştırın.",
        ],
        [
          "Yokohama motor yağı fiyatı ve toptan sipariş bilgisi nasıl alınır?",
          "Teklif için ürün adını, viskoziteyi, ambalajı, sipariş miktarını ve teslimat ülkesini MODEL GRUP ile paylaşın. Distribütörlük ve ihracat talepleriniz için iletişim sayfasını kullanabilirsiniz.",
        ],
        [
          "Yokohama yağ kataloğunu nereden indirebilirim?",
          "Kataloglar sayfasından Yokohama motor yağı kataloğunu indirebilir, ürün kategorilerini ve ambalaj seçeneklerini inceleyebilirsiniz. Ürün seçimini aracınızın veya ekipmanınızın gereksinimlerine göre yapın.",
        ],
      ]
    : [
        [
          "Which Yokohama engine oil should I choose?",
          "Check the SAE viscosity, API or ACEA performance category and manufacturer specification required in your vehicle handbook. Oils with the same viscosity can have different specifications, so compare the standards and technical information on each product page.",
        ],
        [
          "How can I get Yokohama motor oil prices or order wholesale?",
          "Send MODEL GRUP the product name, viscosity grade, packaging, order quantity and destination country for a quotation. Use the contact page for distributor enquiries and export supply requests.",
        ],
        [
          "Where can I download the Yokohama oil catalogue?",
          "The catalogues page includes the Yokohama motor oil catalogue with product categories and packaging options. Match the product information to your vehicle or equipment requirements before choosing an oil.",
        ],
      ];
  return (
    <section className="border-b border-border bg-background/35 py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {tr
              ? "Viskoziteye göre Yokohama motor yağları"
              : "Find Yokohama motor oil by viscosity"}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {tr
              ? "Binek araç motor yağlarını SAE sınıfına göre karşılaştırın. Her grupta ürün açıklamalarını, standartları ve ambalaj seçeneklerini inceleyebilirsiniz."
              : "Compare passenger car engine oils by SAE grade. Each range links to product descriptions, specifications and packaging information for your purchasing enquiry."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {grades.map((grade) => (
              <LocaleLink
                key={grade}
                to={`/yokohama/${passengerCategory}/${grade}`}
                className="rounded-lg border border-border px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                Yokohama {grade} {tr ? "motor yağı" : "motor oil"}
              </LocaleLink>
            ))}
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {questions.map(([question, answer]) => (
            <div key={question}>
              <h3 className="font-display text-lg font-bold">{question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 font-semibold text-primary">
          <LocaleLink to="/catalogs">
            {tr ? "Yokohama yağ kataloğu" : "Download the Yokohama oil catalogue"}
          </LocaleLink>
          <LocaleLink to="/contact">
            {tr ? "Toptan motor yağı teklifi alın" : "Request wholesale motor oil prices"}
          </LocaleLink>
          <LocaleLink to="/export">
            {tr ? "İhracat ve distribütörlük" : "Export and distributor enquiries"}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
