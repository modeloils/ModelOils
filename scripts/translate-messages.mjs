/**
 * translate-messages.mjs
 *
 * Deep-merges Mobil industrial product data into messages/{tr,en,ar}.json
 * under the "pd.mobil" namespace.
 *
 * - tr: full Turkish data (name, type, category, description, features)
 * - en: English translations (type, short description, features)
 * - ar: Arabic translations (type, short description, features)
 *
 * Usage:  node scripts/translate-messages.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const products = JSON.parse(
  readFileSync(join(ROOT, 'scripts', 'data', 'mobil-industrial.json'), 'utf8')
);

// ─── Type translations ────────────────────────────────────────────────────────

const TYPE_EN = {
  'Yüksek Performanslı Hidrolik Yağ':     'High-Performance Hydraulic Oil',
  'Dolaşım Sistemi Yağı':                 'Circulating System Oil',
  'Mineral Yağlı Kompresör Yağı':         'Mineral-Based Compressor Oil',
  'Ağır Hizmet Dolaşım Yağı':             'Heavy-Duty Circulating Oil',
  'Endüstriyel Yağlayıcı':               'Industrial Lubricant',
  'Hidrolik Yağ':                         'Hydraulic Oil',
  'Yangına Dayanıklı Hidrolik Sıvı':      'Fire-Resistant Hydraulic Fluid',
  'Kompresör Yağı':                       'Compressor Oil',
  'Sentetik Kompresör Yağı':              'Synthetic Compressor Oil',
  'Kızak ve Yol Kılavuzu Yağı':          'Slideway and Guideway Oil',
  'Mil Yağı':                             'Spindle Oil',
  'Pnömatik Ekipman Yağı':               'Pneumatic Equipment Oil',
  'Isıl İşlem Yağı':                     'Heat Treatment Oil',
  'Soğutma Kompresörü Yağı':             'Refrigeration Compressor Oil',
  'Çevreci Soğutma Yağı':               'Environmentally Acceptable Refrigeration Oil',
  'Metal İşleme Sıvısı':                 'Metalworking Fluid',
  'Kesme Sıvısı':                        'Cutting Fluid',
  'Ağır Dişli ve Kablo Yağı':            'Heavy Gear and Wire Rope Lubricant',
  'Havacılık Türbin Yağı':               'Aviation Turbine Oil',
  'Havacılık Hidrolik Sıvısı':           'Aviation Hydraulic Fluid',
  'Elektrik Transformatör Yağı':          'Electrical Transformer Oil',
  'Metal Temizleme Solüsyonu':            'Metal Cleaning Solution',
  'Fırın Konveyör Yağlayıcısı':          'Oven Conveyor Lubricant',
  'Makine Dairesi Yağı':                  'Machine Room Oil',
};

const TYPE_AR = {
  'Yüksek Performanslı Hidrolik Yağ':     'زيت هيدروليكي عالي الأداء',
  'Dolaşım Sistemi Yağı':                 'زيت نظام الدورة',
  'Mineral Yağlı Kompresör Yağı':         'زيت ضاغط معدني',
  'Ağır Hizmet Dolaşım Yağı':             'زيت دورة للأعمال الشاقة',
  'Endüstriyel Yağlayıcı':               'مادة تشحيم صناعية',
  'Hidrolik Yağ':                         'زيت هيدروليكي',
  'Yangına Dayanıklı Hidrolik Sıvı':      'سائل هيدروليكي مقاوم للحريق',
  'Kompresör Yağı':                       'زيت ضاغط',
  'Sentetik Kompresör Yağı':              'زيت ضاغط اصطناعي',
  'Kızak ve Yol Kılavuzu Yağı':          'زيت مزلقة ومسارات الآلات',
  'Mil Yağı':                             'زيت المغزل',
  'Pnömatik Ekipman Yağı':               'زيت المعدات الهوائية',
  'Isıl İşlem Yağı':                     'زيت المعالجة الحرارية',
  'Soğutma Kompresörü Yağı':             'زيت ضاغط التبريد',
  'Çevreci Soğutma Yağı':               'زيت تبريد صديق للبيئة',
  'Metal İşleme Sıvısı':                 'سائل تشغيل المعادن',
  'Kesme Sıvısı':                        'سائل القطع',
  'Ağır Dişli ve Kablo Yağı':            'مشحم تروس ثقيلة وحبال معدنية',
  'Havacılık Türbin Yağı':               'زيت توربين الطيران',
  'Havacılık Hidrolik Sıvısı':           'سائل هيدروليكي للطيران',
  'Elektrik Transformatör Yağı':          'زيت محول كهربائي',
  'Metal Temizleme Solüsyonu':            'محلول تنظيف المعادن',
  'Fırın Konveyör Yağlayıcısı':          'مشحم ناقل الأفران',
  'Makine Dairesi Yağı':                  'زيت غرفة الآلات',
};

const CAT_EN = {
  'Hidrolik Sistem Yağları':             'Hydraulic System Oils',
  'Endüstriyel Yağlar':                  'Industrial Oils',
  'Kompresör Yağları':                   'Compressor Oils',
  'Metal İşleme Sıvıları':              'Metalworking Fluids',
  'Soğutma Kompresörü Yağları':          'Refrigeration Compressor Oils',
  'Kızak Yağları':                       'Slideway Oils',
  'Mil Yağları':                         'Spindle Oils',
  'Havacılık Yağları':                   'Aviation Oils',
  'Dolaşım Sistemi Yağları':             'Circulating System Oils',
  'Isıl İşlem Yağları':                 'Heat Treatment Oils',
  'Pnömatik Yağlar':                     'Pneumatic Oils',
  'Yangına Dayanıklı Sıvılar':           'Fire-Resistant Fluids',
  'Transformatör Yağları':               'Transformer Oils',
};

const CAT_AR = {
  'Hidrolik Sistem Yağları':             'زيوت النظام الهيدروليكي',
  'Endüstriyel Yağlar':                  'الزيوت الصناعية',
  'Kompresör Yağları':                   'زيوت الضاغط',
  'Metal İşleme Sıvıları':              'سوائل تشغيل المعادن',
  'Soğutma Kompresörü Yağları':          'زيوت ضواغط التبريد',
  'Kızak Yağları':                       'زيوت مزلقة',
  'Mil Yağları':                         'زيوت المغازل',
  'Havacılık Yağları':                   'زيوت الطيران',
  'Dolaşım Sistemi Yağları':             'زيوت نظام الدورة',
  'Isıl İşlem Yağları':                 'زيوت المعالجة الحرارية',
  'Pnömatik Yağlar':                     'الزيوت الهوائية',
  'Yangına Dayanıklı Sıvılar':           'السوائل المقاومة للحريق',
  'Transformatör Yağları':               'زيوت المحولات',
};

// ─── Feature phrase translations ─────────────────────────────────────────────
// Maps Turkish feature phrases to EN and AR
// Keyed by lowercased prefix/key phrase for fuzzy matching

const FEAT_EN_MAP = [
  ['mükemmel hidrolik verimlilik',         'Excellent Hydraulic Efficiency'],
  ['çok üstün temiz tutma',               'Outstanding Deposit Control and Cleanliness'],
  ['geniş bir sıcaklık aralığında',        'Wide Temperature Range Protection'],
  ['termal stabilite',                      'Thermal Stability'],
  ['oksidasyon dayanımı',                   'Oxidation Resistance'],
  ['uzun conta ömrü',                       'Extended Seal Life and Reduced Maintenance'],
  ['aşınma önleyici',                       'Anti-Wear Protection for Pumps and Components'],
  ['mükemmel hava ayırma',                 'Excellent Air Release Properties'],
  ['çoklu metal uyumluluğu',               'Multi-Metal Compatibility'],
  ['yüksek yük taşıma kapasitesi',         'High Load-Carrying Capacity'],
  ['uzun servis ömrü',                     'Extended Service Life'],
  ['enerji verimliliği',                    'Energy Efficiency'],
  ['geniş uyumluluk',                      'Broad Equipment Compatibility'],
  ['düşük buhar basıncı',                  'Low Vapour Pressure'],
  ['mükemmel film dayanımı',               'Excellent Film Strength'],
  ['düşük sürtünme',                       'Low Friction'],
  ['korozyon koruması',                    'Corrosion Protection'],
  ['köpürme önleyici',                     'Anti-Foam Properties'],
  ['su ayrışması',                         'Water Separation'],
  ['uzun yağ ömrü',                        'Extended Oil Life'],
];

const FEAT_AR_MAP = [
  ['mükemmel hidrolik verimlilik',         'كفاءة هيدروليكية ممتازة'],
  ['çok üstün temiz tutma',               'أداء تنظيف ومنع الترسبات المتميز'],
  ['geniş bir sıcaklık aralığında',        'حماية عبر نطاق واسع من درجات الحرارة'],
  ['termal stabilite',                      'ثبات حراري'],
  ['oksidasyon dayanımı',                   'مقاومة الأكسدة'],
  ['uzun conta ömrü',                       'عمر افتراضي طويل للمانع وصيانة أقل'],
  ['aşınma önleyici',                       'حماية مضادة للتآكل للمضخات والمكونات'],
  ['mükemmel hava ayırma',                 'خصائص ممتازة لتحرير الهواء'],
  ['çoklu metal uyumluluğu',               'توافق مع المعادن المتعددة'],
  ['yüksek yük taşıma kapasitesi',         'قدرة حمل عالية'],
  ['uzun servis ömrü',                     'عمر خدمة ممتد'],
  ['enerji verimliliği',                    'كفاءة في استهلاك الطاقة'],
  ['geniş uyumluluk',                      'توافق واسع مع المعدات'],
  ['düşük buhar basıncı',                  'ضغط بخار منخفض'],
  ['mükemmel film dayanımı',               'قوة غشاء زيتي ممتازة'],
  ['düşük sürtünme',                       'احتكاك منخفض'],
  ['korozyon koruması',                    'حماية من التآكل'],
  ['köpürme önleyici',                     'مقاوم للرغوة'],
  ['su ayrışması',                         'فصل المياه'],
  ['uzun yağ ömrü',                        'عمر افتراضي ممتد للزيت'],
];

function translateFeature(trFeat, map) {
  const lo = trFeat.toLowerCase();
  for (const [key, val] of map) {
    if (lo.includes(key)) return val;
  }
  return trFeat; // fallback to Turkish if no translation found
}

// ─── Build pd.mobil entries ────────────────────────────────────────────────────

const pdTr = {};
const pdEn = {};
const pdAr = {};

for (const p of products) {
  // TR: full Turkish data
  pdTr[p.slug] = {
    name: p.name,
    type: p.type,
    category: p.category,
    description: p.description || p.type,
    features: p.features,
  };

  // EN: translated
  pdEn[p.slug] = {
    name: p.name,
    type: TYPE_EN[p.type] ?? p.type,
    category: CAT_EN[p.category] ?? p.category,
    description: TYPE_EN[p.type]
      ? `${p.name} is a premium ${TYPE_EN[p.type].toLowerCase()} designed for industrial and commercial applications.`
      : p.description,
    features: p.features.map(f => translateFeature(f, FEAT_EN_MAP)),
  };

  // AR: translated
  pdAr[p.slug] = {
    name: p.name,
    type: TYPE_AR[p.type] ?? p.type,
    category: CAT_AR[p.category] ?? p.category,
    description: TYPE_AR[p.type]
      ? `${p.name} هو ${TYPE_AR[p.type].toLowerCase()} عالي الجودة مصمم للتطبيقات الصناعية والتجارية.`
      : p.description,
    features: p.features.map(f => translateFeature(f, FEAT_AR_MAP)),
  };
}

// ─── Deep merge into messages files ───────────────────────────────────────────

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object') {
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

const locales = [
  { file: 'tr', pd: pdTr },
  { file: 'en', pd: pdEn },
  { file: 'ar', pd: pdAr },
];

for (const { file, pd } of locales) {
  const msgPath = join(ROOT, 'messages', `${file}.json`);
  const existing = JSON.parse(readFileSync(msgPath, 'utf8'));

  if (!existing.pd) existing.pd = {};
  if (!existing.pd.mobil) existing.pd.mobil = {};

  deepMerge(existing.pd.mobil, pd);

  writeFileSync(msgPath, JSON.stringify(existing, null, 2) + '\n', 'utf8');
  console.log(`✅ messages/${file}.json — pd.mobil with ${Object.keys(pd).length} products`);
}

console.log('\n✓ Translation merge complete.');
console.log('Note: EN/AR descriptions are generated stubs. Features use key-phrase lookup; unknown phrases fall back to Turkish.');
