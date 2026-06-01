import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Madeni Yağ: Tanımı, Çeşitleri ve Bilinmesi Gerekenler | Model Oils",
  description:
    "Madeni yağlar nedir, çeşitleri nelerdir, nasıl seçilir? Viskozite, kalite faktörleri, yağ türleri karşılaştırması ve yaygın yanılgılar hakkında kapsamlı teknik rehber.",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function MadeniYagTanimiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Ana Sayfa</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/resources/blog" className="hover:text-brand-300">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">Madeni Yağ Rehberi</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent-400 border border-accent-600/40 rounded-sm px-2 py-0.5 mb-4">
              Teknik Rehber
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Madeni Yağ: Tanımı, Çeşitleri ve Bilinmesi Gerekenler
            </h1>
            <div className="flex items-center gap-4 text-xs text-brand-400">
              <span>Model Oils Teknik Ekibi</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" /> 8 dk okuma
              </span>
              <span>·</span>
              <span>1 Haziran 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto prose prose-brand">

            {/* Madeni Yağ Nedir */}
            <h2 className="text-2xl font-bold text-brand-900 mt-0 mb-4">Madeni Yağ Nedir?</h2>
            <p className="text-brand-700 leading-relaxed mb-6">
              Madeni yağlar, petrol kökenli veya sentetik üretim yöntemiyle elde edilen özel sıvılardır.
              Teknik tanımıyla; <strong>makinelerin aşınmasını önleyerek sürtünmeyi azaltan, ısıyı ileten ve
              soğutma işlemini gerçekleştiren sıvılardır.</strong> Makine ömrünü uzatır, metal parçaların
              birbirine temasını engelleyerek paslanma ve korozyona karşı koruma sağlar.
            </p>

            {/* Çeşitleri */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Madeni Yağ Çeşitleri</h2>
            <p className="text-brand-700 leading-relaxed mb-4">
              Kullanım alanına ve formülasyonuna göre madeni yağlar beş ana başlık altında incelenir:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6 not-prose">
              {[
                { title: "Motor Yağları", desc: "Otomobil, kamyon ve motorlu taşıtlarda iç yanmalı motorları yağlamak için kullanılır." },
                { title: "Endüstriyel Yağlar", desc: "Fabrika makineleri, redüktörler ve üretim hatlarındaki ekipmanlar için tasarlanmıştır." },
                { title: "Hidrolik Yağlar", desc: "Güç aktarımı ve hareket kontrolü sağlayan hidrolik sistemlerde basınç altında çalışır." },
                { title: "Metal İşleme Yağları", desc: "Tornalama, frezeleme ve delme gibi metal işleme operasyonlarında soğutma ve yağlama sağlar." },
                { title: "Gres Yağları", desc: "Rulmanlar, bilyalı yataklar ve hareketli eklem noktalarında yarı-katı formda uygulanır." },
              ].map((item) => (
                <div key={item.title} className="bg-brand-50 border border-brand-100 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-brand-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-brand-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Viskozite */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Viskozite Nedir ve Neden Önemlidir?</h2>
            <p className="text-brand-700 leading-relaxed mb-4">
              Viskozite, <strong>bir sıvının akışkanlığını ifade eden temel özelliktir.</strong> Doğru viskozite
              seçimi, motor veya makinenin sağlığı açısından kritik öneme sahiptir:
            </p>
            <div className="bg-brand-900 text-white rounded-xl p-6 mb-6 not-prose">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-accent-400 font-bold text-sm mb-1">Yüksek Viskozite</p>
                  <p className="text-brand-300 text-sm">Kalın ve ağır yağ anlamına gelir. Düşük hızlı, ağır yüklü sistemlerde ve yüksek çalışma sıcaklıklarında tercih edilir.</p>
                </div>
                <div>
                  <p className="text-accent-400 font-bold text-sm mb-1">Düşük Viskozite</p>
                  <p className="text-brand-300 text-sm">İnce ve akışkan yağ demektir. Modern yüksek hızlı motorlarda yakıt verimliliği için kullanılır. SAE 0W-20 buna örnektir.</p>
                </div>
              </div>
            </div>
            <p className="text-brand-700 leading-relaxed mb-6">
              SAE (Society of Automotive Engineers) derecelendirme sistemi, motorun çalışma koşullarına
              göre uygun viskozite sınıfını belirler. Örneğin <strong>5W-30</strong> ifadesinde, "W" kışlık
              (winter) performansı, ilk rakam soğuk hava viskozitesini, ikinci rakam ise çalışma sıcaklığındaki
              viskoziteyi gösterir.
            </p>

            {/* Yağ Seçim Kriterleri */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Doğru Yağ Nasıl Seçilir?</h2>
            <p className="text-brand-700 leading-relaxed mb-4">
              Yanlış yağ seçimi motor ve makine hasarına yol açabilir. Seçim yaparken dikkat edilmesi gereken dört temel kriter:
            </p>
            <ol className="space-y-3 mb-6 not-prose">
              {[
                { n: "01", title: "Uygulamanın Gereksinimleri", desc: "Motor mu, hidrolik sistem mi, dişli mi? Her uygulama farklı bir yağ formülasyonu gerektirir." },
                { n: "02", title: "Motor veya Makine Yaşı ve Durumu", desc: "Eski motorlar genellikle daha yüksek viskoziteli yağ isterken, yeni motorlar düşük viskoziteyle daha verimli çalışır." },
                { n: "03", title: "Üreticinin Tavsiyeleri", desc: "OEM onayları (MB 229.5, VW 504.00, API SN/CF vb.) yağın o araç veya makine için test edildiğini ve uygun olduğunu gösterir." },
                { n: "04", title: "Çalışma Koşulları", desc: "Ortam sıcaklığı, yük düzeyi, çalışma süresi ve servis aralıkları doğru yağ seçimini doğrudan etkiler." },
              ].map((item) => (
                <li key={item.n} className="flex gap-4 bg-white border border-brand-100 rounded-xl p-4">
                  <span className="text-3xl font-black text-brand-100 leading-none shrink-0">{item.n}</span>
                  <div>
                    <p className="text-sm font-bold text-brand-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-brand-600 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Kalite Faktörleri */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Yağ Kalitesini Belirleyen Unsurlar</h2>
            <p className="text-brand-700 leading-relaxed mb-4">
              Bir madeni yağın kalitesi birçok faktörün bir araya gelmesiyle belirlenir. Sadece fiyat veya marka
              değil, teknik özellikler esas alınmalıdır:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6 not-prose">
              {[
                "Viskozite stabilitesi", "Viskozite indeksi (VI)", "Deterjan ve dispersanlar",
                "Aşınma önleyici katkılar", "Oksidasyon inhibitörleri", "Rafinasyon kalitesi",
                "Yüksek sıcaklık kararlılığı", "Korozyon koruyucular", "Köpük önleyiciler",
              ].map((f) => (
                <div key={f} className="bg-brand-50 border border-brand-100 rounded-lg px-3 py-2.5 text-xs font-medium text-brand-700 text-center">
                  {f}
                </div>
              ))}
            </div>

            {/* Yağ Türleri Karşılaştırması */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Mineral, Yarı Sentetik ve Tam Sentetik Karşılaştırması</h2>
            <div className="overflow-x-auto mb-6 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Özellik</th>
                    <th className="text-center px-4 py-3 font-semibold">Mineral</th>
                    <th className="text-center px-4 py-3 font-semibold">Yarı Sentetik</th>
                    <th className="text-center px-4 py-3 font-semibold rounded-tr-lg">Tam Sentetik</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Fiyat", "En düşük", "Orta", "En yüksek"],
                    ["Performans", "Temel düzey", "Orta-iyi", "Üst düzey"],
                    ["Değişim aralığı", "Kısa", "Orta", "Uzun"],
                    ["Sıcaklık direnci", "Sınırlı", "İyi", "Mükemmel"],
                    ["Yakıt tasarrufu", "Düşük", "Orta", "Yüksek"],
                    ["Soğuk başlangıç", "Zayıf", "İyi", "Üstün"],
                  ].map(([özellik, mineral, yarı, tam], i) => (
                    <tr key={özellik} className={i % 2 === 0 ? "bg-brand-50" : "bg-white"}>
                      <td className="px-4 py-3 font-medium text-brand-800">{özellik}</td>
                      <td className="px-4 py-3 text-center text-brand-600">{mineral}</td>
                      <td className="px-4 py-3 text-center text-brand-600">{yarı}</td>
                      <td className="px-4 py-3 text-center text-accent-600 font-medium">{tam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Yaygın Yanılgılar */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Yaygın Yanılgılar</h2>
            <div className="space-y-4 mb-6 not-prose">
              {[
                {
                  yanılgı: "Daha pahalı yağ her zaman daha iyidir.",
                  gerçek: "Fiyat, kalite garantisi vermez. Aracınızın OEM onaylarını karşılayan yağ doğru seçimdir.",
                },
                {
                  yanılgı: "Sentetik yağ eski motorları aşındırır.",
                  gerçek: "Bu efsanedir. Sentetik yağlar tüm motor tiplerinde güvenle kullanılabilir; hatta daha iyi koruma sağlar.",
                },
                {
                  yanılgı: "Her 3.000 km'de yağ değiştirmek şarttır.",
                  gerçek: "Modern sentetik yağlar 10.000–15.000 km değişim aralığı sunar. Üreticinin önerisine bakın.",
                },
                {
                  yanılgı: "Yağ markası aracın markasıyla aynı olmalıdır.",
                  gerçek: "Önemli olan markanın kendisi değil, ilgili OEM onaylarını (BMW LL-01, MB 229.5 vb.) karşılamasıdır.",
                },
              ].map(({ yanılgı, gerçek }) => (
                <div key={yanılgı} className="border border-brand-200 rounded-xl overflow-hidden">
                  <div className="bg-red-50 border-b border-brand-100 px-4 py-2.5 text-xs font-semibold text-red-700 flex items-center gap-2">
                    <span>✗</span> {yanılgı}
                  </div>
                  <div className="bg-green-50 px-4 py-2.5 text-xs text-green-800 flex items-center gap-2">
                    <span className="font-bold">✓</span> {gerçek}
                  </div>
                </div>
              ))}
            </div>

            {/* Yağ Değişim Göstergeleri */}
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Yağ Değişimi Gerektiğinde Ortaya Çıkan Belirtiler</h2>
            <ul className="space-y-2 mb-8 not-prose">
              {[
                "Üreticinin belirttiği kilometre veya süre limitine ulaşılmıştır",
                "Yağ koyulaşmış, kararmiş veya yabancı madde içermektedir",
                "Yağ seviyesi sürekli düşüyorsa motor yağ tüketiyor olabilir",
                "Egzozdan mavi veya beyaz duman çıkıyorsa yağ yanıyor demektir",
                "Motor performansında gözle görülür düşüş yaşanmaktadır",
                "Profesyonel yağ analizi anormal aşınma veya kirlilik gösteriyorsa",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-700">
                  <span className="text-accent-500 font-bold mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Back link */}
            <div className="border-t border-brand-100 pt-8 not-prose">
              <Link
                href="/resources/blog"
                className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Bloga Dön
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
