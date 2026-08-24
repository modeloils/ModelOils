import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../../products/hi-tech";
import { yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/ru/products/yokohama_/$category")({
  head: () => yokohamaHead("ru"),
  component: HiTechSubcategory,
});
