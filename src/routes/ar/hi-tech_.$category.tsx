import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/ar/hi-tech_/$category")({
  head: () => hiTechHead("ar"),
  component: HiTechSubcategory,
});
