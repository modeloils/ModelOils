# Bilingual Site (English + Turkish) — Design

**Date:** 2026-06-23
**Status:** Approved (proceed without further questions)

## Goal

Make the entire Model Oils site available in Turkish alongside English. English stays
at the root (`/`, `/about`, …); Turkish lives under a `/tr` URL prefix so each language
is independently indexable. Browser language auto-detects on first visit.

## Decisions

- **Switching strategy:** URL prefix `/tr` (SEO-friendly). English at root.
- **Default:** Auto-detect via browser `Accept-Language` / `navigator.languages` on first
  visit only; remembered via a `model-oils-lang` cookie.
- **Scope:** Everything visible — nav, all 8 pages' body copy, forms, footer,
  product/category descriptions, error/404 pages, page `<title>`/meta.
- **Translation source:** Hand-written idiomatic Turkish (B2B tone). Brand and product
  proper names (HI-Tech, Shell, viscosity codes like 5W-40) stay in original form.

## Architecture

### Routing
- English route files stay as-is. Each page component is **exported** from its route file.
- A `/tr` mirror file per page (`src/routes/tr/*.tsx`) registers `/tr/...` and renders the
  **same shared component**. No duplicated page logic. `routeTree.gen.ts` regenerates.
- Each route's `head()` calls `pageHead(locale, key)` — English route passes `'en'`, the
  mirror passes `'tr'` — so titles/descriptions and `hreflang` links are locale-correct.

### i18n core (`src/lib/i18n/`)
- `index.tsx` — `Locale` type, `useLocale()` (derives `en`/`tr` from pathname),
  `localePath(to, locale)`, `<LocaleLink>` (locale-aware wrapper over TanStack `Link`),
  `useTranslation()` → `{ locale, t, data }`, `<LanguageSwitcher>`, `pageHead()`.
- `ui.ts` — locale-keyed UI strings `{ en: {...}, tr: {...} }` (nav, header, footer, hero,
  home sections, page heroes, form, errors) plus per-page meta.
- `content.ts` — locale-keyed structured data (categories, products, export cards, trust
  points, industries + details, HI-Tech badges, export markets). Neutral fields (images,
  packaging codes, viscosity specs, proper names) shared.

### Shared constants (`src/lib/site-data.ts`)
- Keeps language-neutral data: `ASSET_BASE`, `CONTACT`, `PACKAGING`, nav `to` paths,
  catalog brand logos. Re-exports `Category`/`Product` types from `content.ts`.

### Components
- `Header` — labels/badge/CTA from `t`, nav via `LocaleLink`, adds `<LanguageSwitcher>`.
- `Footer`, `CategoryCard`, `ProductCard`, `QuoteForm` — text from `useTranslation()`,
  links via `LocaleLink`.
- `PageHero`/`SectionHeading` — no own strings; receive translated props.

### Root + SEO
- `__root.tsx`: `<html lang>` reflects locale; client effect redirects `/` → `/tr` on first
  visit when no cookie and browser prefers Turkish; sets cookie on manual switch.
- `pageHead()` emits `hreflang` alternates (`en`, `tr`, `x-default`).
- `sitemap.xml` lists both `/` and `/tr` URL sets.

## Out of scope
- Persisted server-side locale negotiation beyond the cookie.
- Translating proper nouns, viscosity codes, or country/brand names.
