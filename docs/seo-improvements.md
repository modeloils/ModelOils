# Yokohama search improvements — September 13, 2026

## Research

The public search sample returned the English MODEL GRUP brand page for Yokohama motor oil. This confirms discovery in that sample, not a Google ranking in a particular country. Search Console access was not available to measure impressions, queries, or indexing coverage. The live brand page had a generic “Featured Yokohama Products” H1 and little product-selection information.

The catalogue and site use **Yokohama**, rather than the spelling **Yokohoma** in the request. Keep the correct brand spelling in editorial content; monitor both spellings in Search Console. Do not invent search-volume estimates or create duplicate misspelling pages.

## Query targets

| Page | Relevant searches |
| --- | --- |
| `/yokohama` | Yokohama oil, Yokohama motor oil, Yokohama engine oil, Yokohama lubricants, Yokohama oil catalogue, wholesale Yokohama motor oil |
| `/tr/yokohama` | Yokohama yağ, Yokohama motor yağı, Yokohama madeni yağ, Yokohama motor yağı fiyatı, toptan Yokohama yağ, Yokohama yağ kataloğu |
| Existing passenger-car viscosity pages | Yokohama 5W-30 motor oil and equivalent queries for actual catalogue grades |
| Existing category/product pages | Brand + application, product name, viscosity and product-specific details |

## Implemented

- Descriptive English/Turkish brand titles, descriptions and H1 headings.
- Visible introduction, selection guidance, quotation and catalogue answers, and links to existing viscosity pages generated from product data.
- Product-specific metadata and structured-data descriptions using existing catalogue descriptions.
- Removed automatic homepage language navigation; the existing language selector and localized URLs remain available.
- Retained canonical URLs, language alternates, robots.txt and the existing multilingual sitemap.
- Fixed the existing missing `catalogs` navigation type encountered during TypeScript validation.

## Release and measurement

These are repository changes; they are not published by this task. Publish the working version through the normal Lovable release workflow. Then submit or verify `https://modeloils.com/sitemap.xml` in Google Search Console and inspect `/yokohama`, `/tr/yokohama` and representative product URLs. Request indexing for the updated brand pages.

Compare impressions, clicks, CTR and average position by query, page and country over subsequent 28-day windows. Track English and Turkish terms separately, including both brand spellings. Crawl and ranking changes are not immediate or guaranteed. If English impressions remain low, use URL Inspection to distinguish indexing problems from competition, and seek legitimate links from existing business partners to the English distributor page.

## Sources

- Live page examined: https://modeloils.com/yokohama
- Google SEO starter guide (relevant content and avoiding keyword stuffing): https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google title guidance: https://developers.google.com/search/docs/appearance/title-link
- Google multilingual guidance (localized URLs, hreflang and avoiding language redirects): https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
