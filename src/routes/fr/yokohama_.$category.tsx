import { createFileRoute } from "@tanstack/react-router";
import { YokohamaSubcategory } from "@/components/YokohamaRange";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/fr/yokohama_/$category")({
  head: () => yokohamaHead("fr"),
  component: YokohamaSubcategory,
});
