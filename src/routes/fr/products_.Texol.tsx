import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/fr/products_/Texol")({
  component: TexolPage,
});

function TexolPage() {
  return (
    <BrandCatalogPage
      brandName="Texol"
      logo={`${ASSET_BASE}/brands/texol.jpg`}
      logoClassName="max-w-[420px]"
      catalogs={[
        { title: "Texol Motor Oils", href: "https://model-oils.vercel.app/docs/texol/texol-motor-oils.pdf" },
        { title: "Texol Industrial Lubricants", href: "https://model-oils.vercel.app/docs/texol/texol-endustriyel-yaglar.pdf" },
      ]}
    />
  );
}
