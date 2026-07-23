import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/tr/hi-tech_/$category")({
  head: () => hiTechHead("tr"),
  component: HiTechSubcategory,
});
