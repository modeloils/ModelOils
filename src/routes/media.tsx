import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/SiteLayout";
import { pageHead, useTranslation, type Locale } from "@/lib/i18n";

export function mediaHead(locale: Locale) {
  return pageHead(locale, "media");
}

export const Route = createFileRoute("/media")({
  head: () => mediaHead("en"),
  component: Media,
});

export function Media() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <PageHero
        compact
        eyebrow="Model Oils"
        title={t.mediaPage.heroTitle}
        subtitle={t.mediaPage.heroSubtitle}
      />
    </SiteLayout>
  );
}
