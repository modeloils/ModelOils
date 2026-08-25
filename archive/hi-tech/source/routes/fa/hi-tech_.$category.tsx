import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/fa/hi-tech_/$category")({
  head: () => hiTechHead("fa"),
  component: HiTechSubcategory,
});
