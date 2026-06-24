import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/de/products_/Motul")({
  component: MotulPage,
});

function MotulPage() {
  return (
    <BrandCatalogPage
      brandName="Motul"
      logo={`${ASSET_BASE}/brands/motul.jpg`}
      logoClassName="max-w-[360px]"
      catalogs={[
        { title: "Motul Catalogue", href: "https://model-oils.vercel.app/docs/motul/motul-genel-katalog.pdf" },
      ]}
    />
  );
}
