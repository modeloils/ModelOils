import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/products_/Texol")({
  component: TexolPage,
});

function TexolPage() {
  return (
    <BrandCatalogPage
      brandName="Texol"
      logo={`${ASSET_BASE}/brands/texol.jpg`}
      logoClassName="max-w-[210px]"
      catalogs={[
        { title: "Motor Oils", href: "/model-oils/docs/texol/texol-motor-oils.pdf" },
        { title: "Industrial Oils", href: "/model-oils/docs/texol/texol-endustriyel-yaglar.pdf" },
      ]}
    />
  );
}
