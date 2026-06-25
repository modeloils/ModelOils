import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/ru/products_/PetrolOfisi")({
  component: PetrolOfisiPage,
});

function PetrolOfisiPage() {
  return (
    <BrandCatalogPage
      brandName="Petrol Ofisi"
      logo={`${ASSET_BASE}/brands/petrol-ofisi.png`}
      logoClassName="max-w-[260px]"
      catalogs={[
        { title: "Petrol Ofisi Catalogue", href: "/model-oils/docs/petrol-ofisi/petrol-ofisi-katalog.pdf" },
      ]}
    />
  );
}
