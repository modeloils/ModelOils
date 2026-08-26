import { createFileRoute } from "@tanstack/react-router";
import { YokohamaSubcategory } from "@/components/YokohamaRange";
import { hasYokohamaSegmentMatch, requireYokohamaCategory, yokohamaCategoryHead } from "@/lib/seo";

export const Route = createFileRoute("/fr/yokohama_/$category")({
  loader: ({ params }) => requireYokohamaCategory(params.category),
  head: ({ params, matches }) =>
    hasYokohamaSegmentMatch(matches) ? {} : yokohamaCategoryHead("fr", params.category),
  component: YokohamaSubcategory,
});
