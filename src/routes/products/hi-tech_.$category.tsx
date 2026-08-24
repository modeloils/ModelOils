import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "./hi-tech";

export const Route = createFileRoute("/products/hi-tech_/$category")({
  head: () => hiTechHead("en"),
  component: HiTechSubcategory,
});
