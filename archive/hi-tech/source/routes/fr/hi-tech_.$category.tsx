import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/fr/hi-tech_/$category")({
  head: () => hiTechHead("fr"),
  component: HiTechSubcategory,
});
