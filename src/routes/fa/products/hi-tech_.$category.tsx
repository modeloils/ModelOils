import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/fa/products/hi-tech_/$category")({
  head: () => hiTechHead("fa"),
  component: HiTechSubcategory,
});
