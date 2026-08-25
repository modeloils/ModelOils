import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/ru/yokohama_/$category")({
  head: () => yokohamaHead("ru"),
  component: HiTechSubcategory,
});
