export type BlogCategory = "general" | "faq";

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  title: string;
  body: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  // ── Genel Bilgi ──────────────────────────────────────────────────────────
  {
    slug: "madeni-yag-nedir",
    category: "general",
    title: "Madeni Yağ Nedir?",
    body: [
      "Madeni yağlar; baz yağların, yağlama özelliklerini geliştirmek amacıyla çeşitli katkı maddeleriyle birleştirilmesinden elde edilen ürünlerdir. İstenilen fiziksel ve kimyasal özelliklere ulaşmak için farklı oranlarda katkı maddeleri kullanılır.",
    ],
  },
  {
    slug: "yaglamanin-amaci-nedir",
    category: "general",
    title: "Yağlamanın Amacı Nedir?",
    body: [
      "Yağlamanın temel amacı, birbiriyle temas eden katı yüzeyleri birbirinden ayırmak ve aralarındaki sürtünmeyi en aza indirmektir. Bu sayede mekanik parçaların pürüzsüz çalışması sağlanır, aşınma azaltılır ve ekipman ömrü uzatılır.",
    ],
  },
  {
    slug: "mineral-yag-nedir",
    category: "general",
    title: "Mineral Yağ Nedir?",
    body: [
      "Mineral yağlar, ham petrolün rafinerilerde damıtılması (destilasyon) işlemi sonucunda elde edilen yağlardır. Doğal kökenli baz yağlar olarak sınıflandırılır ve çeşitli endüstriyel uygulamalarda yaygın biçimde kullanılır.",
    ],
  },
  {
    slug: "sentetik-yag-nedir",
    category: "general",
    title: "Sentetik Yağ Nedir?",
    body: [
      "Sentetik yağlar, laboratuvarlarda çeşitli kimyasal işlemler sonucunda kimyagerler tarafından üretilen yağlardır. Mineral yağlara kıyasla daha geniş sıcaklık aralığında kararlılık, daha düşük sürtünme katsayısı ve daha uzun yağ değişim aralığı gibi üstün performans özellikleri sunarlar.",
    ],
  },
  {
    slug: "motor-yaglari-siniflandirmasi",
    category: "general",
    title: "Motor Yağları Sınıflandırması",
    body: [
      "Motor yağlarının performans sınıflandırmaları uluslararası kuruluşlar tarafından belirlenmektedir. Bu kuruluşlar arasında SAE (Society of Automotive Engineers), API (American Petroleum Institute), ILSAC (International Lubricant Standardization and Approval Committee), ACEA (Association des Constructeurs Européens d'Automobiles), MIL (Military Specifications) ve JASO (Japanese Automotive Standards Organization) yer almaktadır.",
    ],
  },
  {
    slug: "motor-yaglari-sae-viskozite-sinifi",
    category: "general",
    title: "Motor Yağları SAE Viskozite Sınıfı",
    body: [
      "SAE viskozite sınıflandırması, yağları düşük ve yüksek çalışma sıcaklıklarındaki akışkanlık değerlerine göre gruplandırır. Örneğin \"15W-40\" ifadesinde \"W\" düşük sıcaklıklardaki kış performansını, \"40\" ise yüksek çalışma sıcaklığındaki viskozite değerini gösterir.",
      "Motor yağları iki ana kategoriye ayrılır: SAE 30, SAE 40 gibi tek kademeli yağlar ve 5W-30, 10W-40 gibi çok kademeli yağlar.",
    ],
  },
  {
    slug: "motor-yaglari-api-performans-sinifi",
    category: "general",
    title: "Motor Yağları API Performans Sınıfı",
    body: [
      "API sınıflandırması iki harfli bir sistem kullanır. İlk harf yağın hangi motor türüne uygun olduğunu gösterir: S harfi benzinli (Spark ignition) motorları, C harfi dizel (Compression ignition) motorları ifade eder.",
      "İkinci harf ise performans seviyesini gösterir; benzinli motorlar için A'dan J'ye, dizel motorlar için C'den F'ye kadar uzanır. Alfabede ilerledikçe performans gereksinimleri de artar.",
    ],
  },
  {
    slug: "motor-yaglari-acea-performans-sinifi",
    category: "general",
    title: "Motor Yağları ACEA Performans Sınıfı",
    body: [
      "ACEA sınıflandırması bir harf ve ardından gelen bir rakamdan oluşur. Harfler motor tipini belirtir: A benzinli otomobil motorları, B hafif dizel otomobil motorları, C katalitik konvertör ve partikül filtreli motorlar (düşük sülfatlı kül yağları), E ise ağır hizmet dizel motorlarını ifade eder.",
      "Rakamlar performans seviyesini gösterir: 1 yakıt ekonomisi, 2 standart kullanım, 3 yüksek performans ve uzun ömür uygulamaları anlamına gelir.",
    ],
  },
  {
    slug: "otomotiv-disli-yaglari-api-performans-sinifi",
    category: "general",
    title: "Otomotiv Dişli Yağları API Performans Sınıfı",
    body: [
      "GL-1: Orta servis şartlarında çalışan spiral-bevel ve worm dişli aksları ile bazı düz şanzumanlarda kullanılır.",
      "GL-2: Worm dişli akslarında GL-1'in yetersiz kaldığı durumlarda kullanılır.",
      "GL-3: Orta servis şartlarındaki düz şanzuman ve spiral bevel dişli akslarında kullanılır.",
      "GL-4: Şok yüklemesi olmaksızın, ağır servis şartlarındaki hipoid dişlilerde kullanılır.",
      "GL-5: Şok yüklemesi bulunan, çok ağır servis şartlarındaki hipoid dişlilerde kullanılır.",
      "GL-6: Yüksek basınca maruz kalan, ağır servis şartlarındaki dişliler için tasarlanmıştır.",
    ],
  },
  // ── Sıkça Sorulan Sorular ────────────────────────────────────────────────
  {
    slug: "mineral-ve-sentetik-gres-uyumu",
    category: "faq",
    title: "Mineral esaslı gresler ile sentetik gresler aynı yerde uygulanabilir mi?",
    body: [
      "Mineral esaslı gresler ile sentetik gresler karıştırılmadan evvel uyumu hakkında bilgi edinilmelidir. Uyumlu olsa bile, mineral esaslı gresler sentetik greslerin performansını negatif yönde etkileyebilir.",
    ],
  },
  {
    slug: "farkli-kalinlastirici-gresler",
    category: "faq",
    title: "Farklı kalınlaştırıcı içeren gresler karıştırılabilir mi?",
    body: [
      "Farklı tipte kalınlaştırıcı içeren gresler bir biri ile uyumsuz olabilir; sonucunda kıvamında bozulma gibi sorunlar yaşanabilir.",
    ],
  },
  {
    slug: "motor-yagi-bozuldu-mu-nasil-anlarim",
    category: "faq",
    title: "Motor yağının bozulduğunu nasıl anlarız?",
    body: [
      "Yağın bozulup bozulmadığını kesin olarak anlamanın yolu, yağın laboratuvar şartlarında fiziksel ve kimyasal olarak test edilmesidir.",
    ],
  },
  {
    slug: "motor-yagina-katki-gerekli-mi",
    category: "faq",
    title: "Motor yağına katık ilave edilmesine gerek var mıdır?",
    body: [
      "Motor yağları herhangi bir ekstra yağ katkısına gerek duyulmayacak şekilde dizayn edilmiştir. Bu nedenle yağ katkısı kullanılması, sanılanın aksine motora zarar bile verebilir. Şanzıman, diferansiyel ve direksiyon hidrolik sistemlerinde de kullanılan yağlara fazladan herhangi bir katkı ilave edilmesine gerek yoktur.",
    ],
  },
  {
    slug: "motor-toleransi-nedir",
    category: "faq",
    title: "Motorlarda toleransların daraltıldığı söyleniyor, tolerans nedir?",
    body: [
      "Tolerans, birbirine çok yakın, hatta birbirine değen iki metal arasındaki boşluğa verilen isimdir. Günümüz mühendislik ilerlemeleriyle üreticiler, daha yüksek performanslı ve daha kompakt motorlar üretmek amacıyla bu boşlukları en aza indirmektedir.",
      "Toleranslar daraltıldığında, yeni motor tasarımlarında optimum çalışma için daha ince sentetik yağlar tercih edilen seçenek haline gelir.",
    ],
  },
  {
    slug: "motor-yagi-neden-koyulasir",
    category: "faq",
    title: "Motor yağı neden koyulaşarak kirli gibi görünür?",
    body: [
      "Motor yağının görevlerinden birisi de temizliktir. Kaliteli bir motor yağı, içeriğindeki dağıtıcı ve deterjan katıkları sayesinde motorda oluşan kurum parçalarını dağıtarak bünyesine alır ve metal yüzeylere yapışmasını engeller.",
      "Metal yüzeylere yapışanları da deterjanla temizler. Bu nedenle motor yağı zamanla kirlenmiş görünür. Dolayısıyla kirli görünen motor yağı, görevini iyi yerine getiriyor demektir.",
    ],
  },
  {
    slug: "motorlar-neden-yag-eksiltir",
    category: "faq",
    title: "Motorlar neden yağ eksiltir?",
    body: [
      "Yeni teknolojilerle üretilen modern motorlarda yüksek performans sağlamak amacıyla metaller (silindirler, pistonlar) birbirine daha yakın tasarlanmıştır. Bu tasarım yaklaşımı, yağın bozulmasına ve tükenmesine yol açmaktadır.",
      "Araç üreticileri, belirli kilometre aralıkları için kabul edilebilir yağ kayıp oranlarını kılavuzlarında belirtmektedir. Sentetik yağlar mineral yağlara oranla daha az eksiltme yapmaktadır.",
    ],
  },
  {
    slug: "sentetik-ve-mineral-yag-farki",
    category: "faq",
    title: "Sentetik yağ ile mineral yağ arasında ne fark vardır?",
    body: [
      "Mineral yağlar, petrolün işlenmesiyle elde edilen baz yağa gerekli katıkların eklenmesiyle üretilir. Sentetik yağlar ise laboratuvar koşullarında çeşitli kimyasal işlemlerden geçtikten sonra gerekli katıkların eklenmesiyle elde edilir.",
      "Laboratuvar ortamında farklı bir teknoloji ile üretilen sentetik yağlar, mineral yağlara oranla daha yüksek ve daha düşük sıcaklıklar ile yüksek basınca karşı daha dayanıklıdır.",
    ],
  },
];

export const GENERAL_ARTICLES = BLOG_ARTICLES.filter((a) => a.category === "general");
export const FAQ_ARTICLES = BLOG_ARTICLES.filter((a) => a.category === "faq");

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
