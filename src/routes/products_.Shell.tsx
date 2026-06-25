import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/products_/Shell")({
  component: ShellPage,
});

const shellCatalogs = [
  { title: "Coolants", href: "/model-oils/docs/shell/shell-coolant-catalogue.pdf" },
  { title: "Motor Oils", href: "/model-oils/docs/shell/shell-helix-catalogue.pdf" },
  { title: "Marine Oils", href: "/model-oils/docs/shell/shell-marine-catalogue.pdf" },
  { title: "Industrial Catalog", href: "/model-oils/docs/shell/shell-endustriyel-katalog.pdf" },
];

function ShellPage() {
  return (
    <BrandCatalogPage
      brandName="Shell"
      logo={`${ASSET_BASE}/brands/Shell.png`}
      catalogs={shellCatalogs}
    />
  );
}
