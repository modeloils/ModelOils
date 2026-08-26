import { createFileRoute } from "@tanstack/react-router";
import { YokohamaRange } from "@/components/YokohamaRange";
import { pageHead, type Locale } from "@/lib/i18n";

const YOKOHAMA_SOCIAL_IMAGE = "/model-oils/brands/yokohama-range.jpg";

export function yokohamaHead(locale: Locale) {
  return pageHead(locale, "yokohama", [{ property: "og:image", content: YOKOHAMA_SOCIAL_IMAGE }]);
}

export const Route = createFileRoute("/yokohama")({
  head: () => yokohamaHead("en"),
  component: Yokohama,
});

export function Yokohama() {
  return <YokohamaRange />;
}
