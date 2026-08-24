import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/de/products/hi-tech_/$category")({
  head: () => hiTechHead("de"),
  component: HiTechSubcategory,
});
