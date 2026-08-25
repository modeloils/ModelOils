import { createFileRoute } from "@tanstack/react-router";
import { YokohamaSubcategory } from "@/components/YokohamaRange";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/ar/yokohama_/$category")({
  head: () => yokohamaHead("ar"),
  component: YokohamaSubcategory,
});
