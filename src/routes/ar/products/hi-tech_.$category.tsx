import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/ar/products/hi-tech_/$category")({
  head: () => hiTechHead("ar"),
  component: HiTechSubcategory,
});
