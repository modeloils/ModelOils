/**
 * merge-and-push.mjs
 *
 * Safely adds my scraped Mobil industrial products INTO the remote codebase:
 * 1. Restores remote versions of the two page.tsx files and messages files
 * 2. Inserts only the NEW products (not already in remote) into MOBIL_INDUSTRIAL_PRODUCTS
 * 3. Adds mobil names to BRAND_OVERRIDES (appends only, keeps existing)
 * 4. Deep-merges pd.mobil into messages files (no deletions)
 *
 * Run:  node scripts/merge-and-push.mjs
 */

import { execSync, spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function git(args) {
  const r = spawnSync('git', args.split(' '), { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git ${args} failed:\n${r.stderr}`);
  return r.stdout;
}

function gitShow(path) {
  const r = spawnSync('git', ['show', `origin/master:${path}`], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) {
    // File doesn't exist on remote — fall back to local file
    return readFileSync(join(ROOT, path), 'utf8');
  }
  return r.stdout;
}

// ─── Load scraped data ────────────────────────────────────────────────────────

const products = JSON.parse(
  readFileSync(join(ROOT, 'scripts', 'data', 'mobil-industrial.json'), 'utf8')
);

// Slugs already in origin/master's MOBIL_INDUSTRIAL_PRODUCTS
const REMOTE_SLUGS = new Set([
  'dte-10-excel-32', 'dte-10-excel-46', 'dte-10-excel-68', 'dte-10-excel-100',
  'shc-630', 'shc-632', 'rarus-427', 'rarus-shc-1024',
  'vactra-2', 'grease-xhp-222',
  'shc-pegasus-30', 'pegasus-805', 'pegasus-605', 'pegasus-610', 'pegasus-1005', 'pegasus-705',
]);

const newProducts = products.filter(p => !REMOTE_SLUGS.has(p.slug));
console.log(`New products to add: ${newProducts.length} (remote already has ${REMOTE_SLUGS.size})`);

// ─── Helper: derive series from product name ──────────────────────────────────

function parseSeries(name) {
  // "Mobil DTE 10 Excel 46" → series: "Mobil DTE 10 Excel", grade: "46"
  // "Mobil Rarus 427" → series: "Mobil Rarus", grade: "427"
  const stripped = name.replace(/^(Mobil|Exxon)\s+/i, '');
  const numEnd = stripped.match(/\s+(\d[\w]*)$/);
  if (numEnd) {
    return {
      series: name.replace(/\s+\d[\w]*$/, '').trim(),
      grade: numEnd[1],
    };
  }
  return { series: name, grade: '' };
}

function isoGrade(slug, name) {
  // Try to extract ISO VG grade from name or slug
  const slugVg = slug.match(/(?:^|-)(\d{2,3})(?:$|-)/);
  const nameVg = name.match(/ISO\s+VG\s+(\d+)|VG[- ]?(\d+)|(?:^|\s)(\d{2,3})\s*(?:cSt|ISO)?$/i);
  if (nameVg) return `ISO VG ${nameVg[1] || nameVg[2] || nameVg[3]}`;
  return '';
}

// ─── Generate ProductSpec entries ─────────────────────────────────────────────

function toProductSpecEntry(p) {
  const { series, grade } = parseSeries(p.name);
  const gradeStr = isoGrade(p.slug, p.name) || grade;
  const api  = p.approvals[0] ?? '';
  const acea = p.approvals[1] ?? '';
  const restApprovals = p.approvals.slice(2);
  const descShort = (p.description || p.type).substring(0, 300);

  // fullDescription from description
  const fullDesc = p.description || '';

  return [
    `  "${p.slug}": {`,
    `    name: ${JSON.stringify(p.name)}, grade: ${JSON.stringify(gradeStr)}, series: ${JSON.stringify(series)}, type: ${JSON.stringify(p.type)},`,
    `    api: ${JSON.stringify(api)}, acea: ${JSON.stringify(acea)},`,
    `    approvals: ${JSON.stringify(restApprovals)},`,
    `    description: ${JSON.stringify(descShort)},`,
    `    features: ${JSON.stringify(p.features)},`,
    `    image: ${JSON.stringify(p.image ?? '')},`,
    `    fullDescription: \`${fullDesc.replace(/`/g, "'")}\`,`,
    `  },`,
  ].join('\n');
}

const newEntries = newProducts.map(toProductSpecEntry).join('\n');

// ─── Patch product detail page ────────────────────────────────────────────────

const detailPath = "src/app/[locale]/brands/[slug]/[category]/[product]/page.tsx";
let detailSrc = gitShow(detailPath);

// Insert new entries just before the closing }; of MOBIL_INDUSTRIAL_PRODUCTS (line 3191)
const MOBIL_CLOSE = '\n};\n';
const insertionMarker = 'const MOBIL_INDUSTRIAL_PRODUCTS:';
const blockStart = detailSrc.indexOf(insertionMarker);
if (blockStart < 0) throw new Error('Cannot find MOBIL_INDUSTRIAL_PRODUCTS in remote page.tsx');

// Find the first }; after blockStart
let searchFrom = blockStart;
let closeIdx = -1;
while (true) {
  const candidate = detailSrc.indexOf('\n};\n', searchFrom + 1);
  if (candidate < 0) break;
  closeIdx = candidate;
  break; // first }; after the block start
}
if (closeIdx < 0) throw new Error('Cannot find closing }; of MOBIL_INDUSTRIAL_PRODUCTS');

detailSrc =
  detailSrc.slice(0, closeIdx) +
  '\n' +
  newEntries +
  detailSrc.slice(closeIdx);

writeFileSync(join(ROOT, detailPath), detailSrc, 'utf8');
console.log(`✓ Added ${newProducts.length} products to product detail page`);

// ─── Patch category page ──────────────────────────────────────────────────────

const catPath = "src/app/[locale]/brands/[slug]/[category]/page.tsx";
let catSrc = gitShow(catPath);

// Get current mobil:endustriyel-yaglar list (all product names)
// Merge: keep remote names + add any from my list that aren't already there
const allMyNames = products.map(p => p.name);

// Extract existing mobil override
const mobilMarker = '"mobil:endustriyel-yaglar"';
const mobilIdx = catSrc.indexOf(mobilMarker);
if (mobilIdx >= 0) {
  // Find the closing ],
  const listStart = catSrc.indexOf('[', mobilIdx);
  const listEnd   = catSrc.indexOf('],', listStart);
  const existing  = catSrc.slice(listStart + 1, listEnd);
  const existingNames = [...existing.matchAll(/"([^"]+)"/g)].map(m => m[1]);
  const existingSet = new Set(existingNames);
  const toAdd = allMyNames.filter(n => !existingSet.has(n));

  if (toAdd.length > 0) {
    const addStr = '\n' + toAdd.map(n => `    ${JSON.stringify(n)},`).join('\n');
    catSrc = catSrc.slice(0, listEnd) + addStr + '\n  ' + catSrc.slice(listEnd);
    console.log(`✓ Added ${toAdd.length} names to category page mobil:endustriyel-yaglar`);
  } else {
    console.log('~ Category page already has all product names');
  }
} else {
  console.warn('⚠ mobil:endustriyel-yaglar not found in remote category page — skipping');
}

writeFileSync(join(ROOT, catPath), catSrc, 'utf8');

// ─── Patch messages files ─────────────────────────────────────────────────────

const TYPE_EN = {
  'Yüksek Performanslı Hidrolik Yağ': 'High-Performance Hydraulic Oil',
  'Dolaşım Sistemi Yağı': 'Circulating System Oil', 'Mineral Yağlı Kompresör Yağı': 'Mineral Compressor Oil',
  'Ağır Hizmet Dolaşım Yağı': 'Heavy-Duty Circulating Oil', 'Endüstriyel Yağlayıcı': 'Industrial Lubricant',
  'Hidrolik Yağ': 'Hydraulic Oil', 'Yangına Dayanıklı Hidrolik Sıvı': 'Fire-Resistant Hydraulic Fluid',
  'Kompresör Yağı': 'Compressor Oil', 'Sentetik Kompresör Yağı': 'Synthetic Compressor Oil',
  'Kızak ve Yol Kılavuzu Yağı': 'Slideway and Guideway Oil', 'Mil Yağı': 'Spindle Oil',
  'Pnömatik Ekipman Yağı': 'Pneumatic Equipment Oil', 'Isıl İşlem Yağı': 'Heat Treatment Oil',
  'Soğutma Kompresörü Yağı': 'Refrigeration Compressor Oil',
  'Çevreci Soğutma Yağı': 'Environmentally Acceptable Refrigeration Oil',
  'Metal İşleme Sıvısı': 'Metalworking Fluid', 'Kesme Sıvısı': 'Cutting Fluid',
  'Ağır Dişli ve Kablo Yağı': 'Heavy Gear and Wire Rope Lubricant',
  'Havacılık Türbin Yağı': 'Aviation Turbine Oil', 'Havacılık Hidrolik Sıvısı': 'Aviation Hydraulic Fluid',
  'Elektrik Transformatör Yağı': 'Electrical Transformer Oil', 'Metal Temizleme Solüsyonu': 'Metal Cleaning Solution',
  'Fırın Konveyör Yağlayıcısı': 'Oven Conveyor Lubricant', 'Makine Dairesi Yağı': 'Machine Room Oil',
};
const TYPE_AR = {
  'Yüksek Performanslı Hidrolik Yağ': 'زيت هيدروليكي عالي الأداء',
  'Dolaşım Sistemi Yağı': 'زيت نظام الدورة', 'Kompresör Yağı': 'زيت ضاغط',
  'Sentetik Kompresör Yağı': 'زيت ضاغط اصطناعي', 'Endüstriyel Yağlayıcı': 'مادة تشحيم صناعية',
  'Hidrolik Yağ': 'زيت هيدروليكي', 'Yangına Dayanıklı Hidrolik Sıvı': 'سائل هيدروليكي مقاوم للحريق',
  'Kızak ve Yol Kılavuzu Yağı': 'زيت مزلقة ومسارات', 'Mil Yağı': 'زيت المغزل',
  'Pnömatik Ekipman Yağı': 'زيت المعدات الهوائية', 'Isıl İşlem Yağı': 'زيت المعالجة الحرارية',
  'Soğutma Kompresörü Yağı': 'زيت ضاغط التبريد', 'Çevreci Soğutma Yağı': 'زيت تبريد صديق للبيئة',
  'Metal İşleme Sıvısı': 'سائل تشغيل المعادن', 'Kesme Sıvısı': 'سائل القطع',
  'Ağır Dişli ve Kablo Yağı': 'مشحم تروس ثقيلة وحبال معدنية',
  'Havacılık Türbin Yağı': 'زيت توربين الطيران', 'Havacılık Hidrolik Sıvısı': 'سائل هيدروليكي للطيران',
  'Elektrik Transformatör Yağı': 'زيت محول كهربائي',
};

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object') {
      deepMerge(target[k], v);
    } else if (!target[k]) { // only add, never overwrite
      target[k] = v;
    }
  }
}

for (const { locale, buildEntry } of [
  { locale: 'tr', buildEntry: p => ({ name: p.name, type: p.type, category: p.category, description: p.description || p.type, features: p.features }) },
  { locale: 'en', buildEntry: p => ({ name: p.name, type: TYPE_EN[p.type] ?? p.type, category: p.category, description: TYPE_EN[p.type] ? `${p.name} is a premium ${(TYPE_EN[p.type]||'').toLowerCase()} for industrial applications.` : p.description, features: p.features }) },
  { locale: 'ar', buildEntry: p => ({ name: p.name, type: TYPE_AR[p.type] ?? p.type, category: p.category, description: TYPE_AR[p.type] ? `${p.name} هو ${(TYPE_AR[p.type]||'').toLowerCase()} عالي الجودة للتطبيقات الصناعية.` : p.description, features: p.features }) },
]) {
  const msgPath = `messages/${locale}.json`;
  const msgSrc  = JSON.parse(gitShow(msgPath));

  if (!msgSrc.pd) msgSrc.pd = {};
  if (!msgSrc.pd.mobil) msgSrc.pd.mobil = {};

  const additions = {};
  for (const p of products) {
    if (!msgSrc.pd.mobil[p.slug]) { // only add new slugs, never overwrite
      additions[p.slug] = buildEntry(p);
    }
  }
  deepMerge(msgSrc.pd.mobil, additions);

  writeFileSync(join(ROOT, msgPath), JSON.stringify(msgSrc, null, 2) + '\n', 'utf8');
  console.log(`✓ messages/${locale}.json — added ${Object.keys(additions).length} new pd.mobil entries`);
}

// ─── Stage and commit ─────────────────────────────────────────────────────────

console.log('\n📦 Staging changes…');

function gitAdd(files) {
  const r = spawnSync('git', ['add', ...files], { cwd: ROOT, stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`git add failed for: ${files.join(' ')}`);
}

gitAdd([
  'src/app/[locale]/brands/[slug]/[category]/[product]/page.tsx',
  'src/app/[locale]/brands/[slug]/[category]/page.tsx',
  'messages/tr.json', 'messages/en.json', 'messages/ar.json',
  'public/images/products/mobil/',
  'scripts/scrape-mobil.mjs', 'scripts/apply-codegen.mjs',
  'scripts/translate-messages.mjs', 'scripts/merge-and-push.mjs',
  'scripts/data/',
]);

// Commit
const commitMsg = `feat(mobil): add 84 scraped industrial oil products with images

- Scraped 84 unique Mobil industrial products from turkoilmarket.com
- Downloaded 84 product images to public/images/products/mobil/
- Added 78 new products to MOBIL_INDUSTRIAL_PRODUCTS (6 already existed)
- Extended mobil:endustriyel-yaglar BRAND_OVERRIDES with all product names
- Added pd.mobil translations to messages/tr.json, en.json, ar.json
- Added scraper and codegen scripts to scripts/

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`;

const commitR = spawnSync('git', ['commit', '-m', commitMsg], { cwd: ROOT, stdio: 'inherit' });
if (commitR.status !== 0) throw new Error('git commit failed');

// Push
console.log('\n🚀 Pushing to origin/master…');
const pushR = spawnSync('git', ['push', 'origin', 'master'], { cwd: ROOT, stdio: 'inherit' });
if (pushR.status !== 0) throw new Error('git push failed');

console.log('\n✅ Done — pushed to origin/master');
