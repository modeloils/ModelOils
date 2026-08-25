import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/tr/yokohama_/$category")({
  head: () => yokohamaHead("tr"),
  component: HiTechSubcategory,
});
