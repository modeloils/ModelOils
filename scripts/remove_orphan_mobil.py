#!/usr/bin/env python3
"""Remove the 11 pre-existing Mobil products that are not from turkoilmarket.com category pages."""

import json, os, re

BASE    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOC     = os.path.join(BASE, "src", "app", "[locale]", "brands", "[slug]", "[category]")
DETAIL  = os.path.join(LOC, "[product]", "page.tsx")
CAT     = os.path.join(LOC, "page.tsx")
MSG     = os.path.join(BASE, "messages")

ORPHAN_SLUGS = [
    "1-esp-0w-30", "1-esp-5w-30", "1-esp-x4-0w-40", "1-fs-5w-40",
    "1-new-life-0w-40", "super-3000-fe-5w-30", "super-2000-10w-40",
    "delvac-1-esp-5w-30", "delvac-1-esp-5w-40", "delvac-1300-super-15w-40",
    "super-1000-15w-40",
]

ORPHAN_NAMES = [
    "Mobil 1 ESP 0W-30", "Mobil 1 ESP 5W-30", "Mobil 1 ESP X4 0W-40",
    "Mobil 1 FS 5W-40", "Mobil 1 New Life 0W-40", "Mobil Super 3000 FE 5W-30",
    "Mobil Super 2000 10W-40", "Mobil Delvac 1 ESP 5W-30", "Mobil Delvac 1 ESP 5W-40",
    "Mobil Delvac 1300 Super 15W-40", "Mobil Super 1000 15W-40",
]


def remove_ts_entry(content: str, slug: str) -> str:
    """Remove a TypeScript object entry by slug key."""
    marker = f'  "{slug}": {{'
    idx = content.find(marker)
    if idx == -1:
        return content
    # Find closing '  },' of this entry
    close = content.find('\n  },', idx)
    if close == -1:
        return content
    end = close + len('\n  },')
    removed = content[idx:end]
    print(f"  Removed entry: {slug} ({len(removed)} chars)")
    return content[:idx] + content[end:]


def remove_from_array(content: str, array_key: str, items: list[str]) -> str:
    """Remove quoted string items from a TypeScript array."""
    for item in items:
        pattern = f'\n    "{item}",'
        if pattern in content:
            content = content.replace(pattern, '', 1)
            print(f"  Removed from {array_key}: {item}")
    return content


def remove_product_images(content: str, slugs: list[str]) -> str:
    """Remove mobil:slug entries from PRODUCT_IMAGES."""
    for slug in slugs:
        key = f'"mobil:{slug}"'
        idx = content.find(key)
        if idx == -1:
            continue
        # Find the full line and remove it
        line_start = content.rfind('\n', 0, idx)
        line_end = content.find('\n', idx)
        if line_start != -1 and line_end != -1:
            content = content[:line_start] + content[line_end:]
            print(f"  Removed PRODUCT_IMAGES: mobil:{slug}")
    return content


def main():
    # ── Detail page ──────────────────────────────────────────────────────────
    with open(DETAIL, encoding="utf-8") as f:
        detail = f.read()

    print("Removing from MOBIL_MOTOR_PRODUCTS:")
    for slug in ORPHAN_SLUGS:
        detail = remove_ts_entry(detail, slug)

    with open(DETAIL, "w", encoding="utf-8") as f:
        f.write(detail)

    # ── Category page ─────────────────────────────────────────────────────────
    with open(CAT, encoding="utf-8") as f:
        cat = f.read()

    print("\nRemoving from BRAND_OVERRIDES mobil:motor-yaglari:")
    cat = remove_from_array(cat, "mobil:motor-yaglari", ORPHAN_NAMES)

    print("\nRemoving from PRODUCT_IMAGES:")
    cat = remove_product_images(cat, ORPHAN_SLUGS)

    with open(CAT, "w", encoding="utf-8") as f:
        f.write(cat)

    # ── Messages ─────────────────────────────────────────────────────────────
    print("\nRemoving from messages pd namespace:")
    for lang in ["en", "tr", "ru", "fa"]:
        path = os.path.join(MSG, f"{lang}.json")
        if not os.path.exists(path):
            continue
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        pd = d.get("pd", {})
        removed = [s for s in ORPHAN_SLUGS if s in pd]
        for s in removed:
            del pd[s]
        if removed:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            print(f"  {lang}.json: removed {removed}")

    print("\nDone.")


if __name__ == "__main__":
    main()
