import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/de/yokohama_/$category")({
  head: () => yokohamaHead("de"),
  component: HiTechSubcategory,
});
