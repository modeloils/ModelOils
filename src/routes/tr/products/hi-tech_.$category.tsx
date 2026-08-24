import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/tr/products/hi-tech_/$category")({
  head: () => hiTechHead("tr"),
  component: HiTechSubcategory,
});
