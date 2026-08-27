import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { YokohamaCatalogs } from "@/components/YokohamaCatalogs";
import { pageHead, type Locale } from "@/lib/i18n";

export function catalogsHead(locale: Locale) {
  return pageHead(locale, "catalogs");
}

export const Route = createFileRoute("/catalogs")({
  head: () => catalogsHead("en"),
  component: Catalogs,
});

export function Catalogs() {
  return (
    <SiteLayout>
      <YokohamaCatalogs />
    </SiteLayout>
  );
}
