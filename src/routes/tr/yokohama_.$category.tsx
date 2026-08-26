import { createFileRoute } from "@tanstack/react-router";
import { YokohamaSubcategory } from "@/components/YokohamaRange";
import { hasYokohamaSegmentMatch, requireYokohamaCategory, yokohamaCategoryHead } from "@/lib/seo";

export const Route = createFileRoute("/tr/yokohama_/$category")({
  loader: ({ params }) => requireYokohamaCategory(params.category),
  head: ({ params, matches }) =>
    hasYokohamaSegmentMatch(matches) ? {} : yokohamaCategoryHead("tr", params.category),
  component: YokohamaSubcategory,
});
