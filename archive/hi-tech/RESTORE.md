# HI-TECH retirement archive

HI-TECH was removed from the public MODEL GRUP website after commit `2748c58`.
Nothing was permanently deleted: the retired route source, catalog PDFs, product
packshots, media galleries, and homepage artwork are stored below this directory.

## Restore options

1. The complete pre-retirement site can be recovered from Git commit `2748c58`.
2. Individual assets can be moved back from this archive to their original paths.
3. The archived route files preserve the complete HI-TECH product data and page
   implementations, including all localized route wrappers.

## Archived paths

- `source/routes/`: HI-TECH and retired catalog route files.
- `source/components/`: retired product-card components.
- `src-assets/`: HI-TECH homepage, category, and media artwork.
- `public/model-oils/images/hi-tech/`: all HI-TECH product packshots.
- `public/model-oils/docs/hi-tech/`: all HI-TECH catalog PDFs.
- `public/model-oils/media/`: the retired HI-TECH event and sponsorship galleries.
- `public/model-oils/images/HI-TECH-BG.png`: retired brand background.
- `docs/`: retired implementation notes that describe the former brand setup.

When restoring, also recover the matching navigation, footer, translations, SEO,
redirects, and route-tree changes from commit `2748c58` so the archived files and
live code remain synchronized.
