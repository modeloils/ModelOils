import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/ru/products_/Shell")({
  component: ShellPage,
});

function ShellPage() {
  return (
    <BrandCatalogPage
      brandName="Shell"
      logo={`${ASSET_BASE}/brands/Shell.png`}
      catalogs={[
        { title: "Shell Coolant Catalogue", href: "/model-oils/docs/shell/shell-coolant-catalogue.pdf" },
        { title: "Shell Helix Catalogue", href: "/model-oils/docs/shell/shell-helix-catalogue.pdf" },
        { title: "Shell Marine Catalogue", href: "/model-oils/docs/shell/shell-marine-catalogue.pdf" },
        { title: "Shell Industrial Catalogue", href: "/model-oils/docs/shell/shell-endustriyel-katalog.pdf" },
      ]}
    />
  );
}
