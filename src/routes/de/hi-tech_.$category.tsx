import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/de/hi-tech_/$category")({
  head: () => hiTechHead("de"),
  component: HiTechSubcategory,
});
