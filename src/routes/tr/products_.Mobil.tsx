import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/tr/products_/Mobil")({
  component: MobilPage,
});

function MobilPage() {
  return (
    <BrandCatalogPage
      brandName="Mobil"
      logo={`${ASSET_BASE}/brands/mobil.png`}
      logoClassName="max-w-[210px]"
      catalogs={[
        { title: "Motor Yağları", href: "/model-oils/docs/mobil/mobil-motor-oils.pdf" },
        { title: "Ağır Vasıta Yağları", href: "/model-oils/docs/mobil/mobil-delvac-heavy-vehicle.pdf" },
        { title: "Deniz Yağları", href: "/model-oils/docs/mobil/mobil-marine-lubricants-chart.pdf" },
        { title: "Yarış Yağları", href: "/model-oils/docs/mobil/mobil-1-racing-official.pdf" },
        { title: "Endüstriyel Yağlar", href: "/model-oils/docs/mobil/mobil-industrial-lubricants.pdf" },
      ]}
    />
  );
}
