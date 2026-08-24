import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/fr/products/hi-tech_/$category")({
  head: () => hiTechHead("fr"),
  component: HiTechSubcategory,
});
