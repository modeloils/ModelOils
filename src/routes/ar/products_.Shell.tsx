import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/ar/products_/Shell")({
  component: ShellPage,
});

function ShellPage() {
  return (
    <BrandCatalogPage
      brandName="Shell"
      logo={`${ASSET_BASE}/brands/Shell.png`}
      catalogs={[
        { title: "Shell Coolant Catalogue", href: "https://model-oils.vercel.app/docs/shell/shell-coolant-catalogue.pdf" },
        { title: "Shell Helix Catalogue", href: "https://model-oils.vercel.app/docs/shell/shell-helix-catalogue.pdf" },
        { title: "Shell Marine Catalogue", href: "https://model-oils.vercel.app/docs/shell/shell-marine-catalogue.pdf" },
        { title: "Shell Industrial Catalogue", href: "https://model-oils.vercel.app/docs/shell/shell-endustriyel-katalog.pdf" },
      ]}
    />
  );
}
