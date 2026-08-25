import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/ru/hi-tech_/$category")({
  head: () => hiTechHead("ru"),
  component: HiTechSubcategory,
});
