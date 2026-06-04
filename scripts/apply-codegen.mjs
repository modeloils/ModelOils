/**
 * apply-codegen.mjs
 *
 * 1. Read scripts/data/mobil-industrial.json
 * 2. Fix bad product names (page-section titles, wrong picks)
 * 3. Patch  src/app/[locale]/brands/[slug]/[category]/[product]/page.tsx
 *    – add MobilIndustrialSpec interface + MOBIL_INDUSTRIAL_PRODUCTS record
 *    – extend generateStaticParams
 *    – add Mobil industrial routing + page section
 * 4. Patch  src/app/[locale]/brands/[slug]/[category]/page.tsx
 *    – replace mobil:endustriyel-yaglar BRAND_OVERRIDES entry
 *
 * Usage:  node scripts/apply-codegen.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Load JSON ────────────────────────────────────────────────────────────────

const products = JSON.parse(
  readFileSync(join(ROOT, 'scripts', 'data', 'mobil-industrial.json'), 'utf8')
);

// ─── Name fix ─────────────────────────────────────────────────────────────────

const UPPER_WORDS = new Set([
  'dte', 'shc', 'iso', 'vg', 'hfc', 'hf', 'hfa', 'ect', 'eal',
  'nh', 'nt', 'ah', 'ep', 'hp', 'iv',
]);

function slugToCanonicalName(slug) {
  if (slug.startsWith('exxon-')) {
    return 'Exxon ' + slug.replace(/^exxon-/, '').split('-').map(capWord).join(' ');
  }
  return 'Mobil ' + slug.split('-').map(capWord).join(' ');
}

function capWord(w) {
  if (UPPER_WORDS.has(w.toLowerCase())) return w.toUpperCase();
  if (/^\d/.test(w)) return w.replace(/w$/i, 'W');
  return w.charAt(0).toUpperCase() + w.slice(1);
}

// Patterns that indicate the scraper picked up a page section header instead of product name
const BAD_NAME_PATTERNS = [
  /^(Benzer|Özellikleri|Özellik|Hidrolik|Yeni Nesil|Anasayfa|Endüstriyel|Hakkımızda)/i,
  /Ürünler$/i,
  /Faydaları$/i,
  /^$/,
];

// Names that are partially right but missing the Mobil prefix
const NEEDS_MOBIL_PREFIX = (name) =>
  name.length > 3 && !name.startsWith('Mobil') && !name.startsWith('Exxon');

for (const p of products) {
  const isBad = BAD_NAME_PATTERNS.some(rx => rx.test(p.name));
  if (isBad || NEEDS_MOBIL_PREFIX(p.name)) {
    const fixed = slugToCanonicalName(p.slug);
    console.log(`  fix name: "${p.name}" → "${fixed}"  [${p.slug}]`);
    p.name = fixed;
  }
}

console.log(`\n✓ Names fixed. ${products.length} products total.\n`);

// ─── TypeScript generation ────────────────────────────────────────────────────

function jsStr(v) { return JSON.stringify(v); }

function generateMobilRecord(prods) {
  const entries = prods.map(p => [
    `  "${p.slug}": {`,
    `    name: ${jsStr(p.name)},`,
    `    category: ${jsStr(p.category)},`,
    `    type: ${jsStr(p.type)},`,
    `    description: ${jsStr(p.description)},`,
    `    features: ${JSON.stringify(p.features)},`,
    `    approvals: ${JSON.stringify(p.approvals)},`,
    `    specs: ${JSON.stringify(p.specs)},`,
    `    image: ${jsStr(p.image ?? '')},`,
    `  },`,
  ].join('\n')).join('\n');

  return `const MOBIL_INDUSTRIAL_PRODUCTS: Record<string, MobilIndustrialSpec> = {\n${entries}\n};`;
}

const MOBIL_INTERFACE = `
interface MobilIndustrialSpec {
  name: string;
  category: string;
  type: string;
  description: string;
  features: string[];
  approvals: string[];
  specs: Record<string, string>;
  image: string;
}
`;

const MOBIL_RECORD = generateMobilRecord(products);

// ─── Patch product detail page ────────────────────────────────────────────────

const detailPagePath = join(
  ROOT, 'src', 'app', '[locale]', 'brands', '[slug]', '[category]', '[product]', 'page.tsx'
);
let detailSrc = readFileSync(detailPagePath, 'utf8');

// 1. Insert MobilIndustrialSpec interface right after the existing ProductSpec interface closing brace
if (!detailSrc.includes('MobilIndustrialSpec')) {
  // Find "}" closing the ProductSpec interface
  const ifaceEnd = detailSrc.indexOf('}\n\nconst SHELL_MOTOR_PRODUCTS');
  if (ifaceEnd < 0) throw new Error('Could not locate ProductSpec interface end in page.tsx');
  detailSrc =
    detailSrc.slice(0, ifaceEnd + 1) +
    '\n' + MOBIL_INTERFACE +
    detailSrc.slice(ifaceEnd + 1);
  console.log('  ✓ Inserted MobilIndustrialSpec interface');
} else {
  console.log('  ~ MobilIndustrialSpec already present, skipping interface insert');
}

// 2. Insert MOBIL_INDUSTRIAL_PRODUCTS record after closing of SHELL_MOTOR_PRODUCTS
if (!detailSrc.includes('MOBIL_INDUSTRIAL_PRODUCTS')) {
  // Find the closing "};" of SHELL_MOTOR_PRODUCTS (last }; before interface definition)
  const shellEnd = detailSrc.indexOf('\n};\n\ninterface ProductPageProps');
  if (shellEnd < 0) throw new Error('Could not locate SHELL_MOTOR_PRODUCTS end in page.tsx');
  const insertPoint = shellEnd + 3; // after "};\n"
  detailSrc =
    detailSrc.slice(0, insertPoint) +
    '\n' + MOBIL_RECORD + '\n' +
    detailSrc.slice(insertPoint);
  console.log('  ✓ Inserted MOBIL_INDUSTRIAL_PRODUCTS record');
} else {
  // Replace the existing record
  const startMarker = 'const MOBIL_INDUSTRIAL_PRODUCTS: Record<string, MobilIndustrialSpec> = {';
  const endMarker = '\n};\n\ninterface ProductPageProps';
  const si = detailSrc.indexOf(startMarker);
  const ei = detailSrc.indexOf(endMarker, si);
  if (si < 0 || ei < 0) throw new Error('Could not locate MOBIL_INDUSTRIAL_PRODUCTS bounds to replace');
  detailSrc = detailSrc.slice(0, si) + MOBIL_RECORD + detailSrc.slice(ei);
  console.log('  ✓ Replaced MOBIL_INDUSTRIAL_PRODUCTS record');
}

// 3. Update generateStaticParams to include Mobil industrial products
const mobilStaticParams = products.map(p =>
  `    { slug: "mobil", category: "endustriyel-yaglar", product: "${p.slug}" },`
).join('\n');

const oldStaticParams = `export async function generateStaticParams() {
  return Object.keys(SHELL_MOTOR_PRODUCTS).map((product) => ({
    slug: "Shell",
    category: "motor-yaglari",
    product,
  }));
}`;

const newStaticParams = `export async function generateStaticParams() {
  const shellParams = Object.keys(SHELL_MOTOR_PRODUCTS).map((product) => ({
    slug: "Shell",
    category: "motor-yaglari",
    product,
  }));
  const mobilParams = Object.keys(MOBIL_INDUSTRIAL_PRODUCTS).map((product) => ({
    slug: "mobil",
    category: "endustriyel-yaglar",
    product,
  }));
  return [...shellParams, ...mobilParams];
}`;

if (detailSrc.includes(oldStaticParams)) {
  detailSrc = detailSrc.replace(oldStaticParams, newStaticParams);
  console.log('  ✓ Updated generateStaticParams');
} else if (!detailSrc.includes('mobilParams')) {
  console.warn('  ⚠ generateStaticParams not updated — pattern not found');
}

// 4. Add Mobil industrial routing + rendering section in ProductPage
const MOBIL_RENDERING = `
  // ── Mobil Industrial ────────────────────────────────────────────────────────
  if (slug.toLowerCase() === "mobil" && category === "endustriyel-yaglar") {
    const mSpec = MOBIL_INDUSTRIAL_PRODUCTS[product];
    if (!mSpec) notFound();
    const mColors = { primary: "#003DA5", secondary: "#001a5c", accent: "#CC0000" };
    return (
      <main className="min-h-screen bg-brand-50 pt-[120px]">
        {/* Back link */}
        <div className="bg-white border-b border-brand-200 py-4">
          <div className="container-xl">
            <Link
              href={\`/brands/\${slug}/\${category}\`}
              className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Mobil Endüstriyel Yağlara Dön
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section
          className="relative overflow-hidden py-16"
          style={{ background: \`linear-gradient(135deg, \${mColors.primary} 0%, \${mColors.secondary} 100%)\` }}
        >
          <div className="container-xl relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              {/* Product image or placeholder */}
              <div
                className="shrink-0 w-52 h-64 rounded-2xl flex flex-col items-center justify-center border-4 shadow-2xl overflow-hidden"
                style={{ borderColor: mColors.accent, background: \`linear-gradient(170deg, \${mColors.primary} 0%, \${mColors.secondary} 100%)\` }}
              >
                {mSpec.image ? (
                  <img
                    src={mSpec.image}
                    alt={mSpec.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <span className="text-white/40 text-xs text-center px-4">Görsel Yok</span>
                )}
              </div>

              {/* Info */}
              <div className="text-white flex-1">
                <p className="text-sm font-semibold tracking-widest uppercase mb-1 opacity-70">Mobil</p>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2 px-3 py-1 rounded-full inline-block"
                  style={{ background: mColors.accent }}
                >
                  {mSpec.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-2 mt-2">{mSpec.name}</h1>
                <p className="text-white/60 text-sm mb-1 italic">{mSpec.type}</p>
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl mt-3">{mSpec.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Specs + Features */}
        <section className="section-padding">
          <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Technical specs */}
            <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
              <h2 className="text-xl font-bold text-brand-900 mb-5">Teknik Özellikler</h2>
              <dl className="divide-y divide-brand-100">
                {[
                  { label: "Ürün Adı",    value: mSpec.name     },
                  { label: "Kategori",    value: mSpec.category },
                  { label: "Ürün Tipi",   value: mSpec.type     },
                  ...Object.entries(mSpec.specs).map(([k, v]) => ({ label: k, value: v })),
                ].map(({ label, value }) => value ? (
                  <div key={label} className="flex justify-between py-3 text-sm">
                    <dt className="text-brand-500 font-medium">{label}</dt>
                    <dd className="text-brand-900 font-semibold text-right">{value}</dd>
                  </div>
                ) : null)}

                {mSpec.approvals.length > 0 && (
                  <div className="py-3 text-sm">
                    <dt className="text-brand-500 font-medium mb-2">Onaylar ve Standartlar</dt>
                    <dd className="flex flex-wrap gap-2">
                      {mSpec.approvals.map((a) => (
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
            {mSpec.features.length > 0 && (
              <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-6">
                <h2 className="text-xl font-bold text-brand-900 mb-5">Temel Özellikler</h2>
                <ul className="space-y-3">
                  {mSpec.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: mColors.primary }} />
                      <span className="text-brand-700 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container-xl text-center">
            <p className="text-brand-500 text-lg mb-6 max-w-xl mx-auto">
              Bu ürün hakkında toplu fiyat teklifi almak ister misiniz?
            </p>
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">Teklif İste</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }
  // ── End Mobil Industrial ─────────────────────────────────────────────────────
`;

const ROUTING_INSERTION_MARKER = `  const { slug, category, product } = await params;\n  const spec = SHELL_MOTOR_PRODUCTS[product];`;
const NEW_ROUTING = `  const { slug, category, product } = await params;
${MOBIL_RENDERING}
  const spec = SHELL_MOTOR_PRODUCTS[product];`;

if (!detailSrc.includes('End Mobil Industrial')) {
  if (detailSrc.includes(ROUTING_INSERTION_MARKER)) {
    detailSrc = detailSrc.replace(ROUTING_INSERTION_MARKER, NEW_ROUTING);
    console.log('  ✓ Added Mobil industrial routing + rendering');
  } else {
    console.warn('  ⚠ Could not find routing insertion point — check page.tsx manually');
  }
}

writeFileSync(detailPagePath, detailSrc, 'utf8');
console.log(`\n✅ Updated: ${detailPagePath.replace(ROOT, '.')}`);

// ─── Patch category page ──────────────────────────────────────────────────────

const catPagePath = join(
  ROOT, 'src', 'app', '[locale]', 'brands', '[slug]', '[category]', 'page.tsx'
);
let catSrc = readFileSync(catPagePath, 'utf8');

// Build the new product name list for mobil:endustriyel-yaglar
const mobilNames = products.map(p => `    ${jsStr(p.name)},`).join('\n');
const newMobilOverride = `  "mobil:endustriyel-yaglar": [\n${mobilNames}\n  ],`;

// Find and replace existing mobil:endustriyel-yaglar entry
const mobilStart = catSrc.indexOf('"mobil:endustriyel-yaglar"');
if (mobilStart < 0) {
  // Not found — append to BRAND_OVERRIDES
  const overridesEnd = catSrc.lastIndexOf('\n};', catSrc.indexOf('interface CardColors'));
  if (overridesEnd < 0) throw new Error('Cannot find BRAND_OVERRIDES closing in category page');
  catSrc = catSrc.slice(0, overridesEnd) + '\n\n  /* ── MOBIL INDUSTRIAL ─── */\n' + newMobilOverride + '\n' + catSrc.slice(overridesEnd);
  console.log('  ✓ Inserted mobil:endustriyel-yaglar into BRAND_OVERRIDES');
} else {
  // Find the closing "],\n" of the existing entry
  const entryEnd = catSrc.indexOf('],', mobilStart) + 2;
  catSrc = catSrc.slice(0, mobilStart) + newMobilOverride + catSrc.slice(entryEnd);
  console.log('  ✓ Replaced mobil:endustriyel-yaglar in BRAND_OVERRIDES');
}

// Also add PRODUCT_IMAGES map with mobil image paths if it exists in the file
if (catSrc.includes('PRODUCT_IMAGES')) {
  // Find the closing }; of PRODUCT_IMAGES and insert mobil entries before it
  const imgEnd = catSrc.indexOf('\n};\n', catSrc.indexOf('PRODUCT_IMAGES')) + 1;
  const mobilImgEntries = products
    .filter(p => p.image)
    .map(p => `  "mobil:${p.slug}": ${jsStr(p.image)},`)
    .join('\n');
  // Only add entries that are not already there
  if (!catSrc.includes('"mobil:dte-10-excel-46"')) {
    catSrc = catSrc.slice(0, imgEnd) + '\n  // Mobil industrial\n' + mobilImgEntries + '\n' + catSrc.slice(imgEnd);
    console.log('  ✓ Added Mobil image paths to PRODUCT_IMAGES');
  }
}

writeFileSync(catPagePath, catSrc, 'utf8');
console.log(`\n✅ Updated: ${catPagePath.replace(ROOT, '.')}`);

// ─── Save fixed JSON ──────────────────────────────────────────────────────────

writeFileSync(
  join(ROOT, 'scripts', 'data', 'mobil-industrial.json'),
  JSON.stringify(products, null, 2),
  'utf8'
);

console.log('\n🎉 Done! All patches applied.');
console.log('\nFixed product list:');
products.forEach(p => console.log(`  ${p.slug.padEnd(40)} → ${p.name}`));
