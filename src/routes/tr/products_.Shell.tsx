import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/tr/products_/Shell")({
  component: ShellPage,
});

const shellCatalogs = [
  { title: "Antifrizler", href: "/model-oils/docs/shell/shell-coolant-catalogue.pdf" },
  { title: "Motor Yağları", href: "/model-oils/docs/shell/shell-helix-catalogue.pdf" },
  { title: "Deniz Yağları", href: "/model-oils/docs/shell/shell-marine-catalogue.pdf" },
  { title: "Endüstriyel Katalog", href: "/model-oils/docs/shell/shell-endustriyel-katalog.pdf" },
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
