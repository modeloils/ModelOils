/**
 * Removes the old/wrong Mobil product entries that were re-introduced by the
 * merge-and-push script. These slugs were deleted by the user in commits
 * 4ce2af6 and 360364f but came back because the script used a stale snapshot.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Slugs that should NOT be there — the user explicitly deleted these
const REMOVE_SLUGS = new Set([
  'shc-630', 'shc-632',
  'vactra-2',
  'grease-xhp-222',
  'shc-pegasus-30',
  'pegasus-805', 'pegasus-605', 'pegasus-610', 'pegasus-1005', 'pegasus-705',
]);

const pagePath = join(ROOT, 'src', 'app', '[locale]', 'brands', '[slug]', '[category]', '[product]', 'page.tsx');
let src = readFileSync(pagePath, 'utf8');

let removed = 0;
for (const slug of REMOVE_SLUGS) {
  // Match the entire entry: "slug": { ... },
  // Entry starts with  "  \"slug\": {" and ends with "  },"
  const start = new RegExp(`\n  "${slug}":\\s*\\{`, 'g');
  let match;
  while ((match = start.exec(src)) !== null) {
    // Find the matching closing "}," at the same indent level (2 spaces)
    let depth = 0;
    let i = match.index + match[0].length - 1; // position of opening {
    while (i < src.length) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) {
          // i is now at the closing }
          // consume trailing , and newline
          let end = i + 1;
          if (src[end] === ',') end++;
          if (src[end] === '\n') end++;
          src = src.slice(0, match.index) + src.slice(end);
          removed++;
          break;
        }
      }
      i++;
    }
    // Reset regex since string changed
    start.lastIndex = 0;
    break;
  }
}

writeFileSync(pagePath, src, 'utf8');
console.log(`Removed ${removed} old product entries: ${[...REMOVE_SLUGS].join(', ')}`);

// Verify they're gone
for (const slug of REMOVE_SLUGS) {
  if (src.includes(`"${slug}":`)) {
    console.error(`  ⚠ Still found: ${slug}`);
  }
}

// Commit and push
const r = spawnSync('git', ['add', 'src/app/[locale]/brands/[slug]/[category]/[product]/page.tsx'], { cwd: ROOT, stdio: 'inherit' });
if (r.status !== 0) throw new Error('git add failed');

const c = spawnSync('git', ['commit', '-m', `fix(mobil): remove ${removed} wrong products re-added by merge script

Slugs shc-630, shc-632, vactra-2, grease-xhp-222, shc-pegasus-30,
and pegasus-* were deleted by user in 4ce2af6/360364f but were
inadvertently re-introduced. Now removed cleanly.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`], { cwd: ROOT, stdio: 'inherit' });
if (c.status !== 0) throw new Error('git commit failed');

const p = spawnSync('git', ['push', 'origin', 'master'], { cwd: ROOT, stdio: 'inherit' });
if (p.status !== 0) throw new Error('git push failed');

console.log('\n✅ Pushed — old entries removed.');
