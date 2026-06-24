import { createFileRoute } from "@tanstack/react-router";
import { BrandCatalogPage } from "@/components/BrandCatalogPage";
import { ASSET_BASE } from "@/lib/site-data";

export const Route = createFileRoute("/de/products_/Mobil")({
  component: MobilPage,
});

function MobilPage() {
  return (
    <BrandCatalogPage
      brandName="Mobil"
      logo={`${ASSET_BASE}/brands/mobil.png`}
      logoClassName="max-w-[420px]"
      catalogs={[
        { title: "Mobil Motor Oils", href: "https://model-oils.vercel.app/docs/mobil/mobil-motor-oils.pdf" },
        { title: "Mobil Delvac Heavy Duty", href: "https://model-oils.vercel.app/docs/mobil/mobil-delvac-heavy-vehicle.pdf" },
        { title: "Mobil Marine Lubricants", href: "https://model-oils.vercel.app/docs/mobil/mobil-marine-lubricants-chart.pdf" },
        { title: "Mobil 1 Racing", href: "https://model-oils.vercel.app/docs/mobil/mobil-1-racing-official.pdf" },
        { title: "Mobil Industrial Lubricants", href: "https://model-oils.vercel.app/docs/mobil/mobil-industrial-lubricants.pdf" },
      ]}
    />
  );
}
