import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../../products/hi-tech";
import { yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/ar/products/yokohama_/$category")({
  head: () => yokohamaHead("ar"),
  component: HiTechSubcategory,
});
