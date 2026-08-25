import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/fr/yokohama_/$category")({
  head: () => yokohamaHead("fr"),
  component: HiTechSubcategory,
});
