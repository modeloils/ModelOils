/**
 * Mobil Industrial Oils Scraper
 * Node 18+ (built-in fetch required)
 *
 * Usage:
 *   node scripts/scrape-mobil.mjs          # scrape + download images + write JSON
 *   node scripts/scrape-mobil.mjs --codegen # read JSON → generate TypeScript (no network)
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images', 'products', 'mobil');
const DATA_FILE = join(ROOT, 'scripts', 'data', 'mobil-industrial.json');
const DELAY_MS = 900;

// ─── 84 unique scrape targets ────────────────────────────────────────────────
// [finalSlug, url]  — size/package suffix already stripped from slug
const TARGETS = [
  ['almo-oil-525',                    'https://www.turkoilmarket.com/urun/mobil-almo-oil-525-20-litre'],
  ['velocite-oil-no-4',               'https://www.turkoilmarket.com/urun/mobil-velocite-oil-no-4-20-litre'],
  ['velocite-oil-no-10',              'https://www.turkoilmarket.com/urun/mobil-velocite-oil-no-10-20-litre'],
  ['almo-oil-527',                    'https://www.turkoilmarket.com/urun/mobil-almo-oil-527-20-litre'],
  ['met-763',                         'https://www.turkoilmarket.com/urun/mobilmet-763-20-litre'],
  ['met-766',                         'https://www.turkoilmarket.com/urun/mobilmet-766-20-litre'],
  ['met-424',                         'https://www.turkoilmarket.com/urun/mobil-met-424-20-litre'],
  ['dte-27',                          'https://www.turkoilmarket.com/urun/mobil-dte-27-20-litre'],
  ['dte-24',                          'https://www.turkoilmarket.com/urun/mobil-dte-24-iso-vg-32-16-litre'],
  ['dte-10-excel-32',                 'https://www.turkoilmarket.com/urun/mobil-dte-10-excel-32-20-litre'],
  ['dte-26',                          'https://www.turkoilmarket.com/urun/mobil-dte-26-iso-vg-68-16-litre'],
  ['dte-25',                          'https://www.turkoilmarket.com/urun/mobil-dte-25-iso-vg-46-16-litre'],
  ['dte-10-excel-100',                'https://www.turkoilmarket.com/urun/mobil-dte-10-excel-100-20-litre'],
  ['dte-10-excel-46',                 'https://www.turkoilmarket.com/urun/mobil-dte-10-excel-46-20-litre'],
  ['dte-10-excel-68',                 'https://www.turkoilmarket.com/urun/mobil-dte-10-excel-68-20-litre'],
  ['vactra-oil-no-1',                 'https://www.turkoilmarket.com/urun/mobil-vactra-oil-no-1-20-litre'],
  ['vactra-oil-no-4',                 'https://www.turkoilmarket.com/urun/mobil-vactra-oil-no-4-16-litre'],
  ['vactra-oil-no-2',                 'https://www.turkoilmarket.com/urun/mobil-vactra-oil-no-2-16-litre'],
  ['therm-605',                       'https://www.turkoilmarket.com/urun/mobil-therm-605-16-litre'],
  ['jet-oil-2',                       'https://www.turkoilmarket.com/urun/mobil-jet-oil-2-1lx24-ad-24-litre'],
  ['dte-oil-heavy-medium',            'https://www.turkoilmarket.com/urun/mobil-dte-oil-heavy-medium-20-litre'],
  ['dte-oil-heavy',                   'https://www.turkoilmarket.com/urun/mobil-dte-oil-heavy-20-litre'],
  ['dte-oil-light',                   'https://www.turkoilmarket.com/urun/mobil-dte-oil-light-20-litre'],
  ['rarus-424',                       'https://www.turkoilmarket.com/urun/mobil-rarus-424-20-litre'],
  ['gargoyle-arctic-300',             'https://www.turkoilmarket.com/urun/mobil-gargoyle-arctic-300-20-litre'],
  ['gargoyle-arctic-shc-226e',        'https://www.turkoilmarket.com/urun/mobil-gargoyle-arctic-shc-226e-20-litre'],
  ['eal-arctic-68',                   'https://www.turkoilmarket.com/urun/mobil-eal-arctic-68-5-l-x-4-adet'],
  ['eal-arctic-32',                   'https://www.turkoilmarket.com/urun/mobil-eal-arctic-32-5-l-x-4-adet'],
  ['rarus-427',                       'https://www.turkoilmarket.com/urun/mobil-rarus-427-20-litre'],
  ['rarus-425',                       'https://www.turkoilmarket.com/urun/mobil-rarus-425-20-litre'],
  ['rarus-shc-1026',                  'https://www.turkoilmarket.com/urun/mobil-rarus-shc-1026-20-litre'],
  ['rarus-shc-1025',                  'https://www.turkoilmarket.com/urun/mobil-rarus-shc-1025-20-litre'],
  ['eal-arctic-46',                   'https://www.turkoilmarket.com/urun/mobil-eal-arctic-46-5-l-x-4-adet'],
  ['socony-oven-conveyer-lubricant',  'https://www.turkoilmarket.com/urun/mobil-socony-oven-conveyer-lubricant-208-litre'],
  ['vacuoline-546',                   'https://www.turkoilmarket.com/urun/mobil-vacuoline-546-208-litre'],
  ['vacuoline-537',                   'https://www.turkoilmarket.com/urun/mobil-vacuoline-537-20-litre'],
  ['vacuoline-533',                   'https://www.turkoilmarket.com/urun/mobil-vacuoline-533-20-litre'],
  ['vacuoline-528',                   'https://www.turkoilmarket.com/urun/mobil-vacuoline-528-208-litre'],
  ['vacuoline-525',                   'https://www.turkoilmarket.com/urun/mobil-vacuoline-525-208-litre'],
  ['velocite-oil-no-6',               'https://www.turkoilmarket.com/urun/mobil-velocite-oil-no-6-208-litre'],
  ['velocite-oil-no-3',               'https://www.turkoilmarket.com/urun/mobil-velocite-oil-no-3-20-litre'],
  ['met-762',                         'https://www.turkoilmarket.com/urun/mobil-met-762-185-kg'],
  ['arma-798',                        'https://www.turkoilmarket.com/urun/mobilarma-798-20-litre'],
  ['nuto-h-46',                       'https://www.turkoilmarket.com/urun/mobil-nuto-h-46-16-litre-hidrolik-yagi'],
  ['dte-22',                          'https://www.turkoilmarket.com/urun/mobil-dte-22-208-litre'],
  ['delvac-hydraulic-10w',            'https://www.turkoilmarket.com/urun/mobil-delvac-hydraulic-10w-208-litre-fici'],
  ['dte-oil-medium',                  'https://www.turkoilmarket.com/urun/mobil-dte-oil-medium-20-litre'],
  ['dte-797',                         'https://www.turkoilmarket.com/urun/mobil-dte-797-178-kg'],
  ['dte-846',                         'https://www.turkoilmarket.com/urun/mobil-dte-846-180-kg'],
  ['dte-832',                         'https://www.turkoilmarket.com/urun/mobil-dte-832-179-kg'],
  ['shc-rarus-68',                    'https://www.turkoilmarket.com/urun/mobil-shc-rarus-68-20-litre-vidali-kompresor-yagi'],
  ['shc-rarus-46',                    'https://www.turkoilmarket.com/urun/mobil-shc-rarus-46-20-litre-vidali-kompresor-yagi'],
  ['shc-rarus-32',                    'https://www.turkoilmarket.com/urun/mobil-shc-rarus-32-20-litre-vidali-kompresor-yagi'],
  ['gargoyle-arctic-155',             'https://www.turkoilmarket.com/urun/mobil-gargoyle-arctic-155-208-litre'],
  ['gargoyle-arctic-shc-230',         'https://www.turkoilmarket.com/urun/mobil-gargoyle-arctics-shc-230-208-litre'],
  ['eal-arctic-100',                  'https://www.turkoilmarket.com/urun/mobil-eal-arctic-100-20-litre'],
  ['rarus-429',                       'https://www.turkoilmarket.com/urun/mobil-rarus-429-183-kg'],
  ['rarus-426',                       'https://www.turkoilmarket.com/urun/mobil-rarus-426-208-litre'],
  ['rarus-shc-1024',                  'https://www.turkoilmarket.com/urun/mobil-rarus-shc-1024-20-litre'],
  ['nuto-h-68',                       'https://www.turkoilmarket.com/urun/mobil-nuto-h-68-208-litre-hidrolik-yagi'],
  ['dte-21',                          'https://www.turkoilmarket.com/urun/mobil-dte-21-20-litre'],
  ['eal-arctic-22',                   'https://www.turkoilmarket.com/urun/mobil-eal-arctic-22-5-l-x-4-adet'],
  ['somentor-ah-70',                  'https://www.turkoilmarket.com/urun/mobil-somentor-ah-70-208-litre'],
  ['aero-hf',                         'https://www.turkoilmarket.com/urun/mobil-aero-hf-208-litre'],
  ['aero-hfa',                        'https://www.turkoilmarket.com/urun/mobil-aero-hfa-5-usg'],
  ['met-427',                         'https://www.turkoilmarket.com/urun/mobil-met-427-182-kg'],
  ['dte-10-excel-15',                 'https://www.turkoilmarket.com/urun/mobil-dte-10-excel-15-208-litre'],
  ['pyrotec-hfc-46',                  'https://www.turkoilmarket.com/urun/mobil-pyrotec-hfc-46-208-litre-fici'],
  ['ect-44',                          'https://www.turkoilmarket.com/urun/mobilect-44-208-litre'],
  ['prosol-nt-70',                    'https://www.turkoilmarket.com/urun/mobil-prosol-nt-70-208-litre'],
  ['cut-250',                         'https://www.turkoilmarket.com/urun/mobilcut-250-185-kg'],
  ['cut-240',                         'https://www.turkoilmarket.com/urun/mobilcut-240-203-litre'],
  ['cut-230',                         'https://www.turkoilmarket.com/urun/mobilcut-230-208-litre'],
  ['cut-210',                         'https://www.turkoilmarket.com/urun/mobilcut-210-208-litre'],
  ['cut-140',                         'https://www.turkoilmarket.com/urun/mobilcut-140-208-litre'],
  ['cut-100',                         'https://www.turkoilmarket.com/urun/mobilcut-100-208-litre'],
  ['exxon-hyjet-v',                   'https://www.turkoilmarket.com/urun/exxon-hyjet-v-6-x-4-lt'],
  ['exxon-hyjet-iv-a-plus',           'https://www.turkoilmarket.com/urun/exxon-hyjet-iv-a-plus-6-x-4-lt'],
  ['jet-oil-254',                     'https://www.turkoilmarket.com/urun/mobil-jet-oil-254-208-litre'],
  ['dte-746',                         'https://www.turkoilmarket.com/urun/mobil-dte-746-177-kg'],
  ['dte-732',                         'https://www.turkoilmarket.com/urun/mobil-dte-732-178-kg'],
  ['gargoyle-arctic-shc-nh-68',       'https://www.turkoilmarket.com/urun/mobil-gargoyle-arctic-shc-nh-68-208-l'],
  ['rarus-829',                       'https://www.turkoilmarket.com/urun/mobil-rarus-829-55-usg'],
  ['rarus-827',                       'https://www.turkoilmarket.com/urun/mobil-rarus-827-55-usg'],
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
    },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function downloadImage(imageUrl, slug) {
  if (!imageUrl) return null;
  try {
    const res = await fetch(imageUrl, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const dest = join(IMAGES_DIR, `${slug}.jpg`);
    writeFileSync(dest, Buffer.from(buf));
    return `/images/products/mobil/${slug}.jpg`;
  } catch (e) {
    console.warn(`  ⚠ image download failed: ${e.message}`);
    return null;
  }
}

// ─── Name normalization ────────────────────────────────────────────────────────

const UPPER_WORDS = new Set([
  'dte', 'shc', 'iso', 'vg', 'hfc', 'hf', 'hfa', 'ect', 'eal',
  'nh', 'nt', 'ah', 'ep', 'hp', 'atf', 'sae', 'api', 'din',
]);

function normalizeProductName(raw) {
  let s = raw.trim()
    .replace(/^Mobilmet\s+/i,  'Mobil Met ')
    .replace(/^Mobilcut\s+/i,  'Mobil Cut ')
    .replace(/^Mobilect\s+/i,  'Mobil Ect ')
    .replace(/^Mobilarma\s+/i, 'Mobil Arma ');

  return s.split(/\s+/).map(w => {
    const lo = w.toLowerCase();
    if (UPPER_WORDS.has(lo)) return w.toUpperCase();
    if (/^\d/.test(w)) return w.replace(/w$/i, 'W'); // 10w → 10W
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

// ─── HTML parser ──────────────────────────────────────────────────────────────

function parseProductPage(html) {
  // og:image (strip ?revision= query)
  const ogImgMatch = html.match(/property='og:image'\s+content='([^']+)'/);
  const imageUrl = ogImgMatch ? ogImgMatch[1].split('?')[0] : '';

  // Product name: h1 inside .product-detail
  const nameMatch = html.match(/<div class="product-detail">[\s\S]*?<h1[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
  const rawName = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const name = normalizeProductName(rawName);

  // Breadcrumb: collect all <span property="name"> > <span> texts, take 3rd (index 2)
  const bcItems = [...html.matchAll(/<span property="name">[\s\S]*?<span>(.*?)<\/span>/g)]
    .map(m => m[1].trim());
  const category = bcItems[2] ?? 'Endüstriyel Yağlar';

  // product-detail content (greedy up to the comments/feed tabs)
  const detailMatch = html.match(/<div class="product-detail">([\s\S]*?)<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>/);
  if (!detailMatch) {
    return { name, category, description: '', features: [], approvals: [], specs: {}, imageUrl };
  }

  const rawContent = detailMatch[1]
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\r/g, '');

  const lines = rawContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Section markers (Turkish)
  const idx = (pat) => lines.findIndex(l => pat.test(l));
  const featureListIdx  = idx(/Özellikleri Avantajları|Avantajları ve Sağlayabileceği/i);
  const featureTitleIdx = idx(/Özellikleri ve Faydaları/i);
  const usageIdx        = idx(/Kullanım Yer/i);
  const specIdx         = idx(/Spesifikasyon.*Onay/i);
  const typicalIdx      = idx(/Tipik Özellik/i);
  const healthIdx       = idx(/Sağlık.*Güvenlik/i);

  const SECTIONS = [featureTitleIdx, featureListIdx, usageIdx, specIdx, typicalIdx, healthIdx]
    .filter(i => i > 0).sort((a, b) => a - b);

  const firstSection = SECTIONS[0] ?? lines.length;

  // Description: substantive lines before first section header
  const descLines = lines.slice(0, firstSection).filter(l => l.length >= 40);
  const description = descLines.slice(0, 2).join(' ').substring(0, 500).trim();

  // Features: from "Özellikleri Avantajları" block
  const featStart = featureListIdx >= 0 ? featureListIdx + 1
                  : featureTitleIdx  >= 0 ? featureTitleIdx + 1
                  : 0;
  const featEnd = [usageIdx, specIdx, typicalIdx].filter(i => i > featStart)
    .sort((a, b) => a - b)[0] ?? featStart + 30;

  // The feature block has pairs: long-desc line then short title-line
  // We want the shorter/title lines
  const rawFeatLines = lines.slice(featStart, featEnd)
    .filter(l => !l.startsWith('•') && l.length >= 5);

  const features = [];
  for (let i = 0; i < rawFeatLines.length && features.length < 6; i++) {
    const cur = rawFeatLines[i];
    const next = rawFeatLines[i + 1];
    // Pick shorter of the pair, or any line <= 80 chars that reads like a title
    if (next && cur.length > next.length && next.length <= 80) {
      features.push(next);
      i++; // skip next
    } else if (cur.length <= 80) {
      features.push(cur);
    }
  }

  // Approvals: lines between specIdx and typicalIdx containing standard codes
  const approvalStart = specIdx >= 0 ? specIdx + 1 : -1;
  const approvalEnd   = typicalIdx >= 0 ? typicalIdx : healthIdx >= 0 ? healthIdx : lines.length;
  const APPROVAL_PAT  = /\b(DIN|ISO|ASTM|JCMAS|Eaton|Vickers|Denison|Bosch|Rexroth|Cincinnati|Parker|Arburg|Krauss|API|NSF|ACEA|SAE|MIL|DEF|ABB|OEM|Frank|Mohn)\b/i;

  const approvals = approvalStart >= 0
    ? lines.slice(approvalStart, approvalEnd)
        .filter(l => APPROVAL_PAT.test(l))
        .map(l => l.replace(/\s+X\s*$/, '').replace(/\s{2,}/g, ' ').trim())
        .filter(l => l.length < 120)
        .slice(0, 12)
    : [];

  // Specs: targeted regex on all lines
  const specs = {};
  const trySet = (key, val) => { if (!specs[key] && val) specs[key] = val; };

  for (const l of lines) {
    // Viscosity @ 40°C – last number on line matching the pattern
    const v40 = l.match(/cSt\s*@\s*40[°º]?\s*[Cc][^]*?([\d,]+(?:\.\d+)?)\s*(?:cSt)?\s*$/i);
    if (v40) trySet('Viskozite @ 40°C', v40[1].replace(',', '.') + ' cSt');

    const v100 = l.match(/cSt\s*@\s*100[°º]?\s*[Cc][^]*?([\d,]+(?:\.\d+)?)\s*(?:cSt)?\s*$/i);
    if (v100) trySet('Viskozite @ 100°C', v100[1].replace(',', '.') + ' cSt');

    const vi = l.match(/Viskozite İndeksi[^,\d]*(?:ASTM[^,\d]*)?([\d]{2,4})\s*$/i);
    if (vi) trySet('Viskozite İndeksi', vi[1]);

    const pour = l.match(/Akma Noktası[^-\d]*(-?\d+)\s*°?C/i);
    if (pour) trySet('Akma Noktası', pour[1] + ' °C');

    const flash = l.match(/Parlama Noktası[^,\d]*,?\s*(\d{2,4})\s*°?C/i);
    if (flash) trySet('Parlama Noktası', flash[1] + ' °C');

    const density = l.match(/Yoğunluk[^,\d]*(?:15[°º]?\s*[Cc])?[^,\d]*(0\.\d{3,4})\s*kg\/L/i);
    if (density) trySet('Yoğunluk @ 15°C', density[1] + ' kg/L');
  }

  return { name, category, description, features, approvals, specs, imageUrl };
}

// ─── TypeScript code generator ────────────────────────────────────────────────

function generateTs(products) {
  const indent4 = (s) => s.split('\n').map(l => '    ' + l).join('\n');

  const entries = products.map(p => {
    const spec = [
      `    "${p.slug}": {`,
      `      name: ${JSON.stringify(p.name)},`,
      `      category: ${JSON.stringify(p.category)},`,
      `      type: ${JSON.stringify(p.type)},`,
      `      description: ${JSON.stringify(p.description)},`,
      `      features: ${JSON.stringify(p.features)},`,
      `      approvals: ${JSON.stringify(p.approvals)},`,
      `      specs: ${JSON.stringify(p.specs)},`,
      `      image: ${JSON.stringify(p.image ?? '')},`,
      `    },`,
    ].join('\n');
    return spec;
  });

  return [
    `const MOBIL_INDUSTRIAL_PRODUCTS: Record<string, MobilIndustrialSpec> = {`,
    entries.join('\n'),
    `};`,
  ].join('\n');
}

// ─── Main: scrape ─────────────────────────────────────────────────────────────

async function main() {
  const codegenOnly = process.argv.includes('--codegen');

  if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

  let products = [];

  if (codegenOnly) {
    console.log('📄 --codegen mode: reading existing JSON');
    products = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } else {
    console.log(`🚀 Scraping ${TARGETS.length} products…\n`);

    for (let i = 0; i < TARGETS.length; i++) {
      const [slug, url] = TARGETS[i];
      process.stdout.write(`[${String(i + 1).padStart(2)}/${TARGETS.length}] ${slug} … `);

      try {
        const html = await fetchHtml(url);
        const data = parseProductPage(html);

        // Derive "type" from the first short heading inside description or name keywords
        const type = deriveType(slug, data.name);

        const imagePath = await downloadImage(data.imageUrl, slug);

        products.push({
          slug,
          name: data.name || slugToName(slug),
          category: data.category,
          type,
          description: data.description,
          features: data.features,
          approvals: data.approvals,
          specs: data.specs,
          imageUrl: data.imageUrl,
          image: imagePath ?? '',
        });

        console.log(`✓  "${data.name}"  [${data.features.length} feat, img: ${imagePath ? '✓' : '✗'}]`);
      } catch (e) {
        console.log(`✗  ERROR: ${e.message}`);
        products.push({ slug, name: slugToName(slug), category: 'Endüstriyel Yağlar', type: 'Endüstriyel Yağ', description: '', features: [], approvals: [], specs: {}, imageUrl: '', image: '' });
      }

      if (i < TARGETS.length - 1) await sleep(DELAY_MS);
    }

    // Save raw data
    writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
    console.log(`\n✅ Saved ${products.length} products → ${DATA_FILE}`);
  }

  // ── TypeScript generation ────────────────────────────────────────────────────
  console.log('\n🔧 Generating TypeScript…');

  const tsBlock = generateTs(products);
  const tsOutFile = join(ROOT, 'scripts', 'data', 'mobil-industrial-ts-block.txt');
  writeFileSync(tsOutFile, tsBlock, 'utf8');
  console.log(`   TS block saved → ${tsOutFile}`);

  // Product name list for category page override
  const productNames = products.map(p => p.name);
  const namesFile = join(ROOT, 'scripts', 'data', 'mobil-industrial-names.json');
  writeFileSync(namesFile, JSON.stringify(productNames, null, 2), 'utf8');
  console.log(`   Product names saved → ${namesFile}`);

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Products scraped: ${products.length}`);
  console.log(`   With images:      ${products.filter(p => p.image).length}`);
  console.log(`   With features:    ${products.filter(p => p.features.length > 0).length}`);
  console.log(`   With approvals:   ${products.filter(p => p.approvals.length > 0).length}`);
  console.log('\nNext steps:');
  console.log('  1. node scripts/apply-codegen.mjs   ← patch page.tsx files');
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugToName(slug) {
  const words = slug.replace(/^(mobil-)/, '').split('-');
  return 'Mobil ' + words.map(w => {
    if (UPPER_WORDS.has(w.toLowerCase())) return w.toUpperCase();
    if (/^\d/.test(w)) return w.replace(/w$/i, 'W');
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

const TYPE_MAP = {
  'dte-10-excel':             'Yüksek Performanslı Hidrolik Yağ',
  'dte-2':                    'Dolaşım Sistemi Yağı',
  'dte-oil':                  'Mineral Yağlı Kompresör Yağı',
  'dte-7':                    'Ağır Hizmet Dolaşım Yağı',
  'dte-8':                    'Ağır Hizmet Dolaşım Yağı',
  'dte-':                     'Endüstriyel Yağlayıcı',
  'nuto':                     'Hidrolik Yağ',
  'delvac-hydraulic':         'Hidrolik Yağ',
  'pyrotec':                  'Yangına Dayanıklı Hidrolik Sıvı',
  'rarus':                    'Kompresör Yağı',
  'shc-rarus':                'Sentetik Kompresör Yağı',
  'vactra':                   'Kızak ve Yol Kılavuzu Yağı',
  'velocite':                 'Mil Yağı',
  'almo':                     'Pnömatik Ekipman Yağı',
  'therm':                    'Isıl İşlem Yağı',
  'gargoyle-arctic':          'Soğutma Kompresörü Yağı',
  'eal-arctic':               'Çevreci Soğutma Yağı',
  'vacuoline':                'Dolaşım Sistemi Yağı',
  'met-':                     'Metal İşleme Sıvısı',
  'cut-':                     'Kesme Sıvısı',
  'arma-':                    'Ağır Dişli ve Kablo Yağı',
  'jet-oil':                  'Havacılık Türbin Yağı',
  'jet-oil-254':              'Havacılık Türbin Yağı',
  'aero-hf':                  'Havacılık Hidrolik Sıvısı',
  'aero-hfa':                 'Havacılık Hidrolik Sıvısı',
  'exxon-hyjet':              'Havacılık Hidrolik Sıvısı',
  'ect-':                     'Elektrik Transformatör Yağı',
  'prosol':                   'Metal Temizleme Solüsyonu',
  'socony':                   'Fırın Konveyör Yağlayıcısı',
  'somentor':                 'Makine Dairesi Yağı',
};

function deriveType(slug, name) {
  for (const [prefix, type] of Object.entries(TYPE_MAP)) {
    if (slug.startsWith(prefix) || slug.includes(prefix)) return type;
  }
  return 'Endüstriyel Yağlayıcı';
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
