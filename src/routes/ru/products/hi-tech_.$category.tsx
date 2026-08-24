import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/ru/products/hi-tech_/$category")({
  head: () => hiTechHead("ru"),
  component: HiTechSubcategory,
});
