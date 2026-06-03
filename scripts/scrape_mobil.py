#!/usr/bin/env python3
"""
Scrape Mobil product pages from turkoilmarket.com.
Downloads images and extracts raw page content.
Saves results to scripts/mobil_scraped.json.

Run from project root:
    python scripts/scrape_mobil.py
"""

import json, os, re, time
import requests
from bs4 import BeautifulSoup

BASE    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE, "public", "images", "products", "mobil")
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
}

BASE_URL = "https://www.turkoilmarket.com/urun/"

# One representative URL per unique product (size/package variants deduplicated)
SLUG_TO_SUFFIX: dict[str, str] = {
    # ── Mobil 1 passenger car (new) ───────────────────────────────────────────
    "1-extended-life-10w-60":       "mobil-1-extended-life-10w-60-4-litre",
    "1-fs-new-life-0w-40":          "mobil-1-fs-new-life-0w-40-4-litre",
    "1-esp-formula-5w-30":          "mobil-1-esp-formula-5w-30-4-litre",
    "1-esp-5w-30-dexos2":           "mobil-1-esp-5w-30-dexos2-tam-sentetik-partikullu-5-litre",
    "1-fs-5w-50":                   "mobil-1-fs-5w-50-4-litre",
    "1-esp-x3-0w-40":               "mobil-1-esp-x3-0w-40-5-litre",
    # ── Mobil 1 (existing — images only) ─────────────────────────────────────
    "1-esp-x2-0w-20":               "mobil-1-esp-x2-0w-20-5-litre",
    # ── Mobil Super (new) ─────────────────────────────────────────────────────
    "super-3000-formula-fe-5w-30":  "mobil-super-3000-formula-fe-5w-30-4-litre-1",
    "super-3000-xe-5w-30-c3":       "mobil-super-3000-xe-5w-30-c3-partikullu-motor-yagi-4-l",
    "super-2000-x1-diesel-10w-40":  "mobil-super-2000-x1-diesel-10w-40-4-litre",
    # ── Mobil Super (existing — images only) ─────────────────────────────────
    "super-3000-x1-5w-40":          "mobil-super-3000-x1-5w-40-4-litre-1",
    # ── Mobil Delvac heavy duty (new) ─────────────────────────────────────────
    "delvac-xhp-ultra-le-5w-30":    "mobil-delvac-xhp-ultra-le-5w-30-m-20-litre-2022-tarihlidir",
    "delvac-1-5w-40":               "mobil-delvac-1-5w-40-20-litre",
    "delvac-xhp-le-10w-40":         "mobil-delvac-xhp-le-10w-40-20-litre",
    "delvac-xhp-extra-10w-40":      "mobil-delvac-xhp-extra-10w-40-20-litre",
    "delvac-xhp-esp-10w-40":        "mobil-delvac-xhp-esp-10w-40-20-litre-motor-yagi",
    "delvac-mx-esp-15w-40":         "mobil-delvac-mx-esp-15w-40-20-litre",
    "delvac-lcv-f-5w-30":           "mobil-delvac-lcv-f-5w30-7-litre",
    "delvac-mx-15w-40":             "mobil-delvac-mx-15w-40-20-litre",
    "delvac-mx-esp-10w-30":         "mobil-delvac-mx-esp-10w-30-20-litre",
    "delvac-xhp-15w-40":            "mobil-delvac-xhp-15w-40-18-litre",
    "delvac-super-20w-50":          "mobil-delvac-super-20w-50-16-kg",
    "delvac-1350":                  "mobil-delvac-1350-209-litre-fici",
    "delvac-1340":                  "mobil-delvac-1340-diesel-16-kg-teneke",
    "delvac-1330":                  "mobil-delvac-1330-208-litre-fici",
    "delvac-super-1000-20w-50":     "mobil-delvac-super-1000-20w-50-208-litret-fici",
    "delvac-ct-diesel-10w-30":      "mobil-delvac-ct-diesel-10w-30-209-litre-fici",
    # ── Industrial: gas engine oils (new) ─────────────────────────────────────
    "shc-pegasus-30":               "mobil-shc-pegasus-30-208-litre",
    "pegasus-805":                  "mobil-pegasus-805-208-litre",
    "pegasus-605":                  "mobil-pegasus-605-208-litre",
    "pegasus-610":                  "mobil-pegasus-610-208-litre",
    "pegasus-1005":                 "mobil-pegasus-1005-208-litre",
    "pegasus-705":                  "mobil-pegasus-705-208-litre",
}

_SIZE_RE   = re.compile(r'\s+\d+[.,]?\d*\s*(litre|lt|kg|l)\b.*$', re.IGNORECASE)
_EXTRA_RE  = re.compile(r'\s+(tam sentetik|yar[ıi] sentetik|mineral|partikül\w*|motor ya[ğg]\w*|fıçı|teneke|varil)\b.*$', re.IGNORECASE)


def clean_name(raw: str) -> str:
    n = _SIZE_RE.sub('', raw).strip()
    n = _EXTRA_RE.sub('', n).strip()
    return n


def fetch(url: str):
    try:
        r = requests.get(url, headers=HEADERS, timeout=22)
        return BeautifulSoup(r.text, "html.parser") if r.status_code == 200 else None
    except Exception:
        return None


def og_image(soup) -> str | None:
    og = soup.find("meta", {"property": "og:image"})
    if og and og.get("content"):
        return og["content"]
    for img in soup.find_all("img"):
        src = img.get("src", "") or img.get("data-src", "")
        if src and "/myassets/products/" in src:
            return src if src.startswith("http") else "https://www.turkoilmarket.com" + src
    return None


def extract_text(soup) -> str:
    """Best-effort extraction of the product description body."""
    for sel in [
        ".product-description", ".urun-aciklama", ".detail-tab-content",
        ".tab-content .tab-pane.active", "[class*='description']",
        ".product-content", ".content-inner", ".product-short-description",
    ]:
        el = soup.select_one(sel)
        if el:
            t = el.get_text("\n", strip=True)
            if len(t) > 60:
                return t[:3500]
    # Fallback: biggest block mentioning oil-related Turkish words
    best = ""
    for div in soup.find_all(["div", "section"]):
        t = div.get_text(" ", strip=True)
        if 80 < len(t) < 4000 and any(w in t.lower() for w in
                ["yağ", "motor", "viskoz", "koruma", "performans", "onay", "sertifika"]):
            if len(t) > len(best):
                best = t
    return best[:3500]


def download(url: str, dest: str) -> bool:
    try:
        r = requests.get(url, headers=HEADERS, timeout=30, stream=True)
        if r.status_code == 200:
            with open(dest, "wb") as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)
            return os.path.getsize(dest) > 500
    except Exception:
        pass
    return False


def main():
    results: dict = {}
    n = len(SLUG_TO_SUFFIX)

    for i, (slug, suffix) in enumerate(SLUG_TO_SUFFIX.items(), 1):
        url = BASE_URL + suffix
        status = []

        # Existing image?
        img_path = None
        for ext in (".jpg", ".png", ".webp"):
            p = os.path.join(IMG_DIR, slug + ext)
            if os.path.exists(p) and os.path.getsize(p) > 500:
                img_path = f"/images/products/mobil/{slug}{ext}"
                status.append("img=cached")
                break

        soup = fetch(url)
        if not soup:
            status.append("FETCH_FAILED")
            results[slug] = {"url": url, "image": img_path, "error": True}
            print(f"  [{i}/{n}] {slug} — {' '.join(status)}")
            time.sleep(0.5)
            continue

        # Name
        og_t = soup.find("meta", {"property": "og:title"})
        raw_name = (og_t["content"].strip() if og_t and og_t.get("content")
                    else (soup.find("h1") or {}).get_text(" ", strip=True) if soup.find("h1") else "")
        cname = clean_name(raw_name)

        # Description text
        desc = extract_text(soup)

        # Image
        if img_path is None:
            img_url = og_image(soup)
            if img_url:
                ext = ".png" if img_url.split("?")[0].lower().endswith(".png") else ".jpg"
                dest = os.path.join(IMG_DIR, slug + ext)
                if download(img_url, dest):
                    img_path = f"/images/products/mobil/{slug}{ext}"
                    status.append("img=ok")
                else:
                    status.append("img=dl_fail")
            else:
                status.append("img=not_found")

        results[slug] = {
            "url": url,
            "raw_name": raw_name,
            "name": cname,
            "desc_raw": desc,
            "image": img_path,
        }
        print(f"  [{i}/{n}] {slug} — {cname[:48] or '?'}  {' '.join(status)}")
        time.sleep(0.7)

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mobil_scraped.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    imgs = sum(1 for v in results.values() if v.get("image"))
    print(f"\nDone: {imgs}/{n} images  →  {out}")


if __name__ == "__main__":
    main()
