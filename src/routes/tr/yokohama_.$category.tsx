import { createFileRoute } from "@tanstack/react-router";
import { YokohamaSubcategory } from "@/components/YokohamaRange";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/tr/yokohama_/$category")({
  head: () => yokohamaHead("tr"),
  component: YokohamaSubcategory,
});
