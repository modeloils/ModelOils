import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/fa/products_/Texaco")({
  component: TexacoPage,
});

function TexacoPage() {
  return (
    <BrandCatalogPage
      brandName="Texaco"
      logo={`${ASSET_BASE}/brands/texaco.png`}
      logoClassName="max-w-[520px]"
      catalogs={[
        { title: "Texaco Motor Oils", href: "https://model-oils.vercel.app/docs/texaco/texaco-motor-oils.pdf" },
        { title: "Texaco Catalogue", href: "https://model-oils.vercel.app/docs/texaco/texaco-genel-katalog.pdf" },
      ]}
    />
  );
}
