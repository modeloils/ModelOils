import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/tr/products_/Texaco")({
  component: TexacoPage,
});

function TexacoPage() {
  return (
    <BrandCatalogPage
      brandName="Texaco"
      logo={`${ASSET_BASE}/brands/texaco.png`}
      logoClassName="max-w-[520px]"
      catalogs={[
        { title: "Motor Yağları", href: "https://model-oils.vercel.app/docs/texaco/texaco-motor-oils.pdf" },
        { title: "Katalog", href: "https://model-oils.vercel.app/docs/texaco/texaco-genel-katalog.pdf" },
      ]}
    />
  );
}
