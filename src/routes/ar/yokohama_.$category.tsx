import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/ar/yokohama_/$category")({
  head: () => yokohamaHead("ar"),
  component: HiTechSubcategory,
});
